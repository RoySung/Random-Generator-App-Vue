<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          exact
          @click="handleListClick(item)"
        >
          <v-list-tile>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
      color="cyan"
    >
      <v-toolbar-side-icon v-if="!isCustomPage" class="white--text" @click.stop="toggleDrawer" light></v-toolbar-side-icon>
      <v-btn v-else icon dark @click="goBack">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-if="isCustomPage" bottom left>
        <v-btn icon slot="activator" dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="openSaveWindow">
            <v-list-tile-action><v-icon>save</v-icon></v-list-tile-action>
            <v-list-tile-title>Save</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="openDeleteWindow">
            <v-list-tile-action><v-icon>delete</v-icon></v-list-tile-action>
            <v-list-tile-title>Delete</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
      <v-snackbar
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        v-model="snackbar.isOpen"
      >
        {{ snackbar.msg }}
      </v-snackbar>
    </v-content>
    <!-- <v-footer app>
      <span>&copy; 2017</span>
    </v-footer> -->
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        items: [
          {
            title: 'Home',
            icon: 'home',
            route: {
              name: 'Main'
            }
          },
          {
            title: 'Random Number',
            icon: 'import_export',
            route: {
              name: 'Number'
            }
          },
          {
            title: 'Customization List',
            icon: 'view_list',
            route: {
              name: 'CustomizeList'
            }
          }
        ]
      }
    },
    computed: {
      snackbar () {
        return this.$bus.snackbar
      },
      title () {
        const item = this.items.find(item => item.route.name === this.$route.name)
        return item ? item.title : this.$route.params.name
      },
      routeName () {
        return this.$route.name
      },
      isCustomPage () {
        return this.routeName === 'Custom'
      },
      isMainPage () {
        return this.routeName === 'Main'
      }
    },
    methods: {
      toggleDrawer () {
        this.drawer = !this.drawer
      },
      handleListClick (item) {
        const name = item.route.name
        if (name !== this.routeName) {
          this.$router.push({ name })
        } else {
          this.toggleDrawer()
        }
      },
      openSaveWindow () {
        this.$bus.toggleOpenSaveWindow()
      },
      openDeleteWindow () {
        this.$bus.toggleOpenDeleteWindow()
      },
      goBack () {
        let name = this.isCustomPage ? 'CustomizeList' : 'Main'
        this.$router.push({ name })
      }
    },
    mounted () {
    }
  }
</script>
