//import models

const Post= require("../models/postModel");
const Like=require("../models/likeModel");


//like a post
exports.likePost= async (req,res)=>{
    try {
        const {post, user}=req.body;

        const like=new Like({
            post,user
        });

        const savedLike=await like.save();

        //update the post collection on basis of a single post liked:

        const updatedPost= await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true});

        res.json({
            post:updatedPost
        });
        
    } catch (err) {
        return res.status(500).json({
            err:"Error while liking post!"
        }); 
    }
}

exports.unlikePost=async (req,res)=>{
    try {
        const {post,like}=req.body;
        const deletedLike=await Like.findOneAndDelete({post:post,_id:like});

        //update post collection:
        const updatedPost=await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true});

        res.json({
            post:updatedPost
        });
    } catch (error) {
       return res.status(500).json({
            error:"Error while unliking post!"
        })
    }
}


