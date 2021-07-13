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
  const imageHref = user.profilePicture ? path + user.profilePicture : "/assets/default-user.png";
  const [search, setSearch] = useState();
  const [switchingCounter, setSwitchingCounter] = useState(0);

  useEffect(() => {
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
  }, [dispatch, id]);

  return (
    <div className="contacts-page">
      <TopBar
        imageHref={ imageHref }
        user={ user }
        owner={ owner }
        search
        setSearch={ setSearch }
        switchingCounter={ switchingCounter }
      />
      <div className="contacts-page-container">
        <SideBar
          user={ user } 
          imageHref={ imageHref }
        />
        <div className="contacts-container">
        {
          owner && 
          <ContactsBar
            user={ user }
            owner={ owner }
            search={ search }
            setSearch={ setSearch }
            setSwitchingCounter={ setSwitchingCounter}
            switchingCounter={ switchingCounter }
          />
        }
        </div>
      </div>
    </div>
  );
};

export default Contacts;