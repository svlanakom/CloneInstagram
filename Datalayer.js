export default class Datalayer {
    constructor(tableName /* users */) {
        this.tableName = tableName;
        // console.log(tableName)
    }
    getAll() {
        return JSON.parse(localStorage.getItem(this.tableName)) || {};
    }
    add(key, obj) {
        let data = this.getAll(this.tableName);
        // console.log(data)
        data[key] = obj;
        // console.log(obj)
        localStorage.setItem(this.tableName, JSON.stringify(data));
        // console.log( JSON.stringify(data))
    }
    
    
    get(key) {
        return this.getAll(this.tableName)[key] || {};
    }
    delete(key) {
        let data = this.getAll(this.tableName);
        if (data && Object.keys(data).includes(key)) {
            let newData = {};
            for (const loopKey in data) {
                console.log(loopKey)
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
  

