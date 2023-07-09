import express from "express";
import { auth } from "../middlewares/auth.js";
import passport from "passport";

export const viewsRouter = express.Router();

viewsRouter.get("/login", async (req, res) => {
    res.render("login-form");
});

viewsRouter.get("/register", async (req, res) => {
    res.render("register-form");
});

viewsRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), (req, res) => {
  if (!req.user) {
    return res.json({ error: 'something went wrong' });
  }
  req.session.user = {
   _id: req.user._id,
   email: req.user.email,
   firstName: req.user.firstName,
   lastName: req.user.lastName,
   isAdmin: req.user.isAdmin
  };

  return res.json({ msg: 'ok', payload: req.user });
});

viewsRouter.get('/failregister', async (req, res) => {
  return res.json({ error: 'fail to register' });
});

viewsRouter.get('/login', (req, res) => {
  return res.render('login', {});
});

viewsRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), async (req, res) => {
  if (!req.user) {
    return res.json({ error: 'invalid credentials' });
  }
  req.session.user = {
     _id: req.user._id,
     email: req.user.email,
     firstName: req.user.firstName,
     lastName: req.user.lastName,
     isAdmin: req.user.isAdmin
     };

  return res.json({ msg: 'ok', payload: req.user });
});

viewsRouter.get('/faillogin', async (req, res) => {
  return res.json({ error: 'fail to login' });
});

viewsRouter.get("/profile", auth, async (req, res) => {
    res.render("profile");
});


viewsRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.render("error-page");
      }
      return res.redirect("/login");
    })
   });


viewsRouter.get('/', async (req, res) => {
    res.render('home');
  });