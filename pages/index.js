import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Grid from '../components/grid';
import { getTrending } from '../lib/query';

export default function Home(props) {
  const { imgs, type } = props;

  return (
    <Layout>
      <Grid
        imgs={imgs}
        loadMore={(offset) => getTrending(type, offset)}
      />
    </Layout>
  );
}

Home.propTypes = {
  imgs: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export async function getStaticProps() {
  return {
    props: {
      imgs: [],
      type: 'memes',
    },
  };
}
