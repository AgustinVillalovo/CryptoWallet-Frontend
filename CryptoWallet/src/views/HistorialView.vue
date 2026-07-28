<template>
  <h1>Historial de Movimientos</h1>

  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Cliente</th>
        <th>Cripto</th>
        <th>Cantidad</th>
        <th>Monto ARS</th>
        <th>Acción</th>
        <th>Fecha</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="transaction in transactions" :key="transaction.id">
        <td>{{ transaction.id }}</td>
        <td>{{ transaction.clientName }}</td>
        <td>{{ transaction.cryptoCode }}</td>
        <td>{{ transaction.cryptoAmount }}</td>
        <td>{{ transaction.money.toLocaleString('es-AR',{style:'currency',currency:'ARS'}) }}</td>
        <td>{{ transaction.action }}</td>
        <td>{{ new Date(transaction.transactionDate).toLocaleString() }}</td>
        <td>
         <button @click="editar(transaction)">Editar</button>
        <button @click="eliminar(transaction.id)">Borrar</button>
        <button @click="mostrar(transaction)">Mostrar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const transactions = ref([])

const obtenerTransacciones = async () => {
  try {
    const response = await fetch(
      'https://localhost:7114/api/Transactions'
    )

    const data = await response.json()

    transactions.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  obtenerTransacciones()
})
const eliminar = async (id) => {
  const confirmar = confirm('¿Desea borrar esta transacción?')

  if (!confirmar) return

  await fetch(`https://localhost:7114/api/Transactions/${id}`, {
    method: 'DELETE'
  })

  obtenerTransacciones()
}
const editar = (transaction) => {
  router.push(`/editar/${transaction.id}`)
}
const mostrar = (transaction) => {
  router.push(`/ver/${transaction.id}`)
}

</script>
<style scoped>
h1 {
  text-align: center;
  color: white;
  margin: 20px 0;
}
h2 {
  color: white;
  text-align: center;
}

input {
  padding: 8px;
  margin: 10px;
}
table {
  width: 90%;
  margin: auto;
  border-collapse: collapse;
  background-color: #2c2c2c;
  color: white;
}

th {
  background-color: #111;
  padding: 12px;
}

td {
  padding: 10px;
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

button:nth-child(3) {
  background-color: #27ae60;
}

:global(body) {
  background-color: #121212;
}
</style>