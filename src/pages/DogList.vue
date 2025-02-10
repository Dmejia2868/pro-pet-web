<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">🐶 Perros en adopción</h2>

    <!-- 🔍 Input de búsqueda -->
    <div class="search-container text-center mb-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="🔍      Search by name or breed..."
        class="form-control w-50 mx-auto"
      />
    </div>

    <!-- Búsqueda avanzada -->
    <div class="text-center mb-3 d-flex justify-content-center gap-3">
      <button @click="showModal = true" class="btn btn-primary btn-lg w-40 fw-bold">
        🔍 Búsqueda avanzada
      </button>

      <button @click="toggleMyDogs" class="btn btn-primary">
        {{ showMyDogs ? "Mostrar todos" : "Mis Perros" }}
      </button>
    </div>

    <AdvancedSearch
      :isOpen="showModal"
      @close="showModal = false"
      @resultados="updateDogList"
    />

    <!-- Mostrar el formulario de edición si se está editando -->
    <div v-if="showEditForm">
<Owner
  v-if="showEditForm && dogToEdit"
  :dog="dogToEdit"
  :isEditing="true"
  @updated="updateDog"
  @close="showEditForm = false"
/>

    </div>

    <!-- Dog Cards -->
    <div class="row" v-else>
      <div v-for="dog in filteredDogs" :key="dog.id" class="col-md-4 mb-4 d-flex align-items-stretch">
        <div :class="['card w-100 shadow border-0', expandedDog === dog.id ? 'bg-info bg-opacity-25' : '']">
          <div class="ratio ratio-4x3">
            <img
              :src="dog.image ? getFullImagePath(dog.image) : defaultImage"
              class="card-img-top img-fluid object-fit-contain"
              :alt="`Photo of ${dog.name}`"
            />
          </div>
          <div class="card-body d-flex text-center flex-column">
            <h3 class="card-title fw-bold">{{ dog.name }}</h3>
<p v-if="typeof dog.score !== 'undefined'" class="text-muted">
  ⭐ Coincidencia: {{ dog.score }}
</p>

            <button
              @click="toggleDetails(dog.id)"
              class="btn mt-auto mx-auto w-30"
              :class="expandedDog === dog.id ? 'btn-danger' : 'btn-primary'"
              :aria-expanded="expandedDog === dog.id ? 'true' : 'false'"
              :data-bs-toggle="'collapse'"
              :data-bs-target="'#collapse-' + dog.id"
            >
              {{ expandedDog === dog.id ? "Ocultar" : "Ver" }}
            </button>
          </div>

          <div :id="'collapse-' + dog.id" class="collapse">
            <div class="card-body text-center">
              <p><strong>Raza:</strong> {{ dog.breed }}</p>
              <p><strong>Años:</strong> {{ dog.age }} años</p>
              <p><strong>Tamaño:</strong> {{ dog.size }}</p>
              <p><strong>Nivel de energía:</strong> {{ dog.energyLevel }}</p>

              <!-- Si el perro pertenece al usuario, mostrar botones de editar y eliminar -->
              <div v-if="dog.ownerId == userId">
                <button @click="editDog(dog)" class="btn btn-warning mt-3">✏️ Editar</button>
                <button @click="deleteDog(dog)" class="btn btn-danger mt-3">🗑️ Eliminar</button>
              </div>

              <!-- Si el perro NO pertenece al usuario, mostrar botón de adoptar -->
              <div v-else>
                <button v-if="!dog.isAdopted" @click="adoptDog(dog)" class="btn btn-success mt-3">
                  🐾 Adoptar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results Message -->
    <div v-if="filteredDogs.length === 0" class="text-center mt-4">
      <p class="text-muted">❌ No se encontraron perros con ese criterio.</p>
    </div>
    <BackToDashboard />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import AdvancedSearch from "@/components/AdvancedSearch.vue";
import { getDogsWithOwners } from "@/services/dogApiService.js";
import defaultImagePath from "@/assets/cachorros.jpeg";
import BackToDashboard from "@/components/BackToDashboard.vue";
import Owner from "./Owner.vue";

