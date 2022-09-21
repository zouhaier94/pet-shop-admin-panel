import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase"
import { getStorage, ref, deleteObject } from "firebase/storage";
import React from "react";


export default function Card(props) {

    const deletePet = async (id) => {
        await deleteDoc(doc(db, 'pets', id));
        const storage = getStorage();
        const desertRef = ref(storage, props.imgName);
        await deleteObject(desertRef);
        window.location.reload();
    };

    return (
        <div className="card ">
            <span className="card--badge">{props.price}$</span>
            <img onClick={() => deletePet(props.id)} className="card--delete hover:bg-red-600" alt=""
                src={require("../images/del.png")} />
            <img className="card--img" src={props.img} alt="" />
            <div className="my-2 text-center">
                <div className="font-bold ">{props.name}</div>
            </div>
        </div>
    )
}