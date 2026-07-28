<template>
  <h1>Clientes</h1>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="client in clients" :key="client.id">
        <td>{{ client.id }}</td>
        <td>{{ client.name }}</td>
        <td>{{ client.email }}</td>

        <td>
          <button @click="editar(client.id)">
            Editar
          </button>

          <button @click="eliminar(client.id)">
            Borrar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const clients = ref([])

const cargarClientes = async () => {
  const response = await fetch('https://localhost:7114/api/Clients')
  clients.value = await response.json()
}

const editar = (id) => {
  router.push(`/clientes/editar/${id}`)
}

const eliminar = async (id) => {

  if (!confirm('¿Eliminar cliente?'))
    return

  await fetch(`https://localhost:7114/api/Clients/${id}`, {
    method: 'DELETE'
  })

  cargarClientes()
}

onMounted(() => {
  cargarClientes()
})
</script>

<style scoped>
h1 {
  text-align: center;
  color: white;
  margin: 20px 0;
}

table {
  width: 90%;
  margin: auto;
  border-collapse: collapse;
  background-color: #2c2c2c;
  color: white;
  border: 1px solid #666;
}

th {
  background-color: #111;
  padding: 12px;
  border: 1px solid #666;
}

td {
  padding: 10px;
  text-align: center;
  border: 1px solid #666;
}

tr:nth-child(even) {
  background-color: #3a3a3a;
}

button {
  padding: 6px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
}

button:nth-child(1) {
  background-color: #3498db;
}

button:nth-child(2) {
  background-color: #e74c3c;
}

button:hover {
  opacity: 0.9;
}

:global(body) {
  background-color: #121212;
}
</style>