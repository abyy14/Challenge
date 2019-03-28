import React, { Component } from 'react';
import DenseAppBar from "./Appbar";
import AddGoal from "./AddGoal";
import NotesApp from "./Note";



class App extends Component {
  render() {
    return (
      <div  style={{backgroundColor:"crimson"}}>
         <DenseAppBar/>
          <AddGoal/>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <NotesApp/>
          </div>

      </div>
    );
  }
}

export default App;
