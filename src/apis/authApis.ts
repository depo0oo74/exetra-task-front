
const URL = `${import.meta.env.VITE_API_URL}/auth`
import AxiosApis from './axios/index'

const AuthApis = {
  // LOGIN API
  async login(data: object) {
    const response: object | undefined = await AxiosApis.post(`${URL}/login`, data)

    return response
  },

  // SIGNUP API
  async signup(data: object) {
    const response: object | undefined = await AxiosApis.post(`${URL}/signup`, data)

    return response
  },

  // FORGOT PASSWORD API
  async forgotPass(data: object) {
    const response: object | undefined = await AxiosApis.post(`${URL}/forgot-password`, data)

    return response
  },

  // RESET PASSWORD API
  async resetPass(data: object, token: string) {
    const response: object | undefined = await AxiosApis.post(`${URL}/reset-password/${token}`, data)

    return response
  },
}

export default AuthApis
