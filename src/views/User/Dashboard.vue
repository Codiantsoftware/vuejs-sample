<template>
<!-- Container for displaying posts -->
<div>
    <!-- Post Container -->
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">Posts</h1>
        <!-- Grid for displaying posts -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Loop through products and display each as a card -->
            <div v-for="product in products" :key="product.id" class="card rounded-lg shadow-md overflow-hidden">
                <div class="p-4">
                    <!-- Link to individual post -->
                    <router-link :to="'#' + product.id" class="block mb-2">
                        <h2 class="text-lg font-semibold text-gray-800">{{ product.title }}</h2>
                    </router-link>
                    <p class="text-gray-600">{{ product.description }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import product from '@/assets/data'
// Reactive variable to store the list of products
const products = ref([])

products.value = product
</script>

<style scoped>
/* Scoped styles for the component */
.card {
    transition: transform 0.3s ease;
    /* Smooth transition effect for cards */
}

.card:hover {
    transform: translateY(-5px);
    /* Lift the card slightly on hover */
}

.carousel-inner img {
    height: 200px;
    /* Adjust height of carousel images */
}
</style>
