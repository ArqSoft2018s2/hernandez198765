import AuthenticationController from '../controllers/AuthenticationController';

const appRouter = app => {
  app.post('/Authenticate', async (req, res) => {
    try {
      const { username, password } = req.body;
      const response = await AuthenticationController.authenticate(
        username,
        password,
      );
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/Register', async (req, res) => {
    try {
      const { username, password } = req.body;
      const asas = 1322131;
      await AuthenticationController.register(username, password);
      res.status(200).send('Register success');
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.get('/Validate', async (req, res) => {
    try {
      const token = req.headers['x-access-token'];
      await AuthenticationController.validate(token);
      res.status(200).send('Validation successful');
    } catch (error) {
      res.status(500).send(error);
    }
  });
};

export default appRouter;
