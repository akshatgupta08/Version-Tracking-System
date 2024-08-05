import NoteContext from "./noteContext";
import {useState} from "react";
/*The notestate.js is used to control the visibility of components at certain times or to deactivate their functionality.*/
const NoteState = (props)=> {
    const [state,setState] = useState(1);
    const [active, setActive] = useState(true);
    const [tableView, changeTable] = useState(false);
    const [nav, changeNav] = useState(true);
    const update = ()=> {
        if(state == 1) {
            setState(0);
        }else {
            setState(1);
        }
    }

    const changeActive = ()=> {
      if(active === true) {
        setActive(false);
      }else {
        setActive(true);
      }

    }

    return (
        <NoteContext.Provider value = {{state,update,changeActive,active,setActive,tableView,changeTable,nav,changeNav}}>
            {props.children}
            </NoteContext.Provider>
    )
}

export default NoteState;