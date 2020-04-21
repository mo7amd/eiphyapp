import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';
import ErrorMsg from './errorMsg';

export default function DropZone() {
  const MAX_FILE_SIZE = Math.floor(process.env.MAX_FILE_SIZE * 1024 * 1024);
  const [error, setError] = useState('');
  const router = useRouter();
  const onDropAccepted = useCallback((files) => {
    setError((e) => {
      if (e !== '') {
        setError('');
      }
    });
    localStorage.setItem(process.env.IMG_PREVIEW, URL.createObjectURL(files[0]));
    router.push('/upload/finalize');
  }, []);
  const onDropRejected = useCallback((files) => {
    const [file] = files;
    if (file.size > MAX_FILE_SIZE) {
      setError('you exceed the max file size');
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    accept: 'image/gif',
  });
  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Select or Drag and Drop your Gifs/Memes</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ErrorMsg msg={error} />
      </aside>
    </section>
  );
}
