import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { emptypeActions } from "../../store/emptype-slice";

function EmploymentTypeTable() {
  // const [employmenttypes, setEmploymenttype] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const emptypelist = useSelector((state) => state.emptypes.employmenttypes);
  // const isCreating = useSelector((state) => state.emptypes.isCreating);
  // const history = useHistory();
  const navigate = useNavigate();
  // console.log("TG");
  // console.log(list);
  // console.log("TG");
  function getdata() {
    setLoading(true);
    fetch("http://localhost:5116/api/EmploymentType")
      .then((response) => response.json())
      .then((json) => {
        dispatch(emptypeActions.getall(json));

        //console.log(employmenttypes);

        //setEmploymenttype(json);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getdata();
  }, []);

  function deletehandler(id) {
    fetch(`http://localhost:5116/api/EmploymentType/${id}`, {
      method: "DELETE",
      body: id,
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      dispatch(emptypeActions.removedata(id));
      getdata();
    });

    //props.onAddMeetup(enteredEmploymenttype);
  }

  function edithandler(employmenttype) {
    dispatch(emptypeActions.editdata(employmenttype));

    navigate("/emptype/edit/:id");
    // console.log("TGGG");
    // console.log(isCreating);
    // console.log(employmenttype);
  }

  return (
    <div>
      <div className="center">
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

                {emptypelist.map((employmenttype) => (
                  <tr key={employmenttype.id}>
                    <td>{employmenttype.id}</td>
                    <td>{employmenttype.employmentTypeName}</td>
                    <td>
                      {/* <Link
                      to={{
                        pathname: "/emptype/edit/:id",
                        empId: employmenttype.id,
                      }}
                    >
                      Edit
                    </Link> */}

                      <button onClick={() => edithandler(employmenttype)}>
                        Edit
                      </button>
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
    </div>
  );
}

export default EmploymentTypeTable;
