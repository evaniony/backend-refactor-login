import { userModel } from "../DAO/models/users.model.js";

class UserService {
//momentaneamente agregamos la validacion de este lado;
    validateUser(firstName, lastName, email){
        if (!firstName || !lastName || !email) {
            console.log(
              "validation error: please complete firstName, lastname and email."
            );
            throw "VALIDATION ERROR";
    }
    }

    validatePutUser(id, firstName, lastName, email){
        if (!firstName || !lastName || !email || !id) {
            console.log(
              "validation error: please complete firstName, lastname and email."
            );
            throw "VALIDATION ERROR";

    }
    }

    validateId(id){
        if ((!id)) {
            console.log("validation error: please complete firstName, lastname and email.");
            throw "VALIDATION ERROR";

        }
    }



    //usaremos los datos de db como metodos de una clase;
    async getAllUsers(){
        const users = await userModel.find({});
        return users;
    }

    async createUser( firstName, lastName, email ){
        //validacion si falta algun dato; 
        this.validateUser(firstName, lastName, email);
        const userCreate = await userModel.create({ firstName, lastName, email } );
        return userCreate;
    }

    async updateUser(id, firstName, lastName, email){
        this.validatePutUser(id, firstName, lastName, email);
        const userUptaded = await userModel.updateOne({ _id: id }, { firstName, lastName, email });
        return userUptaded;
    }

    async deleteUser(id){
        this.validateId(id);
        const deleted = await userModel.deleteOne({ _id: id });
        return deleted;
    }
    
};

export const userService = new UserService();