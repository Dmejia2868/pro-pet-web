<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
};

</script>

<template>
  <Navbar />
  <div class="container mt-4">
    <router-view />
  </div>
</template>


