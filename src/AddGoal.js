import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const styles={
    btn: {
        marginLeft: "auto",
        fontWeight: "bold"
    },
    icon: {
        marginLeft: "auto"
    }
}

class AddGoal extends Component {
    render() {
        return(
            <div>
              <img src={require('./images/image5.jpg')} style={{width:"100%", height:"30%"}}/>
              {/*<div style={{position: "absolute",top: "150px",left: "50px",width: "400px"}}>*/}
              {/*<Typography variant="h6" style={{color: "white",fontWeight: "bold"}}>*/}
                  {/*People with goals succeed because they know where they're going.*/}
              {/*</Typography>*/}
              </div>

          // </div>
        );
    }
}

export default AddGoal;