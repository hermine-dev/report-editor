import axios from 'axios'

const axiosApi = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API
})

export const setAuthHeader = (token) => {
  if (!token) return
  axiosApi.defaults.headers.common.Authorization = `Bearer ${token}`
}

// Setting the initial header from storage
setAuthHeader(localStorage.getItem('token'))

export default axiosApi
