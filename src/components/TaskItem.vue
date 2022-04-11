<template>
  <li>
    <b-badge pill :class="'priority priority-' + task.priority">{{ priorityIcon }}</b-badge>
    <span class="task">{{ task.name }} : ${{ task.cost }}</span>
  </li>
</template>

<script>

export default {
  name: "TaskItem",
  props: {
    task: Object
  },
  computed: {
    priorityIcon() {
      let icons = ['', '-', '.', '!', '!!'];
      return icons[this.task.priority];
    }
  }
}
</script>

<style scoped>
.priority {
  width: 2em;
  line-height: 1.5em;
  font-size: 0.7em;
  font-family: Helvetica, sans-serif;
}

.priority-1 {
  background-color: lightgray;
  color: lightgray;
}

.priority-2 {
  background-color: dodgerblue;
  color: dodgerblue;
}

.priority-3 {
  background-color: orange;
}

.priority-4 {
  background-color: red;
}

.task {
  vertical-align: middle;
  margin-left: .25em;
}

li {
  margin-left: 32px;
  text-indent: -30px;
}

.badge {
  text-indent: 0;
}
</style>
