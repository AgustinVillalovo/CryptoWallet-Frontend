<template>
  <h1>Editar Transacción</h1>

  <form v-if="transaction" @submit.prevent="guardar">
    <div>
      <label>Cliente</label>
      <select v-model="transaction.clientId">
        <option
        v-for="client in clients"
        :key="client.id"
        :value="client.id">
         {{ client.name }}
          </option>
      </select>
    </div>
    <div>
      <label>Criptomoneda</label>
      <select v-model="transaction.cryptoCode">
        <option value="btc">Bitcoin</option>
        <option value="usdt">USDT</option>
        <option value="sol">Solana</option>
      </select>
    </div>

    <div>
      <label>Cantidad</label>
      <input
        type="number"
        step="0.0001"
        v-model="transaction.cryptoAmount"
      />
    </div>

    <div>
      <label>Acción</label>
      <select v-model="transaction.action">
        <option value="compra">Compra</option>
        <option value="venta">Venta</option>
      </select>
    </div>

    <div>
      <label>Fecha</label>
      <input
        type="datetime-local"
        v-model="transaction.transactionDate"
      />
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
const clients = ref([])
const transaction = ref(null)

const obtenerTransaccion = async () => {
  const response = await fetch(
    `https://localhost:7114/api/Transactions/${route.params.id}`
  )

  transaction.value = await response.json()

  transaction.value.transactionDate =
    transaction.value.transactionDate.substring(0, 16)
}
const cargarClientes = async () => {
  const response = await fetch(
    'https://localhost:7114/api/Clients'
  )

  clients.value = await response.json()
}

const guardar = async () => {
    if (transaction.value.cryptoAmount <= 0)
    {
         alert('La cantidad debe ser mayor a 0')
        return
    }
    if (!transaction.value.transactionDate)
    {
        alert('Debe ingresar una fecha')
        return
    }
const response = await fetch(
    `https://localhost:7114/api/Transactions/${transaction.value.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction.value)
    }
)

if (!response.ok) {
  const error = await response.text()
  alert(error)
  return
}

  alert('Transacción actualizada')

  router.push('/historial')
}

onMounted(async () => {
  await cargarClientes()
  await obtenerTransaccion()
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
  margin: 40px auto;
  padding: 25px;
  background-color: #2c2c2c;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
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

input,
select {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
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

button:hover {
  background-color: #2980b9;
}

:global(body) {
  background-color: #121212;
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>