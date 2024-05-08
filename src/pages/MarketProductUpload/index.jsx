import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import CurrencyInput from 'react-currency-input-field'
import ReactImageUploading from 'react-images-uploading'
import ReactTextareaAutosize from 'react-textarea-autosize';
import { IoAdd, IoCloseOutline, IoTrashBinOutline } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineAddAPhoto } from 'react-icons/md';
import { TbCircleDotFilled } from "react-icons/tb";

import './main.css'
import { useAuthContext } from '../../context/AuthContext';
import Alert from '../../components/Alert';
import { AiFillCheckCircle, AiFillExclamationCircle } from 'react-icons/ai';
import MainSpinner from '../../components/MainSpinner';

function index({ type='new' }) {
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('')
    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [categories, setCategories] = useState([]);
    const [inputSpec, setInputSpec] = useState([]);
    const [specs, setSpecs] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const [images, setImages] = useState([]);
    const maxNumber = 6;
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    const imageArray = images.map(img => img.file);
    console.log(imageArray)

    const { user, token } = useAuthContext();

    function handleInputSpec() {
        if (inputSpec) {
            setSpecs(prev => [...prev, inputSpec]);
            setInputSpec('')
        }
    }

    function handleRemoveInputSpec(itemIndex) {
        const updatedArray = specs.filter((_, index) => index !== itemIndex);
        setSpecs(updatedArray);
    }

    // HANDLE ON FETCH FAILURE
    function handleFailure(mess) {
        setIsError(true);
        setMessage(mess)
        setTimeout(() => {
            setIsError(false);
            setMessage('')
        }, 3000);
    }

    // HANDLE FETCH STATE RESET
    function handleReset() {
        setIsError(false);
        setMessage('')
        setIsSuccess(false);
    }


    function handleUploadProduct() {

    }

    useEffect(function() {
        async function handleFetchCategories() {
            try {

                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/market/all-category`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if(!res.ok) throw new Error('Something went wrong');
                const data = await res.json();
                if(data.status !== 'success') throw new Error(data.message);

                setCategories(data?.data?.categories)

            } catch(err) {
                console.log(err.message)
            }
        }
        handleFetchCategories();
    }, []);

    async function handleUploadProduct(e) {
        try {
            e.preventDefault();
            handleReset();
            setIsLoading(true);

            if(type === 'new' && (images?.length === 0)) throw new Error('Images cannot be left empty');

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/market/create-product`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name, description, price, category, specifications: specs, discountPercentage })
            });

            console.log(res);
            if (!res.ok) throw new Error('Something went wrong!');
            const data = await res.json();

            console.log(data);
            if (data.status !== "success") throw new Error(data.message);

            // UPLOAD IMAGE
            const formData = new FormData();
            const id = data.data.product._id
            if (images && images.length !== 0) {
                handleUploadImgs(formData, id);
            }

            setIsSuccess(true);
            setMessage(data.message);
            setTimeout(function () {
                setIsSuccess(false);
                setMessage("");
            }, 2000);

        } catch (err) {
            handleFailure(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleUploadImgs(formData, id) {
        try {
            setIsLoading(true);

            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i].file);
            }
            
            await fetch(`${import.meta.env.VITE_SERVER_URL}/market/product-imgs/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: formData,
                mode: "no-cors"
            });
        } catch (err) {
            console.log(err.message);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Header />

            {isLoading && (
                <MainSpinner />
            )}


            <div className="product--form">
                <p className='product-form-heading'>{type === 'new' ? 'Upload' : 'Update'} Product</p>
                <form className='form product--upload-form' onSubmit={(e) => handleUploadProduct(e)}>
                    <div className="form--item">
                        <label htmlFor="" className="form--label">Product Name</label>
                        <input type="text" className="form--input" placeholder='Enter your product name' value={name} onChange={e => setName(e.target.value)} />
                    </div>

                    <ReactImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        acceptType={["jpg", "png"]}
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                        }) => (
                            <div className='multiple-image-container'>
                                {imageList?.length > 0 ? (
                                    <span>
                                        <button type='button' className='main-btn' onClick={onImageRemoveAll}>Remove All Images <IoCloseOutline /></button>
                                        <button type='button' className='main-btn' onClick={onImageUpload}><IoAdd /></button>
                                    </span>
                                ) : (
                                    <button type='button' className='main-btn' onClick={onImageUpload}><MdOutlineAddAPhoto /> Add Multiple Images</button>
                                )}
                                <div className='image-grid'>
                                    {imageList?.map((image, index) => (
                                        <div key={index} className="image-item">
                                            <img src={image.data_url} />
                                            <div className="image-item__btn-wrapper">
                                                <button type='button' onClick={() => onImageUpdate(index)}><CiEdit /> Update </button>
                                                <button type='button' onClick={() => onImageRemove(index)}><IoTrashBinOutline /> Remove </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </ReactImageUploading>

                    <div className="form--item">
                        <label htmlFor="description" className="form--label">Product Description (Up to 400 Characters)</label>
                        <ReactTextareaAutosize id='description' className='form__textarea' defaultValue="" value={description} onChange={e => setDescription(e.target.value)} placeholder='Enter a description' />
                    </div>

                    <div className="form--item">
                        <label htmlFor="specs" className="form--label">Specifications</label>

                        <div className="input--box">
                            <input id='specs' type="text" placeholder='Enter list of specifications' className='form--input' value={inputSpec} onChange={(e) => setInputSpec(e.target.value)} />
                            <button type='button' onClick={handleInputSpec}>Add <span><IoAdd /></span></button>
                        </div>

                        <ul className="specs--list">
                            {specs?.map((spec, index) => (
                                <li key={index}>
                                    <TbCircleDotFilled />
                                    {spec} <span onClick={() => handleRemoveInputSpec(index)}><IoCloseOutline /></span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="form--grid-prod">
                        <div className="form--item">
                            <label htmlFor="category" className="form--label">Product Category</label>
                            <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="form--input form--select">
                                <option hidden selected>-- Select a category --</option>
                                {categories.map(category => (
                                    <option value={category.categoryName}>{category.categoryName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form--grid-prod-2">
                            <div className="form--item">
                                <label htmlFor="amount" className="form--label">Product Price</label>
                                <CurrencyInput
                                    className="form--input"
                                    id="amount"
                                    placeholder='Price'
                                    value={price}
                                    defaultValue={price}
                                    onValueChange={(value, _) => setPrice(value)}
                                    prefix="₦ "
                                />
                            </div>
                            <div className="form--item">
                                <label htmlFor="stockAvail" className="form--label">Discount Percentage in (%)</label>
                                <input type="number" placeholder='Discount percent' id='discountPercentage' value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} className="form--input" />
                            </div>
                        </div>
                    </div>

                    <div className="form--item">
                        <button type="submit" className='form--btn' style={{ marginLeft: 'auto' }}>Create Product</button>
                    </div>
                </form>
            </div>


            {(isError || isSuccess) && (
                <Alert alertType={`${isSuccess ? "success" : isError ? "error" : ""}`}>
                    {isSuccess ? (
                        <AiFillCheckCircle className="alert--icon" />
                    ) : isError && (
                        <AiFillExclamationCircle className="alert--icon" />
                    )}
                    <p>{message}</p>
                </Alert>
        )}
        </>
    )
}

export default index
