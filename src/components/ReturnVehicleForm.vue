<!-- src/components/ReturnVehicleForm.vue -->
<template>
  <div class="container mt-4">
    <h2>Return Vehicle</h2>
    <form @submit.prevent="handleReturn" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="registration" class="form-label">Vehicle Registration Plate</label>
        <input
          v-model="form.registration"
          type="text"
          class="form-control"
          id="registration"
          required
          placeholder="Enter registration plate"
        />
      </div>
      <div class="mb-3">
        <label for="driverLicenceNumber" class="form-label">Driver Licence Number</label>
        <input
          v-model="form.driverLicenceNumber"
          type="text"
          class="form-control"
          id="driverLicenceNumber"
          required
          placeholder="Enter driver licence number"
        />
      </div>
      <button type="submit" class="btn btn-primary">Return Vehicle</button>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    <div v-if="success" class="alert alert-success mt-3">
      Vehicle returned successfully!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { returnVehicle } from '../api/rentalService';
import { useRoute } from 'vue-router';
const route = useRoute();

const form = ref({
  registration: '',
  driverLicenceNumber: ''
});

onMounted(() => {
  const regParam = route.params.registration || '';
  if (regParam) {
    form.value.registration = regParam;
  }

});

const error = ref('');
const success = ref(false);

const handleReturn = async () => {
  error.value = '';
  success.value = false;
  try {
    await returnVehicle(form.value.registration, form.value.driverLicenceNumber);
    success.value = true;
    form.value.registration = '';
    form.value.driverLicenceNumber = '';
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to return vehicle.';
  }
};
</script>
