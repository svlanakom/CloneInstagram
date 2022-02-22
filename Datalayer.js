export default class Datalayer {
    constructor(tableName /* users */) {
        this.tableName = tableName;
    }
    add(key, obj) {
        let data = this.getAll(this.tableName);
        data[key] = obj;
        localStorage.setItem(this.tableName, JSON.stringify(data));
    }
    get(key) {
        return this.getAll(this.tableName)[key] || {};
    }
    getAll() {
        return JSON.parse(localStorage.getItem(this.tableName)) || {};
    }
    delete(key) {
        let data = this.getAll(this.tableName);
        if (data && Object.keys(data).includes(key)) {
            let newData = {};
            for (const loopKey in data) {
                if (loopKey !== key) {
                    newData[loopKey] = data[loopKey];
                }
            }
          localStorage.setItem(this.tableName, JSON.stringify(newData));
        }
    }
    // update() {
    // }
  }
  

