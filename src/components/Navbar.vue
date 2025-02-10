<template>
  <header class="bg-dark shadow-sm py-3">
    <div class="container-fluid d-flex justify-content-between align-items-center py-" >
      <!-- Nombre de la app con redirección a Dashboard y sin subrayado -->
      <a @click="redirectToDashboard" class="fs-3 fw-bold text-white text-decoration-none" style="cursor: pointer;">ProAdoption</a>

      <!-- Botón de Cerrar Sesión -->
      <button @click="handleLogout" class="btn btn-outline-light logout-btn">
        <i class="fas fa-sign-out-alt"></i>
      </button>
    </div>
  </header>
</template>

<script>
import { logout } from "@/services/authServices.js"; // ✅ Importamos la función de logout
import { useRouter } from "vue-router"; // ✅ Importamos el router para la redirección

export default {
  setup() {
    const router = useRouter();

    const redirectToDashboard = () => {
      router.push("/dashboard");
    };

    const handleLogout = () => {
      logout(); // 🔄 Llamamos la función desde authService.js
    };

    return {
      redirectToDashboard,
      handleLogout,
    };
  },
};
</script>
