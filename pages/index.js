import Layout from '../components/layout';
import firebase from '../lib/firebase';

export default function Home({ bam }) {
  console.log(firebase);
  return (
    <Layout>
      {bam}
    </Layout>
  );
}
export async function getStaticProps() {
  return {
    props: {
      bam: 'foo',
    },
  };
}
