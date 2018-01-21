import Vue from 'vue'

var bus = new Vue({
  data () {
    return {
      snackbar: {
        timeout: 1000,
        color: '',
        isOpen: false,
        msg: ''
      },
      isOpenSaveWindow: false,
      isOpenDeleteWindow: false
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
    },
    showSuccessToast (msg) {
      const snackbar = {
        msg,
        isOpen: true,
        color: 'success'
      }
      this.snackbar = Object.assign({}, this.snackbar, snackbar)
    },
    setOpenSaveWindow (bool) {
      this.isOpenSaveWindow = bool
    },
    setOpenDeleteWindow (bool) {
      this.isOpenDeleteWindow = bool
    },
    toggleOpenSaveWindow () {
      this.setOpenSaveWindow(!this.isOpenSaveWindow)
    },
    toggleOpenDeleteWindow () {
      this.setOpenDeleteWindow(!this.isOpenDeleteWindow)
    }
  }
})

Object.defineProperty(Vue.prototype, '$bus', {
  get () {
    return this.$root.bus
  }
})

export default bus
