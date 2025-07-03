import React, { useState, useContext, createContext } from "react";

//create context
export const AlertContext = createContext();

//create provider
function AlertProvider(props) {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      type,
      msg: message
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertProvider




// | Thing           | Purpose                                                  | When to use it                                        |
// | --------------- | -------------------------------------------------------- | ----------------------------------------------------- |
// | `AlertContext`  | The box that holds shared values (`alert`, `showAlert`)  | Use this with `useContext()` to **access** values     |
// | `AlertProvider` | The component that **fills the box** with data/functions | Use this to **wrap your app** and make data available |
