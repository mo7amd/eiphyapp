import Head from 'next/head'

export default function Home({ bam }) {
  return (
    <div className="container">
      <Head>
        <title>Eiphy app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          welcome to Eighy
          {bam}
        </h1>
      </main>
    </div>
  )
}
export async function getStaticProps() {
  return {
    props: {
      bam: 'foo',
    },
  }
}