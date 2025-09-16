import { createRouter, createWebHistory } from 'vue-router';
import CustomersView from '../views/CustomersView.vue';
import CustomerForm from '../components/CustomerForm.vue';
import VehicleForm from '../components/VehicleForm.vue';
const routes = [
  { path: '/', redirect: '/customers' },
  { path: '/customers', component: CustomersView },
  { path: '/customers/new', component: CustomerForm },
  { path: '/vehicles/new', component: VehicleForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
