<script setup lang="ts">
import { Timer, Users } from "lucide-vue-next";
import Button_comp from "./Button_comp.vue";

defineProps({
  titleCardHistory: {
    type: String,
    default: "Card Title",
  },
  dateCreated: {
    type: String,
    default: "Date Created",
  },
  amountPayers: {
    type: Number,
    default: 0,
  },
  timeCalculated: {
    type: String,
    default: "Time",
  },
});
</script>

<template>
  <div
    class="w-[360px] h-[275px] flex flex-col gap-2 items-center justify-start bg-white rounded-2xl shadow-md transition duration-300 ease-in-out hover:shadow-lg"
  >
    <!-- Header Session -->
    <div
      class="w-full px-6 flex flex-col gap-1 items-start justify-start py-2 mb-4"
    >
      <!-- Title -->
      <h6 class="font-bold text-black">{{ titleCardHistory }}</h6>

      <!-- Date Created on -->
      <p class="text-[#6B7280] text-center text-sm">
        Created on
        {{ dateCreated }}
      </p>
    </div>

    <!-- Middle Session -->
    <div class="w-full px-6 flex flex-row gap-4 items-center justify-between">
      <!-- Amount of Payers -->
      <div class="flex flex-row gap-1 items-center justify-center">
        <Users size="20px" class="text-[#6B7280]" />
        <p class="text-[#6B7280] text-sm text-center">
          {{ amountPayers }} players
        </p>
      </div>

      <!-- Timer -->
      <div class="flex flex-row gap-1 items-center justify-center">
        <Timer size="20px" class="text-[#6B7280]" />
        <p class="text-[#6B7280] text-sm text-center">{{ timeCalculated }}</p>
      </div>
    </div>

    <!-- Bottom Session -->
    <div class="w-full px-6 flex flex-row gap-2 items-center justify-between">
      <!-- Edit Button -->
      <Button_comp
        class="mt-10"
        buttonName="Edit"
        bgButton="#F3E7FF"
        color="#000000"
        iconLeft="/dashboard_img/icons/Edit.svg"
        width="134px"
        height="35px"
        colorIconLeft="#000000"
      />

      <!-- Host Button -->
      <Button_comp
        class="mt-10"
        buttonName="Host"
        bgButton="#9132E8"
        iconLeft="/dashboard_img/icons/Host.svg"
        width="134px"
        height="35px"
        colorIconLeft="#000000"
      />
    </div>
  </div>
</template>
