import { useState } from "react";

const c = 3e8;

function PropagationSpeed() {
    const [epsilonR, setEpsilon] = useState("");
    const [result, setResult] = useState(null);

    const handleChangeEp = (e) => {
        setEpsilon(e.target.value);
    }

    function calcSpeed() {
        let speed = 0;

        let epsilon_r = parseFloat(epsilonR);

        speed = c/Math.sqrt(epsilon_r);
        speed = speed.toExponential(1);

        setResult(speed)
    }


    return (
        <div className="calculator-container">
            <div className="placeholder-form">
                <div className="form-group">
                    <label htmlForfor="epsilonR">Permissividade relativa:</label>
                    <input type="text" name="epsilonR" id="epsilonR" placeholder="εᵣ" onChange={handleChangeEp}/>
                </div>
                <button className="btn ubuntu-bold" id="btnCalcSpeed" onClick={calcSpeed} >Calcular</button>
            </div>
            {result && (
                <div className="area-result">
                    <h3>Resultado</h3>
                    <div className="result-display" id="result-speed">
                        <h4>u<sub className="varSub">p</sub> = <span>{result} m/s</span></h4>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default PropagationSpeed;
