<template>
  <b-card no-body class="mb-4">
    <b-card-header>
      {{ project.name }}
    </b-card-header>
    <b-card-body>
      <b>Budget: </b> ${{ project.budget }}<br>
      <b>Cost: </b> ${{ projectCost }}<br>
      <!--      <b>Deadline: </b> {{ daysRemaining }} {{ daysRemaining === 1 ? 'day' : 'days' }}<br>-->
      <b>Tags: </b>
      <b-badge variant="secondary" v-for="tag in project.tags" :key="tag" class="mr-1">#{{ tag }}</b-badge>
      <br>

      <hr>

      <b>Tasks:</b>
      <task-list :tasks="tasks"></task-list>
    </b-card-body>
  </b-card>
</template>

<script>
import TaskList from "./TaskList";
import moment from "moment";
import Project from "@/models/Project";
import Task from "@/models/Task";
import {db} from "@/firebase";

export default {
  name: "ProjectCard",
  components: {TaskList},
  props: {
    project: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      tasks: [],
    }
  },
  firestore() {
    // TODO: query firebase
    return {
      tasks: db.collection(Project.collectionName)
          .doc(this.project.id)
          .collection(Task.collectionName)
    }
  },
  computed: {
    daysRemaining() {
      return Math.round(moment.duration(this.project.deadline.diff(moment())).asDays());
    },
    projectCost() {
      return this.tasks.reduce((prevVal, currVal) => {
        return prevVal + currVal.cost
      }, 0)
    }
  }

}
</script>

<style scoped>

</style>
