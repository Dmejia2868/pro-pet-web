<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4 text-primary fw-bold">🐾 Gestión de Adopciones 🐾</h1>

    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow border-0">
          <div class="card-header bg-primary text-white text-center fw-bold">
            Registrar un Perro 🐶
          </div>
          <div class="card-body">
            <form @submit.prevent="registrarPerro">
              <div class="row">
                <div v-for="campo in camposPerro" :key="campo.id" class="col-md-6 mb-3">
                  <label :for="'campo-' + campo.id" class="form-label fw-bold">
                    {{ getEmojiForField(campo.id) }} {{ campo.label }}
                  </label>
                  <div v-if="campo.id === 'breed'">
                    <select
                      id="breed"
                      v-model="formulario.breed"
                      class="form-select border-primary"
                      required
                    >
                      <option value="" disabled>Seleccione una raza</option>
                      <option v-for="raza in razas" :key="raza" :value="raza">{{ raza }}</option>
                      <option value="Otro">Otro</option>
                    </select>
                    <div v-if="formulario.breed === 'Otro'" class="mt-2">
                      <label for="otherBreed" class="form-label fw-bold">✍️ Especifique la Raza</label>
                      <input
                        id="otherBreed"
                        v-model="formulario.otherBreed"
                        type="text"
                        class="form-control border-primary"
                        placeholder="Ingrese la raza"
                        required
                      />
                    </div>
                  </div>
                  <div v-else>
                    <select
                      v-if="campo.type === 'select'"
                      :id="'campo-' + campo.id"
                      v-model="formulario[campo.id]"
                      class="form-select border-primary"
                      required
                    >
                      <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                    </select>
                    <input
                      v-else
                      :id="'campo-' + campo.id"
                      v-model="formulario[campo.id]"
                      :type="campo.type"
                      class="form-control border-primary"
                      required
                    />
                  </div>
                </div>
              </div>


              <div class="mb-3">
                <label for="dog-image" class="form-label fw-bold">📸 Imagen del perro</label>
                <input
                  id="dog-image"
                  type="file"
                  @change="handleFileUpload"
                  accept="image/*"
                  class="form-control border-primary"
                />
              </div>

              <div v-if="imagenPreview" class="text-center mt-3">
                <p class="fw-bold">Vista previa:</p>
                <div class="card shadow p-3 d-flex justify-content-center align-items-center">
                  <img :src="imagenPreview" alt="Vista previa del perro" class="img-thumbnail rounded" style="max-width: 50%;" />
                </div>
              </div>

<button type="submit" class="btn btn-success w-100 fw-bold mt-4">
  {{ isEditing ? "✏️ Actualizar Perro" : "✅ Registrar Perro" }}
</button>
<button v-if="isEditing" @click="cancelEdit" type="button" class="btn btn-danger w-100 fw-bold mt-2">
  ❌ Cancelar
</button>


            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, defineEmits } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const emit = defineEmits(["close"]);


