<template>
  <div class="max-w-md m-56 mx-auto p-3 font-serif" style="max-width: 970px">
    <div>
      <h2 class="text-5xl-1 text-dark font-serif font-light">
        Crypto Exchange
      </h2>
      <p class="mt-2 text-dark text-xl font-normal">Exchange fast and easy</p>
    </div>
    <ExchangeWidget
      :currencies="currencies"
      :from="from"
      :to="to"
      :amount="amount"
      :estimated="estimated"
      :error="error"
      :valid="valid"
      @change-from="changeFrom"
      @change-to="changeTo"
      @changeAmount="changeAmount"
      @setCurrencyFrom="setCurrencyFrom"
      @setCurrencyTo="setCurrencyTo"
      @changeTicker="changeTicker"
    />
  </div>
</template>

<script>
import ExchangeService from '@/services/ExchangeService.js'
import ExchangeWidget from './components/ExchangeWidget.vue'

export default {
  components: {
    ExchangeWidget
  },
  data: () => ({
    currencies: [],
    from: 'btc',
    to: 'eth',
    amount: 0,
    minAmount: 0,
    estimated: 0,
    error: false,
    valid: false
  }),
  watch: {
    async amount() {
      this.valid = false
      if (this.amount < this.minAmount) {
        this.valid = true
        this.estimated = '-'
      } else {
        try {
          const { data } = await ExchangeService.getEstimatedExchangeAmount(
            this.amount,
            this.from,
            this.to
          )
          this.estimated = data.estimatedAmount
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  async created() {
    const currencies = await ExchangeService.getAvailableCurrencies()
    this.currencies = currencies.data

    const minExchangeAmount = await ExchangeService.getMinimalExchangeAmount()
    this.minAmount = this.amount = minExchangeAmount.data.minAmount
  },
  methods: {
    changeAmount(val) {
      this.amount = +val
    },
    changeFrom(val) {
      this.from = val
      this.updateAmount()
    },
    changeTo(val) {
      this.to = val
      this.updateAmount()
    },
    setCurrencyFrom(ticker) {
      this.from = ticker
      this.updateAmount()
    },
    setCurrencyTo(ticker) {
      this.to = ticker
      this.updateAmount()
    },
    changeTicker(from, to) {
      this.from = to
      this.to = from
      this.updateAmount()
    },

    async updateAmount() {
      this.valid = false
      this.error = false
      try {
        const { data } = await ExchangeService.getMinimalExchangeAmount(
          this.from,
          this.to
        )
        this.minAmount = this.amount = data.minAmount
      } catch (error) {
        if (error) {
          this.error = true
        }
      }
    }
  }
}
</script>
