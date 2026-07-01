import React from 'react';

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-card__image" />
    <div className="skeleton-card__body">
      <div className="skeleton skeleton-card__line skeleton-card__line--short" />
      <div className="skeleton skeleton-card__line skeleton-card__line--medium" />
      <div className="skeleton skeleton-card__line skeleton-card__line--full" />
      <div className="skeleton skeleton-card__line skeleton-card__line--long" />
      <div className="skeleton-card__footer">
        <div className="skeleton skeleton-card__pill" />
        <div className="skeleton skeleton-card__pill" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
