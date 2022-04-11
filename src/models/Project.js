import moment from "moment";

// CLASSES DON'T PASS METHODS WHEN VUE/VUEFIRE USES Object.assign()
// Constructor functions/prototypes work better
function Project(name, budget, deadline, tags) {
    // object data
    this.name = name || 'New Project Name';
    this.budget = budget || 0;
    this.deadline = deadline ? moment(deadline) : moment().add(Math.ceil(Math.random() * 8 + 2), 'days');
    this.tags = tags || [];

    // firebase internals
    this._id = '';
    this._path = '';

    this.toString = function () {
        return this.name;
    }

    // definte what we want to store in firebase
    this.toFirestore = function () {
        return {
            name: this.name,
            budget: this.budget,
            deadline: this.deadline.toDate(),
            tags: this.tags,
        }
    }
}

Project.collectionName = 'projects';

export default Project;
