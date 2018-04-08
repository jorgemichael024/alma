import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user';

router.post('/signup', function(req, res) {
    console.log(req.body);
    return bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const { firstName, lastName, email, username, roles, avatar } = req.body;
        const newUser = new UserModel({ firstName, lastName, email, username, password: hash, roles, avatar });

        return newUser.save();
    })
    .then (user => {
        console.log("User Response", user);
        return res.status(201).send(user);
    })
    .catch (err => {
        console.error('createUser error: ', err);
        return res.status(500).send(err);
    });
});

router.post('/signin', function(req, res){
    return UserModel.findOne({username: req.body.username})
    .then(function(user) {
        if (!user || !user.password) return res.status(401).send('Unauthorized');

       bcrypt.compare(req.body.password, user.password, function(err, result){
          if(err) {
             return res.status(401).json({
                failed: 'Unauthorized Access'
             });
          }
          if(result) {
            const JWTToken = jwt.sign({
                username: user.username,
                _id: user._id
            },
                'ZPOdXk8XBuyrOmfQn49LiAzZJGaSWkMR',
            {
                expiresIn: '24h'
            });
            return res.status(200).json({
             success: 'Welcome to the JWT Auth',
             token: JWTToken
            });
          }
          return res.status(401).json({
             failed: 'Unauthorized Access'
          });
       });
    })
    .catch(error => {
        console.log("ERROR", error);
       res.status(500).json({
          error: error
       });
    });;
 });

 export default router;