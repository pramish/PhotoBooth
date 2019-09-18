import React from "react";
import { Provider } from "react-redux";
import PhotoBoothRouter from "./router";
import ReduxStore from "./redux/store";

const App = () => {
  return (
    <React.Fragment>
      <Provider store={ReduxStore}>
        <PhotoBoothRouter />
      </Provider>
    </React.Fragment>
  );
};

export default App;
