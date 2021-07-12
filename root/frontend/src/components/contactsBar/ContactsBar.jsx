import "./contactsBar.scss";
import { useState, useEffect } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import ContactItem from "./contactItem/ContactItem";
import { useDispatch } from "react-redux";
import { getPossibleFollowing } from "../../store/actions/userActions";

const ContactsBar = ({ user }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [contacts, setContacts] = useState();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    let isMount = true;

    switch (tabIndex) {
      case 0:
        setContacts(user.followers);
        break;
      case 1:
        setContacts(user.following);
        break;
      case 2:
        setContacts(null);
        const result = dispatch(getPossibleFollowing(user));
        
        result.then(res => {
          if (isMount && res) {
            setContacts(res.data.users);
          }
        });
        break;
      default:
        break;
    }

    return () => {
      isMount = false;
    }
  }, [tabIndex, user, dispatch]);

  return (
    <div className="contacts-bar">
      <div className="tab-panel">
        <AppBar position="static">
          <Tabs
            value={ tabIndex } 
            onChange={ handleChange }
            className="tabs"
          >
            <Tab label="Followers" value={ 0 }  />
            <Tab label="Following" value={ 1 }  />
            <Tab label="Possible following" value={ 2 }  />
          </Tabs>
        </AppBar>
      </div>
      <div className="contacts">
        {
          contacts && contacts.map((item, id) => {
            return(
              <ContactItem key={ id }  contact={ item }/>
            )
          })
        }
      </div>
    </div>
  );
};

export default ContactsBar;