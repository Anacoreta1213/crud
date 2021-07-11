import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import NoteList from './components/NoteList';
import CreateUser from './components/CreateUser';
import  CreateNote from './components/CreateNote';
import "react-datepicker/dist/react-datepicker.css";
function App() {
  return (
    <Router> 
        <Navigation/>
        <div className="container m-4">
        <Route exact path="/" component={NoteList}/>
        <Route  path="/edit/:id" component={CreateNote}/>
        <Route  path="/create" component={CreateNote}/>
        <Route  path="/user" component={CreateUser}/>
        </div>
    </Router>
  );
}

export default App;
