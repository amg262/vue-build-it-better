# vue-build-it-better

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
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
return {
projects: db.collection(Project.collectionName)
.where('tags', 'array-contains', this.tag)
// .where('budget', '<', 200)
// .where('budget', '<', 200)
.orderBy('deadline').withConverter(Project)
}