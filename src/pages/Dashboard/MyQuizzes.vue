<template>
  <div class="flex flex-col gap-5 bg-[#F9FAFC] lg:pl-20 pl-5 lg:pr-20 pr-5">
    <!-- header -->
    <div class="w-full text-gray-800 flex justify-between items-center">
      <h3 class="font-bold">My-Quizzes</h3>
      <div class="flex gap-5">
        <!-- search button -->
        <div
          class="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] primary-gradient shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300"
        >
          <div class="flex items-center justify-center fill-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Isolation_Mode"
              data-name="Isolation Mode"
              viewBox="0 0 24 24"
              width="22"
              height="22"
            >
              <path
                d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            class="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
          />
        </div>
        <!-- create quiz button -->

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
              class="relative flex items-center justify-between py-4 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110"
            >
              <svg
                class="svg-create"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 6.87405V12.8741M13.5 9.87405H7.5M19.5 9.87405C19.5 11.056 19.2672 12.2263 18.8149 13.3182C18.3626 14.4101 17.6997 15.4023 16.864 16.238C16.0282 17.0737 15.0361 17.7367 13.9442 18.189C12.8522 18.6413 11.6819 18.8741 10.5 18.8741C9.3181 18.8741 8.14778 18.6413 7.05585 18.189C5.96392 17.7367 4.97177 17.0737 4.13604 16.238C3.30031 15.4023 2.63738 14.4101 2.18508 13.3182C1.73279 12.2263 1.5 11.056 1.5 9.87405C1.5 7.48711 2.44821 5.19792 4.13604 3.51009C5.82387 1.82227 8.11305 0.874054 10.5 0.874054C12.8869 0.874054 15.1761 1.82227 16.864 3.51009C18.5518 5.19792 19.5 7.48711 19.5 9.87405Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p class="select-none">Create Quiz</p>
            </div>
          </button>
        </router-link>
      </div>
    </div>
    <!-- Menu bar -->
    <div class="flex justify-between">

    </div>
    <div class="flex justify-between">
      <Menubar :model="items" class="w-fit body-big flex"/>
      <div class="flex gap-5">
        <button class="icon-button" @click="toggleCard">
          <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5.70631C1 3.25171 1 2.02441 1.76389 1.26359C2.52361 0.5 3.75139 0.5 6.20833 0.5C8.66528 0.5 9.89167 0.5 10.6528 1.26359C11.4167 2.02441 11.4167 3.25171 11.4167 5.70631C11.4167 8.16091 11.4167 9.38821 10.6528 10.149C9.89167 10.9126 8.66389 10.9126 6.20833 10.9126C3.75278 10.9126 2.525 10.9126 1.76389 10.149C1 9.3896 1 8.1623 1 5.70631ZM1 20.2937C1 17.8391 1 16.6118 1.76389 15.851C2.525 15.0874 3.75278 15.0874 6.20833 15.0874C8.66389 15.0874 9.89167 15.0874 10.6528 15.851C11.4167 16.6118 11.4167 17.8391 11.4167 20.2937C11.4167 22.7483 11.4167 23.9756 10.6528 24.7364C9.89167 25.5 8.66389 25.5 6.20833 25.5C3.75278 25.5 2.525 25.5 1.76389 24.7364C1 23.977 1 22.7483 1 20.2937ZM15.5833 5.70631C15.5833 3.25171 15.5833 2.02441 16.3472 1.26359C17.1083 0.5 18.3361 0.5 20.7917 0.5C23.2472 0.5 24.475 0.5 25.2361 1.26359C26 2.02441 26 3.25171 26 5.70631C26 8.16091 26 9.38821 25.2361 10.149C24.475 10.9126 23.2472 10.9126 20.7917 10.9126C18.3361 10.9126 17.1083 10.9126 16.3472 10.149C15.5833 9.38821 15.5833 8.16091 15.5833 5.70631ZM15.5833 20.2937C15.5833 17.8391 15.5833 16.6118 16.3472 15.851C17.1083 15.0874 18.3361 15.0874 20.7917 15.0874C23.2472 15.0874 24.475 15.0874 25.2361 15.851C26 16.6118 26 17.8391 26 20.2937C26 22.7483 26 23.9756 25.2361 24.7364C24.475 25.5 23.2472 25.5 20.7917 25.5C18.3361 25.5 17.1083 25.5 16.3472 24.7364C15.5833 23.9756 15.5833 22.7483 15.5833 20.2937Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="icon-button" @click="toggleTable">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.57143 5.80769H21.4286C22.3758 5.80769 23.2842 6.18049 23.954 6.84408C24.6237 7.50767 25 8.4077 25 9.34615V14.6538C25 15.5923 24.6237 16.4923 23.954 17.1559C23.2842 17.8195 22.3758 18.1923 21.4286 18.1923H3.57143C2.62423 18.1923 1.71582 17.8195 1.04605 17.1559C0.376274 16.4923 0 15.5923 0 14.6538V9.34615C0 8.4077 0.376274 7.50767 1.04605 6.84408C1.71582 6.18049 2.62423 5.80769 3.57143 5.80769ZM3.57143 7.57692C3.09783 7.57692 2.64362 7.76332 2.30874 8.09512C1.97385 8.42691 1.78571 8.87692 1.78571 9.34615V14.6538C1.78571 15.1231 1.97385 15.5731 2.30874 15.9049C2.64362 16.2367 3.09783 16.4231 3.57143 16.4231H21.4286C21.9022 16.4231 22.3564 16.2367 22.6913 15.9049C23.0261 15.5731 23.2143 15.1231 23.2143 14.6538V9.34615C23.2143 8.87692 23.0261 8.42691 22.6913 8.09512C22.3564 7.76332 21.9022 7.57692 21.4286 7.57692H3.57143ZM0 1.38462C0 1.15 0.0940686 0.924995 0.261512 0.759098C0.428955 0.5932 0.656057 0.5 0.892857 0.5H24.1071C24.3439 0.5 24.571 0.5932 24.7385 0.759098C24.9059 0.924995 25 1.15 25 1.38462C25 1.61923 24.9059 1.84424 24.7385 2.01013C24.571 2.17603 24.3439 2.26923 24.1071 2.26923H0.892857C0.656057 2.26923 0.428955 2.17603 0.261512 2.01013C0.0940686 1.84424 0 1.61923 0 1.38462ZM0 22.6154C0 22.3808 0.0940686 22.1558 0.261512 21.9899C0.428955 21.824 0.656057 21.7308 0.892857 21.7308H24.1071C24.3439 21.7308 24.571 21.824 24.7385 21.9899C24.9059 22.1558 25 22.3808 25 22.6154C25 22.85 24.9059 23.075 24.7385 23.2409C24.571 23.4068 24.3439 23.5 24.1071 23.5H0.892857C0.656057 23.5 0.428955 23.4068 0.261512 23.2409C0.0940686 23.075 0 22.85 0 22.6154Z" fill="#222831"/>
          </svg>
        </button>
      </div>
    </div>

  
    <div class=" w-full quiz-history-grid ">
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
    </div>
    <DataTable 
      :value="products" 
      tableStyle="min-width: 50rem"
      class="custom-table small hidden"
    >
      <Column field="title" header="Quiz title"></Column>
      <Column field="status" header="Status"></Column>
      <Column field="response" header="Response"></Column>
      <Column field="created" header="Created"></Column>
      <Column header="Actions" class="w-24 text-center">
        <template #body="{ data }">
          <Button @click="editRow(data)" severity="info" rounded class="mr-2" aria-label="Edit">
            <template #icon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" 
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" 
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </Button>
          
          <!-- Stats button with custom SVG icon -->
          <Button @click="viewStats(data)" severity="success" rounded aria-label="View Stats">
            <template #icon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 20V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 20V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </Button>
        </template>
      </Column>
    </DataTable>
  </div>
  
