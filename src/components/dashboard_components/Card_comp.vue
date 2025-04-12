<template>
  <div
    class="w-full max-w-[230px] aspect-[4/3] bg-white rounded-2xl shadow-md flex items-center justify-center transition duration-300 ease-in-out hover:shadow-lg"
  >
    <div
      class="w-full h-full flex flex-col justify-center px-4 sm:px-5 md:px-6"
    >
      <p class="text-gray-500 text-base sm:text-lg">{{ titleCard }}</p>

      <!-- Big vertical gap -->
      <div class="mt-8 flex items-center justify-between">
        <!-- Number -->
        <h4 class="text-black text-5xl sm:text-6xl font-extrabold">
          {{ totalNumber }}
        </h4>

        <!-- Icon -->
        <div
          class="rounded-full p-3 flex justify-center items-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          :style="{ backgroundColor: bgColor }"
        >
          <img
            :src="imageIcons"
            alt="icon"
            class="w-4 h-4 sm:w-6 sm:h-6 object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titleCard: {
    type: String,
    default: "Total Quizzes",
  },
  totalNumber: {
    type: String,
    default: "0",
  },
  imageIcons: {
    type: String,
    default: "/dashboard_img/icons/bar.svg",
  },
  bgColor: {
    type: String,
    default: "#1EB957",
  },
});
</script>
