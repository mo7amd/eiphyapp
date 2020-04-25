import { getTrending } from '../../lib/query';
import IndexPage from '../../components/indexPage';

export async function getStaticProps() {
  const type = 'memes';
  const imgs = await getTrending({ type });

  return {
    props: {
      imgs,
      type,
    },
  };
}

export default IndexPage;