</template>
<style scoped>

:deep(.p-menubar) {
  background-color: #F1F5F9; /* Light gray */
  border: none;
  /* Add more custom styles as needed */
  --p-menubar-item-color: #65778F;
  --p-menubar-base-item-padding: 10px 30px;
  --p-menubar-item-focus-background: #F3E7FF;
  --p-menubar-item-focus-color: #7C23D3;
}
.custom-table {
  /* Light theme */
  --surface-ground: #f8f9fa;
  --surface-section: #ffffff;
  --surface-card: #ffffff;
  --surface-overlay: #ffffff;
  --surface-border: #dee2e6;
  --text-color: #343a40;
  --text-color-secondary: #6c757d;
  --primary-color: #3B82F6;
  --primary-color-text: #ffffff;

}

.custom-table :deep(.p-datatable-thead > tr > th) {
  background-color: #f1f5f9;
  color: #334155;

  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.custom-table :deep(.p-datatable-tbody > tr) {
  background-color: #ffffff;
  color: #334155;
  border-bottom: 1px solid #e2e8f0;
}

.custom-table :deep(.p-datatable-tbody > tr:hover) {
  background-color: #F3E7FF; /* Lighter purple that matches your menubar focus */
  color: #7C23D3; /* Purple text on hover to maintain visibility */
}

.custom-table :deep(.p-button.p-button-rounded) {
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border: 1px solid #F3E7FF; 
}

.custom-table :deep(.p-datatable-wrapper) {
  border-radius: 12px; /* Change this value to your desired border radius */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* border radius */
.custom-table :deep(.p-datatable) {
  border-radius: 12px;
  overflow: hidden; /* This ensures the content respects the border radius */
}

.custom-table :deep(.p-datatable-thead > tr:first-child > th:first-child) {
  border-top-left-radius: 12px;
}

.custom-table :deep(.p-datatable-thead > tr:first-child > th:last-child) {
  border-top-right-radius: 12px;
}

.custom-table :deep(.p-datatable-tbody > tr:last-child > td:first-child) {
  border-bottom-left-radius: 12px;
}

.custom-table :deep(.p-datatable-tbody > tr:last-child > td:last-child) {
  border-bottom-right-radius: 12px;
}

/* button */
.custom-table :deep(.p-button.p-button-rounded .p-button-icon) {
  color: #334155; /* Dark icon color */
  font-size: 1rem; /* Explicit icon size */
}

.custom-table :deep(.p-button.p-button-info) {
  background-color: #EBF5FF; /* Light blue background */
}

.custom-table :deep(.p-button.p-button-info .p-button-icon) {
  color: #3B82F6; /* Blue icon */
}

.custom-table :deep(.p-button.p-button-success) {
  background-color: #ECFDF5; /* Light green background */
}

.custom-table :deep(.p-button.p-button-success .p-button-icon) {
  color: #10B981; /* Green icon */
}

/* Hover styles to increase visibility */
.custom-table :deep(.p-button.p-button-rounded:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* icon button */
.icon-button {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222831; /* Default icon color */
  transition: all 0.2s ease;
}

.icon-button:hover {
  background-color: #F3E7FF;
  color: #7C23D3; /* Changed color on hover */
}
.quiz-history-grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  
}

</style>
<script setup>
import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {ref} from 'vue';
import Button from 'primevue/button';
import Card_quiz_history from '../../components/dashboard_components/Card_quiz_history.vue';

const items = [
  {
    label: 'All Quizzes',
    icon: 'pi pi-fw pi-home',
    to: '/'
  },
  {
    label: 'Published',
    icon: 'pi pi-fw pi-list',
    to: '/'
  },
  {
    label: 'Draft',
    icon: 'pi pi-fw pi-list',
    to: '/'
  },
  {
    label: 'Archived',
    icon: 'pi pi-fw pi-list',
    to: '/'
  },
];

const products = ref([
  {
    title: "JavaScript Fundamentals Quiz",
    status: "Active",
    response: "87 submissions",
    created: "2025-04-01"
  },
  {
    title: "Vue.js Basics Assessment",
    status: "Closed",
    response: "42 submissions",
    created: "2025-03-15"
  },
  {
    title: "CSS Flexbox Challenge",
    status: "Draft",
    response: "Not published",
    created: "2025-04-10"
  },
  {
    title: "Web Accessibility Quiz",
    status: "Active",
    response: "23 submissions",
    created: "2025-04-05"
  },
  {
    title: "Git Version Control Test",
    status: "Scheduled",
    response: "Starts 2025-04-25",
    created: "2025-04-12"
  }
]);

const editRow = (rowData) => {
  console.log('Edit row:', rowData);
  // Add your logic for editing the row
};

const viewStats = (rowData) => {
  console.log('View stats for:', rowData);
  // Add your logic for viewing statistics
};

const toggleCard = () => {
  // Logic to toggle card view
  const cardContainer = document.querySelector('.quiz-history-grid');
  const table = document.querySelector('.custom-table');
  
  if (cardContainer && table) {
    cardContainer.style.display='grid';
    table.classList.add('hidden');
  }
  console.log('Toggle card view');
};
const toggleTable = () => {
  // Logic to toggle table view
  const table = document.querySelector('.custom-table');
  const cardContainer = document.querySelector('.quiz-history-grid');

  if (cardContainer && table) {
    table.classList.remove('hidden');
    cardContainer.style.display='none';
  }
  console.log('Toggle table view');
};
</script>
