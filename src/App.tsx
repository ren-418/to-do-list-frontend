import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useGlobalContext } from './context';
import { restApi } from './context/http-request';
import SignIn from './pages/auth/signin';
import SignUp from './pages/auth/signup';
import Todo from './pages/todo';

function App() {
  const [state]: GlobalContextType = useGlobalContext();

  React.useEffect(() => {
    restApi.setAuthToken(state.authToken);
  }, [state.authToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/signin"
          element={!state.authToken ? <SignIn /> : <Navigate to="/" />}
        />
        <Route path="/auth/signup"
          element={!state.authToken ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/*"
          element={state.authToken ? <Todo /> : <Navigate to="/auth/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
