import { DriveFolderUploadOutlined } from "@mui/icons-material";
import "./NewUser.scss";

const NewUser = () => {
  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">
            <h1>Ajouter ou Modifier un utilisateur</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <img
                src="/images/teaher-1.jpg"
                alt=""
                srcSet=""
                className="image"
              />
            </div>
            <div className="right">
              <form>
                <div className="formInput">
                  <label htmlFor="file">
                    Image : <DriveFolderUploadOutlined className="icon" />
                  </label>
                  <input type="file" id="file" style={{display: "none"}} />
                </div>

                <div className="formInput">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" placeholder="abdou" />
                </div>

                <div className="formInput">
                  <label htmlFor="fullname">Nom complet</label>
                  <input type="text" id="fullname" placeholder="abdallahi Nah" />
                </div>

                <div className="formInput">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="abdounah@gmail.com" />
                </div>

                <div className="formInput">
                  <label htmlFor="tel">Telephone</label>
                  <input type="number" id="tel" placeholder="22124435" />
                </div>

                <div className="formInput">
                  <label htmlFor="pass">Password</label>
                  <input type="password" id="pass" />
                </div>

                <div className="formInput">
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" placeholder="Al jedide, Boutilimitt" />
                </div>

                <div className="formInput">
                  <label htmlFor="country">Country</label>
                  <input type="text" id="country" placeholder="mauritania" />
                </div>
                <button type="submit">Enregistrer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUser;
