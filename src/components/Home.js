import React, { useState, useEffect } from 'react';
import { db } from "../config/firebaseConfig";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Button, Container, Table } from 'react-bootstrap';

function Home() {
    let [inventory, setInventory] = useState(null);

    useEffect(() => {
        onSnapshot(collection(db, 'inventory'), (snapshot) => {
            setInventory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
    }, []);

    const addInventory = async () => {
        // Add your logic to add new inventory
        // This is just a placeholder
        const docRef = await addDoc(collection(db, "inventory"), {
            Name: "New Item",
            Description: "New Description",
            Quantity: 0,
            Price: 0
        });
    }

    const editInventory = async (id) => {
        // Add your logic to edit inventory
        // This is just a placeholder
        const docRef = await updateDoc(collection(db, "inventory"), id, {
            Name: "Updated Item",
            Description: "Updated Description",
            Quantity: 1,
            Price: 1
        });
    }

    const deleteInventory = async (id) => {
        // Add your logic to delete inventory
        // This is just a placeholder
        await deleteDoc(collection(db, "inventory"), id);
    }

    return (
        <Container>
            <h1>Inventory</h1>
            <Button onClick={addInventory}>Add New Inventory</Button>
            <br /><br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory?.map((item) => (
                        <tr key={item.id}>
                            <td>{item.Name}</td>
                            <td>{item.Description}</td>
                            <td>{item.Quantity}</td>
                            <td>{item.Price}</td>
                            <td>
                            <Button onClick={() => editInventory(item.id)} className="me-2">Edit</Button>
                            <Button onClick={() => deleteInventory(item.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Home;