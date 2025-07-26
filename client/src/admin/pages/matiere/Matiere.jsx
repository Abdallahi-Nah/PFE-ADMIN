import "./Matiere.scss";
import DataTable from "../../components/datatable/DataTable";
import { Link } from "react-router-dom";
import Filter from "../../components/filter/Filter";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import Swal from "sweetalert2";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "code", headerName: "Code", width: 150 },
  { field: "nom", headerName: "Nom", width: 280 },
  { field: "credit", headerName: "Crédit", width: 70 },
  {
    field: "hasTp",
    headerName: "TP",
    width: 100,
    renderCell: (params) => {
      console.log("hasTp dans renderCell 1:", params.row.hasTp);
      const hasTp = params.row.hasTp;
      console.log("hasTp dans renderCell 2:", hasTp);
      return (
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            backgroundColor: hasTp ? "#0a9048" : "brown",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
            textAlign: "center",
            lineHeight: "20px",
            userSelect: "none",
          }}
        >
          {hasTp ? "✔" : "✘" }
        </span>
      );
    },
  },
];

const Matiere = () => {
  const { backendUrl, matieres, fetchMatieres } = useContext(AppContext);

  const handleDeleteMatiere = async (idMat) => {
    try {
      const res = await axios.delete(backendUrl + `/matiere/delete/${idMat}`);
      await fetchMatieres();
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
            <span className="updateButton">
              <Link
                to={`new-matiere/${rowId}`}
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
                  text: `Voulez-vous vraiment supprimer cette matière ?  Cette action est irréversible.`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Oui, supprimer",
                  cancelButtonText: "Annuler",
                  width: "50%",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteMatiere(rowId);
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
    fetchMatieres();
  }, []);

  const rows = matieres.map((matiere, index) => ({
    idDB: matiere._id,
    id: index + 1,
    code: matiere.code,
    nom: matiere.nom,
    credit: matiere.credit,
    hasTp: matiere.hasTp,
  }));

  return (
    <>
      <div className="matiere">
        <DataTable
          title="Liste des matieres"
          columns={columns}
          rows={rows}
          actionColumn={actionColumn}
          link="new-matiere"
          type="matiere"
        >
          <Filter title="module" />
        </DataTable>
      </div>
    </>
  );
};

export default Matiere;
