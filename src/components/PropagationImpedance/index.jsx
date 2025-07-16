import { useState } from "react";
import { create, all } from "mathjs";

function PropagationImpedance() {
    const [resistance, setResistance] = useState("");
    const [inductance, setInductance] = useState("");
    const [conductance, setConductance] = useState("");
    const [capacitance, setCapacitance] = useState("");
    const [frequency, setFrequency] = useState("");
    const [result, setResult] = useState(null);

    const math = create(all);
    const pi = Math.PI;
    //handleChange functions

    const handleChangeR = (e) => {
        setResistance(e.target.value);
    }

    const handleChangeL = (e) => {
        setInductance(e.target.value);
    }

    const handleChangeG = (e) => {
        setConductance(e.target.value);
    }

    const handleChangeC = (e) => {
        setCapacitance(e.target.value);
    }

    const handleChangeF = (e) =>  {
        setFrequency(e.target.value);
    }

    function calcPropImp() {
        

        let propagationConstat = 0;
        let z0 = 0;

        let R = parseFloat(resistance);
        let L = parseFloat(inductance);
        let G = parseFloat(conductance);
        let C = parseFloat(capacitance);
        let f = parseFloat(frequency);

        const omega = 2 * pi * f;

        const a = math.complex(R, omega * L)
        const b = math.complex(G, omega * C);

        propagationConstat = math.sqrt(math.multiply(a, b));
        z0 = math.sqrt(math.divide(a, b));

        let gamma = propagationConstat;
        let alfa = gamma.re.toFixed(4);
        let beta = gamma.im.toFixed(4);


        gamma.re = alfa;
        gamma.im = beta;

        let z0Re = z0.re.toFixed(2);
        let z0Im = z0.im.toFixed(2);

        z0.re = z0Re;
        z0.im = z0Im;

        setResult({
            gamma: `${alfa} + j${beta}`,
            alfa,
            beta,
            z0: `${z0Re} + j${z0Im}`,
        });
 
    }

    return(
        <div className="calculator-container">
            <div className="placeholder-form">
                <div className="form-group">
                    <label htmlFor="resistance">Resistência</label>
                    <input type="text" name="resistance" id="resistance" placeholder="R'" onChange={handleChangeR} />
                </div>
                <div className="form-group">
                    <label htmlFor="inductance">Indutância</label>
                    <input type="text" name="inductance" id="inductance" placeholder="L'" onChange={handleChangeL}/>
                </div>
                <div className="form-group">
                    <label htmlFor="conductance">Condutância</label>
                    <input type="text" name="conductance" id="conductance" placeholder="G'" onChange={handleChangeG} />
                </div>
                <div className="form-group">
                    <label htmlFor="capacitance">Capacitância</label>
                    <input type="text" name="capacitance" id="capacitance" placeholder="C'" onChange={handleChangeC} />
                </div>
                <div className="form-group">
                    <label htmlFor="frequency">Frequência, em Hz</label>
                    <input type="text" name="frequency" id="frequency" placeholder="f" onChange={handleChangeF}/>
                </div>
                <button className="btn ubuntu-bold" onClick={calcPropImp}>Calcular</button>
            </div>
            {result && (
                <div className="area-result">
                    <h3>Resultado</h3>
                    <div className="result-display" id="result-propagation">
                        <h4>γ = <span>{result.gamma} m<sup>-1</sup></span></h4>
                        <h4>α = <span>{result.alfa} N<sub>p</sub>/m</span></h4>
                        <h4>β = <span>{result.beta} rad/m</span></h4>
                        <h4>Z<sub className="varSub">0</sub> = <span>{result.z0} Ω</span></h4>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PropagationImpedance;
