<template>
    <div class="flex flex-col gap-3 justify-center items-center max-w-[468px]">
        <div class="flex flex-col gap-2 items-center justify-center">
            <img :src="imageSrc" class="w-24 h-24" alt="">
            <h4 class="font-bold text-black">{{title}}</h4>
        </div>
        <h5 class="text-[#6B7280]">{{description}}</h5>
    </div>
</template>
<script setup>
defineProps({
    title: {
        type: String,
        default: "Create"
    },
    description: {
        type: String,
        default: "Design beautiful quizzes with multiple-choice questions, images, and custom themes"
    },
    imageSrc: {
        type: String,
        default: "/landingPage_img/sec2-create.png"
    }
})
</script>