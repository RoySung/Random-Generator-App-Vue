<template>
  <v-container class="customize-list">
    <v-slide-y-transition mode="out-in">
      <v-list>
        <v-list-tile avatar v-for="(name, index) in items" :key="index" @click="goCustomDetail(name)">
          <v-list-tile-action>
            <v-icon class="white--text" :class="themeColor">assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ name }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-btn block :color="themeColor" dark @click="createNew">
              <v-icon class="white--text" :class="themeColor">add</v-icon>
              New
            </v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        items: []
      }
    },
    computed: {
      themeColor () {
        return this.$bus.localStorageData.themeColor
      }
    },
    watch: {
      '$route.name': () => {
        this.init()
      }
    },
    methods: {
      init () {
        if (!localStorage.custom) return
        const custom = JSON.parse(localStorage.custom)
        this.items = Object.keys(custom)
      },
      goCustomDetail (name) {
        this.$router.push({ name: 'Custom', params: { name } })
      },
      createNew () {
        const custom = localStorage.custom ? JSON.parse(localStorage.custom) : {}
        let name = 'New'
        let count = 0
        while (Object.keys(custom).includes(name + count)) {
          count += 1
        }
        name += count
        this.goCustomDetail(name)
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>

</style>
