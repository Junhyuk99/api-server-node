//모든 숙소 조회
async function selectRoom(connection) {
    const selectRoomListQuery = `
                SELECT * 
                FROM Room;
                `;
    const [roomRows] = await connection.query(selectRoomListQuery);
    return roomRows;
}

//숙소 등록
async function insertRoomInfo(connection, insertRoomInfoParams) {
    const insertRoomInfoQuery = `
        INSERT INTO Room (roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
                          roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomLati, roomLongi, roomUploadUser_Idx)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const insertRoomInfoRow = await connection.query(
        insertRoomInfoQuery,
        insertRoomInfoParams
    );

    return insertRoomInfoRow;
}

//id로 유저 숙소 조회
async function selectRoomByIdx(connection, roomIdx) {
    const selectRoomIdQuery = `
            SELECT roomLocation, roomCapacity, roomBed, roomBedroom, roomBathroom, roomType, roomPrice,
                   roomDesc, roomKind, roomConvenient, roomImageUrl, roomName, roomInfo, roomUploadUser_Idx
            FROM Room
            WHERE idx = ?;
            `;
    const [roomRow] = await connection.query(selectRoomIdQuery, roomIdx);
    return roomRow;
}

//특정 유저 업로드 숙소 조회
async function selectRoomByUserId(connection, userIdx) {
    const selectRoomUserQuery = `
        select *
        from Room
        where roomUploadUser_Idx = ?
    `;
    const[roomUserRow] = await connection.query(selectRoomUserQuery, userIdx);
    return roomUserRow;
}

//특정 숙소 정보 수정
async function editRoomInfo(connection, editRoomInfoParams) {
    const editRoomQuery = `
            UPDATE Room
            SET roomLocation=?, roomCapacity=?, roomBed=?, roomBedroom=?, roomBathroom=?, roomType=?, roomPrice=?,
                roomDesc=?, roomKind=?, roomConvenient=?, roomImageUrl=?, roomName=?, roomInfo=?, roomLati=?, roomLongi=? 
            WHERE idx = ? AND roomUploadUser_Idx = ?;
    `;
    const [roomEditRow] = await connection.query(editRoomQuery, editRoomInfoParams);
    return roomEditRow;
}

//특정 숙소 삭제
async function deleteRoomByIdx(connection, deleteRoomParams) {
    const deleteRoomQuery = `
            UPDATE Room
            SET status = "INACTIVE"
            WHERE idx = ? AND roomUploadUser_Idx = ?;
    `;
    const [roomDeleteRow] = await connection.query(deleteRoomQuery, deleteRoomParams);
    return roomDeleteRow;
}

module.exports = {
    selectRoom,
    insertRoomInfo,
    selectRoomByUserId,
    selectRoomByIdx,
    editRoomInfo,
    deleteRoomByIdx,
};