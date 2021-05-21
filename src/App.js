import React, {useState, useEffect} from "react";
import API from "./utils/API";
import Jumbo from "./Components/Header/index";


function App() {
  const [employees, setEmployees] = useState([])
  const [input, setInput] = useState("");
  useEffect(() => {
    API.getEmployees()
    .then(res => {
      console.log(res.data.results);
      setEmployees(res.data.results)
    }) 
    .catch(err => {
      console.log(err)
    })
  }, [])
  
  const sortEmployeeAge = () => {
    const sortedEmployeesAge = [...employees]
    sortedEmployeesAge.sort((a, b) => a.dob.age - b.dob.age)
    setEmployees(sortedEmployeesAge);
  }
  const sortEmployeeName = () => {
    const sortedEmployeeName = [...employees]
    sortedEmployeeName.sort((a, b) => a.name.first - b.name.first)
    setEmployees(sortedEmployeeName);
  }

  return (
    <div>
      <Jumbo />
      <input value={input} onChange={e => setInput(e.target.value)}></input>
      <table>
        <tr>
          <th>Image</th>
          <th onClick={sortEmployeeName}>First Name</th>
          <th>Last Name</th>
          <th onClick={sortEmployeeAge}>Age</th>
          <th>Phone number</th>
        </tr>
      {employees.filter(emp => `${emp.name.first} ${emp.name.last}`.includes(input)).map((employee, index) => (
        <tr key={index}>
        <td background={employee.picture.medium}></td>
        <td>{employee.name.first}</td>
        <td>{employee.name.last}</td>
        <td>{employee.dob.age}</td>
        <td>{employee.cell}</td>
        </tr>
      ))}
      </table>
    </div>
  );
}

export default App;
