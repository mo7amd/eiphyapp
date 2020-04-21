import React from 'react';
import Dropzone from '../../components/dropZone';
import '../../scss/main.scss';
import Layout from '../../components/layout';

export default function Upload() {
  return (
    <Layout>
      <div className="container">
        <div className="row text-center">
          <h2>UPLOAD</h2>
          <p>
            Upload your GIFs and Stickers to share on Facebook, Twitter,
            Instagram, text message, email, and everywhere else.
          </p>
        </div>
        <Dropzone />
      </div>
    </Layout>
  );
}
