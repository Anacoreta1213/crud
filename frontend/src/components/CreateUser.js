import React, { Component } from 'react'
import axios from 'axios';
export class CreateUser extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users:[],
             username:''
        }
    }
    
   componentDidMount(){
    this.getUser();
    }

    handleInputChange = (e)=>{
        this.setState({username:e.target.value})
    }

    onSutmitting = async (e)=>{
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users',{
            username:this.state.username
        })
        this.getUser();
        this.setState({username:''})

    }

    getUser = async ()=>{
        const user = await axios.get("http://localhost:4000/api/users");
        this.setState({users:user.data})
    }

    handleDeleteUser = async (id)=>{
        await axios.delete('http://localhost:4000/api/users/'+id);
        this.getUser();
    }

    render() {
        const {users,username}=this.state;

    return (
        <div className="row">
        <div className="col-md-4">
        <div className="card">
        <div className="card-body">
        <h3>Create new user</h3>
        <form onSubmit={this.onSutmitting}>
        <div className="form-group">
            <input type="text"
            placeholder="Username"
            value={username}
            onChange={this.handleInputChange}
            className="form-control"/>
        </div>
        <button type="submit" className="btn btn-primary m-2">
            Save
        </button>
        </form>
        </div>
        </div>
        </div>
        <div className="col-md-8">
        <ul className="list-group">
            {users.map(user=>(
                <li
                onDoubleClick={()=>{
                    this.handleDeleteUser(user._id)
                }}
                role = "button" 
                className="list-group-item text-center list-group-item-action"
                key={user._id}
                >{user.username}</li>
            ))}
        </ul>
        </div>
        </div>
    )
    }
}

export default CreateUser;
