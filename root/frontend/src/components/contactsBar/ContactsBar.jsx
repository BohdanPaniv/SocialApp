import "./contactsBar.scss";
import { useState, useEffect } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import ContactItem from "./contactItem/ContactItem";
import { useDispatch } from "react-redux";
import { getPossibleFollowing, getFollowers, getFollowing } from "../../store/actions/userActions";

const ContactsBar = ({ user, search, setSearch, setSwitchingCounter, switchingCounter }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [contacts, setContacts] = useState();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    setSearch(null);
    setSwitchingCounter(switchingCounter + 1);
  };

  useEffect(() => {
    let isMount = true;

    const data ={
      _id: user._id,
      search: search
    };

    switch (tabIndex) {
      case 0:
        const followers = dispatch(getFollowers(data));
        
        followers.then(value => {
          if (isMount) {
            setContacts(value.data.followers);
          }
        });
        break;
      case 1:
        const following = dispatch(getFollowing(data));
        
        following.then(value => {
          if (isMount) {
            setContacts(value.data.following);
          }
        });;
        break;
      case 2:
        setContacts(null);

        const newData = {
          user: user,
          search: search
        };
        const result = dispatch(getPossibleFollowing(newData));
        
        result.then(res => {
          if (isMount) {
            setContacts(res.data.users);
          }
        });
        break;
      default:
        break;
    }

    return () => {
      isMount = false;
    };
  }, [tabIndex, user, dispatch, search, setSearch]);

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