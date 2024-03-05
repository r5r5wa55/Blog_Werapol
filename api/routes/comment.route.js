
import express from "express";
import { createComment, deleteComment, editComment, getPostComment, getcomments, likeComment } from "../controller/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";



const router = express.Router();


router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId', getPostComment);
router.put('/likeComment/:commentId',verifyToken ,likeComment)
router.put('/editComment/:commentId',verifyToken ,editComment)
router.delete('/deleteComment/:commentId',verifyToken ,deleteComment)
router.get(`/getcomments`,verifyToken,getcomments)
export default router;