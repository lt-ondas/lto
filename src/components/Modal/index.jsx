import "./Modal.css"

function Modal({id, title, children, onClose, isOpen}) {
    if(!isOpen) return null;
    
    return (
        <div id={id} className="modal">
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>&times;</span>
                <h2 className="modal-title">Calculadora - {title}</h2>
                {children}
            </div>
        </div>
    );
}

export default Modal;
