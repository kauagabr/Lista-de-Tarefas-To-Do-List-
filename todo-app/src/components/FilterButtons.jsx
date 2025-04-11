import React from 'react';

function FilterButtons({ filter, setFilter }) {
  return (
    <div className="btn-group mb-3 w-100" role="group">
      <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('all')}>Todas</button>
      <button className={`btn ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setFilter('pending')}>Pendentes</button>
      <button className={`btn ${filter === 'completed' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setFilter('completed')}>Concluídas</button>
    </div>
  );
}

export default FilterButtons;
