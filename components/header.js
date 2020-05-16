import React, { useState, useLayoutEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { stack as Menu } from 'react-burger-menu';
import '../scss/main.scss';
import UserWidget from './userWidget';
import SearchField from './searchField';


const BaseHeader = ({ children }) => (
  <>
    <header className="main-header">
      <Head>
        <link rel="icon" type="image/png" href="../static/logo/logo-gif.gif" />
        <title>Eiphy | Egyptian Gifs platform</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="description" content="Eiphy | Egyptian Gifs platform" />
        <meta name="twitter:card" content="https://eiphyapp.com/static/logo/logo-gif.gif" />
        <meta name="twitter:site" content="@eiphyapp" />
        <meta name="twitter:creator" content="@eiphyapp" />
        <meta property="fb:app_id" content="175288006942455" />
        <meta property="og:url" content="https://eiphyapp.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Eiphy | Egyptian Gifs platform" />
        <meta
          property="og:description"
          content="Eiphy | Egyptian Gifs platform"
        />
        <meta property="og:locale" content="en_IE" />
        <meta
          property="og:site_name"
          content="Eiphy | Egyptian Gifs platform"
        />
        <link
          rel="icon"
          type="image/png"
          href="../static/logo/logo-gif.gif"
        />
      </Head>
      <div className="main-header__logo">
        <Link href="/">
          <a>
            <img src="../static/logo/logo-gif.gif" alt="" />
            <svg
              width="150px"
              height="27px"
              position="relative"
              margin="0"
              top="20px"
            >
              <text kerning="auto" fontFamily="Myriad Pro" fill="rgb(0, 0, 0)" fontSize="36px" x="0px" y="27px"><tspan fontSize="36px" fontFamily="Ubuntu" fontWeight="bold" fill="#FFFFFF">EIPHY</tspan></text>
            </svg>
          </a>
        </Link>
        <nav className="nav nav-masthead justify-content-center" />
      </div>
      {children}
    </header>
    <SearchField />
  </>
);

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BaseHeader>
      <div className="burger-menu">
        <Menu
          right
          isOpen={isOpen}
          onStateChange={(state) => setIsOpen(state.isOpen)}
        >
          <Link key="home" href="/"><a onClick={() => setIsOpen(false)}>Home</a></Link>
          <Link key="upload" href="/upload"><a onClick={() => setIsOpen(false)}>Upload</a></Link>
          <UserWidget callback={() => setIsOpen(false)} />
        </Menu>
      </div>
    </BaseHeader>
  );
};

const DesktopHeader = () => (
  <BaseHeader>
    <div className="main-header__links">
      <Link key="home" href="/"><a>Home</a></Link>
      <Link key="upload" href="/upload"><a>Upload</a></Link>
      <UserWidget />
    </div>
  </BaseHeader>
);

const Header = () => {
  const LAYOUT_THRESHOLD = 560;
  const [layout, setLayout] = useState(null);
  if (process.browser) {
    useLayoutEffect(() => {
      const width = window.innerWidth;
      if (width < LAYOUT_THRESHOLD) {
        setLayout('small');
      } else {
        setLayout('large');
      }
    }, []);
  }

  if (!layout) return false;
  if (layout === 'small') return <MobileHeader />;

  return <DesktopHeader />;
};

export default Header;
