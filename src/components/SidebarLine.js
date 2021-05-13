import React from 'react';
import { useStateValue } from '../StateProvider';

function SidebarLine({ Icon, title, id, subChannel }) {
  const [{ activeChannel }, dispatch] = useStateValue();
  const active = activeChannel && id === activeChannel;
  const className = `sidebar-line ${subChannel && 'sidebar-line--sub'} ${
    active && 'active'
  }`;

  return (
    <div
      className={className}
      onClick={() => {
        dispatch({ type: 'SET_ACTIVE_CHANNEL', payload: id });
      }}
    >
      {Icon ? (
        <Icon className='sidebar-line__icon' />
      ) : (
        <h2 className='sidebar-line__hashtag'>#</h2>
      )}

      <h3>{title}</h3>
    </div>
  );
}

export default SidebarLine;
