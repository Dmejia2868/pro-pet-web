<template>
    <button @click="goToDashboard" class="btn btn-light btn-lg rounded-pill position-fixed bottom-0 end-0 px-2 py-2 m-4 text-dark">
      <span class="fs-1">⬅</span>
    </button>
  </template>
  
  <script>
  export default {
    name: "BackToDashboard",
    methods: {
      goToDashboard() {
        this.$router.push("/dashboard"); // Redirige usando Vue Router
      },
    },
  };
  </script>
  