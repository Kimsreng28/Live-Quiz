<script setup lang="ts">
import Button_comp from "./Button_comp.vue";

defineProps({
  username: {
    type: String,
    default: "Kim",
  },
});
</script>

<template>
  <!-- Header Bar -->
  <div class="flex flex-row items-center justify-between w-[1115px]">
    <!-- Left Section -->
    <div class="flex flex-col gap-1">
      <h4 class="flex flex-row items-start gap-1">
        Welcome back, <span class="font-bold">{{ username }}</span>
      </h4>
      <p class="text-gray-500 text-base sm:text-lg">
        Here’s what’s happening with your quizzes
      </p>
    </div>

    <!-- Right Section -->
    <router-link to="/create-quiz">
      <Button_comp
        buttonName="Create New Quiz"
        bgButton="linear-gradient(to right, #9333EA, #DB2777)"
        iconLeft="/dashboard_img/icons/Vector.svg"
        width="226px"
        height="40px"
        colorIconLeft="#000000"
      />
    </router-link>
  </div>
</template>
