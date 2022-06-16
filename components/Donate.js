import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import fundraiser from '../ethereum/fundraiser';
import web3 from '../ethereum/web3';

class Donate extends Component {
    state = {
        value: '',
        errorMessage: '',
        successMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '', successMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            const request = await fundraiser.methods.requests(this.props.index).call();
            if (request.completed) throw new Error('Charity Request already fulfilled.');

            const requestor = await fundraiser.methods.spammers(request.requestManager).call();
            if (requestor) throw new Error('Requestor is marked as spam.')

            const value = await web3.utils.toWei(this.state.value, 'ether');
            await fundraiser.methods.sendHelp(this.props.index).send({
                from: accounts[0],
                value
            });

            this.setState({ successMessage: 'Help reached, thank you for your donation.' });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    }

    render() {
        const { errorMessage, successMessage, loading, value } = this.state;
        return (
            <Form
                onSubmit={this.onSubmit}
                error={!!errorMessage}
                success={!!successMessage}
            >
                <Form.Field>
                    <label>I want to donate...</label>
                    <Input
                        label="ETH"
                        labelPosition="right"
                        value={value}
                        onChange={event => this.setState({ value: event.target.value })}
                        disabled={this.props.status === 'Spam'}
                    />
                </Form.Field>

                <Message error header="Wait!" content={errorMessage} />
                <Message success header="Success!" content={successMessage} />
                <Button
                    type="submit"
                    color="black"
                    loading={loading}
                    disabled={this.props.status === 'Spam'}
                >Donate</Button>
            </Form>
        );
    }
}

export default Donate;