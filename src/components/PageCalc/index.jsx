import "./PageCalc.css"

function PageCalc({tilte, children}) {
    return(
        <div className="container-calc">
            <h2 className="breadcrumbs ubuntu-regular">{tilte}</h2>
            <div className="calculator-container">
                {children}
            </div>
        </div>
    );
}

export default PageCalc;