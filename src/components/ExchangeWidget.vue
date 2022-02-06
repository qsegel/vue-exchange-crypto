<template>
  <form class="mt-14">
    <div class="sm:flex justify-between">
      <div class="w-full flex flex-col relative">
        <div
          class="flex items-center w-full border border-inp-bor bg-inp-gray py-3 px-4"
          :class="visibleFrom ? 'rounded-t-md' : 'rounded-md'"
        >
          <input
            type="text"
            class="outline-none bg-inp-gray w-full border-inp-bor font-vollkorn text-base placeholder-list-cur"
            :class="!visibleFrom ? 'border-r' : ''"
            :value="!visibleFrom ? amount : search"
            placeholder="Search"
            @input="changeAmount"
          />
          <svg
            v-show="visibleFrom"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="cursor-pointer"
            @click="visibleFrom = !visibleFrom"
          >
            <path
              d="M10.1787 1.26318L6.00003 5.44187L1.82134 1.26318L1.26318 1.82134L5.44187 6.00003L1.26318 10.1787L1.82134 10.7369L6.00003 6.55815L10.1787 10.7369L10.7369 10.1787L6.55815 6.00003L10.7369 1.82134L10.1787 1.26318Z"
              fill="#80A2B6"
              stroke="#80A2B6"
            />
          </svg>

          <div
            v-show="!visibleFrom"
            class="bg-inp-gray w-36 px-4 outline-none flex justify-between items-center cursor-pointer"
            @click="visibleFrom = !visibleFrom"
          >
            <img :src="imageFrom" />

            <div class="font-vollkorn text-base text-dark">
              {{ from.toUpperCase() }}
            </div>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.01077 5.99987C5.23471 5.99804 5.44916 5.90703 5.60872 5.74612L9.74595 1.5096C9.90811 1.34428 9.99949 1.11977 10 0.885451C10.0005 0.651135 9.91008 0.42621 9.74864 0.260157C9.5872 0.0941027 9.36795 0.000521907 9.13913 2.17641e-06C8.91031 -0.000517555 8.69066 0.0920662 8.52849 0.257385L5 3.87057L1.47151 0.257386C1.39121 0.175528 1.29595 0.110666 1.19118 0.066504C1.08641 0.0223427 0.974171 -0.000254555 0.86087 2.94837e-06C0.747568 0.000259974 0.635423 0.0233675 0.530842 0.0680047C0.426262 0.112642 0.331288 0.177935 0.25135 0.260156C0.171411 0.342378 0.108078 0.439918 0.0649512 0.547206C0.0218248 0.654494 -0.0002492 0.76943 2.12213e-06 0.885452C0.000253444 1.00147 0.0228229 1.11631 0.0664137 1.2234C0.110004 1.33049 0.17376 1.42774 0.254054 1.5096L4.39127 5.74612C4.47288 5.82845 4.56971 5.8933 4.67608 5.93687C4.78244 5.98043 4.89623 6.00185 5.01077 5.99987Z"
                fill="#80A2B6"
              />
            </svg>
          </div>
        </div>
        <div
          v-show="visibleFrom"
          class="bg-inp-gray absolute w-full top-12 border border-inp-bor"
        >
          <div
            v-for="currency in filteredList.slice(0, 3)"
            :key="currency.ticker"
            class="flex p-2 cursor-pointer hover:bg-list-hov"
            @click="setCurrency(currency.ticker, currency.image)"
          >
            <img :src="currency.image" class="ml-3" />
            <p class="ml-4 text-dark font-vollkorn text-base">
              {{ currency.ticker.toUpperCase() }}
            </p>
            <p class="ml-4 text-list-cur font-vollkorn text-base">
              {{ currency.name }}
            </p>
          </div>
        </div>
      </div>
      <span class="hidden sm:block my-4 sm:ml-8 flex flex-col justify-center">
        <ArrowIcon />
        <ArrowIcon class="rotate180" />
      </span>
      <span class="sm:hidden my-4 flex justify-end">
        <ArrowIcon class="rotate90" />
        <ArrowIcon class="rotate-90" />
      </span>
      <div class="w-full flex flex-col relative sm:ml-8">
        <div
          class="flex items-center w-full border border-inp-bor bg-inp-gray py-3 px-4 rounded-md"
        >
          <input
            type="text"
            class="outline-none bg-inp-gray w-full border-inp-bor font-vollkorn text-base placeholder-list-cur"
            :class="!visibleTo ? 'border-r' : ''"
            :value="!visibleTo ? estimated : searchRight"
            placeholder="Search"
            @input="changeEstimated"
          />
          <svg
            v-show="visibleTo"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="cursor-pointer"
            @click="visibleTo = !visibleTo"
          >
            <path
              d="M10.1787 1.26318L6.00003 5.44187L1.82134 1.26318L1.26318 1.82134L5.44187 6.00003L1.26318 10.1787L1.82134 10.7369L6.00003 6.55815L10.1787 10.7369L10.7369 10.1787L6.55815 6.00003L10.7369 1.82134L10.1787 1.26318Z"
              fill="#80A2B6"
              stroke="#80A2B6"
            />
          </svg>
          <div
            v-show="!visibleTo"
            class="bg-inp-gray w-36 px-4 outline-none flex justify-between items-center cursor-pointer"
            @click="visibleTo = !visibleTo"
          >
            <img :src="imageTo" />

            <div class="font-vollkorn text-base text-dark">
              {{ to.toUpperCase() }}
            </div>
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.01077 5.99987C5.23471 5.99804 5.44916 5.90703 5.60872 5.74612L9.74595 1.5096C9.90811 1.34428 9.99949 1.11977 10 0.885451C10.0005 0.651135 9.91008 0.42621 9.74864 0.260157C9.5872 0.0941027 9.36795 0.000521907 9.13913 2.17641e-06C8.91031 -0.000517555 8.69066 0.0920662 8.52849 0.257385L5 3.87057L1.47151 0.257386C1.39121 0.175528 1.29595 0.110666 1.19118 0.066504C1.08641 0.0223427 0.974171 -0.000254555 0.86087 2.94837e-06C0.747568 0.000259974 0.635423 0.0233675 0.530842 0.0680047C0.426262 0.112642 0.331288 0.177935 0.25135 0.260156C0.171411 0.342378 0.108078 0.439918 0.0649512 0.547206C0.0218248 0.654494 -0.0002492 0.76943 2.12213e-06 0.885452C0.000253444 1.00147 0.0228229 1.11631 0.0664137 1.2234C0.110004 1.33049 0.17376 1.42774 0.254054 1.5096L4.39127 5.74612C4.47288 5.82845 4.56971 5.8933 4.67608 5.93687C4.78244 5.98043 4.89623 6.00185 5.01077 5.99987Z"
                fill="#80A2B6"
              />
            </svg>
          </div>
        </div>
        <div
          v-show="visibleTo"
          class="bg-inp-gray absolute w-full top-12 border border-inp-bor"
        >
          <div
            v-for="currency in filteredListRight.slice(0, 3)"
            :key="currency.ticker"
            class="flex p-2 cursor-pointer hover:bg-list-hov"
            @click="setCurrencyRight(currency.ticker, currency.image)"
          >
            <img :src="currency.image" class="ml-3" />
            <p class="ml-4 text-dark font-vollkorn text-base">
              {{ currency.ticker.toUpperCase() }}
            </p>
            <p class="ml-4 text-list-cur font-vollkorn text-base">
              {{ currency.name }}
            </p>
          </div>
        </div>
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
        <AppButton :disabled="valid" :valid="valid">Exchange</AppButton>
      </div>
    </div>
    <div v-show="valid" class="mt-1 flex justify-center sm:justify-end">
      <span class="text-danger text-base font-normal font-vollkorn">
        This pair is disabled now
      </span>
    </div>
  </form>
</template>

<script>
import AppButton from './UI/AppButton.vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'

export default {
  components: {
    AppButton,
    ArrowIcon
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
    valid: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'change-amount',
    'change-from',
    'change-to',
    'setCurrency',
    'setCurrencyRight'
  ],
  data: () => ({
    visibleFrom: false,
    visibleTo: false,
    search: '',
    searchRight: '',
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
    changeAmount(e) {
      if (!this.visibleFrom) {
        const val = e.target.value
        this.$emit('change-amount', val)
      }
      const val = e.target.value
      this.search = val
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
    setCurrency(ticker, image) {
      this.visibleFrom = !this.visibleFrom
      this.$emit('setCurrency', ticker)
      this.search = ''
      this.imageFrom = image
    },
    setCurrencyRight(ticker, image) {
      this.visibleTo = !this.visibleTo
      this.$emit('setCurrencyRight', ticker)
      this.searchRight = ''
      this.imageTo = image
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
