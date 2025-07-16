import ChapterSection from "../../components/ChapterSection";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import dataCards from "../../data/dataCards";
import { useState } from "react";

//Modais
import TelegraphCalculator from "../../components/TelegraphCalculator";
import Modal from "../../components/Modal";
import PropagationImpedance from "../../components/PropagationImpedance";
import PropagationSpeed from "../../components/PropagationSpeed";
import ReflectionRote from "../../components/ReflectionRote";
import ZinLL from "../../components/ZinLL";
import VInput from "../../components/VInput";
import Footer from "../../components/Footer";


function Cap2() {
    const [openModal, setOpenmodal] = useState(null);

    const handleOpenModal = (modalId) => {
        setOpenmodal(modalId);
    };

    const handleCloseModal = () =>  {
        setOpenmodal(null);
    }

    return (
        <>
            <Header />
            <div className="container">
                <Sidebar />
                <main>
                    <ChapterSection 
                        chapter={"Capítulo 2: Linhas de Transmissão"}
                        cards={dataCards["Capítulo 2"]} 
                        openMd={handleOpenModal}
                    />
                </main>
            </div>

            <Modal
                title="Equações Telegráficas"
                isOpen={openModal === "telegraph-equations"}
                onClose={handleCloseModal}
            >
                <TelegraphCalculator />
            </Modal>

            <Modal
                title="Constante de Propagação e Impedância Característica"
                isOpen={openModal === "propagation-impedance"}
                onClose={handleCloseModal}
            >
                <PropagationImpedance />
            </Modal>

            <Modal
                title="Velocidade de propagação"
                isOpen={openModal === "propagation-speed"}
                onClose={handleCloseModal}
            >
                <PropagationSpeed />
            </Modal>

            <Modal
                title="Coeficiente de reflexão e ROTE"
                isOpen={openModal === "reflection-rote"}
                onClose={handleCloseModal}
            >
                <ReflectionRote />
            </Modal>

            <Modal
                title="Impedância de entrada (Linha sem perdas)"
                isOpen={openModal === "zInputLL"}
                onClose={handleCloseModal}
            >
                <ZinLL />
            </Modal>

            <Modal
                title="Tensão de entrada"
                isOpen={openModal === "vInput"}
                onClose={handleCloseModal}
            >
                <VInput />
            </Modal>

            <Footer />

        </>
    );
}

export default Cap2;
