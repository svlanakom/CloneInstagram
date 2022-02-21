class Datalayer{
    add( users ){
        return localStorage.getItem(tableName,JSON.stringify(result))
    }
   get(key,tableName){
       return this.getAll(tableName)[key]

   }
   getAll(tableName){
       return JSON.parse(localStorage.getItem(tableName)) || {};
   }
  delete(){
      return localStorage.removeItem(tableName, JSON.stringify(obj))
  }

}

export default Datalayer

