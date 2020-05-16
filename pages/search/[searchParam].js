import { useRouter } from 'next/router';
import Grid from '../../components/grid';
import Layout from '../../components/layout';
import { search } from '../../lib/query';

function SearchPage({ imgs }) {
  const router = useRouter();
  const { searchParam, type } = router.query;

  return (
    <Layout>
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


      {searchParam && (
      <Grid
        imgs={imgs}
        loadMore={(startAfter) => search({
          type, searchParam, startAfter, fulltext: true,
        })}
      />
      )}

    </Layout>
  );
}

export default SearchPage;

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   };
// }
//
// export async function getStaticProps({ params: { searchParam } }) {
//   const imgs = await search({ searchParam, fulltext: true });
//
//   return {
//     props: {
//       imgs,
//     },
//   };
// }
