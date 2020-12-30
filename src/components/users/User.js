import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const User = () => {
    const [users, setUsers] = useState([]);
    const [notification, setNotification] = useState(false);
    const [perPage, setPerPage] = useState(2);
    const [pageNo, setPageNo] = useState(1);
    const [paginationTotal, setPaginationTotal] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const getUsers = () => {
            axios.get('http://localhost:5000/users', {params : {perPage, pageNo}})
                .then(res => {
                    setUsers(res.data.data);
                    setTotalRecords(res.data.totalRecords);
                    let r = [];
                    for(let i=0; i< res.data.avg; i++){
                        r.push(i);
                    }
                    setPaginationTotal(r);
                })
                .catch(err => console.log(err))
        }

        getUsers();
    },[notification, perPage, pageNo]);

    const userDelete = id => {
        axios.delete(`http://localhost:5000/users/${id}`)
            .then(res => {
                if(res.data === 'success'){
                    setNotification(true);
                    setTimeout(() => {
                        setNotification(false);
                    }, 2000);
                }
            })
            .catch(err => console.log(err))
    }



    return (
        <div className="col-lg-12">
            <div className="row pt-3">
                <div className="col-lg-12">
                    <Link to="/new" className="btn btn-success float-right">Add</Link>
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-lg-12">
                    {   notification ?
                        <div className="alert alert-success">User Deleted Successfully...</div>
                        :
                        null
                    }
                    <div className="row">
                        <div className="col-lg-1">
                            <select onChange={(e) => setPerPage(e.target.value)} className="form-control custom-select">
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="25">25</option>
                                <option value="100">100</option>
                                <option value="500">500</option>
                            </select>
                        </div>
                    </div>

                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>First Name {perPage}</th>
                            <th>Last Name</th>
                            <th>User Name</th>
                            <th>isActive</th>
                            <th>Active</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            {
                                                user.isActive ?
                                                    <span className="badge badge-success">Active</span>
                                                    :
                                                    <span className="badge badge-danger">Inactive</span>
                                            }
                                        </td>
                                        <td>
                                            <Link
                                                className="btn btn-primary btn-sm"
                                                to={`/edit/${user._id}`}
                                            >Edit</Link>&nbsp;
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => userDelete(user._id)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                        </tbody>
                    </table>

                    {
                       // totalRecords > perPage &&  totalRecords > 0 ?
                        totalRecords > perPage ?
                            <div className="row">
                                <div className="col-lg-12 justify-content-lg-end">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            {
                                                pageNo > 1 ?
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">Previous</a>
                                                    </li> : null
                                            }
                                            {
                                                paginationTotal.map(p => (
                                                    <li className="page-item">
                                                        <button
                                                            onClick={(e) => setPageNo(p+1)}
                                                            className="page-link">
                                                            {p+1}
                                                        </button>
                                                    </li>
                                                ))
                                            }
                                            {
                                                pageNo > 1 ?
                                                    <li className="page-item">
                                                        <a className="page-link" href="#">Next</a>
                                                    </li> : null
                                            }
                                        </ul>
                                    </nav>
                                </div>
                            </div> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default User;