<template>
  <v-container class="customize-list">
    <v-slide-y-transition mode="out-in">
      <v-list>
        <v-list-tile avatar v-for="(name, index) in items" :key="index" @click="goCustomDetail(name)">
          <v-list-tile-action>
            <v-icon class="cyan white--text">assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ name }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-btn block color="cyan" dark @click="goCustomDetail('New')">
              <v-icon class="cyan white--text">add</v-icon>
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
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style scoped>

</style>
