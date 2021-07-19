import "./contacts.scss";
import TopBar from "../../components/topBar/TopBar";
import SideBar from "../../components/sideBar/SideBar";
import { useSelector } from 'react-redux';
import ContactsBar from "../../components/contactsBar/ContactsBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";

const Contacts = () => {
  const user = useSelector(store => store.auth.user);
  const dispatch = useDispatch();
  const [owner, setOwner] = useState();
  const { id } = useParams();
  const path = process.env.REACT_APP_GET_FILE;
  const profilePictureName = user.profilePictureName ? path + user.profilePictureName : "/assets/default-user.png";
  const [search, setSearch] = useState();
  const [switchingCounter, setSwitchingCounter] = useState(0);

  useEffect(() => {
    if (id !== user._id) {
      const data = dispatch(getUser({ userId: id }));
      let isMount = true;

      data.then(res => {
        if (isMount && res) {
          setOwner(res.user);
        }
      });

      return () => {
        isMount = false;
      };
    }

    setOwner(user);
  }, [dispatch, id, user]);

  return (
    <div className="contacts-page">
      <TopBar
        profilePictureName={profilePictureName}
        user={user}
        owner={owner}
        search
        setSearch={setSearch}
        switchingCounter={switchingCounter}
      />
      <div className="contacts-page-container">
        <SideBar
          user={user} 
          profilePictureName={profilePictureName}
        />
        <div className="contacts-container">
        {owner && (
          <ContactsBar
            user={user}
            owner={owner}
            search={search}
            setSearch={setSearch}
            setSwitchingCounter={setSwitchingCounter}
            switchingCounter={switchingCounter}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;