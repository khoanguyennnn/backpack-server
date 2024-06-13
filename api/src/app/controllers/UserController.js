require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const User = require('../models/User');
const RefreshToken = require('../models/Refreshtoken');
const authService = require('../../services/authenticateServices');

class UserController {
    // [GET] /user/getAllUser
    async getAllUser(req, res, next) {
        await User.find()
            .then(users => res.json(users))
            .catch(next)
    }

    // [GET] /user/getUser
    async getUser(req, res, next) {
        try {
            const token = await req.user;
            const user = await User.find({ email: token.email });
            res.status(200).send(user);
        } catch (err) {
            return res.status(400).send("something gone wrong at getting the user");
        }
    }

    // [POST] /user/register
    async register(req, res, next){
        try {
            let checkExist = await User.find({ email: req.body.email });
            if(checkExist == ""){
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(req.body.password, salt);
                let data = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword,
                    role: req.body.role,
                })
                data.save()
                    .catch((err) => {
                        return res.status(400).json("error occured");
                    })
                return res.status(200).json("register successfully")
            } else {
                res.status(400).json("user name or password existed!")
            }
        } catch (error) {
            res.status(400).send(err);    
        }
    }

    // [POST] /user/login
    async login(req, res, next){
        if (req.body.email == "" || req.body.password == "") {
            return res.status(400).json({ message: "You have to insert email or password" });
        }
        let loginUser = await User.findOne({email: req.body.email})
        if(loginUser == null){
            return res.status(404).json({ message: "User does not exist" })
        } else {
            try {
                bcrypt.compare(req.body.password, loginUser.password, (err, data) => {
                    //if both match than you can do anything
                    if (data) {
                        let user = {
                            name: loginUser.name,
                            email: loginUser.email,
                            role: loginUser.role,
                        }
                        
                        let accessToken = authService.generateAccessToken(user);
                        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                        let data = new RefreshToken({
                            token: refreshToken,
                            user: loginUser._id
                        })
                        data.save()
                        return res.status(200).json({accessToken : accessToken, refreshToken: refreshToken})
                    } else {
                        return res.status(401).json({ message: "Wrong username or password" })
                    }
                })       
            } catch (error) {
                return res.status(401).json({ message: "error when login" }); 
            }
        }
    }

    // [POST] /user/token
    async refreshToken(req, res, next){
        const reToken = req.body.token;
        if(reToken == null) return res.sendStatus(401)
        if(!RefreshToken.findOne({token: reToken})) return res.sendStatus(403);
        jwt.verify(reToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            const accessToken = authService.generateAccessToken(user);
            res.json({accessToken: accessToken})
        })

    }

    // [DELETE] /user/logout
    async logout(req, res, next) {
        await RefreshToken.deleteOne({token: req.body.token})
            .then(() => res.status(200).json("logout successfully!"))
            .catch((err) => res.status(400).json("error occured"))
    }
}

module.exports = new UserController();
