import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import Head from 'next/head';
import { MetaMaskProvider } from 'metamask-react';

const Layout = (props) => {
    return (
        <Container>
            <Head>
                <title>GCA</title>
                <link async rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css" />
            </Head>
            <MetaMaskProvider>
                <Header />
            </MetaMaskProvider>
            <div style={{ marginTop: '88px' }}>{props.children}</div>
        </Container>
    );
}

export default Layout;