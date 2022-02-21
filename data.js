class Data {
    add(userData, tableName){
        const result = {...this.getAll(tableName), ...userData};
        return localStorage.setItem(tableName, JSON.stringify(result));
    }
    get(key, tableName){
        return this.getAll(tableName)[key];
    } 
    getAll(tableName){
        return JSON.parse(localStorage.getItem(tableName)) || {};
    }
}
