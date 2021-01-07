const contactsRouter = require("express").Router();

const {
  getContacts,
  postContact,
  removeContact,
  patchContact,
} = require("../controllers/contactsController");

contactsRouter.route("/").get(getContacts).post(postContact);

contactsRouter.route("/:id").patch(patchContact).delete(removeContact);

module.exports = contactsRouter;
