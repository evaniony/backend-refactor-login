//capa --- base de datos;
//users;

//@ts-check
import { Schema, model } from "mongoose";

export const userModel = model(
  "users" /* nombre de la collection donde se va a hacer el crud */,
  /* OBLIGA A CREATE-UPDATE A SEGUIR ESTE MOLDE */
  new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true, unique: true},
    age: { type: Number },
    password: { type: String, required: true},
    isadmin: { type: Boolean, required: true, default: false },
  })
);

//modelo de mongoose;
//poder del crud; sin uso del db;