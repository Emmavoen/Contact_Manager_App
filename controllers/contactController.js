const mongoose = require("mongoose");
const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler"); // installed the async handler package to handle async errors

//@desc Get all contacts
//@route GET /api/contacts
//@access Public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.getContact();
  if (!contacts) {
    res.status(404);
    throw new Error("No contacts found");
  }
  res.status(200).json(contacts);
});

//@desc Create a contact
//@route POST /api/contacts:id
//@access Public

const createcontact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const newContact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(newContact);
});

//@desc Get  a contact
//@route Get /api/contacts:id
//@access Public
const getContact = asyncHandler(async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    console.log("Invalid contact id");
    res.status(400);
    throw new Error("Invalid contact id");
  }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    console.log("Contact not found");
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

//@desc Update a contact
//@route PUT /api/contacts:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    console.log("Invalid contact id");
    res.status(400);
    throw new Error("Invalid contact id");
  }

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    console.log("Contact not found");
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete a contact
//@route DELETE /api/contacts:id

//@access Public
const deleteContact = asyncHandler(async (req, res) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    console.log("Invalid contact id");
    res.status(400);
    throw new Error("Invalid contact id");
  }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    console.log("Contact not found");
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: `Contact with id: ${req.params.id} deleted successfully`,
  });
});
module.exports = {
  getContacts,
  createcontact,
  getContact,
  updateContact,
  deleteContact,
};
