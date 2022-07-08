const VIEW_REVIEWS = "reviews/VIEW_REVIEWS"


const view = (reviews) => ({
    type: VIEW_REVIEWS,
    reviews
})


export const viewReviews = () => async (dispatch) => {
    const response = await fetch("/api/reviews");
    //   console.log("INSIDE VIEW PRODUCTS THUNK", response);

      if (response.ok) {
        const reviews = await response.json();

        dispatch(view(reviews.reviews));
        return reviews.reviews;
      } else {
        const errors = await response.json();
        return errors;
      }
}


const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
        case VIEW_REVIEWS:
            const normalizedReviews = {};
            action.reviews.forEach((review) => {
                normalizedReviews[review.id] = review;
            });
            return { ...normalizedReviews }
        default:
            return state;
    };
};

export default reviewsReducer;
