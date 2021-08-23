const {logger} = require("../../config/winston");
const {pool} = require("../../config/database");
const secret_config = require("../../config/secret");
const reviewProvider = require("./reviewProvider");
const wishlistProvider = require("../Wishlist/wishlistProvider");
const reviewDao = require("./reviewDao");
const baseResponse = require("../../config/baseResponseStatus");
const {response} = require("../../config/response");
const {errResponse} = require("../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

//리뷰 등록
exports.createReview = async function (reviewBook, reviewRoom, reviewInfo, userIdFromJWT){
    try {
        const roomRows = await wishlistProvider.roomCheck(reviewRoom);
        if (roomRows.length < 1)
            return errResponse(baseResponse.EDIT_NO_ROOM);
        const bookRows = await reviewProvider.bookCheck(reviewBook);
        if (bookRows.length < 1)
            return errResponse(baseResponse.CREATE_NO_BOOK);
        const bookRoomRows = await reviewProvider.bookRoomCheck(reviewBook, reviewRoom);
        if (bookRoomRows.length<1)
            return errResponse(baseResponse.BOOK_NO_ROOM);
        const insertReviewInfoParams = [reviewBook, reviewRoom, reviewInfo, userIdFromJWT];
        const connection = await pool.getConnection(async (conn) => conn);

        const reviewResult = await reviewDao.insertReviewInfo(connection, insertReviewInfoParams);
        console.log(`추가된 리뷰 : ${reviewResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch(err) {
        logger.error(`App - createReview Service error \n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};