<template>
  <p-navbar :model="navbarItems" class="navbar">

    <template #start >
      <a href="/">
        <img alt="logo" src="../assets/nil_events_logo_horizontal.png" height="50" >
      </a>
    </template>

    <template #end style="padding-right: 2%">

      <div class="navbar-login" v-if="!isLogged" >
        <div style="margin-right: 5%">
          <p-button class="p-button-raised p-button-rounded p-button-lg" style="color: white; background-image: linear-gradient(to right, #3700ff, #c800ff); width: max-content ">
            Sign Up
          </p-button>
        </div>

        <div >
          <p-button class="p-button-raised p-button-rounded p-button-lg" style="color: black; background-color: white">
            Login
          </p-button>
        </div>

      </div>

      <div class="navbar-welcome" v-if="isLogged">
        <div class="user-name-string" style="padding-right: 10px; padding-top: 5%">
          <strong>John Smith</strong>
        </div>
        <!--            TODO: User's name and image-->
        <div>
          <img src="https://via.placeholder.com/50" class="img-thumbnail">
        </div>
      </div>

    </template>
  </p-navbar>
</template>

<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      navbarItems: [],
      isLogged: false
    }
  }
}
</script>

<style scoped>

</style>