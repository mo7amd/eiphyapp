import Head from 'next/head';
import { useRouter } from 'next/router';

function Search() {
  const router = useRouter();
  const { param } = router.query;
  return (
  <>
    <Head>
      <title>search - {param}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="ta7ouna" />
    </Head>
    <h2>
      hello
      {' - '}
      {param}
    </h2>
  </>
  )
}

export default Search