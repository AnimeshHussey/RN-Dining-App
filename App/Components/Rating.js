import React, { Component } from 'react'
import StarRating from 'react-native-star-rating';

class RatingComponent extends Component {

  onStarRatingPress(rating) {
    this.props.changedRating(rating);
  }

  render() {      
    return (
      <StarRating
        disabled={false}
        maxStars={10}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        rating={this.props.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'gold'}
      />
    );
  }
}

export default RatingComponent;