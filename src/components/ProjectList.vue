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
  // this is called when defining the component
  // firestore: {
  //   // TODO: query firebase
  //   projects: db.collection(Project.collectionName)
  //               .where('tags', 'array-contains', this.tag)
  //               // .where('budget', '<', 200)
  //               // .where('budget', '<', 200)
  //               .orderBy('deadline').withConverter(Project)
  // },

  // this is called when component is created/instantiated
  // these methods are called after the props are passed
  firestore() {
    // TODO: query firebase
    let projectRef = db.collection(Project.collectionName)
        .orderBy('deadline').withConverter(Project)

    if (this.tag) {
      projectRef = projectRef.where('tags', 'array-contains', this.tag)
    }

    return {
      projects: projectRef
    }
  }

  // this is called when component is created/instantiated
  // these methods are called after the props are passed
  // firestore() {
  //   // TODO: query firebase
  //   return {
  //     projects: db.collection(Project.collectionName)
  //         .where('tags', 'array-contains', this.tag)
  //         // .where('budget', '<', 200)
  //         // .where('budget', '<', 200)
  //         .orderBy('deadline').withConverter(Project)
  //   }
  // },
}
</script>

<style scoped>

</style>
