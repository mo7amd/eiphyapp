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
        <h3 className="masthead-brand">Eiphy logo</h3>
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
