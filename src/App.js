import React, {useState, useEffect} from "react";
import API from "./utils/API";
import Jumbo from "./Components/Header/index";


function App() {
  const [employees, setEmployees] = useState([])
  const [input, setInput] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  
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
    if (isAscending){
      sortedEmployeesAge.sort((a, b) => a.dob.age - b.dob.age)
      setIsAscending(false);
    }
    else {
      sortedEmployeesAge.sort((a, b) => b.dob.age - a.dob.age)
      setIsAscending(true);
    }
    setEmployees(sortedEmployeesAge);
    
  };

  const sortEmployeeName = () => {
    const sortedEmployeeName = [...employees]
    sortedEmployeeName.sort((a, b) => {
      var nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
      
    });
    if (isAscending) {
      sortedEmployeeName.sort((a, b) => {
        var nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        // names must be equal
        return 0;
        
      });
      setIsAscending(false);
    }
    else {
      sortedEmployeeName.sort((a, b) => {
        var nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
        
      });
      setIsAscending(true);
    }
    setEmployees(sortedEmployeeName);
  }

  return (
    <div>
      <Jumbo />
      <div class="form-row justify-content-center">
      <input style={{width: '50%' , margin: 15}}value={input} onChange={e => setInput(e.target.value)} placeholder="Search for an Employee"></input>
      <div className="container">
      <table className="table">
        <tr>
          <th>Image</th>
          <th onClick={sortEmployeeName}>First Name</th>
          <th>Last Name</th>
          <th onClick={sortEmployeeAge}>Age</th>
          <th>Phone number</th>
        </tr>
      {employees.filter(emp => `${emp.name.first} ${emp.name.last}`.toLowerCase().includes(input)).map((employee, index) => (
        <tr key={index}>
        <th><img src={employee.picture.medium} alt={"employee portrait"}></img></th>
        <td>{employee.name.first}</td>
        <td>{employee.name.last}</td>
        <td>{employee.dob.age}</td>
        <td>{employee.cell}</td>
        </tr>
      ))}
      </table>
      </div>
      </div>
    </div>
  );
}

export default App;
