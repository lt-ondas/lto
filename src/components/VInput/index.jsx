import { use, useState } from "react";
import { useAsyncError } from "react-router-dom";
import { create, all, parse} from "mathjs";

function VInput() {
    const math = create(all);
    const pi = Math.PI;

    const [vssMag, setVssMag] = useState("");
    const [vssPhase, setVssPhase] = useState("");
    const [zinRE, setZinRE] = useState("");
    const [zinIM, setZinIM] = useState("");
    const [zsRE, setZsRE] = useState("");
    const [zsIM, setZsIM] = useState("");
    const [result, setResult] = useState("");

    //eventschange
    const handleVssMagChange = (event) => {
        setVssMag(event.target.value);
    }

    const handleVssPhaseChange = (event) => {
        setVssPhase(event.target.value);
    }

    const handleZinReChange = (event) => {
        setZinRE(event.target.value);
    }

    const handleZinImChange = (event) => {
        setZinIM(event.target.value);
    }

    const handleZsReChange = (event) => {
        setZsRE(event.target.value);
    }

    const handleZsImChange = (event) => {
        setZsIM(event.target.value);
    }

    function handleCalculate () {
        let vss_mag = parseFloat(vssMag);
        let vss_phase_deg = parseFloat(vssPhase);
        let vss_phase_rad = vss_phase_deg * pi/180;

        let vss_real = vss_mag * Math.cos(vss_phase_rad);
        let vss_im = vss_mag * Math.sin(vss_phase_rad);
        let vss = math.complex(vss_real, vss_im);

        //impedancia de entrada
        let zinputRE = parseFloat(zinRE);
        let zinputIM = parseFloat(zinIM);
        let zin = math.complex(zinputRE, zinputIM);

        //Impedancia
        let zs_RE = parseFloat(zsRE)
        let zs_IM = parseFloat(zsIM)
        let zs = math.complex(zs_RE, zs_IM);

        let zEq = math.add(zs, zin);
        let frac = math.divide(zin, zEq);
        let vin = math.multiply(vss, frac);
        
        let vinMag = math.abs(vin).toFixed(2);
        let vinPhase = math.arg(vin)*180/pi;
        vinPhase = vinPhase.toFixed(2);

        const resultText = `Vin =  ${vinMag}∠${vinPhase}° V `
        setResult(resultText);
        
    }

    return(
        <div className="calculator-container">
            <div className="placeholder-form">
                <div className="form-group">
                    <label htmlFor="vssMag">Amplitude de Vss (V):</label>
                    <input type="text" id="vssMag" onChange={handleVssMagChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="vssPhase">Fase de Vss (°):</label>
                    <input type="text" name="vssPhase" id="vssPhase" onChange={handleVssPhaseChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="zinLabel">Impedância de entrada:</label>
                    <div className="group-input">
                        <div>
                            <label htmlFor="zinRE">Parte real:</label>
                            <input type="text" id="zinRE" onChange={handleZinReChange}/>
                        </div>
                        <div>
                            <label htmlFor="zinIM">Parte imaginária:</label>
                            <input type="text" id="zinIM" onChange={handleZinImChange}/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                
                    <label htmlFor="#">Impedância da fonte:</label>
                    <div className="group-input">
                        <div>
                            <label htmlFor="zsRE">Parte Real:</label>
                            <input type="text" id="zsRE" onChange={handleZsReChange}/>
                        </div>
                        <div>
                            <label htmlFor="zsIM">Parte imaginária:</label>
                            <input type="text" id="zsIM" onChange={handleZsImChange}/>
                        </div>
                    </div>
                </div>

                <button className="btn ubuntu-regular" onClick={handleCalculate}>Calcular</button>
        

        </div>
        <div className="area-result">
            <h3>Resultado</h3>
            <div className="result-display" id="result-vin">
                <h4>{result}</h4>
            </div>
        </div>

        </div>
    );
}

export default VInput;
