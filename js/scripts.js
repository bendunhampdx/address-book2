// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {}
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.tryingAddresses = {};
  this.tryingEmailAddresses = {};
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

Contact.prototype.addAddress = function(addressType,address) {
  this.tryingAddresses[addressType] = address;
};
Contact.prototype.addEmailAddress = function(emailAddressType,emailAddress) {
  this.tryingEmailAddresses[emailAddressType] = emailAddress;
};

// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}


function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  
  const addressKeys = Object.keys(contact.tryingAddresses);
  let addressString = "";
  addressKeys.forEach(function(key) {
    addressString = addressString.concat(key + ": " + contact.tryingAddresses[key] + "\n");
  });
  $(".address").html(addressString);

  const emailAddressKeys = Object.keys(contact.tryingEmailAddresses);
  let emailAddressString = "";
  emailAddressKeys.forEach(function(key) {
    emailAddressString = emailAddressString.concat(key + ": " + contact.tryingEmailAddresses[key] + "\n");
  });
  $(".email-address").html(emailAddressString);
  
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
 
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedAddressType = $("#new-address-type").val();
    const inputtedAddress = $("input#new-address").val();
    const inputtedEmailAddressType = $("#new-email-address-type").val();
    const inputtedEmailAddress = $("input#new-email-address").val();


  
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-address").val("");
    $("input#new-email-address").val("");
   
    
    
    

    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    newContact.addAddress(inputtedAddressType,inputtedAddress);
    newContact.addEmailAddress(inputtedEmailAddressType,inputtedEmailAddress);
    displayContactDetails(addressBook);
  });
});
