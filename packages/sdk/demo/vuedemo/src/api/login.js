export function doInit() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userInfo = sessionStorage.getItem('userInfo');
      if (userInfo) {
        resolve({
          code: 0,
          data: userInfo,
          msg: ''
        });
      } else {
        resolve({
          code: 0,
          data: null,
          msg: ''
        });
      }
    }, 50);
  });
}

export function doLogin(params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const error = [];
      if (params.username !== 'ryouaki') {
        error.push('用户名');
      }
      if (params.password !== '123456') {
        error.push('密码');
      }
      if (error.length > 0) {
        resolve({
          code: 404,
          data: null,
          msg: `${error.join(',')}有误，请重新输入！`
        });
      } else {
        resolve({
          code: 0,
          data: {
            username: 'ryouaki',
            avatar: 'https://avatars3.githubusercontent.com/u/9922563?s=40&v=4'
          },
          msg: 'Login success'
        });
      }
    }, 50);
  });
}

export function doLogout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({
        code: 0,
        data: null,
        msg: 'Logout failed'
      });
    }, 500);
  });
}