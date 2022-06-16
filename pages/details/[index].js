import React, { Component } from 'react';
import { Table, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import fundraiser from '../../ethereum/fundraiser';
import RenderRow from '../../components/RenderRow';
import Donate from '../../components/Donate';

class Details extends Component {
    static async getInitialProps({ query }) {
        const requestsCount = await fundraiser.methods.getRequestCount().call();
        if (parseInt(query.index) >= requestsCount) return {}

        const request = await fundraiser.methods.requests(query.index).call();
        const { name, description, value, donated, spam, legit, completed } = request;
        const filteredRequest = {
            index: query.index,
            name,
            description,
            value: web3.utils.fromWei(value, 'ether'),
            donated: web3.utils.fromWei(donated, 'ether'),
            status: completed ? 'Completed' : (legit ? 'Legit' : (spam ? 'Spam' : 'Unknown'))
        }
        
        return { filteredRequest }
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        const { index, name, description, value, donated, status } = this.props.filteredRequest;

        return (
            <Layout>
                <h3>Chartiy Details</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Table padded color="black">
                                <Header>
                                    <Row>
                                        <HeaderCell>Properties</HeaderCell>
                                        <HeaderCell>Details</HeaderCell>
                                    </Row>
                                </Header>
                                <Body>
                                    <RenderRow
                                        property="Status"
                                        detail={status}
                                    />
                                    <RenderRow
                                        property="Index"
                                        detail={index}
                                    />
                                    <RenderRow
                                        property="Name"
                                        detail={name}
                                    />
                                    <RenderRow
                                        property="Description"
                                        detail={description}
                                    />
                                    <RenderRow
                                        property="Value"
                                        detail={`${value} ETH`}
                                    />
                                    <RenderRow
                                        property="Donated"
                                        detail={`${donated} ETH`}
                                    />
                                </Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Donate index={index} status={status} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

Details.defaultProps = {
    filteredRequest: {
        name: 'NA',
        status: 'NA',
        index: 'NA',
        description: 'NA',
        value: 'NA',
        donated: 'NA'

    }
}

export default Details;