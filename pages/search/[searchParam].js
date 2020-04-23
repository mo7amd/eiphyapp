import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import Grid from '../../components/grid';
import Layout from '../../components/layout';
import SEO from '../../next-seo.config';
import { search } from '../../lib/query';

function SearchPage() {
  const router = useRouter();
  const { searchParam, type } = router.query;

  return (
    <Layout>
      <DefaultSeo {...SEO} />

      <h2>
        hello
        {' - '}
        {searchParam}
      </h2>

      <button
        type="button"
        onClick={() => {
          router.push(`/search/${searchParam}?type=gifs`);
        }}
      >
        gifs
      </button>

      <button
        type="button"
        onClick={() => {
          router.push(`/search/${searchParam}?type=memes`);
        }}
      >
        memes
      </button>


      {searchParam && <Grid loadMore={(startAfter) => search({ type, searchParam, startAfter })} />}

    </Layout>
  );
}

export default SearchPage;
