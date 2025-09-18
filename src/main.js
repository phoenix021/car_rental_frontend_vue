import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

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
      year: (2000 + Math.floor(Math.random() * 23)).toString(),
      brand: brands[Math.floor(Math.random() * brands.length)],
      model: models[Math.floor(Math.random() * models.length)],
      colour: colors[Math.floor(Math.random() * colors.length)],
      registration
    });
  }
  return vehicles;
}

const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eva', 'Frank', 'Grace', 'Hank'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Thomas', 'Moore', 'Martin'];
const customers = [];

const getRandomDateOfBirth = () => {
  const start = new Date(1950, 0, 1);
  const end = new Date(2005, 0, 1);
  const birthDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  const year = birthDate.getFullYear();
  const month = String(birthDate.getMonth() + 1).padStart(2, '0');
  const day = String(birthDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const generateDriverLicence = () => {
  const letters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                  String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `${letters}_${digits}`;
};

const generateDummyCustomers = (count = 10) => {
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const driverLicenceNumber = generateDriverLicence();
    const birthDate = getRandomDateOfBirth();

    customers.push({
      firstName,
      lastName,
      driverLicenceNumber,
      birthDate
    });
  }
};

const uploadCustomers = async () => {
  try {
    generateDummyCustomers(10);

    console.log('Uploading customers:', customers);

    const response = await axios.post('/api/customer/bulk', customers); // Adjust path if needed
    console.log('Success:', response.data);
  } catch (err) {
    console.error('Failed to upload customers:', err.response?.data || err.message);
  }
};

async function uploadVehiclesOnce() {

  if (localStorage.getItem('vehiclesLoaded')) {
    console.log('Uploading vehicles already done once');
    return;
  }


  const vehicles = generateRandomVehicles();

  console.log('Uploading vehicles:', vehicles);

  try {
    await axios.post('/api/vehicle/bulk', vehicles);
    
    console.log('Vehicles uploaded successfully');
    localStorage.setItem('vehiclesLoaded', 'true');
  } catch (error) {
    console.error('Failed to upload vehicles:', error);
  }
}

async function init() {
  await uploadVehiclesOnce();
  await uploadCustomers();

  const app = createApp(App);
  app.use(router);
  app.mount('#app');
}

init();
