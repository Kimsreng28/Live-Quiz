<template>
  <div class="flex w-full h-screen bg-gray-50 overflow-hidden">
    <!-- Sidebar -->
    <Side_bar />

    <!-- Main content -->
    <div
      class="flex flex-col flex-1 p-6 overflow-y-auto transition-all duration-300"
    >
      <!-- Conditional Header -->
      <div class="mb-6">
        <template v-if="route.name === 'Dashboard'">
          <Header_bar username="Kim" />
        </template>
        <template v-else>
          <h4 class="font-bold text-gray-800">
            {{ pageTitle }}
          </h4>
        </template>
      </div>

      <!-- Route content -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Header_bar from "../../components/dashboard_components/Header_bar.vue";
import Side_bar from "../../components/dashboard_components/Side_bar.vue";

const route = useRoute();

const pageTitle = computed(() => {
  switch (route.name) {
    case "CreateQuiz":
      return "Create Quiz";
    case "MyQuizzes":
      return "My Quizzes";
    case "HostGame":
      return "Host Game";
    case "Settings":
      return "Settings";
    default:
      return "";
  }
});
</script>
