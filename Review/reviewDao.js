//모든 리뷰 조회
async function selectReview(connection) {
    const selectReviewListQuery = `
                SELECT * 
                FROM Review;
                `;
    const [reviewRows] = await connection.query(selectReviewListQuery);
    return reviewRows;
}

//특정 숙소 리뷰 조회
async function selectRoomReview(connection, roomIdx){
    const selectRoomReviewQuery = `
                SELECT *
                FROM Review
                WHERE reviewRoom_Idx = ?;
    `;
    const [reviewRoomRows] = await connection.query(selectRoomReviewQuery, roomIdx);
    return reviewRoomRows;
}

//예약 존재 여부 조회
async function selectBookExist(connection, reviewBook){
    const selectBookQuery = `
        SELECT idx
        FROM Book
        WHERE idx = ?;
    `;
    const [bookRow] = await connection.query(selectBookQuery, reviewBook);
    return bookRow;
}

//예약 숙소 일치여부 조회
async function selectBookRoom(connection, bookRoomParams){
    const selectBookRoomQuery = `
            SELECT bookRoom_Idx
            FROM Book
            WHERE idx = ? AND bookRoom_Idx = ?;
    `;
    const [bookRoomRow] = await connection.query(selectBookRoomQuery, bookRoomParams);
    return bookRoomRow;
}

//리뷰 생성
async function insertReviewInfo(connection, insertReviewInfoParams){
    const insertReviewInfoQuery = `
        INSERT INTO Review (reviewBook_Idx, reviewRoom_Idx, reviewInfo, reviewUser_Idx)
        VALUES (?, ?, ?, ?);
    `;
    const insertReviewInfoRow = await connection.query(
        insertReviewInfoQuery,
        insertReviewInfoParams
    );
    return insertReviewInfoRow;
}


module.exports = {
    selectReview,
    selectRoomReview,
    selectBookExist,
    insertReviewInfo,
    selectBookRoom,
};