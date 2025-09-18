import axios from 'axios';

const API_BASE = '/api/vehicle';

export function addVehicle(vehicle) {
  return axios.post(`${API_BASE}/add`, vehicle);
}

export function getAllVehicles() {
  return axios.get(`${API_BASE}/getAll`);
}
