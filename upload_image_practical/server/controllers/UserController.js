const Util = require("../Utils");
const util = new Util();
var fs = require("fs");
const userData = [
  { id: 1, name: "Bhavik", age: 25, gender: "Male" },
  { id: 2, name: "Vivek", age: 23, gender: "Male" },
  { id: 3, name: "Hiren", age: 31, gender: "Male" },
  { id: 4, name: "Alpesh", age: 28, gender: "Male" },
];

async function userSearch(value) {
  if (value) {
    return userData.filter((item) => {
      return value
        .toLowerCase()
        .split(" ")
        .every((v) => item.name.toLowerCase().includes(v));
    });
  } else {
    return userData;
  }
}

class UserController {
  static async userList(req, res) {
    try {
      const searchData = await userSearch(req.query.search);
      fs.writeFile(
        "user.json",
        JSON.stringify(userData),
        "utf8",
        function (err) {
          if (err) throw err;
          console.log("Data added in file");
        }
      );
      
      searchData.length <= 0
        ? util.setSuccess(200, "User Not found")
        : util.setSuccess(200, "User get successfully", searchData);
      return util.send(res);
    } catch {
      util.setError(400, error);
      return util.send(res);
    }
  }
  static async insertUser(req, res) {
    try {
      userData.push(req.body);
      util.setSuccess(200, "Insert User Data!", userData);
      return util.send(res);
    } catch {
      util.setError(400, error);
      return util.send(res);
    }
  }
  static async getUser(req, res) {
    try {
      var result = userData.filter((obj) => obj.id == req.params.id);
      util.setSuccess(200, "Get User Data!", result);
      return util.send(res);
    } catch {
      util.setError(400, error);
      return util.send(res);
    }
  }
  static async updateUser(req, res) {
    try {
      userData.map((value) => {
        if (value.id == req.params.id) {
          value.name = req.body.name;
          value.age = req.body.age;
          value.gender = req.body.gender;
        }
      });

      util.setSuccess(200, "Update User Data!", userData);
      return util.send(res);
    } catch {
      util.setError(400, error);
      return util.send(res);
    }
  }
  static async deleteUser(req, res) {
    try {
      var index = userData.findIndex((obj) => obj.id == req.params.id);
      userData.splice(index, 1);
      util.setSuccess(200, "Delete User Data!", userData);
      return util.send(res);
    } catch {
      util.setError(400, error);
      return util.send(res);
    }
  }
  static async uploadFiles(req, res) {
    try {
      util.setSuccess(200, "Files uploaded successfully!!", userData);
      return util.send(res);
    } catch {
      util.setError(400, error);
      return util.send(res);
    }
  }
  static async profile(req, res) {
    try {
      
      util.setSuccess(200, "Profile uploaded successfully!!", userData);
      return util.send(res);
    } catch {
      util.setError(400, error);
      return util.send(res);
    }
  }
}
module.exports = UserController;
