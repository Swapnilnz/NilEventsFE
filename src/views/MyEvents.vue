<template>
  <div>
    <NavbarComponent/>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
export default {
  name: "MyEvents",
  components: {NavbarComponent},

  data() {
    return {
      myEvents: [],
      userId: null,
    }
  },

  created() {

  },

  getAllEvents() {
    this.$router.push({name: 'My Events'});
  }

}
</script>

<style scoped>

</style>