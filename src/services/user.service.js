
const userModel = require('../models/user.model')

class UserService{

    // Add user
    async addUser(data){
        return await userModel.create(data)
    }

    // Update a user
    async updateUser(id, updateData){
        return await userModel.findByIdAndUpdate(id, updateData, {
            new: true
        })
    }

    // Delete a user 
    async deleteUser(id){
        return await userModel.findByIdAndUpdate(id, {deleted: true})
    }

    // Get a single user
    async getUser(filter){
        return await userModel.findOne(filter)
    }

    // Get all users
    async getUsers(filter){
        return await userModel.find(filter)
    }
}

module.exports = new UserService()