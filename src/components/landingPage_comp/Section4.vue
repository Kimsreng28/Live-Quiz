<template>
  <div
    class="w-full primary-gradient flex flex-col justify-center items-center pt-28 pb-28 gap-8"
  >
    <div class="flex flex-col items-center justify-center max-w-[808px] gap-5">
      <h1 class="font-bold text-center">Ready for Your First Quiz?</h1>
      <h4 class="text-center">
        Join thousands of educators, trainers, and game enthusiasts who are
        creating engaging quizzes with Dice.
      </h4>
    </div>
    <div class="flex items-center justify-center">
      <div class="relative group">
        <button
          class="relative inline-block p-px font-semibold leading-6 text-white bg-white shadow-2xl cursor-pointer rounded-2xl shadow-pink-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-pink-600"
        >
          <span
            class="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-300 via-white to-[#222831] p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          ></span>
          <span
            class="relative z-10 block px-6 py-3 rounded-2xl primary-gradient"
          >
            <div class="relative z-10 flex items-center space-x-3">
              <h6
                @click="handleToDashboard"
                class="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-white"
              >
                Get Started
              </h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-7 h-7 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-white"
              >
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                ></path>
              </svg>
            </div>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const handleToDashboard = () => {
  window.location.href = "/pages/dashboard";
};
</script>
