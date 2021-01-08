import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useRouts from './routes';

function App() {
  /*
    Тут пока нету бэка если делаем страницу авторизации
    оставляем значение false, если занимаеся другими, ставим true
  */
  const isAuthenticated = false;

  const routes = useRouts(isAuthenticated);

  return (
    <Router>
      <div className="container">
        {routes}
      </div>
    </Router>
  );
}

export default App;
