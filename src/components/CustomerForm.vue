<!-- src/components/CustomerForm.vue -->
<template>
  <div class="container mt-4">
    <h2>Add Customer</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation">
      <div class="mb-3">
        <label for="firstName" class="form-label">First Name</label>
        <input v-model="form.firstName" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input v-model="form.lastName" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="birthDate" class="form-label">Birth Date (YYYY-MM-DD)</label>
        <input v-model="form.birthDate" type="date" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="driverLicenceNumber" class="form-label">Driver Licence Number</label>
        <input v-model="form.driverLicenceNumber" type="text" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-success">Submit</button>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>

    <div v-if="success" class="alert alert-success mt-3">
      Customer added successfully!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { addCustomer } from '../api/customerService';
import { useRouter } from 'vue-router';

const form = ref({
  firstName: '',
  lastName: '',
  birthDate: '',
  driverLicenceNumber: ''
});

const error = ref('');
const success = ref(false);
const router = useRouter();

const handleSubmit = async () => {
  try {
    await addCustomer(form.value);
    success.value = true;
    error.value = '';
    // Optionally redirect to customer list:
    // router.push('/customers');
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to add customer.';
    success.value = false;
  }
};
</script>
