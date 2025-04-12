<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 transition-all duration-300 ease-in-out"
  >
    <Card_comp
      titleCard="Total Quizzes"
      totalNumber="12"
      imageIcons="/dashboard_img/icons/bar.svg"
      bgColor="#F3E7FF"
    />
    <Card_comp
      titleCard="Total Plays"
      totalNumber="12"
      imageIcons="/dashboard_img/icons/play.svg"
      bgColor="#DAE9FE"
    />
    <Card_comp
      titleCard="Average Score"
      totalNumber="12"
      imageIcons="/dashboard_img/icons/Reward.svg"
      bgColor="#DCFCE5"
    />
    <Card_comp
      titleCard="Total Participants"
      totalNumber="12"
      imageIcons="/dashboard_img/icons/User.svg"
      bgColor="#FFEDD5"
    />
  </div>

  <div class="flex flex-col mt-6">
    <!-- Tabs: Recent and Upcoming -->
    <Navigate_event
      nameFirstButton="Recent Quizzes"
      nameSecondButton="Upcoming Games"
      @tab-selected="handleTabSelected"
      class="transition-all duration-300 ease-in-out"
    />

    <!-- Tab Content: Dynamic based on active tab -->
    <div class="mt-6 transition-all duration-300 ease-in-out">
      <div
        v-if="currentTab === 'recent'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <Card_quiz_history
          titleCardHistory="History"
          dateCreated="5/15/2025"
          amountPayers="102"
          timeCalculated="Last  played 2 days ago"
        />
        <Card_quiz_history
          titleCardHistory="History"
          dateCreated="5/15/2025"
          amountPayers="102"
          timeCalculated="Last  played 2 days ago"
        />
        <Card_quiz_history
          titleCardHistory="History"
          dateCreated="5/15/2025"
          amountPayers="102"
          timeCalculated="Last  played 2 days ago"
        />

        <Create_card_quiz />
      </div>

      <div v-else class="flex justify-center items-center h-[300px]">
        <Empty_folder />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Card_comp from "../../components/dashboard_components/Card_comp.vue";
import Card_quiz_history from "../../components/dashboard_components/Card_quiz_history.vue";
import Create_card_quiz from "../../components/dashboard_components/Create_card_quiz.vue";
import Empty_folder from "../../components/dashboard_components/Empty_folder.vue";
import Navigate_event from "../../components/dashboard_components/Navigate_event.vue";

// Track the active tab name
const currentTab = ref("recent");

const handleTabSelected = (tab) => {
  currentTab.value = tab;
};
</script>
