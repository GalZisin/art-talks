const fetch = require("node-fetch");
import galleryData from "../data/galleryData";

export async function getGalleryCards(req, res) {
  try {
    const data = JSON.stringify(galleryData);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json();
  }
}

export default getGalleryCards;
