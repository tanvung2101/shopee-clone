import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

const resources = {
  en: {
    translation: {
      'all categories': 'All categories',
      'filter search': 'Filter'
    }
  },
  vi: {
    translation: {
      'all categories': 'Tất cả danh mục',
      'filter search': 'Bộ lọc tìm kiếm'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: false,
  interpolation: {
    escapeValue: false
  }
})


