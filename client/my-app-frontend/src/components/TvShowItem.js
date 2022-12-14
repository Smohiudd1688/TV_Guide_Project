import React, {useState, useEffect} from "react";
import TvReview from "./TvReview";
import ReviewForm from "./ReviewForm";

function TvShowItem({id, title, image, numOfSeasons}) {
    const [isReviewFormOn, setIsReviewFormOn] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9292/shows/${id}/reviews`)
        .then(response => response.json())
        .then(data => setReviews(data));
    }, []);

    const renderReviews = reviews.map(reviewItem => {
        return <TvReview
                    key={reviewItem.id}
                    rating={reviewItem.rating}
                    review={reviewItem.review}
                    name={reviewItem.name}
                    id={reviewItem.id}
                    onHandleDelete={handleDelete}
                    onUpdateReviewSubmit={handleUpdate}
                />
    });

    function handleDelete(deletedReview) {
        const updatedReviews = reviews.filter(reviewItem => {
            return reviewItem.id !== deletedReview.id;
        });

        setReviews(updatedReviews);
    }

    function handleUpdate(updatedReview) {
        const updatedReviews = reviews.map(reviewItem => {
            if (reviewItem.id === updatedReview.id) {
                return updatedReview;
            }
            return reviewItem;
        });

        setReviews(updatedReviews);
    }

    function handleReviewFormSubmit(newReview) {
        setIsReviewFormOn(false);
        setReviews([...reviews, newReview]);
    }

    return (
        <div className="show">
            <h3>{title}</h3>
            <img src={image} />
            <p>Number of Seasons: <strong>{numOfSeasons}</strong></p><br></br>
            {renderReviews}
            <button className="addButton" onClick={() => setIsReviewFormOn(!isReviewFormOn)}>
                {isReviewFormOn? "Don't Add Review" : "Add Review"}
            </button>
            {isReviewFormOn ? <ReviewForm id={id} onReviewFormSubmit={handleReviewFormSubmit} /> : null}
        </div>
    );
}

export default TvShowItem;