import React from "react";
import './App.css'
const Card = ({id,img,title,description}) =>{
    return(
        <>
            
            <div className="card" key={id}>
                <div className="logo">
                    <img src={img} alt = {title}/>
                    <h4 style={{marginTop:"6px",marginLeft:"5px"}}>{title}</h4>
                </div>
                
                <p>{description}</p>
            </div>
        </>
    )
}
export default Card;