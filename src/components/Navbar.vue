<template>
  <nav class="navbar bg-dark shadow-sm px-4">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <!-- Nombre de la app -->
      <a class="navbar-brand fs-3 fw-bold text-white">ProAdoption</a>

      <!-- Botón de Cerrar Sesión -->
      <button @click="handleLogout" class="btn btn-outline-light logout-btn">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import { logout } from "@/services/authServices.js"; // ✅ Importamos la función de logout

export default {
  methods: {
    handleLogout() {
      logout(); // 🔄 Llamamos la función desde authService.js
    }
  }
};
</script>

<<<<<<< HEAD
<style scoped>

</style>
=======

>>>>>>> 701b19c (commit 8)
