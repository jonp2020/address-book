const { customErrorHandler } = require("../errors/errors");

const {
  fetchContacts,
  insertContact,
  removeContactById,
  updateContact,
} = require("../models/contactsModel");

exports.getContacts = (req, res, next) => {
  fetchContacts()
    .then((contacts) => {
      const parsedContacts = JSON.parse(contacts);
      res.status(200).send(parsedContacts);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postContact = (req, res, next) => {
  const contact = req.body;
  insertContact(contact)
    .then(() => {
      res.status(201).send({ msg: "Contact added" });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeContact = (req, res, next) => {
  const contactId = req.params.id;
  removeContactById(contactId)
    .then((result) => {
      if (result.msg === "No contact found with this id to delete") {
        return Promise.reject({
          status: 404,
          msg: result.msg,
        });
      } else return res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchContact = (req, res, next) => {
  const contactId = req.params.id;
  const contact = req.body;
  updateContact(contactId, contact)
    .then((result) => {
      if (result.msg === "not found") {
        return Promise.reject({
          status: 404,
          msg: "Sorry - the contact you have asked to update doesn't exist.",
        });
      } else res.status(201).send({ msg: "Contact updated" });
    })
    .catch((err) => {
      next(err);
    });
};
