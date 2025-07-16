import Card from "../Card";
import "./ChapterSection.css";

function ChapterSection({chapter, cards, openMd}) {
    return(
        <div className="chapter-section">
            <h2 className="breadcrumbs ubuntu-regular">{chapter}</h2>
            <div className="card-grid">
                {
                    cards.map((card, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            description={card.description}
                            modalId={card.modalId}
                            link={card.link}
                            openMd={openMd}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default ChapterSection;
