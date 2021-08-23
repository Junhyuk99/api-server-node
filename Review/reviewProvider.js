const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const reviewDao = require("../Review/reviewDao");

// Provider: Read 비즈니스 로직 처리

//전체 리뷰 조회
exports.retrieveReviewList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const reviewListResult = await reviewDao.selectReview(connection);
    connection.release();

    return reviewListResult;
};

//특정 숙소 리뷰 조회
exports.retrieveRoomReview = async function (roomIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const roomReviewResult = await reviewDao.selectRoomReview(connection, roomIdx);
    connection.release();

    return roomReviewResult;
}

//예약 여부 조회
exports.bookCheck = async function(reviewBook){
    const connection = await pool.getConnection(async (conn) => conn);
    const bookCheckResult = await reviewDao.selectBookExist(connection, reviewBook);
    connection.release();

    return bookCheckResult;
};

//예약, 숙소 일치여부 조회
exports.bookRoomCheck = async function (reviewBook, reviewRoom){
    const bookRoomParams = [reviewBook, reviewRoom];
    const connection = await pool.getConnection(async (conn) => conn);
    const bookRoomCheckResult = await reviewDao.selectBookRoom(connection, bookRoomParams);
    connection.release();

    return bookRoomCheckResult;
}