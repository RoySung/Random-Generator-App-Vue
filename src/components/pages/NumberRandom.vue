<template>
  <v-container class="number-random">
    <v-slide-y-transition mode="out-in">
      <v-layout align-center wrap>
        <v-flex md12>
          <v-card>
            <v-card-title>
              <v-flex row xs12 md12 class="input-min-wrap">
                <v-flex md12>
                  <v-text-field
                    name="min"
                    type="number"
                    label="Minimum"
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
                    label="Maximum"
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
                    label="Count"
                    prepend-icon="format_list_numbered"
                    v-model="count"
                  ></v-text-field>
                </v-flex>
              </v-flex>
              <v-flex row xs12 md12 class="input-options-wrap">
                <v-switch label="Repeat" v-model="isRepeat" value="isRepeat" />
                <v-switch label="Auto Clear Result" v-model="isAutoClear" :value="isAutoClear" />
              </v-flex>
              <v-flex xs12 md12 class="input-button-wrap">
                <v-btn block color="cyan" dark @click="handleRandom">Randomize</v-btn>
              </v-flex>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-navigation-drawer
          temporary
          absolute
          right
          v-model="isOpen">
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
                <v-btn block color="cyan" dark @click="handleClearResult">Clear</v-btn>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        min: 0,
        max: 10,
        count: 11,
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
      }
    },
    methods: {
      handleRandom () {
        const { isRepeat, count, isAutoClear } = this
        this.result = isAutoClear ? [] : this.result
        const items = isRepeat ? this.items : this.items.filter(item => !this.result.includes(item))
        if (items.length >= count) {
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
    }
  }
</script>

<style scoped>
  .gray {
    background: #d0cccc;
  }
</style>
