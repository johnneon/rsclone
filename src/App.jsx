import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import useRouts from './routes';
import CustomThemeProvider from './theme/CustomThemeProvider';

function App() {
  /*
    Тут пока нету бэка если делаем страницу авторизации
    оставляем значение false, если занимаеся другими, ставим true
  */
  const isAuthenticated = false;

  const routes = useRouts(isAuthenticated);

  return (
    <CustomThemeProvider>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
