const jwtMiddleware = require("../../config/jwtMiddleware");
const reviewProvider = require("../Review/reviewProvider");
const reviewService = require("../Review/reviewService");
const baseResponse = require("../../config/baseResponseStatus");
const {response, errResponse} = require("../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/* 23. [GET] /reviews 전체 리뷰 조회 */
exports.getReviews = async function (req, res) {

    const reviewListResult = await reviewProvider.retrieveReviewList();
    return res.send(response(baseResponse.SUCCESS, reviewListResult));
};

/* 24. [GET] /reviews/:roomIdx 특정 숙소 리뷰 조회 */
exports.getRoomReviews = async function (req, res) {
    //Path Variable : roomIdx
    const {roomIdx} = req.params;
    if (!roomIdx)
        return res.send(errResponse(baseResponse.ROOM_IDX_EMPTY));
    const roomReviewListResult = await reviewProvider.retrieveRoomReview(roomIdx);
    return res.send(response(baseResponse.SUCCESS, roomReviewListResult));
};

/* 25. [POST] /reviews 리뷰 등록 */
exports.postReviews = async function (req, res) {
    /* Body : reviewUser, reviewBook, reviewRoom, reviewInfo  */
    const userIdFromJWT = req.verifiedToken.userId

    const { reviewUser, reviewBook, reviewRoom, reviewInfo } = req.body;
    if (!reviewUser)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    if (!reviewBook)
        return res.send(errResponse(baseResponse.BOOK_IDX_EMPTY));
    if (!reviewRoom)
        return res.send(errResponse(baseResponse.ROOM_IDX_EMPTY));
    if (!reviewInfo)
        return res.send(errResponse(baseResponse.REVIEW_INFO_EMPTY));
    if (reviewInfo.length > 200)
        return res.send(errResponse(baseResponse.REVIEW_INFO_LENGTH));
    if (userIdFromJWT != reviewUser)
        return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));

    const createReviewResponse = await reviewService.createReview(reviewBook, reviewRoom, reviewInfo, userIdFromJWT);
    return res.send(createReviewResponse);
};
