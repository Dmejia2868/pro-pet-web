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
            <label class="font-weight-bold">{{ field.label }}</label>

            <!-- ✅ Select para "Sí/No" en has_children y has_other_pets -->
            <select v-if="field.type === 'select'" v-model="form[field.id]" class="form-control">
              <option :value="true">Sí</option>
              <option :value="false">No</option>
            </select>

            <!-- ✅ Input para números -->
            <input v-else v-model="form[field.id]" :type="field.type" class="form-control" required />
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
  emits: ["close", "resultados"], // Emitimos los resultados al padre
  setup(_, { emit }) {
    const form = ref({
      preferred_size: 3,
      preferred_energy_level: 3,
      has_children: true,
      has_other_pets: true,
      home_space: 50,
    });

    const adopterFields = [
      { id: "preferred_size", label: "Tamaño Preferido (1-5)", type: "number" },
      { id: "preferred_energy_level", label: "Nivel de Energía Preferido (1-5)", type: "number" },
      { id: "has_children", label: "Tiene Niños", type: "select" },
      { id: "has_other_pets", label: "Tiene Otras Mascotas", type: "select" },
      { id: "home_space", label: "Espacio en Casa (m²)", type: "number" },
    ];

    const buscarPerros = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/dogs/search", form.value);

        // Emitimos los resultados al padre y cerramos el modal
        emit("resultados", response.data);
        emit("close");
      } catch (error) {
        console.error("❌ Error al buscar perros:", error);
      }
    };

    return { form, adopterFields, buscarPerros };
  }
};
</script>

<style scoped>
/* 🔥 Modal */
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

/* 🔴 Botón de cierre */
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
