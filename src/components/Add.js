import React from "react"
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



export default function Add() {

    const [formData, setFormData] = React.useState({ name: "", type: "", price: 0, imgURL: "", imgName: "" })
    const [productImg, setProductImg] = React.useState({});
    const [percentage, setPercentage] = React.useState(null)
    const [imgIsSelected, setimgIsSelected] = React.useState(false);

    const types = ['image/png', 'image/jpeg']; // image types


    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    function productImgHandler(e) {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setimgIsSelected(true)
        }
        else { alert('Please select a valid image type (jpg or png)'); }
    }
    async function Upload(event) {
        event.preventDefault()
        const storageRef = ref(storage, '' + productImg.name);
        const uploadTask = uploadBytesResumable(storageRef, productImg);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setPercentage(progress)
                switch (snapshot.state) {
                    case 'paused': console.log('Upload is paused'); break;
                    case 'running': console.log('Upload is running'); break;
                    default: break;
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProductImg(downloadURL)
                    setFormData((prev) => ({ ...prev, imgURL: downloadURL, imgName: productImg.name }))
                });
                console.log(productImg)
            }
        );
    }

    async function handleSubmit(event) {
        event.preventDefault()

        addDoc(collection(db, "pets"), {
            name: formData.name,
            price: formData.price,
            type: formData.type,
            imgUrl: productImg,
            imgName: formData.imgName,
        });
        event.target.reset()
        setPercentage(null)
        setimgIsSelected(false)
        //setFormData((prev) => ({ ...prev, type: '-- Type --' }))
        window.location.reload();
    }
    console.log(percentage)
    return (
        <div className="add--div1">
            <div className="add--div2">
                <div className="add--div3">

                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-5 gap-5">
                            <input
                                type="text"
                                className="add--name"
                                placeholder="Name"
                                onChange={handleChange}
                                name="name"
                            />
                            <select type="select" className="add--type"
                                value={formData.type} onChange={handleChange} name="type">
                                <option value="">-- Type --</option>
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                            </select>
                            <input
                                type="number"
                                className="add-price"
                                placeholder="Price"
                                onChange={handleChange}
                                name="price"
                            />
                            <input
                                type="file"
                                className="add--upload--img"
                                onChange={productImgHandler}
                                name="imgUrl"
                            />
                            <img
                                alt=""
                                src={require("../images/upload.png")}
                                onClick={!imgIsSelected ? null : Upload}
                                className={imgIsSelected ? "add--upload--field--selected" :
                                    "disable add--upload--field--Notselected"}
                            />
                        </div>

                        <input
                            disabled={percentage == null || percentage < 100}
                            type="submit"
                            value="Add"
                            className="add--submit--button"
                        />

                    </form>
                </div>
            </div>
        </div>

    )
}
