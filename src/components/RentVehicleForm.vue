<template>
  <div class="container mt-4">
    <h2>Rent Vehicle</h2>
    <form @submit.prevent="handleSubmit" class="needs-validation">

      <div class="mb-3">
        <label for="registration" class="form-label">Vehicle Registration</label>
        <input
          v-model="form.registration"
          list="vehicle-options"
          type="text"
          class="form-control"
          required
        />
        <datalist id="vehicle-options">
          <option
            v-for="vehicle in vehicles"
            :key="vehicle.registration"
            :value="vehicle.registration"
          >
            {{ vehicle.make }} {{ vehicle.model }} ({{ vehicle.registration }})
          </option>
        </datalist>
      </div>

      <div class="mb-3">
        <label for="driverLicenceNumber" class="form-label">Driver Licence Number</label>
        <input
          v-model="form.driverLicenceNumber"
          list="customer-options"
          type="text"
          class="form-control"
          required
        />
        <datalist id="customer-options">
          <option
            v-for="customer in customers"
            :key="customer.driverLicenceNumber"
            :value="customer.driverLicenceNumber"
          >
            {{ customer.firstName }} {{ customer.lastName }} ({{ customer.driverLicenceNumber }})
          </option>
        </datalist>
      </div>

      <button type="submit" class="btn btn-primary">Rent Vehicle</button>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    <div v-if="success" class="alert alert-success mt-3">Vehicle rented successfully!</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAllCustomers } from '../api/customerService';
import { getAllVehicles } from '../api/vehicleService';
import { rentVehicleToCustomer } from '../api/rentalService';

const route = useRoute();

const form = ref({
  registration: '',
  driverLicenceNumber: ''
});

const vehicles = ref([]);
const customers = ref([]);
const error = ref('');
const success = ref(false);

onMounted(async () => {

    const regParam = route.params.registration || '';
    if (regParam) {
        form.value.registration = regParam;
    }

  try {
    const vehicleResponse = await getAllVehicles();
    vehicles.value = vehicleResponse.data;

    const customerResponse = await getAllCustomers();
    customers.value = customerResponse.data;
  } catch (err) {
    error.value = 'Failed to load data.';
  }
});

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
