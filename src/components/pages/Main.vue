<template>
  <v-container fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center>
        <v-flex>
          <div class="logo-wrap">
            <input type="checkbox">
            <img :class="themeColor" src="../../assets/dice-clear.png" alt="">
          </div>
          <v-flex md12 xs12>
            <v-btn block large dark :color="themeColor" @click="$router.push({ name: 'Number' })">
              <v-icon left>import_export</v-icon>
              {{ $t('Random Number') }}
            </v-btn>
          </v-flex>
          <v-flex md12 xs12>
            <v-btn block large dark :color="themeColor" @click="$router.push({ name: 'CustomizeList' })">
              <v-icon  left>view_list</v-icon>
              {{ $t('Random Custom') }}
            </v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  export default {
    computed: {
      themeColor () {
        return this.$bus.localStorageData.themeColor
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    margin: 50px 0;
    img {
      max-height: 30vh;
      border-radius: 100%;
      transform: rotate(0turn);
      transition: transform 1s ease;
    }
    input[type=checkbox] {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      @media screen and (min-width: 768px) {
        &:hover + img {
          transform: rotate(1turn);
        }
      }
      @media screen and (max-width: 768px) {
        &:checked + img {
          transform: rotate(1turn);
        }
      }
    }
  }
</style>
