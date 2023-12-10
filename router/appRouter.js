const express = require("express");
const router = express.Router();
const AppController = require("../controller/appController");

router.post("/", AppController.createApp);
router.post("/upload", AppController.uploadApp);
router.get("/", AppController.getAllApps);
router.get("/:id", AppController.getAppById);
router.get("/developer/:id", AppController.getDeveloperApps);
router.delete("/:id", AppController.deleteApp);
router.put("/:id", AppController.updateApp);

module.exports = router;
