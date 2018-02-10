<template>
  <v-container class="custom-random">
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center>
        <v-flex md6 xs12>
          <v-card>
            <v-card-title>
              <v-flex md12 xs12>
                <v-list>
                  <template v-for="(item, index) in items">
                    <v-list-tile avatar :key="'item-item-' + index">
                      <v-list-tile-content >
                        <v-text-field
                          :name="'item-input-' + index"
                          :label="index.toString()"
                          :value="item"
                          v-model="items[index]"
                          :autofocus="index + 1 == items.length"
                        ></v-text-field>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-btn icon ripple dark small color="red" @click="removeItem(index)">
                          <v-icon>remove</v-icon>
                        </v-btn>
                      </v-list-tile-action>
                    </v-list-tile>
                  </template>
                  <v-list-tile>
                    <v-list-tile-content >
                      <v-btn block outline :color="themeColor" @click="addItem(items.length)">
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content >
                      <v-text-field
                        name="count"
                        type="number"
                        :label="$t('Count')"
                        v-model="count"
                      ></v-text-field>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content class="options-wrap">
                      <v-switch :label="$t('Is Repeat')" v-model="isRepeat" :value="isRepeat" />
                      <v-switch :label="$t('Automatically Clear The Last Result')" v-model="isAutoClear" :value="isAutoClear" />
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content >
                      <v-btn block dark :color="themeColor" @click="handleRandom" v-text="$t('Randomize')"></v-btn>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-flex>

            </v-card-title>
          </v-card>
        </v-flex>
        <navigation-drawer-with-toggle v-model="isOpen">
          <v-list>
            <template v-for="(item, index) in result">
              <v-list-tile
                avatar
                :key="'list-item-' + index"
                :class="{ gray: index > count - 1 }"
                @click="" >
                <v-list-tile-content >
                  <v-list-tile-title v-text="item" />
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="'list-divider-' + index" />
            </template>
            <v-list-tile avatar>
              <v-list-tile-content >
                <v-btn block :color="themeColor" dark @click="handleClearResult" v-text="$t('Clear')"></v-btn>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </navigation-drawer-with-toggle>
      </v-layout>
    </v-slide-y-transition>
    <v-dialog :value="isOpenSaveWindow" @input="toggleOpenSaveWindow" max-width="290">
      <v-card>
        <v-card-title class="headline" v-text="$t('Save')"></v-card-title>
        <v-card-text>
          <v-text-field
            autofocus
            :label="$t('Item Name')"
            v-model="inputName"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="red" @click="setOpenSaveWindow(false)" v-text="$t('Cancel')"></v-btn>
          <v-btn flat :color="themeColor" @click="saveToLocal" v-text="$t('Save')"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog :value="isOpenDeleteWindow" @input="toggleOpenDeleteWindow" max-width="290">
      <v-card>
        <v-card-title class="headline" v-text="$t('Delete')"></v-card-title>
        <v-card-text>
          {{ $t('Are you sure to delete it ?') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat :color="themeColor" @click="setOpenDeleteWindow(false)" v-text="$t('Cancel')"></v-btn>
          <v-btn flat color="red" @click="deleteToLocal" v-text="$t('Delete')"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import NavigationDrawerWithToggle from '@/components/NavigationDrawerWithToggle'

  export default {
    data () {
      return {
        items: ['default', 'default1'],
        count: 1,
        isOpen: false,
        isRepeat: false,
        isAutoClear: true,
        result: [],
        inputName: this.$route.params.name,
        isOpenSaveWindow: false,
        isOpenDeleteWindow: false,
        isGoBack: false
      }
    },
    computed: {
      title: {
        get () {
          return this.$route.params.name
        },
        set (name) {
          this.$route.params.name = name
        }
      },
      isDiff () {
        if (!Object.keys(this.custom).includes(this.title)) return true
        const { items, count, isRepeat, isAutoClear } = this
        const config = {
          items,
          count,
          isRepeat,
          isAutoClear
        }
        /* eslint-disable */
        return JSON.stringify(this.custom[this.title]) != JSON.stringify(config)
      },
      custom: {
        get () {
          return this.$bus.localStorageData.custom
        },
        set (value) {
          this.$bus.localStorageData.custom = value
        }
      },
      themeColor () {
        return this.$bus.localStorageData.themeColor
      }
    },
    watch: {
      title () {
        this.init()
      },
      isOpenSaveWindow (bool) {
        if (!bool && this.isGoBack) this.$router.push({ name: 'CustomizeList' })
      }
    },
    methods: {
      init () {
        if (!localStorage.custom) return
        const config = JSON.parse(localStorage.custom)[this.title]
        if (!config) {
          this.items = ['default', 'default1']
          this.count = 1
          this.isRepeat = false
          this.isAutoClear = true
        } else {
          this.items = config.items
          this.count = config.count
          this.isRepeat = config.isRepeat
          this.isAutoClear = config.isAutoClear
        }
      },
      addItem (index) {
        this.items.push(index)
      },
      removeItem (index) {
        this.items.splice(index, 1)
      },
      handleRandom () {
        const { isRepeat, count, isAutoClear } = this
        this.result = isAutoClear ? [] : this.result
        const items = isRepeat ? this.items : this.items.filter(item => !this.result.includes(item))
        if (isRepeat || items.length >= count) {
          for (let i = 0; i < count && items.length; i++) {
            const random = items[Math.floor(Math.random() * items.length)]
            this.result.unshift(random)
            if (!isRepeat) items.splice(items.indexOf(random), 1)
          }
          // this.result = result.concat(this.result)
        } else {
          this.showErrorToast('Because of no-repeat, please clear result first or set on with auto-clear-result.')
        }
        this.isOpen = !this.isOpen
      },
      handleClearResult () {
        this.result = []
      },
      showErrorToast (msg) {
        this.$bus.showErrorToast(msg)
      },
      showSuccessToast (msg) {
        this.$bus.showSuccessToast(msg)
      },
      saveToLocal () {
        let custom = Object.assign({}, this.custom)
        const { $router, inputName, items, count, isRepeat, isAutoClear } = this
        custom[inputName] = {
          items,
          count,
          isRepeat,
          isAutoClear
        }
        this.custom = custom
        this.showSuccessToast(`Save Success, name is ${inputName}.`)
        this.setOpenSaveWindow(false)
        $router.push({ name: 'CustomizeList' })
      },
      deleteToLocal () {
        let custom = Object.assign({}, this.custom)
        const { inputName, $router } = this
        if (custom[inputName]) {
          delete custom[inputName]
          this.custom = custom
          this.showSuccessToast(`Delete Success, name is ${inputName}.`)
        }
        this.setOpenDeleteWindow(false)
        $router.push({ name: 'CustomizeList' })
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
    },
    mounted () {
      this.init()
    },
    created () {
      this.$bus.$on('setOpenSaveWindow', bool => this.setOpenSaveWindow(bool))
      this.$bus.$on('setOpenDeleteWindow', bool => this.setOpenDeleteWindow(bool))
      this.$bus.$on('goBack', () => {
        if (this.isDiff) {
          this.isGoBack = true
          this.setOpenSaveWindow(true)
        } else {
          this.$router.push({ name: 'CustomizeList' })
        }
      })
    },
    destroyed () {
      this.$bus.$off('setOpenSaveWindow')
      this.$bus.$off('setOpenDeleteWindow')
      this.$bus.$off('goBack')
    },
    components: {
      NavigationDrawerWithToggle
    }
  }
</script>

<style lang="scss">
  .gray {
    background: #d0cccc;
  }
  .custom-random {
    .list__tile{
      height: 60px;
    }
  }
  .options-wrap {
    padding: 0 3px;
  }
</style>
