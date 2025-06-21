
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

  // CHECK AUTH API
  async checkAuth() {
    interface IResponse {
      authenticated?: boolean
    }
    const response: IResponse | undefined = await AxiosApis.get(`${URL}/check`)

    return response
  },
}

export default AuthApis
