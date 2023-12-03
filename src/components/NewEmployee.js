import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_URI } from '../API';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NewEmployee() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [salary, setSalary] = useState(0);

    const [userMessage, setUserMessage] = useState("");

    return (
        <main className='container d-flex justify-content-center align-items-center align-middle vh-100'>
            <div className='d-flex justify-content-center align-items-center align-middle h-100'>
                <Form className='row w-75'>
                    <Link to="/employee">Return</Link>
                    <h3 className='text-center py-3'>Create New Employe</h3>
                    <Form.Group className="mb-3 d-flex w-100 gap-3" controlId="formBasicEmail">
                        <Form.Group className='w-50'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name"
                                onInput={(e) => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='w-50'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name"
                                onInput={(e) => setLastName(e.target.value)} />
                        </Form.Group>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email"
                            onInput={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select aria-label="Select Gender" onChange={(e) => {
                            setGender(e.target.value);
                        }} >
                            <option disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="salary">
                        <Form.Label>Salary</Form.Label>
                        <Form.Control min={0} type="number" placeholder="Salary"
                            onInput={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    {userMessage && (
                        <Form.Group className="mb-3">
                            <Form.Text className='text-danger'>{userMessage}</Form.Text>
                        </Form.Group>
                    )}

                    <Button variant="primary" type="submit" onClick={(e) => {
                        e.preventDefault();
                        setUserMessage("");
                        const employee = { first_name: firstName, last_name: lastName, email, gender, salary };
                        console.log(employee);
                        if (employee.firstName === "") {
                            setUserMessage("First name cannot be empty.");
                            return;
                        }
                        if (employee.lastName === "") {
                            setUserMessage("Last name cannot be empty.");
                            return;
                        }
                        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                        if (employee.email == "") {
                            setUserMessage("Email cannot be empty");
                            return;
                        }
                        if (!regex.test(employee.email)) {
                            setUserMessage("Email is not in the correct format");
                            return;
                        }
                        if (employee.gender === "") {
                            setUserMessage("Select a gender.");
                            return;
                        }
                        if (employee.salary < 0) {
                            setUserMessage("Salary cannot be less than zero.");
                            return;
                        }

                        axios.post(`${API_URI}/employee`, employee)
                            .then((res) => {
                                console.log(res.data);
                                if (!res.data._id) setUserMessage("There was an error while creating the employee.");
                                else navigate("/employee");
                            })
                            .catch((ex) => {
                                console.error(ex);
                            });
                    }}>
                        Submit
                    </Button>

                </Form>
            </div>
        </main>
    );
}