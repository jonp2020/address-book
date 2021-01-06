const addContactNavButton = document.querySelector(".add-contact-nav-btn");
const addContactsForm = document.querySelector(".add-contacts-form-container");
const formCloseBtn = document.querySelector(".form-btn-close");

const submitAddContactBtn = document.querySelector("#submit-add-contact");
const addFirstName = document.querySelector("#first-name-form");
const addLastName = document.querySelector("#last-name-form");
const addPhone = document.querySelector("#phone-form");
const addEmail = document.querySelector("#email-form");

addContactNavButton.addEventListener("click", () => {
  addContactsForm.classList.toggle("add-contacts-form-hidden");
});

formCloseBtn.addEventListener("click", () => {
  addContactsForm.classList.toggle("add-contacts-form-hidden");
});

// Create a contact class
class Contact {
  constructor(firstName, lastName, phone, email) {
    this.first_name = firstName;
    this.last_name = lastName;
    this.phone = phone;
    this.email = email;
  }
}

// Create a user interface class

class UserInterface {
  // ADD TO THE DOM AND DISPLAY BOOKS USING DATA PASSED IN FROM STORAGE
  static displayContacts() {
    const contacts = ContactsStorage.getContacts();
    contacts.forEach((contact) => UserInterface.addContactsToDisplay(contact));
  }

  static addContactsToDisplay(contact) {
    const { first_name, last_name, email, phone } = contact;

    const contactsRow = document.querySelector("#contacts-row");

    const contactCardContainer = document.createElement("div");
    contactCardContainer.classList.add(
      "col",
      "m-2",
      "mt-4",
      "border",
      "pt-2",
      "d-flex",
      "flex-column"
    );

    contactCardContainer.innerHTML = `
			<div>
			<p><strong>${first_name}</strong> <strong>${last_name}</strong></p>
			</div>
			<div class="email-phone d-flex">
    	<p class="pe-3"><i class="fas fa-phone-square-alt"></i>: ${phone}</p>
			<p><i class="fas fa-envelope-square"></i>: ${email}</p>
			</div>
    	<div class="contact-btns">
    		<button id="edit-contact-btn" type="submit" class="btn btn-primary btn-sm me-2">Edit</button>
    		<button id="delete-contact-btn" type="submit" class="btn btn-danger btn-sm">Delete</button>
    	</div>
		`;

    contactsRow.appendChild(contactCardContainer);
  }

  // EDIT CONTACT INFORMATION
  static editContact(contact) {
    addContactsForm.classList.toggle("add-contacts-form-hidden");
    const firstName = contact.children[0].children[0].children[0].innerText;
    const lastName = contact.children[0].children[0].children[1].innerText;
    const phone = contact.children[1].children[0].lastChild.textContent.slice(
      2
    );
    const email = contact.children[1].children[1].lastChild.textContent.slice(
      2
    );

    addFirstName.value = firstName;
    addLastName.value = lastName;
    addPhone.value = phone;
    addEmail.value = email;

    UserInterface.deleteContactFromDom(contact);
  }

  // REMOVE CONTACT FROM DOM
  static deleteContactFromDom(contact) {
    contact.remove();
    ContactsStorage.deleteContact(contact);
  }

  // HANDLE SEARCH FOR CONTACTS
  static searchContacts(searchStr) {
    const searchStrLowerCase = searchStr.toLowerCase();
    const contacts = ContactsStorage.getContacts();

    const matches = [];
    contacts.forEach((contact) => {
      const firstNameLower = contact.first_name.toLowerCase();
      const lastNameLower = contact.last_name.toLowerCase();
      const emailLower = contact.email.toLowerCase();
      if (
        firstNameLower.startsWith(searchStrLowerCase) ||
        lastNameLower.startsWith(searchStrLowerCase) ||
        contact.email.startsWith(searchStrLowerCase)
      ) {
        matches.push(contact);
      }
    });
    const contactsRow = document.querySelector("#contacts-row");
    contactsRow.innerHTML = "";
    if (matches.length === 0) UserInterface.errorMessage("No contacts found");
    matches.forEach((match) => UserInterface.addContactsToDisplay(match));
  }

