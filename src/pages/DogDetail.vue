<template>
    <div class="container mt-5">
      <div v-if="dog" class="row">
        <div class="col-md-6">
          <img :src="dog.image" class="img-fluid rounded shadow" alt="Perro">
        </div>
        <div class="col-md-6">
          <h1 class="mb-3">{{ dog.name }}</h1>
          <p><strong>Raza:</strong> {{ dog.breed }}</p>
          <p><strong>Edad:</strong> {{ dog.age }} años</p>
          <p><strong>Descripción:</strong> {{ dog.description }}</p>
          <button class="btn btn-success w-100 mt-3" @click="adoptDog">Solicitar Adopción</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from "@/services/api";
  
  export default {
    data() {
      return {
        dog: null,
      };
    },
    async created() {
      try {
        const response = await api.get(`/dogs/${this.$route.params.id}`);
        this.dog = response.data;
      } catch (error) {
        console.error("Error al obtener detalles del perro:", error);
      }
    },
    methods: {
      async adoptDog() {
        try {
          await api.post(`/adoptions`, { dogId: this.dog.id, userId: 1 }); // ⚠️ Debes reemplazar con el usuario logueado
          alert("Solicitud de adopción enviada.");
        } catch (error) {
          console.error("Error al solicitar adopción:", error);
        }
      },
    },
  };
  </script>
  