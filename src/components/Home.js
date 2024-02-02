import React, { useState, useEffect } from 'react';
import { db } from "../config/firebaseConfig";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Button, Container, Table, Form } from 'react-bootstrap';

function Home() {
    let [inventory, setInventory] = useState(null);
    let [showAdd, setShowAdd] = useState(false);
    let [newInventory, setNewInventory] = useState({Name: '', Description: '', Quantity: '', Price: ''});

    useEffect(() => {
        onSnapshot(collection(db, 'inventory'), (snapshot) => {
            setInventory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
    }, []);

    const handleInputChange = (event) => {
        setNewInventory({...newInventory, [event.target.name]: event.target.value});
    }

    const addInventory = async () => {
        const docRef = await addDoc(collection(db, "inventory"), newInventory);
        setNewInventory({Name: '', Description: '', Quantity: '', Price: ''});
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
            <Button variant="primary" onClick={() => setShowAdd(!showAdd)}> Add Item </Button>
            { showAdd &&
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="Name" value={newInventory.Name} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" name="Description" value={newInventory.Description} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Enter quantity" name="Quantity" value={newInventory.Quantity} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter price" name="Price" value={newInventory.Price} onChange={handleInputChange} />
                </Form.Group>
                <br />
                <Button variant="primary" onClick={addInventory}>
                    Submit
                </Button>
            </Form>
            }
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