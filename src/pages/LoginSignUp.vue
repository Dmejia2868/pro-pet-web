<template> 
  <div class="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="row w-100">
      <!-- Contenedor izquierdo con imagen y slogan -->
      <div class="col-md-6 text-center d-flex flex-column align-items-center justify-content-center">

        <img src="@/assets/cachorros.jpeg" alt="Cachorros felices" class="img-fluid rounded shadow-lg mb-3" style="max-width: 100%;">

        <h4 class="text-dark">"El amor no se compra, se adopta."</h4>
      </div>

      <!-- Contenedor derecho con botones y formularios -->
      <div class="col-md-6 d-flex flex-column align-items-center justify-content-center">
        <div class="card shadow-lg text-center p-4 w-75">
          <!-- Botones de Login y Registro -->
          <div v-if="!isLoginActive && !isSignUpActive">
            <button class="btn btn-primary w-100 mb-3" @click="showLogin">Iniciar Sesión</button>
            <button class="btn btn-success w-100" @click="showSignup">Registrarse</button>
          </div>

          <!-- Formulario de Login -->
          <div v-if="isLoginActive">
            <h3 class="mb-3">Iniciar Sesión</h3>
            <a href="#" @click.prevent="hideForms" class="d-block text-start mb-2">
              <i class="bi bi-arrow-left"></i> Volver
            </a>
            <form @submit.prevent="handleLogin">
              <div class="mb-3">

                
                <label for="login-email" class="form-label">Correo</label>
                <input id="login-email" type="email" class="form-control" v-model="login.email" placeholder="Ingrese su correo" required />

              </div>
              <div class="mb-3">
                <label for="login-password" class="form-label">Contraseña</label>
                <input id="login-password" type="password" class="form-control" v-model="login.password" placeholder="Ingrese su contraseña" required />


              </div>
              <button type="submit" class="btn btn-primary w-100">Ingresar</button>
            </form>
          </div>

          <!-- Formulario de Registro -->
          <div v-if="isSignUpActive">
            <h3 class="mb-3">Registrarse</h3>
            <a href="#" @click.prevent="hideForms" class="d-block text-start mb-2">
              <i class="bi bi-arrow-left"></i> Volver
            </a>
            <form @submit.prevent="handleSignUp">
              <div class="mb-3">

                <label for="signup-username" class="form-label">Usuario</label>
                <input id="signup-username" type="text" class="form-control" v-model="signUp.username" placeholder="Ingrese su nombre de usuario" required />

              </div>
              <div class="mb-3">
                <label for="signup-email" class="form-label">Correo</label>
                <input id="signup-email" type="email" class="form-control" v-model="signUp.email" placeholder="Ingrese su correo" required />

              </div>
              <div class="mb-3">
                <label for="signup-password" class="form-label">Contraseña</label>
                <input id="signup-password" type="password" class="form-control" v-model="signUp.password" placeholder="Ingrese su contraseña" required />

              </div>
              <div class="mb-3">
                <label for="signup-confirm-password" class="form-label">Confirmar Contraseña</label>
                <input id="signup-confirm-password" type="password" class="form-control" v-model="signUp.confirmPassword" placeholder="Confirme su contraseña" required />


              </div>
              <button type="submit" class="btn btn-success w-100">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <FooterPage />
  </div>
</template>

<script>
import { login, register } from '@/services/authServices.js';
import FooterPage from '@/components/FooterPage.vue';

export default {
  components: { FooterPage },
  data() {
    return {
      isLoginActive: false,
      isSignUpActive: false,
      login: { email: '', password: '' },
      signUp: { email: '', username: '', password: '', confirmPassword: '' }
    };
  },
  methods: {
    showLogin() {
      this.isLoginActive = true;
      this.isSignUpActive = false;
    },
    showSignup() {
      this.isLoginActive = false;
      this.isSignUpActive = true;
    },
    hideForms() {
      this.isLoginActive = false;
      this.isSignUpActive = false;
    },
    
    async handleSignUp() {
      if (this.signUp.password !== this.signUp.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      try {
        console.log("📤 Enviando solicitud de registro con datos:", this.signUp);

        const response = await register({
          name: this.signUp.username, // 🔹 El backend espera "name", no "username"
          email: this.signUp.email,
          password: this.signUp.password
        });

        console.log("✅ Respuesta del backend:", response);

        if (response.token) {
          localStorage.setItem("token", response.token); // 🔒 Guardar token en localStorage
          alert("Registro exitoso, redirigiendo...");
          this.$router.push("/dashboard"); // 🚀 Redirigir al usuario después del registro
        } else {
          alert("No se recibió un token, verifica el backend.");
        }
      } catch (error) {
        console.error("❌ Error en registro:", error);
        alert(error.error || "Error en registro: " + error.message);
      }
    },

async handleLogin() {
  try {
    console.log("📤 Enviando solicitud de inicio de sesión con datos:", this.login);

    const response = await login(this.login.email, this.login.password);

    console.log("✅ Respuesta completa del backend:", response);

    // 📌 CORRECCIÓN: Acceder a `response.user.user.id` en lugar de `response.user.id`
    const userId = response?.user?.user?.id || null;

    if (!userId) {
      console.error("❌ Error: `userId` no recibido correctamente. Respuesta:", response);
      alert("❌ Error en la autenticación. Verifica el backend.");
      return;
    }

    console.log("🔍 ID del usuario autenticado ANTES de guardar:", userId);

    localStorage.setItem("token", response.token);
    localStorage.setItem("userId", String(userId));

    console.log("✅ Usuario autenticado:", response.user.user);
    console.log("📝 userId guardado en localStorage:", localStorage.getItem("userId"));
    console.log("🔍 ID del usuario autenticado DESPUÉS de guardar:", userId);

    alert("Inicio de sesión exitoso, redirigiendo...");
    this.$router.push("/dashboard");
  } catch (error) {
    console.error("❌ Error en inicio de sesión:", error);
    alert("Error al iniciar sesión: " + (error.message || "Verifica tus credenciales"));
  }
}









}

};
</script>

<style scoped>
.container-fluid {
  background: linear-gradient(135deg, #cfd8dc 0%, #607d8b 100%, #b0bec5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.card {
  width: 100%;
  max-width: 450px;
}
</style>
