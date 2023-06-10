const express=require("express");
const router=express.Router();

//import controller
const { likePost, unlikePost}=require("../controllers/llikeController");
const{createComment}=require("../controllers/ccommentController");
const{createPost,getAllPosts}=require("../controllers/ppostController");


//create mapping
//router.get("/dummyroute",dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts); 
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);

//export
module.exports=router;
