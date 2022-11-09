import authReducer from "./authReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import appReducer from "./appReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel12 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const commonConfig = {
  storage,
  stateReconciler: autoMergeLevel12,
};

const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLogin", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  user: userReducer,
  post: postReducer,
  app: appReducer,
});

export default rootReducer;
