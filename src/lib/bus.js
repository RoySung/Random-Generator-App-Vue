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
      isUpdate: false,
      isShowAboutMe: false,
      localStorageData: {}
    }
  },
  watch: {
    'localStorageData.lang': (value) => {
      localStorage.lang = value
    },
    'localStorageData.themeColor': (value) => {
      localStorage.themeColor = value
    },
    'localStorageData.custom': (value) => {
      localStorage.custom = JSON.stringify(value)
    }
  },
  methods: {
    init () {
      this.initLocalStorage()
      this.getLocalStorageData()
    },
    initLocalStorage (isReset = false) {
      const lang = navigator.language === 'zh-tw' ? 'zh-tw' : 'en'
      const themeColor = 'cyan'
      const custom = {}
      if (isReset || !localStorage.lang) localStorage.lang = lang
      if (isReset || !localStorage.themeColor) localStorage.themeColor = themeColor
      if (isReset || !localStorage.custom) localStorage.custom = JSON.stringify(custom)
    },
    getLocalStorageData () {
      const localStorageData = {}
      localStorageData.lang = localStorage.lang
      localStorageData.themeColor = localStorage.themeColor
      localStorageData.custom = JSON.parse(localStorage.custom)
      this.localStorageData = localStorageData
    },
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
    }
  }
})

Object.defineProperty(Vue.prototype, '$bus', {
  get () {
    return this.$root.bus
  }
})

export default bus
