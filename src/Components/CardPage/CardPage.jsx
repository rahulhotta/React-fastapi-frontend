import React from "react";
import EmpList from "../EmpList/EmpList";
import "./CardPage.css";
function CardPage(props) {
  return (
   <div className="cardPage__container">
    <EmpList />
   </div>
  );
}

export default CardPage;