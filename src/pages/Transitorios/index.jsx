import Header from "../../components/Header";
import PageCalc from "../../components/PageCalc";
import Sidebar from "../../components/Sidebar";
import "../../components/Modal/Modal.css"
import { useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register (
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);

const c = 3e8;

function Transitorios() {
    const [waveType, setWaveType] = useState(""); //tipo de onda
    const [pos, setPosition] = useState("") //Posicao de observacao
    const [vs, setVs] = useState(""); //Tensao da fonte
    const [rs, setRs] = useState(""); //Resistencia da fonte
    const [z0, setZ0] = useState(""); //impedancia caracteristica
    const [length, setLength] = useState("") //comprimento da linha
    const [u, setU] = useState(""); //Velocidade de propagacao 
    const [rl, setRl] = useState(""); //Resistencia da carga
    const [tMax, setTMax] = useState(""); //tempo final de simulacao

    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);

    //funcoes handleChange
    const handleChangeWaveType = (e) => {
        setWaveType(e.target.value);
    }

    const handleChangePosition = (e) => {
        setPosition(e.target.value);
    }

    const handleChangeVs = (e) => {
        setVs(e.target.value);
    }

    const handleChangeRs = (e) => {
        setRs(e.target.value);
    }

    const handleChangeZ0 = (e) => {
        setZ0(e.target.value);
    }

    const handleChangeLength = (e) => {
        setLength(e.target.value)
    }

    const handleChangeU = (e) => {
        setU(e.target.value);
    }

    const handleChangeRl = (e) => {
        setRl(e.target.value);
    }

    const handleChangeTimeMax = (e) => {
        setTMax(e.target.value);
    }

    function calculateTransients() {
        const vsValue = parseFloat(vs);
        const rsValue = parseFloat(rs);
        const z0Value = parseFloat(z0);
        const lineLength = parseFloat(length);
        const velocity = parseFloat(u);
        const rlValue = parseFloat(rl);
        const simulationTime = parseFloat(tMax);
        const wave = waveType;
        const position = pos;

        //1- Calcular os coeficientes de reflexao
        const gammaL = (rlValue - z0Value) / (rlValue + z0Value);
        const gammaS = (rsValue - z0Value) / (rsValue + z0Value);

        const lengthM = (1/100);
        const propagationSpeed = velocity * c;
        const transitTime = (lineLength / propagationSpeed) * (lengthM * 1e9)
        //console.log(transitTime);

        const v0 = vsValue * (z0Value/(z0Value+rsValue));
        //console.log(v0)

        //let steps = Math.ceil(simulationTime / transitTime);
      
        let vsArray = [];
        let vsFinal = [];
        const time = [];
     
        //tipo degrau
        if (wave === "2") {
            //Inicio da linha
            if(position === "1") {
                let currentTime = 0;

                for(let i = 0; currentTime < (simulationTime+1); i++) {
                    if(i === 0 ) {
                        time[i] = i;
                        currentTime = 2*transitTime;
                    } else {
                        time [i] = currentTime;
                        currentTime = currentTime + 2*transitTime;
                    }
                }
                //console.log(time);
                let a = 0;
                let aux = 0;
                for(let i = 0; i < time.length; i++) {
                    if(i === 0) {
                        vsArray[i] = v0;
                        vsFinal[i] = v0;
                    }
                }

                console.log(vsFinal);

            }
            //Centro da linha
            if (position === "2") {
                //Setup dos tempos
                let currentTime = 0;
                
                for(let i = 0; currentTime < (simulationTime+1); i++) {
                    if(i === 0 || i === 1) {
                        time[i] = i;
                        currentTime++;
                    } else {
                        time[i] = time[i-1] + transitTime;
                        currentTime += transitTime
                    }
                }
                //console.log(time);

                for(let i = 0; i < time.length; i++) {
                    if(i === 0) {
                        vsArray[i] = 0;
                        vsFinal[i] = 0;
                    } else if(i === 1) {
                        vsArray[i] = v0;
                        vsFinal[i] = v0;
                    } else if(i % 2 === 0) {
                        vsArray[i] = gammaL * vsArray[i - 1];
                        vsFinal[i] = vsFinal[i-1] + vsArray[i];
                    } else {
                        vsArray[i] = gammaS * vsArray[i - 1];
                        vsFinal[i] = vsFinal[i-1] + vsArray[i];
                    }

                }
                //console.log(vsArray);
                //console.log(vsFinal);
            }         
        }
        

        //Plotagem grafico
        setChartData({
            labels: time,
            datasets: [
                {
                    label: "V(l, t)",
                    data: vsFinal,
                    borderColor: "#02735E",
                    backgroundColor: "#02735E",
                    stepped: true,
                    pointRadius: 5,
                    pointBackgroundColor: "#014034",
                    fill: false,
                    tension: 0,
                },
            ],
        });

        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: "Gráfico da tensão",
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "t (ns)",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "V",
                    },
                    min: 0,
                    max: vsValue+1,
                },
            },
        });

    }

    return(
        <>
            <Header />
            <div className="container">
                <Sidebar />
                <main>
                   <PageCalc
                        tilte="Capítulo 2 - Transitórios"
                   >
                        <div className="calculator-container">
                            <div className="placeholder-form">
                                
                                <div className="form-group">
                                    <legend>Observação</legend>
                                    <div className="group-input">
                                        <div>
                                            <label htmlFor="wvType">Tipo de onda:</label>
                                            <select name="wvType" id="wvType" onChange={handleChangeWaveType}>
                                                <option value="0">Selecione...</option>
                                                {/*<option value="1">Impulso</option>*/} 
                                                <option value="2">Degrau</option>
                                                {/*<option value="3">Triangular</option> */}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="position">Posição de Observação:</label>
                                            <select name="position" id="position" onChange={handleChangePosition}>
                                                <option value="0">Selecione...</option>
                                                {/*<option value="1">Início da linha</option>*/}
                                                <option value="2">Centro da linha</option>
                                                {/*<option value="3">Final da linha</option>*/}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <legend>Fonte:</legend>
                                    <div className="group-input">
                                        <div>
                                            <label>Tensao da fonte (V):</label>
                                            <input type="text" id="rs" onChange={handleChangeVs}/>
                                        </div>
                                        <div>
                                            <label htmlFor="rs">Resistência da fonte (Ω)</label>
                                            <input type="text" id="rs" onChange={handleChangeRs}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <legend>Linha de Transmissão</legend>
                                    <div className="group-input">
                                        <div>
                                            <label htmlFor="z0">Impedância característica (Ω):</label>
                                            <input type="text" id="z0" onChange={handleChangeZ0}/>
                                        </div>
                                        <div>
                                            <label htmlFor="length">Comprimento da linha (cm):</label>
                                            <input type="text" id="length" onChange={handleChangeLength}/>
                                        </div>
                                    </div>
                                    <div className="group-input">
                                        <div>
                                            <label htmlFor="u">Velocidade de propagação (ex: 0.1)</label>
                                            <input type="text" id="u" onChange={handleChangeU}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <legend>Carga</legend>
                                        <div className="group-input">
                                            <div>
                                                <label htmlFor="rl">Resistencia da carga (Ω):</label>
                                                <input type="text" id="rl" onChange={handleChangeRl}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <legend>Simulação</legend>
                                        <div className="group-input">
                                            <div>
                                                <label htmlFor="timeMax">Tempo final (ns):</label>
                                                <input type="text" id="timeMax" onChange={handleChangeTimeMax}/>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn ubuntu-regular" onClick={calculateTransients}>Calcular</button>
                                </div>
                            </div>
                        </div>

                        <div className="area-result">
                            <h3>Resultado</h3>
                            <div className="result-display" id="result-vin">
                                {chartData && chartOptions && (
                                <div style={{ maxWidth: "100%" }}>
                                    <Line data={chartData} options={chartOptions} />
                                </div>
                                )}
                            </div>
                        </div>
                   </PageCalc>
                </main>
            </div>
        </>
    )
}

export default Transitorios;