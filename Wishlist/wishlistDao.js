//유저 모든 폴더 조회
async function selectFolder(connection, userIdFromJWT) {
    const selectFolderListQuery = `
        SELECT *
        FROM WishlistFolder
        where wishFolderUser_Idx = ?;
    `;
    const [folderRows] = await connection.query(selectFolderListQuery, userIdFromJWT);
    return folderRows;
}

//유저 특정 위시리스트 조회
async function selectWishlist(connection, wishSearchParams) {
    const selectWishlistQuery = `
        SELECT wishFolderUser_Idx as wishFolderUser,
               wishFolder_Idx     as wishFolder,
               wishRoom_Idx       as wishRoom,
               Wishlist.status
        FROM Wishlist
                 inner join WishlistFolder
        where wishFolder_Idx = ? && wishFolderUser_Idx = ?
    `;
    const [wishlistRows] = await connection.query(selectWishlistQuery, wishSearchParams);
    //console.log(wishlistRows)
    return wishlistRows;
}

//위시리스트 폴더 등록
async function insertFolderInfo(connection, insertFolderInfoParams) {
    const insertFolderInfoQuery = `
        INSERT INTO WishlistFolder (wishFolderUser_Idx, wishFolderName, wishFolderImageUrl)
        VALUES (?, ?, ?);
    `;
    const insertFolderInfoRow = await connection.query(insertFolderInfoQuery, insertFolderInfoParams);

    return insertFolderInfoRow;
}

//위시리스트 추가
async function insertWishInfo(connection, insertWishInfoParams) {
    const insertWishInfoQuery = `
        INSERT INTO Wishlist (wishFolder_Idx, wishRoom_Idx)
        VALUES (?, ?);
    `;
    const insertWishInfoRow = await connection.query(insertWishInfoQuery, insertWishInfoParams);
    return insertWishInfoRow;
}

//폴더 정보 수정
async function editFolderByIdx(connection, updateFolderParams) {
    const editFolderQuery = `
        UPDATE WishlistFolder
        SET wishFolderName     = ?,
            wishFolderImageUrl = ?
        WHERE idx = ?;
    `;
    const [editRow] = await connection.query(editFolderQuery, updateFolderParams);
    return editRow;
}

//폴더 삭제
async function deleteFolderByIdx(connection, deleteFolderParams){
    const deleteFolderQuery = `
        UPDATE WishlistFolder
        SET status = "INACTIVE"
        WHERE idx = ? AND wishFolderUser_Idx = ?;
    `;
    const [deleteFolderRow] = await connection.query(deleteFolderQuery, deleteFolderParams);
    return deleteFolderRow;
}

//위시 정보 수정
async function editWishByIdx(connection, updateWishParams) {
    const editWishQuery = `
        UPDATE Wishlist
        SET wishFolder_Idx = ?,
            wishRoom_Idx   = ?
        WHERE idx = ?;
    `;
    const [editWishRow] = await connection.query(editWishQuery, updateWishParams);
    return editWishRow;
}

//위시 삭제
async function deleteWishByIdx(connection, deleteWishParams){
    const deleteWishQuery = `
        UPDATE Wishlist
        SET status = "INACTIVE"
        WHERE idx = ? AND wishUser_Idx = ?;
    `;
    const [deleteWishRow] = await connection.query(deleteWishQuery, deleteWishParams);
    return deleteWishRow;
}

//폴더 존재 확인
async function selectFolderExist(connection, folderIdx) {
    const selectFolderQuery = `
        SELECT idx
        FROM WishlistFolder
        WHERE idx = ?;
    `;
    const [folderRow] = await connection.query(selectFolderQuery, folderIdx);
    return folderRow;
}

//위시 존재 확인
async function selectWishExist(connection, wishIdx) {
    const selectWishQuery = `
        SELECT idx
        FROM Wishlist
        WHERE idx = ?;
    `;
    const [wishRow] = await connection.query(selectWishQuery, wishIdx);
    return wishRow;
}

//숙소 존재 확인
async function selectRoomExist(connection, wishRoom_Idx) {
    const selectRoomQuery = `
    SELECT idx
    FROM Room
    where idx = ?;
    `;
    const [roomRow] = await connection.query(selectRoomQuery, wishRoom_Idx);
    return roomRow;
}

module.exports = {
    selectFolder,
    selectWishlist,
    insertFolderInfo,
    insertWishInfo,
    editFolderByIdx,
    editWishByIdx,
    selectFolderExist,
    selectWishExist,
    selectRoomExist,
    deleteFolderByIdx,
    deleteWishByIdx,
};