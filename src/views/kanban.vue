<template>
    <div>
        <div v-for="column in columns" :key="column.title" style="height: 100%; width:23%; margin: 10px;float: left;">
            <p>{{column.title}}</p>
            <draggable :list="column.tasks" :animation="200" group="tasks" item-key="id">
                <template #item="task">
                    <el-card :task="task" style="margin: 10px; width: 100%; height: 100px"></el-card>
                </template>
            </draggable>
        </div>
    </div>
  </template>
  
<script lang="ts" setup>
import draggable from "vuedraggable";

const columns =  [
    {
    title: "Backlog",
    tasks: [
        {
        id: 1,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
        },
        {
        id: 2,
        title: "Provide documentation on integrations",
        date: "Sep 12"
        },
        {
        id: 3,
        title: "Design shopping cart dropdown",
        date: "Sep 9",
        type: "Design"
        },
        {
        id: 4,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
        },
        {
        id: 5,
        title: "Test checkout flow",
        date: "Sep 15",
        type: "QA"
        }
    ]
    },
    {
    title: "In Progress",
    tasks: [
        {
        id: 6,
        title: "Design shopping cart dropdown",
        date: "Sep 9",
        type: "Design"
        },
        {
        id: 7,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
        },
        {
        id: 8,
        title: "Provide documentation on integrations",
        date: "Sep 12",
        type: "Backend"
        }
    ]
    },
    {
    title: "Review",
    tasks: [
        {
        id: 9,
        title: "Provide documentation on integrations",
        date: "Sep 12"
        },
        {
        id: 10,
        title: "Design shopping cart dropdown",
        date: "Sep 9",
        type: "Design"
        },
        {
        id: 11,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
        },
        {
        id: 12,
        title: "Design shopping cart dropdown",
        date: "Sep 9",
        type: "Design"
        },
        {
        id: 13,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
        }
    ]
    },
    {
    title: "Done",
    tasks: [
        {
        id: 14,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
        },
        {
        id: 15,
        title: "Design shopping cart dropdown",
        date: "Sep 9",
        type: "Design"
        },
        {
        id: 16,
        title: "Add discount code to checkout page",
        date: "Sep 14",
        type: "Feature Request"
        }
    ]
    }
]


</script>

<style scoped>
.column-width {
min-width: 320px;
width: 320px;
}
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.ghost-card {
opacity: 0.5;
background: #F7FAFC;
border: 1px solid #4299e1;
}
</style>
