
import history from "./common/history";
import "react-toastify/dist/ReactToastify.css";
// import styles from "./App.scss";
import AppRouter from "./AppRouter";
// import React from "react";
// import logo from "./logo.svg";
// import "./styles/_main.scss";
// import "./App.scss";

// function App() {
//   return (
//     <React.Fragment>
//       <div className="container">
//         <div style={{display:"flex", flexDirection:'column'}}>
//           <div style={{paddingBottom:'100px'}}>
//             <h1> AAAAAAAAAAa</h1>
//           </div>
//           <form className="form">
//             <div className="file-upload-wrapper" data-text="Select your file!">
//               <input
//                 name="file-upload-field"
//                 type="file"
//                 className="file-upload-field"
//                 value=""
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

// export default App;

import React, { Component } from "react";
// import returnStoreAndPersistor from "./store/store";
// import { Provider } from "react-redux";

// const { store, persistor } = returnStoreAndPersistor();
const App = () => {
  return (
    <div >
      {/* <Provider store={store}> */}
      {/* <Router history={history}> */}
        {/* <GlobalNavigation /> */}
        {/* <div className={styles.Container}> */}
          <AppRouter />
        {/* </div> */}
        {/* <Footer /> */}
      {/* // </Router> */}
      {/* </Provider> */}
    </div>
  );
};

export default App;
