import Header from "../../components/Header";
import Footer from "../../components/Footer";
import imgMoon from "../../assets/images/undraw_moonlight_ctir.svg"
import "./About.css"

function About() {
    return (
        <>
            <Header />
            <div className="about-container">
                <img src={imgMoon} alt="moon" />
                <p>Este projeto foi desenvolvido para a disciplina de Linhas de Transmissão e Ondas (2025.1) e inclui diversas calculadoras básicas sobre o tema, todas fundamentadas no livro Eletromagnetismo Aplicado, de Stuart.
                    <br />
                </p>
            </div>
            <Footer />
        </>
    )
};

export default About;