import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase"
import { getStorage, ref, deleteObject } from "firebase/storage";
import React from "react";


export default function Card(props) {

    const deletePet = async (id) => {

        if (window.confirm('Are you sure you want to delete pet?')) {
            // Delete it!
            await deleteDoc(doc(db, 'pets', id));
            const storage = getStorage();
            const desertRef = ref(storage, props.imgName);
            await deleteObject(desertRef);
            window.location.reload();
        }
    };

    return (
        <div className="card ">

            <img className="card--img" src={props.img} alt="" />

            <div className="my-2 text-center flex justify-center ">
                <div className="font-bold ">{props.name}</div>
                <div className="card--badge">{props.price}$</div>
                <img onClick={() => deletePet(props.id)} className="card--delete hover:bg-red-600" alt=""
                    src={require("../images/del.png")} />
            </div>
        </div>
    )
}