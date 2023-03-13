const postService = require('../services/post.service')


class PostController{

    async addPost(req, res){
        const body = req.body

        // Check if a post of that title already exist
        // If not create the post
        const existingPost = await postService.getPost({title: body.title.toLowerCase()})
        if(existingPost) return res.status(403).json({
            success: false,
            message: 'Post already exist'
        })


        const createdPost = await postService.addPost(body)


        return res.status(201).json({
            success: true,
            message: 'Post Created Successfully',
            data: createdPost
        })
    }

    async editPost(req, res){
        const updateData = req.body
        const postId = req.params.id

        // Fetch the post with the id
        const existingPost = await postService.getPost({_id: postId})
        if(!existingPost) return res.status(404).json({
            success: false,
            message: 'Post not found'
        })

        // Fetching existing post title
        if(updateData.title){
            const existingPostTitle  = await postService.getPost({title: updateData.title.toLowerCase()})
            if(existingPostTitle){
                if(existingPostTitle._id.toString() !== postId){
                    return res.status(403).json({
                        success: false,
                        message: 'Post with that title already exist'
                    })
                }
            }
        }

        const updatedPost = await postService.updatePost(postId, updateData)

        return res.status(200).json({
            success: true,
            message: 'Post Updated Successfully',
            data: updatedPost
        })
    }

    async fetchPosts(req, res){
        console.log('I am now done with authentication')
        const allPosts = await  postService.getPosts();

        return res.status(200).json({
            success: true,
            message: 'Posts Fetched Successfully',
            data: allPosts
        })

    }

    async fetchPost(req, res){
        const postId = req.params.id
        const postToFetch = await  postService.getPost({_id: postId});

        if(!postToFetch) return res.status(404).json({
            success: false,
            message: 'Post not found'
        })

        return res.status(200).json({
            success: true,
            message: 'Post Fetched Successfully',
            data: postToFetch
        })

    }


    async deletePost(req, res){
        const postId = req.params.id
        const postToFetch = await  postService.getPost({_id: postId});

        if(!postToFetch) return res.status(404).json({
            success: false,
            message: 'Post not found'
        })

        await postService.deletePost(postId)

        return res.status(200).json({
            success: true,
            message: 'Post Deleted Successfully',
            data: postToFetch
        })

    }
}

module.exports = new PostController()