import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const Home = lazy(() => import('./home'));
const Event = lazy(() => import('./event'));
const OldEvents = lazy(() => import('./oldevents'));

const renderLoader = () => <div></div>;

function App() {
  return (
    <div>
    <Suspense fallback={renderLoader()}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="event" element={<Event />} />
        <Route path="oldevents" element={<OldEvents />} />
      </Routes>
    </BrowserRouter>
    </Suspense>
    </div>
  );
}

export default App;
