import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./index.css";
import styled from "styled-components";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./routes/Home";
import Event from "./routes/Event";
import Media from "./routes/Media";
import Team from "./routes/Team";
import Admin from "./routes/Admin";
import AdminLogin from "./routes/AdminLogin";
import FourZeroFour from "./routes/FourZeroFour";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const MainPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <MainPageContainer>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/media" element={<Media />} />
            <Route path="/team" element={<Team />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="*" element={<FourZeroFour />} />
          </Routes>
          <Footer />
        </MainPageContainer>
      </ThemeProvider>
    </BrowserRouter>
);
