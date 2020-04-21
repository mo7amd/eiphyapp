import react from 'react';
import Dropzone from '../../components/dropZone';
import '../../scss/main.scss';

export default function Upload() {
  return (
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
  );
}
