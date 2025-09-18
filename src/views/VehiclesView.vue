<!-- src/views/VehiclesView.vue -->
<template>
  <div class="container mt-4">
    <h2>All Vehicles</h2>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="mb-4">
        <h4>Search Vehicles</h4>
        <div class="row g-3">
            <div class="col-md-3">
                <input v-model="search.registration" type="text" class="form-control" placeholder="Registration" />
            </div>
            <div class="col-md-3">
                <input v-model="search.brand" type="text" class="form-control" placeholder="Brand" />
            </div>
            <div class="col-md-3">
                <input v-model="search.model" type="text" class="form-control" placeholder="Model" />
            </div>
            <div class="col-md-3">
                <input v-model="search.year" type="number" class="form-control" placeholder="Year" />
            </div>
        </div>
    </div>

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
        <tr v-for="vehicle in filteredVehicles" :key="vehicle.registration">
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
import { ref, onMounted, computed } from 'vue';
import { getAllVehicles } from '../api/vehicleService';
import { listRentedVehicles } from '../api/rentalService';

const vehicles = ref([]);
const error = ref('');
const rentedRegistrations = ref([]);
const search = ref({
  registration: '',
  brand: '',
  model: '',
  year: ''
});

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

const filteredVehicles = computed(() => {
  return vehicles.value.filter(vehicle => {
    return (
      (!search.value.registration || vehicle.registration.toLowerCase().includes(search.value.registration.toLowerCase())) &&
      (!search.value.brand || vehicle.brand.toLowerCase().includes(search.value.brand.toLowerCase())) &&
      (!search.value.model || vehicle.model.toLowerCase().includes(search.value.model.toLowerCase())) &&
      (!search.value.year || vehicle.year.toString().includes(search.value.year.toString()))
    );
  });
});
</script>
