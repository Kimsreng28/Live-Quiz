<template>
    <!-- Using Tailwind CSS for styling -->
    <div class="header w-screen h-auto flex justify-between items-center pl-[93px] pr-[93px] pt-[20px] pb-[20px] fixed top-0 left-0 bg-white shadow-xs z-50">
        <router-link to="/">
            <div class="logo_container flex justify-center items-center sm:gap-3 md">
                <div class="logo w-[38px] h-[38px] rounded-[8px]">
                    <img src="/landingPage_img/logo.webp" alt="">
                </div>
                <h5 class="logo_name">Bloggist</h5>
            </div>
        </router-link>


        <div class="flex justify-center items-center gap-[40px] relative">
            <nav class="desktop-nav">
                <ul class="flex justify-center items-center gap-[40px]">
                    <li><router-link to="/" class="navList body-big" active-class="active">Home</router-link></li>
                    <li><router-link to="/aboutus" class="navList body-big" active-class="active">About us</router-link></li>
                    <li><router-link to="/contact" class="navList body-big" active-class="active">Contact</router-link></li>
                </ul>
            </nav>
            <div class="w-[236px] h-[40px] gap-[40px] flex auth-buttons">
                <router-link to="/login">
                    <button class="login-btn button w-[98px] h-[40px] bg-[#ffffff] rounded-[8px]">
                        Log In
                    </button>
                </router-link>

                <router-link to="/signin">
                    <button class="signup-btn button w-[98px] h-[40px] text-[#ffffff] bg-[#222222] rounded-[8px]">
                        Sign Up
                    </button>
                </router-link>

            </div>
            <button @click="toggleMenu" class="headerMenu">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Mobile Navigation Menu that appears when toggleMenu is activated -->
            <div v-if="isMenuOpen" class="mobile-nav-menu">
                <ul class="flex flex-col gap-2 py-2">
                    <li><router-link to="/" class="mobile-navList body-big" active-class="active">Home</router-link></li>
                    <li><router-link to="/aboutus" class="mobile-navList body-big" active-class="active">About us</router-link></li>
                    <li><router-link to="/contact" class="mobile-navList body-big" active-class="active">Contact</router-link></li>
                    <li class="mt-2">
                        <router-link to="login">
                            <button class="login-btn button w-full h-[40px] bg-[#ffffff] rounded-[8px] mb-2">
                                Log In
                            </button>
                        </router-link>

                    </li>
                    <li>
                        <router-link to="signin">
                            <button class="signup-btn button w-full h-[40px] text-[#ffffff] bg-[#222222] rounded-[8px]">
                                Sign Up
                            </button>
                        </router-link>

                    </li>
                </ul>
            </div>
        </div>


    </div>


</template>
<style>

</style>
<script setup>
import { ref } from 'vue';



export default{
    name: "Header",
    props:{

    }
}
</script>