import React from 'react'; 

  
const MemePreview = props => {
  const meme = props.meme;
 
  
  const fbs_click = function(TheImg) {
    console.log("FB:"+TheImg);
  }

  return (
    
          <div className='col-md-3'>
              <div className='card'>
                <img className='card-img-top' src={meme.memeImageURL}  alt='img-thumbnail' height='250px' width='250px'
                     onClick={fbs_click('a')}/>
                <div className="card-body">
                  <p className="card-text">{meme.author.username} </p>
                  <p className="card-text">{new Date(meme.createdAt).toDateString()}</p>
                </div>
              </div>
          </div>
    //     </div>
    // </div>
  );
}

export default  MemePreview;

