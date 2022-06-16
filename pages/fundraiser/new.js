import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import fundraiser from '../../ethereum/fundraiser';

class NewFundraiser extends Component {
    state = {
        name: '',
        description: '',
        recipient: '',
        value: '',
        loading: false,
        successMessage: '',
        errorMessage: ''
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '', successMessage: '' })
        const { name, description, recipient, value } = this.state;

        try{
            const accounts = await web3.eth.getAccounts();
            const isSpammer = await fundraiser.methods.spammers(accounts[0]).call();

            if (isSpammer) throw new Error('Suspicious activity detected.');

            await fundraiser.methods.raiseMeFund(
                name,
                description,
                recipient,
                web3.utils.toWei(value, 'ether')
            ).send({ from: accounts[0] });

            this.setState({ successMessage: `Request added for ${name}.`})
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <h3>Request for Charity</h3>

                <Form
                    onSubmit={this.onSubmit}
                    error={!!this.state.errorMessage}
                    success={!!this.state.successMessage}
                    style={{ width: '60%' }}
                >
                    <Form.Field>
                        <label>Name</label>
                        <Input
                            value={this.state.name}
                            onChange={(event) => this.setState({ name: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={(event) => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={(event) => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value</label>
                        <Input
                            label="ETH"
                            labelPosition="right"
                            value={this.state.value}
                            onChange={(event) => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Message error header="Wait!" content={this.state.errorMessage} />
                    <Message success header="Success!" content={this.state.successMessage} />
                    <Button type="submit" color="black" loading={this.state.loading}>Submit</Button>
                </Form>
            </Layout>
        );
    }
}

export default NewFundraiser;