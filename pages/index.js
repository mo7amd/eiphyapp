import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Grid from '../components/grid';
import { getTrending } from '../lib/query';

export default function Home(props) {
  const { imgs } = props;

  return (
    <Layout>
      <Grid
        imgs={imgs}
        loadMore={(startAfter) => getTrending({ startAfter })}
      />
    </Layout>
  );
}

Home.propTypes = {
  imgs: PropTypes.array.isRequired,
};

export async function getStaticProps() {
  const imgs = await getTrending();

  return {
    props: {
      imgs,
    },
  };
}
