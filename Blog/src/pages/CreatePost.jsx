import {Button, FileInput, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function CreatePost() {
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
            <div className="flex items-center justify-center gap-5 p-3 border-4 border-dotted border-blue-400 mt-5">
                <FileInput typeof='title' accept='image/*'/>
                <Button size='sm' type='button' outline gradientDuoTone='purpleToBlue' >Upload image</Button>
            </div>
            <ReactQuill theme="snow" className='h-96 mt-5 my-16  dark:text-white' />
            <Button gradientDuoTone='purpleToPink'>Publish</Button>
        </form>


    </div>
  )
}
