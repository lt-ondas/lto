import { useState } from "react";
import { create, all } from "mathjs";

const math = create(all);

function ZinLL() {
    const [zCharRE, setZCharRE] = useState("");
    const [zCharIM, setZCharIM] = useState("");
    const [zLRE, setZLRe] = useState("");
    const [zLIM, setZLIm] = useState("");
    const [beta, setBeta] = useState("");
    const [l_line, setLLine] = useState("");
    const [result, setResult] = useState(null);

    const handleChangeZ0re = (e) => {
        setZCharRE(e.target.value);
    }

    const handleChangeZ0im = (e) => {
        setZCharIM(e.target.value);
    }

    const handleChangeZLre = (e) => {
        setZLRe(e.target.value);
    }

    const handleChangeZLim = (e) => {
        setZLIm(e.target.value);
    }

    const handleChangeBeta = (e) => {
        setBeta(e.target.value);
    }

    const handleChangeLLine = (e) => {
        setLLine(e.target.value);
    }

    function calcZin() {
        let z0_re = parseFloat(zCharRE);
        let z0_im = parseFloat(zCharIM);
        let zL_re = parseFloat(zLRE);
        let zL_im = parseFloat(zLIM);
        let b = parseFloat(beta);
        let line = parseFloat(l_line);

        let z0 = math.complex(z0_re, z0_im);
        let zL = math.complex(zL_re, zL_im);
        const j = math.complex(0, 1);

        const angle = b * line;

        let zin;

        if(Math.abs(Math.cos(angle))  < 1e-3) {
            zin = math.divide(math.multiply(z0, z0), zL);
        } else {
            const tanBL = Math.tan(angle);
            const jTanBL = math.multiply(j, tanBL);

            const numerator   = math.add(zL,   math.multiply(z0,   jTanBL));
            const denominator = math.add(z0,   math.multiply(zL,   jTanBL));
            zin = math.multiply(z0, math.divide(numerator, denominator));
        }

        zin = math.format(zin, { precision: 4 });
        setResult(zin);
    }

    return(
        <div className="calculator-container">
                    <div className="placeholder-form">
                        <div className="form-group">
                        <label htmlFor="zChar">Impedância característica (Z₀):</label>
                            <div className="group-input">
                                <div>
                                    <label htmlFor="zCharRE">Parte real:</label>
                                    <input type="text" id="zCharRE" onChange={handleChangeZ0re}/>
                                </div>
                                <div>
                                    <label htmlFor="zCharIM">Parte imaginária:</label>
                                    <input type="text" id="zCharIM"  onChange={handleChangeZ0im}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                        <label htmlFor="zL">Impedância de carga (ZL):</label>
                            <div className="group-input">
                                <div>
                                    <label htmlFor="zLRE">Parte real:</label>
                                    <input type="text" id="zLRE" onChange={handleChangeZLre}/>
                                </div>
                                <div>
                                    <label htmlFor="zLIM">Parte imaginária:</label>
                                    <input type="text" id="zLIM"  onChange={handleChangeZLim}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="beta">Constante de fase (β, rad/m):</label>
                            <input type="text" id="beta" onChange={handleChangeBeta}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="l_line">Comprimento da linha (ℓ, m):</label>
                            <input type="text" id="l_line" onChange={handleChangeLLine}/>
                        </div>

                        <button className="btn ubuntu-regular" onClick={calcZin}>Calcular</button>
                    </div>
                
                <div className="area-result">
                    <h3>Resultado</h3>
                    
                    <div className="result-display" id="result-z0">
                        {result && (
                            <h4>Zin = <span>{result}  Ω</span></h4>
                        )}
                    </div>
                </div>
        </div>

    );
}

export default ZinLL;