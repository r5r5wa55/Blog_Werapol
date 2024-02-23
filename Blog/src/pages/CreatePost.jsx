import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function CreatePost() {
    const [file,setFile] = useState();
    const [imageUploadProgress ,setImageUploadProgress] = useState(null);
    const [imgagUploadError,setImageUploadError] = useState(null)
    const [ formData ,setFromData] =  useState({})
    
    const handleUploadImage = async()=>{
        try {
            if(!file){
                setImageUploadError('Please select an image')
                return;
            }   
            setImageUploadError(null)
            const storage = getStorage(app);
            const flieName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage,flieName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress =    
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0))

                },
                (error)=>{
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null)
                    console.log(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        setImageUploadError(null)
                        setImageUploadProgress(null)
                        setFromData({...formData,image:downloadURL})
                    })
                }
            )
        } catch (error) {
            setImageUploadError('image upload failed')
            setImageUploadProgress(null)
            console.log(error);
        }
        
   
    }

    // console.log(file);
  return (
    <div className="max-w-5xl mx-auto p-3 min-h-screen">
        <h1 className="text-center font-sans text-4xl py-5 font-bold">Create a Post</h1>
        <form className='flex flex-col'>
            <div className="flex flex-col sm:flex-row gap-5">
                <TextInput type="text" name="" id="title" placeholder='title' className='flex-1'/>
                <Select>
                    <option value='uncategory'>Select a category</option>
                    <option value='javascript'>javascript</option>
                    <option value='react.js'>react.js</option>
                    <option value='next.js'>next.js</option>
                </Select>
            </div>
            <div className="flex items-center justify-between gap-5 p-3 border-4 border-dotted border-blue-400 mt-5 ">
                

                <FileInput typeof='title' accept='image/*'  onChange={(e)=>setFile(e.target.files[0])}/>

                <Button size='sm' type='button' outline gradientDuoTone='purpleToBlue' onClick={handleUploadImage} >
                    {

                       imageUploadProgress ?
                       (
                        <CircularProgressbar className='w-16 h-16' value={imageUploadProgress} text={`${imageUploadProgress || 0 }%`}/>
                       ) : 'Upload image'
                    }
                    
                   
                </Button>
            </div>
                {
                    formData.image && 
                    (
                            <img src={formData.image} alt="" className="w-full h-72 object-cover mt-5" />
                    )
                }
                {
                    imgagUploadError && 
                    (   
                        <Alert color='red' className="mt-5">{imgagUploadError}</Alert>
                    )
                }
            <ReactQuill theme="snow" className='h-96 mt-5 my-16  dark:text-white' />
            <Button gradientDuoTone='purpleToPink'>Publish</Button>
        </form>


    </div>
  )
}
