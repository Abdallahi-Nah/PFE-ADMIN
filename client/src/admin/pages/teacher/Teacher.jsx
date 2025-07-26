import "./Teacher.scss";
import DataTable from "../../components/datatable/DataTable";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import Swal from "sweetalert2";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nom", headerName: "Nom", width: 100 },
  { field: "prenom", headerName: "Prenom", width: 100 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "telephone", headerName: "Telephone", width: 100 },
];

const Teacher = () => {
  const { backendUrl, enseignants, fetchEnseignants } = useContext(AppContext);
  
  const handleDeleteTeacher = async (idTeach) => {
    try {
      const res = await axios.delete(
        backendUrl + `/enseignant/delete/${idTeach}`
      );
      await fetchEnseignants();
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
                to={`new-teacher/${rowId}`}
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
                  text: `Voulez-vous vraiment supprimer cet enseignant ?  Cette action est irréversible.`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Oui, supprimer",
                  cancelButtonText: "Annuler",
                  width: "50%",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteTeacher(rowId);
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
    fetchEnseignants();
  }, []);

  const rows = enseignants.map((enseignant, index) => ({
    idDB: enseignant._id,
    id: index + 1,
    nom: enseignant.nom,
    prenom: enseignant.prenom,
    email: enseignant.email,
    telephone: enseignant.telephone,
  }));

  return (
    <>
      <div className="teacher">
        <DataTable
          title="Liste des enseignants"
          columns={columns}
          rows={rows}
          actionColumn={actionColumn}
          link="new-teacher"
        ></DataTable>
      </div>
    </>
  );
};

export default Teacher;
