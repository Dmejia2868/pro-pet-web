<template>
  <div class="d-flex vh-100">
    <!-- Menú lateral -->
    <nav class="sidebar d-flex flex-column align-items-center p-3">
      <h2 class="text-white fw-bold">Menú</h2>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/dogslist" class="nav-link text-white">🐶 Perros</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/users/owner" class="nav-link text-white">📤 Dar en Adopción</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/requests" class="nav-link text-white">📄 Adopciones</router-link>
        </li>
      </ul>
    </nav>

    <!-- Contenido principal -->
    <main class="content">
      <img src="@/assets/adoption-banner.avif" class="img-fluid rounded shadow-lg" alt="Adopción">
    </main>
  </div>
</template>

<style scoped>
/* Menú lateral */
.sidebar {
  width: 250px;
  background: rgba(19, 25, 219, 0.2); /* Transparente */
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

/* Estilo del menú */
.nav {
  width: 100%;
  text-align: center;
}

.nav-link {
  padding: 10px 0;
  transition: 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

/* Ajuste de contenido */
.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -15px;
}
</style>
