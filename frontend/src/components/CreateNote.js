import React, { Component } from 'react'
import  axios from 'axios';
import DatePicker from "react-datepicker";

export class CreateNote extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users:[],
            userselected:'',
            title:'',
            content:'',
            date:new Date(),
            editing:false,
            _id:''
        }
    }
    
    async componentDidMount(){
       const user = await axios.get('http://localhost:4000/api/users');    
       this.setState({users:user.data.map(user=>(
        user.username          
       ))});

       if(this.props.match.params.id){
           const {id}=this.props.match.params;
          const note = await axios.get(`http://localhost:4000/api/notes/${id}`);
          const {data}= note;
          this.setState({
            userselected:data.author,
            title:data.title,
            content:data.content,
            date:data.date,
            editing:true,
            _id:data._id
          })

       }
    }

    handleInputChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    // La fecha tendrá su propio manejado de input
    handleDate = (date)=>{
        this.setState({date:date})
    }

    handleSubmit =async(e)=>{

        e.preventDefault();
        const newNotes ={
            title:this.state.title,
            content:this.state.content,
            author:this.state.userselected,
            date:new Date(this.state.date),
        }

        if(this.state.editing){
            await axios.put(`http://localhost:4000/api/notes/${this.state._id}`,newNotes);

        }else{
            await axios.post(`http://localhost:4000/api/notes`,newNotes);
        }
       window.location.href ="/";
    }

    render() {
        const {
            users,
            userselected,
            title,
            content,
            date,
            _id
        }=this.state;
        return (
        <div className="col-md-6 offset-md-3">
        <div className="card">
        <div className="card-body">
        <h4>Create note</h4>
        <select 
        name="userselected"
        className="form-select"
        value={userselected}
        onChange={this.handleInputChange}
        >
        {
         users.map(user=>(
           <option
           key={user}
           value={user}
           >{user}</option>  
         ))   
        }    
        </select>
        <div className="form-group">
        <input type="text" 
        name="title"
        onChange={this.handleInputChange}
        value={title}
        placeholder="Title"
        className="form-control my-2"/>
        </div>
        <div className="form-group">
        <textarea type="text" 
        name="content"
        onChange={this.handleInputChange}
        value={content}
        placeholder="Content"
        className="form-control my-2">
        </textarea>
        </div>
        <div className="form-group">
        <DatePicker
        selected={date}
        onChange={this.handleDate}
        className="form-control my-2"/>
        </div>
        <form onSubmit={this.handleSubmit}>
            <button type="submit"
            className="btn btn-primary">
            {_id? "Update note":"Create note"}       
            </button>
        </form>
        </div>
        </div>
        </div>
        )
    }
}
export default CreateNote;
