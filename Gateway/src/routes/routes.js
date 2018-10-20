const appRouter = app => {
  app.get('/test', (req, res) => {
    res.status(200).send('Communicate with gateway successful');
  });
};

export default appRouter;
