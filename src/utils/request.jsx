import useHttp from '../hooks/http.hook';
// import AuthContext from '../../context/AuthContext';

const request = {
  basicURI: 'https://rsclone-back-end.herokuapp.com/api/',
  token: localStorage.userData.token,

  async updateBoard(boardId, body) {
    const requestOptions = {
      url: `${this.basicURI}/board/${boardId}`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${this.token}` },
      body,
    };
    await useHttp.request(requestOptions);
  },
};

export default request;
