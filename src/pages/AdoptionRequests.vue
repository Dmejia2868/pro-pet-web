<template>
  <div v-if="dog" class="adoption-request">
    <h2 class="text-center">Solicitud de Adopción</h2>
    <div class="card">
      <img :src="dog.image" alt="Dog Image" />
      <h3>{{ dog.name }}</h3>
      <p><strong>Raza:</strong> {{ dog.breed }}</p>
      <p><strong>Años:</strong> {{ dog.age }} años</p>
      <button @click="acceptAdoption" class="btn btn-success mt-3">Aceptar Adopción</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dog: null
    };
  },
  created() {
    this.dog = this.$route.params.dog;
  },
  methods: {
    acceptAdoption() {
      let adoptedDogs = JSON.parse(localStorage.getItem("adoptedDogs")) || [];
      adoptedDogs.push(this.dog);
      localStorage.setItem("adoptedDogs", JSON.stringify(adoptedDogs));
      this.$router.push({ name: "AdoptedDog" });
    }
  }
};
</script>
