/**
 * UserCardComponent
 */
import React from 'react';
import styled from 'styled-components';

import UserCardComponent from 'components/UserCardComponent';

const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
`;

const UserGridComponent = ({ userList = [], selectUser }) => {
    return (
        <Grid>
            { userList.map(user => <UserCardComponent key={`USER__${user._id}`} user={user} selectUser={selectUser} />) }
        </Grid>
    );
}

export default UserGridComponent;