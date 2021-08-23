//유저 모든 결제수단 조회
async function selectCredit(connection, userIdFromJWT) {
    const selectCreditListQuery = `
                SELECT creditNumber,
                       creditExpiresAt as 만료일,
                       status,
                       createdAt,
                       updatedAt
                FROM Credit
                where creditUser_Idx = ?;
                `;
    const [creditRows] = await connection.query(selectCreditListQuery, userIdFromJWT);
    return creditRows;
}

module.exports = {
    selectCredit,
};