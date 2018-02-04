<template>
  <v-container class="settings">
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center wrap>
        <v-flex xs12 md6>
          <v-select
            label="Theme Color"
            :items="themeColorArr"
            v-model="themeColor"
          ></v-select>
          <v-select
            label="Language"
            :items="langArr"
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
        }
      }
    },
    mounted () {
      // const { lang, themeColor } = localStorage
      console.log(this)
    }
  }
</script>

<style scoped>

</style>
