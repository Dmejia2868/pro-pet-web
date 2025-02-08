<template>
  <div class="dropdown">
    <button @click="selectRole('owner')">Owner</button>
    <button @click="selectRole('adopter')">Adopter</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const selectRole = (role) => {
      localStorage.setItem('userRole', role);
      
      // Simulación: Debes obtener el userId de la sesión real
      const userId = "123";  // Reemplazar con el valor real desde el backend
      localStorage.setItem("userId", userId);

      if (role === 'owner') {
        router.push('/manage-adoption');
      } else {
        router.push('/explore-adoptions');
      }
    };

    return { selectRole };
  }
};
</script>
