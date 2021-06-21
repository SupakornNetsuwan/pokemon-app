import React , { useState , useEffect } from "react";
import "./nav.css";
import { BiMenuAltRight } from 'react-icons/bi';
import { VscClose } from "react-icons/vsc";

let Nav = (props) =>{
    let [toggleNav , setToggleNav] = useState(false)

    useEffect(()=>{
        if(toggleNav === true){
            console.log("Toggle" , toggleNav);
        }else{
            console.log("Toggle" , toggleNav);
        }
    },[toggleNav])


    return(
        <div className="nav">
            <div className="logo">
                Pokemon<span style={{"color":"#F72585"}}>.app</span>
            </div>

            <div className="nav-icon" onClick={()=> setToggleNav(true)}> 
                <BiMenuAltRight />
            </div>
    
            <ul className={toggleNav ? "toggle" : ""}>
                {props.children} {/* showing each of li */}
                <li className="close-icon" onClick={()=> setToggleNav(false)}><VscClose/></li>
             </ul>

        </div>
    )
}

export default Nav;