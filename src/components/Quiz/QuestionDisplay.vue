<template>
  <div class="question-display">
    <div class="question-header">
      <span
        >Question {{ question.questionNumber }}/{{
          question.totalQuestions
        }}</span
      >
      <span class="points">{{ question.points }} pts</span>
      <span class="timer">{{ timeLeft }}s</span>
    </div>

    <h3 class="question-text">{{ question.text }}</h3>

    <img v-if="question.image" :src="question.image" class="question-image" />

    <div class="options-grid">
      <button
        v-for="(option, index) in question.options"
        :key="index"
        @click="selectAnswer(option)"
        :disabled="!!userAnswer"
        :class="getOptionClass(option)"
      >
        {{ option }}
      </button>
    </div>

    <div
      v-if="answerResult"
      class="answer-feedback"
      :class="answerResult.isCorrect ? 'correct' : 'wrong'"
    >
      {{ answerResult.isCorrect ? "✓ Correct!" : "✗ Wrong!" }}
      <div>+{{ answerResult.pointsEarned }} points</div>
      <div>Total: {{ answerResult.totalScore }} points</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useQuizStore } from "../../stores/quiz";

const props = defineProps({
  question: Object,
  timeLeft: Number,
});

const emit = defineEmits(["answer-selected"]);

const quizStore = useQuizStore();
const userAnswer = ref(null);

const answerResult = computed(() => quizStore.answerResult);

const selectAnswer = (option) => {
  userAnswer.value = option;
  emit("answer-selected", option);
};

const getOptionClass = (option) => {
  let classes = "option-button";
  if (userAnswer.value === option) classes += " selected";
  if (answerResult.value && option === props.question.correctAnswer)
    classes += " correct";
  if (
    answerResult.value &&
    userAnswer.value === option &&
    !answerResult.value.isCorrect
  )
    classes += " wrong";
  return classes;
};
</script>

<style scoped>
.question-display {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #666;
}

.points {
  color: #4caf50;
  font-weight: bold;
}

.timer {
  color: #f44336;
  font-weight: bold;
}

.question-text {
  font-size: 1.5rem;
  margin: 20px 0;
  font-weight: bold;
}

.question-image {
  max-width: 100%;
  max-height: 300px;
  display: block;
  margin: 0 auto 20px;
  border-radius: 5px;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 30px 0;
}

.option-button {
  padding: 15px;
  border: none;
  border-radius: 8px;
  background: #f0f0f0;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.option-button:hover {
  background: #e0e0e0;
}

.option-button.selected {
  background: #2196f3;
  color: white;
}

.option-button.correct {
  background: #4caf50;
  color: white;
}

.option-button.wrong {
  background: #f44336;
  color: white;
}

.option-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.answer-feedback {
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
}

.answer-feedback.correct {
  background: #e8f5e9;
  color: #2e7d32;
}

.answer-feedback.wrong {
  background: #ffebee;
  color: #c62828;
}
</style>
