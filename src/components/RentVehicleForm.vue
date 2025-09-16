<template>
  <div class="container mt-4">
    <h2>Rent Vehicle</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation">

      <div class="mb-3">
        <label for="registration" class="form-label">Vehicle Registration</label>
        <input v-model="form.registration" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="driverLicenceNumber" class="form-label">Driver Licence Number</label>
        <input v-model="form.driverLicenceNumber" type="text" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary">Rent Vehicle</button>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    <div v-if="success" class="alert alert-success mt-3">Vehicle rented successfully!</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { rentVehicleToCustomer } from '../api/rentalService';

const form = ref({
  registration: '',
  driverLicenceNumber: ''
});

const error = ref('');
const success = ref(false);

const handleSubmit = async () => {
  try {
    await rentVehicleToCustomer(form.value);
    success.value = true;
    error.value = '';
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to rent vehicle.';
    success.value = false;
  }
};
</script>
