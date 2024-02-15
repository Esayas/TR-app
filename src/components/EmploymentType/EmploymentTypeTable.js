import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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

  function deletehandler(id) {
    console.log(id);
    fetch(
      `http://localhost:5116/api/EmploymentType/${id}`,

      {
        method: "DELETE",
        body: id,
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {});

    //props.onAddMeetup(enteredEmploymenttype);
  }

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
      <h3>Employment Type</h3>
      <Link to="/add-emptype" className="btn btn-success">
        Add
      </Link>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table border={1}>
            <tbody>
              <tr>
                <th>Id</th>
                <th>Employment Type</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>

              {employmenttypes.map((employmenttype) => (
                <tr key={employmenttype.id}>
                  <td>{employmenttype.id}</td>
                  <td>{employmenttype.employmentTypeName}</td>
                  <td>
                    {/* <a
                      href={"/emptype/edit/:id" + employmenttype.id}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </a> */}
                    <Link
                      to={{
                        pathname: "/emptype/edit/:id",
                        empId: employmenttype.id,
                      }}
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    {/* <a
                      // href={"/emptype/edit/" + employmenttype.id}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                      onClick={() => deltehandler(employmenttype.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </a> */}
                    <button onClick={() => deletehandler(employmenttype.id)}>
                      Delete
                    </button>
                  </td>
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
