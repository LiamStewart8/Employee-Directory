import React, {useState, useEffect} from "react";
import API from "./utils/API";

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
  
  const sortEmployee = () => {
    const sortedEmployees = [...employees]
    sortedEmployees.sort((a, b) => a.dob.age - b.dob.age)
    setEmployees(sortedEmployees);
  }

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)}></input>
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th onClick={sortEmployee}>Age</th>
          <th>Phone number</th>
        </tr>
      {employees.filter(emp => `${emp.name.first} ${emp.name.last}`.includes(input)).map((employee, index) => (
        <tr key={index}>
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
