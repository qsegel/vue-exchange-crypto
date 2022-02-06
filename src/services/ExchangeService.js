import $api from '@/utils/axiosInstance.js'

const API_KEY = process.env.VUE_APP_API_KEY

export default {
  getAvailableCurrencies() {
    return $api.get('currencies?active=true&fixedRate=true')
  },
  getMinimalExchangeAmount(from = 'btc', to = 'eth') {
    return $api.get(`min-amount/${from}_${to}?api_key=${API_KEY}`)
  },
  getEstimatedExchangeAmount(amount, from = 'btc', to = 'eth') {
    return $api.get(
      `exchange-amount/${amount}/${from}_${to}?api_key=${API_KEY}`
    )
  }
}
