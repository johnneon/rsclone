/* eslint-disable no-unused-vars */
import useHttp from '../hooks/http.hook';
// import AuthContext from '../../context/AuthContext';

const request = {
  basicURI: 'https://rsclone-back-end.herokuapp.com/api/',
  boardURI: 'https://rsclone-back-end.herokuapp.com/api/board/',
  columnURI: 'https://rsclone-back-end.herokuapp.com/api/column/',
  cardURI: 'https://rsclone-back-end.herokuapp.com/api/cards/',
  token: localStorage.userData.token,
  // basicRequest: useHttp(),

  updateBoard(boardId, body) {
    // console.log(useHttp);
    const requestOptions = {
      url: this.basicBoardURI + boardId,
      method: 'PUT',
      headers: { Authorization: `Bearer ${this.token}` },
      body,
    };

    // const { request: basicRequest } = useHttp();

    // return useHttp.request(requestOptions);
  },
};

export default request;
