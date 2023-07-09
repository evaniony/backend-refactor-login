import express from "express";
import handlebars from 'express-handlebars';
import path from "path";
import { connectMongo } from "./utils/connections.js";
import { __dirname } from "./dirname.js";
import { routerUsers } from "./routes/users.router.js";
import { loginRouter } from "./routes/login.router.js";
import { viewsRouter } from "./routes/views.router.js"
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";
import { sessionsRouter } from "./routes/sessions.router.js";
import { iniPassport } from "./config/passport.config.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(session({ secret: 'un-re-secreto', resave: true, saveUninitialized: true }));
app.use(
    session({
      store: MongoStore.create({ mongoUrl: 'mongodb+srv://evaniony:rPapt8OncnP10D43@ebi-cluster.lazfhch.mongodb.net/?retryWrites=true&w=majority', ttl: 86400 * 7 }),
      secret: 'un-re-secreto',
      resave: true,
      saveUninitialized: true,
    })
  );

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

  
app.listen(8080, ()=>{
    console.log("connect server express!");
})

//liga de la base de datos;
connectMongo();

app.use("/users", routerUsers);

app.use("/api/sessions/", loginRouter);
app.use('/api/sessions/', sessionsRouter);
app.use("/", viewsRouter);

