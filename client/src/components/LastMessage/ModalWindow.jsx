import React from "react";

export const MessageContext = React.createContext({});
const ModalWindow = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={`ModalWindow ModalWindow__${isOpen}`}>
      <MessageContext.Provider value={{ setIsOpen }}>
        {children}
      </MessageContext.Provider>
    </div>
  );
};

export default ModalWindow;
