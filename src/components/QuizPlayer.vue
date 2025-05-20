<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Connection status -->
    <div
      v-if="!isConnected"
      class="bg-yellow-100 text-yellow-800 p-4 rounded mb-4 text-center"
    >
      Connecting to server... Please wait.
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"
      ></div>
      <p>Loading quizzes...</p>
    </div>

    <!-- Invalid room code -->
    <div
      v-else-if="!roomCodeValid"
      class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center"
    >
      <h2 class="text-xl font-bold mb-4 text-red-600">Invalid Room Code</h2>
      <p class="mb-4">
        The room code you entered is invalid or the quiz has ended.
      </p>
      <button
        @click="returnToHome"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Return to Home
      </button>
    </div>

    <!-- Quiz in progress -->
    <div
      v-else-if="!quizEnded"
      class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6"
    >
      <!-- Question progress -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm font-medium text-gray-700">
            Question {{ currentQuestion }} of {{ totalQuestions }}
          </span>
          <span v-if="!isHost" class="text-sm font-medium text-gray-700">
            Time left: {{ timeLeft }}s
          </span>
        </div>
        <div v-if="!isHost" class="w-full bg-gray-200 rounded-full h-2.5">
          <div
            class="bg-blue-600 h-2.5 rounded-full"
            :style="{ width: `${(timeLeft / quizDuration) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Current question -->
      <div v-if="currentQuiz">
        <h2 class="text-xl font-bold mb-4">{{ currentQuiz.question }}</h2>

        <!-- Answer options -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            v-for="(option, index) in options"
            :key="index"
            @click="submitAnswer(option)"
            :disabled="answerSubmitted || isHost"
            :class="[
              'p-4 border rounded-lg text-left transition-all duration-200',
              'flex items-start',
              {
                'border-blue-500 bg-blue-50':
                  selectedOption === option && !answerSubmitted,
                'border-green-500 bg-green-50 text-green-800':
                  answerSubmitted && option === correctAnswer,
                'border-red-500 bg-red-50 text-red-800':
                  answerSubmitted &&
                  selectedOption === option &&
                  option !== correctAnswer,
                'border-gray-300 bg-white hover:bg-gray-50':
                  !answerSubmitted && selectedOption !== option,
                'opacity-50 cursor-not-allowed': isHost,
              },
            ]"
          >
            <span
              class="flex items-center justify-center h-6 w-6 mr-3 rounded-full border-2"
              :class="{
                'border-green-500 bg-green-100 text-green-800':
                  answerSubmitted && option === correctAnswer,
                'border-red-500 bg-red-100 text-red-800':
                  answerSubmitted &&
                  selectedOption === option &&
                  option !== correctAnswer,
                'border-gray-300': !answerSubmitted,
                'border-blue-500':
                  selectedOption === option && !answerSubmitted,
              }"
            >
              {{ String.fromCharCode(65 + index) }}
            </span>
            <span>{{ option }}</span>
          </button>
        </div>

        <!-- Answer feedback -->
        <div
          v-if="answerSubmitted || isHost"
          class="p-4 mb-6 rounded-lg flex items-start"
          :class="
            result ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          "
        >
          <span class="mr-2 text-xl">
            {{ result ? "✅" : "❌" }}
          </span>
          <div>
            <p class="font-semibold">
              {{ result ? "Correct!" : "Incorrect!" }}
            </p>
            <p v-if="!result" class="mt-1">
              The correct answer is:
              <span class="font-medium">{{ correctAnswer }}</span>
            </p>
            <p v-if="result" class="mt-1">Well done!</p>
          </div>
        </div>

        <!-- Host controls -->
        <div v-if="isHost" class="flex justify-end mt-4">
          <button
            @click="nextQuestion"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {{ isLastQuestion ? "Finish Quiz" : "Next Question" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Quiz completed -->
    <div
      v-else
      class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 text-center"
    >
      <h2 class="text-2xl font-bold mb-4">Quiz Completed!</h2>
      <p class="text-lg mb-6">Thank you for participating.</p>

      <div class="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 class="text-xl font-semibold mb-4 text-center">Your Results</h3>
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <p class="text-gray-500 text-sm">Total Questions</p>
            <p class="text-2xl font-bold">{{ totalQuestions }}</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <p class="text-gray-500 text-sm">Questions Answered</p>
            <p class="text-2xl font-bold">{{ answeredQuizIds.size }}</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <p class="text-green-500 text-sm">Correct Answers</p>
            <p class="text-2xl font-bold text-green-600">{{ score }}</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <p class="text-red-500 text-sm">Incorrect Answers</p>
            <p class="text-2xl font-bold text-red-600">
              {{ answeredQuizIds.size - score }}
            </p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <p class="text-gray-500 text-sm">Final Score</p>
          <p
            class="text-4xl font-bold my-2"
            :class="scorePercentage >= 70 ? 'text-green-600' : 'text-red-600'"
          >
            {{ scorePercentage }}%
          </p>
          <p class="text-gray-600">
            ({{ score }} out of {{ totalQuestions }} correct)
          </p>
        </div>
      </div>

      <button
        @click="returnToHome"
        class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Return to Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import socketService from "../stores/socketService.js";

const route = useRoute();
const router = useRouter();

const timeLeft = ref(0);
const quizDuration = ref(30);
const answerSubmitted = ref(false);
const result = ref(null);
const selectedOption = ref(null);
const correctAnswer = ref("");
const quizEnded = ref(false);
const loading = ref(true);
const currentQuestion = ref(1);
const totalQuestions = ref(0);
const answeredQuizIds = new Set();
const score = ref(0);
const quizzes = ref([]);
const quizIndex = ref(0);
const isConnected = ref(false);
const roomCodeValid = ref(true);
const isHost = computed(() => route.query.host === "true");
const isLastQuestion = computed(
  () => currentQuestion.value === totalQuestions.value
);
let timer;

const options = computed(() => {
  if (!currentQuiz.value) return [];
  return [
    currentQuiz.value.optionA,
    currentQuiz.value.optionB,
    currentQuiz.value.optionC,
    currentQuiz.value.optionD,
  ].filter((opt) => opt !== undefined && opt !== null);
});

const currentQuiz = computed(() => quizzes.value[quizIndex.value]);

const scorePercentage = computed(() => {
  return totalQuestions.value > 0
    ? Math.round((score.value / totalQuestions.value) * 100)
    : 0;
});

onMounted(() => {
  let clientId = localStorage.getItem("clientId");
  if (!clientId) {
    clientId = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("clientId", clientId);
  }

  socketService.connectSocket();

  socketService.socket.on("connect", () => {
    isConnected.value = true;
    console.log("Connected to server with ID:", socketService.socket.id);
    joinRoom();
  });

  socketService.socket.on("disconnect", () => {
    isConnected.value = false;
  });

  socketService.socket.on("connect_error", (err) => {
    console.error("Connection error:", err);
    isConnected.value = false;
    setTimeout(() => {
      socketService.connectSocket();
    }, 1000);
  });

  setupSocketListeners();

  setTimeout(() => {
    if (!isConnected.value) {
      console.error("Connection timeout");
      loading.value = false;
    }
  }, 5000);
});

const joinRoom = () => {
  const clientId = localStorage.getItem("clientId");
  socketService
    .joinRoom(route.params.roomCode, clientId)
    .then(() => {
      console.log("Successfully joined room");
      roomCodeValid.value = true;
    })
    .catch((err) => {
      console.error("Failed to join room:", err);
      roomCodeValid.value = false;
      loading.value = false;
    });
};

const setupSocketListeners = () => {
  socketService.onQuizStarted((data) => {
    if (data.roomCode === route.params.roomCode) {
      loading.value = false;
      roomCodeValid.value = true;

      quizzes.value = Array.isArray(data.quiz) ? data.quiz : [data.quiz];
      quizIndex.value = 0;

      quizDuration.value = data.quizDuration || 30;
      timeLeft.value = quizDuration.value;
      totalQuestions.value = quizzes.value.length;
      currentQuestion.value = 1;

      answerSubmitted.value = false;
      result.value = null;
      selectedOption.value = null;
      quizEnded.value = false;

      // Host sees correct answer immediately
      if (isHost.value) {
        const correctKey = currentQuiz.value.correctAnswer;
        correctAnswer.value = currentQuiz.value[correctKey] || correctKey;
        result.value = true; // Show correct answer to host
        answerSubmitted.value = true; // Mark as answered
      }

      // Only start timer for players
      if (!isHost.value) {
        startTimer();
      }
    }
  });

  socketService.onQuizResult((data) => {
    if (data.clientId === localStorage.getItem("clientId")) {
      result.value = data.result;
      correctAnswer.value = data.correctAnswer;
      if (data.result && !answeredQuizIds.has(data.quizId)) {
        score.value++;
        answeredQuizIds.add(data.quizId);
      }
    }
  });

  socketService.onRoomFinished((data) => {
    if (data.roomCode === route.params.roomCode) {
      quizEnded.value = true;
      clearInterval(timer);
    }
  });

  socketService.onNextQuestion((data) => {
    if (data.roomCode === route.params.roomCode) {
      quizIndex.value++;
      currentQuestion.value++;
      answerSubmitted.value = false;
      result.value = null;
      selectedOption.value = null;
      timeLeft.value = quizDuration.value;

      // Host sees correct answer immediately for new question
      if (isHost.value) {
        const correctKey = currentQuiz.value.correctAnswer;
        correctAnswer.value = currentQuiz.value[correctKey] || correctKey;
        result.value = true;
      }

      // Only start timer for players
      if (!isHost.value) {
        startTimer();
      }
    }
  });
};

const startTimer = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      clearInterval(timer);
      if (!answerSubmitted.value) {
        submitAnswer(selectedOption.value);
      }
    }
  }, 1000);
};

