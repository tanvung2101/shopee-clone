import { useContext, useEffect } from 'react'
import './App.css'
import useRouterElements from './useRouterElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './contexts/app.context'
import { LocalStorageEventTarget } from './utils/auth'

function App() {
  const routerElements = useRouterElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <>
      <div>{routerElements}</div>
      <ToastContainer />
    </>
  )
}

export default App
