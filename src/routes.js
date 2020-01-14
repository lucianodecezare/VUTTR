const { Router } = require('express');

const { Tools } = require('./models/tool.model');

const routes = () => {
  const router = Router();

  // refactor
  router.get('/tools', async (req, res) => {
    try {
      const tools = await Tools.find().catch((error) => {
        throw new Error(error.message);
      });

      res.status(200).json(tools);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  return router;
};

module.exports = { routes };
