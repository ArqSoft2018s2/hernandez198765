const authentication = (req, res, next) => {
  console.log('Probando middleware');
  console.log(req.path);
  next();
};

export default authentication;
