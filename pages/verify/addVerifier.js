import React, { Component } from 'react';
import { Form, Button, Message, Input, Container } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3'
import fundraiser from '../../ethereum/fundraiser';

class AddVerifier extends Component {
    state = {
        address: '',
        loading: false,
        successMessage: '',
        errorMessage: ''
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '', successMessage: '' });
        const { address } = this.state;

        try {
            const accounts = await web3.eth.getAccounts();
            const isVerifier = await fundraiser.methods.verifiers(address).call();
            const manager = await fundraiser.methods.manager().call();
            
            if (isVerifier) throw new Error('Provided address is already marked as verifier.');
            if (manager !== accounts[0]) throw new Error('Only manager can add verifiers.');

            await fundraiser.methods.addVerifier(address).send({ from: accounts[0] });

            this.setState({ successMessage: `${address} added as verifier.` });
        } catch (error) {
            this.setState({ errorMessage: error.message })
        }

        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Add Verifiers</h3>
                    <Form
                        onSubmit={this.onSubmit}
                        error={!!this.state.errorMessage}
                        success={!!this.state.successMessage}
                        style={{ width: '60%'}}
                    >
                        <Form.Field>
                            <label>Address of Verifier</label>
                            <Input
                                value={this.state.address}
                                onChange={(event) => this.setState({ address: event.target.value })}
                            />
                        </Form.Field>
                        <Message error header="Wait!" content={this.state.errorMessage} />
                        <Message success header="Success!" content={this.state.successMessage} />
                        <Button type="submit" color="black" loading={this.state.loading}>Add</Button>
                    </Form>
                </div>
            </Layout>
        );
    }
}

export default AddVerifier;