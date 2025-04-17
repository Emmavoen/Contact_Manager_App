// const express = require("express");
// const router = express.Router();

// router.route("/").get((req, res) => {
//   console.log("Recieved Get request");
//   res.status(200).json({ message: "Get all contacts" });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getContacts,
  createcontact,
  deleteContact,
  updateContact,
  getContact,
} = require("../controllers/contactController.js");
router.route("/").get(getContacts).post(createcontact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = { router };
