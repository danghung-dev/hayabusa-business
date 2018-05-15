import express from "express"
import multer from "multer"
import CompanyCtrl from "./company.controller"

const upload = multer({ dest: "uploads/" })
const router = express.Router() // eslint-disable-line new-cap

router
  .route("/")
  /** GET /api/users - Get list of users */
  .get(CompanyCtrl.list)
router.route("/").post(upload.any(), CompanyCtrl.create)
// router.route('/test')
//   .get(productCtrl.makeOrderChangeInventory)

router.route("/category/:categoryId").get(CompanyCtrl.category)

router.route("/search").post(CompanyCtrl.search)

router
  .route("/:productId")
  /** GET /api/users/:userId - Get user */
  .get(CompanyCtrl.get)

/** Load user when API with userId route parameter is hit */
router.param("productId", CompanyCtrl.load)

export default router
