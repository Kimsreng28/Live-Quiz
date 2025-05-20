<template>
  <div class="player-panel">
    <div v-if="quizState === 'lobby'" class="lobby-screen">
      <h2>Waiting for quiz to start...</h2>
      <div class="room-code">Room: {{ currentRoom.roomCode }}</div>
      <div class="participants">
        <h3>Participants ({{ participants.length }})</h3>
        <div v-for="p in participants" :key="p.id" class="participant">
          <img :src="p.avatar || '/default-avatar.png'" :alt="p.username" />
          <span>{{ p.username }}</span>
        </div>
      </div>
    </div>

    <QuestionDisplay
      v-else-if="quizState === 'question'"
      :question="currentQuestion"
      :time-left="timeLeft"
      @answer-selected="$emit('submit-answer', $event)"
    />

    <Leaderboard
      v-else-if="quizState === 'leaderboard' || quizState === 'completed'"
      :scores="leaderboard"
      :is-completed="quizState === 'completed'"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useQuizStore } from "../../stores/quiz";
import Leaderboard from "./Leaderboard.vue";
import QuestionDisplay from "./QuestionDisplay.vue";

const quizStore = useQuizStore();

const currentRoom = computed(() => quizStore.currentRoom);
const currentQuestion = computed(() => quizStore.currentQuestion);
const quizState = computed(() => quizStore.quizState);
const participants = computed(() => quizStore.participants);
const leaderboard = computed(() => quizStore.leaderboard);
const timeLeft = computed(() => quizStore.timeLeft);
</script>

<style scoped>
.player-panel {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.lobby-screen {
  text-align: center;
}

.room-code {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 20px 0;
  color: #4a4a4a;
}

.participants {
  margin-top: 30px;
}

.participant {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background: #f5f5f5;
  border-radius: 5px;
}

.participant img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}
</style>
