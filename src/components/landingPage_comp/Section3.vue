<template>
    <div ref="sectionRef" class="justify-center items-center w-full sm:pl-20 sm:pr-0 h-full bg-[#FAF5FF] pt-20 pb-20 flex overflow-hidden"> 
        <div class="flex w-full gap-14 items-center justify-center">
            <!-- left side -->
            <div class="sec3_left w-[40%] flex flex-col justify-center items-start gap-7">
                <h1 class="max-w-[550px] text-black font-bold">Everything You Need For Amazing Quizzes</h1>
                <h5 class="max-w-[550px] text-[#6B7280]">QuizBattle comes packed with all the tools to create engaging interactive experiences.</h5>
                <div class="w-full flex gap-10">
                    <div class="flex flex-col gap-7 items-start">
                        <Section3Comp title="Multiple question types" />
                        <Section3Comp title="Image support" />
                        <Section3Comp title="Live leader boards" />
                        <Section3Comp title="Sound effects"/>
                    </div>
                    <div class="flex flex-col gap-7 items-start">
                        <Section3Comp title="Custom themes" />
                        <Section3Comp title="Adjustable timers" />
                        <Section3Comp title="Player avatars" />
                        <Section3Comp title="Winner celebrations"/>
                    </div>
                </div>
            </div>
            <!-- right side with overflow -->
            <div class="sec3_right w-[60%] relative">
                <!-- Browser mockup component - wider than container to create overflow -->
                <div :class="['w-[125%] transition-all duration-1000', isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full']">
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        <!-- Browser top bar -->
                        <div class="bg-gray-100 p-2 pl-10 pt-3 pb-3 flex items-center border-b border-gray-200">
                            <img src="/landingPage_img/sec3-3dots.png" alt="" class="w-20">
                        </div>
                        <!-- Browser content -->
                        <div class="p-4 pl-10">
                            <!-- Search bar -->
                            <div class="bg-gray-100 h-20 rounded-md w-full mb-6"></div>
                            
                            <!-- Content placeholder -->
                            <div class="bg-gray-100 h-52 rounded-md w-full mb-8"></div>
                            
                            <!-- Color blocks grid -->
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-[#EA3D3C] h-24 rounded-md flex items-center justify-center">
                                    <div class="w-10 h-10 bg-white rounded-full"></div>
                                </div>
                                <div class="bg-[#3174F1] h-24 rounded-md flex items-center justify-center">
                                    <div class="w-[70px] h-full relative">
                                        <div class="w-8 h-8 bg-[#ffffff] rounded-full absolute top-3 right-0"></div>
                                        <div class="w-8 h-8 bg-[#ffffff] rounded-full absolute bottom-3 left-0"></div>
                                    </div>
                                </div>
                                <div class="bg-[#FFC022] h-24 rounded-md flex items-center justify-center">
                                    <div class="h-full w-[90px] relative">
                                        <div class="w-7 h-7 bg-[#ffffff] rounded-full absolute top-1 right-0"></div>
                                        <div class="w-7 h-7 bg-[#ffffff] rounded-full absolute top-8 left-7"></div>
                                        <div class="w-7 h-7 bg-[#ffffff] rounded-full absolute bottom-1 left-0"></div>
                                    </div>
                                </div>
                                <div class="bg-[#1EB957] h-24 rounded-md flex items-center justify-center relative">
                                    <div class="h-full w-[70px] relative">
                                        <div class="w-7 h-7 bg-[#ffffff] rounded-full absolute top-3 right-0"></div>
                                        <div class="w-7 h-7 bg-[#ffffff] rounded-full absolute top-3 left-0"></div>
                                        <div class="w-7 h-7 bg-[#ffffff] rounded-full absolute bottom-3 right-0"></div>
                                        <div class="w-7 h-7 bg-[#ffffff] rounded-full absolute bottom-3 left-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Section3Comp from './Section3-comp.vue';

const sectionRef = ref(null);
const isVisible = ref(false);

const observerOptions = {
  root: null, // use viewport as root
  rootMargin: '0px',
  threshold: 0.3 // trigger when 30% of element is visible
};

let observer = null;

const handleIntersect = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      isVisible.value = true;
      // Optional: Unobserve after animation has triggered
      // observer.unobserve(entry.target);
    } else {
      // Optional: If you want the element to slide out when scrolled away
      // isVisible.value = false;
    }
  });
};

onMounted(() => {
  // Initialize the observer
  observer = new IntersectionObserver(handleIntersect, observerOptions);
  
  // Start observing the section element
  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  // Clean up observer when component is destroyed
  if (observer) {
    observer.disconnect();
  }
});
</script>