<!-- src/views/CustomersView.vue -->
<template>
  <div class="container mt-4">
    <h2>All Customers</h2>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div class="mb-4">
      <h4>Search Customers</h4>
      <div class="row g-3">
        <div class="col-md-3">
          <input v-model="search.firstName" type="text" class="form-control" placeholder="First Name" />
        </div>
        <div class="col-md-3">
          <input v-model="search.lastName" type="text" class="form-control" placeholder="Last Name" />
        </div>
        <div class="col-md-3">
          <input v-model="search.licence" type="text" class="form-control" placeholder="Driver Licence #" />
        </div>
        <div class="col-md-3">
          <input v-model="search.birthDate" type="text" class="form-control" placeholder="Birth Date (yyyy-MM-dd)" />
        </div>
      </div>
    </div>

    <table v-if="customers.length" class="table table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Driver Licence</th>
          <th>Birth Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in paginatedCustomers" :key="customer.driverLicenceNumber">
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.driverLicenceNumber }}</td>
          <td>{{ customer.birthDate }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else class="alert alert-info">No customers available.</div>

    <nav aria-label="Page navigation" class="mt-3">
        <ul class="pagination justify-content-center">
        <li :class="['page-item', { disabled: currentPage === 1 }]">
            <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
        </li>

        <li
            v-for="page in visiblePages"
            :key="page"
            :class="['page-item', { active: currentPage === page, disabled: page === '...' }]"
        >
            <button
            class="page-link"
            @click="typeof page === 'number' && (currentPage = page)"
            :disabled="page === '...'"
            >
            {{ page }}
            </button>
        </li>

        <li :class="['page-item', { disabled: currentPage === totalPages }]">
            <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
        </li>
        </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { getAllCustomers } from '../api/customerService'; // <-- You'll need to create this

const customers = ref([]);
const error = ref('');

const search = ref({
  firstName: '',
  lastName: '',
  licence: '',
  birthDate: ''
});

const currentPage = ref(1);
const itemsPerPage = ref(5);

onMounted(async () => {
  try {
    const response = await getAllCustomers(); // Assume it returns an array of Customer DTOs
    customers.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load customers.';
  }
});

const filteredCustomers = computed(() => {
  return customers.value.filter(customer => {
    return (
      (!search.value.firstName || customer.firstName.toLowerCase().includes(search.value.firstName.toLowerCase())) &&
      (!search.value.lastName || customer.lastName.toLowerCase().includes(search.value.lastName.toLowerCase())) &&
      (!search.value.licence || customer.driverLicenceNumber.toLowerCase().includes(search.value.licence.toLowerCase())) &&
      (!search.value.birthDate || customer.birthDate.includes(search.value.birthDate))
    );
  });
});

const totalPages = computed(() => Math.ceil(filteredCustomers.value.length / itemsPerPage.value));

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCustomers.value.slice(start, end);
});

watch(search, () => {
  currentPage.value = 1;
}, { deep: true });

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total);
    } else if (current >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total);
    }
  }

  return pages;
});
</script>
