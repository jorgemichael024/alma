import jwt from 'jsonwebtoken';
import UserModel from '../models/user';


const getToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }

const authMiddleware = (req, res, next) => {
    console.log(req.body.query.createUser);
    const token = getToken(req);
    console.log(token);

    if (!token)
        return res.status(401).send('Unauthorized request.');

    return jwt.verify(token, 'ZPOdXk8XBuyrOmfQn49LiAzZJGaSWkMR', (err, decoded) => {

        if (!err) {
            console.log("DECODED", decoded);

            return UserModel.findById(decoded._id)
            .then(user => {
                if (user !== undefined && user) 
                    return next();
                
                throw new Error('Unauthorized');
            })
            .catch(err => {
                console.error('authMiddleware error', err);
                return res.status(401).send('Unauthorized request.');
            })
        } else {
            console.error('authMiddleware error', err);
            return res.status(401).send('Unauthorized request.');
        }
    })
}

export default authMiddleware;