import React, { Component } from 'react';
import { Button, Card, Icon, Grid } from 'semantic-ui-react';
import Link from 'next/link';
import Layout from '../components/Layout';
import RenderRequest from '../components/RenderRequest';
import fundraiser from '../ethereum/fundraiser';
import web3 from '../ethereum/web3';


class Fundraiser extends Component {
    static async getInitialProps() {
        const requestsCount = await fundraiser.methods.getRequestCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestsCount))
                .fill()
                .map((element, index) => {
                    return fundraiser.methods.requests(index).call();
                }
            )
        );

        return { requestsCount, requests };
    }

    renderRequests = () => {
        return this.props.requests.map((request, index) => {
            return (
                <RenderRequest
                    key={index}
                    index={index}
                    name={request.name}
                    description={request.description}
                    value={web3.utils.fromWei(request.value, 'ether')}
                    cardColor={request.completed ? 'black' : (request.legit ? 'green' : (request.spam ? 'red' : 'yellow'))}
                />
            )
        });
    }

    render() {
        return (
            <Layout>
                <h3>{`Total ${this.props.requestsCount} charity requests`}</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <Card.Group>
                                {this.renderRequests()}
                            </Card.Group>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <p>
                                <Link href="/fundraiser/new">
                                    <a>
                                        <Button content="Request Charity" icon="add circle" color="black" />
                                    </a>
                                </Link>
                            </p>
                            <p><Icon name="dot circle" color="black" />Completed</p>
                            <p><Icon name="dot circle" color="green" />Legit</p>
                            <p><Icon name="dot circle" color="yellow" />Unknown</p>
                            <p><Icon name="dot circle" color="red" />Spam</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default Fundraiser;
