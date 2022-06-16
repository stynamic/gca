import React from 'react';
import { Menu, Icon, Container, Button } from 'semantic-ui-react';
import Link from 'next/link';
import { useMetaMask } from 'metamask-react';

const Header = () => {

    const { status, connect } = useMetaMask();

    const metaMaskStatus = () => {
        switch (status) {
            case 'connected':
                return 'Metamask Connected';
            case 'unavailable':
                return 'Install Metamask';
            case 'notConnected':
                return <Button content="Connect" onClick={connect} />;
            default:
                return null;
        }
    }

    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header>
                    <Icon name="help circle" size="big" />
                    <Link href="/">
                        Genuine Charity App
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/verify/addVerifier">
                        Add Verifier
                    </Link>
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item>
                        {metaMaskStatus()}
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    );
}

export default Header;