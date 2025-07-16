import { useState } from "react";

function ReflectionRote() {
    const [z0, setZ0] = useState("");
    const [zL, setZl] = useState("");
    const [result, setResult] = useState(null);

    const handleChangeZ0 = (e) => {
        setZ0(e.target.value);
    }

    const handleChangeZl = (e) => {
        setZl(e.target.value);
    }

    function calcRefROTE() {
        let z_0 = parseFloat(z0);
        let z_L = parseFloat(zL);
        let rote = 0;
        let coefRef = 0;

        coefRef = (z_L-z_0)/(z_L+z_0);
        rote = (1+coefRef)/(1-coefRef);

        setResult({
            coefRef,
            rote,
        })
    }


    return(
        <div className="calculator-container">
            <div className="placeholder-form">
                <div className="form-group">
                    <label htmlFor="z0">Impedancia da Linha:</label>
                    <input type="text" name="z0" id="z0" onChange={handleChangeZ0}/>
                </div>
                <div className="form-group">
                    <label for="zL">Impedancia da carga:</label>
                    <input type="text" name="zL" id="zL" onChange={handleChangeZl}/>
                </div>
                <button className="btn ubuntu-bold" onClick={calcRefROTE}>Calcular</button>
            </div>
            
            <div className="area-result">
                <h3>Resultado</h3>
                    {result && (
                        <div className="result-display" id="result-rote">
                            <h4>Γ<sub className= "varSub">L</sub> =  <span>{result.coefRef}</span> </h4>
                            <h4>ROTE =  <span>{result.rote}</span> </h4>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default ReflectionRote;