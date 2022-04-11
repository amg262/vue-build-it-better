<template>
  <b-row>
    <b-col v-for="project in projects" :key="project.id" cols="12" md="6">
      <project-card :project="project"></project-card>
    </b-col>
  </b-row>
</template>

<script>
import ProjectCard from "./ProjectCard";
import {db} from "@/firebase";
import Project from "@/models/Project";

export default {
  name: "ProjectList",
  components: {ProjectCard},
  props: {
    tag: String,
  },
  data() {
    return {
      projects: [],
    }
  },
  firestore: {
    // TODO: query firebase
    projects: db.collection(Project.collectionName).orderBy('name')
  },
}
</script>

<style scoped>

</style>
