
const userModel = require('../models/user.model')

class UserService{

    // Add book
    async addUser(data){
        return await userModel.create(data)
    }

    // Update a book 
    async updateUser(id, updateData){
        return await userModel.findByIdAndUpdate(id, updateData, {
            new: true
        })
    }

    // Delete a book 
    async deleteUser(id){
        return await userModel.findByIdAndUpdate(id, {deleted: true})
    }

    // Get a single book
    async getUser(filter){
        return await userModel.findOne(filter)
    }

    // Get all books 
    async getUsers(filter){
        return await userModel.find(filter)
    }
}

module.exports = new UserService()