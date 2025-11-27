import React, { useState } from 'react'
import { savedEmployee, updateDataEmployee, editEmployee } from '../service/EmployeeService'
import '../style/employeeform.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function EmployeeComponent() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()


    function pageTitle() {
        if (id) {
            return <h4 className='title'>Update Employees</h4>
        } else {
            return <h4 className='title'>Add Employees</h4>
        }
    }

    useEffect(() => {
        if (id) {
            editEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            })
        }
    }, [id])

    async function saveEmployee(e) {
        e.preventDefault()

        const employee = { firstName, lastName, email }
        if (firstName === "" || lastName === "" || email === "") {
            alert("Please fill in all fields");
            return;
        }
        try {
            if (id) {
                const response = await updateDataEmployee(id, employee);
                console.log("Employee updated:", response.data);
                navigate('/')
            } else {
                const response = await savedEmployee(employee);
                console.log("Employee saved:", response.data);
                navigate("/")
            }
        } catch (error) {
            console.error("Error saving employee:", error);
            if (error.response) {
                alert(`Failed to save employee: ${error.response.data?.message || error.response.statusText}`);
            } else {
                alert("Failed to save employee. Please check if the backend is running.");
            }
        }
    }

    return (
        <>
            <div className='st-ba'>
                <div className='container d-flex justify-content-center align-items-center '>
                    <div className="text-center card card-top" >
                        <div className='card-head'>
                            {
                                pageTitle()
                            }
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveEmployee}>
                                <div className='form-group mb-3'>
                                    <input
                                        type="text"
                                        placeholder='Enter FirstName'
                                        value={firstName}
                                        className='form-control'
                                        onChange={(e) => setFirstName(e.target.value)}
                                        id="validationCustom01"
                                        required
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <input
                                        type="text"
                                        placeholder='Enter LastName'
                                        value={lastName}
                                        className='form-control'
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='form-group mb-3'>
                                    <input
                                        type="email"
                                        placeholder='Enter Email'
                                        value={email}
                                        className='form-control'
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className='btn btn-success'>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeComponent