<template>
  <div
    class="w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center text-center"
  >
    <h1 class="text-3xl font-bold mb-4">Quiz App</h1>

    <p class="text-gray-600 mb-8 max-w-xl">
      Welcome to the quiz app! Answer the questions and see how you do.
    </p>

    <Quiz />

    <div class="mt-10 w-full max-w-2xl">
      <nav class="space-x-4 text-blue-700 font-semibold">
        <router-link to="/create-quiz" class="hover:underline"
          >Create Quiz</router-link
        >
        |
        <router-link to="/create-room" class="hover:underline"
          >Create Room</router-link
        >
        |
        <router-link to="/join-room" class="hover:underline"
          >Join Room</router-link
        >
      </nav>

      <div class="mt-6">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Quiz from "../components/Quiz.vue";
</script>
