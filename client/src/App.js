import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import UserGridComponent from 'components/UserGridComponent';
import LeavesTableComponent from 'components/LeavesTableComponent';

const UserList = ({selectUser, currentUser}) => (
  <Query
    query={gql`
      {
        allUsers {
          _id,
          firstName,
          lastName,
          email,
          roles,
          avatar
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) {
        console.log("ERROR", error.graphQLErrors);
        return <p>Error :(</p>;
      }

      console.log("DATA", data);

      return <UserGridComponent user={currentUser} userList={data.allUsers || []} selectUser={selectUser}/>
    }}
  </Query>
);

const LeavesList = ({currentUser}) => (
  <Query
    query={gql`
      {
        leavesByUserId(user_id: "${currentUser._id}") {
          _id
          fromDate
          toDate
          reason
          type
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) {
        console.log(error);
        return <p>Error :(</p>;
      }

      console.log("DATA", data);

      return <LeavesTableComponent user={currentUser} leaves={data.leavesByUserId || []} />
    }}
  </Query>
);

class App extends Component {
  state = {
    currentUser: ''
  }

  selectUser = (user) => {
    this.setState({
      currentUser: {...user}
    });
  }

  render() {

    const { currentUser } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Absence and Leave Management App</h1>
        </header>
        <div className="UserList">
          <UserList selectUser={this.selectUser} />
        </div>
        <div className="LeavesList">
        { !!currentUser && <LeavesList currentUser={currentUser} /> }
        </div>
      </div>
    );
  }
}

export default App;
