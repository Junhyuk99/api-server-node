const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const creditDao = require("../Credit/creditDao");

// Provider: Read 비즈니스 로직 처리

// 유저 전체 결제수단 조회
exports.retrieveCredits = async function (userIdFromJWT) {
    const connection = await pool.getConnection(async (conn) => conn);
    const creditListResult = await creditDao.selectCredit(connection, userIdFromJWT);
    connection.release();

    return creditListResult;
};
