<!-- src/App.vue -->
 <script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<script setup></script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Welcome to your car rental service!" />
    </div>
  </header>

  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
      <router-link to="/" class="navbar-brand">Car Rental App</router-link>
      <div class="navbar-nav">
        <router-link class="nav-link" to="/customers">Customers</router-link>
        <router-link class="nav-link" to="/customers/new">Add Customer</router-link>
        <router-link class="nav-link" to="/vehicles/new">Add Vehicle</router-link>
        <router-link class="nav-link" to="/rentals/rent">Rent Vehicle</router-link>
        <router-link class="nav-link" to="/rentals/rented-vehicles">Rented Vehicles</router-link>
      </div>
  </nav>


  <main>
     <router-view />
  </main>

</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
