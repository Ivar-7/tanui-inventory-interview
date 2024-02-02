import React, { useState, useEffect } from 'react';
import { db } from "../config/firebaseConfig";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Button, Container, Table, Form } from 'react-bootstrap';

function Home() {
    let [inventory, setInventory] = useState(null);
    let [showAdd, setShowAdd] = useState(false);
    const [error, setError] = useState('');
    let [editingInventory, setEditingInventory] = useState(null);
    let [updatedInventory, setUpdatedInventory] = useState({Name: '', Description: '', Quantity: '', Price: ''});
    let [newInventory, setNewInventory] = useState({Name: '', Description: '', Quantity: '', Price: ''});

    useEffect(() => {
        onSnapshot(collection(db, 'inventory'), (snapshot) => {
            setInventory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        })
    }, []);

    const handleInputChange = (event) => {
        setNewInventory({...newInventory, [event.target.name]: event.target.value});
    }

    const handleUpdateChange = (event) => {
        setUpdatedInventory({...updatedInventory, [event.target.name]: event.target.value});
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
        const docRef = doc(db, "inventory", id);
        if (updatedInventory.Name !== '' && updatedInventory.Description !== '' && updatedInventory.Quantity !== '' && updatedInventory.Price !== '') {
            await updateDoc(docRef, updatedInventory);
            setUpdatedInventory({ Name: '', Description: '', Quantity: '', Price: '' });
            setEditingInventory(null);
            setError('');
        } else {
            setError('Please fill out all fields');
        }
    }
    
    function handleCancel() {
        setEditingInventory(null);
        setUpdatedInventory({Name: '', Description: '', Quantity: '', Price: ''});
    }

    function handleEditClick(item) {
        setEditingInventory(item.id);
        setUpdatedInventory({Name: item.Name, Description: item.Description, Quantity: item.Quantity, Price: item.Price});
    }
    

    const deleteInventory = async (id) => {
        try {
            await deleteDoc(collection(db, "inventory"), id);
        } catch (error) {
            console.error("Error deleting inventory:", error.message);
        }
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
                        {editingInventory === item.id ? (
                            <>
                                <td>
                                    <Form.Control
                                        type="text"
                                        name="Name"
                                        value={updatedInventory.Name}
                                        onChange={handleUpdateChange}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        name="Description"
                                        value={updatedInventory.Description}
                                        onChange={handleUpdateChange}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        name="Quantity"
                                        value={updatedInventory.Quantity}
                                        onChange={handleUpdateChange}
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        name="Price"
                                        value={updatedInventory.Price}
                                        onChange={handleUpdateChange}
                                    />
                                </td>
                                <td>
                                    <Button onClick={() => editInventory(item.id)} className="me-2">Update</Button>
                                    <Button onClick={handleCancel}>Cancel</Button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{item.Name}</td>
                                <td>{item.Description}</td>
                                <td>{item.Quantity}</td>
                                <td>{item.Price}</td>
                                <td>
                                    <Button onClick={() => handleEditClick(item)} className="me-2">
                                        Edit
                                    </Button>
                                    <Button onClick={() => deleteInventory(item.id)}>Delete</Button>
                                </td>
                            </>
                        )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default Home;