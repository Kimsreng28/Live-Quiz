<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Create New Quiz</h2>
    <form @submit.prevent="createQuiz" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Question:</label
        >
        <input
          v-model="newQuiz.question"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div v-for="(option, index) in newQuiz.options" :key="index">
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Option {{ index + 1 }}:</label
        >
        <input
          v-model="newQuiz.options[index]"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Correct Answer:</label
        >
        <select
          v-model="newQuiz.correctAnswer"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option disabled value="">Select the correct answer</option>
          <option
            v-for="(option, index) in newQuiz.options"
            :value="option"
            :key="index"
            :disabled="!option"
          >
            {{ option || `Option ${index + 1}` }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Quiz
      </button>
    </form>

    <div
      v-if="createdQuizzes.length > 0"
      class="mt-8 pt-6 border-t border-gray-200"
    >
      <h3 class="text-lg font-medium text-gray-900 mb-4">
        Your Created Quizzes
      </h3>
      <ul class="space-y-3">
        <li
          v-for="quiz in createdQuizzes"
          :key="quiz.id"
          class="p-4 bg-gray-50 rounded-md"
        >
          <p class="font-medium">Q: {{ quiz.question }}</p>
          <p class="mt-1">A: {{ quiz.correctAnswer }}</p>
        </li>
      </ul>
      <button
        @click="returnToHome"
        class="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Return to Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import socketService from "../stores/socketService.js";

const router = useRouter();

const newQuiz = ref({
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
});

const createdQuizzes = ref([]);

// Watch for changes in options to update selectable correct answers
watch(
  () => [...newQuiz.value.options],
  () => {
    if (!newQuiz.value.options.includes(newQuiz.value.correctAnswer)) {
      newQuiz.value.correctAnswer = "";
    }
  }
);

const createQuiz = async () => {
  try {
    // Validate all fields are filled
    if (
      !newQuiz.value.question ||
      newQuiz.value.options.some((opt) => !opt) ||
      !newQuiz.value.correctAnswer
    ) {
      alert("Please fill in all fields");
      return;
    }

    const response = await fetch("http://localhost:3000/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: newQuiz.value.question,
        options: newQuiz.value.options,
        correctAnswer: newQuiz.value.correctAnswer,
      }),
    });

    const quiz = await response.json();
    createdQuizzes.value.push(quiz);

    // Reset form
    newQuiz.value = {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    };

    // Refresh quiz list
    socketService.getQuizList();
  } catch (error) {
    console.error("Error creating quiz:", error);
  }
};

const returnToHome = () => {
  router.push("/quiz");
};
</script>
