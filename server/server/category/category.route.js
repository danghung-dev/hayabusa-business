import express from "express"
import categoryCtrl from "./category.controller"

const importdata = require("./importdata")

const router = express.Router() // eslint-disable-line new-cap

router.route("/").get(categoryCtrl.list)
router.route("/").post(categoryCtrl.create)
router
  .route("/:categoryId")
  /** GET /api/users/:userId - Get user */
  .get(categoryCtrl.get)

/** Load user when API with userId route parameter is hit */
router.param("categoryId", categoryCtrl.load)

export default router
