import React from "react";

const CurrentListContext = React.createContext({
  currentList: null,
  onCurrentListChange: () => {}
});

export default CurrentListContext;