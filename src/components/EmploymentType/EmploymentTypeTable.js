import { useEffect, useState } from "react";

function EmploymentTypeTable() {
  const [employmenttypes, setEmploymenttype] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5116/api/EmploymentType")
      .then((response) => response.json())
      .then((json) => setEmploymenttype(json))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //   useEffect(() => {
  //     setLoading(true);
  //     fetch("http://localhost:5116/api/EmploymentType")
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         setLoading(false);
  //         setEmploymenttype(data);
  //       });
  //   }, []);

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Employment Type</h1>
          <table border={1}>
            <tbody>
              <tr>
                <th>Id</th>
                <th>Employment Type</th>
              </tr>

              {employmenttypes.map((employmenttype) => (
                <tr key={employmenttype.id}>
                  <td>{employmenttype.id}</td>
                  <td>{employmenttype.employmentTypeName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default EmploymentTypeTable;
