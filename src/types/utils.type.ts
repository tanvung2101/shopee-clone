export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export interface successResponse<Data> {
  message: string
  data: Data
}

// cú pháp '-?' sẽ loại bỏ undefiend của key optional

export type NoUndefiendField<T> = {
  [P in keyof T]-?: NoUndefiendField<NoUndefiendField<T[P]>>
}
