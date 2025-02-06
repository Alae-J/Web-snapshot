// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Notifications from "./components/Notifications";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "./store/notificationsSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.ui.darkMode);

  React.useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("notification", (data) => {
      dispatch(addNotification({
        id: Date.now(),
        message: data.message,
        type: data.type,
        timestamp: data.timestamp,
      }));
    });
    socket.on("favoriteAdded", (data) => {
      if (user && data.userId === user.id) {
        dispatch(addNotification({
          id: Date.now(),
          message: `Favorite added: ${data.anime.title}`,
          type: "info",
          timestamp: Date.now(),
        }));
      }
    });
    socket.on("favoriteRemoved", (data) => {
      if (user && data.userId === user.id) {
        dispatch(addNotification({
          id: Date.now(),
          message: `Favorite removed`,
          type: "warning",
          timestamp: Date.now(),
        }));
      }
    });
    return () => socket.disconnect();
  }, [dispatch, user]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <Navbar />
        <Notifications />
        <main className="pt-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
          <AnimatedRoutes />
        </main>
      </Router>
    </div>
  );
}

export default App;
