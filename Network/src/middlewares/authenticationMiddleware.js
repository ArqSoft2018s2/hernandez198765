import AuthenticationController from '../networking/controllers/AuthenticationController';

const authentication = async (req, res, next) => {
  const token = req.headers['x-authorization'];
  const response = await AuthenticationController.validate(token);
  if (response.status === 403) {
    return res.status(500).send('No permissions for do the operation');
  }
  return next();
};

export default authentication;
