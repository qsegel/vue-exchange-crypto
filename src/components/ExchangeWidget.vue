<template>
  <form class="mt-14">
    <div class="sm:flex justify-between">
      <div class="w-full flex flex-col relative">
        <InputSelect
          :input-value="amount"
          :currencies="currencies"
          :current-coin="from"
          :image-icon="imageFrom"
          @setCurrency="setCurrencyFrom"
          @changeAmount="changeAmount"
        />
      </div>
      <div class="cursor-pointer" @click="changeTicker">
        <span class="hidden sm:block my-4 sm:ml-8 flex flex-col justify-center">
          <ArrowIcon />
          <ArrowIcon class="rotate180" />
        </span>
        <span class="sm:hidden my-4 flex justify-end">
          <ArrowIcon class="rotate90" />
          <ArrowIcon class="rotate-90" />
        </span>
      </div>
      <div class="w-full flex flex-col relative sm:ml-8">
        <InputSelect
          :input-value="estimated"
          :currencies="currencies"
          :current-coin="to"
          :image-icon="imageTo"
          :valid="valid"
          @setCurrency="setCurrencyTo"
        />
      </div>
    </div>
    <div class="mt-8 sm:flex justify-between">
      <div class="w-full flex flex-col">
        <label
          for="address"
          class="text-dark font-vollkorn text-base font-normal"
        >
          Your Ethereum address
        </label>
        <input
          id="address"
          type="text"
          class="mt-1 w-full outline-none bg-gray-100 rounded-md py-3 px-4 mr-10 border border-inp-bor font-vollkorn text-base"
        />
      </div>
      <div class="self-end">
        <AppButton
          :disabled="error"
          :error="error"
          class="mt-4 sm:ml-8"
          :class="!error ? 'hover:bg-btn-hov' : 'cursor-not-allowed'"
          >Exchange</AppButton
        >
      </div>
    </div>
    <div v-show="error" class="mt-1 flex justify-center sm:justify-end">
      <span class="text-danger text-base font-normal font-vollkorn">
        This pair is disabled now
      </span>
    </div>
  </form>
</template>

<script>
import AppButton from './UI/AppButton.vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import InputSelect from './InputSelect.vue'

export default {
  components: {
    AppButton,
    ArrowIcon,
    InputSelect
  },
  props: {
    currencies: {
      type: Array,
      default: () => []
    },
    from: {
      type: String,
      default: 'btc'
    },
    to: {
      type: String,
      default: 'eth'
    },
    amount: {
      type: Number,
      default: 0
    },
    estimated: {
      type: Number,
      default: 0
    },
    error: {
      type: Boolean,
      default: false
    },
    valid: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'changeAmount',
    'change-from',
    'change-to',
    'setCurrencyFrom',
    'setCurrencyTo',
    'changeTicker'
  ],
  data: () => ({
    imageFrom: 'https://changenow.io/images/sprite/currencies/btc.svg',
    imageTo: 'https://changenow.io/images/sprite/currencies/eth.svg'
  }),
  computed: {
    filteredList() {
      return this.currencies.filter((currency) => {
        return currency.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filteredListRight() {
      return this.currencies.filter((currency) => {
        return currency.name
          .toLowerCase()
          .includes(this.searchRight.toLowerCase())
      })
    }
  },
  methods: {
    changeAmount(val) {
      this.$emit('changeAmount', val)
    },
    changeEstimated(e) {
      const val = e.target.value
      this.searchRight = val
    },
    changeFrom(e) {
      const val = e.target.value
      this.$emit('change-from', val)
    },
    changeTo(e) {
      const val = e.target.value
      this.$emit('change-to', val)
    },
    setCurrencyFrom(ticker, image) {
      this.$emit('setCurrencyFrom', ticker)
      this.imageFrom = image
    },
    setCurrencyTo(ticker, image) {
      this.$emit('setCurrencyTo', ticker)
      this.imageTo = image
    },
    changeTicker() {
      const from = this.imageFrom
      this.$emit('changeTicker', this.from, this.to)
      this.imageFrom = this.imageTo
      this.imageTo = from
    }
  }
}
</script>

<style scoped>
.rotate180 {
  rotate: 180deg;
}
.rotate90 {
  rotate: 90deg;
}
.rotate-90 {
  rotate: -90deg;
}
</style>
