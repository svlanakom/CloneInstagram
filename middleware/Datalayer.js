import { host } from "../config/constants.js";

export default class Datalayer {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async add(obj) {
    const response = await fetch(`${host}/${this.tableName}/add`, {
      method: "post",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data;
  }

  async get(key) {
    const token = localStorage.getItem('token');
    let response = await fetch(`${host}/${this.tableName}/get/${key}`, {
      headers: {
        "Authorization": token
      }
    });
    if(response.status === 401)
    throw new Error('User unauthorized')
    const data = await response.json();
    return data;
  }

  async getAll() {
    const token = localStorage.getItem('token');
    let response = await fetch(`${host}/${this.tableName}/get`, {
      headers: {
        "Authorization": token
      }
    });
    if(response.status === 401)
    throw new Error('User unauthorized')
    let data = await response.json();
    data = data.reduce((total, item) => {
      total[item.email] = item;
      return total;
    }, {});
   
    return data;
  }

  async update(obj) {
    const token = localStorage.getItem('token');
    await fetch(`${host}/${this.tableName}/update`, {
      method: "post",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });
  }

  async delete(key) {
    const token = localStorage.getItem('token');
    await fetch(`${host}/${this.tableName}/delete/${key}`, {
      method: 'delete',
      headers: {
        "Authorization": token
      }
    });
  }
}