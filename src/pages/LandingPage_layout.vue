<script setup>
import Header from "../components/landingPage_comp/Header.vue";
import Footer from "../components/landingPage_comp/Footer.vue";
import { RouterView } from 'vue-router';

</script>
<template>
    <div class="flex flex-col">
        <Header />
        <Router-view />
        <Footer />
    </div>
    
</template>

