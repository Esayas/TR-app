import { useEffect, useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { triptypeActions } from "../../store/triptype-slice";
import { tripTypeService } from "../../services/tripTypeService";
import { uiActions } from "../../store/ui-slice";

function TripTypeTable() {
  const triptypelist = useSelector((state) => state.trip_types.triptypes);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getall() {
    setLoading(true);
    tripTypeService.getAll().then(
      (json) => {
        // //requesting data
        // dispatch(
        //   uiActions.showNotification({
        //     open: true,
        //     message: "Requesting data",
        //     type: "warning",
        //   })
        // );
        dispatch(triptypeActions.getall(json));
        setLoading(false);
      },
      (error) => {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: error,
            type: "error",
          })
        );
      }
    );
  }

  useEffect(() => {
    getall();
  }, []);

  const handlerDelete = (id) => {
    tripTypeService
      .delete(id)
      .then((data) => {
        console.log(id);
        //Data deleted succesfully
        dispatch(triptypeActions.removedata(id));

        getall();
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Data delete successfully!",
            type: "success",
          })
        );
      })
      .catch((error) => {
        //Failed to delete
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Data Deleting failed!",
            type: "error",
          })
        );
      });
  };

  return (
    <div className="d-flex w-100  justify-content-center align-items-center">
      <div>
        <h2>Trip Type List</h2>
        <Link to="/add-triptype" className="btn btn-success my-3">
          Create +
        </Link>
        {loading ? (
          <div> Loading </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Trip Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {triptypelist.map((triptype, index) => (
                <tr key={index}>
                  <td>{triptype.id}</td>
                  <td>{triptype.description}</td>
                  <td>
                    <Link
                      to={`/triptype/edit/${triptype.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handlerDelete(triptype.id)}
                      className="btn btn-sm btn-danger ms-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TripTypeTable;
