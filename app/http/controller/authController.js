const express = require('express');
const User = require('../../models/usersModule');
const bcrypt = require('bcrypt')
const passport  = require('passport')



exports.getLoginForm = (req, res) => {
    res.status(200).render('auth/login', {
      title: 'Log into your account'
    });
  };

exports.login = (req, res,next) => {
  const {email, password } = req.body;

  if(!email || !password){
    req.flash('error', 'All Fields are require')
    return res.redirect('/login')
  }

  passport.authenticate('local',(err,user, info )=>{
    if(err){
      req.flash('error',info.message)
      return next(err)
    }

    if(!user ){
      req.flash('error',info.message)
      return res.redirect('/login')
    }

    req.login(user,(err)=>{
      if(err){
        req.flash('error',info.message)
        return next(err)
      }

      return res.redirect('/')
    })
  })(req, res,next)
}

  
exports.getRegisterForm = (req, res)=>{
    res.status(200).render('auth/register',{
        title:'Register Now'
    })
}


exports.postRegister = async(req, res) => {
  const {name, email, password } = req.body;

  if(!name || !email || !password){
    req.flash('error', 'All Fields are require')
    req.flash('name',name)
    req.flash('email',email)
    return res.redirect('/register')
  }

  //check if email exists

  User.exists({email:email},(err,result)=>{
    if(result){
      req.flash('error', 'Email already exists')
      req.flash('name',name)
      req.flash('email',email)
      return res.redirect('/register')
    }
  })


  // hash password
  const hashPassword = await bcrypt.hash(password,12)

  const user = new User({
    name,
    email,
    password:hashPassword
  })

  user.save().then((user)=> {
    return res.redirect('/');
  }).catch(err => {
    req.flash('error', 'Something went wrong')
    console.log(err)
    return res.redirect('/register');
  })

}


exports.logout = (req, res) => {
  req.logout(); 
  return res.redirect('/login')
}