<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h2 class="text-center mb-4">Iniciar Sesión</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Correo Electrónico</label>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="Ingrese su correo">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Ingrese su contraseña">
          </div>
          <button type="submit" class="btn btn-success w-100">Ingresar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post("/users/login", {
          email: this.email,
          password: this.password,
        });
        console.log("Login exitoso:", response.data);
      } catch (error) {
        console.error("Error en el login:", error.response.data);
      }
    },
  },
};
</script>
