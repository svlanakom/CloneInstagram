import { host } from "../config/constants.js"

export default class Datalayer {
  constructor(tableName /* users */) {
    this.tableName = tableName;
  }

  async getAll() {
    // return JSON.parse(localStorage.getItem(this.tableName)) || {};
    let response = await fetch(`${host}/${this.tableName}/get`);
    let data = await response.json();
     data = data.reduce((total, item) => {
      total[item.email] = item;
      return total;
    }, {});
    console.log(data);
    return data;
  }

  async add(obj) {
    // let data = this.getAll(this.tableName);
    // data[key] = obj;
    // localStorage.setItem(this.tableName, JSON.stringify(data));
    await fetch(`${host}/${this.tableName}/add`, {
      method: "post",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    
    });
  }

  async get(key) {
    // return this.getAll(this.tableName)[key] || {};
    let response = await fetch(`${host}/${this.tableName}/get/${key}`);
    const data = await response.json();

    console.log(data)
    return data;
  }


  async update(obj) {
    await fetch(`${host}/${this.tableName}/update`, {
      method: "post",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async delete(key) {
    // let data = this.getAll(this.tableName);
    // if (data && Object.keys(data).includes(key)) {
    //   let newData = {};
    //   for (const loopKey in data) {
    //     if (loopKey !== key) {
    //       newData[loopKey] = data[loopKey];
    //     }
    //   }
    //   localStorage.setItem(this.tableName, JSON.stringify(newData));
    // }
    await fetch(`${host}/${this.tableName}/delete/${key}`, {
      method: "delete"
    }

    );
  }
}