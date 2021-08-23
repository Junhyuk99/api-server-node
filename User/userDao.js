// 모든 유저 조회
async function selectUser(connection) {
    const selectUserListQuery = `
                SELECT *
                FROM User;
                `;
    const [userRows] = await connection.query(selectUserListQuery);
    return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
    const selectUserEmailQuery = `
                SELECT userEmail, idx
                FROM User
                WHERE userEmail = ?;
                `;
    const [emailRows] = await connection.query(selectUserEmailQuery, email);
    return emailRows;
}

// userId 회원 조회
async function selectUserById(connection, userIdFromJWT) {
    const selectUserIdQuery = `
                 SELECT *
                 FROM User
                 WHERE idx = ?;
                 `;
    const [userRow] = await connection.query(selectUserIdQuery, userIdFromJWT);
    return userRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
        INSERT INTO User(userEmail, userName, userBDay, userPassword)
        VALUES (?, ?, ?, ?);
    `;
    const insertUserInfoRow = await connection.query(
        insertUserInfoQuery,
        insertUserInfoParams
    );
    return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
    const selectUserPasswordQuery = `
        SELECT userEmail, userPassword
        FROM User
        WHERE userEmail = ? AND userPassword = ?;`;
    const selectUserPasswordRow = await connection.query(
        selectUserPasswordQuery,
        selectUserPasswordParams
    );

    return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
    const selectUserAccountQuery = `
        SELECT status, idx
        FROM User 
        WHERE userEmail = ?;
        `;
    const selectUserAccountRow = await connection.query(
        selectUserAccountQuery,
        email
    );
    return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
    const updateUserQuery = `
  UPDATE User
  SET status = ?
  WHERE idx = ?;`;
    const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
    return updateUserRow[0];
}

//id로 유저 프로필 수정
async function editUserProfileById(connection,  updateUserProfileParams){
    const editProfileQuery = `
            UPDATE User
            SET userIntro = ?, userLocation = ?, userLanguage = ?, userOffice = ?
            WHERE idx = ?;
            `;
    const [editRow] = await connection.query(editProfileQuery, updateUserProfileParams);
    return editRow;
}

//비밀번호수정
async function editPasswordByIdx(connection, updatePasswordParams) {
    const editPasswordQuery = `
            UPDATE User
            SET userPassword = ?
            Where idx = ?;
    `;
    const [editPwdRow] = await connection.query(editPasswordQuery, updatePasswordParams);
    return editPwdRow;
}

//이름수정
async function editNameByIdx(connection, updateNameParams) {
    const editNameParams = `
            UPDATE User
            SET userName = ?
            WHERE idx = ?;
    `;
    const [editNameRow] = await connection.query(editNameParams, updateNameParams);
    return editNameRow;
}

//생일수정
async function editBDayByIdx(connection, updateBDayParams) {
    const editBDayParams = `
            UPDATE User
            SET userBDay = ?
            WHERE idx = ?;
    `;
    const [editBDayRow ] = await connection.query(editBDayParams, updateBDayParams);
    return editBDayRow;
}

//이메일수정
async function editEmailByIdx(connection, updateEmailParams) {
    const editEmailParmas = `
            UPDATE User
            SET userEmail = ?
            WHERE idx = ?;
    `;
    const [editEmailRow] = await connection.query(editEmailParmas, updateEmailParams);
    return editEmailRow;
}

//전화번호수정
async function editPhoneByIdx(connection, updatePhoneParams) {
    const editPhoneParams = `
            UPDATE User
            SET userPhoneNumber = ?
            WHERE idx = ?;
    `;
    const [editPhoneRow] = await connection.query(editPhoneParams, updatePhoneParams);
    return editPhoneRow;
}

//호스트 등록
async function editHostByIdx(connection, userIdFromJWT) {
    const editHostParams = `
            UPDATE User
            SET userHost = "TRUE"
            WHERE idx = ?;
    `;
    const [editHostRow] = await connection.query(editHostParams, userIdFromJWT);
    return editHostRow;
}


module.exports = {
    selectUser,
    selectUserEmail,
    editUserProfileById,
    selectUserById,
    insertUserInfo,
    selectUserPassword,
    selectUserAccount,
    updateUserInfo,
    editPasswordByIdx,
    editBDayByIdx,
    editEmailByIdx,
    editPhoneByIdx,
    editNameByIdx,
    editHostByIdx,
};
