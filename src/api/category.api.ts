import { Category } from 'src/types/category.type'
import { successResponse } from 'src/types/utils.type'
import http from 'src/utils/https'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<successResponse<Category[]>>(URL)
  }
}

export default categoryApi
