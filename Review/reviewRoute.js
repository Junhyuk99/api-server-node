module.exports = function(app){
    const review = require('../Review/reviewController');
    const jwtMiddleware = require('../../config/jwtMiddleware');

    // 23. 전체 리뷰 조회 API
    app.get('/reviews', review.getReviews);

    // 24. 특정 숙소 리뷰 조회 API
    app.get('/reviews/:roomIdx', review.getRoomReviews);

    // 25. 숙소 리뷰 등록 API (JWT)
    app.post('/reviews', jwtMiddleware, review.postReviews);

    // 26. 숙소 리뷰 수정 API (JWT)
    //app.patch('/reviews', jwtMiddleware, review.patchReviews);

};