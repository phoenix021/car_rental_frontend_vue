<template>
  <div class="container mt-4">
    <h2>All Vehicles</h2>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Registration</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Colour</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle.registration">
          <td>{{ vehicle.registration }}</td>
          <td>{{ vehicle.brand }}</td>
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.colour }}</td>
          <td>{{ vehicle.year }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllVehicles } from '../api/vehicleService';

const vehicles = ref([]);
const error = ref('');

onMounted(async () => {
  try {
    const response = await getAllVehicles();
    vehicles.value = response.data; // will be [] if no vehicles
    if (vehicles.value.length === 0) {
      error.value = 'No vehicles found';
    } else {
      error.value = '';
    }
  } catch (err) {
    console.error(err);
    error.value = err.response?.data?.message || 'Failed to load vehicles.';
  }
});
</script>
