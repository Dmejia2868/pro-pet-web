<template>
    <div class="adopted-dogs">
      <h2 class="text-center">🐾 Perros Adoptados</h2>
      <div v-for="dog in adoptedDogs" :key="dog.id" class="card mb-4">
        <img :src="dog.image" alt="Dog Image" />
        <h3>{{ dog.name }}</h3>
        <p><strong>Raza:</strong> {{ dog.breed }}</p>
        <p><strong>Años:</strong> {{ dog.age }} años</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        adoptedDogs: []
      };
    },
    created() {
      this.adoptedDogs = JSON.parse(localStorage.getItem("adoptedDogs")) || [];
    }
  };
  </script>
  