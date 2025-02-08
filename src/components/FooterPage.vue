<template>
    <footer class="footer bg-light text-center py-3 mt-auto w-100">
      <div class="container">
        <div class="row">
          <!-- Contacto -->
          <div class="col-md-4">
            <p class="mb-1">Contáctanos: <a href="mailto:contacto@nuestrograndia.com">contacto@nuestrograndia.com</a></p>
          </div>
          
          <!-- Redes sociales -->
          <div class="col-md-4">
            <p class="mb-1">Síguenos:</p>
            <a href="https://facebook.com" target="_blank">
              <img src="@/assets/icono-facebook.png" alt="Facebook" class="social-icon mx-2" />
            </a>
            <a href="https://instagram.com" target="_blank">
              <img src="@/assets/icono-instagram.png" alt="Instagram" class="social-icon mx-2" />
            </a>
          </div>
          
          <!-- Teléfono -->
          <div class="col-md-4">
            <p class="mb-1">Teléfono: <a href="tel:+593992343103">+593 992 343 103</a></p>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterPage",
  };
  </script>
  
  <style scoped>
  /* Hacer que el footer esté fijo en la parte inferior */
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  
  /* Ajuste responsivo de los íconos */
  .social-icon {
    width: 24px;
    height: 24px;
  }
  </style>
  