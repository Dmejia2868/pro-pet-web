<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h2>🔎 Búsqueda Avanzada</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="buscarPerros">
          <div v-for="field in adopterFields" :key="field.id" class="form-group">
            <label :for="'field-' + field.id" class="font-weight-bold">{{ field.label }}</label>

            <!-- Select con valores descriptivos -->
            <select
              v-if="field.options"
              :id="'field-' + field.id"
              v-model="form[field.id]"
              class="form-control"
            >
              <option v-for="option in field.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>

            <!-- Input para otros tipos (números) -->
            <input
              v-else
              :id="'field-' + field.id"
              v-model="form[field.id]"
              :type="field.type"
              class="form-control"
              required
            />
          </div>

          <button type="submit" class="btn btn-success mt-3">Buscar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  props: { isOpen: Boolean },
  emits: ["close", "resultados"],

  setup(_, { emit }) {
    const form = ref({
      size: 3, // Tamaño preferido (1-5)
      energyLevel: 3, // Nivel de energía preferido (1-5)
      good_with_children: 3, // Compatibilidad con niños (1-5)
      good_with_pets: 3, // Compatibilidad con otras mascotas (1-5)
      space_requirement: 50, // Espacio mínimo requerido en m²
    });

    const adopterFields = [
      { 
        id: "size", 
        label: "Tamaño Preferido", 
        options: [
          { value: 1, label: "Muy Pequeño" },
          { value: 2, label: "Pequeño" },
          { value: 3, label: "Mediano" },
          { value: 4, label: "Grande" },
          { value: 5, label: "Muy Grande" }
        ]
      },
      { 
        id: "energyLevel", 
        label: "Nivel de Energía Preferido", 
        options: [
          { value: 1, label: "Muy Bajo" },
          { value: 2, label: "Bajo" },
          { value: 3, label: "Moderado" },
          { value: 4, label: "Alto" },
          { value: 5, label: "Muy Alto" }
        ]
      },
      { 
        id: "good_with_children", 
        label: "Compatibilidad con Niños", 
        options: [
          { value: 1, label: "Nada Compatible" },
          { value: 2, label: "Poco Compatible" },
          { value: 3, label: "Neutral" },
          { value: 4, label: "Compatible" },
          { value: 5, label: "Muy Compatible" }
        ]
      },
      { 
        id: "good_with_pets", 
        label: "Compatibilidad con Otras Mascotas", 
        options: [
          { value: 1, label: "Nada Compatible" },
          { value: 2, label: "Poco Compatible" },
          { value: 3, label: "Neutral" },
          { value: 4, label: "Compatible" },
          { value: 5, label: "Muy Compatible" }
        ]
      },
      { id: "space_requirement", label: "Espacio en Casa (m²)", type: "number" },
    ];

    const buscarPerros = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/dogs/search", form.value);
        let perros = response.data;
        console.log("📢 Datos recibidos de la API:", perros);

        // ✅ Aplicar búsqueda ponderada para asignar 'score'
        perros.forEach((perro) => {
          let score = 0;

          // Comparar tamaño
          score += 5 - Math.abs(perro.size - form.value.size);

          // Comparar nivel de energía
          score += 5 - Math.abs(perro.energyLevel - form.value.energyLevel);

          // Comparar compatibilidad con niños
          score += 5 - Math.abs(perro.good_with_children - form.value.good_with_children);

          // Comparar compatibilidad con mascotas
          score += 5 - Math.abs(perro.good_with_pets - form.value.good_with_pets);

          // Comparar espacio requerido
          let espacioDiff = Math.abs(perro.space_requirement - form.value.space_requirement);
          score += espacioDiff <= 10 ? 5 : (espacioDiff <= 20 ? 3 : 1);

          perro.score = score;
        });

        // 🔥 Ordenar los perros por su puntaje antes de enviarlos
        perros.sort((a, b) => b.score - a.score);

        console.log("📤 Enviando perros con puntaje asignado:", perros);
        emit("resultados", perros);
        emit("close");
      } catch (error) {
        console.error("❌ Error al buscar perros:", error);
      }
    };

    return { form, adopterFields, buscarPerros };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 90%;
  max-width: 500px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.form-group {
  text-align: left;
  margin-bottom: 10px;
}

.modal-body {
  margin-top: 15px;
}
</style>
