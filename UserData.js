class UserData extends Data {
    constructor(){
        super();
        this.tableName = 'users';
    }
    get(key){
        return super.get(key, this.tableName);
    }
}