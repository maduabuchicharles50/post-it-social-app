
const postModel = require('../models/post.model')

class PostService{

    // Add post
    async addPost(data){
        return await postModel.create(data)
    }

    // Update a post 
    async updatePost(id, updateData){
        return await postModel.findByIdAndUpdate(id, updateData, {
            new: true
        })
    }

    // Delete a post
    async deletePost(id){
        return await postModel.findByIdAndDelete(id)
    }

    // Get a single post
    async getPost(filter){
        return await postModel.findOne(filter)
    }

    // Get all posts 
    async getPosts(filter){
        return await postModel.find(filter)
    }
}

module.exports = new PostService()