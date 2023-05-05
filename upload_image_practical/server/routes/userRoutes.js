const { Router } = require("express");
const userController = require("../controllers/UserController");
const router = Router();
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `image-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "jpg" ||
    file.mimetype.split("/")[1] === "png" ||
    file.mimetype.split("/")[1] === "svg+xml" ||
    file.mimetype.split("/")[1] === "jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Not a image File!!"), false);
  }
};

const multerSizeFilter = (req, file, cb) => {
  if (
    req.files.length<=5
  ) {
    cb(null, true);
  } else {
    cb(new Error("You can upload maximum 5 files at a time!!"), false);
  }
};
const uploadProfile = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
const upload = multer({
  storage: multerStorage,
  fileFilter: multerSizeFilter,
});
router.get("/", userController.userList);
router.post("/", userController.insertUser);
router.get("/:id", userController.getUser);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/uploadFiles", upload.array("files"), userController.uploadFiles);
router.post(
  "/profile",
  uploadProfile.single("profile"),
  userController.profile
);

module.exports = router;
