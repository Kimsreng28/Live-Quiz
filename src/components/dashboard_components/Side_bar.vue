<template>
  <aside
    class="h-screen w-[298px] bg-white border-r border-gray-200 px-5 py-5 flex flex-col justify-start items-center shadow-md"
  >
    <!-- Logo -->
    <img
      src="/logo-dice.svg"
      alt="logo"
      class="mb-12 w-16 h-16 object-contain"
    />

    <!-- Menu Items -->
    <nav class="flex flex-col gap-5 w-full">
      <router-link
        v-for="item in menuItems"
        :key="item.label"
        :to="item.route"
        class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        :class="{
          'bg-purple-100 text-purple-700 font-semibold':
            route.path === item.route,
          'text-black hover:bg-purple-50 hover:text-purple-700':
            route.path !== item.route,
        }"
      >
        <!-- Icon with Lucide icon component -->
        <component
          :is="item.icon"
          class="w-5 h-5 transition-all duration-300 ease-in-out"
          :class="{
            'text-purple-700': route.path === item.route,
            'text-gray-600 hover:text-purple-700': route.path !== item.route,
          }"
        />
        <span
          class="text-base transition-all duration-300 ease-in-out"
          :class="{
            'text-purple-700': route.path === item.route,
            'text-black hover:text-purple-700': route.path !== item.route,
          }"
          >{{ item.label }}</span
        >
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";

// Lucide icons
import {
  Edit,
  Home,
  List,
  Settings as SettingsIcon,
  Users,
} from "lucide-vue-next";

// Vue Router
const route = useRoute();

// Menu items
const menuItems = [
  {
    label: "My Dashboard",
    route: "/pages/dashboard",
    icon: Home,
  },
  {
    label: "Create Quiz",
    route: "/pages/create-quiz",
    icon: Edit,
  },
  {
    label: "My Quizzes",
    route: "/pages/my-quizzes",
    icon: List,
  },
  {
    label: "Host Game",
    route: "/pages/host-game",
    icon: Users,
  },
  {
    label: "Settings",
    route: "/pages/settings",
    icon: SettingsIcon,
  },
];
</script>
