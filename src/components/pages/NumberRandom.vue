<template>
  <v-container class="number-random">
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center wrap>
        <v-flex md6 xs12>
          <v-card>
            <v-card-title>
              <v-flex row xs12 md12 class="input-min-wrap">
                <v-flex md12>
                  <v-text-field
                    name="min"
                    type="number"
                    :label="$t('Minimum')"
                    prepend-icon="keyboard_arrow_up"
                    v-model="min"
                  ></v-text-field>
                </v-flex>
              </v-flex>
              <v-flex row xs12 md12 class="input-max-wrap">
                <v-flex md12>
                  <v-text-field
                    name="max"
                    type="number"
                    :label="$t('Maximum')"
                    prepend-icon="keyboard_arrow_down"
                    v-model="max"
                  ></v-text-field>
                </v-flex>
              </v-flex>
              <v-flex row xs12 md12 class="input-count-wrap">
                <v-flex md12>
                  <v-text-field
                    name="count"
                    type="number"
                    :label="$t('Count')"
                    prepend-icon="format_list_numbered"
                    v-model="count"
                  ></v-text-field>
                </v-flex>
              </v-flex>
              <v-flex row xs12 md12 class="input-options-wrap">
                <v-switch :label="$t('Is Repeat')" v-model="isRepeat" value="isRepeat" />
                <v-switch :label="$t('Automatically Clear The Last Result')" v-model="isAutoClear" :value="isAutoClear" />
              </v-flex>
              <v-flex xs12 md12 class="input-button-wrap">
                <v-btn block :color="themeColor" dark @click="handleRandom" v-text="$t('Randomize')"></v-btn>
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
  </v-container>
</template>

<script>
  import NavigationDrawerWithToggle from '@/components/NavigationDrawerWithToggle'

  export default {
    data () {
      return {
        min: 0,
        max: 10,
        count: 1,
        isRepeat: false,
        isAutoClear: true,
        isOpen: false,
        result: []
      }
    },
    computed: {
      items () {
        const { max, min } = this
        const length = max - min + 1
        const items = Array.from({length}, (v, i) => parseInt(min) + i)
        return items
      },
      themeColor () {
        return this.$bus.localStorageData.themeColor
      }
    },
    methods: {
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
      }
    },
    components: {
      NavigationDrawerWithToggle
    }
  }
</script>

<style scoped>
  .gray {
    background: #d0cccc;
  }
</style>
