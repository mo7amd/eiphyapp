import React from 'react';
import PropTypes from 'prop-types';
import Footer from './footer';
import Header from './header';

const Layout = ({ children }) => (
  <>
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
