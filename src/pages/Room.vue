<template>
  <div class="room-view">
    <div v-if="!currentRoom" class="loading">Loading room...</div>

    <template v-else>
      <HostPanel
        v-if="isHost"
        @start-quiz="startQuiz"
        @next-question="nextQuestion"
        @show-leaderboard="showLeaderboard"
      />

      <PlayerPanel v-else @submit-answer="submitAnswer" />
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import HostPanel from "../components/Quiz/HostPanel.vue";
import PlayerPanel from "../components/Quiz/PlayerPanel.vue";
import { useQuizStore } from "../stores/quiz";

const route = useRoute();
const quizStore = useQuizStore();

const currentRoom = computed(() => quizStore.currentRoom);
const isHost = computed(() => quizStore.currentRoom?.isHost);

// Get current user from localStorage or similar
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

onMounted(() => {
  quizStore.connect();
  quizStore.joinRoom(
    route.params.roomCode,
    currentUser.id,
    currentUser.username
  );
});

onUnmounted(() => {
  quizStore.reset();
});

const startQuiz = () => {
  quizStore.roomSocket.emit("startQuiz", {
    roomCode: quizStore.currentRoom.roomCode,
  });
};

const nextQuestion = () => {
  quizStore.quizSocket.emit("nextQuestion", {
    roomCode: quizStore.currentRoom.roomCode,
  });
};

const showLeaderboard = () => {
  quizStore.quizSocket.emit("showLeaderboard", {
    roomCode: quizStore.currentRoom.roomCode,
  });
};

const submitAnswer = (answer) => {
  quizStore.submitAnswer(answer);
};
</script>

<style scoped>
.room-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}
</style>
