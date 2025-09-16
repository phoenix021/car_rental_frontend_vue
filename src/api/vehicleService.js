import axios from 'axios';

const API_BASE = '/api/vehicle';

export function addVehicle(vehicle) {
  return axios.post(`${API_BASE}/add`, vehicle);
}

// Optionally, you could later add:
export function getAllVehicles() {
  return axios.get(`${API_BASE}/getAll`);
}
