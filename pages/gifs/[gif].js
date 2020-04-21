import Head from 'next/head';
import Layout from '../../components/layout';

function Gif({ gif }) {
  return (
    <Layout>
      <Head>
        <title>
          hellow gif -
          {gif}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="ta7ouna" />
      </Head>
      <h2>
        hello
        {' - '}
        {gif}
      </h2>
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const paths = Array(1).fill(0).map((_, index) => ({
    params: { gif: `${index + 1}` },
  }));

  return {
    paths,
    fallback: true,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  return { props: { gif: params.gif } };
}

export default Gif;
