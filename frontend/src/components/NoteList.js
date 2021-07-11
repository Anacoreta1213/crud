import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {format} from 'timeago.js';

export class NoteList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            notes:[]
        }
    }
    
    componentDidMount(){
        this.getNotes();
    }

    getNotes = async ()=>{
        const notes = await axios.get("http://localhost:4000/api/notes");
        this.setState({notes:notes.data});
    }

    deleteNote = async (id) =>{
        await axios.delete("http://localhost:4000/api/notes/"+id)
        this.getNotes();
    }

    render() {
        const { notes }=this.state;
        return (
            <div className="row">
            {
             notes.map(note =>(
            <div className="col-md-4 mt-2"
            key={note._id}>
            <div className="card">
            <div className="card-header d-flex justify-content-between">
            <h3>{note.title}</h3>
            <Link to={"/edit/"+note._id}
            className="btn btn-secondary">
            Edit    
            </Link>
            </div>
            <div className="card-body">
            <p>{note.content}</p>
            <p>{note.author}</p>
            <p>{format(note.date)}</p>    
            </div>
            <div className="card-footer">
                <button
                className="btn btn-danger"
                onClick={()=>{
                    this.deleteNote(note._id)
                }}
                >
                 Delete   
                </button>
            </div>
            </div>

            </div> 
             ))   
            }
            </div>
        )
    }
};

export default NoteList;
