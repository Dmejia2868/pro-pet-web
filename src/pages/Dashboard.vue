<template>
  <div class="d-flex vh-100">
    <!-- Menú lateral como componente -->
    <MenuSidebar />

    <!-- Contenido principal -->
    <main class="content">
      <img src="../assets/adoption-banner.avif" class="img-fluid rounded shadow-lg" alt="Adopción">
    </main>
  </div>
</template>

<script>
import MenuSidebar from "@/components/MenuSidebar.vue"; // Importa el componente MenuSidebar

export default {
  components: {
    MenuSidebar, // Registra el componente
  },
};
</script>

<style scoped>
.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -15px;
}
</style>
