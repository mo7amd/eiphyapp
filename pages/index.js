import PropTypes from 'prop-types';
import { Component } from 'react';
import Layout from '../components/layout';
import { db } from '../lib/firebase';
import Grid from '../components/grid';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { imgs: props.imgs, type: 'meme' };
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
    const { imgs } = this.state;

    return (
      <Layout>
        <Grid imgs={imgs} />
      </Layout>
    );
  }
}

Home.propTypes = {
  imgs: PropTypes.array.isRequired,
};

export async function getStaticProps() {
  return {
    props: {
      imgs: [],
    },
  };
}
