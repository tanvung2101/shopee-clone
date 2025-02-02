import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/api/auth.api'
import Button from 'src/components/Button'

import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { schema, Schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export const Register = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.RegisterAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  // console.log(errors)
  return (
    <div className='bg-orange'>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Đăng kí</title>
        <meta name='description' content='đăng nhập vào shopee clone' />
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                type='email'
                placeholder='Email'
                className='mt-8'
                register={register}
                errorMessage={errors.email?.message}
                name='email'
              />
              <Input
                type='password'
                placeholder='Password'
                className='mt-2'
                register={register}
                errorMessage={errors.password?.message}
                name='password'
                autoComplete='on'
              />
              <Input
                type='password'
                placeholder='Confirm Password'
                className='mt-2'
                register={register}
                errorMessage={errors.confirm_password?.message}
                name='confirm_password'
                autoComplete='on'
              />
              <div className='mt-2'>
                <Button
                  className='w-full py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center gap-2'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng kí
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400 '>Bạn đã có tài khoản?</span>
                <Link to='/login' className='text-red-400 ml-1'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
