const authInfo = localStorage.getItem('authInfo');
let initialState;
if (!authInfo) {
    initialState = { isLogin: false, access_token: null, loggedUser: null };
} else {
    initialState = JSON.parse(authInfo); // chuyển từ string sang object
}
// state lưu 3 thông tin {isLogin, access_token, loggedUser}
// isLogin để biết rằng login vào hệ thống hay chưa
// access_token để lấy data (student, sbject, register)
// loggedUser để hiển thị thông tin người dùng đăng nhập trên web
// current state + action => new state

const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN_SUCCESS':
            {
                const new_state = {
                    isLogin: true,
                    access_token: action.payload.access_token,
                    loggedUser: action.payload.loggedUser
                };
                // lưu xuống localStorage của trình duyệt, khi tắt trình duyệt hay refresh trang thì thông tin vẫn còn
                localStorage.setItem('authInfo', JSON.stringify(new_state));
                return new_state;
            }

        case 'LOGOUT':
            {
                const new_state = {
                    isLogin: false,
                    access_token: null,
                    loggedUser: null
                };
                // hủy thông tin trong localStorage
                localStorage.setItem('authInfo', JSON.stringify(new_state));
                return new_state;
            }


        default:
            return state; // mặc định là state

    }
}

export default AuthReducer;