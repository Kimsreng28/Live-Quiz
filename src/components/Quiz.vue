<template>
  <div class="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
    <div v-if="quizzes.length" class="w-full max-w-xl">
      <h2 class="text-xl font-semibold mb-2">Select a Quiz</h2>
      <ul class="space-y-2 mb-6">
        <li v-for="quiz in quizzes" :key="quiz.id">
          <button
            @click="selectQuiz(quiz)"
            :class="[
              'w-full text-left px-4 py-2 rounded-lg border transition',
              quiz.id === selectedQuiz?.id
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white hover:bg-gray-100 border-gray-300',
            ]"
          >
            {{ quiz.question }}
          </button>
        </li>
      </ul>

      <div v-if="selectedQuiz" class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">{{ question }}</h3>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <button
            v-for="(opt, index) in options"
            :key="index"
            @click="submit(opt)"
            class="bg-blue-100 hover:bg-blue-300 text-blue-900 font-medium py-2 px-4 rounded-lg transition"
          >
            {{ opt }}
          </button>
        </div>

        <p
          v-if="result !== null"
          :class="[
            'text-center font-bold mt-4',
            result ? 'text-green-600' : 'text-red-600',
          ]"
        >
          Result: {{ result ? "Correct" : "Wrong" }}
        </p>
      </div>
    </div>

    <div v-else class="text-gray-500">Loading quizzes...</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import socketService from "../stores/socketService";

const quizzes = ref([]);
const selectedQuiz = ref(null);
const question = ref("");
const options = ref([]);
const result = ref(null);
const clientId = Math.random().toString(36).substring(2, 15);

function selectQuiz(quiz) {
  selectedQuiz.value = quiz;
  question.value = quiz.question;
  options.value = [quiz.optionA, quiz.optionB, quiz.optionC, quiz.optionD];
  result.value = null; // Reset result on new quiz selection
}

function submit(answer) {
  socketService.submitAnswer(answer, clientId, selectedQuiz.value.id);
}

onMounted(() => {
  socketService.getQuizList();

  socketService.onQuizList((list) => {
    quizzes.value = list;
    if (list.length > 0) {
      selectQuiz(list[0]); // Automatically show the first quiz
    }
  });

  socketService.onQuizResult((res) => {
    if (res.clientId === clientId) {
      result.value = res.result;
    }
  });
});
</script>
