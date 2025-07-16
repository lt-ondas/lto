import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="summary">
            <h2>Capítulos</h2>
            <ul>
                <li><Link to={"/"}>2. Linhas de Transmissão</Link></li>
                <li><Link to={"/Cap6"}>6. Ondas Planas</Link> </li>
                <li><Link to={"/Cap7"}>7. Guias de Ondas</Link></li>
            </ul>
        </aside>
    );
}

export default Sidebar;
