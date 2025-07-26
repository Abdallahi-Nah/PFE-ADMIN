import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "./DataTable.scss";
import Search from "../search/Search";
import Filter from "../filter/Filter";
import { Link } from "react-router-dom";

const paginationModel = { page: 0, pageSize: 5 };

const DataTable = ({
  columns,
  rows,
  actionColumn,
  link,
  type = "",
  children,
}) => {
  return (
    <>
      <div className="datatable">
        <Paper sx={{ height: 400, width: "80%", margin: "auto", padding: 2 }}>
          <div className="datatableTitle">
            <Search />
            {type !== "" && children}
            <span className="link">
              <Link
                to={link}
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "inherit",
                }}
              >
                Ajouter
              </Link>
            </span>
          </div>
          <DataGrid
            rows={rows}
            columns={actionColumn ? columns.concat(actionColumn) : columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
            localeText={{
              noRowsLabel: "Pas de résultats trouvés",
              paginationRowsPerPage: "Résultat(s) par page :",
              footerRowSelected: (count) =>
                count === 1
                  ? "1 ligne sélectionnée"
                  : `${count} lignes sélectionnées`,
            }}
          />
        </Paper>
      </div>
    </>
  );
};

export default DataTable;
