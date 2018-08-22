import MemeActions from './MemeActions'; 
import React from 'react';

const MemeMeta = props => {
  const meme = props.meme;
  return ( 
    <div className="col-md-12">
    <div className="col-md-12" id="imageFeed">
      <div className='col-md-3'>
          <div className='card'>
            <img className='card-img-top' src={meme.memeImageURL}  alt='img-thumbnail' height='230px' width='250px' />
            <div className="card-body">
              <p className="card-text">{meme.author.username} </p>
              <p className="card-text">{new Date(meme.createdAt).toDateString()}</p>
            </div>
            <div className="card-body">
              <MemeActions canModify={props.canModify} meme={meme} />
            </div>
          </div>
      </div>
    </div>
    </div>
  );
};

export default MemeMeta;
