export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  let errors = [
    {
      param: 'auth'
    }
  ];
  res.render('login', {
    errors: errors
  });
};
