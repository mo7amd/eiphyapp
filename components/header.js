import React from 'react';
import { DefaultSeo } from 'next-seo';
import Link from 'next/link';
import SEO from '../next-seo.config';
import '../scss/main.scss';
import UserWidget from './userWidget';
import SearchField from './searchField';

const Header = (props) => (
  <>
    <header className="main-header">
      <DefaultSeo {...SEO} />
      <div className="main-header__logo">
        <Link href="/">
          <a>
            <img src="../static/logo/logo-gif.gif" alt=""/>
            <svg
              width="150px" height="27px" position="relative" margin="0" top="20px">
              <text kerning="auto" font-family="Myriad Pro" fill="rgb(0, 0, 0)" font-size="36px" x="0px" y="27px"><tspan font-size="36px" font-family="Ubuntu" font-weight="bold" fill="#FFFFFF">EIPHY</tspan></text>
            </svg>
          </a>
        </Link>
        <nav className="nav nav-masthead justify-content-center" />
      </div>
      <div className="main-header__links">
        <Link href="/"><a>Home</a></Link>
        <Link href="/upload"><a>Upload</a></Link>
        <UserWidget />
      </div>
    </header>
    <SearchField />
  </>
);

Header.propTypes = {

};

export default Header;
