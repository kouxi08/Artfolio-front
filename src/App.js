import React, { useState, useRef } from 'react';
import './App.css';
import { formsend, splitLastDot,uploadFile } from './logic/access';

function App() {
  const url = process.env.REACT_APP_BACKEND_URL;

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState('');
  const [worksPhotos, setPhotos] = useState([]);
  const [worksPhotosPreview, setPhotosPreview] = useState([]);
  const profilePhotoInput = useRef(null);
  const worksPhotosInput = useRef(null);

  // formのinputの値
  const [nameInputValue, setNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [schoolnameInputValue, setSchoolnameInputValue] = useState("");



  // プロフィール写真のプレビューを更新
  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(file);

      const reader = new FileReader();
      reader.onload = (e) => setProfilePhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };
  const removeProfilePhoto = () => {
    setProfilePhoto(null);
    setProfilePhotoPreview('');
    profilePhotoInput.current.value = '';
  };


  // 複数の写真を追加し、プレビューを表示
  const handlePhotosChange = async (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = [...worksPhotos, ...files];
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
    worksPhotosInput.current.value = '';
  };

  // プレビューと状態から写真を削除
  const removePhoto = async(index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotosPreview((prev) => prev.filter((_, i) => i !== index));
  };

  
  // プロフィール写真と他の写真をMinIOにアップロード
  const handleSubmit = async () => {
    const body = {
      name: nameInputValue || "",
      email: emailInputValue || "",
      school: schoolnameInputValue || ""
    }
    const response = await formsend(url,'post',body)
    console.log(response.bkname)

    if (profilePhoto) {
    if (worksPhotos.length > 0) {
        const [filename, extension] = splitLastDot(profilePhoto.name);
        const key = "profile-" + filename + "-" + Math.random().toString(36).substring(2, 6 + 2) + "." + extension;
        const bucketName = "aaa"; // バケット名を変数にしました

        try {
            const result = await uploadFile(profilePhoto, key, bucketName);
            if (result) {
                console.log("Profile photo uploaded successfully.");
                // 必要に応じて追加の処理をここに記述
            } else {
                console.error("Failed to upload profile photo.");
                // エラーメッセージをユーザーに通知する処理を追加
            }
        } catch (error) {
            console.error("An error occurred during the upload process:", error);
            // エラーメッセージをユーザーに通知する処理を追加
        }

        for (const photo of worksPhotos) {
          const [filename,extension]  = splitLastDot(photo.name)
          const key = "works-" + filename + "-" + Math.random().toString(36).substring(2, 6 + 2) + "." + extension
          await uploadFile(photo,key,response.bkname);
        }

      }else{
        alert("作品の写真が選択されていません。")
        return
      }
    }else{
      alert("プロフィール写真が選択されていません。")
      return
    }


    alert("成功！！！！！！！")
  };

  return (
    <div className="App">
      <h2>プロフィール情報フォーム</h2>
      <form>
        <label>プロフィール写真:</label>
        <input type="file" ref={profilePhotoInput} onChange={handleProfilePhotoChange} name="prof"/>
        {profilePhotoPreview && (
          <div>
            <img src={profilePhotoPreview} className="preview-image" alt="プロフィール写真" />
            <span className="remove-image" onClick={removeProfilePhoto}>削除</span>
          </div>
        )}        <br />

        <label>名前:</label>
        <input type="text" id="name" name="name" value={nameInputValue} onChange={(event) => setNameInputValue(event.target.value)}/>
        <br />

        <label>Email:</label>
        <input type="email" id="email" name="email" value={emailInputValue} onChange={(event) => setEmailInputValue(event.target.value)}/>
        <br />

        <label>学校名:</label>
        <input type="text" id="school" name="school" value={schoolnameInputValue} onChange={(event) => setSchoolnameInputValue(event.target.value)}/>
        <br />

        <label>写真:</label>
        <input type="file" multiple ref={worksPhotosInput} onChange={handlePhotosChange} />
        <div>
          {worksPhotosPreview.map((src, index) => (
            <div key={index}>
              <img src={src} className="preview-image" alt="写真プレビュー" />
              <span className="remove-image" onClick={() => removePhoto(index)}>削除</span>
            </div>
          ))}
        </div>
        <br />
        <button type="button" onClick={handleSubmit}>送信</button>
      </form>
    </div>
  );
}

export default App;
