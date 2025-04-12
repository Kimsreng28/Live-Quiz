<script setup>
import Button from "primevue/button";
import Header from "../components/landingPage_comp/Header.vue";
import Section1 from "../components/landingPage_comp/Section1.vue";
import Section2 from "../components/landingPage_comp/Section2.vue";
import Section3 from "../components/landingPage_comp/Section3.vue";
import Section4 from "../components/landingPage_comp/Section4.vue";
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

