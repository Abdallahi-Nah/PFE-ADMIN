import "./Speciality.scss";
import DataTable from "../../components/datatable/DataTable";
import { Link } from "react-router-dom";
import Filter from "../../components/filter/Filter";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import Swal from "sweetalert2";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nom", headerName: "Nom", width: 280 },
];

const Speciality = () => {
  const { backendUrl, specialities, fetchSpecialities } =
    useContext(AppContext);

  const handleDeleteSpeciality = async (idSpec) => {
    try {
      const res = await axios.delete(
        backendUrl + `/specialite/delete/${idSpec}`
      );
      await fetchSpecialities();
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
                to={`new-speciality/${rowId}`}
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
                  text: `Voulez-vous vraiment supprimer cette spécialité ?  Cette action est irréversible.`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Oui, supprimer",
                  cancelButtonText: "Annuler",
                  width: "50%",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteSpeciality(rowId);
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
    fetchSpecialities();
  }, []);

  const rows = specialities.map((speciality, index) => ({
    idDB: speciality._id,
    id: index + 1,
    nom: speciality.nom,
  }));

  return (
    <>
      <div className="speciality">
        <DataTable
          title="Liste des spécialités"
          columns={columns}
          rows={rows}
          actionColumn={actionColumn}
          link="new-speciality"
          type="speciality"
        >
          <Filter title="département" />
        </DataTable>
      </div>
    </>
  );
};

export default Speciality;
