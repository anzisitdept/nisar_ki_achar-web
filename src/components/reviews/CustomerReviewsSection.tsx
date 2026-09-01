'use client';

import React, { useEffect, useState } from 'react';
import { Review } from '@/types';
import {
  subscribeProductReviews,
  subscribeAllApprovedReviews,
  saveReviewToFirestore
} from '@/lib/firestoreServices';

interface CustomerReviewsSectionProps {
  productId?: string;
}

const FALLBACK_REVIEWS: {
  id: string;
  author: string;
  createdAt: string;
  rating: number;
  title: string;
  body: string;
  isVerified: boolean;
}[] = [
  {
    id: 'fallback-rev-1',
    author: 'Naveed iqbal khan Khan',
    createdAt: '07/13/2026',
    rating: 5,
    title: 'Good in',
    body: 'Good in taste',
    isVerified: true
  },
  {
    id: 'fallback-rev-2',
    author: 'Naveed Taj Ghauri',
    createdAt: '07/09/2026',
    rating: 5,
    title: 'Excellent by all means',
    body: 'Excellent by all means. 10/10',
    isVerified: true
  }
];

export default function CustomerReviewsSection({ productId }: CustomerReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ author: '', rating: 5, title: '', body: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    if (productId) {
      unsub = subscribeProductReviews(productId, (rs) => setReviews(rs));
    } else {
      unsub = subscribeAllApprovedReviews((rs) => setReviews(rs));
    }
    return () => { if (unsub) unsub(); };
  }, [productId]);

  const total = reviews.length;
  const avgRating = total
    ? reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / total
    : 4.87;

  const histogram = [5, 4, 3, 2, 1].map(star => {
    const count = total
      ? reviews.filter(r => (r.rating || 5) === star).length
      : star === 5 ? 83 : star === 4 ? 10 : star === 3 ? 1 : 0;
    const pct = total
      ? Math.round((count / total) * 100)
      : star === 5 ? 88 : star === 4 ? 10 : star === 3 ? 2 : 0;
    return {
      stars: '★'.repeat(star) + '☆'.repeat(5 - star),
      count,
      pct
    };
  });

  const displayReviews = reviews.length > 0 ? reviews : FALLBACK_REVIEWS;

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) {
      alert('Please open the reviews from a product page to write a review.');
      return;
    }
    if (!reviewForm.author.trim() || !reviewForm.title.trim() || !reviewForm.body.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsSubmittingReview(true);
    const res = await saveReviewToFirestore({
      productId,
      author: reviewForm.author,
      rating: reviewForm.rating,
      title: reviewForm.title,
      body: reviewForm.body,
      isVerified: false,
      status: 'pending'
    });
    setIsSubmittingReview(false);
    if (res.success) {
      setSubmitSuccessMsg('Shukriya! Your review has been submitted for moderation and will appear once approved by the administrator.');
      setReviewForm({ author: '', rating: 5, title: '', body: '' });
      setTimeout(() => setSubmitSuccessMsg(null), 8000);
      setWriteReviewOpen(false);
    } else {
      alert('Error submitting review. Please try again.');
    }
  };

  return (
    <div className="px-4 md:px-6">
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 700, textAlign: 'center', marginBottom: '24px' }}>
        Customer Reviews
      </h2>

      {/* Breakdown bar box */}
      <div style={{ maxWidth: '600px', margin: '0 auto 40px auto', textAlign: 'center' }}>
        <div style={{ color: '#e60000', fontSize: '20px', marginBottom: '4px' }}>★★★★★</div>
        <p style={{ fontSize: '13px', color: '#333', fontWeight: 600, marginBottom: '16px' }}>
          {total > 0
            ? `${avgRating.toFixed(2)} out of 5 based on ${total} reviews`
            : '4.87 out of 5 based on 94 reviews'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
          {histogram.map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
              <span style={{ color: '#e60000', width: '60px', textAlign: 'right' }}>{row.stars}</span>
              <div style={{ flex: 1, height: '10px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${row.pct}%`, height: '100%', background: '#e60000' }} />
              </div>
              <span style={{ width: '20px', color: '#777', textAlign: 'left' }}>{row.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Write a Review Button and Form */}
      <div style={{ maxWidth: '750px', margin: '0 auto 30px auto', textAlign: 'center' }}>
        {submitSuccessMsg && (
          <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, marginBottom: '20px', border: '1px solid #c3e6cb' }}>
            {submitSuccessMsg}
          </div>
        )}

        {!writeReviewOpen ? (
          <button
            onClick={() => setWriteReviewOpen(true)}
            className="w-full sm:w-auto bg-[#e60000] hover:bg-[#cc0000] active:scale-[0.98] text-white font-bold text-xs sm:text-sm tracking-wider px-6 py-3 rounded-md transition shadow uppercase cursor-pointer"
          >
            Write A Review (رائے لکھیں)
          </button>
        ) : (
          <form onSubmit={handleReviewSubmit} className="bg-[#fcfcfc] border border-gray-200 p-4 sm:p-6 rounded-lg text-left mt-5 shadow-xs">
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: '#111' }}>
              Write a Review
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700">Your Name *</label>
                <input
                  type="text"
                  required
                  value={reviewForm.author}
                  onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#e60000]"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-gray-700">Rating *</label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                  className="w-full p-2.5 border border-gray-300 rounded-md text-xs sm:text-sm bg-white focus:outline-none focus:border-[#e60000]"
                >
                  <option value="5">★★★★★ (5 Stars)</option>
                  <option value="4">★★★★☆ (4 Stars)</option>
                  <option value="3">★★★☆☆ (3 Stars)</option>
                  <option value="2">★★☆☆☆ (2 Stars)</option>
                  <option value="1">★☆☆☆☆ (1 Star)</option>
                </select>
              </div>
            </div>

            <div className="mb-3.5">
              <label className="block text-xs font-semibold mb-1 text-gray-700">Review Title *</label>
              <input
                type="text"
                required
                value={reviewForm.title}
                onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#e60000]"
                placeholder="Give your review a title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1 text-gray-700">Review Body *</label>
              <textarea
                required
                rows={4}
                value={reviewForm.body}
                onChange={(e) => setReviewForm({ ...reviewForm, body: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-md text-xs sm:text-sm resize-y focus:outline-none focus:border-[#e60000]"
                placeholder="Write your comments here..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full sm:w-auto bg-[#e60000] hover:bg-[#cc0000] disabled:bg-gray-400 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-md transition cursor-pointer disabled:cursor-not-allowed shadow-sm active:scale-[0.98]"
              >
                {isSubmittingReview ? 'Submitting...' : 'Submit Review (رائے ارسال کریں)'}
              </button>
              <button
                type="button"
                onClick={() => setWriteReviewOpen(false)}
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs sm:text-sm px-6 py-3 border border-gray-300 rounded-md transition cursor-pointer active:scale-[0.98]"
              >
                Cancel (منسوخ کریں)
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Individual Reviews list */}
      <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {(displayReviews as any[]).map((rev, idx: number) => (
          <div key={rev.id || `fallback-rev-${idx}`} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ color: '#e60000', fontSize: '14px' }}>
                {'★'.repeat(rev.rating || 5)}{'☆'.repeat(5 - (rev.rating || 5))}
              </div>
              <span style={{ fontSize: '11px', color: '#999' }}>{rev.createdAt}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontWeight: 700, fontSize: '13px', color: '#111' }}>{rev.author}</span>
              {rev.isVerified && (
                <span style={{ background: '#e60000', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '2px' }}>
                  ✓ Verified
                </span>
              )}
            </div>
            <p style={{ fontWeight: 700, fontSize: '13px', color: '#222', marginBottom: '4px' }}>{rev.title}</p>
            <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.5 }}>{rev.body}</p>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 text-xs sm:text-sm font-bold text-[#e60000] mt-3">
          <span className="w-8 h-8 flex items-center justify-center rounded border border-[#e60000] bg-[#e60000] text-white cursor-default">1</span>
          <span className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">2</span>
          <span className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">3</span>
          <span className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">&gt;</span>
          <span className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-700 hover:bg-gray-50 cursor-pointer">&raquo;</span>
        </div>
      </div>
    </div>
  );
}