import { createRouter, createWebHistory } from 'vue-router';
import CustomersView from '../views/CustomersView.vue';
import CustomerForm from '../components/CustomerForm.vue';
import VehicleForm from '../components/VehicleForm.vue';
import RentVehicleForm from '../components/RentVehicleForm.vue';
import RentedVehiclesList from '../components/RentedVehiclesList.vue';

const routes = [
  { path: '/', redirect: '/customers' },
  { path: '/customers', component: CustomersView },
  { path: '/customers/new', component: CustomerForm },
  { path: '/vehicles/new', component: VehicleForm },
  { path: '/rentals/rent', component: RentVehicleForm },
  { path: '/rentals/rented-vehicles', component: RentedVehiclesList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
