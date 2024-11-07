import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { successResponse } from 'src/types/utils.type'
import http from 'src/utils/https'

const URL = 'products'

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<successResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<successResponse<Product>>(`${URL}/${id}`)
  }
}

export default productApi
