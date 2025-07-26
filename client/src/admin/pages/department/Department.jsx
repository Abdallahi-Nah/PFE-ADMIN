import "./Department.scss";
import DataTable from "../../components/datatable/DataTable";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import Swal from "sweetalert2";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nom", headerName: "Nom", width: 280 },
];


const Department = () => {
  const { backendUrl, departments, fetchDepartments } = useContext(AppContext);

  const handleDeleteDepartment = async (idDep) => {
    try {
      const res = await axios.delete(
        backendUrl + `/departement/delete/${idDep}`
      );
      await fetchDepartments();
      console.log("res : ", res);
    } catch (error) {
      console.log(error);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        const rowId = params.row.idDB;

        return (
          <div className="cellAction">
            <span className="viewButton">
              <Link
                to={`single/${rowId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Voir
              </Link>
            </span>
            <span className="updateButton">
              <Link
                to={`new-department/${rowId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Modifier
              </Link>
            </span>
            <span
              className="deleteButton"
              onClick={() => {
                Swal.fire({
                  title: "Êtes-vous sûr ?",
                  text: `Voulez-vous vraiment supprimer ce département ?  Cette action est irréversible.`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Oui, supprimer",
                  cancelButtonText: "Annuler",
                  width: "50%",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteDepartment(rowId);
                  }
                });
              }}
            >
              Supprimer
            </span>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchDepartments();
  }, []);

  const rows = departments.map((department, index) => ({
    idDB: department._id,
    id: index + 1,
    nom: department.nom,
  }));

  return (
    <>
      <div className="department">
        <DataTable
          title="Liste des départements"
          columns={columns}
          rows={rows}
          actionColumn={actionColumn}
          link="new-department"
        ></DataTable>
      </div>
    </>
  );
};

export default Department;
