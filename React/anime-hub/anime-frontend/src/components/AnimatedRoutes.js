// src/components/AnimatedRoutes.js
import React, { useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import AnimeDetails from '../pages/AnimeDetails';
import Auth from '../pages/Auth';
import UserProfile from '../pages/UserProfile';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './AnimatedRoutes.css';

function AnimatedRoutes() {
  const location = useLocation();
  const nodeRef = useRef(null); // Create a ref to pass to CSSTransition

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} nodeRef={nodeRef} classNames="fade" timeout={300}>
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<AnimeDetails />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default AnimatedRoutes;
