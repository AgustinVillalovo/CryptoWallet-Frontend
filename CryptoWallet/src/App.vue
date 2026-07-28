<template>
  <nav>
    <RouterLink to="/">Nueva Compra</RouterLink>
    <RouterLink to="/historial">Historial</RouterLink>
    <RouterLink to="/clientes/nuevo">Nuevo Cliente</RouterLink>
    <RouterLink to="/clientes">Clientes</RouterLink>
  </nav>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
nav {
  background-color: #1e1e1e;
  padding: 15px;
  text-align: center;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: bold;
}

nav a.router-link-active {
  color: #f39c12;
}
</style>