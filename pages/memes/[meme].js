import Head from 'next/head';
import Layout from '../../components/layout';

function Meme({ meme }) {
  return (
    <Layout>
      <Head>
        <title>
          hellow gif -
          {meme}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="ta7ouna" />
      </Head>
      <h2>
        hello
        {' - '}
        {meme}
      </h2>
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const paths = Array(1).fill(0).map((_, index) => ({
    params: { meme: `${index + 1}` },
  }));

  return {
    paths,
    fallback: true,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  return { props: { meme: params.meme } };
}

export default Meme;
