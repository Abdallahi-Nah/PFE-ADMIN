import "./Module.scss";
import DataTable from "../../components/datatable/DataTable";
import { Link } from "react-router-dom";
import Filter from "../../components/filter/Filter";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import Swal from "sweetalert2";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nom", headerName: "Nom", width: 280 },
];

const Module = () => {
  const { backendUrl, modules, fetchModules } =
    useContext(AppContext);

  const handleDeleteModule = async (idMod) => {
    try {
      const res = await axios.delete(backendUrl + `/module/delete/${idMod}`);
      await fetchModules();
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
                to={`new-module/${rowId}`}
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
                  text: `Voulez-vous vraiment supprimer ce module ?  Cette action est irréversible.`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Oui, supprimer",
                  cancelButtonText: "Annuler",
                  width: "50%",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleDeleteModule(rowId);
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
    fetchModules();
  }, []);

  const rows = modules.map((mod, index) => ({
    idDB: mod._id,
    id: index + 1,
    nom: mod.nom,
  }));

  return (
    <>
      <div className="module">
        <DataTable
          title="Liste des modules"
          columns={columns}
          rows={rows}
          actionColumn={actionColumn}
          link="new-module"
          type="module"
        >
          <Filter title="spécialité" />
        </DataTable>
      </div>
    </>
  );
};

export default Module;
