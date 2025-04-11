<template>
    <div class="w-full flex flex-col gap-8 items-center justify-center pt-20 pb-20">
        <div class="flex flex-col gap-5 items-center justify-center">
            <h1 class="font-bold primary-gradient-text text-center">Supercharge Your Quizzes</h1>
            <h6 class="text-[#808080] text-center">create engaging, interactive experience in minutes</h6>
        </div>
        <div class="flex lg:flex-row flex-col gap-7 lg:gap-0 items-center justify-center">
            <Section2Comp />
            <Section2Comp title="Play" description="Design beautiful quizzes with multiple-choice questions, images, and custom themes" imageSrc="/landingPage_img/sec2-play.png"/>
            <Section2Comp title="Win" description="Design beautiful quizzes with multiple-choice questions, images, and custom themes" imageSrc="/landingPage_img/sec2-win.png"/>
        </div>
    </div>
</template>
<style scoped>

</style>
<script setup>
import Section2Comp from './Section2-comp.vue';
</script>