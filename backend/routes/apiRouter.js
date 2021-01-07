const apiRouter = require("express").Router();
const contactsRouter = require("./contactsRouter");

apiRouter.use("/contacts", contactsRouter);

module.exports = apiRouter;
