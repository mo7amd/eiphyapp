import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Footer from './footer';
import Header from './header';

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const onLoad = () => setIsLoading(false);
  const onBeforeUnload = () => setIsLoading(true);

  if (process.browser) {
    useLayoutEffect(() => {
      if (document.readyState === 'complete') {
        setTimeout(onLoad, 3000);
      }
      window.addEventListener('beforeunload', onBeforeUnload);
      window.addEventListener('load', onLoad);
      return () => {
        window.removeEventListener('load', onLoad);
        window.removeEventListener('beforeunload', onBeforeUnload);
      };
    }, []);
  }

  return (
    <>
      <div id="divLoading" className={isLoading ? 'show' : ''} />
      <div id="layout">
        <Header />
        <main className="main-layout">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
