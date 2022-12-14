import React from "react";
import Footer from "./Footer.jsx";
import Header from "./HeaderForLibrary.jsx";
import "./styles/library.css";
import { useState } from "react";
import Shared from "./Shared.jsx";
import SharingRequest from "./SharingRequest.jsx";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
function check(set) {
  fetch("http://localhost:4000/getUserInfo", {
    method: "GET",
    headers: new Headers({
      "content-type": "application/json",
      Accept: "application/json",
    }),
    mode: "cors",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.response === undefined) {
        console.log("yes");
        set("t");
      } else {
        console.log("not");
        set("f");
        // window.location.href="/register"
      }
    });
}
function Library(props) {
  const [selected, setS] = useState(true);
  function toggle(e) {
    if (e.target.innerText === "Collection") setS(true);
    else if (e.target.innerText === "Share") setS(false);
  }
  const [auth, setauth] = useState("w");

  // check();
  return (
    <>
      {auth === "w" ? (
        <div>{check(setauth)}</div>
      ) : (
        <>
          {auth === "f" ? (
            <>
              {" "}
              <Navigate to="/register" />
            </>
          ) : (
            <></>
          )}
        </>
      )}
      {auth === "t" ? (
        <div>
          <>
            <Header onclick={toggle} select={selected} />
            <div style={{ marginTop: "15vmin" }}></div>
            <div id="bookbody">
              {selected ? <Shared /> : <SharingRequest />}
            </div>

            <div style={{ marginBottom: "15vmin" }}></div>
            <Footer onch={props.onc} />
          </>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Library;
