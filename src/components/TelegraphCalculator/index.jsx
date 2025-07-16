import { useState } from "react";

function TelegraphCalculator() {
    const pi = Math.PI
    const epsilon0 =  8.854e-12;
    const mu0 = pi*4e-7;
    const c = 3e8; ///????

    const [cableType, setCableType] = useState("");
    const [innerRadius, setInnerRadius] = useState("");
    const [outerRadius, setOuterRadius] = useState("");
    const [distance, setDistance] = useState("");
    const [radius, setRadius] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    //Padrao
    const [relativePermittivity, setRelativePerm] = useState("");
    const [dielectricConductivity, setDieletricCond] = useState("");
    const [conductorConductivity, setCondutorCond] = useState("");
    const [frequency, setFrequency] = useState("");
    const [result, setResult] = useState("");

    //Functions handleChange's
    const handleCableChange = (e) => {
        setCableType(e.target.value);
    }

    const handleInnerRadiusChange = (e) => {
        setInnerRadius(e.target.value);
    }
    
    const handleOuterRadiusChange = (e) => {
        setOuterRadius(e.target.value);
    }

    const handleDistanceChange = (e) => {
        setDistance(e.target.value);
    }

    const handleRadiusChange = (e) => {
        setRadius(e.target.value);
    }

    const handleWidthChange = (e) => {
        setWidth(e.target.value);
    };

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };

    const handleRelativePermChange = (e) => {
        setRelativePerm(e.target.value);
    };

    const handleDielectricCondChange = (e) => {
        setDieletricCond(e.target.value);
    };

    const handleConductorCondChange = (e) => {
        setCondutorCond(e.target.value);
    };

    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    };

    function telegraphCalc() {
        let rel_perm = parseFloat(relativePermittivity);
        let diel_cond = parseFloat(dielectricConductivity);
        let conductor_cond = parseFloat(conductorConductivity);
        let f = parseFloat(frequency);

        let resistance = 0;
        let inductance = 0;
        let conductance = 0; 
        let capacitance = 0;
        

        if (cableType === "1") {
           let inner_r = parseFloat(innerRadius);
           let outer_r = parseFloat(outerRadius);

            resistance = (1/(2*pi))*((1/inner_r)+(1/outer_r))*Math.sqrt((pi*f*mu0)/conductor_cond);
            resistance = 1000*resistance;

            inductance = (mu0/(2*pi))*Math.log(outer_r/inner_r); //L
            conductance = (2*pi*diel_cond)/Math.log(outer_r/inner_r); //G
            capacitance = (2*pi*epsilon0*rel_perm)/Math.log(outer_r/inner_r); //C

            
        }

        if (cableType === "2") {
            let d = parseFloat(distance);
            let r = parseFloat(radius);

            r = r/1000;
            d = d/1000;

            resistance = (1/r)*Math.sqrt(f*mu0/conductor_cond);
            inductance = (mu0/pi)*Math.acosh(d/(2*r));
            conductance = (pi*diel_cond)/Math.acosh(d/(2*r));
            capacitance = (pi*rel_perm*epsilon0)/Math.acosh(d/(2*r));

             const resultText =  `R = ${resistance.toExponential(3)} Ω/m\n` +
            `L = ${inductance.toExponential(3)} H/m\n` +
            `G = ${conductance.toExponential(3)} S/m\n` +
            `C = ${capacitance.toExponential(3)} F/m`;
            setResult(resultText);
        }

        if (cableType === "3") {
            let w = parseFloat(width);
            let h = parseFloat(height);
            let delta = 1/Math.sqrt(pi*f*mu0*conductor_cond);

            resistance = 2/(w*delta*conductor_cond);
            inductance = (mu0 * h)/ w;
            conductance = (diel_cond*w)/h;
            capacitance = (epsilon0*rel_perm*w)/h;
        }

        const resultText =  `R = ${resistance.toExponential(3)} Ω/m\n` +
           `L = ${inductance.toExponential(3)} H/m\n` +
           `G = ${conductance.toExponential(3)} S/m\n` +
           `C = ${capacitance.toExponential(3)} F/m`;
        setResult(resultText);
    }

    return (
        <div className="calculator-container">
            <div className="placeholder-form">
                <div className="form-group">
                    <label htmlFor="cableType">Selecione o tipo de cabo</label>
                    <select name="cableType" id="cableType" onChange={handleCableChange}>
                        <option value="0">Selecione uma opção</option>
                        <option value="1">Cabo coaxial</option>
                        <option value="2">Cabo de condutores gêmeos</option>
                        <option value="3">Linha planar</option>
                    </select>
                </div>
                {(cableType === "1") && (
                    <>
                        <div className="form-group">
                            <label htmlFor="innerRadius" id="labelChange1">Raio interno, em mm:</label>
                            <input type="text" name="innerRadius" id="innerRadius" placeholder="rᵢ" onChange={handleInnerRadiusChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="outerRadius" id="labelChange2">Raio externo, em mm:</label>
                            <input type="text" name="outerRadius" id="outerRadius" placeholder="rₑ" onChange={handleOuterRadiusChange} />
                        </div>
                    </>
                )}

                {(cableType === "2") && (
                    <>
                        <div className="form-group">
                            <label htmlFor="distance">Distância entre condutores (mm):</label>
                            <input type="text" id="distance" placeholder="d" onChange={handleDistanceChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="radius">Raio do fio condutor, em mm:</label>
                            <input type="text" name="radius" id="radius" placeholder="r" onChange={handleRadiusChange}/>
                        </div>
                    </>
                
                )}

                {(cableType ==="3") && (
                    <>
                        <div className="form-group">
                            <label htmlFor="width">Largura da faixa (mm):</label>
                            <input type="text" id="width" placeholder="w" onChange={handleWidthChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="height">Altura do dielétrico (mm):</label>
                            <input type="text" id="height" placeholder="h" onChange={handleHeightChange} />
                        </div>
                    </>
                )}
                

                <div className="form-group">
                    <label htmlFor="relativePermittivity">Permissividade relativa:</label>
                    <input type="text" name="relativePermittivity" id="relativePermittivity" placeholder="εᵣ" onChange={handleRelativePermChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="dielectricConductivity">Condutividade do dielétrico:</label>
                    <input type="text" name="dielectricConductivity" id="dielectricConductivity" placeholder="σd" onChange={handleDielectricCondChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="conductorConductivity">Condutividade do condutor:</label>
                    <input type="text" name="conductorConductivity" id="conductorConductivity" placeholder="σc" onChange={handleConductorCondChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="frequency">Frequência, em Hz:</label>
                    <input type="text" name="frequency" id="frequency" placeholder="f(Hz)" onChange={handleFrequencyChange}/>
                </div>

                <button className="btn ubuntu-medium" id="btnCalculator" onClick={telegraphCalc}>Calcular</button>
            </div>

            <div className="area-result">
                <h3>Resultado</h3>
                <div className="result-display">
                     {result && <pre>{result}</pre>}
                </div>
            </div>
        </div>
    );
}

export default TelegraphCalculator;