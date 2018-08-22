import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux'; 
import _superagent from 'superagent';

import { 
  ADDMEME_PAGE_LOADED, 
  MEME_SUBMITTED,
  ADDMEME_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';
 
const mapStateToProps = state => ({
  ...state.addMeme
});

const mapDispatchToProps = dispatch => ({ 
  onLoad: payload =>
    dispatch({ type: ADDMEME_PAGE_LOADED, payload }), 
  onSubmit: payload =>
    dispatch({ type: MEME_SUBMITTED, payload }),
  onUnload: payload =>
    dispatch({ type: ADDMEME_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
}); 

class AddMeme extends React.Component {
  constructor() {
    super();
    this.state = { imageURL:null };

    const updateFieldEvent = key => ev => {
      this.props.onUpdateField(key, ev.target.value);
    }
    this.changeTitle = updateFieldEvent('title');
    this.changeTopTxt = updateFieldEvent('topTxt');
    this.changeBottomTxt = updateFieldEvent('bottomTxt'); 
 
    this.submitForm = ev => {
      ev.preventDefault();
      const newmeme = {
        title: this.props.title,
        topTxt: this.props.topTxt,
        bottomTxt: this.props.bottomTxt, 
        imageURL: this.state.imageURL
      };  
      if(!this._validateForm(newmeme)) return;

      const slug = { slug: this.props.memeSlug };
      const promise = this.props.memeSlug ?
        agent.Memes.update(Object.assign(newmeme, slug)) :
        agent.Memes.create(newmeme);

      this.props.onSubmit(promise);
    };
  }
  _validateForm(meme){
    if (meme.title === "" || meme.title === undefined) {
      alert("Title is required."); 
      return false;
    } 
    if (meme.topTxt === "" || meme.topTxt === undefined) {
      alert("Top text for meme is required."); 
      return false;
    }   
    if (meme.bottomTxt === "" || meme.bottomTxt === undefined) {
      alert("Bottom text for meme is required."); 
      return false;
    } 
    if (meme.imageURL === "" || meme.imageURL === undefined) {
      alert("Meme image is required."); 
      return false;
    } 
    return true;
  }
  onImageDrop(files) {  
　  this.handleImageUpload(files[0]);
　} 
  handleImageUpload(file) { 
   let _this=this;
   _superagent.post('http://localhost:3000/api/uploadImage').attach('uploadfile',file).end(function(err,res){
      
      _this.setState({
        imageURL:res.body.filename
      });
 
   });
   console.log(file);
    
  } 
   componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(agent.Memes.get(this.props.match.params.slug));
      }
      this.props.onLoad(null);
    }
  }
  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(agent.Memes.get(this.props.match.params.slug));
    }
    this.props.onUnload(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="main-page-top">
        <div className='col-sm-10'>
            <h1>Add Meme</h1>
        </div> 
          <ListErrors errors={this.props.errors} />

            <form>
                <div className='form-group'>
                  <label className='col-sm-2 col-form-label' htmlFor="title">Title*</label>
                  <div className='col-sm-10'>
                    <input id='title'
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Meme Title"
                      value={this.props.title}
                      onChange={this.changeTitle} />
                  </div>
                </div>

                <div className='form-group'>
                  <label className='col-sm-2 col-form-label' htmlFor="toptext">Meme Top Text*</label>
                  <div className='col-sm-10'>
                    <input id='toptext'
                      className="form-control"
                      type="text"
                      placeholder="Wrtie meme top text"
                      value={this.props.topTxt}
                      onChange={this.changeTopTxt} />
                  </div>
                </div>

                <div className='form-group'>
                  <label className='col-sm-2 col-form-label' htmlFor="bottomtext">Meme Bottom Text*</label>
                  <div className='col-sm-10'>
                    <input id='bottomtext'
                      className="form-control" 
                      type="text"
                      placeholder="Write meme bottom text"
                      value={this.props.bottomTxt}
                      onChange={this.changeBottomTxt} /> 
                  </div>
                </div> 
                <div className='col-sm-10'>
                  <Dropzone onDrop={this.onImageDrop.bind(this)}
                  multiple= {false} > 
                  
                    <p>click to select files to upload.*</p>
                  </Dropzone> 
                </div>
                  <br></br>
                  <div className="form-group col-sm-10">
                    <input
                      disabled="disabled"
                      className="form-control"
                      placeholder="What is the imageURL?(if there exists)"
                      value={"http://localhost:3000/public/"+this.state.imageURL} /> 
                  </div>
                  <div className='col-sm-10 '>
                    <button
                      className="btn btn-lg pull-xs-right btn-primary"
                      type="button"
                      disabled={this.props.inProgress}
                      onClick={this.submitForm}>
                      Add Meme
                    </button>
                  </div>
              </form>
            </div> 
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMeme);
