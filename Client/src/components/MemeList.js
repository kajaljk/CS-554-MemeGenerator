import MemePreview from './MemePreview';
import MemePagination from './MemePagination';
import React from 'react';

const MemeList = props => {
  if (!props.memes) {
    return (
      <div className="row">Loading...</div>
    );
  }

  if (props.memes.length === 0) {
    return (
      <div className="row">
        No memes are here... yet.
      </div>
    );
  }

  return (
    <div>
  <div className="row">
      {
        props.memes.map(meme => {
          return (
            <MemePreview meme={meme} key={meme.slug}/>
          );
        })
      }
  </div>
  <div className="row">
      <MemePagination
        pager={props.pager}
        memesCount={props.memesCount}
        currentPage={props.currentPage} /> 
  </div>
  </div>
  );
};

export default MemeList;
