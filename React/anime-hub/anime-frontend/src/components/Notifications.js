// src/components/Notifications.js
import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../store/notificationsSlice';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Notifications.css';

function NotificationItem({ note }) {
  const nodeRef = useRef(null);
  const dispatch = useDispatch();

  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(`Auto-dismissing notification id: ${note.id}`);
      dispatch(removeNotification(note.id));
    }, 3000);
    return () => clearTimeout(timer);
  }, [dispatch, note.id]);

  const handleRemove = () => {
    console.log("Manual dismiss notification id:", note.id);
    dispatch(removeNotification(note.id));
  };

  return (
    <CSSTransition nodeRef={nodeRef} timeout={300} classNames="notification">
      <div ref={nodeRef} className="bg-white dark:bg-gray-800 shadow-lg rounded p-4 mb-2 border-l-4"
           style={{
             borderColor:
               note.type === 'warning'
                 ? '#f59e0b'
                 : note.type === 'error'
                   ? '#ef4444'
                   : '#10b981'
           }}>
        <div className="flex justify-between items-center">
          <div className="text-gray-800 dark:text-gray-100">{note.message}</div>
          <button onClick={handleRemove} className="text-gray-500 hover:text-gray-700 ml-2">
            &times;
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}

function Notifications() {
  const notifications = useSelector((state) => state.notifications.items);

  return (
    <div className="fixed top-4 right-4 z-50">
      <TransitionGroup>
        {notifications.map((note) => (
          <NotificationItem key={note.id} note={note} />
        ))}
      </TransitionGroup>
    </div>
  );
}

export default Notifications;
