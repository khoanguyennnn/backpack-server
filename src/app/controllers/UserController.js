const User = require('../models/User');

class UserController {
    // [GET] /user/getUser
    getUser(req, res, next) {
        User.find()
            .then(users => res.json(users))
            .catch(next)
    }

    // [POST] /user/register
    register(req, res, next){
        let data = new User(req.body)
        data.save()
            .catch((err) => {
                return res.status(400).json("error occured");
            })
            .then(() => {
                return res.send("register sucessfully")
            });
    }
}

module.exports = new UserController();
