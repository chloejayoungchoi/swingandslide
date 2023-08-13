import React, { useEffect, useRef, useState } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const IMAGE_PATH = process.env.REACT_APP_SUPABASE_STORAGE_DEFAULT_PATH;


function Gallery(props) {
  const ref = useRef();
  const galleryID = 'sns-gallery';

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: '#' + galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
    if(props.imageList.length > 0 && props.imageList[0].filename !== 'thumb-default.jpg') ref.current.click()

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, [props.imageList]);

  return (
    <div className="pswp-gallery" id={galleryID}>
      {props.imageList.map((image, index) => (
        <a
          href={IMAGE_PATH + image.filename}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          key={galleryID + '-' + index}
          target="_blank"
          rel="noreferrer"
          ref={index==props.selIndex?ref:null}
        >
        </a>
      ))}
    </div>
  );
}

export default Gallery;