class AuthenticationController {
  authenticate = (user, password) => {
    console.log(user, password);
  };

  register = async (user, password) => {
    await console.log(user, password);
  };

  validate = token => {
    console.log(token);
  };
}

export default new AuthenticationController();
