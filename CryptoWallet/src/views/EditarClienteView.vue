<template>
  <h1>Editar Cliente</h1>

  <form v-if="client" @submit.prevent="guardar">

    <div>
      <label>Nombre</label>
      <input type="text" v-model="client.name">
    </div>

    <div>
      <label>Email</label>
      <input type="email" v-model="client.email">
    </div>

    <button type="submit">
      Guardar Cambios
    </button>

  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const client = ref(null)

const obtenerCliente = async () => {
  const response = await fetch(
    `https://localhost:7114/api/Clients/${route.params.id}`
  )

  if (!response.ok) {
    alert("El cliente no existe")
    router.push('/clientes')
    return
  }

  client.value = await response.json()
}

const guardar = async () => {

    if (!client.value.name.trim()) {
        alert("Ingrese un nombre")
        return
    }

    if (!client.value.email.trim()) {
        alert("Ingrese un email")
        return
    }

    const response = await fetch(
    `https://localhost:7114/api/Clients/${client.value.id}`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(client.value)
    }
)

  if (!response.ok) {
     alert("No se pudo actualizar el cliente")
     return
    }
  alert("Cliente actualizado")

  router.push('/clientes')
}

onMounted(() => {
    obtenerCliente()
})
</script>

<style scoped>
h1 {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

form {
  width: 400px;
  margin: auto;
  padding: 25px;
  background: #2c2c2c;
  border-radius: 10px;
}

div {
  margin-bottom: 15px;
}

label {
  display: block;
  color: white;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

:global(body) {
  background: #121212;
}
</style>