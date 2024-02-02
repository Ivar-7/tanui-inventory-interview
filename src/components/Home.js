import React, { useState, useEffect } from 'react';
import { db } from "../config/firebaseConfig";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Button, Container, Table, Form } from 'react-bootstrap';

function Home() {
    let [inventory, setInventory] = useState(null);
    let [showAdd, setShowAdd] = useState(false);
    const [error, setError] = useState('');
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
        if (newInventory.Name !== '' && newInventory.Description !== '' && newInventory.Quantity !== '' && newInventory.Price !== '') {
        await addDoc(collection(db, "inventory"), newInventory);
        setNewInventory({Name: '', Description: '', Quantity: '', Price: ''});
        setError('');
        } else {
            setError('Please fill out all fields');
        }
    }

    const editInventory = async (id) => {
        // Add your logic to edit inventory
        // This is just a placeholder
        await updateDoc(collection(db, "inventory"), id, {
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
            <Button variant="primary" onClick={() => setShowAdd(!showAdd)}> {showAdd ? 'Close' : 'Add Inventory'} </Button>
            <br /> <br />
            {/* Popup error */}
            {error && (
                <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
                    <div>{error}</div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setError('')}></button>
                </div>
            )}
            { showAdd &&
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="Name" value={newInventory.Name} onChange={handleInputChange} required />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" name="Description" value={newInventory.Description} onChange={handleInputChange} required />
                </Form.Group>

                <Form.Group controlId="formQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Enter quantity" name="Quantity" value={newInventory.Quantity} onChange={handleInputChange} required />
                </Form.Group>

                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter price" name="Price" value={newInventory.Price} onChange={handleInputChange} required />
                </Form.Group>
                <br />
                <Button variant="primary" onClick={addInventory}>
                    Submit
                </Button>
            </Form>
            }
            <br />
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