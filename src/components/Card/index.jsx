import { useState } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

function Card({ title, description, modalId, link, openMd}) {
    return(
        <div className="card">
            <h3 className="card-header">{title}</h3>
            <p>{description}</p>
            {
                link ? (
                   <Link className="btn btn-card ubuntu-medium" to={link}>Abrir página</Link>
                ) : (
                    <button className="btn btn-card ubuntu-medium" onClick={() => openMd(modalId)}>Abrir Calculadora</button>
                )
            }
        </div>
    );
}

export default Card;