import Router from "express";
import getGalleryCards from "../controllers/cardsController";
const router = Router();

router.route("/").post(getGalleryCards);

export default router;
