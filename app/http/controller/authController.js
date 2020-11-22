exports.getLoginForm = (req, res) => {
    res.status(200).render('auth/login', {
      title: 'Log into your account'
    });
  };

  
exports.getRegisterForm = (req, res)=>{
    res.status(200).render('auth/register',{
        title:'Register Now'
    })
}