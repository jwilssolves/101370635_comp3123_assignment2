import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_URI } from '../API';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userMessage, setUserMessage] = useState("");

    return (
        <main className='container d-flex justify-content-center align-items-center align-middle vh-100'>
            <div className='d-flex justify-content-center align-items-center align-middle h-100'>
                <Form className='row w-75'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username or Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter username or email" onInput={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onInput={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    {userMessage && (
                        <Form.Group className="mb-3">
                            <Form.Text className='text-danger'>{userMessage}</Form.Text>
                        </Form.Group>
                    )}

                    <Button variant="primary" type="submit" onClick={(e) => {
                        const user = {
                            username: username,
                            password: password,
                        };
                        console.log(user);
                        axios.post(`${API_URI}/user/login`, user)
                            .then((res) => {
                                console.log(res.data);
                                if (!res.data.status) setUserMessage("Wrong user or password");
                                else navigate("/employee");
                            })
                            .catch((ex) => {
                                console.error(ex);
                            });
                        e.preventDefault();
                    }}>
                        Submit
                    </Button>

                    <Form.Group className="mb-3 w-100 py-2" controlId="register">
                        <p className='text-link-underline text-center w-100'>
                            <u>Register </u>
                            <Link to="/register" className='link-info' style={{ "cursor": "pointer" }}>here!</Link>
                        </p>
                        {/* <Button as="a" className='link-info'><u>here!</u></Button> */}
                        {/* <Form.Control type="password" placeholder="Password" onInput={(e) => setPassword(e.target.value)} /> */}
                    </Form.Group>

                </Form>
            </div>
        </main>
    );
}