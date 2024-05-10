import React, { useState, useRef } from 'react';
import './App.css';
import * as Minio from 'minio'

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9090,
  useSSL: true,
  accessKey: 'ARJfcoMQ0p0JToNdBFT0',
  secretKey: 'Uf12K5rrDa4gnrFrdRBgl22sPEYoYeM9TG3Hmnq3',
})

function App() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photosPreview, setPhotosPreview] = useState([]);
  const profilePhotoInput = useRef(null);
  const photosInput = useRef(null);

  // プロフィール写真のプレビューを表示
  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(file);

      const reader = new FileReader();
      reader.onload = (e) => setProfilePhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // 複数の写真を追加し、プレビューを表示
  const handlePhotosChange = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = [...photos, ...files];
    setPhotos(newPhotos);

    const newPreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result);
      });
    });

    Promise.all(newPreviews).then((results) => {
      setPhotosPreview((prev) => [...prev, ...results]);
    });

    // 入力フィールドをリセット
    photosInput.current.value = '';
  };

  // プレビューと状態から写真を削除
  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotosPreview((prev) => prev.filter((_, i) => i !== index));
  };

  // プロフィール写真と他の写真をサーバーに送信
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('school', document.getElementById('school').value);

    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    photos.forEach((photo, index) => {
      formData.append(`photos[${index}]`, photo);
    });

    try {
      const response = await fetch('https://example.com/profile-upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('送信成功しました！');
      } else {
        alert('送信に失敗しました。');
      }
    } catch (error) {
      alert('エラーが発生しました。');
    }
  };
  const metaData = {  
    'Content-Type': 'text/html',
    'Content-Language': 123,
    'X-Amz-Meta-Testing': 1234,
    example: 5678,
  }
  const testSendPhoto = () => {
    console.log(photos)
  
    // minioClient.fPutObject('art', '40mbfile', file, metaData, function (err, objInfo) {
    //   if (err) {
    //     return console.log(err)
    //   }
    //   console.log('Success', objInfo.etag, objInfo.versionId)
    // })
  }
    

  return (
    <div className="App">
      <h2>プロフィール情報フォーム</h2>
      <form>
        <label>プロフィール写真:</label>
        <input
          type="file"
          ref={profilePhotoInput}
          onChange={handleProfilePhotoChange}
        />
        {profilePhotoPreview && <img src={profilePhotoPreview} className="preview-image" alt="プロフィール写真" />}
        <br />

        <label>名前:</label>
        <input type="text" id="name" name="name" />
        <br />

        <label>Email:</label>
        <input type="email" id="email" name="email" />
        <br />

        <label>学校名:</label>
        <input type="text" id="school" name="school" />
        <br />

        <label>写真:</label>
        <input
          type="file"
          multiple
          ref={photosInput}
          onChange={handlePhotosChange}
        />
        <div>
          {photosPreview.map((src, index) => (
            <div key={index}>
              <img src={src} className="preview-image" alt="写真プレビュー" />
              <span
                className="remove-image"
                onClick={() => removePhoto(index)}
              >
                削除
              </span>
            </div>
          ))}
        </div>
        <br />

        {/* <button type="button" onClick={handleSubmit}>
          送信
        </button> */}
        <button type="button" onClick={testSendPhoto}>
          送信
        </button>
      </form>
    </div>
  );
}

export default App;
