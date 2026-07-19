/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Star, MessageSquare, Plus, Check } from 'lucide-react';
import { Review } from '../types';

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (review: { name: string; rating: number; comment: string }) => void;
}

export default function Reviews({ reviews, onAddReview }: ReviewsProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onAddReview({ name, rating, comment });
    setName('');
    setRating(5);
    setComment('');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowForm(false);
    }, 2500);
  };

  // Average Rating Calculation
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-white to-[#F5F3FF] relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-purple-300/10 blur-3xl animate-pulse pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left" id="reviews-header-info">
            <span className="text-sm font-sans font-bold uppercase tracking-widest text-[#5c1d9b]">
              What Customers Say
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#2D1B4D] tracking-tight">
              Honest Feedback & Gourmet Endorsements
            </h2>
            <p className="text-purple-900/80 font-sans max-w-xl mx-auto lg:mx-0">
              We strive to perfect every bite. Read genuine reviews from our daily diners, or leave your own review below!
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white" id="reviews-stat-board">
            <div className="text-5xl font-display font-extrabold text-[#5c1d9b]">{avgRating}</div>
            <div className="flex items-center space-x-1 mt-2 text-[#facc15]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(parseFloat(avgRating)) ? 'fill-[#facc15] text-[#facc15]' : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-purple-400 font-sans mt-2">Based on {reviews.length} authentic ratings</span>

            <button
              onClick={() => setShowForm(!showForm)}
              id="write-review-btn"
              className="mt-4 px-6 py-2.5 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-full text-sm font-sans font-bold transition-all duration-200 flex items-center space-x-2 cursor-pointer shadow-lg shadow-purple-100"
            >
              <Plus className="h-4 w-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Floating Write Review Form */}
        {showForm && (
          <div className="max-w-xl mx-auto mb-16 bg-white/95 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border border-purple-100 animate-slide-down" id="reviews-form-panel">
            <h3 className="text-lg font-display font-bold text-[#2D1B4D] mb-6 flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-[#5c1d9b]" />
              <span>Your Dining Experience</span>
            </h3>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-3" id="review-success-panel">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-display font-bold text-[#2D1B4D]">Thank You!</h4>
                <p className="text-sm text-purple-400 font-sans">Your feedback has been published successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="review-actual-form">
                <div>
                  <label className="block text-sm font-sans font-semibold text-[#2D1B4D] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] font-sans text-sm bg-white"
                    placeholder="e.g. Hammad Ahmed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-sans font-semibold text-[#2D1B4D] mb-1">Rating</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none cursor-pointer transition-transform duration-100 hover:scale-110"
                      >
                        <Star
                          className={`h-7 w-7 ${
                            star <= rating ? 'fill-[#facc15] text-[#facc15]' : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-sans font-semibold text-[#2D1B4D] mb-1">Comment</label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#5c1d9b] font-sans text-sm bg-white"
                    placeholder="Share details of your food flavor, delivery, or plating..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-full font-sans font-bold text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-purple-100"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        )}

        {/* Testimonials Slider/List */}
        {reviews.length === 0 ? (
          <div className="text-center py-16 bg-white/40 backdrop-blur-md rounded-[2rem] border border-dashed border-purple-200 p-8" id="empty-reviews-placeholder">
            <span className="text-4xl">✨</span>
            <h4 className="text-lg font-display font-bold text-[#2D1B4D] mt-4">No Reviews Yet</h4>
            <p className="text-sm text-purple-400 font-sans mt-2 max-w-sm mx-auto">
              Be the very first one to share your delightful dining experience at Chession Fast Food!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 px-5 py-2.5 bg-[#5c1d9b] hover:bg-[#3b0764] text-white rounded-xl text-xs font-sans font-bold transition-all cursor-pointer"
            >
              Write First Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="reviews-list-grid">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-xl shadow-purple-900/5 border border-white flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
                id={`review-card-${rev.id}`}
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 text-[#facc15]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= rev.rating ? 'fill-[#facc15] text-[#facc15]' : 'text-slate-100'
                        }`}
                      />
                    ))}
                  </div>
                  {/* Comment */}
                  <p className="text-purple-900/90 font-sans text-sm leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-purple-100/60" id={`review-card-author-${rev.id}`}>
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover border-2 border-[#5c1d9b]/10"
                  />
                  <div>
                    <h4 className="text-sm font-display font-bold text-[#2D1B4D]">{rev.name}</h4>
                    <span className="text-[10px] text-purple-400 font-mono">
                      {new Date(rev.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
