import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class RenderRow extends Component {

    render() {
        const { Row, Cell } = Table;

        return (
            <Row error={this.props.detail === 'Spam'}>
                <Cell>{this.props.property}</Cell>
                <Cell>{this.props.detail}</Cell>
            </Row>
        );
    }
}

export default RenderRow;