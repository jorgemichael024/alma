/**
 * LeavesTableComponent
 */
import React from 'react';
import styled from 'styled-components';

import { Table, Block, Flex } from 'reas';

const headerFields = [ 
    {
        field: 'fromDate',
        display: 'Start Date'
    },
    {
        field: 'toDate',
        display: 'End Date'
    },
    {
        field: 'reason',
        display: 'Reason'
    },
    {
        field: 'type',
        display: 'Type'
    }
];

const FullTable = styled(Table)`
    width: 100%;
`;

const Content = styled(Flex)`
    padding: 20px;
`;

const LeavesTableComponent = ({ user, leaves }) => {
    return (
        <Content>
            <FullTable>
                <Table.Caption>{`Filed leaves of ${user.lastName}, ${user.firstName}`}</Table.Caption>
                <Table.Head>
                    <Table.Row>
                        { headerFields.map(header =>  <Table.Cell key={header.field} header>{header.display}</Table.Cell> )}
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    { 
                        leaves.map(leave => (
                            <Table.Row key={leave._id}>
                                <Table.Cell>{ leave.fromDate }</Table.Cell>
                                <Table.Cell>{ leave.toDate }</Table.Cell>
                                <Table.Cell>{ leave.reason }</Table.Cell>
                                <Table.Cell>{ leave.type }</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </FullTable>
        </Content>
    );
};

export default LeavesTableComponent;