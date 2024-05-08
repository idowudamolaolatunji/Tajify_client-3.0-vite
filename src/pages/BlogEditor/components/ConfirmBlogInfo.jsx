import React, { useCallback, useState } from 'react'
import { AiFillCheckCircle, AiFillExclamationCircle, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import CurrencyInput from 'react-currency-input-field';
import Alert from '../../../components/Alert';
import MainSpinner from '../../../components/MainSpinner';


function ConfirmBlogInfo({ setOpenConfirm, handleImageChange, imagePreview, imageFile, title, content, titleRef, editorRef, setImagePreview, setImageFile, setTitle, setContent }) {
    const [toggle, setToggle] = useState('free');
    const [tags, setTags] = useState([]);
    const [previewDescription, setPreviewDescription] = useState();
    const [previewTitle, setPreviewTitle] = useState(title);
    const [category, setCategory] = useState('')
    const [count, setCount] = useState(0);
    const [amount, setAmount] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const maxCount = 200;
    const { user, token } = useAuthContext();

    function handleSetDescription(e) {
        const inputText = e.target.value;
        if (inputText.length <= maxCount) {
            setPreviewDescription(inputText);
            setCount(inputText.length);
        }
    };

    function handleRemoveTag(index) {
        setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    }

    function handleCloseModal() {
        setOpenConfirm(false);
    }

    function handleClearContent() {
        setImagePreview(null)
        setImageFile(null);
        setTitle('')
        setContent('')
        if (titleRef.current) {
            titleRef.current.value = ''
        }
        if (editorRef.current) {
            editorRef.current.setContent('<p></p>');
        }
    }

    // HANDLE FETCH STATE RESET
    function handleReset() {
        setIsError(false);
        setMessage('')
        setIsSuccess(false);
    }

    // HANDLE ON FETCH FAILURE
    function handleFailure(mess) {
        setIsError(true);
        setMessage(mess)
        setTimeout(() => {
            setIsError(false);
            setMessage('')
        }, 2000);
    }

    async function handleSubmitPost() {
        try {
            console.log('Blog posting...')
            handleReset();
            setIsLoading(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/upload`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: previewTitle,
                    content,
                    preview: previewDescription,
                    tags: tags,
                    category: category,
                    type: toggle,
                    isPremium: toggle === 'premium' ? true : false,
                    blogPrice: amount || 0,
                    author: user?.username
                })
            });

            console.log(res);
            if (!res.ok) throw new Error('Something went wrong!')
            const data = await res.json();
            if (data.status !== 'success') {
                throw new Error(data.message);
            }

            const formData = new FormData();
            const id = data.data.blog._id;
            handleUploadImg(formData, id)

            console.log(res, data);
            setIsSuccess(true);
            setMessage(data.message)
            setTimeout(() => {
                setIsSuccess(false);
                setMessage('');
                handleCloseModal();
                handleClearContent()
            }, 1900);
        } catch (err) {
            handleFailure(err.message);
        } finally {
            setIsLoading(false)
        }
    }

    async function handleUploadImg(formData, id) {
        try {
            setIsLoading(true)
            formData.append('image', imageFile);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/upload-img/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: formData,
                mode: "no-cors"
            });
            if (!res.ok) throw new Error('Something went wrong!');
        } catch (err) {
            console(err.message);
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddTags = useCallback((event) => {
        if (event.key !== 'Enter') {
            return;
        }
        const newTag = event.target.value.trim();
        if (newTag !== '') {
            setTags((prevTags) => {
                if (!prevTags.includes(newTag) && prevTags.length < 5) {
                    return [...prevTags, newTag];
                }
                return prevTags;
            });
            event.target.value = '';
        }
    }, []);


    return (
        <>
            {isLoading && <MainSpinner />}
            <div className='confirm--container'>
                <AiOutlineClose className="confirm--icon" onClick={handleCloseModal} />

                <div className="preview--grid">
                    <div className="preview--left">
                        <p className="preview--title">Blog Preview</p>
                        <div className="preview--img">

                            <div className='form-image-card'>
                                <input type='file' id='form-image-input' name='image' onChange={handleImageChange} accept="image/*" />
                                <label htmlFor='form-image-input' style={{ height: '24rem' }} className={`${imagePreview ? 'hoverable' : ''}`} id='form-image-label'>
                                    <span>
                                        <MdOutlineAddAPhoto className='form-image-icon' />
                                        <p>Add Main Image</p>
                                    </span>
                                    {imagePreview && <img src={imagePreview} alt='Preview' />}
                                </label>
                            </div>
                        </div>
                        <div className="preview--form">
                            <input type="text" className="preview--input" placeholder='Enter a preview title..' value={previewTitle} onChange={e => setPreviewTitle(e.target.value)} />
                            <div className="preview--textarea-box">
                                <textarea type="text" className="preview--textarea" placeholder='Enter a preview description..' value={previewDescription} onChange={handleSetDescription} />
                                <span className='preview--count'>{count} / {maxCount}</span>
                            </div>
                        </div>
                        <p className='preview--text'><span>Note</span>: Changes here will affect how your story appears in public places like homepage and in subscriber's notification — not necessarily the contents of the blog itself.</p>
                    </div>


                    <div className="preview--right">
                        <span className='preview--main'>Publishing to: <p className="preview--title">{user?.username}</p></span>
                        <p className="preview--text">Add or change topics (up to 5) so readers know what your story is about</p>

                        <select type="text" className='preview--select' value={category} onChange={e => setCategory(e.target.value)}>
                            <option hidden>- Select a Category -</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="sport">Sport</option>
                            <option value="lifestyle">Lifestyle</option>
                            <option value="culture">Culture</option>
                            <option value="future">Future</option>
                            <option value="travel">Travel</option>
                            <option value="finance">Finance</option>
                            <option value="health">Health</option>
                            <option value="technology">Technology</option>
                        </select>
                        <div className='preview--tags-box'>
                            <input type="text" className='preview--tags' placeholder='Tags..' onKeyDown={(e) => handleAddTags(e)} />
                            <span className='tags'>
                                {tags.length > 0 && tags?.map((tag, i) => (
                                    <span className='tag'>{tag} <AiOutlineClose className='tag--icon' onClick={() => handleRemoveTag(i)} /></span>
                                ))}
                            </span>
                        </div>

                        <div className="preview--toggle-box">
                            <span className='preview--toggle'>
                                <span className={`${toggle === 'free' ? 'active' : ''}`} onClick={() => setToggle('free')}>Free</span>
                                <span className={`${toggle === 'premium' ? 'active' : ''}`} onClick={() => setToggle('premium')}>Premium</span>
                            </span>

                            {(toggle === 'premium') && (
                                <CurrencyInput
                                    className="preview--price"
                                    defaultValue={amount}
                                    value={amount}
                                    decimalsLimit={2}
                                    required
                                    prefix='₦ '
                                    placeholder='Set Blog Price..'
                                    onValueChange={(value, _) => setAmount(value)}
                                />
                            )}
                        </div>

                        <p className="preview--text"><Link to={'/'} style={{ textDecoration: 'underline' }}>Learn more</Link>{' '}about what happens to your post when you publish.</p>

                        <button className='publish--button allow--button btn' onClick={handleSubmitPost}>Publish now!</button>
                    </div>
                </div>
            </div>

            {(isSuccess || isError) &&
                <Alert alertType={`${isSuccess ? "success" : isError ? "error" : ""}`}>
                    {isSuccess ? (
                        <AiFillCheckCircle className="alert--icon" />
                    ) : isError && (
                        <AiFillExclamationCircle className="alert--icon" />
                    )}
                    <p>{message}</p>
                </Alert>}
        </>
    )
}

export default ConfirmBlogInfo;
