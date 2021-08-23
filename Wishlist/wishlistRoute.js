module.exports = function(app){
    const wishlist = require('../Wishlist/wishlistController');
    const jwtMiddleware = require('../../config/jwtMiddleware');

    // 8. 특정 회원 위시리스트 폴더 목록 조회 API (JWT)
    app.get('/wishlists/:userIdx', jwtMiddleware, wishlist.getFolders);

    // 9. 특정 유저 특정 위시리스트 조회 API (JWT)
    app.get('/wishlists/:userIdx/:wishFolderIdx', jwtMiddleware, wishlist.getWishlist);

    // 10. 특정 유저 위시리스트 폴더 생성 API (JWT)
    app.post('/wishlists/folders', jwtMiddleware, wishlist.postFolders);

    // 11. 특정 유저 위시리스트 추가 API (JWT)
    app.post('/wishlists', jwtMiddleware, wishlist.postWish);

    // 12. 특정 유저 위시리스트 폴더 수정 API (JWT)
    app.patch('/wishlists/folders', jwtMiddleware, wishlist.editFolder);

    // 13. 특정 유저 위시리스트 폴더 삭제 API (JWT)
    app.patch('/wishlists/status-folders', jwtMiddleware, wishlist.deleteFolder);

    // 14. 특정 유저 위시리스트 수정 API (JWT)
    app.patch('/wishlists', jwtMiddleware, wishlist.editWish);

    // 15. 특정 숙소 위시 삭제 API (JWT)
    app.patch('/wishlists/status', jwtMiddleware, wishlist.deleteWish);
};