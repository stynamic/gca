import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Link from 'next/link';

class RenderRequest extends Component {

    render() {
        const { name, value, description, index, cardColor } = this.props;
        return (
            <Card color={cardColor}>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>{`${value} ETH`}</Card.Meta>
                    <Card.Description>{description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className="ui two buttons">
                        <Link href="/details/[index]" as={`/details/${index}`}>
                            <Button basic color="black">Details</Button>
                        </Link>
                        <Link href="/verify/[index]" as={`/verify/${index}`}>
                            <Button basic color="black">Verify</Button>
                        </Link>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

export default RenderRequest;