import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import styles from './PictureUploader.module.css';

function PictureUploader(props) {
  const setFile = props.setFile;
  const photo = props.photo;

  const [profileImg, setProfileImg] = useState(photo);

  function imageHandler(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setProfileImg(reader.result);
      setFile(file);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className={styles.containerr}>
      <div className={styles.imgHolder}>
        <img src={profileImg} alt='' id='img' className={styles.img} />
      </div>
      <input
        type='file'
        accept='image/*'
        name='image-upload'
        id='input'
        onChange={(e) => imageHandler(e)}
      />
      <label className={styles.loader} htmlFor='input'>
        <FaCamera className={styles.materialIcons} />
        <p>Envoyer une photo</p>
      </label>
    </div>
  );
}

export default PictureUploader;
