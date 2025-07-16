import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Error404.css";
import errorImg from "../../assets/images/undraw_taken_mshk.svg";

function Error404() {
    return(
        <>
            <Header />
            <div className="not-found">
                <img src={errorImg} alt="error" />
                <div className="text-error">
                    <h1>Lamentavél!</h1>
                    <h2>Erro 404 - Essa página não existe.</h2>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Error404;