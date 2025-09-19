import axios from 'axios';

const API_BASE = '/api/rental';

export function listRentedVehicles() {
  return axios.get(`${API_BASE}/listCurrentlyRentedVehicles`);
}

export function rentVehicleToCustomer(rental) {
  // rental: { registration, driverLicenceNumber }
  return axios.post(`${API_BASE}/rent`, rental);
}

export function returnVehicle(registrationPlate, driversLicence) {
  return axios.post(`${API_BASE}/return`, null, {
    params: { registrationPlate, driversLicence }
  });
}

export function getCustomerRentals(driverLicenceNumber) {
  return axios.get(`/api/customer/${driverLicenceNumber}/rentals`);
}
