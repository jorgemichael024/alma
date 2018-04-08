import { UserModel, LeaveModel } from '../models';
import  bcrypt from 'bcrypt';

const resolvers = {
    Query: {
      userById(_, { _id }) {
          return UserModel.findById(_id)
          .then (user => user)
          .catch (err => {
            console.error('userById error', err);
          });
      },
      allUsers() {
        return UserModel.find()
        .then (users => users)
        .catch (err => {
            console.error('allUsers error', err);
        });
      },
      leavesByUserId(_, { user_id }) {
        return LeaveModel.find({ user_id })
        .then (leaves => leaves)
        .catch (err => {
            console.error('leavesByUserId error', err);
        });
      },
      allLeaves() {
        return LeaveModel.find();
      }
    },
    Mutation: {
        // createUser: (root, { firstName, lastName, email, username, password, roles }) => {
        //     return bcrypt.hash(password, 10)
        //     .then(hash => {
        //         const newUser = new UserModel({ firstName, lastName, email, username, password: hash, roles });

        //         return newUser.save();
        //     })
        //     .then (user => {
        //         console.log("User Response", user);
        //         return user;
        //     })
        //     .catch (err => {
        //         console.error('createUser error: ', err);
        //     });
        // },
        createLeave: (root, { fromDate, toDate, reason, type, user_id }) => {
            return UserModel.findOne({ _id: user_id })
            .then (user => {
                if (!user) throw new Error("User not found");
                
                const newLeave = new LeaveModel({fromDate, toDate, reason, type, user_id});
                return newLeave.save();
            })
            .then (leave => {
                console.log("Leave Response", leave);
                return leave;
            })
            .catch (err => {
                console.error('createLeave error:', err);
            });
        }
    },
    User: {
        leaves(user) {
            return LeaveModel.find({ user_id: user._id })
            .then (leaves => leaves)
            .catch (err => {
                console.error('User-leaves error', err);
            });
        }
    },
    Leave: {
      user(leave) {
        return UserModel.findOne({ _id: leave.user_id })
        .then (user => user)
        .catch (err => {
            console.error('Leave-user error', err);
        });
      }
    }
  };
  
  export default resolvers;