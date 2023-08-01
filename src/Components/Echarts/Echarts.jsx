import React, { useState, useContext } from "react";
import { EmpContext } from "../../App";

import ReactEcharts from "echarts-for-react"
import './Echarts.css';
function Echarts() {
    const [chartOption, setChartOption] = useState("D.O.J")
    const employee = useContext(EmpContext);
    const {  employeeData } = employee;
    const allProjects = employeeData.map((emp)=>{
        return emp.empProject
    })
    const allDOJ = employeeData.map((emp)=>{
        return emp.empDOJ
    })

    const count_amount = (list)=>{
        var obj = {};
        list.forEach((element) => {
            if (Object.keys(obj).includes(element)) {
                obj[element] = obj[element] + 1;            
            }else{
                obj[element] = 1
            }
        });
        return obj;
    }

    const projectCountObj = count_amount(allProjects);
    const projectList = Object.keys(projectCountObj)
    const projectEmpCount = Object.values(projectCountObj)

    const DOJCountObj = count_amount(allDOJ);
    const DOJList = Object.keys(DOJCountObj)
    const DOJEmpCount = Object.values(DOJCountObj)

    const options = {
        title : {
          text: chartOption === "Project"? "Project":"D.O.J",

          x:'center'
        },
        tooltip : {
          trigger: 'item'
        },
        xAxis: {
          name: 'Project',
          data: chartOption === "Project"? projectList: DOJList
        },
        yAxis: { name: 'Number of Employees', },
        series: [
          {
            type: 'bar',
            data: chartOption === "Project"? projectEmpCount:DOJEmpCount,
          }
        ]
      };
  return (
    <div className='echarts__container'>
        <select value={chartOption} onChange={(e)=>{setChartOption(e.target.value)}}>
            <option name="Project" id="project">Project</option>
            <option name="DOJ" id="DOJ">D.O.J</option>
        </select>
        <h1>React Echarts</h1>
         <ReactEcharts option={options} />
    </div>
  )
}

export default Echarts