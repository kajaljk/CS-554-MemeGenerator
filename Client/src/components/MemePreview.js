import React from 'react'; 
import {FacebookShareButton, FacebookIcon,
        TwitterShareButton,  TwitterIcon,
        GooglePlusShareButton, GooglePlusIcon,
        WhatsappShareButton, WhatsappIcon,
        TumblrShareButton, TumblrIcon 
} from 'react-share';
 
const MemePreview = props => {
  const meme = props.meme;
  
  return ( 
      <div className='col-xs-12 col-sm-12 col-md-6 col-lg-3'>
          <div className='card bg-light mb-3'>
            <img className='card-img-top' src={meme.memeImageURL}  alt='img-thumbnail' height='200px'   />
            <div className="card-body text-dark">  
            
              <p className="card-text">{meme.author.username.toUpperCase()} | {new Date(meme.createdAt).toDateString()} </p>
              <div className="row meme-social-share">
              &nbsp;
                <FacebookShareButton url={meme.memeImageURL} quote={meme.title} className="share-button-point">
                  <FacebookIcon size={32}  round={true} />
                </FacebookShareButton> 
                 &nbsp;
                <TwitterShareButton url={meme.memeImageURL} quote={meme.title} className="share-button-point">
                  <TwitterIcon size={32}  round={true} />
                </TwitterShareButton> 
                &nbsp;
                <GooglePlusShareButton url={meme.memeImageURL} quote={meme.title} className="share-button-point">
                  <GooglePlusIcon size={32}  round={true} />
                </GooglePlusShareButton> 
                &nbsp;
                <WhatsappShareButton url={meme.memeImageURL} quote={meme.title} separator=":: " className="share-button-point">
                  <WhatsappIcon size={32}  round={true} />
                </WhatsappShareButton> 
                &nbsp;
                <TumblrShareButton url={meme.memeImageURL} title={meme.title} className="share-button-point">
                  <TumblrIcon size={32}  round={true} />
                </TumblrShareButton> 
                &nbsp;
              </div>
            </div>
          </div>
      </div> 
  );
}

export default  MemePreview;

