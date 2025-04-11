<template>
    <div class="bg-[#222831] w-full flex flex-col justify-center items-center pt-16 pb-8 gap-7">
        <div class="flex lg:flex-row flex-col lg:gap-40 gap-10 justify-center items-center w-[80%]">
            <!-- logo -->
            <div class="flex flex-col justify-center items-center gap-3 max-w-[380px]">
                <h1 class="text-white text-bold">DICE</h1>
                <div>
                    Edu-Fun Mobile is an interactive, real-time quiz-taking platform designed to enhance classroom engagement and simplify assessment for educators. By combining gamification and real-time analytics. It makes learning more interactive and enjoyable for students while enabling teachers to track progress efficiently.
                </div>
            </div>
            <!-- info -->
            <div class="grid-container">
                <div class="header text-bold">About</div>
                <div class="header text-bold">Company</div>
                <div class="header text-bold">Contact Us</div>
                
                <!-- Column 1 items -->
                <div class="row" v-for="item in row">{{ item.name }}</div>
            </div>
            <!-- info mobile size -->
            <div class="grid-container-mobile">
                <div class="header text-bold">About</div>
                <div class="row" v-for="item in column1">{{ item.name }}</div>

                <div class="header text-bold mt-5">Company</div>
                <div class="row" v-for="item in column2">{{ item.name }}</div>

                <div class="header text-bold mt-5">Contact Us</div>
                <div class="row" v-for="item in column3">{{ item.name }}</div>
                
            </div>
        </div>
        <!-- additional info -->
        <div class="flex lg:flex-row flex-col gap-5 lg-gap-0 items-center justify-between w-[80%] ">
            <!-- social-->
            <div class="flex  items-center gap-10">
                <!-- icons -->
                <div class="flex gap-3">
                    <img src="/landingPage_img/facebookIcons.png" alt="" class="icons">
                    <img src="/landingPage_img/twitterIcons.png" alt="" class="icons">
                    <img src="/landingPage_img/igIcons.png" alt="" class="icons">
                </div>
                
            </div>
            <!-- copyright -->
            <div class="flex items-center gap-10 text-white">
                <h6>@Copyright 2025</h6>
                <div class="flex gap-3">
                    <h6>Help</h6>
                    <h6>Privacy</h6>
                    <h6>Terms</h6>
                </div>
            </div>
            
        </div>
    </div>
</template>
<style scoped>
.icons {
    width: 40px;
    height: 40px;
}
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(150px, 1fr)); /* Use minmax to control minimum width */
    grid-auto-rows: min-content; /* Make rows only as tall as needed */
    gap: 16px; /* Add some spacing between items */
    grid-auto-columns: min-content;
}
.row:nth-child(3n+1) { grid-column: 1; }
.row:nth-child(3n+2) { grid-column: 2; }
.row:nth-child(3n+3) { grid-column: 3; }

.grid-container-mobile{
    display: none;
}
.header {
    /* text-align: start; */
    font-weight: bold;
    font-family: "Poppins", sans-serif;
    font-size: 27.6px;
    width: fit-content;
    height:fit-content;
}
.row{
    /* text-align: start; */
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 768px) {
    .grid-container {
        display: none;
    }
    .grid-container-mobile{
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        gap: 16px;
    }
}
</style>
<script setup>

const row = [
    { id: 1, name: "Menu" },
    { id: 2, name: "How we work" },
    { id: 3, name: "PO Box 86, Russian Federation Blvd., Sangkat Teuklaak 1, Khan Toul Kork, 120404, Phnom Penh, Cambodia" },
    { id: 4, name: "Features" },
    { id: 5, name: "Terms of Service" },
    { id: 6, name: "+855 98-724-508" },
    { id: 7, name: "News & Blogs" },
    { id: 8, name: "Pricing" },
    { id: 9, name: "superapp-DICE@gmail.com" },
    { id: 10, name: "Help & Supports" },
    { id: 11, name: "FAQ" },
    { id:12, name: "www.superapp-DICE.com" },
]

const getColumnItems = (columnIndex) => {
    return row.filter(item => (item.id - 1) % 3 === columnIndex);
};

// Get items for each column
const column1 = getColumnItems(0); // Items with IDs 1, 4, 7, 10
const column2 = getColumnItems(1); // Items with IDs 2, 5, 8, 11
const column3 = getColumnItems(2); // Items with IDs 3, 6, 9, 12
</script>