export default {
  props: {
    dog: Object,
    isEditing: Boolean,
  },
  setup(props, { emit }) {  // 🔥 Aquí recibimos `emit`
    const router = useRouter();

    const cancelEdit = () => {
      emit("close"); // 🔥 Si el padre lo está manejando, lo cierra
      router.push("/dogslist"); // 🔥 Redirigir a la lista de perros
    };

    // Estado del formulario
    const formulario = ref({
      name: "",
      breed: "",
      otherBreed: "",
      age: null,
      size: null,
      energyLevel: null,
      status: "active",
      adoption_status: "not_adopted",
      good_with_children: 3,
      good_with_pets: 3,
      space_requirement: null,
    });
const camposPerro = [
  { id: "name", label: "Nombre del perro", type: "text" },
  { id: "breed", label: "Raza", type: "select" },
  { id: "age", label: "Edad", type: "number" },
  { id: "size", label: "Tamaño (1=pequeño, 5=grande)", type: "number" },
  { id: "energyLevel", label: "Nivel de Energía (1-5)", type: "number" },
  { id: "good_with_children", label: "Compatibilidad con niños (1-5)", type: "select" },
  { id: "good_with_pets", label: "Compatibilidad con mascotas (1-5)", type: "select" },
  { id: "space_requirement", label: "Espacio requerido", type: "number" },
];


    const razas = [
      "Rottweiler",
      "Golden Retriever",
      "Pastor Alemán",
      "Chihuahua",
      "Doberman",
      "Labrador Retriever",
      "Beagle",
      "Schnauzer",
      "French Poodle",
      "Otro",
    ];


    const imagen = ref(null);
    const imagenPreview = ref(null);

    // **🚀 Nuevo: Verifica si está en edición y carga los datos**
watch(
  () => props.dog,
  (newDog) => {
    if (newDog) {
      formulario.value = { ...newDog }; // Cargar los datos en el formulario
      console.log("🐶 Datos cargados en formulario:", formulario.value);

      // 🔥 Asegurar que el ownerId se mantenga en el formulario
      if (!formulario.value.ownerId) {
        formulario.value.ownerId = newDog.ownerId || Number(localStorage.getItem("userId"));
      }

      // Si ya hay una imagen, mostrarla en la vista previa
      if (newDog.image) {
        imagenPreview.value = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}${newDog.image}`;
      }
    }
  },
  { immediate: true } // Ejecutar inmediatamente al montar el componente
);


    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        imagen.value = file;
        imagenPreview.value = URL.createObjectURL(file);
      }
    };

const registrarPerro = async () => {
  try {
    if (!formulario.value.name || !formulario.value.breed) {
      alert("⚠️ Nombre y raza son obligatorios.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Error: No has iniciado sesión.");
      return;
    }

    const numericOwnerId = Number(localStorage.getItem("userId"));
    if (isNaN(numericOwnerId) || numericOwnerId <= 0) {
      alert("⚠️ Error: No se ha identificado correctamente el propietario.");
      return;
    }

    // 🔥 Reemplazar `breed` con `otherBreed` si la opción "Otro" fue seleccionada
    if (formulario.value.breed === "Otro" && formulario.value.otherBreed) {
      formulario.value.breed = formulario.value.otherBreed;
    }

    formulario.value.ownerId = numericOwnerId;

    console.log("🔍 Verificación antes de enviar:");
    console.log("📌 Usuario autenticado:", numericOwnerId);
    console.log("🐶 Dueño del perro en formulario:", formulario.value.ownerId);
    console.log("📄 Datos enviados antes de validación:", JSON.stringify(formulario.value, null, 2));

    // 🔥 Asegurar que los valores del formulario NO sean `null` o `undefined`
    Object.keys(formulario.value).forEach((key) => {
      if (formulario.value[key] === null || formulario.value[key] === undefined || formulario.value[key] === "") {
        formulario.value[key] = "N/A"; // Asigna un valor por defecto si está vacío
      }
    });

    console.log("📄 Datos corregidos antes de enviar:", JSON.stringify(formulario.value, null, 2));

    const formData = new FormData();
    Object.entries(formulario.value).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imagen.value) {
      formData.append("image", imagen.value);
    }

    // 🔍 Validación de `FormData` antes de enviar
    console.log("📤 Validando FormData antes de enviar...");
    for (const pair of formData.entries()) {
      console.log(`🔍 ${pair[0]}: ${pair[1]}`);
    }

    if (![...formData.entries()].length) {
      console.error("❌ Error: FormData está vacío.");
      alert("⚠️ Error: No se están enviando datos. Verifica el formulario.");
      return;
    }

    if (props.isEditing) {
      console.log("✏️ Enviando datos para actualizar perro:", formulario.value);

      await axios.put(`http://localhost:3000/api/dogs/${formulario.value.id}`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Perro actualizado con éxito");
    } else {
      console.log("✅ Registrando nuevo perro con datos:", formulario.value);

      await axios.post("http://localhost:3000/api/dogs", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Perro registrado con éxito");
    }

    resetForm();
    router.push("/dogslist");
  } catch (error) {
    console.error("❌ Error al registrar perro:", error.response?.data || error.message);
    alert(error.response?.data?.error || "❌ Error al registrar perro.");
  }
};



    const resetForm = () => {
      formulario.value = {
        name: "",
        breed: "",
        otherBreed: "",
        age: null,
        size: null,
        energyLevel: null,
        good_with_children: 3,
        good_with_pets: 3,
        space_requirement: null,
      };
      imagen.value = null;
      imagenPreview.value = null;
    };

    const getEmojiForField = (fieldId) => {
      const emojis = {
        name: "🐕",
        breed: "📋",
        age: "🎂",
        size: "📏",
        energyLevel: "⚡",
        good_with_children: "👶",
        good_with_pets: "🐾",
        space_requirement: "🏠",
      };
      return emojis[fieldId] || "";
    };

    return {
      formulario,
      razas,
      registrarPerro,
      handleFileUpload,
      imagenPreview,
      cancelEdit,
      getEmojiForField,
      camposPerro
    };
  },
};
</script>
