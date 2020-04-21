import Layout from '../../components/layout';
import ImgView from '../../components/imgView';

function Meme({ meme }) {
  return (
    <Layout>
      {(meme && <ImgView type="memes" id={meme} />) || false}
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // const paths = Array(1).fill(0).map((_, index) => ({
  //   params: { meme: `${index + 1}` },
  // }));

  return {
    paths: [],
    fallback: true,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  return { props: { meme: params.meme } };
}

export default Meme;
