const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const bookDao = require("../Book/bookDao");

// Provider: Read 비즈니스 로직 처리

//전체 예약 조회
exports.retrieveBookList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const bookListResult = await bookDao.selectBook(connection);
    connection.release();

    return bookListResult;
};

exports.retrieveRoomBook = async function (roomIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const roomBookResult = await bookDao.selectRoomBook(connection, roomIdx);
    connection.release();

    return roomBookResult;
};

exports.retrieveUserBook = async function (userIdFromJWT) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userBookResult = await bookDao.selectUserBook(connection, userIdFromJWT);
    connection.release();

    return userBookResult;
}