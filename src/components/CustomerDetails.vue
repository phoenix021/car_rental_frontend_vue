<template>

  <div class="container mt-4">
    <div v-if="customer" class="mb-4">
    <h4>Customer Information</h4>
    <p><strong>Full Name:</strong> {{ customer.firstName }} {{ customer.lastName }}</p>
    <p><strong>Driver Licence #:</strong> {{ customer.driverLicenceNumber }}</p>
    <p><strong>Birth Date:</strong> {{ formatDate(customer.birthDate) }}</p>
  </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="loading">Loading rental history...</div>

    <div v-if="rentals.length">
      <h4>Rental History</h4>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Colour</th>
            <th>Rented Date</th>
            <th>Returned Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rental in rentals" :key="rental.rentalId">
            <td>{{ rental.vehicle.registration }}</td>
            <td>{{ rental.vehicle.brand }}</td>
            <td>{{ rental.vehicle.model }}</td>
            <td>{{ rental.vehicle.year }}</td>
            <td>{{ rental.vehicle.colour }}</td>
            <td>{{ formatDate(rental.startDateTime) }}</td>
            <td>{{ formatDate(rental.returnDateTime) ?? 'Still Rented' }}</td>
            <td>
              <span v-if="!rental.returnDateTime" class="badge bg-success">Currently Rented</span>
              <span v-else class="badge bg-secondary">Returned</span>
            </td>
            <td>
              <button 
                v-if="!rental.returnDateTime" 
                class="btn btn-sm btn-warning"
                @click="returnVehicle(rental.vehicle.registration, customer.driverLicenceNumber)"
              >
                Return
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    <div v-else>
      <p>No rental history found for this customer.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter} from 'vue-router';
import { getCustomerRentals } from '../api/rentalService'; 
import { getCustomerByLicence } from '../api/customerService'; 
import ReturnVehicleForm from '@/components/ReturnVehicleForm.vue';


const route = useRoute();
const router = useRouter();
const driverLicenceNumber = route.params.driverLicenceNumber;

const rentals = ref([]);
const loading = ref(false);
const error = ref('');

const customer = ref(''); //

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getCustomerRentals(driverLicenceNumber);
    rentals.value = response.data;  
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load rental history.';
  } finally {
    loading.value = false;
  }

  try {
    const response = await getCustomerByLicence(driverLicenceNumber);
    customer.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load customer details.';
  } finally {
    loading.value = false;
  }
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // or true if you prefer AM/PM
  }).format(new Date(dateString));
};

function returnVehicle(registration, driverLicenceNumber) {
  router.push({
    name: 'ReturnVehicle',
    query: { registration, driverLicenceNumber },
    params: { registration }
  });
} 
</script>
