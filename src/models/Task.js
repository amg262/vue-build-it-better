
function Task(name, cost, priority) {
    // object data
    this.name = name || 'Task Name';
    this.cost = cost || 0;
    this.priority = priority || 1; // 1, 2, 3, or 4

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
            cost: this.cost,
            priority: this.priority
        }
    }
}

Task.collectionName = 'task';

Task.fromFirestore = function(snapshot, options) {
    let data = snapshot.data(options);
    const task = new Task(data.name, data.cost, data.priority);


    // set seom things for firebase
    // .id is already added by vuefire
    task._id = snapshot.id;
    task._path = snapshot.ref.path;

    return task;
}

export default Task;
