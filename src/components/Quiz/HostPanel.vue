<template>
  <div class="host-panel">
    <div v-if="quizState === 'lobby'" class="lobby-screen">
      <h2>Hosting Quiz: {{ currentRoom.quiz.title }}</h2>
      <div class="room-code">Room Code: {{ currentRoom.roomCode }}</div>
      <button @click="$emit('start-quiz')" class="start-button">
        Start Quiz
      </button>

      <div class="participants">
        <h3>Participants ({{ participants.length }})</h3>
        <div v-for="p in participants" :key="p.id" class="participant">
          <img :src="p.avatar || '/default-avatar.png'" :alt="p.username" />
          <span>{{ p.username }}</span>
        </div>
      </div>
    </div>

    <div v-else class="quiz-controls">
      <div v-if="quizState === 'question'" class="current-question">
        <h3>
          Question {{ currentQuestion.questionNumber }} of
          {{ currentQuestion.totalQuestions }}
        </h3>
        <p>{{ currentQuestion.text }}</p>
        <div class="timer">Time left: {{ timeLeft }}s</div>
      </div>

      <div class="control-buttons">
        <button
          v-if="quizState === 'question'"
          @click="$emit('show-leaderboard')"
          class="control-button"
        >
          Show Results
        </button>

        <button
          v-if="quizState === 'leaderboard' && !isQuizCompleted"
          @click="$emit('next-question')"
          class="control-button"
        >
          Next Question
        </button>
      </div>

      <Leaderboard
        v-if="quizState === 'leaderboard' || quizState === 'completed'"
        :scores="leaderboard"
        :is-completed="quizState === 'completed'"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useQuizStore } from "../../stores/quiz";
import Leaderboard from "./Leaderboard.vue";

const quizStore = useQuizStore();

const currentRoom = computed(() => quizStore.currentRoom);
const currentQuestion = computed(() => quizStore.currentQuestion);
const quizState = computed(() => quizStore.quizState);
const participants = computed(() => quizStore.participants);
const leaderboard = computed(() => quizStore.leaderboard);
const timeLeft = computed(() => quizStore.timeLeft);
const isQuizCompleted = computed(() => quizStore.quizState === "completed");
</script>

<style scoped>
.host-panel {
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

.start-button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 0;
}

.start-button:hover {
  background: #3e8e41;
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

.quiz-controls {
  text-align: center;
}

.current-question {
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 5px;
}

.timer {
  font-size: 1.2rem;
  font-weight: bold;
  color: #f44336;
  margin-top: 10px;
}

.control-buttons {
  margin: 20px 0;
}

.control-button {
  background: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
}

.control-button:hover {
  background: #0b7dda;
}
</style>
