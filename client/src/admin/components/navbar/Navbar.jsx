// import SearchIcon from "@mui/icons-material/Search";
// import LanguageIcon from "@mui/icons-material/Language";
// import Switch from "@mui/material/Switch";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import ListIcon from "@mui/icons-material/List";
// import "./Navbar.scss";

// const Navbar = () => {
//   return (
//     <>
//       <div className="navbar">
//         <div className="navbarContainer">
//           <div className="search" style={{ visibility: "hidden" }}>
//             <input type="text" name="" id="" placeholder="search" />
//             <SearchIcon />
//           </div>
//           <div className="items">
//             <div className="item">
//               <img src="/images/teaher-1.jpg" alt="" className={"profileImg"} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="search" style={{ visibility: "hidden" }}>
          <input type="text" placeholder="search" />
        </div>
        <div className="items">
          <div className="item">
            <img
              src="/images/teaher-1.jpg"
              alt="Profile"
              className="profileImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;