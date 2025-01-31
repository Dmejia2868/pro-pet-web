<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Perros Disponibles para Adopción</h1>
      <div class="row">
        <div v-for="dog in dogs" :key="dog.id" class="col-md-4">
          <div class="card shadow">
            <img :src="dog.image" class="card-img-top" alt="Perro">
            <div class="card-body">
              <h5 class="card-title">{{ dog.name }}</h5>
              <p class="card-text"><strong>Raza:</strong> {{ dog.breed }}</p>
              <p class="card-text"><strong>Edad:</strong> {{ dog.age }} años</p>
              <router-link :to="`/dog/${dog.id}`" class="btn btn-primary w-100">Ver más</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from "@/services/api";
  
  export default {
    data() {
      return {
        dogs: [],
      };
    },
    async created() {
      try {
        const response = await api.get("/dogs");
        this.dogs = response.data;
      } catch (error) {
        console.error("Error al obtener los perros:", error);
      }
    },
  };
  </script>
  