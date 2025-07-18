import { Router } from 'express';
import { signup as sellerSignup,login as sellerLogin,logout as sellerLogout,checkAuth as sellerCheckAuth, editProfile} from '../controllers/sellerAuth.controller.js';
import fileUpload from '../middleware/file-upload.js';
import verifySellerAuthentication from '../middleware/sellerAuth.middleware.js'

const router= Router();

router.route("/signup").post(fileUpload.single("profilePic"), sellerSignup)
router.route("/login").post(sellerLogin)
router.route("/logout").post(sellerLogout)
router.route("/sellerInfo").get(verifySellerAuthentication,sellerCheckAuth)
router.post('/edit-profile', verifySellerAuthentication, fileUpload.single("profilePic"), editProfile);
export default router;