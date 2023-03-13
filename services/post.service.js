
const postModel = require('../models/post.model')

class PostService{

    // Add book
    async addPost(data){
        return await postModel.create(data)
    }

    // Update a book 
    async updatePost(id, updateData){
        return await postModel.findByIdAndUpdate(id, updateData, {
            new: true
        })
    }

    // Delete a book 
    async deletePost(id){
        return await postModel.findByIdAndDelete(id)
    }

    // Get a single book
    async getPost(filter){
        return await postModel.findOne(filter)
    }

    // Get all books 
    async getPosts(filter){
        return await postModel.find(filter)
    }
}

module.exports = new PostService()