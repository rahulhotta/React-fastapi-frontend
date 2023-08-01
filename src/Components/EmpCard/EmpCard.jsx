import React, { useState, useContext } from "react";
import { EmpContext } from "../../App";
import "./EmpCard.css";
import Modal from "@mui/material/Modal";
import Button from "../UI/Button";
import { AiFillDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
function EmpCard(props) {
  const employee = useContext(EmpContext);
  const {  deleteTaskFromList,editTaskInList } = employee;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "rgb(196, 223, 223)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "black",
  };

  const { empId, empName, empDOJ, empProject, empPhoto } = props.item;

  const [modalOpen, setModalOpen] = useState(false);
  const [updatedEmpData, setUpdatedEmpData] = useState({
    empId: empId,
    empName: empName,
    empDOJ: empDOJ,
    empProject: empProject,
    empPhoto: empPhoto,
  });
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // Function to delete task on double click
 
  const updateHandler = (e) => {
    e.preventDefault()
    let updatedData = {
      empId: updatedEmpData.empId,
      empName: updatedEmpData.empName,
      empDOJ: updatedEmpData.empDOJ,
      empProject: updatedEmpData.empProject,
      empPhoto: updatedEmpData.empPhoto,
    };
    editTaskInList(empId, updatedData);
    handleModalClose();
  };
  return (
    <>
      <div className="taskCard__container">
        <img src={empPhoto} alt="hello" className="empCard__emp_photo" />
        <div className="empCard__footer">
          <h3 className="empCard__emp_name">Name:{empName}</h3>
          <div className="empCard__emp_doj">D.O.J:{empDOJ}</div>
          <div className="empCard__emp_project">Project:{empProject}</div>
        </div>
        <div className="empCard__actions__container">
          <Button onClick={handleModalOpen}>
            <BsPencilSquare />
          </Button>
          <Button
            onClick={() => {
              console.log("Clicked in empCard");
              deleteTaskFromList(empId);
            }}
          >
            <AiFillDelete />
          </Button>
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form className="employee-form" onSubmit={updateHandler}>
        <TextField
          id="outlined-basic"
          label="Id"
          variant="outlined"
          onChange={(e) => {
            setUpdatedEmpData((prev) => {
              return {
                ...prev,
                empId: e.target.value,
              };
            });
          }}
          value={updatedEmpData.empId}
        />
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={(e) => {
            setUpdatedEmpData((prev) => {
              return {
                ...prev,
                empName: e.target.value,
              };
            });
          }}
          value={updatedEmpData.empName}
        />
        <TextField
          id="outlined-basic"
          type="date"
          variant="outlined"
          onChange={(e) => {
            setUpdatedEmpData((prev) => {
              return {
                ...prev,
                empDOJ: e.target.value,
              };
            });
          }}
          value={updatedEmpData.empDOJ}
        />
        <TextField
          id="outlined-basic"
          label="Project"
          variant="outlined"
          onChange={(e) => {
            setUpdatedEmpData((prev) => {
              return {
                ...prev,
                empProject: e.target.value,
              };
            });
          }}
          value={updatedEmpData.empProject}
        />
        <div className="drawer__buttons__container">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleModalClose();
            }}
            className="drawer__form__button"
          >
            Cancel
          </button>
          <button type="submit" className="drawer__form__button">
            Submit
          </button>
        </div>
      </form>
        </Box>
      </Modal>
    </>
  );
}

export default EmpCard;
