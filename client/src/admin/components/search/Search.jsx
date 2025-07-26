import SearchIcon from "@mui/icons-material/Search";
import "./Search.scss";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useLocation } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  console.log("keyword : ", keyword);

  const {
    fetchDepartments,
    fetchSpecialities,
    fetchModules,
    fetchMatieres,
    fetchEnseignants,
    fetchEtudiants,
  } = useContext(AppContext);

  const location = useLocation();

  const handleSearch = (e) => {
    try {
      const value = e.target.value.trimStart();
      setKeyword(value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const trimmedKeyword = keyword.trim();
    if (location.pathname === "/admin/department") {
      fetchDepartments(trimmedKeyword);
    } else if (location.pathname === "/admin/speciality") {
      fetchSpecialities(trimmedKeyword);
    } else if (location.pathname === "/admin/module") {
      fetchModules(trimmedKeyword);
    } else if (location.pathname === "/admin/matiere") {
      fetchMatieres(trimmedKeyword);
    } else if (location.pathname === "/admin/teacher") {
      fetchEnseignants(trimmedKeyword);
    } else {
      fetchEtudiants(trimmedKeyword);
    }
  }, [keyword]);

  return (
    <>
      <div className="search">
        <input
          type="text"
          onChange={handleSearch}
          value={keyword}
          name=""
          id=""
          placeholder="search"
        />
        <SearchIcon />
      </div>
    </>
  );
};

export default Search;
