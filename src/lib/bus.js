import Vue from 'vue'

var bus = new Vue({
  data () {
    return {
      snackbar: {
        timeout: 1000,
        color: '',
        isOpen: false,
        msg: ''
      }
    }
  },
  methods: {
    showErrorToast (msg) {
      const snackbar = {
        msg,
        isOpen: true,
        color: 'error'
      }
      this.snackbar = Object.assign({}, this.snackbar, snackbar)
    }
  }
})

Object.defineProperty(Vue.prototype, '$bus', {
  get () {
    return this.$root.bus
  }
})

export default bus
