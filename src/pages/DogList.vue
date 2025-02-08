<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">🐶 Perros en Adopción</h2>

    <!-- 🔍 Input de búsqueda -->
    <div class="search-container text-center mb-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar por nombre o raza..."
        class="search-input"
      />
    </div>

    <!-- Botones de búsqueda avanzada y Mis Perros -->
    <div class="text-center mb-3 d-flex justify-content-center gap-3">
      <button @click="showModal = true" class="btn btn-advanced">
        <span class="icon">🔍</span> Búsqueda Avanzada
      </button>
      <button @click="toggleMyDogs" class="btn btn-primary">
        {{ showMyDogs ? "Mostrar Todos" : "Mis Perros" }}
      </button>
    </div>

    <!-- Modal de búsqueda avanzada -->

    <AdvancedSearch
      :isOpen="showModal"
      @close="showModal = false"
      @resultados="actualizarListaPerros"
    />


    <div class="row">
      <div v-for="dog in filteredDogs" :key="dog.id" class="col-md-4 mb-4">
        <div class="card">
          <img 
            :src="dog.image ? getFullImagePath(dog.image) : defaultImage" 
            class="card-img-top" 

            :alt="`Foto de ${dog.name}`"
          />
          <div class="card-body">
            <p v-if="busquedaAvanzada && typeof dog.score !== 'undefined'" class="text-muted">
              ⭐ Puntaje: {{ dog.score }}
            </p>
            <h5 class="card-title">{{ dog.name }}</h5>
            <button @click="toggleDetails(dog.id)" class="btn btn-primary">
              {{ expandedDog === dog.id ? "Ocultar" : "Ver" }}
            </button>
          </div>


          <!-- Información Expandida -->
          <div v-if="expandedDog === dog.id" class="card-body border-top">
            <p><strong>Raza:</strong> {{ dog.breed }}</p>
            <p><strong>Edad:</strong> {{ dog.age }} años</p>
            <p><strong>Tamaño:</strong> {{ dog.size }}</p>
            <p><strong>Nivel de Energía:</strong> {{ dog.energyLevel }}</p>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay resultados -->
      <div v-if="filteredDogs.length === 0" class="text-center mt-4">
        <p class="text-muted">❌ No se encontraron perros con ese criterio.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import AdvancedSearch from "@/components/AdvancedSearch.vue";
import { getDogs } from "@/services/dogApiService.js";
import defaultImagePath from "@/assets/cachorros.jpeg";

export default {
  components: { AdvancedSearch },
  setup() {
    const showModal = ref(false);
    const dogs = ref([]);
    const expandedDog = ref(null);
    const searchQuery = ref("");
    const showMyDogs = ref(false);

    const busquedaAvanzada = ref(false);

    const userId = "current_user_id"; // Reemplaza esto con el identificador real del usuario actual

    const toggleDetails = (dogId) => {
      expandedDog.value = expandedDog.value === dogId ? null : dogId;
    };

    const toggleMyDogs = () => {
      showMyDogs.value = !showMyDogs.value;
    };

    const getFullImagePath = (imagePath) => {
      if (!imagePath) return defaultImagePath;
      if (imagePath.startsWith("http")) return imagePath;
      return `${import.meta.env.VITE_API_URL || "http://localhost:3000"}${imagePath}`;
    };

    // 🔄 Cargar perros al iniciar
    const cargarPerros = async () => {
      try {
        dogs.value = await getDogs();
      } catch (error) {
        console.error("❌ Error al obtener los perros:", error);
      }
    };


    const filteredDogs = computed(() => {
      let filtered = dogs.value.map((dog) => ({ ...dog }));

      filtered = filtered.filter(
        (dog) =>
          dog.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          dog.breed.toLowerCase().includes(searchQuery.value.toLowerCase())
      );

      if (showMyDogs.value) {
        filtered = filtered.filter((dog) => dog.createdBy === userId);
      }

      return filtered;
    });

    const actualizarListaPerros = (resultados) => {
      dogs.value = [...resultados];
      busquedaAvanzada.value = true;
      showModal.value = false;
      console.log("📊 Perros actualizados con puntajes:", resultados);
    };


    cargarPerros();

    return {
      showModal,
      dogs,
      expandedDog,
      toggleDetails,
      getFullImagePath,
      searchQuery,
      filteredDogs,
      toggleMyDogs,
      showMyDogs,
      actualizarListaPerros,

      busquedaAvanzada,
    };
  },

};
</script>

<style scoped>
/* 🎨 Caja de búsqueda */
.search-container {
  display: flex;
  justify-content: center;
}

.search-input {
  width: 50%;
  max-width: 400px;
  padding: 10px;
  border: 2px solid #4caf50;
  border-radius: 20px;
  text-align: center;
  font-size: 1rem;
  outline: none;
  transition: 0.3s;
}

.search-input:focus {
  border-color: #388e3c;
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.5);
}

/* 🛠 Tarjetas */
.card {
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.03);
}

/* 🔍 Botón de búsqueda avanzada */
.btn-advanced {
  background: linear-gradient(45deg, #4caf50, #81c784);
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-advanced:hover {
  background: linear-gradient(45deg, #388e3c, #66bb6a);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
}

.icon {
  font-size: 1.5rem;
  animation: glow 1.5s infinite alternate;
}



@keyframes glow {
  from {
    text-shadow: 0 0 5px #ffffff;
  }
  to {
    text-shadow: 0 0 15px #00ff00;
  }
}
</style>
