const Post= require("../models/postModel");

exports.createPost=async (req,res)=>{
        try {
            const {title,body}=req.body;
            const post=new Post({
                title, body
            });
            const savedPost=await post.save();

            res.json({
                post:savedPost
            });
        } catch (err) {
            return res.status(400).json({
                err:"Error while creating post!"
            });
        }
};

exports.getAllPosts=async (req,res)=>{
    try {
        //needs more testting after completing likes controler
        const posts=await Post.find().populate("comments").populate("likes").exec();
        res.json({
            posts
        });
    } catch (error) {
        return res.status(500).json(
            {
                error:"Error while fetching posts!"
            }
        )
    }
}