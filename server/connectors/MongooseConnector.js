import Mongoose, { mongo } from 'mongoose';
Mongoose.Promise = global.Promise;

 
const mongodbUri = 'mongodb://user123:u53r%40dm!n@ds237989.mlab.com:37989/employee-app-test1';

const startConnection = ({ onConnectionOpened }) => {
    Mongoose.connect(mongodbUri)
    .then(() => {
        console.log('Mongoose connection opened.');

        onConnectionOpened && onConnectionOpened();
    })
    .catch(err => {
        console.error(err);
    });
}

const MongooseConnector = {
    startConnection
}

export default MongooseConnector;
