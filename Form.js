class form {
        constructor(email, password){
            this.email = email;
            this.password = password;
            this.userData ={
                [this.email]:{
                    password: this.password,
                    isLogin: this.isLogin
    
                }}
              this.isUser = this.chekUser();
    
        }
        chekUser(){
            let userData = user.getUsersfromLocalStorage();
            let userExist = Object.keys(userData).includes(this.email)
            return userExist;
        }
        IsEmptyInputData(inputValue) {
            return inputValue.length === 0;
        }
    }