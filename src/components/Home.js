import React, { useState, useEffect } from 'react';
import { db } from "../config/firebaseConfig";
import { collection, onSnapshot/*, getDocs , addDoc, updateDoc, deleteDoc */} from "firebase/firestore";

function Home() {
    let [inventory, setInventory] = useState(null);

    useEffect(() => {
        onSnapshot(collection(db, 'inventory'), (snapshot) => {
            setInventory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
    }, []);

   console.log(inventory);
    return (
        <>
            <h1>Inventory</h1>
            <ul>
                {inventory?.map((item) => (
                <li key={item.id}>
                    <strong>{item.Name}</strong>
                    <span>Description: {item.Description}</span>
                    <span>Quantity: {item.Quantity}</span>
                    <span>Price: {item.Price}</span>
                </li>
                ))}
            </ul>
        </>
    );
}

export default Home;