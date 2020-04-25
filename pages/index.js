import { getTrending } from '../lib/query';
import IndexPage from '../components/indexPage';

export async function getStaticProps() {
  const imgs = await getTrending();

  return {
    props: {
      imgs,
    },
  };
}

export default IndexPage;
