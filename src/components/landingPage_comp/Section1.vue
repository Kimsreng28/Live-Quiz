<template>
    <div class="sec1_container justify-center items-center w-full lg:pl-20 lg:pr-20 h-full bg-[#FAF5FF] lg:pt-30 pt-15 lg:pb-30 pb-15 flex">
        <div class="sec1_subcontainer w-full flex gap-14 items-center justify-center">
            <!-- left side -->
            <div class="sec1_text w-[50%] flex flex-col justify-center items-center gap-7">
                <div class="flex flex-col justify-center items-start gap-7">
                    <h2 class="text-black font-bold max-w-[500px]">Online <span class="font-bold primary-gradient-text">Multi platform you can access</span> any where easily!</h2>
                    <p class="text-black max-w-[500px]">DICE is a super web application where students and lecturers can manage and connect with each other.</p>
                    <!-- button -->
                    <div class="flex gap-6 justify-center items-center">
                        <router-link to="/createquiz">
                            <button
                            class="create-quiz-button relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base"
                            >
                                <span
                                    class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"
                                ></span>

                                <span
                                    class="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]"
                                ></span>
                                
                                <div
                                    class="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110"
                                >
                                    <svg class="svg-create" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5 6.87405V12.8741M13.5 9.87405H7.5M19.5 9.87405C19.5 11.056 19.2672 12.2263 18.8149 13.3182C18.3626 14.4101 17.6997 15.4023 16.864 16.238C16.0282 17.0737 15.0361 17.7367 13.9442 18.189C12.8522 18.6413 11.6819 18.8741 10.5 18.8741C9.3181 18.8741 8.14778 18.6413 7.05585 18.189C5.96392 17.7367 4.97177 17.0737 4.13604 16.238C3.30031 15.4023 2.63738 14.4101 2.18508 13.3182C1.73279 12.2263 1.5 11.056 1.5 9.87405C1.5 7.48711 2.44821 5.19792 4.13604 3.51009C5.82387 1.82227 8.11305 0.874054 10.5 0.874054C12.8869 0.874054 15.1761 1.82227 16.864 3.51009C18.5518 5.19792 19.5 7.48711 19.5 9.87405Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p class="select-none">Create Quiz</p>

                                
                                </div>
                            </button>

                        </router-link>
                        <!-- join quiz button -->
                        <router-link to="/joinquiz">
                            <button
                            class="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group"
                            >
                                Join Quiz
                                <span
                                    class="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"
                                ></span>
                                <span
                                    class="absolute w-36 h-32 -top-8 -left-2 bg-purple-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"
                                ></span>
                                <span
                                    class="absolute w-36 h-32 -top-8 -left-2 primary-gradient rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"
                                ></span>
                                <span
                                    class="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-4 left-7 z-10"
                                    >Click me!!</span
                                >
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- right side -->
            <div class="w-1/2 flex justify-center items-center">
                <!-- dice logo -->
                <div class="dice-logo flex flex-col gap-2 md:gap-1.5 sm:gap-1">
                    <!-- top layer dice -->
                    <div class="flex gap-2 md:gap-1.5 sm:gap-1">
                        <!-- n1 -->
                        <div class="eachDice lg:w-44 lg:h-44 md:w-32 md:h-32 sm:w-24 sm:h-24 bg-[#EA3D3C] rounded-[20px] flex justify-center items-center">
                            <div class="innerDice w-14 h-14 lg:w-12 lg:h-12 md:w-10 md:h-10 sm:w-8 sm:h-8 bg-[#ffffff] rounded-full"></div>
                        </div>
                        <!-- n2 -->
                        <div class="eachDice w-52 h-52 lg:w-44 lg:h-44 md:w-32 md:h-32 sm:w-24 sm:h-24 bg-[#3174F1] rounded-[20px] flex justify-center items-center relative">
                            <div class="innerDice w-12 h-12 lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 bg-[#ffffff] rounded-full absolute top-5 right-5 md:top-4 md:right-4 sm:top-3 sm:right-3"></div>
                            <div class="innerDice w-12 h-12 lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 bg-[#ffffff] rounded-full absolute bottom-5 left-5 md:bottom-4 md:left-4 sm:bottom-3 sm:left-3"></div>
                        </div>
                    </div>
                    <!-- bottom layer -->
                    <div class="flex gap-2 md:gap-1.5 sm:gap-1">
                        <!-- n3 -->
                        <div class="eachDice w-52 h-52 lg:w-44 lg:h-44 md:w-32 md:h-32 sm:w-24 sm:h-24 bg-[#FFC022] rounded-[20px] flex justify-center items-center relative">
                            <div class="innerDice w-12 h-12 lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 bg-[#ffffff] rounded-full absolute top-4 right-4 md:top-3 md:right-3 sm:top-2 sm:right-2"></div>
                            <div class="innerDice w-12 h-12 lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 bg-[#ffffff] rounded-full absolute"></div>
                            <div class="innerDice w-12 h-12 lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 bg-[#ffffff] rounded-full absolute bottom-4 left-4 md:bottom-3 md:left-3 sm:bottom-2 sm:left-2"></div>
                        </div>
                        <!-- n4 -->
                        <div class="eachDice w-52 h-52 lg:w-44 lg:h-44 md:w-32 md:h-32 sm:w-24 sm:h-24 bg-[#1EB957] rounded-[20px] flex justify-center items-center relative">
                            <div class="innerDice w-11 h-11 lg:w-9 lg:h-9 md:w-7 md:h-7 sm:w-5 sm:h-5 bg-[#ffffff] rounded-full absolute top-4 right-4 md:top-3 md:right-3 sm:top-2 sm:right-2"></div>
                            <div class="innerDice w-11 h-11 lg:w-9 lg:h-9 md:w-7 md:h-7 sm:w-5 sm:h-5 bg-[#ffffff] rounded-full absolute top-4 left-4 md:top-3 md:left-3 sm:top-2 sm:left-2"></div>
                            <div class="innerDice w-11 h-11 lg:w-9 lg:h-9 md:w-7 md:h-7 sm:w-5 sm:h-5 bg-[#ffffff] rounded-full absolute bottom-4 right-4 md:bottom-3 md:right-3 sm:bottom-2 sm:right-2"></div>
                            <div class="innerDice w-11 h-11 lg:w-9 lg:h-9 md:w-7 md:h-7 sm:w-5 sm:h-5 bg-[#ffffff] rounded-full absolute bottom-4 left-4 md:bottom-3 md:left-3 sm:bottom-2 sm:left-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    
    .eachDice:hover {
        transform: scale(1.09);
        transition: transform 0.3s ease;

    }
    .svg-create {
        transition: transform 0.5s ease;
    }

    .create-quiz-button:hover .svg-create {
        transform: rotate(90deg);
    }
    .dice-logo {
      transform: rotate(15deg);
      margin-top: 5%;
      transition: transform 0.3s ease;
    }
    .dice-logo:hover {
      transform: rotate(0deg);
    }


    .slide-in-right {
        opacity: 0;
        transform: translateX(100px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .slide-in-right.visible {
        opacity: 1;
        transform: translateX(0);
    }

    @media (max-width: 1024px) {
        .sec1_subcontainer{
            flex-direction: column;
        }
        .eachDice{
            width: 165px;
            height: 165px;
        }
        .innerDice{
            width: 40px;
            height: 40px;
        }
    }

    @media (max-width: 768px) {
        .eachDice{
            width: 145px;
            height: 145px;
        }
        .innerDice{
            width: 40px;
            height: 40px;
        }

    }

</style>

<script setup>

</script>
