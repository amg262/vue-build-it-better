<template>
<task-list :tasks="tasks"></task-list>
</template>

<script>
import Task from "@/models/Task";
import {db} from "@/firebase";
import TaskList from "@/components/TaskList";

export default {
  name: "HighPriorityTasks",
  components: {TaskList},
  data() {
    return {
      tasks: []
    }
  },
  firestore: {
    // query "tasks" collections in all collections
    // if you had projects with tasks, todos with tasks its going to query them everywehre
    // requires special indexes and permissions
    tasks: db.collectionGroup(Task.collectionName)
              .where('priority', '>=', 3)
              .orderBy('priority', 'desc')
              .withConverter(Task)
  }


}
</script>

<style scoped>

</style>