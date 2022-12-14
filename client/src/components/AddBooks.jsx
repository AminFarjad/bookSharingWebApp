import React from "react";
import Footer from "./Footer.jsx";
import Header from "./HeaderForLibrary.jsx";
// import "./styles/library.css"
import { useState } from "react";
import Shared from "./Shared.jsx";
import SharingRequest from "./SharingRequest.jsx";
import SearchBar from "./SearchBar";
import SearchComponent from "./SearchComponent.jsx";
import { Navigate } from "react-router-dom";

import Form from "./Form";
import "./styles/AddBooks.css"
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
        set("f");
        // window.location.href="/register"
      }
    });
}
function AddBooks(props) {
  const [form,setform]=useState(false);
  const [book,setbook]=useState(false);
  const [auth, setauth] = useState("w");

  function close(){
    setform(false);
  }
  function f(){
    
    if(props.text==="book"){
        setbook(true);
        setform(true);
    }
    else{
        setbook(false);
        setform(true);
    }


  }
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
        <div className="headbook"><h2 >Welcome !</h2>
        {props.text==="book"?<h2 className="jumbtron">Add Books for Sharing</h2>:<h2 className="jumbtron">Add Reviews of your Books</h2>}
        </div>
        <input type="text" className="input"/>
        <br></br>
        <button onClick={f} className="btn"><h3>Custom {props.text}</h3></button>
        {form?<Form condition={book} close={close}/>:<></>}
        <Footer />
      </div>
      ) : (
        <div></div>
      )}
    </>
    // <div>
    //   <div className="headbook"><h2 >Welcome !</h2>
    //   {props.text==="book"?<h2 className="jumbtron">Add Books for Sharing</h2>:<h2 className="jumbtron">Add Reviews of your Books</h2>}
    //   </div>
    //   <input type="text" className="input"/>
    //   <br></br>
    //   <button onClick={f} className="btn"><h3>Custom {props.text}</h3></button>
    //   {form?<Form condition={book} close={close}/>:<></>}
    //   <Footer />
    // </div>
  );
}

export default AddBooks;
