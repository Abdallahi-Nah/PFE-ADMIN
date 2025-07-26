import "./Student.scss";
import DataTable from "../../components/datatable/DataTable";
import { Link } from "react-router-dom";
import Filter from "../../components/filter/Filter";
import Swal from "sweetalert2";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nom", headerName: "Nom", width: 130 },
  { field: "prenom", headerName: "Prenom", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "telephone", headerName: "Telephone", width: 130 },
];

const Student = () => {
  const { backendUrl, etudiants, fetchEtudiants } = useContext(AppContext);

  const handleDeleteStudent = async (idStud) => {
    try {
      const res = await axios.delete(backendUrl + `/etudiant/delete/${idStud}`);
      await fetchEtudiants();
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
                to={`new-student/${rowId}`}
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
                  text: `Voulez-vous vraiment supprimer cet étudiant ?  Cette action est irréversible.`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Oui, supprimer",
                  cancelButtonText: "Annuler",
                  width: "50%",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteStudent(rowId);
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
    fetchEtudiants();
  }, []);

  const rows = etudiants.map((etudiant, index) => ({
    idDB: etudiant._id,
    id: index + 1,
    nom: etudiant.nom,
    prenom: etudiant.prenom,
    email: etudiant.email,
    telephone: etudiant.telephone,
  }));

  return (
    <>
      <div className="student">
        <DataTable
          title="Liste des étudiants"
          columns={columns}
          rows={rows}
          actionColumn={actionColumn}
          link="new-student"
          type="student"
        >
          <Filter title="spécialité" />
        </DataTable>
      </div>
    </>
  );
};

export default Student;
