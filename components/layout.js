import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Footer from './footer';
import Header from './header';

const Layout = ({ children }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    </Head>
    <div id="layout">
      <Header />
      <main className="main-layout">
        {children}
      </main>
      <Footer />
    </div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
