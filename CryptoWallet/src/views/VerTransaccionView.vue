<template>
  <h1>Detalle de Transacción</h1>

  <div v-if="transaction" class="card">
    <p><strong>ID:</strong> {{ transaction.id }}</p>
    <p><strong>Criptomoneda:</strong> {{ transaction.cryptoCode }}</p>
    <p><strong>Cantidad:</strong> {{ transaction.cryptoAmount }}</p>
    <p><strong>Monto:</strong> {{ transaction.money }}</p>
    <p><strong>Acción:</strong> {{ transaction.action }}</p>
    <p><strong>Fecha:</strong> {{ transaction.transactionDate }}</p>

    <button @click="volver">
      Volver
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const transaction = ref(null)

const obtenerTransaccion = async () => {
  const response = await fetch(
    `https://localhost:7114/api/Transactions/${route.params.id}`
  )

  transaction.value = await response.json()
}

const volver = () => {
  router.push('/historial')
}

onMounted(() => {
  obtenerTransaccion()
})
</script>

<style scoped>
h1 {
  text-align: center;
  color: white;
}

.card {
  width: 400px;
  margin: 40px auto;
  padding: 25px;
  background-color: #2c2c2c;
  color: white;
  border-radius: 10px;
}

p {
  margin: 12px 0;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

:global(body) {
  background-color: #121212;
}
</style>