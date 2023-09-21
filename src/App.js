import React, { useState } from "react";
import Admin from "./components/Admin";
import User from "./components/User";

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  return (
    <div>
      <h1>Приложение</h1>
      <div>
        <button onClick={toggleMode}>
          {isAdminMode ? "Переключиться на Пользователь" : "Переключиться на Админ"}
        </button>
      </div>
      {isAdminMode ? <Admin /> : <User/>}
    </div>
  );
}

export default App;
