import axios from "axios";
import { React, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { API_URI } from '../API';
import { Link } from "react-router-dom";


export default function Employee() {
    const [tableData, setTableData] = useState([]);

    const queryEmployees = async () => {
        const info = await axios.get(`${API_URI}/employee`);
        setTableData(info.data);
    };

    useEffect(() => {
        queryEmployees();
    }, []);

    return (
        <main className="container">
            <h1 className="text-center">Employee List</h1>

            <Link to="/employee/new" className="btn btn-primary">Add new Employee</Link>

            <Table striped bordered hover variant="dark" className="my-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Salary</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableData && (
                        tableData.map((el, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{el.first_name}</td>
                                <td>{el.last_name}</td>
                                <td>{el.email}</td>
                                <td>{el.gender}</td>
                                <td>{el.salary}</td>
                                <td className="d-flex gap-2 justify-content-center align-middle px-0 mx-0">
                                    <Link className="btn btn-warning"
                                        to={`/employee/edit?eid=${el._id}`}>Edit</Link>
                                    <button className="btn btn-danger"
                                        onClick={() => {
                                            const id = el._id;
                                            axios.delete(`${API_URI}/employee?eid=${id}`)
                                                .then((x) => {
                                                    console.log(x.data);
                                                    if (x.data.deletedCount === 1) queryEmployees();
                                                })
                                                .catch((ex) => {
                                                    console.error(ex);
                                                });
                                        }}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </main>
    );
}