/**
 * UserCardComponent
 */
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 3px;
    background-color: white;
    border: 1px solid #EBEBEB;
    margin: 10px;
    min-width: 220px;
    cursor: pointer;
`;

const CardAvatar = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    width: 100%;
`;

const CardAvatarImage = styled.img`
    border-radius: 50%;
    width: 80px;
    height: 80px;
`;

const CardAvatarTitle = styled.h3`
    color: #616161;
`;


const CardAvatarDetails = styled.div`
    color: #9c9c9c;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
`;

const CardAvatarDetailItem = styled.p`
    color: #9c9c9c;
    margin: 0;
    font-size: ${ props => props.fontSize || 12 }px;
`;

const UserCardComponent = ({ user = {}, selectUser }) => {

    const roleString = !user.roles ? '' : user.roles.join(', ');


    return (
        <Card onClick={() => selectUser(user)}>
            <CardAvatar>
                <CardAvatarImage src={user.avatar} />
            </CardAvatar>
            <CardAvatarTitle>
                {`${user.lastName}, ${user.firstName}`}
            </CardAvatarTitle>
            <CardAvatarDetails>
                <CardAvatarDetailItem>
                 { user.email }
                </CardAvatarDetailItem>
                
                <CardAvatarDetailItem>
                 { roleString }
                </CardAvatarDetailItem>
            </CardAvatarDetails>
        </Card>
    );
}

export default UserCardComponent;