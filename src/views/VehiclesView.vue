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
            <div class="col-md-3 d-flex align-items-center">
            <div class="form-check mt-2">
                <input
                class="form-check-input"
                type="checkbox"
                id="availableOnly"
                v-model="search.availableOnly"
                />
                <label class="form-check-label" for="availableOnly">
                Available Only
                </label>
            </div>
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
        <tr v-for="vehicle in paginatedVehicles" :key="vehicle.registration">
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
import { getAllVehicles } from '../api/vehicleService';
import { listRentedVehicles } from '../api/rentalService';

const vehicles = ref([]);
const error = ref('');
const rentedRegistrations = ref([]);
const search = ref({
  registration: '',
  brand: '',
  model: '',
  year: '',
  availableOnly: false
});

const currentPage = ref(1);
const itemsPerPage = ref(5);

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
      (!search.value.year || vehicle.year.toString().includes(search.value.year.toString())) &&
      (!search.value.availableOnly || !isRented(vehicle.registration))
    );
  });
}); 

const totalPages = computed(() => Math.ceil(filteredVehicles.value.length / itemsPerPage.value));

const paginatedVehicles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredVehicles.value.slice(start, end);
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
