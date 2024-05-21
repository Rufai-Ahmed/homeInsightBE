const { Router } = require("express");
const {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
  updateUserToLandlordById,
} = require("../controllers/userController");

const router = Router();

router.route("/create-user").post(createUser);

router.route("/get-user-by-id/:ID").get(getUserById);
router.route("/get-users").get(getUsers);

router.route("/update-user-by-id/:ID").patch(updateUserById);
router
  .route("/update-user-to-landlord-by-id/:ID")
  .patch(updateUserToLandlordById);

router.route("/delete-user-by-id/:ID").delete(deleteUserById);

module.exports = router;
