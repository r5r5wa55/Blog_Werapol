import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { upDateStart ,upDateSuccess,upDateFailure,deleteUserFailure,deleteUserStart,deleteUserSuccess, signoutSuccess} from '../../src/redux/user/userSilce';
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";


export default function DashProfile() {
  const {currenUser,error,loading} = useSelector(state => state.user)

  const [imageFileUrl,setImageFileUrl] = useState(null)
  const [imageFile ,setimageFile] = useState(null)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading ,setImageFileUploading] = useState(false);
  const [UserSuccess,setUserSuccess] = useState(null);
  const [UserError,setUserError] = useState(null);
  const [formData ,setFormData] = useState([])
  const [modle ,setModle] = useState(false)
  const navigator = useNavigate();

  const filePicker = useRef();
  const dispatch=useDispatch();
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
    setImageFileUploading(true);
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
        setImageFileUploading(false)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageFileUrl(downloadURL);
        setFormData({...formData,profilePicture:downloadURL});
        setImageFileUploadError(null);
        setImageFileUploading(false)
      });
    }
    );



  };
  const handleChange=(e)=>{
  setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit= async (e)=>{
    setUserError(null)
    setUserSuccess(null)

    e.preventDefault();
    if(Object.keys(formData).length===0){
      setUserError("No chang")
      
      return;
    }
    if(imageFileUploading){
      setUserError("Please wait image Upload")
      return;
    }
    try {
      dispatch(upDateStart());
      const res = await fetch(`/api/user/update/${currenUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(!res.ok){
        dispatch(upDateFailure(data.message));
      }else{
        dispatch(upDateSuccess(data))
        setUserSuccess("User Profile update Successfully")
        setTimeout(()=>{
          setUserSuccess(null)
        },1500)
      }
    } catch (error) {
        dispatch(upDateFailure(error.message))
    }
    // console.log(Object.keys(formData));
  }

  const handleDeleteUser =async ()=>{
    setModle(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currenUser._id}`,{
        method:'DELETE',
      })
      const data = await res.json()
      if(!res.ok){
        dispatch(deleteUserFailure(data.message))
      }else{
        navigator('/sign-in')
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
        dispatch(deleteUserFailure(error.message))
    }

  }
  
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
   
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-lg w-full m-auto ">
      <div className="  text-center">
        <h1 className="text-3xl font-bold ">Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input type="file" 
            accept="image/*" 
            onChange={handleChangeImage} 
            ref={filePicker} 
            hidden
              />
            <div className="relative w-64 h-64 self-center cursor-pointer shadow-md  rounded-full my-10 cyr"   onClick={() => filePicker.current.click()} >
              {imageFileUploadProgress && (
              <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}`}
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
                src={!currenUser.profilePicture ? imageFileUrl : currenUser.profilePicture}
                alt="" 
           
              />
             
            </div>  
              <TextInput 
                id='username'
                placeholder="user" 
                defaultValue={currenUser.username}
                onChange={handleChange}
              />
              <TextInput 
                id='email'
                defaultValue={currenUser.email}
                placeholder="email"
              onChange={handleChange}
              />
              <TextInput 
                id='password'
                type="password"
                placeholder="password"
                defaultValue='*********'
              onChange={handleChange}
            /> 
            <Button gradientDuoTone='purpleToBlue' outline type="submit" disabled={loading || imageFileUploading } >
              {loading ? 'loading...' : 'update'}
            
            </Button>
            {
              currenUser.isAdmin && ( 
              <Link to='/create-post'> 
                <Button 
                  gradientDuoTone='purpleToPink'
                  type="submit"
                  className="w-full"

                  >
                  Create a post
                </Button>
              </Link>
            )
          
            }
        </form>
        <div className="flex justify-between mt-5">
          <span 
            className="cursor-pointer text-red-600 dark:text-red-400"
            onClick={()=>setModle(true)}
          >
            Delete Account
          </span>
          <span onClick={handleSignout} className="cursor-pointer">Sign Out</span>
        </div>
          {imageFileUploadError &&
                 <Alert color='red'>{imageFileUploadError}</Alert>
          }
          {
            
            UserSuccess && 
            <Alert color='green'>{UserSuccess}</Alert>
          }
          {
            UserError &&
            <Alert color='red'>{UserError}</Alert>
          }
           {
            error &&
            <Alert color='red'>{error}</Alert>
          }
          <Modal show={modle} size="md" onClose={() => setModle(false)} popup>
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-20 w-20 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteUser}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setModle(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
       
      </div>
      
    </div>
  )
}
