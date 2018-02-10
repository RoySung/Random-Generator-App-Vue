<template>
  <v-container class="settings">
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center wrap>
        <v-flex xs12 md6>
          <v-select
            :label="$t('Theme Color')"
            :items="themeColorArrTrans"
            v-model="themeColor"
          ></v-select>
          <v-select
            :label="$t('Language')"
            :items="langArrTrans"
            v-model="lang"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        themeColorArr: [
          {
            text: 'Blue',
            value: 'blue'
          },
          {
            text: 'Cyan',
            value: 'cyan'
          },
          {
            text: 'Red',
            value: 'red'
          },
          {
            text: 'Pink',
            value: 'pink accent-2'
          },
          {
            text: 'Grey',
            value: 'grey'
          },
          {
            text: 'Orange',
            value: 'orange'
          }
        ],
        langArr: [
          {
            text: 'English',
            value: 'en'
          },
          {
            text: 'Chinese',
            value: 'zh-tw'
          }
        ]
      }
    },
    computed: {
      themeColor: {
        get () {
          return this.$bus.localStorageData.themeColor
        },
        set (value) {
          this.$bus.localStorageData.themeColor = value
        }
      },
      lang: {
        get () {
          return this.$bus.localStorageData.lang
        },
        set (value) {
          this.$bus.localStorageData.lang = value
          this.$i18n.locale = value
        }
      },
      themeColorArrTrans () {
        return this.transOptions(this.themeColorArr)
      },
      langArrTrans () {
        return this.transOptions(this.langArr)
      }
    },
    methods: {
      transOptions (options) {
        return options.map(option => {
          const opt = Object.assign({}, option)
          opt.text = this.$t(opt.text)
          return opt
        })
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>

</style>
