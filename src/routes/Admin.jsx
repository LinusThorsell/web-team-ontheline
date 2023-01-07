import styled from "styled-components";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Admin() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  if (!auth.currentUser) {
    return (
      <Card sx={{width: 'fit-content', height: 'fit-content', padding: '1em'}}>
        <h1>Unknown user</h1>
        <Link to="/adminlogin" style={{color: 'white'}}>Logga in</Link>
      </Card>
    );
  }

  const [addEventObject, setAddEventObject] = useState({
    course: "",
    date: "",
    event: "",
    signup_url: "",
    sponsor: "",
  });
  const handleChange = (event) => {
    setAddEventObject({ ...addEventObject, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h1>Admin panel</h1>
      
      <Card sx={{width: 'fit-content', height: 'fit-content', padding: '1em'}}>
        <h1>Add Event</h1>
        <form>
          <div>
            <label htmlFor="course">Course</label>
            <input id="course" name="course" type="text" value={addEventObject.course} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="text" value={addEventObject.date} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="event">Event</label>
            <input id="event" name="event" type="text" value={addEventObject.event} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="signup_url">Signup URL</label>
            <input id="signup_url" name="signup_url" type="text" value={addEventObject.signup_url} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="sponsor">Sponsor</label>
            <input id="sponsor" name="sponsor" type="text" value={addEventObject.sponsor} onChange={handleChange} required />
          </div>
          
          <button>Submit Contact</button>
        </form>
      </Card>
    </>
  );
}

export default Admin;
