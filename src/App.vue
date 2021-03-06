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
            <v-list-tile-title v-text="$t(item.title)"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
      :color="themeColor"
    >

      <v-toolbar-side-icon v-if="isShowMenu" class="white--text" @click.stop="toggleDrawer" light></v-toolbar-side-icon>
      <v-btn v-else-if="!isMainPage" icon dark @click="goBack">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-icon dark v-else>home</v-icon>
      <v-toolbar-title class="white--text" v-text="$t(title)"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left close-on-click>
        <v-btn icon slot="activator" dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <template v-if="isCustomPage">
            <v-list-tile @click="openSaveWindow">
              <v-list-tile-action><v-icon>save</v-icon></v-list-tile-action>
              <v-list-tile-title v-text="$t('Save')"></v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="openDeleteWindow">
              <v-list-tile-action><v-icon>delete</v-icon></v-list-tile-action>
              <v-list-tile-title v-text="$t('Delete')"></v-list-tile-title>
            </v-list-tile>
          </template>
          <template v-else>
            <v-list-tile v-if="routeName != 'Settings'" @click="goSettings">
              <v-list-tile-action><v-icon>settings</v-icon></v-list-tile-action>
              <v-list-tile-title v-text="$t('Settings')"></v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$bus.isShowAboutMe = true">
              <v-list-tile-action><v-icon>info</v-icon></v-list-tile-action>
              <v-list-tile-title v-text="$t('About Me')"></v-list-tile-title>
            </v-list-tile>
          </template>
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
      <v-dialog v-model="$bus.isUpdate" persistent max-width="290">
        <v-card>
          <v-card-title class="headline justify-center">
            Updating
          </v-card-title>
          <v-card-text>
            <v-flex class="text-xs-center text-md-center">
              <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" :color="themeColor"></v-progress-circular>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="$bus.isShowAboutMe" max-width="290">
        <v-card>
          <v-card-title class="headline justify-center">
            {{ $t('About Me') }}
          </v-card-title>
          <v-card-text>
            <p>{{ $t('Thank You For Using This. Any Fallback Is Welcome 😊') }}</p>
            <a href="https://github.com/roysung" target="block" style="text-decoration: none;">
              <v-btn block dark :color="themeColor">
                <v-icon left>fa-github</v-icon>
                RoySung
              </v-btn>
            </a>
          </v-card-text>
        </v-card>
      </v-dialog>
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
          },
          {
            title: 'Settings',
            icon: 'settings',
            route: {
              name: 'Settings'
            }
          }
        ],
        isUpdate: true
      }
    },
    computed: {
      themeColor () {
        return this.$bus.localStorageData.themeColor
      },
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
      },
      isShowMenu () {
        return !this.isMainPage && !this.isCustomPage
      }
    },
    watch: {
      '$bus.isUpdate': (newVal, oldVal) => {
        if (newVal === false && oldVal === true) location.reload()
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
        this.$bus.$emit('setOpenSaveWindow', true)
      },
      openDeleteWindow () {
        this.$bus.$emit('setOpenDeleteWindow', true)
      },
      goBack () {
        this.$bus.$emit('goBack')
      },
      goSettings () {
        this.$router.push({ name: 'Settings' })
      }
    },
    mounted () {
    }
  }
</script>
