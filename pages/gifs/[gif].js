import Layout from '../../components/layout';
import ImgView from '../../components/imgView';

function Gif({ gif }) {
  return (
    <Layout>
      {(gif && <ImgView type="gifs" id={gif} />) || false}
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // const paths = Array(1).fill(0).map((_, index) => ({
  //   params: { gif: `${index + 1}` },
  // }));

  return {
    paths: [],
    fallback: true,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  return { props: { gif: params.gif } };
}

export default Gif;
