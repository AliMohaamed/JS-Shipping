export function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    let starsHTML = "";
  
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += `<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_375_9172)"><path d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z" fill=""></path></g><defs><clipPath id="clip0_375_9172"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg>`;
    }
  
    // Half star if needed
    if (hasHalfStar) {
      starsHTML += `<svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="#d1d5db"/></linearGradient></defs><g clip-path="url(#clip0_375_9172)"><path d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z" fill="url(#half-star)"></path></g><defs><clipPath id="clip0_375_9172"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg>`;
    }
  
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += `<svg width="18" height="18" viewBox="0 0 18 18" fill="#d1d5db" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_375_9172)"><path d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z" fill="#d1d5db"></path></g><defs><clipPath id="clip0_375_9172"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg>`;
    }
  
    return starsHTML;
  }