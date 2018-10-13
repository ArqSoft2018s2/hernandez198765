const appRouter = app => {
  app.get('/test', (req, res) => {
    res.status(200).send('You communicate with PayYouNow Module');
  });
};

module.exports = appRouter;
