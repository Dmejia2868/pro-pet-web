<template>
  <div class="container mx-auto p-6">
    <h1 class="text-xl font-bold">Gestión de Adopciones</h1>

    <!-- Formulario para registrar perro -->
    <form @submit.prevent="registrarPerro" class="mt-4 bg-white p-4 rounded shadow">
      <div v-for="campo in camposPerro" :key="campo.id" class="mb-4">
        <label :for="'campo-' + campo.id" class="block text-sm font-bold">{{ campo.label }}</label>
        <select
          v-if="campo.type === 'select'"
          :id="'campo-' + campo.id"
          v-model="formulario[campo.id]"
          class="w-full p-2 border rounded"
          required
        >
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>

        <input
          v-else
          :id="'campo-' + campo.id"
          v-model="formulario[campo.id]"
          :type="campo.type"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <!-- Nuevo campo: Teléfono -->
      <div class="mb-4">
        <label for="phone" class="block text-sm font-bold">Teléfono</label>
        <input
          id="phone"
          v-model="formulario.phone"
          type="tel"
          class="w-full p-2 border rounded"
          required
          placeholder="Ingrese su número de teléfono"
        />
      </div>

      <!-- Nuevo campo: Dirección -->
      <div class="mb-4">
        <label for="address" class="block text-sm font-bold">Dirección</label>
        <textarea
          id="address"
          v-model="formulario.address"
          class="w-full p-2 border rounded"
          required
          placeholder="Ingrese su dirección completa"
        ></textarea>
      </div>

      <label for="dog-image" class="block text-sm font-bold">Imagen del perro</label>
      <input
        id="dog-image"
        type="file"
        @change="handleFileUpload"
        accept="image/*"
        class="w-full p-2 border rounded"
      />

      <div v-if="imagenPreview" class="mt-4">
        <p class="text-sm font-bold">Vista previa:</p>
        <img :src="imagenPreview" alt="Vista previa del perro" class="w-32 h-32 object-cover rounded shadow" />
      </div>

      <button type="submit" class="bg-blue-500 text-white p-2 rounded mt-4">Registrar Perro</button>
    </form>

    <!-- Lista de solicitudes de adopción -->
    <div class="mt-6">
      <h2 class="text-lg font-semibold">Solicitudes Recibidas</h2>
      <ul>
        <li v-for="solicitud in solicitudes" :key="solicitud.id">
          {{ solicitud.nombreAdoptante }} - Estado: {{ solicitud.estado }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const formulario = ref({
      name: "",
      breed: "",
      age: null,
      size: null,
      energyLevel: null,
      status: "active",
      adoption_status: "not_adopted",
      good_with_children: 3,
      good_with_pets: 3,
      space_requirement: null,
      phone: "",
      address: "",
    });

    const camposPerro = [
      { id: "name", label: "Nombre del perro", type: "text" },
      { id: "breed", label: "Raza", type: "text" },
      { id: "age", label: "Edad", type: "number" },
      { id: "size", label: "Tamaño (1=pequeño, 5=grande)", type: "number" },
      { id: "energyLevel", label: "Nivel de Energía (1-5)", type: "number" },
      { id: "good_with_children", label: "Compatibilidad con niños (1-5)", type: "select" },
      { id: "good_with_pets", label: "Compatibilidad con mascotas (1-5)", type: "select" },
      { id: "space_requirement", label: "Espacio requerido", type: "number" },
    ];

    const solicitudes = ref([]);
    const imagen = ref(null);
    const imagenPreview = ref(null);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        imagen.value = file;
        imagenPreview.value = URL.createObjectURL(file);
      }
    };

    const registrarPerro = async () => {
      try {
        const ownerId = localStorage.getItem("userId");
        if (!ownerId) {
          alert("Error: No se ha identificado correctamente el propietario.");
          return;
        }

        const numericOwnerId = Number(ownerId);
        if (isNaN(numericOwnerId) || numericOwnerId <= 0) {
          alert("Error: No se ha identificado correctamente el propietario.");
          return;
        }

        const formData = new FormData();
        formData.append("ownerId", numericOwnerId);

        Object.keys(formulario.value).forEach((key) => {
          if (formulario.value[key] !== null && formulario.value[key] !== "") {
            formData.append(key, formulario.value[key]);
          }
        });

        if (imagen.value) {
          formData.append("image", imagen.value);
        }

        await axios.post("http://localhost:3000/api/dogs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("🐶 Perro registrado con éxito");
        resetForm();
      } catch (error) {
        console.error("❌ Error al registrar perro:", error.response?.data || error.message);
      }
    };

    const resetForm = () => {
      formulario.value = {
        name: "",
        breed: "",
        age: null,
        size: null,
        energyLevel: null,
        good_with_children: 3,
        good_with_pets: 3,
        space_requirement: null,
        phone: "",
        address: "",
      };
      imagen.value = null;
      imagenPreview.value = null;
    };

    return {
      formulario,
      camposPerro,
      registrarPerro,
      solicitudes,
      handleFileUpload,
      imagenPreview,
    };
  },
};
</script>