const submitAnswer = (answer) => {
  if (!currentQuiz.value || answerSubmitted.value || isHost.value) return;

  const correctKey = currentQuiz.value.correctAnswer;
  let correctValue = currentQuiz.value[correctKey] || correctKey;

  if (!options.value.includes(correctValue)) {
    correctValue =
      options.value.find((opt) => opt === correctKey) || correctValue;
  }

  result.value = answer === correctValue;
  correctAnswer.value = correctValue;
  selectedOption.value = answer;
  answerSubmitted.value = true;

  const clientId = localStorage.getItem("clientId");
  socketService.submitAnswer({
    answer,
    clientId,
    quizId: currentQuiz.value.id,
  });

  if (result.value && !answeredQuizIds.has(currentQuiz.value.id)) {
    score.value++;
    answeredQuizIds.add(currentQuiz.value.id);
  }
};

const nextQuestion = () => {
  if (!isHost.value) return;

  // Emit event to server to move to next question
  socketService.socket.emit("nextQuestion", {
    roomCode: route.params.roomCode,
  });
};

const returnToHome = () => {
  router.push("/quiz");
};

onUnmounted(() => {
  clearInterval(timer);
  socketService.socket.off("connect");
  socketService.socket.off("disconnect");
  socketService.socket.off("connect_error");
  socketService.socket.off("quizStarted");
  socketService.socket.off("quizResult");
  socketService.socket.off("roomFinished");
  socketService.socket.off("nextQuestion");
  socketService.disconnectSocket();
});
</script>
