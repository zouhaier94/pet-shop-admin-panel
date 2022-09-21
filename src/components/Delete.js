import Card from "./Card"
import React from "react"
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../Firebase"


export default function Delete() {

    const [formData, setFormData] = React.useState({ choice: "all" })

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevState =>
            ({ ...prevState, [name]: value }))
    }

    const [data, setData] = React.useState([]);

    React.useEffect(() => {

        const fetchData = async () => {
            let list = [];
            try {

                const q = query(collection(db, "pets"));

                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {

                    list.push({ id: doc.id, ...doc.data() })

                });

                setData(list)

            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, []);

    //console.log(data)

    const cards = data.map(el => {

        if (formData.choice === "cats") {
            if (el.type === "cat") {
                return (
                    <Card
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        price={el.price}
                        img={el.imgUrl}
                        imgName={el.imgName}
                    />
                )
            }
        }
        else if (formData.choice === "dogs") {
            if (el.type === "dog") {
                return (
                    <Card
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        price={el.price}
                        img={el.imgUrl}
                        imgName={el.imgName}
                    />
                )
            }
        }
        else if (formData.choice === "all") {

            return (
                <Card
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    price={el.price}
                    img={el.imgUrl}
                    imgName={el.imgName}
                />
            )

        }
        return null;
    }
    )

    return (
        <div className="delete--div1">
            <div className="delete--div2">
                <select className="delete--div3"
                    id="choice" value={formData.choice} onChange={handleChange} name="choice">
                    <option value="all">All</option>
                    <option value="cats">Cats</option>
                    <option value="dogs">Dogs</option>
                </select>
            </div>
            <div className="delete--cards">
                {cards}
            </div>
        </div>
    )

}
