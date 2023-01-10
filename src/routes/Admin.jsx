import styled from "styled-components";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  auth,
  storage,
  uploadEvent,
  uploadNews,
  uploadFolder,
  getMediaDirectory,
  addImageURLToDatabase,
} from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import EventCard from "../components/EventCard";
import { NewsContent } from "../components/News";
import RemoveMedia from "../components/RemoveMedia";
import EditTeamCard from "../components/EditTeamCard";
import EditNextEvent from "../components/EditNextEvent";
import RemoveEvent from "../components/RemoveEvent";

const Form = styled.form`
  div {
    display: flex;
    flex-direction: column;
  }
`;
const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50em;

  margin: auto;
`;
const InsertDivider = styled.div`
  background-color: pink;
  height: 0.2em;
  width: 100%;

  margin-bottom: 1.5em;
  margin-top: 1.5em;

  opacity: 0.3;
`;

function Admin() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  if (!auth.currentUser) {
    return (
      <Card
        sx={{ width: "fit-content", height: "fit-content", padding: "1em" }}
      >
        <h1>Unknown user</h1>
        <Link to="/adminlogin">Logga in</Link>
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
  const [addNewsObject, setAddNewsObject] = useState({
    title: "",
    date: "",
    content: "",
    id: null,
  });
  const [addFolderObject, setAddFolderObject] = useState({
    title: "",
    sponsor: "",
    foldername: "",
  });

  const handleChange = (event) => {
    setAddEventObject({
      ...addEventObject,
      [event.target.name]: event.target.value,
    });
  };
  const handleNewsChange = (event) => {
    setAddNewsObject({
      ...addNewsObject,
      [event.target.name]: event.target.value,
    });
  };
  const handleFolderChange = (event) => {
    setAddFolderObject({
      ...addFolderObject,
      [event.target.name]: event.target.value,
    });
  };
  const submitEvent = (event) => {
    event.preventDefault();
    uploadEvent(addEventObject);
  };
  const submitNews = (event) => {
    event.preventDefault();
    uploadNews(addNewsObject);
  };
  const submitFolder = (event) => {
    event.preventDefault();
    uploadFolder(addFolderObject);
  };

  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [mediaDirectories, setMediaDirectories] = useState([]);

  useEffect(() => {
    getMediaDirectory().then((dir) => {
      setMediaDirectories(dir);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const files = Array.from(e.target[0].files);
    files.forEach((file) => {
      if (!file) return;

      let img = new Image();
      let width, height;
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        width = img.width;
        height = img.height;
      };
      const storageRef = ref(storage, `${selectedFolder}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL);
            addImageURLToDatabase(downloadURL, selectedFolder, width, height);
          });
        }
      );
    });
  };

  const [selectedFolder, setSelectedFolder] = useState(null);
  function folderOptionChanged(e) {
    let folder = e.target.value;
    setSelectedFolder(folder);
  }

  return (
    <AdminContainer>
      <h1 style={{ textAlign: "center", marginBottom: "0" }}>Admin panel</h1>
      <p style={{ textAlign: "center", marginTop: "0" }}>
        Om du har hamnat här och du vet med dig att du inte ska kunna komma hit,
        kontakta linus@teamontheline.com
      </p>

      <InsertDivider />

      <EditNextEvent />

      <InsertDivider />

      <Card
        sx={{
          width: "auto",
          height: "fit-content",
          padding: "1em",
          paddingTop: "0",
          margin: "0.5em",
        }}
      >
        <h1>Add Event</h1>
        <Form>
          <div>
            <label htmlFor="event">Event</label>
            <input
              id="event"
              name="event"
              type="text"
              value={addEventObject.event}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="course">Course</label>
            <input
              id="course"
              name="course"
              type="text"
              value={addEventObject.course}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="text"
              value={addEventObject.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="sponsor">Sponsor</label>
            <input
              id="sponsor"
              name="sponsor"
              type="text"
              value={addEventObject.sponsor}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="signup_url">Signup URL</label>
            <input
              id="signup_url"
              name="signup_url"
              type="text"
              value={addEventObject.signup_url}
              onChange={handleChange}
              required
            />
          </div>

          <Button onClick={submitEvent} color="secondary">
            Submit Event
          </Button>
        </Form>
      </Card>
      
      <p>Preview Event</p>
      <EventCard
        event={addEventObject.event}
        course={addEventObject.course}
        sponsor={addEventObject.sponsor}
        date={addEventObject.date}
        signup_url={addEventObject.signup_url}
      />
      
      <RemoveEvent />

      <InsertDivider />

      <Card
        sx={{
          width: "auto",
          height: "fit-content",
          padding: "1em",
          paddingTop: "0",
          margin: "0.5em",
        }}
      >
        <h1>Add News</h1>
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={addNewsObject.event}
              onChange={handleNewsChange}
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="text"
              value={addNewsObject.date}
              onChange={handleNewsChange}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <input
              id="content"
              name="content"
              type="text"
              value={addNewsObject.content}
              onChange={handleNewsChange}
              required
            />
          </div>

          <Button onClick={submitNews} color="secondary">
            Submit News
          </Button>
        </Form>
      </Card>
      
      <p>Preview News</p>
      <div style={{ marginLeft: "5%", marginTop: "0.5em" }}>
        <NewsContent
          title={addNewsObject.title}
          date={addNewsObject.date}
          content={addNewsObject.content}
        />
      </div>

      <InsertDivider />

      <Card
        sx={{
          width: "auto",
          height: "fit-content",
          padding: "1em",
          paddingTop: "0",
          margin: "0.5em",
        }}
      >
        <h1>Upload Media</h1>
        <label htmlFor="folder">Choose a folder to upload to:</label>
        <select onChange={folderOptionChanged} name="folder">
          <option value="null">Choose a folder</option>
          {mediaDirectories.map((dir) => (
            <option
              key={dir.directory.foldername}
              value={dir.directory.foldername}
            >
              {dir.directory.title}
            </option>
          ))}
        </select>

        <p>Select File</p>

        <form onSubmit={handleSubmit} className="form">
          <input type="file" multiple />
          <button type="submit">Upload</button>
        </form>
        {!imgUrl && (
          <div className="outerbar">
            <div className="innerbar" style={{ width: `${progresspercent}%` }}>
              {progresspercent}%
            </div>
          </div>
        )}
        {imgUrl && (
          <>
            <img src={imgUrl} alt="uploaded file" height={200} />
            <p>File uploaded successfully</p>
          </>
        )}
      </Card>

      <RemoveMedia
        selectedFolder={selectedFolder}
        mediaDirectories={mediaDirectories}
      />

      <Card
        sx={{
          width: "auto",
          height: "fit-content",
          padding: "1em",
          paddingTop: "0",
          margin: "0.5em",
        }}
      >
        <h1>Add Media Folder</h1>
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={addFolderObject.event}
              onChange={handleFolderChange}
              required
            />
          </div>
          <div>
            <label htmlFor="sponsor">Sponsor</label>
            <input
              id="sponsor"
              name="sponsor"
              type="text"
              value={addFolderObject.sponsor}
              onChange={handleFolderChange}
              required
            />
          </div>
          <div>
            <label htmlFor="foldername">Folder Name</label>
            <input
              id="foldername"
              name="foldername"
              type="text"
              value={addFolderObject.foldername}
              onChange={handleFolderChange}
              required
            />
          </div>

          <Button onClick={submitFolder} color="secondary">
            Submit Folder
          </Button>
        </Form>
      </Card>
     
      <InsertDivider />

      <EditTeamCard />

      <InsertDivider />

    </AdminContainer>
  );
}

export default Admin;
