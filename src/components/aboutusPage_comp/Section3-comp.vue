<template>
    <div class="flex flex-col lg:gap-3 gap-1 lg:max-w-[291px] w-full justify-center items-center">
        <img :src="imageSrc" alt="" class="w-full h-auto max-w-[552px] max-h-[552px]">
        <h4 class="font-bold text-black">{{name}}</h4>
        <h6 class="text-black">{{role}}</h6>
    </div>

</template>
<script setup>

defineProps({
    name:{
        type: String,
        default: "Nann Koungkea"
    },
    role:{
        type: String,
        default: "Front-End Dev"
    },
    imageSrc: {
        type: String,
        default: "/landingPage_img/sec3-avatar.png"
    }
})
</script>