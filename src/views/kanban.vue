<template>
    <el-container>
        <el-row>
            <div>
                <el-form v-model="newTask" placeholder="Enter Task" @keyup.enter="add"></el-form>
            </div>
        </el-row>
        <el-row>
            <el-col>
                <div>
                    <h3>Backlog</h3>
                    <draggable :list="state.arrBacklog" group="tasks">
						<div v-for="element in state.arrBacklog" :key="element.name">
              				{{ element.name }}
            			</div>
					</draggable>
                </div>
            </el-col>
        </el-row>
		<el-row>
            <el-col>
                <div>
                    <h3>In progress</h3>
                    <draggable :list="state.arrInProgress" group="tasks">
						<div v-for="element in state.arrInProgress" :key="element.name">
              				{{ element.name }}
            			</div>
					</draggable>
                </div>
            </el-col>
        </el-row>
		<el-row>
            <el-col>
                <div>
                    <h3>Testing</h3>
                    <draggable :list="state.arrTested" group="tasks">
						<div v-for="element in state.arrTested" :key="element.name">
              				{{ element.name }}
            			</div>
					</draggable>
                </div>
            </el-col>
        </el-row>
		<el-row>
            <el-col>
                <div>
                    <h3>Done</h3>
                    <draggable :list="state.arrDone" group="tasks">
						<div v-for="element in state.arrDone" :key="element.name">
              				{{ element.name }}
            			</div>
					</draggable>
                </div>
            </el-col>
        </el-row>
    </el-container>
</template>


<script lang="ts" setup>
import {reactive} from 'vue'
import draggable from 'vuedraggable';

let newTask = ""
let state = reactive({
    arrBacklog:[
        { name: "Code Sign Up Page" },
        { name: "Test Dashboard" },
        { name: "Style Registration" },
        { name: "Help with Designs" }
      ],
      arrInProgress: [{name: ""}],
      arrTested: [{name: ""}],
      arrDone: [{name: ""}],
})

const add = () =>{
    if (newTask) {
    state.arrBacklog.push({ name: newTask });
    newTask = "";
    }
}
</script>

<style>
</style>
