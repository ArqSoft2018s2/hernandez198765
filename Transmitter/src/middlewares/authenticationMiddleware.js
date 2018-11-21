import AuthenticationController from '../networking/controllers/AuthenticationController';

const authentication = async (req, res, next) => {
  if (req.path !== 'Card') {
    const token = req.headers['x-authorization'];
    const response = await AuthenticationController.validate(token);
    if (response.status === 403) {
      console.log('LE ERRAMOS');
      return res.status(500).send('No permissions for do the operation');
    }
    if (response.status === 200) {
      return next();
    }
  }
  return next();
};

export default authentication;
