<template>
  <div class="container mt-4">
    <h2>All Customers</h2>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <table class="table table-bordered" v-if="customers.length">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Birth Date</th>
          <th>Driver Licence</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.driverLicenceNumber">
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.birthDate }}</td>
          <td>{{ customer.driverLicenceNumber }}</td>
          <td>
            <button class="btn btn-sm btn-primary me-2" @click="editCustomer(customer)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteCustomer(customer)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="text-muted">No customers found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllCustomers, deleteCustomerByLicence } from '../api/customerService';
import { useRouter } from 'vue-router';

const customers = ref([]);
const error = ref('');
const router = useRouter();

const loadCustomers = async () => {
  try {
    const response = await getAllCustomers();
    customers.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load customers.';
  }
};

const editCustomer = (customer) => {
  router.push({ path: '/customers/edit', query: { licence: customer.driverLicenceNumber } });
};

const deleteCustomer = async (customer) => {
  if (confirm(`Are you sure you want to delete ${customer.firstName} ${customer.lastName}?`)) {
    try {
      await deleteCustomerByLicence(customer.driverLicenceNumber);
      await loadCustomers(); // Refresh the list
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete customer.';
    }
  }
};

onMounted(loadCustomers);
</script>