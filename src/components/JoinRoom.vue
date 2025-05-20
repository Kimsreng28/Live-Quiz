<template>
  <div class="max-w-md mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4 text-center">Join Quiz Room</h2>

    <div class="mb-6">
      <label class="block mb-2 font-semibold text-gray-700"
        >Enter Room Code:</label
      >
      <input
        v-model="roomCode"
        placeholder="6-digit code"
        maxlength="6"
        @keyup.enter="joinRoom"
        class="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="mb-6">
      <label class="block mb-2 font-semibold text-gray-700">Your Name:</label>
      <input
        v-model="playerName"
        placeholder="Enter your name"
        @keyup.enter="joinRoom"
        class="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      @click="joinRoom"
      :disabled="!roomCodeValid || !playerName"
      class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
    >
      Join Room
    </button>

    <div v-if="errorMessage" class="text-red-600 mt-4">
      {{ errorMessage }}
    </div>

    <div
      v-if="joinedRoom"
      class="mt-6 p-4 bg-green-100 rounded-md text-green-800"
    >
      <h3 class="text-lg font-semibold">Joined Room: {{ roomCode }}</h3>
      <p>Welcome, {{ playerName }}!</p>
      <p v-if="isHost">You are the host of this room.</p>
      <p v-else>Waiting for host to start the quiz...</p>
      <button
        v-if="isHost"
        @click="startQuiz"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Start Quiz
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import socketService from "../stores/socketService.js";

const router = useRouter();
const roomCode = ref("");
const playerName = ref("");
const joinedRoom = ref(false);
const errorMessage = ref("");
const isHost = ref(false);
const quizStarted = ref(false);

const roomCodeValid = computed(() => {
  return roomCode.value.length === 6 && /^\d+$/.test(roomCode.value);
});

const joinRoom = async () => {
  if (!roomCodeValid.value || !playerName.value) return;

  try {
    const clientId =
      localStorage.getItem("clientId") ||
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem("clientId", clientId);

    await socketService.joinRoom(roomCode.value, clientId);

    // Check if this is the host (first player to join)
    isHost.value = router.currentRoute.value.query.host === "true";

    joinedRoom.value = true;
    errorMessage.value = "";

    // Setup socket listeners
    socketService.onQuizStarted((data) => {
      if (data.roomCode === roomCode.value) {
        quizStarted.value = true;
        router.push({
          path: `/quiz/${roomCode.value}`,
          query: { host: isHost.value ? "true" : "false" },
        });
      }
    });
  } catch (error) {
    errorMessage.value = error.message || "Failed to join room";
    console.error("Join room error:", error);
  }
};

const startQuiz = async () => {
  if (!isHost.value) return;

  try {
    await socketService.startQuiz(roomCode.value);
  } catch (error) {
    errorMessage.value = error.message || "Failed to start quiz";
  }
};
</script>
