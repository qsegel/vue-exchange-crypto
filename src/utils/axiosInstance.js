import axios from 'axios'

const baseURL = 'https://api.changenow.io/v1/'

const axiosInstance = axios.create({
  baseURL
})

export default axiosInstance
