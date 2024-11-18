import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; 
import { useAuth } from "../../context/auth";

const SubmitReview = ({ productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `/api/v1/product/${productId}/review`,
        { comment, rating }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setComment("");
        setRating(0);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error.response?.data?.message || "Error submitting review");
    }
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <div style={{ display: 'flex', cursor: 'pointer' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                role="button"
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setRating(star); 
                }}
                style={{
                  fontSize: '24px',
                  color: star <= rating ? 'gold' : 'lightgray',
                  marginRight: '5px'
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows="4"
            placeholder="Write your review here"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginTop: '5px'
            }}
          />
        </div>
        <button 
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default SubmitReview;
