import React, { useState } from "react";
import "./index.css";

interface StarRatingProps {
  totalStars?: number;
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  onChange,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleRatingClick = (starValue: number) => {
    setRating(starValue);
    onChange(starValue);
  };

  const handleMouseEnter = (starValue: number) => {
    setHoverRating(starValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div onMouseLeave={handleMouseLeave}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= (hoverRating || rating);

        return (
          <span
            key={starValue}
            className={`star ${isActive ? "star-rating" : ""}`}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onClick={() => handleRatingClick(starValue)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

const ParentComponent = () => {
  const [productRating, setProductRating] = useState(3);

  return (
    <div className="p-8">
      <h2 className="text-xl">Rate this Product</h2>
      <StarRating
        totalStars={5}
        onChange={(newRating) => setProductRating(newRating)}
      />
      <p className="mt-4">Your selected rating is: {productRating}</p>
    </div>
  );
};

export default ParentComponent;
