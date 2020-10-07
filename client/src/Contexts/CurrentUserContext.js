import React from "react";
const CurrentUserContext = React.createContext({
  currentUser: null,
  onCurrentUserChange: () => {}
});

export default CurrentUserContext;