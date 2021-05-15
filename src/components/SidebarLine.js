import React from 'react';

function SidebarLine({ Icon, title, id }) {
  const className = `sidebar-line ${id ? 'sidebar-line--sub' : ''}
    
   `;

  return (
    <div className={className}>
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
