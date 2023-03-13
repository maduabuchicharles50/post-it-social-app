const commentModel = require("../models/comment.model");

class CommentService {
  // Add comment
  async addComment(data) {
    return await commentModel.create(data);
  }

  // Update a comment
  async updateComment(id, updateData) {
    return await commentModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  // Delete a comment
  async deleteComment(id) {
    return await commentModel.findByIdAndUpdate(id, { deleted: true });
  }

  // Get a single comment
  async getComment(filter) {
    return await commentModel.findOne(filter);
  }

  // Get all comments
  async getComments(filter) {
    return await commentModel.find(filter);
  }
}

module.exports = new CommentService();
