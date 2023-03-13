const commentService = require('../services/comment.service')


class CommentController{

    async addComment(req, res){
        const body = req.body

        const createdComment = await commentService.addComment(body)


        return res.status(201).json({
            success: true,
            message: 'Comment Created Successfully',
            data: createdComment
        })
    }

    async editComment(req, res){
        const updateData = req.body
        const commentId = req.params.id

        // Fetch the comment with the id
        const existingComment = await commentService.getComment({_id: commentId})
        if(!existingComment) return res.status(404).json({
            success: false,
            message: 'Comment not found'
        })

        // Fetching existing comment title
        if(updateData.comment){
            const existingComment  = await commentService.getComment({comment: updateData.comment})
            if(existingComment){
                if(existingComment._id.toString() !== commentId){
                    return res.status(403).json({
                        success: false,
                        message: 'Comment with that title already exist'
                    })
                }
            }
        }

        const updatedComment = await commentService.updateComment(commentId, updateData)

        return res.status(200).json({
            success: true,
            message: 'Comment Updated Successfully',
            data: updatedComment
        })
    }

    async fetchComments(req, res){
        const allComments = await  commentService.getComments();

        return res.status(200).json({
            success: true,
            message: 'Comment Fetched Successfully',
            data: allComments
        })

    }

    async fetchComment(req, res){
        const commentId = req.params.id
        const commentToFetch = await  commentService.getComment({_id: commentId});

        if(!commentToFetch) return res.status(404).json({
            success: false,
            message: 'Comment not found'
        })

        return res.status(200).json({
            success: true,
            message: 'Comment Fetched Successfully',
            data: commentToFetch
        })

    }


    async deleteComment(req, res){
        const commentId = req.params.id
        const commentToFetch = await  commentService.getComment({_id: commentId});

        if(!commentToFetch) return res.status(404).json({
            success: false,
            message: 'Comm not found'
        })

        await commentService.deleteComment(commentId)

        return res.status(200).json({
            success: true,
            message: 'Comment Deleted Successfully',
            data: commentToFetch
        })

    }
}

module.exports = new CommentController()