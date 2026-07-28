<template>
  <h1>Nuevo Cliente</h1>

  <form @submit.prevent="guardarCliente">
    <div>
      <label>Nombre</label>
      <input
        type="text"
        v-model="client.name"
      />
    </div>

    <div>
      <label>Email</label>
      <input
        type="email"
        v-model="client.email"
      />
    </div>

    <button type="submit">
      Guardar Cliente
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const client = ref({
  name: '',
  email: ''
})

const guardarCliente = async () => {

  if (!client.value.name) {
    alert('Ingrese un nombre')
    return
  }

  if (!client.value.email) {
    alert('Ingrese un email')
    return
  }

  await fetch('https://localhost:7114/api/Clients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(client.value)
  })

  alert('Cliente creado correctamente')

  client.value = {
    name: '',
    email: ''
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

form {
  width: 400px;
  margin: 40px auto;
  padding: 25px;
  background-color: #2c2c2c;
  border-radius: 10px;
}

div {
  margin-bottom: 15px;
}

label {
  display: block;
  color: white;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #219150;
}

:global(body) {
  background: #121212;
}
</style>