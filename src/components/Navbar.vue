<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">ProAdoption</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dogs">Perros</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Iniciar Sesión</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Registro</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
