import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import fundraiser from '../../ethereum/fundraiser';

class Verify extends Component {
    state = {
        index: this.props.index,
        status: 'legit',
        errorMessage: '',
        successMessage: '',
        loading: false
    }

    static async getInitialProps({ query }) {
        return { index: query.index }
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '', successMessage: ''});
        const { index, status } = this.state;

        try {
            const requestCount = await fundraiser.methods.getRequestCount().call();
            if (parseInt(index) >= requestCount) throw new Error('Invalid index of request.');

            const accounts = await web3.eth.getAccounts();
            await fundraiser.methods.verifyRequest(index, status).send({ from: accounts[0] });

            this.setState({ successMessage: `Request(${index}) is marked as ${status}` });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    }

    render() {
        const { index, status, errorMessage, successMessage, loading } = this.state;

        return (
            <Layout>
                <h3>Verify Request</h3>
                <Form
                    onSubmit={this.onSubmit}
                    error={!!errorMessage}
                    success={!!successMessage}
                    style={{ width: '60%' }}
                >
                    <Form.Field>
                        <label>Index of Request</label>
                        <Input
                            value={index}
                            onChange={event => this.setState({ index: event.target.value })}
                        />
                    </Form.Field>

                    <select
                        className="field"
                        value={status}
                        onChange={event => this.setState({ status: event.target.value })}
                    >
                        <option value="legit">Legit</option>
                        <option value="spam">Spam</option>
                    </select>

                    <Message error header="Wait!" content={errorMessage} />
                    <Message success header="Success!" content={successMessage} />
                    <Button type="submit" color="black" loading={loading}>Submit</Button>
                </Form>
            </Layout>
        );
    }
}

export default Verify;