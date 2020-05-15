import React, { useState, useLayoutEffect } from 'react';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import Link from 'next/link';
import { stack as Menu } from 'react-burger-menu';
import SEO from '../next-seo.config';
import '../scss/main.scss';
import UserWidget from './userWidget';
import SearchField from './searchField';


const BaseHeader = ({ children }) => (
  <>
    <header className="main-header">
      <DefaultSeo {...SEO} />
      <Head>
        <link rel="icon" type="image/png" href="../static/logo/logo-gif.gif" />
        <title>Eiphy | Egyptian Gifs platform</title>
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

const MobileHeader = () => (
  <BaseHeader>
    <div className="burger-menu">
      <Menu right>
        <Link key="home" href="/"><a>Home</a></Link>
        <Link key="upload" href="/upload"><a>Upload</a></Link>
        <UserWidget />
      </Menu>
    </div>
  </BaseHeader>
);

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
  useLayoutEffect(() => {
    const width = window.innerWidth;
    if (width < LAYOUT_THRESHOLD) {
      setLayout('small');
    } else {
      setLayout('large');
    }
  }, []);

  if (!layout) return false;
  if (layout === 'small') return <MobileHeader />;

  return <DesktopHeader />;
};

export default Header;
