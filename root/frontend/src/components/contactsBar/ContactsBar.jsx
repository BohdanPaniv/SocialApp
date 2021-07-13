import "./contactsBar.scss";
import { useState, useEffect, useCallback } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import ContactItem from "./contactItem/ContactItem";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getPossibleFollowing, getFollowers, getFollowing } from "../../store/actions/userActions";

const ContactsBar = ({ owner, search, setSearch, setSwitchingCounter, switchingCounter, user }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const location = useLocation();
  const [contacts, setContacts] = useState();
  const dispatch = useDispatch();
  const ownerName = `${ owner.name } ${ owner.surname }`;

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
    setSearch(null);
    setSwitchingCounter(switchingCounter + 1);
  };

  const getCurrentLocation = useCallback(() => {
    const lastSegment = location.pathname.split("/").pop();
    if (lastSegment === "following") {
      setTabIndex(1);
    }
  }, [location]);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation])

  useEffect(() => {
    let isMount = true;

    const data ={
      _id: owner._id,
      search: search
    };

    switch (tabIndex) {
      case 0:
        const followers = dispatch(getFollowers(data));
        
        followers.then(value => {
          if (isMount && value) {
            setContacts(value.data.followers);
          }
        });
        break;
      case 1:
        const following = dispatch(getFollowing(data));
        
        following.then(value => {
          if (isMount && value) {
            setContacts(value.data.following);
          }
        });;
        break;
      case 2:
        setContacts(null);

        const newData = {
          user: owner,
          search: search
        };
        const result = dispatch(getPossibleFollowing(newData));
        
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
    };
  }, [tabIndex, owner, dispatch, search, setSearch, location]);

  return (
    <div className="contacts-bar">
      <h2 className="title">
        { ownerName }
      </h2>
      <div className="tab-container">
        <AppBar position="static" className="tabs">
          <Tabs
            value={ tabIndex } 
            onChange={ handleChange }
            className="tabs"
          >
            <Tab
              label={`Followers`}
              className="tab"
              value={ 0 }
            />
            <Tab
             label={`Following`}
             className="tab"
             value={ 1 }  
            />
            {
              owner._id === user._id &&
              <Tab 
                label="Possible following"
                className="tab"
                value={ 2 }  
              />
            }
          </Tabs>
        </AppBar>
      </div>
      <div className="contacts">
        {
          contacts && contacts.map((item, index) => {
            return(
              <ContactItem key={ index }  contact={ item }/>
            )
          })
        }
      </div>
    </div>
  );
};

export default ContactsBar;