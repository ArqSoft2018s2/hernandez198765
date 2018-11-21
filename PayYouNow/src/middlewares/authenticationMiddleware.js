import AuthenticationController from '../networking/controllers/AuthenticationController';

const authentication = async (req, res, next) => {
  if (
    (req.path !== '/Gateway' && req.method === 'Post') ||
    (req.path !== '/Network' && req.method === 'Post') ||
    (req.path !== '/Transmitter' && req.method === 'Post')
  ) {
    const token = req.headers['x-authorization'];
    const response = await AuthenticationController.validate(token);
    if (response.status === 403) {
      return res.status(500).send('No permissions for do the operation');
    }
    return next();
  }
  return next();
};

export default authentication;
