<template>
    <div class="flex flex-col gap-10 p-10 justify-center items-center">
        <h1 class="font-bold text-black"><span class="font-bold primary-gradient-text">Our </span>Teams</h1>
        <div class="flex flex-col gap-5 justify-center items-center">
            <div class="flex gap-10 lg:flex-row flex-col">
                <Section3Comp name="Hai Kim Sreng" role="Front-End Dev"/>
                <Section3Comp name="Nann Koungkea" role="Front-End Dev"/>
                <Section3Comp name="Ngov Ly Vathanak" role="Front-End Dev"/>
            </div>
            <div class="flex gap-10 lg:flex-row flex-col">
                <Section3Comp name="Ry Kunsithya" role="Back-End Dev"/>
                <Section3Comp name="Saren Sokmeak" role="Back-End Dev"/>
            </div>
        </div>
        <h1 class="font-bold text-black"><span class="font-bold primary-gradient-text">Our </span>Advisors and Mentors</h1>
        <div class="flex justify-center items-center">
            <Section3Comp name="Mr. Heng Rathpisey" role="Advisor and Mentor"/>
        </div>
    </div>
</template>
<script setup>
import Section3Comp from './Section3-comp.vue';
</script>