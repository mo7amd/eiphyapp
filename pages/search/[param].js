import Head from 'next/head';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Grid from '../../components/grid';
import Layout from '../../components/layout';
import { db } from '../../lib/firebase';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: [],
      type: 'meme',
      param: 'merquant',
      search: ''
    };
  }

  componentDidMount() {
    const { type } = this.state;

    db.collection('posts')
      .where('type', '==', type)
      .get()
      .then((querySnapshot) => {
        const imgs = [];
        querySnapshot.forEach((doc) => imgs.push(doc.data()));
        this.setState({ imgs });
      });
  }

  render() {
    const { param, imgs, search } = this.state;
    return (
      <Layout>
        <Head>
          <title>
            search -
            {param}
          </title>
        </Head>
        <h2>
          hello
          {' - '}
          {param}
        </h2>
        <input type="search" value={search} onChange={(e) => {
          this.setState({ search: e.target.value });
        }}/>
        <button
          type="button"
          onClick={() => {
            Router.push(`/search/${search}`);
          }}
        >
          search
        </button>
        <Grid imgs={imgs}/>

      </Layout>
    );
  }
}


export default Search;
