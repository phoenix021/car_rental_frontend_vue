<!-- src/components/CustomerList.vue -->
<template>
  <div class="container mt-4">
    <h2>All Customers</h2>
    <router-link to="/customers/new" class="btn btn-primary mb-3">Add New Customer</router-link>
    
    <table class="table table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Birth Date</th>
          <th>Driver Licence</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.driverLicenceNumber">
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.birthDate }}</td>
          <td>{{ customer.driverLicenceNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAllCustomers } from '../api/customerService';

const customers = ref([]);

onMounted(async () => {
  try {
    const response = await getAllCustomers();
    customers.value = response.data;
  } catch (error) {
    console.error('Failed to fetch customers:', error);
  }
});
</script>