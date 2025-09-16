<template>
  <div class="container mt-4">
    <h2>Currently Rented Vehicles</h2>
    <ul v-if="vehicles.length > 0" class="list-group">
      <li v-for="vehicle in vehicles" :key="vehicle.registration" class="list-group-item">
        {{ vehicle.brand }} {{ vehicle.model }} — {{ vehicle.registration }}
      </li>
    </ul>
    <p v-else>No vehicles currently rented.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { listRentedVehicles } from '../api/rentalService';

const vehicles = ref([]);

const loadVehicles = async () => {
  try {
    const response = await listRentedVehicles();
    vehicles.value = response.data;
  } catch (err) {
    console.error('Failed to load rented vehicles', err);
  }
};

onMounted(() => {
  loadVehicles();
});
</script>
