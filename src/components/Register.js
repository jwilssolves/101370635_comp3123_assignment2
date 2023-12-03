import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_URI } from '../API';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userMessage, setUserMessage] = useState("");

    return (
        <main className='container d-flex justify-content-center align-items-center align-middle vh-100'>
            <div className='d-flex justify-content-center align-items-center align-middle h-100'>
                <Form className='row w-75'>
                    <Form.Group className="mb-3" controlId="username">
                        <u style={{ "cursor": "pointer" }} onClick={() => navigate("/")}>Back to login</u>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onInput={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" onInput={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onInput={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirm_password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onInput={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>

                    {userMessage && (
                        <Form.Group className="mb-3">
                            <Form.Text className='text-danger'>{userMessage}</Form.Text>
                        </Form.Group>
                    )}

                    <Button variant="primary" type="submit" onClick={(e) => {
                        e.preventDefault();
                        const user = {
                            username: username,
                            email: email,
                            password: password,
                        };
                        if (user.username == "") {
                            setUserMessage("Username cannot be empty");
                            return;
                        }

                        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                        if (user.email == "") {
                            setUserMessage("Email cannot be empty");
                            return;
                        }
                        if (!regex.test(email)) {
                            setUserMessage("Email is not in the correct format");
                            return;
                        }

                        if (user.password == "") {
                            setUserMessage("Password cannot be empty");
                            return;
                        }

                        if (user.password !== confirmPassword) {
                            setUserMessage("Password doesn't match");
                        } else {
                            console.log(user);
                            axios.post(`${API_URI}/user/signup`, user)
                                .then((res) => {
                                    console.log(res.data);
                                    if (!res.data.status) setUserMessage("There was an error on the registration process.");
                                    else navigate("/");
                                })
                                .catch((ex) => {
                                    console.error(ex);
                                });
                        }
                    }}>
                        Submit
                    </Button>

                </Form>
            </div>
        </main>
    );
}