export default {
  components: { AdvancedSearch, BackToDashboard, Owner },
  setup() {
    const showModal = ref(false);
    const dogs = ref([]);
    const expandedDog = ref(null);
    const searchQuery = ref("");
    const showMyDogs = ref(false);
    const advancedSearch = ref(false);
    const showEditForm = ref(false);
    const dogToEdit = ref(null);

const editDog = (dog) => {
  console.log(`✏️ Editando perro con ID: ${dog.id}`);
  dogToEdit.value = { ...dog }; // Se guarda la info del perro
  console.log("Datos del perro a editar:", dogToEdit.value);
  showEditForm.value = true; // Se activa el formulario de edición
};


const updateDog = (updatedDog) => {
  const index = dogs.value.findIndex((d) => d.id === updatedDog.id);
  if (index !== -1) {
    dogs.value[index] = { ...updatedDog };
  }
  showEditForm.value = false;
};


    const deleteDog = async (dog) => {
      if (!confirm(`¿Estás seguro de que quieres eliminar a ${dog.name}?`)) {
        return;
      }

      try {
        dogs.value = dogs.value.filter((d) => d.id !== dog.id);
        console.log(`✅ Perro eliminado: ${dog.name}`);
      } catch (error) {
        console.error("❌ Error al eliminar el perro:", error);
      }
    };

    // ✅ Obtener el ID del usuario autenticado desde localStorage
    const userId = ref(parseInt(localStorage.getItem("userId"), 10) || null);

    console.log("🔍 User ID cargadooooo:", userId.value);


    const toggleDetails = (dogId) => {
      if (expandedDog.value === dogId) {
        expandedDog.value = null;
      } else {
        expandedDog.value = dogId;
        document.querySelectorAll(".collapse.show").forEach((el) => el.classList.remove("show"));
      }
    };

    const adoptDog = (dog) => {
      this.$router.push({ name: "AdoptionRequest", params: { dog } });
    };


const toggleMyDogs = () => {
    showMyDogs.value = !showMyDogs.value;
    console.log("🔁 Estado cambiado (Mis Perros):", showMyDogs.value);
};


    const getFullImagePath = (imagePath) => {
      if (!imagePath) return defaultImagePath;
      if (imagePath.startsWith("http")) return imagePath;
      return `${import.meta.env.VITE_API_URL || "http://localhost:3000"}${imagePath}`;
    };

    const loadDogs = async () => {
      try {
        dogs.value = await getDogsWithOwners();
      } catch (error) {
        console.error("❌ Error fetching dogs:", error);
      }
    };

    loadDogs();

    

const updateDogList = (newDogs) => {
  console.log("📥 Recibidos datos en updateDogList:", newDogs);

  // 🔥 Verificar si cada perro tiene un 'score'
  newDogs.forEach(dog => {
    if (typeof dog.score === "undefined") {
      console.warn(`⚠️ El perro con ID ${dog.id} no tiene un score asignado.`);
    }
  });

  dogs.value = newDogs;
};

const filteredDogs = computed(() => {
    console.log("📌 Estado de showMyDogs:", showMyDogs.value);
    console.log("👤 User ID:", userId.value, " (Tipo:", typeof userId.value, ")");

    let filtered = [...dogs.value]; // Copia del array original

    if (showMyDogs.value) {
        filtered = filtered.filter(dog => {
            console.log(`🔍 Comparando ownerId (${dog.ownerId}, Tipo: ${typeof dog.ownerId}) con userId (${userId.value}, Tipo: ${typeof userId.value})`);
            return Number(dog.ownerId) === Number(userId.value);
        });
    }

    console.log("✅ Perros después del filtro (Mis Perros):", filtered);

    if (searchQuery.value.trim() !== "") {
        filtered = filtered.filter(dog =>
            dog.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            dog.breed.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    console.log("✅ Perros después del filtro de búsqueda:", filtered);
    return filtered;
});


 


return {
  showModal,
  dogs,
  expandedDog,
  toggleDetails,
  getFullImagePath,
  searchQuery,
  filteredDogs,
  toggleMyDogs,
  adoptDog,
  showMyDogs,
  editDog,
  deleteDog,
  showEditForm,
  dogToEdit,
  updateDog,
  userId,
  advancedSearch,
  updateDogList, // ✅ Asegúrate de incluirlo aquí
};

  },
};
</script>

<style scoped>
.card {
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.03);
}

.card-body {
  display: flex;
  flex-direction: column;
}
</style>
