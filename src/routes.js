const { Router } = require('express');

const { Tools } = require('./models/tool.model');

const getTools = async (req, res) => {
  const tag = req.query;

  try {
    const where = Object.keys(tag).includes('tag') ? { tags: tag.tag } : {};

    const tools = await Tools.find(where).catch((error) => {
      throw new Error(error.message);
    });

    if (tools.length > 0) {
      return res.status(200).json(tools);
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createTool = async (req, res) => {
  try {
    const newTool = await Tools.create(req.body).catch((error) => {
      throw new Error(error.message);
    });

    return res.status(201).json(newTool);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteTool = async (req, res) => {
  const { id } = req.params;

  try {
    await Tools.findByIdAndDelete(id).catch((error) => {
      throw new Error(error.message);
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const routes = () => {
  const router = Router();

  router.post('/tools', createTool);
  router.get('/tools', getTools);
  router.delete('/tools/:id', deleteTool);

  return router;
};

module.exports = { routes };
