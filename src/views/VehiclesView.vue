<!-- src/views/VehiclesView.vue -->
<template>
  <div class="container mt-4">
    <h2>All Vehicles</h2>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <table v-if="vehicles.length" class="table table-striped">
      <thead>
        <tr>
          <th>Registration</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle.registration">
          <td>{{ vehicle.registration }}</td>
          <td>{{ vehicle.brand }}</td>
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.year }}</td>
          <td>{{ vehicle.colour }}</td>
            <td>
            <router-link
                v-if="!isRented(vehicle.registration)"
                :to="{ name: 'RentVehicle', params: { registration: vehicle.registration } }"
                class="btn btn-sm btn-primary me-2"
            >
                Rent
            </router-link>

            <router-link
                v-else
                :to="{ name: 'ReturnVehicle', params: { registration: vehicle.registration } }"
                class="btn btn-sm btn-warning"
            >
                Return
            </router-link>
            </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="alert alert-info">No vehicles available.</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAllVehicles } from '../api/vehicleService';
import { listRentedVehicles } from '../api/rentalService';

const vehicles = ref([]);
const error = ref('');
const rentedRegistrations = ref([]);

onMounted(async () => {
  try {
    const response = await getAllVehicles();
    vehicles.value = response.data;

    const rentedResponse = await listRentedVehicles();
    rentedRegistrations.value = rentedResponse.data.map(v => v.registration);
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load vehicles.';
  }
});

const isRented = (registration) => rentedRegistrations.value.includes(registration);
</script>
