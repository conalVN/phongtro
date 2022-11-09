/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { path } from "./ultils/constant";
import {
  Home,
  Login,
  Homepage,
  Rental,
  DetailPost,
  SearchDetail,
  Contact,
} from "./containers/Public";
import {
  CreatePost,
  System,
  ManagePost,
  EditAccount,
} from "./containers/System";
import * as actions from "./store/actions";

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getProvinces());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      isLogin && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLogin]);
  return (
    <div className="bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={"*"} element={<Homepage />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route
            path={path.DETAIL_POST__TITLE_POSTID}
            element={<DetailPost />}
          />
          {/* <Route path={path.DETAIL_ALL} element={<DetailPost />} /> */}
          <Route path={path.CONTACT} element={<Contact />} />
        </Route>

        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
