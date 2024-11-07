import { User } from 'src/types/user.type'
import { successResponse } from 'src/types/utils.type'
import http from 'src/utils/https'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email' | 'address'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile() {
    return http.get<successResponse<User>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<successResponse<User>>('user', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<successResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
