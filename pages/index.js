import PropTypes from 'prop-types';
import Layout from '../components/layout';
import firebase from '../lib/firebase';
import Grid from '../components/grid';

export default function Home({ imgs }) {
  console.log(firebase);
  return (
    <Layout>
      <Grid imgs={imgs} />
    </Layout>
  );
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
