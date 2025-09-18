import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const app = createApp(App);
app.use(router);
app.mount('#app');

function generateRandomVehicles(count = 100) {
  const brands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Nissan', 'Hyundai'];
  const models = ['Camry', 'Civic', 'Focus', 'Impala', 'X5', 'Altima', 'Elantra'];
  const colors = ['Red', 'Blue', 'Black', 'White', 'Silver', 'Green', 'Yellow'];
  const vehicles = [];

  for (let i = 0; i < count; i++) {
    const digits = Math.floor(1000 + Math.random() * 9000);
    const letters =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const registration = `NS${digits}${letters}`;

    vehicles.push({
      registration,
      brand: brands[Math.floor(Math.random() * brands.length)],
      model: models[Math.floor(Math.random() * models.length)],
      makeYear: 2000 + Math.floor(Math.random() * 23),
      colour: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  return vehicles;
}

async function uploadVehiclesOnce() {
  if (localStorage.getItem('vehiclesLoaded')) return;

  const vehicles = generateRandomVehicles();

  try {
    await axios.post('/api/vehicle/bulk', vehicles);
    console.log('Vehicles uploaded successfully');
    localStorage.setItem('vehiclesLoaded', 'true');
  } catch (error) {
    console.error('Failed to upload vehicles:', error);
  }
}

 await uploadVehiclesOnce();
