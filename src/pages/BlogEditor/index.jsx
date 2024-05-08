import React, { useEffect, useRef, useState } from "react";
// import "../blogDetails/blogDetails.css";
import Header from "../../components/Header";
import { Editor } from '@tinymce/tinymce-react';
import '../../assets/css/contentArea.css';
import { MdOutlineAddAPhoto } from "react-icons/md";
import ConfirmBlogInfo from "./components/ConfirmBlogInfo";
import MainSpinner from "../../components/MainSpinner";


function Loading() {
    return <p style={{ fontSize: '1.4rem', color: '#555', cursor: 'auto' }}>Loading Editor...</p>
}

function EditorPage() {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [loadImg, setLoadImg] = useState(false);
    const [loadEditor, setLoadEditor] = useState(true);

    const [scrollLocation, setScrollLocation] = useState(0);
    const [transform, setTransform] = useState(false);

    const titleRef = useRef(null);
    const editorRef = useRef(null);
    let timeoutId;

    function resetSaving() {
        setIsSaving(false);
        setSaved(false)
    }

    function handleSetContentChange(e) {
        resetSaving();
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        setIsSaving(true);
        timeoutId = setTimeout(function () {
            if(titleRef.current) {
                setTitle(titleRef.current.value)
            }
            if (editorRef.current) {
                setContent(editorRef.current.getContent());
            }
            setIsSaving(false);
            setSaved(true)
        }, 2500);
    };

    useEffect(function() {
        console.log(content, title)
    }, [])

    function handleImageChange(event) {
        resetSaving();
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        setIsSaving(true);
        timeoutId = setTimeout(function () {
            const file = event.target.files[0];
            if (file) {
                setImageFile(file);
                const imageUrl = URL.createObjectURL(file);
                setImagePreview(imageUrl);
            }
            setIsSaving(false);
            setSaved(true);
        }, 1000)
    };

    useEffect(() => {
        titleRef.current.focus();
    }, []); 

    useEffect(function () {
        setTimeout(() => {
            setSaved(false)
        }, 1000);
    }, [saved]);


    useEffect(function () {
		function controlNavbar() {
            const currScrollLocation = window.scrollY;
            setScrollLocation(currScrollLocation);
			// console.log(currScrollLocation, scrollLocation);

            if(currScrollLocation > scrollLocation) {
                setTransform(true)
            } else if (currScrollLocation < scrollLocation) {
                setTransform(false)
            }
		}
		window.addEventListener('scroll', controlNavbar)
		controlNavbar()
		return () => {
			window.removeEventListener('scroll', controlNavbar)
		}
	}, [scrollLocation])


    return (
        <div style={{ position: 'relative' }}>

            <Header scrollStyle={transform ? { transform: 'translateY(-100px)' } : { transform: 'translateY(0)' }} valid={title && imageFile && content} setOpenConfirm={setOpenConfirm} isSaving={isSaving} saved={saved} />

            {loadImg && <MainSpinner />}

            <div className='editor__container' style={{ maxWidth: '90rem', margin: '4.8rem auto 0' }}>
                <input type="text" className="title--input" style={{ fontSize: '1.6rem', color: '#292929', outline: 'none' }} placeholder="Title..." onChange={handleSetContentChange}  ref={titleRef} />


                {/* {(title || imageFile || content) && ( */}
                    <div className='form-image-card'>
                        <input type='file' id='form-image-input' name='image' onChange={handleImageChange} accept="image/*" />
                        <label htmlFor='form-image-input' style={imageFile ? { height: '40rem' } : {}} className={`${imagePreview ? 'hoverable' : ''}`} id='form-image-label'>
                            <span>
                                <MdOutlineAddAPhoto className='form-image-icon' />
                                <p>Add Main Image</p>
                            </span>
                            {imagePreview && <img id='form-image' src={imagePreview} alt='Preview' />}
                        </label>
                    </div>
                {/* )} */}


                <div className='content-area'>
                    {loadEditor && <Loading />}
                    <Editor
                        onLoadContent={() => setLoadEditor(false)}
                        apiKey='ttzk0qhebaieli5lol9l6ms1rob6w876ged9jkkco3nucr5c'
                        onInit={(evt, editor) => {
                            editorRef.current = editor;
                        }}
                        init={{
                            selector: "#editor",
                            plugins: "autoresize quickbars image media table hr paste anchor codesample autolink charmap emoticons code link lists searchreplace checklist mediaembed casechange pageembed permanentpen mergetags powerpaste autocorrect",
                            skin: "snow",
                            icons: "light",
                            menubar: false,
                            toolbar: false,
                            inline: true,
                            content_style: "@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap'); body { font-family: 'Montserrat', serif; font-size: 14pt; color: #292929; min-height: 20rem; }",
                            placeholder: "Write your blog content...",
                            quickbars_selection_toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline link | h1 h2 h3 h4 h5 | blockquote | checklist numlist bullist indent outdent lineheight casechange ",
                            quickbars_insert_toolbar: "blocks fontfamily fontsize | bold italic underline link | h1 h2 h3 h4 h5 | blockquote | checklist numlist bullist indent outdent | image media table hr align lineheight anchor codesample autolink charmap emoticons code link lists searchreplace checklist mediaembed casechange pageembed permanentpen mergetags powerpaste autocorrect ",
                            automatic_uploads: true,
                            file_picker_types: 'image',
                            // file_picker_callback: (cb, value, meta) => {
                            //     const input = document.createElement('input');
                            //     input.setAttribute('type', 'file');
                            //     input.setAttribute('accept', 'image/*');

                            //     input.addEventListener('change', (e) => {
                            //         const file = e.target.files[0];

                            //         const reader = new FileReader();
                            //         reader.addEventListener('load', () => {
                            //             const id = 'blobid' + (new Date()).getTime();
                            //             const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                            //             const base64 = reader.result.split(',')[1];
                            //             const blobInfo = blobCache.create(id, file, base64);
                            //             blobCache.add(blobInfo);

                            //             cb(blobInfo.blobUri(), { title: file.name });
                            //         });
                            //         reader.readAsDataURL(file);
                            //     });

                            //     input.click();
                            // },
                            file_picker_callback: (cb, value, meta) => {
                                const input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');
                            
                                input.addEventListener('change', (e) => {
                                    const file = e.target.files[0];
                                    setLoadImg(true)

                                    // Upload image to Cloudinary
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    formData.append('upload_preset', 'h6vwx51x'); 
                            
                                    fetch('https://api.cloudinary.com/v1_1/dy3bwvkeb/upload', {
                                        method: 'POST',
                                        body: formData
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        setLoadImg(false)
                                        cb(data.secure_url, { title: file.name });
                                    })
                                    .catch(error => {
                                        setLoadImg(false);
                                        console.error('Error uploading image to Cloudinary:', error);
                                    })
                                });
                            
                                input.click();
                            }
                        }}
                        onKeyUp={handleSetContentChange}

                    />
                </div>
            </div>

            {(openConfirm) && (
                <ConfirmBlogInfo
                    setOpenConfirm={setOpenConfirm}
                    handleImageChange={handleImageChange}
                    imagePreview={imagePreview}
                    imageFile={imageFile}
                    title={title}
                    content={content}
                    titleRef={titleRef}
                    editorRef={editorRef}
                    setImagePreview={setImagePreview}
                    setImageFile={setImageFile}
                    setTitle={setTitle}
                    setContent={setContent}
                />
            )}
        </div>
    );
}

export default EditorPage;
