import AuthenticationController from '../controllers/AuthenticationController';

const appRouter = app => {
  app.post('/Authenticate', async (req, res) => {
    try {
      const { user, password } = req.body;
      const response = await AuthenticationController.authenticate(
        user,
        password,
      );
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/Register', async (req, res) => {
    try {
      const { user, password } = req.body;
      await AuthenticationController.register(user, password);
      res.status(200).send('OK');
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.post('/Validate', async (req, res) => {
    try {
      res.status(200).send('OK');
    } catch (error) {
      res.status(500).send(error);
    }
  });
};

export default appRouter;
