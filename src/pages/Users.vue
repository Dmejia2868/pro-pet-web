<template>
    <div class="container mt-4">
      <h2 class="text-center fw-bold">Usuarios</h2>
  
      <!-- Sección para elegir tipo de usuario -->
      <div class="text-center">
        <button class="btn btn-primary me-2" @click="view = 'owner'">👤 Propietario</button>
        <button class="btn btn-success" @click="view = 'adopter'">🐶 Adoptante</button>
      </div>
  
      <!-- 📌 Vista del Propietario -->
      <div v-if="view === 'owner'" class="mt-4">
        <h3>Gestión de Perros</h3>
        <form @submit.prevent="addDog">
          <input v-model="dog.name" type="text" placeholder="Nombre del perro" class="form-control mb-2" required />
          <input v-model="dog.breed" type="text" placeholder="Raza" class="form-control mb-2" required />
          <input v-model="dog.age" type="number" placeholder="Edad" class="form-control mb-2" required />
          <button type="submit" class="btn btn-primary">Agregar Perro</button>
        </form>
      </div>
  
      <!-- 📌 Vista del Adoptante -->
      <div v-if="view === 'adopter'" class="mt-4">
        <h3>Formulario de Preferencias</h3>
        <form @submit.prevent="savePreferences">
          <input v-model="preferences.preferred_size" type="number" placeholder="Tamaño preferido (1-5)" class="form-control mb-2" required />
          <input v-model="preferences.preferred_energy_level" type="number" placeholder="Nivel de energía (1-5)" class="form-control mb-2" required />
          <button type="submit" class="btn btn-success">Guardar Preferencias</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        view: "owner",
        dog: { name: "", breed: "", age: "" },
        preferences: { preferred_size: "", preferred_energy_level: "" }
      };
    },
    methods: {
      async addDog() {
        try {
          await axios.post("http://localhost:3000/api/users/owner/add-dog", this.dog);
          alert("Perro agregado exitosamente");
        } catch (error) {
          console.error("❌ Error:", error);
        }
      },
      async savePreferences() {
        try {
          await axios.post("http://localhost:3000/api/users/adopter/preferences", this.preferences);
          alert("Preferencias guardadas exitosamente");
        } catch (error) {
          console.error("❌ Error:", error);
        }
      }
    }
  };
  </script>
  