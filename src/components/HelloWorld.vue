<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="greetings">
    <h1 class="display-5 fw-semibold text-white">{{ msg }}</h1>
  </div>
</template>

<style scoped>
.greetings {
  padding: 0.5rem 0;
}

/* Optional: adjust spacing on larger screens */
@media (min-width: 1024px) {
  .greetings {
    padding: 1rem 0;
  }
}
</style>
