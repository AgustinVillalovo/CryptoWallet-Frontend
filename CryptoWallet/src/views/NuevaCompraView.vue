<template>
  <h1>Nueva Compra</h1>
  
  <form @submit.prevent="guardarTransaccion">
    <div>
  <label>Cliente</label>

  <select v-model="transaction.clientId">
    <option
      v-for="client in clients"
      :key="client.id"
      :value="client.id"
    >
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
      Guardar Transacción
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const transaction = ref({
  cryptoCode: 'btc',
  cryptoAmount: 0,
  money: 0,
  action: 'compra',
  transactionDate: '',
  clientId: 0
})
const clients = ref([])

const cargarClientes = async () => {
  const response = await fetch('https://localhost:7114/api/Clients')
  clients.value = await response.json()

  if (clients.value.length > 0) {
    transaction.value.clientId = clients.value[0].id
  }
}

const guardarTransaccion = async () => {
  try {
    if (transaction.value.cryptoAmount <= 0) {
  alert('La cantidad debe ser mayor a 0')
  return
}
if (!transaction.value.transactionDate) {
  alert('Debe ingresar una fecha')
  return
}
    const response = await fetch(
      'https://localhost:7114/api/Transactions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction.value),
      }
    )

    if (!response.ok) {
  const error = await response.text()
  alert(error)
  return
}

const data = await response.json()

console.log(data)

alert('Transacción guardada correctamente')
    transaction.value = {
  cryptoCode: 'btc',
  cryptoAmount: 0,
  money: 0,
  action: 'compra',
  transactionDate: '',
  clientId: clients.value[0]?.id || 0
}
  } catch (error) {
    console.error(error)
    alert('Error al guardar')
  }
}
onMounted(() => {
  cargarClientes()
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
  background-color: #121212;
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
