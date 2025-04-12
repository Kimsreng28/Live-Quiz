<template>
  <div class="flex w-[484px] h-[45px] bg-gray-200 rounded-lg overflow-hidden">
    <!-- Tabs -->
    <!-- Button 1 for recent -->
    <button
      class="flex-1 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none transition-all duration-300 ease-in-out"
      :class="{ 'bg-white font-bold': isActive('recent') }"
      @click="selectTab('recent')"
    >
      {{ nameFirstButton }}
    </button>

    <!-- Button 2 for upcoming -->
    <button
      class="flex-1 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none transition-all duration-300 ease-in-out"
      :class="{ 'bg-white font-bold': isActive('upcoming') }"
      @click="selectTab('upcoming')"
    >
      {{ nameSecondButton }}
    </button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from "vue";

// Props for the button names
const props = defineProps({
  nameFirstButton: String,
  nameSecondButton: String,
});

// Emit for tab selection
const emit = defineEmits(["tab-selected"]);

// Track the active tab
const activeTab = ref("recent");

// Function to check if a tab is active
const isActive = (tab) => activeTab.value === tab;

// Function to select a tab
const selectTab = (tab) => {
  activeTab.value = tab;
  emit("tab-selected", tab);
};
</script>
