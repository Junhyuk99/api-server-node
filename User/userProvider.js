const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

//유저전체조회
exports.retrieveUserList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUser(connection);
    connection.release();

    return userListResult;
};

exports.retrieveUser = async function (userIdFromJWT) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userResult = await userDao.selectUserById(connection, userIdFromJWT);
    connection.release();
    return userResult[0];
};

exports.emailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return emailCheckResult;
};

//비밀번호 확인
exports.passwordCheck = async function (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    const passwordCheckResult = await userDao.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
};

//계정상태확인
exports.accountCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await userDao.selectUserAccount(connection, email);
    connection.release();

    return userAccountResult;
};