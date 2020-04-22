import Layout from '../../components/layout';
import ImgView from '../../components/imgView';
import { getById, search, getSimilar } from '../../lib/query';

function Gif({ id, img, imgs }) {
  return (
    <Layout>
      {(id && <ImgView type="gifs" id={id} img={img} imgs={imgs} />) || false}
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const imgs = await search('gifs', null, null, 1000);

  const paths = imgs.map((img) => ({
    params: { id: img.id, img },
  }));

  return {
    paths,
    fallback: true,
  };
}

// This also gets called at build time
export async function getStaticProps({ params: { id, img: imgParams, imgs: imgsParams } }) {
  let img = imgParams || await getById('gifs', id, false) || {};
  img = JSON.parse(JSON.stringify(img));
  let imgs = imgsParams || (img && await getSimilar('gifs', img.tags)) || [];
  imgs = imgs.map((img) => JSON.parse(JSON.stringify(img)));

  return { props: { id, img, imgs } };
}

export default Gif;
