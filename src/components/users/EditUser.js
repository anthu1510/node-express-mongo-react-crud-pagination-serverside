import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from "axios";

const initalState = {
    firstName:  null,
    lastName:  null,
    username:  null,
    isActive: null
}

const EditUser = () => {
    const [userState, setUserState] = useState(initalState);
    const [successMessage, setSuccessMessage] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(() => {
      const getUserById = () => {
          axios.get(`http://localhost:5000/users/${id}`)
              .then(res => {
                  if(res.data){
                      setUserState(res.data);
                  }
              })
              .catch(err => console.log(err))
      }

      getUserById();
    });

    const editUser = e => {
        e.preventDefault();
      axios.put(`http://localhost:5000/users/${id}`, {userState})
          .then(res => {
              if(res.data === 'success'){
                  setSuccessMessage('success');
                  setUserState(initalState);
                  setTimeout(() => {
                      setSuccessMessage(null);
                      setRedirect(true);
                  }, 2000);
              }
          })
          .catch(err => console.log(err))
    }

    return (
        <>
            <div className="col-lg-4 offset-lg-4 pt-5">
                {
                    redirect ?
                    <Redirect to="/"/>
                    : null
                }
                {successMessage ? <div className="alert alert-success">User Updated...</div> : null}
                <div className="card">
                    <div className="card-header">Edit User</div>
                    <div className="card-body">
                        <form onSubmit={editUser}>
                            <div className="form-group">
                                <label htmlFor="">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userState.firstName}
                                    onChange={(e) => setUserState({...userState, firstname: e.target.value}) }
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userState.lastName}
                                    onChange={(e) => setUserState({...userState, lastname: e.target.value}) }
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userState.username}
                                    onChange={(e) => setUserState({...userState, username: e.target.value}) }
                                    placeholder="Username"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Status</label>
                                <select onChange={(e) => setUserState({...userState, isactive: e.target.value}) } className="form-control custom-select">
                                    <option value="null">Select Status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUser;