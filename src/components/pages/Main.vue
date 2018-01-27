<template>
  <v-container fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center>
        <v-flex>
          <div class="logo-wrap">
            <img src="../../assets/logo.png" alt="">
          </div>
          <v-flex md12 xs12>
            <v-btn block large dark color="cyan" @click="$router.push({ name: 'Number' })">
              <v-icon left>import_export</v-icon>Number Random
            </v-btn>
          </v-flex>
          <v-flex md12 xs12>
            <v-btn block large dark color="cyan" @click="$router.push({ name: 'CustomizeList' })">
              <v-icon  left>view_list</v-icon>Custom Random
            </v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  .logo-wrap {
    display: flex;
    justify-content: center;
    padding: 50px 0;
    img {
      max-height: 30vh;
    }
  }
</style>
