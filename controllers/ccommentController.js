const Post=require("../models/postModel");
const Comment=require("../models/commentModel");

//business logic
exports.createComment=async(req,res)=>{
    try {
        const {post,user,body}= req.body;
        //create a comment obj
        const comment = new Comment({
            post,user,body
        });

        //save the new comment into database
        const savedComment=await comment.save();

        //find the post by id , add the new comment to its comment array
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments: savedComment._id}},{new:true})
        .populate("comments").exec();

        res.json({
            post:updatedPost
        });

    } catch (err) {
        return res.status(500).json({
            error:"Error while creating comment"
        });
    }
}