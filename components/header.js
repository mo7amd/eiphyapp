import React from 'react';
import { DefaultSeo } from 'next-seo';
import Link from 'next/link';
import SEO from '../next-seo.config';
import '../scss/main.scss';
import UserWidget from './userWidget';
import SearchField from './searchField';

const Header = (props) => (
  <header className="masthead mb-auto">
    <DefaultSeo {...SEO} />
    <div className="inner">
      <h3 className="masthead-brand">HelloNext</h3>
      <nav className="nav nav-masthead justify-content-center" />
    </div>
    <div>
      <Link href="/"><a>Home</a></Link>
      <Link href="/upload"><a>Upload</a></Link>
    </div>
    <UserWidget />

    <SearchField />
  </header>

);

Header.propTypes = {

};

export default Header;
