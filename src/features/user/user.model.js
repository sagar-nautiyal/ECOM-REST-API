export class UserModel{
    constructor(id,name, email,password,type){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type
    }

    static signUp(name, email, password, type){
        const newuser = new UserModel(
            users.length+1 ,name, email, password, type
        )
        users.push(newuser);
        console.log(users)
        return newuser
    }

    static singIn(email, password){
        const user = users.find(u=> u.email == email && u.password == password)
        console.log(user);
        return user
    }
    static getAll(){
        return users
    }
}


var users= [
    {
        id:1,
        name:'Seller User',
        email:'seller@ecom.com',
        password:'Password1',
        type:'seller',
    },
    {
        id:2,
        name:'Customer User',
        email:'customer@ecom.com',
        password:'Password1',
        type:'customer',
    },
]