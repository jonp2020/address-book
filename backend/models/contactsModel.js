const uuid = require("uuid");
const fs = require("fs");

exports.fetchContacts = () => {
  return fs.promises
    .readFile("./data/contacts.json", "utf8")
    .then((contactsData) => {
      return contactsData;
    });
};

exports.insertContact = (contact) => {
  const newContact = {
    id: uuid.v4(),
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone,
  };

  return fs.promises
    .readFile("./data/contacts.json", "utf8")
    .then((contacts) => {
      const parsedContacts = JSON.parse(contacts);
      parsedContacts.push(newContact);
      const jsonContacts = JSON.stringify(parsedContacts);

      fs.writeFile("./data/contacts.json", jsonContacts, (err) => {
        if (err) throw err;
        return { msg: "New contact added" };
      });
    });
};

exports.removeContactById = (contactId) => {
  return fs.promises
    .readFile("./data/contacts.json", "utf8")
    .then((contacts) => {
      const parsedContacts = JSON.parse(contacts);

      if (
        parsedContacts.findIndex((contact) => {
          return contact.id == contactId;
        }) !== -1
      ) {
        const updatedContacts = parsedContacts.filter((contact) => {
          return contact.id != contactId;
        });
        const jsonContacts = JSON.stringify(updatedContacts);
        return jsonContacts;
      } else {
        return "No contact found with this id to delete";
      }
    })
    .then((jsonContacts) => {
      if (jsonContacts === "No contact found with this id to delete") {
        return { msg: "No contact found with this id to delete" };
      } else {
        fs.writeFile("./data/contacts.json", jsonContacts, (err) => {
          if (err) throw err;
        });
        return { msg: "Contact removed" };
      }
    });
};

exports.updateContact = (contactId, contact) => {
  return fs.promises
    .readFile("./data/contacts.json", "utf8")
    .then((contacts) => {
      const parsedContacts = JSON.parse(contacts);

      if (
        parsedContacts.findIndex((contact) => {
          return contact.id == contactId;
        }) !== -1
      ) {
        const updatedContacts = parsedContacts.filter((contact) => {
          return contact.id != contactId;
        });
        updatedContacts.push(contact);
        const jsonContacts = JSON.stringify(updatedContacts);
        return jsonContacts;
      } else return "not found";
    })
    .then((jsonContacts) => {
      if (jsonContacts === "not found") {
        return { msg: "not found" };
      } else {
        fs.writeFile("./data/contacts.json", jsonContacts, (err) => {
          if (err) throw err;
        });
        return { msg: "Contact updated" };
      }
    });
};
