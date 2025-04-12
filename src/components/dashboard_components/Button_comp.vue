<template>
  <div
    class="flex flex-row items-center justify-center rounded-2xl shadow-md transition duration-300 ease-in-out hover:shadow-l"
  >
    <!-- Button -->
    <button
      class="font-semibold rounded-[10px] flex flex-row items-center justify-center gap-2 transition duration-300 ease-in-out cursor-pointer hover:opacity-90"
      :style="{
        background: bgButton,
        width: width,
        height: height,
        color: color,
      }"
    >
      <!-- Left Icon -->
      <img
        v-if="iconLeft"
        :src="iconLeft"
        alt="left-icon"
        class="w-5 h-5"
        :style="{ filter: iconLeftFilter }"
      />
      {{ buttonName }}

      <!-- Right Icon -->
      <img
        v-if="iconRight"
        :src="iconRight"
        alt="right-icon"
        class="w-5 h-5"
        :style="{ filter: iconRightFilter }"
      />
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  buttonName: {
    type: String,
    default: "Button",
  },
  color: {
    type: String,
    default: "#ffffff",
  },
  bgButton: {
    type: String,
    default: "linear-gradient(to right, #9333EA, #DB2777)",
  },
  width: {
    type: String,
    default: "200px",
  },
  height: {
    type: String,
    default: "50px",
  },
  iconLeft: {
    type: String,
    default: null,
  },
  iconRight: {
    type: String,
    default: null,
  },
  colorIconLeft: {
    type: String,
    default: null,
  },
  colorIconRight: {
    type: String,
    default: null,
  },
});

// Function to convert hex color to filter
function hexToFilter(hex) {
  if (!hex) return "none";
  if (hex === "#000000") return "invert(0)";
  if (hex === "#ffffff" || hex === "#FFFFFF") return "invert(1)";
  return "brightness(0) saturate(100%)"; // grayscale base
}

// Computed properties
const iconLeftFilter = computed(() => hexToFilter(props.colorIconLeft));
const iconRightFilter = computed(() => hexToFilter(props.colorIconRight));
</script>
