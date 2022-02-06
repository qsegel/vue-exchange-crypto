<template>
  <button
    type="button"
    class="w-full sm:w-auto mt-4 bg-btn-blue py-3 px-11 text-white sm:ml-8 rounded-md border"
    :class="!valid ? 'hover:bg-btn-hov' : 'cursor-not-allowed'"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    valid: {
      type: Boolean,
      default: false
    }
  }
}
</script>