  static sortContacts(sortBy) {
    const contactsToSort = ContactsStorage.getContacts();

    if (sortBy === "first-name") {
      contactsToSort.sort((a, b) => {
        const nameA = a.first_name.toLowerCase();
        const nameB = b.first_name.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else {
      contactsToSort.sort((a, b) => {
        const nameA = a.last_name.toLowerCase();
        const nameB = b.last_name.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    }

    const contactsRow = document.querySelector("#contacts-row");
    contactsRow.innerHTML = "";
    if (contactsToSort.length === 0)
      UserInterface.errorMessage("No contacts to complete this task");

    contactsToSort.forEach((contact) => {
      UserInterface.addContactsToDisplay(contact);
    });
  }

  // Display error messages
  static errorMessage(msg) {
    const contactsRow = document.querySelector("#contacts-row");
    const errorMsg = document.createElement("div");
    errorMsg.classList.add(
      "col",
      "m-2",
      "mt-4",
      "border",
      "pt-2",
      "d-flex",
      "flex-column"
    );
    errorMsg.innerHTML = `
		<div>
			<h2 class="text-info text-center">${msg}
		</div>
		`;

    contactsRow.appendChild(errorMsg);
  }

  // DISPLAY HELPER / ADDITIONAL MESSAGES
  static submitNewContactMessage(msg) {
    const addContactsForm = document.querySelector(
      ".add-contacts-form-container"
    );
    const contactsForm = document.querySelector("#contacts-form");
    const message = document.createElement("h3");

    message.classList.add("ms-2", "d-inline");
    message.innerHTML = `
				<span class="text-info text-center">${msg}</span>
			`;

    contactsForm.appendChild(message);

    if (msg === "Success") {
      setTimeout(() => {
        addContactsForm.classList.toggle("add-contacts-form-hidden");
      }, 1500);
    }
    setTimeout(() => {
      contactsForm.removeChild(message);
    }, 4000);
    // }
  }
}

// Create a storage class to connect to and retrieve contacts in storage
class ContactsStorage {
  // GET CONTACTS AND SEND TO USERINTERFACE CLASS WHEN CALLED
  static getContacts() {
    return [
      {
        first_name: "David",
        last_name: "Platt",
        phone: "01913478234",
        email: "david.platt@corrie.co.uk",
      },
      {
        first_name: "Jason",
        last_name: "Grimshaw",
        phone: "01913478123",
        email: "jason.grimshaw@corrie.co.uk",
      },
      {
        first_name: "Ken",
        last_name: "Barlow",
        phone: "019134784929",
        email: "ken.barlow@corrie.co.uk",
      },
      {
        first_name: "Rita",
        last_name: "Sullivan",
        phone: "01913478555",
        email: "rita.sullivan@corrie.co.uk",
      },
      {
        first_name: "Steve",
        last_name: "McDonald",
        phone: "01913478555",
        email: "steve.mcdonald@corrie.co.uk",
      },
    ];
  }

  // ADD CONTACTS TO STORAGE
  static addContactToStorage(contact) {
    const contacts = ContactsStorage.getContacts();
    contacts.push(contact);
    console.log("add contact - array of contacts", contacts);
    // make request to push to db
  }

  // DELETE CONTACTS FROM STORAGE
  static deleteContact(contact) {
    console.log("here in ContactsStorage - delete contact");
    // Contact db and to delete contact
  }
}

// EVENT HANDLERS

// Listen for page load and then display books
document.addEventListener("DOMContentLoaded", UserInterface.displayContacts);

// Listen for Add Contact form submission
submitAddContactBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const first_name = addFirstName.value;
  const last_name = addLastName.value;
  const phone = addPhone.value;
  const email = addEmail.value;

  if (
    first_name !== "" &&
    last_name !== "" &&
    phone !== "" &&
    email.includes("@")
  ) {
    const newContact = new Contact(first_name, last_name, phone, email);

    UserInterface.addContactsToDisplay(newContact);
    ContactsStorage.addContactToStorage(newContact);
    UserInterface.submitNewContactMessage("Success");
    addFirstName.value = "";
    addLastName.value = "";
    addPhone.value = "";
    addEmail.value = "";
  } else {
    UserInterface.submitNewContactMessage(
      "Please check each field is completed with the required information"
    );
  }
});

// Listen for Show All Contacts button click
const showAllContactsNavBtn = document.querySelector(
  ".show-all-contacts-nav-btn"
);
showAllContactsNavBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const contactsRow = document.querySelector("#contacts-row");
  contactsRow.innerHTML = "";
  UserInterface.displayContacts();
});

// Listen for search contacts bar submission
const contactSearchBtn = document.querySelector("#contact-search-btn");
const searchContactForm = document.querySelector("#search-contact-form");
contactSearchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchItem = searchContactForm.value;

  UserInterface.searchContacts(searchItem);

  searchContactForm.value = "";
});

// Listen for Sort by first or last name click events
const sortbyFirstName = document.querySelector("#sortby-first-name");
const sortbyLastName = document.querySelector("#sortby-last-name");

sortbyFirstName.addEventListener("click", (e) => {
  e.preventDefault();

  UserInterface.sortContacts(e.target.value);
});

sortbyLastName.addEventListener("click", (e) => {
  e.preventDefault();
  UserInterface.sortContacts(e.target.value);
});

// Listen for edit and delete contact button events
const contactsRow = document.querySelector("#contacts-row");

contactsRow.addEventListener("click", (e) => {
  if (e.target.id === "delete-contact-btn") {
    const confirmation = confirm(
      "Confirm if you want to remove this contact from your address book."
    );
    console.log(confirmation);
    if (confirmation) {
      const contactToDelete = e.target.parentElement.parentElement;
      UserInterface.deleteContactFromDom(contactToDelete);
    }
  }

  if (e.target.id === "edit-contact-btn") {
    const contactToEdit = e.target.parentElement.parentElement;
    console.log(contactToEdit);
    UserInterface.editContact(contactToEdit);
  }
});
