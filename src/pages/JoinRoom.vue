<template>
  <div class="join-room">
    <h1>Join a Quiz Room</h1>

    <div class="form-container">
      <div class="form-group">
        <label for="roomCode">Room Code:</label>
        <input
          id="roomCode"
          v-model="roomCode"
          type="text"
          placeholder="Enter room code"
          @keyup.enter="joinRoom"
        />
      </div>

      <button @click="joinRoom" class="join-button">Join Room</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const roomCode = ref("");

const joinRoom = () => {
  if (roomCode.value.trim()) {
    router.push(`/room/${roomCode.value.trim().toUpperCase()}`);
  }
};
</script>

<style scoped>
.join-room {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.form-container {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.join-button {
  background: #2196f3;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.join-button:hover {
  background: #0b7dda;
}
</style>
