<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- Header -->
    <header class="app-header">
      <h1>Car Rental App</h1>
    </header>

    <!-- Navbar -->
    <nav class="navbar">
      <router-link to="/" class="nav-link" active-class="active">Home</router-link>
      <router-link to="/customers" class="nav-link" active-class="active">Customers</router-link>
      <router-link to="/customers/new" class="nav-link" active-class="active">Add Customer</router-link>
      <router-link to="/vehicles/new" class="nav-link" active-class="active">Add Vehicle</router-link>
      <router-link to="/rentals/rented-vehicles" class="nav-link" active-class="active">Rented Vehicles</router-link>
      <router-link to="/rental/return" class="nav-link" active-class="active">Return Vehicle</router-link>
      <router-link to="/vehicles" class="nav-link" active-class="active">Vehicles</router-link>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <router-view /> 
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2025 Jelena Zivanic 250m/23 Ltd. | jelena.zivanic@one.pmf.uns.ac.rs | +381 234 567 890 | University of Novi Sad, Serbia</p>
    </footer>
  </div>
</template>

<style scoped>
/* App Layout */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* Header */
.app-header {
  background-color: #00796b;
  color: white;
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* Navbar */
.navbar {
  background-color: #b2dfdb;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.5rem 1rem;
  gap: 1rem;
}

.navbar .nav-link {
  color: #004d40;
  font-weight: 500;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.navbar .nav-link:hover {
  background-color: #80cbc4;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem;
  background-color: #f5f5f5;
  overflow-y: auto;
}

/* Footer */
.footer {
  background-color: #004d40;
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
}


::v-deep(.router-link-exact-active) {
  font-weight: bold;
  text-decoration: underline;
}

.nav-link:hover {
  background-color: rgba(13, 110, 253, 0.1); /* Light hover effect */
  border-radius: 5px;
}

.nav-link.active {
  font-weight: bold;
  text-decoration: underline;
}

</style>
