import React from 'react';
import { Container, Card } from 'react-bootstrap';

function About() {
    return (
        <Container className="mt-3">
            <Card>
                <Card.Body>
                    <Card.Title><h1>About the Inventory Management Application</h1></Card.Title>
                    <Card.Text>
                        This is a simple inventory management application built with React and Firebase Firestore. 
                        It allows users to add, edit, and delete inventory items. The application is designed to 
                        be user-friendly and efficient, making inventory management a breeze.
                    </Card.Text>
                    <Card.Text>
                        The application uses Firebase Firestore for real-time data storage, ensuring that your 
                        inventory data is always up-to-date across all devices. With the power of React and 
                        Bootstrap, the application offers a responsive and intuitive user interface.
                    </Card.Text>
                    <Card.Text>
                        Whether you're managing inventory for a small business or a large corporation, this 
                        application has the features you need to stay organized and efficient.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default About;