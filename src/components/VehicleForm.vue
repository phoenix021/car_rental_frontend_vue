<!-- src/components/VehicleForm.vue -->
<template>
  <div class="container mt-4">
    <h2>Add Vehicle</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation">
      <div class="mb-3">
        <label for="brand" class="form-label">Brand</label>
        <input v-model="form.brand" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="model" class="form-label">Model</label>
        <input v-model="form.model" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="year" class="form-label">Year</label>
        <input v-model="form.year" type="number" class="form-control" required min="1900" max="2099" />
      </div>

      <div class="mb-3">
        <label for="registration" class="form-label">Registration</label>
        <input v-model="form.registration" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="colour" class="form-label">Colour</label>
        <input v-model="form.colour" type="text" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>

    <div v-if="success" class="alert alert-success mt-3">
      Vehicle added successfully!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { addVehicle } from '../api/vehicleService'; // adjust path as needed
import { useRouter } from 'vue-router';

const form = ref({
  brand: '',
  model: '',
  year: '',
  registration: '',
  colour: ''
});

const error = ref('');
const success = ref(false);
const router = useRouter();

const handleSubmit = async () => {
  try {
    await addVehicle(form.value);
    success.value = true;
    error.value = '';
    // Optionally redirect to vehicle list:
    // router.push('/vehicles');
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to add vehicle.';
    success.value = false;
  }
};
</script>
