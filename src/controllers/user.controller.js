const userService = require("../services/user.service");

class UserController {
  async addUser(req, res) {
    const body = req.body;

    // Check if a user of that title already exist

    const existingUser = await userService.getUser({
      username: body.title.toLowerCase(),
    });
    if (existingUser)
      return res.status(403).json({
        success: false,
        message: "User already exist",
      });

    const createdUser = await userService.addUser(body);

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: createdUser,
    });
  }

  async editUser(req, res) {
    const updateData = req.body;
    const userId = req.params.id;

    // Fetch the user with the id
    const existingUser = await userService.getUser({ _id: userId });
    if (!existingUser)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    // Fetching existing user title
    if (updateData.username) {
      const existingUsername = await userService.getUser({
        username: updateData.username.toLowerCase(),
      });
      if (existingUsername) {
        if (existingUsername._id.toString() !== userId) {
          return res.status(403).json({
            success: false,
            message: "Incorrect username",
          });
        }
      }
    }

    const updatedUser = await userService.updateUser(userId, updateData);

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: updatedUser,
    });
  }

  async fetchUsers(req, res) {
    const allUsers = await userService.getUsers();

    return res.status(200).json({
      success: true,
      message: "Users Fetched Successfully",
      data: allUsers,
    });
  }

  async fetchUser(req, res) {
    const userId = req.params.id;
    const userToFetch = await userService.getUser({ _id: userId });

    if (!userToFetch)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    return res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      data: userToFetch,
    });
  }

  async deleteUser(req, res) {
    const userId = req.params.id;
    const userToFetch = await userService.getUser({ _id: userId });

    if (!userToFetch)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    await userService.deleteUser(userId);

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      data: userToFetch,
    });
  }
}

module.exports = new UserController();
