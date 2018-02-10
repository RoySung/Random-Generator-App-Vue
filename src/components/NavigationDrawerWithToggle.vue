<template>
  <v-navigation-drawer
    temporary
    fixed
    right
    class="navigation-drawer-with-toggle"
    :value="isOpen"
    @input="(value) => $emit('input', value)">
      <button
        class="toggle-button lighten-3"
        :class="themeColor"
        @click="$emit('input', !isOpen)">
        <v-icon color="white" v-if="isOpen">keyboard_arrow_right</v-icon>
        <v-icon color="white" v-else>keyboard_arrow_left</v-icon>
      </button>
      <slot></slot>
  </v-navigation-drawer>
</template>

<script>
  export default {
    model: {
      prop: 'isOpen',
      event: 'input'
    },
    props: {
      isOpen: Boolean
    },
    computed: {
      themeColor () {
        return this.$bus.localStorageData.themeColor
      }
    }
  }
</script>

<style lang="scss">
  .navigation-drawer-with-toggle {
    overflow: visible;
    .toggle-button {
      position: absolute;
      width: 50px;
      height: 50px;
      top: calc((100vh - 50px) / 2);
      left: -50px;
      &:focus {
        outline: unset;
      }
      & + * {
        height: 100vh;
        overflow: scroll;
      }
    }
  }
</style>
