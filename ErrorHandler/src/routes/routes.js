import LoggerController from '../controllers/LoggerController';

const appRouter = app => {
  app.post('/Logger', (req, res) => {
    const { type, data } = req.body;
    LoggerController.loggerHandler(type, data);
    res.status(200).send('OK');
  });
};

export default appRouter;
