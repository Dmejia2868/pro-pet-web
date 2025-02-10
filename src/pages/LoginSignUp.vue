<template>
  <div class="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="row w-100">
      <!-- Imagen y slogan -->
      <div class="col-md-6 text-center d-flex flex-column align-items-center justify-content-center">
        <img src="@/assets/cachorros.jpeg" alt="Cachorros felices" class="img-fluid rounded shadow-lg mb-3" style="max-width: 100%;" />
        <h4 class="text-dark">"El amor no se compra, se adopta."</h4>
      </div>

      <!-- Formulario de Login y Registro -->
      <div class="col-md-6 d-flex flex-column align-items-center justify-content-center">
        <div class="card shadow-lg text-center p-4 w-75">
          <!-- Botones para elegir entre Login y Registro -->
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
                <label class="form-label">Correo</label>
                <input type="email" class="form-control" v-model="login.email" placeholder="Ingrese su correo" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input type="password" class="form-control" v-model="login.password" placeholder="Ingrese su contraseña" required />
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
                <label class="form-label">Usuario</label>
                <input type="text" class="form-control" v-model="signUp.username" placeholder="Ingrese su nombre de usuario" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Correo</label>
                <input type="email" class="form-control" v-model="signUp.email" placeholder="Ingrese su correo" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Contraseña</label>
                <input type="password" class="form-control" v-model="signUp.password" placeholder="Ingrese su contraseña" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Confirmar Contraseña</label>
                <input type="password" class="form-control" v-model="signUp.confirmPassword" placeholder="Confirme su contraseña" required />
              </div>

              <!-- Teléfono con código de país -->
              <div class="mb-3">
                <label for="phone" class="form-label">Teléfono</label>
                <vue-tel-input
                  id="phone"
                  v-model="signUp.phone"
                  @input="updatePhone"
                  :preferred-countries="['ec', 'us', 'es']"
                  :auto-format="true"
                  :default-country="'ec'"
                  placeholder="Ingrese su número de teléfono"
                />

              </div>

              <!-- Provincia y Ciudad con geolocalización -->
              <div class="row">
                <div class="col-md-5 mb-3">
                  <label class="form-label">Provincia</label>
                  <input type="text" class="form-control" v-model="signUp.province" placeholder="Ingrese su provincia" required />
                </div>
                <div class="col-md-5 mb-3">
                  <label class="form-label">Ciudad</label>
                  <input type="text" class="form-control" v-model="signUp.city" placeholder="Ingrese su ciudad" required />
                </div>
                <div class="col-md-2 d-flex align-items-end">
                  <button type="button" class="btn btn-outline-primary w-100" @click="getLocation">📍</button>
                </div>
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
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

export default {
  components: { FooterPage, VueTelInput },
  data() {
    return {
      isLoginActive: false,
      isSignUpActive: false,
      login: { email: '', password: '' },
      signUp: {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        phone: '',
        countryCode: '+1',
        province: '',
        city: '',
      },
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
    async getLocation() {
      if (!navigator.geolocation) {
        alert('⚠️ Geolocalización no soportada en este navegador.');
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`🌍 Coordenadas: Latitud ${latitude}, Longitud ${longitude}`);

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await response.json();

          if (data.address) {
            this.signUp.province = data.address.state || '';
            this.signUp.city = data.address.city || data.address.town || '';
          } else {
            alert('⚠️ No se pudo obtener la ubicación.');
          }
        } catch (error) {
          console.error('❌ Error obteniendo la ubicación:', error);
        }
      });
    },
    updatePhone(phoneObject) {
      if (phoneObject) {
        this.signUp.phone = phoneObject.nationalNumber || ''; // 📌 Asegura que el número no sea undefined
        this.signUp.countryCode = phoneObject.countryCallingCode 
          ? `+${phoneObject.countryCallingCode}` 
          : '+593'; // 📌 Valor predeterminado si no se detecta el código de país
        console.log("📲 Número actualizado:", this.signUp.phone);
        console.log("🌍 Código de país:", this.signUp.countryCode);
      }
    }
,

    async handleLogin() {
      try {
        const response = await login(this.login.email, this.login.password);
        const userId = response?.user?.id;

        if (userId) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', userId);
          this.$router.push('/dashboard');
        } else {
          alert('Error en la autenticación');
        }
      } catch (error) {
        console.error('Error en inicio de sesión:', error);
      }
    },
    async handleSignUp() {
      if (this.signUp.password !== this.signUp.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      try {
        const response = await register({
          name: this.signUp.username,
          email: this.signUp.email,
          password: this.signUp.password,
          phone: `${this.signUp.countryCode} ${this.signUp.phone}`, // 📌 Guarda en el formato correcto
          province: this.signUp.province,
          city: this.signUp.city,
        });

        if (response.token) {
          localStorage.setItem('token', response.token);
          this.$router.push('/dashboard');
        } else {
          alert('Error en el registro');
        }
      } catch (error) {
        console.error('Error en registro:', error);
      }
    },

  },
};
</script>

<style scoped>
.container-fluid {
  background: linear-gradient(135deg, #cfd8dc 0%, #607d8b 100%);
  min-height: 100vh;
}
.card {
  max-width: 450px;
}
</style>
