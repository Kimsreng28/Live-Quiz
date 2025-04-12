<script setup lang="ts">
import Button_comp from "./Button_comp.vue";
</script>

<template>
  <div
    class="w-[360px] h-[275px] flex flex-col gap-2 items-center justify-center bg-white rounded-2xl shadow-md transition duration-300 ease-in-out hover:shadow-lg"
  >
    <!-- Icon -->
    <img
      src="/public/dashboard_img/icons/create.svg"
      alt=""
      class="w-10 h-10 object-contain"
    />

    <!-- Title -->
    <h6 class="font-bold text-black">Create a new quiz</h6>

    <!-- Description -->
    <p class="text-[#6B7280] text-center">
      Start from scratch or use a template
    </p>

    <!-- Button -->
    <Button_comp
      class="mt-10"
      buttonName="Get Started"
      bgButton="#9132E8"
      iconRight="/dashboard_img/icons/Arrow_right.svg"
      width="226px"
      height="40px"
      colorIconLeft="#000000"
    />
  </div>
</template>
