<template>
  <div class="leaderboard">
    <h2 v-if="isCompleted">Quiz Completed!</h2>
    <h2 v-else>Leaderboard</h2>

    <div class="leaderboard-list">
      <div
        v-for="player in scores"
        :key="player.userId"
        class="leaderboard-item"
        :class="{ 'current-user': player.userId === currentUser.id }"
      >
        <span class="position">{{ player.position }}</span>
        <img :src="player.avatar || '/default-avatar.png'" class="avatar" />
        <span class="username">{{ player.username }}</span>
        <span class="score">{{ player.score }} pts</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from "../../stores/quiz";

const props = defineProps({
  scores: Array,
  isCompleted: Boolean,
});

const quizStore = useQuizStore();

// Get current user from localStorage or similar
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
</script>

<style scoped>
.leaderboard {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.leaderboard h2 {
  margin-bottom: 20px;
  color: #333;
}

.leaderboard-list {
  margin-top: 20px;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  background: #f5f5f5;
  border-radius: 5px;
}

.leaderboard-item.current-user {
  background: #e3f2fd;
  font-weight: bold;
}

.position {
  width: 30px;
  font-weight: bold;
  color: #666;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 15px;
}

.username {
  flex-grow: 1;
}

.score {
  font-weight: bold;
  color: #4caf50;
}
</style>
