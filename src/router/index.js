import { createRouter, createWebHistory } from 'vue-router';
import CustomersView from '../views/CustomersView.vue';
import CustomerForm from '../components/CustomerForm.vue';
import VehicleForm from '../components/VehicleForm.vue';
import VehiclesView from '../views/VehiclesView.vue';
import RentVehicleForm from '../components/RentVehicleForm.vue';
import RentedVehiclesList from '../components/RentedVehiclesList.vue';
import ReturnVehicleForm from '../components/ReturnVehicleForm.vue';
import CustomerDetails from '../components/CustomerDetails.vue'


const routes = [
  { path: '/', redirect: '/customers' },
  { path: '/customers', name: 'Customers', component: CustomersView },
  { path: '/customers/new', name: 'AddCustomer', component: CustomerForm },
  { path: '/vehicles/new', name: 'AddVehicle', component: VehicleForm },
  { path: '/vehicles', name: 'Vehicles', component: VehiclesView },
  { path: '/rentals/rent/:registration?', name: 'RentVehicle', component: RentVehicleForm },
  { path: '/rentals/rented-vehicles', name: 'RentedVehicles', component: RentedVehiclesList },
  { path: '/rental/return:registration?', name: 'ReturnVehicle', component: ReturnVehicleForm },
  { path: '/customers/:driverLicenceNumber',  name: 'CustomerDetails', component: CustomerDetails}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
