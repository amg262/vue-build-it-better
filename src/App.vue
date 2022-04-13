<template>
  <div id="app">
    <!--  nav  -->
    <b-navbar type="dark" variant="info" class="mb-3 ">
      <b-navbar-brand href="#">
        <b-icon icon="tools" class="mr-3"></b-icon>
        BUILD IT!
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button size="sm" variant="info" class="border-white add-project" @click="addProject">Add Project</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>

    <!--  content  -->
    <b-container>
      <h2 class="content-heading">High Priority Tasks</h2>
      <high-priority-tasks></high-priority-tasks>
      <h2 class="content-heading">
        Projects <span class="small">Filter: <b-form-select v-model="selectedTag"
                                                            :options="tags"></b-form-select></span>
      </h2>
      <project-list :tag="selectedTag" :key="selectedTag"></project-list>
    </b-container>

  </div>
</template>

<script>
import ProjectList from "./components/ProjectList";
import Project from "./models/Project";
import Task from "./models/Task";
import generator from "project-name-generator";
import {db} from "@/firebase";
import HighPriorityTasks from "@/components/HighPriorityTasks";


export default {
  name: 'App',
  components: {
    HighPriorityTasks,
    ProjectList
  },
  data() {
    return {
      tags: ['', 'tagA', 'tagB', 'tagC', 'tagD', 'tagE', 'tagF', 'tagG', 'tagH'],
      selectedTag: '',
    }
  },
  methods: {
    addProject() {
      // create sample projects and tasks
      let newProject = new Project(randomName(2, true), randomBudget(), null, randomTags());
      let newTask1 = new Task(randomName(4), randomCost(), randomPriority());
      let newTask2 = new Task(randomName(4), randomCost(), randomPriority());
      let newTask3 = new Task(randomName(4), randomCost(), randomPriority());
      let newTask4 = new Task(randomName(4), randomCost(), randomPriority());


      console.log(newProject, newTask1, newTask2, newTask3, newTask4);

      // TODO: add to collection
      db.collection('projects')
          .add(newProject.toFirestore())
          .then(docRef => {
            console.log('project added', docRef);

            return Promise.all([
              db.doc(docRef.path).collection(Task.collectionName).add(newTask1.toFirestore()),
              db.doc(docRef.path).collection(Task.collectionName).add(newTask1.toFirestore()),
              db.doc(docRef.path).collection(Task.collectionName).add(newTask1.toFirestore()),
              db.doc(docRef.path).collection(Task.collectionName).add(newTask1.toFirestore()),
              // db.collection('projects').doc(docRef.id).collection('tasks').add(newTask1.toFirestore()),
              // db.collection('projects').doc(docRef.id).collection('tasks').add(newTask2.toFirestore()),
              // db.collection('projects').doc(docRef.id).collection('tasks').add(newTask3.toFirestore()),
              // db.collection('projects').doc(docRef.id).collection('tasks').add(newTask4.toFirestore()),
            ]);
          })
          .then(docRefs => {
            console.log('tasks added', docRefs)
          })
          .catch(error => {
            console.log("error adding project", error);
          })
    }
  }
}


// functions for sample data
let randomBudget = () => (Math.floor(Math.random() * 10) * 100);
let randomCost = () => ((Math.floor(Math.random() * 10) + 1) * 10);
let randomPriority = () => (Math.floor(Math.random() * 4) + 1);

// generate wacky project name and capitalize first letter in each word
// https://www.npmjs.com/package/project-name-generator
let randomName = (words, alliterative) => {
  words = words ?? 2;
  alliterative = alliterative ?? false;

  return generator({words, alliterative}).raw
      .reduce((previousValue, currentValue) => {
        return previousValue + ' ' + currentValue.charAt(0).toUpperCase() + currentValue.substr(1).toLowerCase()
      }, '')
};

let randomTags = () => {
  let possibleTags = ['tagA', 'tagB', 'tagC', 'tagD', 'tagE', 'tagF', 'tagG', 'tagH'];
  let tags = [];
  for (let i = 0; i < 3; i++) {
    tags.push(possibleTags.splice(Math.floor(Math.random() * possibleTags.length), 1)[0])
  }
  return tags;
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, sans-serif;
}

.content-heading {
  margin-top: 30px;
  padding-bottom: 5px;
  border-bottom: 1px solid #252525;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  font-family: Optima, Avenir, sans-serif;
}

#app .custom-select {
  width: inherit;
}

#app .navbar-brand {
  font-size: 2em;
  font-family: Optima, Avenir, sans-serif;
  padding: 0;
}

#app .navbar-brand .b-icon {
  width: .95em;
  height: .95em;
}

</style>
