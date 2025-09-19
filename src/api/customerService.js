import axios from 'axios';

const API_BASE = '/api/customer';

export function getAllCustomers() {
  return axios.get(`${API_BASE}/getAll`);
}

export function addCustomer(customer) {
  return axios.post(`${API_BASE}/add`, customer);
}

export function deleteCustomerByLicence(licenceNumber) {
  return axios.delete(`${API_BASE}/delete/${licenceNumber}`);
}

export function getCustomerByLicence(licenceNumber) {
  return axios.get(`${API_BASE}/get/${licenceNumber}`);
}