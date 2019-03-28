import React from 'react';
import Masonry from '../node_modules/masonry-layout'
import './Note.css'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star'
import MenuIcon from "./Appbar";

class Note extends React.Component{
    constructor(props){
        super(props);
        this.color = '#fff';
        this.state={checked:false}
    }

    handleChange(){
        this.setState({checked:!this.state.checked})
    }

    render(){
        var style = {
            backgroundColor: "#000"
        }
        return (<div className="note" style={style}>{this.props.children}
                <IconButton  className="note-star" color={this.state.checked ===false ? 'inherit':'red'} >
                    <StarIcon onClick={this.handleChange.bind(this)} />
                </IconButton>
            <IconButton className="note-delete" color="inherit" aria-label="Menu">
                <DeleteIcon onClick={this.props.onDelete}/>
            </IconButton>

            {/*<span className="note-delete" onClick={this.props.onDelete}>x</span>*/}
        </div>);
    }
}

class NoteEditor extends React.Component{
    constructor(props){
        super(props);
        this.color = 'ff6680';
        this.state = {text: '', color: this.color};
    }
    handleChange(e){
        this.setState({text: e.target.value});
    }
    // handleChangeColor(e){
    //     this.setState({color: e.target.value});
    // }
    render(){
        return (<div className="note-editor">
            <textarea placeholder="Enter your Goal here..." onChange={this.handleChange.bind(this)}>{this.state.text}</textarea>
            {/*<input className="jscolor" value={this.state.color} onBlur={this.handleChangeColor.bind(this)}/>*/}
            <Fab style={{bottom:"39px",backgroundColor:"#000"}} aria-label="Add">
                <AddIcon onClick={() => this.props.onNoteAdd(this.state.text)} style={{color:"#fff"}} />
            </Fab>
            {/*<button onClick={() => this.props.onNoteAdd(this.state.text)}>Add</button>*/}
        </div>);
    }
}

class NotesGrid extends React.Component{
    componentDidMount(){
       let grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            // options
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10
        });
    }

    componentDidUpdate(prevProps){
        if(this.props.notes.length != prevProps.notes.length){
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    }

    render(){
        let onNoteDelete = this.props.onNoteDelete;
        return (<div className="notes-grid" ref="grid">
            {this.props.notes.map((note) => (
                <Note
                    key={note.id}
                    color={note.color}
                    onDelete={onNoteDelete.bind(null, note)}>
                    {note.text}
                </Note>))}
        </div>);
    }
}

class NotesApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {notes:[
                {id:1, text:'DemoNote', color:'coral'},
                {id:2, text:'You can use Masonry with vanilla JS', color:'aliceblue'},
                {id:3, text:'You can initialize Masonry in HTML, without writing any JavaScript', color:'gold'},
                {id:4, text:'HTML initialization was previously done with a class of js-masonry and setting options in data-masonry-options in Masonry v3. Masonry v4 is backwards compatible with this codeHTML initialization was previously done with a class of js-masonry and setting options in data-masonry-options in Masonry v3. Masonry v4 is backwards compatible with this code padding-top: 15px; HTML initialization was previously done with a class of js-masonry and setting options in data-masonry-options in Masonry v3. Masonry v4 is backwards compatible with this codeHTML initialization was previously done with a class of js-masonry and setting options in data-masonry-options in Masonry v3. Masonry v4 is backwards compatible with this code padding-top: 15px; HTML initialization was previously done with a class of js-masonry and setting options in data-masonry-options in Masonry v3. Masonry v4 is backwards compatible with this codeHTML initialization was previously done with a class of js-masonry and setting options in data-masonry-options in ', color:'lightpink'},
                {id:5, text:'Masonry v4 is backwards compatible with this code.', color:'#C9A39C'}
            ]}
    }

    componentDidMount(){
        let localNotes = JSON.parse(localStorage.getItem('notes'));
        if(localNotes){
            this.setState({notes: localNotes});
        }
    }

    updateLocalStorage(){
        let notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
        console.log('update ls');
    }

    onNoteAdd(noteText){
        if(noteText){
            let notesNew = this.state.notes.slice();
            notesNew.unshift({id: Date.now(), text: noteText, color: '#fff'});
            this.setState({notes: notesNew});
        }
        else {
            console.log("success");
        }



    }

    onNoteDelete(note){
        let notesNew = this.state.notes.filter((_note) => _note.id != note.id);
        this.setState({notes: notesNew});
    }

    componentDidUpdate(){
        this.updateLocalStorage();
    }

    render(){
        return (<div className="notes-app">
            <NoteEditor onNoteAdd={this.onNoteAdd.bind(this)}/>
            <NotesGrid notes={this.state.notes} onNoteDelete={this.onNoteDelete.bind(this)}/>
        </div>);
    }
}

export default NotesApp;