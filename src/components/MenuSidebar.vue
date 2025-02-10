<template>
  <nav class="sidebar d-flex flex-column align-items-center p-3">
    <h2 class="text-white fw-bold">Menú</h2>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link to="/dogslist" class="nav-link text-white">🐶 Perros</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/users/owner" class="nav-link text-white">📤 Dar en Adopción</router-link>
      </li>
      <!-- Submenu de Adopciones -->
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-white" href="#" id="adoptionsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          📄 Adopciones
        </a>
        <ul class="dropdown-menu" aria-labelledby="adoptionsDropdown">
          <li><a @click="redirectToAdoptionRequest" class="dropdown-item">Proceso de adopción</a></li>
          <li><a @click="redirectToAdopted" class="dropdown-item">Adoptados</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const redirectToAdoptionRequest = () => {
      router.push("/requests");
    };

    const redirectToAdopted = () => {
      router.push("/adopted");
    };

    return {
      redirectToAdoptionRequest,
      redirectToAdopted,
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: rgba(19, 25, 219, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

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

.dropdown-menu {
  background: rgba(19, 25, 219, 0.8);
  border: none;
}

.dropdown-item {
  color: white;
  transition: 0.3s;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
