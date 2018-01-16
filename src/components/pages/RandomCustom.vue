<template>
  <v-container class="random-custom">
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
                      <v-btn block outline color="cyan" @click="addItem(items.length)">
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content >
                      <v-text-field
                        name="count"
                        type="number"
                        label="Count"
                        v-model="count"
                      ></v-text-field>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content class="options-wrap">
                      <v-switch label="Repeat" v-model="isRepeat" value="isRepeat" />
                      <v-switch label="Auto Clear Result" v-model="isAutoClear" :value="isAutoClear" />
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content >
                      <v-btn block dark color="cyan" @click="handleRandom">Randomize</v-btn>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
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
        items: ['default', 'default1'],
        count: 1,
        isOpen: false,
        isRepeat: false,
        isAutoClear: true,
        result: []
      }
    },
    methods: {
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

<style lang="scss">
  .gray {
    background: #d0cccc;
  }
  .random-custom {
    .list__tile{
      height: 60px;
    }
  }
  .options-wrap {
    padding: 0 3px;
  }
</style>
