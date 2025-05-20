<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-6 text-center">Create Quiz Room</h1>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"
        ></div>
        <p>Loading quizzes...</p>
      </div>

      <!-- No quizzes available -->
      <div v-else-if="availableQuizzes.length === 0" class="text-center py-8">
        <p class="mb-4">No quizzes available. Please create quizzes first.</p>
        <router-link
          to="/create-quiz"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
        >
          Create New Quiz
        </router-link>
      </div>

      <!-- Quiz selection -->
      <div v-else>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Quiz Duration (seconds):</label
          >
          <input
            v-model.number="roomDuration"
            type="number"
            min="10"
            class="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <h2 class="text-lg font-medium text-gray-900 mb-3">
          Select Quizzes for Room:
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            v-for="quiz in availableQuizzes"
            :key="quiz.id"
            class="flex items-center p-3 border rounded-lg cursor-pointer transition"
            :class="{
              'border-blue-500 bg-blue-50': selectedQuizzes.includes(quiz.id),
              'border-gray-200 hover:bg-gray-50': !selectedQuizzes.includes(
                quiz.id
              ),
            }"
            @click="toggleQuizSelection(quiz.id)"
          >
            <input
              type="checkbox"
              :id="'quiz-' + quiz.id"
              :value="quiz.id"
              v-model="selectedQuizzes"
              class="hidden"
            />
            <span
              class="flex-shrink-0 h-5 w-5 rounded border mr-3 flex items-center justify-center"
              :class="{
                'bg-blue-500 border-blue-500': selectedQuizzes.includes(
                  quiz.id
                ),
                'border-gray-300': !selectedQuizzes.includes(quiz.id),
              }"
            >
              <svg
                v-if="selectedQuizzes.includes(quiz.id)"
                class="h-3.5 w-3.5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <label :for="'quiz-' + quiz.id" class="cursor-pointer">
              {{ quiz.question }}
            </label>
          </div>
        </div>

        <div class="flex justify-center">
          <button
            @click="createRoom"
            :disabled="selectedQuizzes.length === 0"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Room
          </button>
        </div>

        <!-- Room created successfully -->
        <div v-if="roomCode" class="mt-8 p-6 bg-blue-50 rounded-lg text-center">
          <h3 class="text-xl font-bold mb-2">Room Created Successfully!</h3>
          <p class="text-lg mb-4">Share this code with participants:</p>
          <div
            class="text-3xl font-bold mb-6 bg-white py-3 px-6 rounded-lg inline-block"
          >
            {{ roomCode }}
          </div>

          <div class="flex justify-center space-x-4">
            <button
              @click="copyRoomCode"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy Code
            </button>
            <button
              @click="startRoom"
              :disabled="startDisabled"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import socketService from "../stores/socketService";

const availableQuizzes = ref([]);
const selectedQuizzes = ref([]);
const roomDuration = ref(30);
const roomCode = ref("");
const startDisabled = ref(false);
const loading = ref(false);
const router = useRouter();

const toggleQuizSelection = (quizId) => {
  const index = selectedQuizzes.value.indexOf(quizId);
  if (index === -1) {
    selectedQuizzes.value.push(quizId);
  } else {
    selectedQuizzes.value.splice(index, 1);
  }
};

const copyRoomCode = () => {
  navigator.clipboard.writeText(roomCode.value);
  alert("Room code copied to clipboard!");
};

onMounted(() => {
  socketService.connectSocket();
  fetchQuizzes();

  socketService.onQuizStarted((data) => {
    if (data.roomCode === roomCode.value) {
      loading.value = false;
      router.push({
        path: `/quiz/${roomCode.value}`,
        query: { host: "true" },
      });
    }
  });
});

onUnmounted(() => {
  socketService.socket.off("quizStarted");
  socketService.disconnectSocket();
});

const fetchQuizzes = async () => {
  try {
    loading.value = true;
    socketService.socket.off("quizList");
    socketService.getQuizList();

    socketService.onQuizList((quizzes) => {
      availableQuizzes.value = quizzes;
      loading.value = false;
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    loading.value = false;
  }
};

const createRoom = async () => {
  try {
    roomCode.value = await socketService.createRoomWithQuizzes({
      quizIds: selectedQuizzes.value,
      duration: roomDuration.value,
    });

    // Automatically join as host
    const clientId =
      localStorage.getItem("clientId") ||
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem("clientId", clientId);

    await socketService.joinRoom(roomCode.value, clientId);
  } catch (error) {
    console.error("Error creating room:", error);
  }
};

const startRoom = async () => {
  if (!roomCode.value) return;

  try {
    startDisabled.value = true;
    await socketService.startQuiz(roomCode.value);
  } catch (error) {
    console.error("Error starting quiz:", error);
    startDisabled.value = false;
  }
};
</script>
