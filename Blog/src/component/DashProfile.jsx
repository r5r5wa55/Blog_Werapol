import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function DashProfile() {
  const {currenUser} = useSelector(state => state.user)
  const [imageFileUrl,setImageFileUrl] = useState(null)
  const [imageFile ,setimageFile] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);


  const filePicker = useRef();
  const handleChangeImage = (e)=>{
    const file = e.target.files[0];
    if(file){
      setimageFile(file)
      setImageFileUrl(URL.createObjectURL(file));
    }
  
  }
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if 
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*');
    //     }
    //   }
    // }
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageFileUploadError(
          'ไฟล์ที่เลือกไม่ใช่รูปภาพ (หรือไฟล์มีขนาดเกิน 2MB)'
        );
        setImageFileUploadProgress(null);
        setimageFile(null);
        setImageFileUrl(null);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageFileUrl(downloadURL);
        setImageFileUploadError(null);
      });
    }
  );
};

  return (
    <div className="max-w-lg w-full m-auto ">
      <div className="  text-center">
        <h1 className="text-3xl font-bold ">Profile</h1>
        <form className="flex flex-col gap-4 ">
            <input type="file" 
            accept="image/*" 
            onChange={handleChangeImage} 
            ref={filePicker} 
            hidden
              />
            <div className="relative w-64 h-64 self-center cursor-pointer shadow-md overflow-hidden rounded-full my-10"   onClick={() => filePicker.current.click()} >
              {imageFileUploadProgress && (
              <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgba(62, 152, 199, ${
                        imageFileUploadProgress / 100
                      })`,
                    },
                  }}
                />
              )}
              <img 
                className={`rounded-full w-full h-full dark:border-amber-50 bg-contain border-slate-500 border-4 object-cover cursor-pointer 
                ${
                  imageFileUploadProgress &&
                  imageFileUploadProgress < 100 &&
                  'opacity-60'
                }`}
                src={imageFileUrl || currenUser.profilePicture} 
                alt="" 
           
              />
            </div>  
              {imageFileUploadError &&
                 <Alert color='red'>{imageFileUploadError}</Alert>
              }
              <TextInput 
                id='username'
                placeholder="user" 
                defaultValue={currenUser.username}
              />
              <TextInput 
                id='email'
                defaultValue={currenUser.email}
                placeholder="email"
              />
              <TextInput 
                id='password'
                type="password"
                placeholder="password"
                defaultValue='*********'
            /> 
            <Button gradientDuoTone='purpleToBlue' outline type="submit">UpLoad </Button>
        </form>
        <div className="flex justify-between mb-4">
          <span className="cursor-pointer text-red-600 dark:text-red-400">Delete Account</span>
          <span>Sign Out</span>
        </div>
      </div>
      
    </div>
  )
}
