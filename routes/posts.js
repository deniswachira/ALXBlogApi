const router = require('express').Router();
const { verifyToken } = require('../utils/verifyToken');
const { uploadPost, random, getPost } = require('../controllers/post.js');
//GET Random video [done]
router.get("/random", random);

//Upload video [done]
router.post("/uploadPost", verifyToken, uploadPost);

//Update video details [done]
// router.put("/:id",verifyToken, updateVideo);

//Delete video [done]
// router.delete("/:id",verifyToken, deleteVideo);

//Get  video by id [done]
router.get("/find/:id", getPost);

//Get  video by trends [done]
// router.get("/trends", trends);

//Add  video view [done]
// router.put("/view/:id", addView);

//Get subcribed videos by id [done]
// router.get("/sub",verifyToken,  sub);

//Get  video by tags [done]
// router.get("/tags", getByTag);

//Get  video by query [done]
// router.get("/search",search);

module.exports = router;