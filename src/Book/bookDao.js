//모든 예약 조회
async function selectBook(connection) {
    const selectBookListQuery = `
                SELECT * 
                FROM Book;
                `;
    const [bookRows] = await connection.query(selectBookListQuery);
    return bookRows;
}

async function selectRoomBook(connection, roomIdx){
    const selectRoomBookListQuery = `
                SELECT *
                FROM Book     
                WHERE bookRoom_Idx = ?;
    `;
    const [roomBookRows] = await connection.query(selectRoomBookListQuery, roomIdx);
    return roomBookRows;
}

async function selectUserBook(connection, userIdFromJWT) {
    const selectUserBookListQuery = `
                SELECT *
                FROM Book     
                WHERE bookUser_Idx = ?;
    `;
    const [userBookRows] = await connection.query(selectUserBookListQuery, userIdFromJWT);
    return userBookRows;
}

module.exports = {
    selectBook,
    selectRoomBook,
    selectUserBook,
};