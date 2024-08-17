import React, { useState } from 'react';
import Login from './Login';
import HelloWorld from './HelloWorld';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? <HelloWorld /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
