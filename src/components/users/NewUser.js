import { useState } from 'react';
import axios from "axios";

const initalState = {
    firstName:  null,
    lastName:  null,
    username:  null,
    isActive: null
}

const NewUser = () => {
    const [userState, setUserState] = useState(initalState);
    const [successMessage, setSuccessMessage] = useState(null);

    const addUser = e => {
        e.preventDefault();
      axios.post('http://localhost:5000/users', {userState})
          .then(res => {
              if(res.data === 'success'){
                  setSuccessMessage('success');
                  setUserState(initalState);
              }
          })
          .catch(err => console.log(err))
    }

    return (
        <>
            <div className="col-lg-4 offset-lg-4 pt-5">
                {successMessage ? <div className="alert alert-success">User Added</div> : null}
                <div className="card">
                    <div className="card-header">New User</div>
                    <div className="card-body">
                        <form onSubmit={addUser}>
                            <div className="form-group">
                                <label htmlFor="">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setUserState({...userState, firstName: e.target.value}) }
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setUserState({...userState, lastName: e.target.value}) }
                                    placeholder="Last Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setUserState({...userState, username: e.target.value}) }
                                    placeholder="Username"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Status</label>
                                <select onChange={(e) => setUserState({...userState, isActive: e.target.value}) } className="form-control custom-select">
                                    <option value="null">Select Status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewUser;