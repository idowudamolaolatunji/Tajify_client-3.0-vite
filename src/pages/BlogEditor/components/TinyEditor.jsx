import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { MdOutlineAddAPhoto } from 'react-icons/md';

import '../../assets/css/contentArea.css';

function TinyEditor() {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null)


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };


    async function handleImageUpload (blobInfo, success, failure) {
        const cloudName = 'dy3bwvkeb';
        const uploadPreset = 'h6vwx51x';
        const formData = new FormData();
        formData.append("file", blobInfo.blob(), blobInfo.filename());
        formData.append("upload_preset", uploadPreset);
      
        try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
          });
          if (!res.ok) {
            throw new Error('Image upload failed');
          }
          const data = await res.json();
          console.log(data);
      
          if (success && typeof success === "function") {
            success(data.secure_url);
          }
        } catch(err) {
          console.error(err);
          if (failure && typeof failure === "function") {
            failure("Image upload failed");
          }
        }
      }

  return (
        <div className='editor__container' style={{ maxWidth: '90rem', margin: '4.8rem auto 0' }}>
            {/* <Editor 
                apiKey='ttzk0qhebaieli5lol9l6ms1rob6w876ged9jkkco3nucr5c'
                init={{
                    selector: "h1",
                    skin: "snow",
                    plugins: 'autoresize quickbars typography',
                    menubar: false,
                    inline: true,
                    toolbar: false,
                    content_style: "@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap'); body { font-family: 'Montserrat', serif; font-size: 28pt; color: #292929; outline: none; }",
                    placeholder: "Title..",
                    quickbars_insert_toolbar: "typography",
                    quickbars_selection_toolbar: "bold italic | h1 h2",
                }}
            /> */}


            {/* <div className='form-image-card'>
                <input type='file' id='form-image-input' name='image' onChange={handleImageChange} accept="image/*" />
                <label htmlFor='form-image-input' style={imageFile ? {height: '40rem'} : {}} className={`${imagePreview ? 'hoverable' : ''}`} id='form-image-label'>
                    <span>
                        <MdOutlineAddAPhoto className='form-image-icon' />
                        <p>Add Main Image</p>
                    </span>
                    {imagePreview && <img id='form-image' src={imagePreview} alt='Preview' />}
                </label>
            </div> */}

           
            <div className='content-area'>
                <Editor 
                    apiKey='ttzk0qhebaieli5lol9l6ms1rob6w876ged9jkkco3nucr5c'
                    init={{
                        selector: "#editor",
                        plugins: "autoresize quickbars image media table hr paste anchor codesample autolink charmap emoticons code link lists searchreplace checklist mediaembed casechange pageembed permanentpen mergetags powerpaste autocorrect",
                        skin: "snow",
                        icons: "light",
                        menubar: false,
                        toolbar: false,
                        
                        content_style: "@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap'); body { font-family: 'Montserrat', serif; font-size: 14pt; color: #292929; height: auto; }",
                        placeholder: "Tell your story...",
                        quickbars_selection_toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline link | h1 h2 h3 h4 h5 | blockquote | checklist numlist bullist indent outdent",
                        quickbars_insert_toolbar: "image media table hr align lineheight anchor codesample autolink charmap emoticons code link lists searchreplace checklist mediaembed casechange pageembed permanentpen mergetags powerpaste autocorrect",
                        images_upload_handler: handleImageUpload,
                    }}       
                />
            </div>
        </div>
  );
};

export default TinyEditor;