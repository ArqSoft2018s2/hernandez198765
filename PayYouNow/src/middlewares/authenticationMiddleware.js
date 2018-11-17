import AuthenticationController from '../networking/controllers/AuthenticationController';

const authentication = async (req, res, next) => {
  console.log('Probando middleware');
  const token = req.headers['X-Authorization'];
  console.log(token);
  const response = AuthenticationController.validate(token);
  console.log(response);
  if (response.status === 403) {
    res.status(500).send('No permissions for do the operation');
  } else if (response.status === 200) {
    next();
  }
};

export default authentication;
