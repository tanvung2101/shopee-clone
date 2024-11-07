import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { successResponse } from 'src/types/utils.type'
import http from 'src/utils/https'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<successResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchase(params: { status: PurchaseListStatus }) {
    return http.get<successResponse<Purchase[]>>(`${URL}`, {
      params
    })
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<successResponse<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<successResponse<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<successResponse<{ delete_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
