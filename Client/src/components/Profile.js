import MemeList from './MemeList';
import React from 'react'; 
import agent from '../agent';
import { connect } from 'react-redux';
import { 
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';

// const EditProfileSettings = props => {
//   if (props.isUser) {
//     return (
//       <Link
//         to="/settings"
//         className="btn btn-sm btn-outline-secondary action-btn">
//         <i className="ion-gear-a"></i> Edit Profile Settings
//       </Link>
//     );
//   }
//   return null;
// };

const mapStateToProps = state => ({
  ...state.memeList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({ 
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }), 
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

class Profile extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.match.params.username),
      agent.Memes.byAuthor(this.props.match.params.username)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
 
  render() {
    const profile = this.props.profile;
    if (!profile) {
      return null;
    }

    // const isUser = this.props.currentUser &&
    //   this.props.profile.username === this.props.currentUser.username;

    return (
      <div className="main-page-top"> 
        <div className="col-xs-12 col-md-12 ">

          <img src={profile.image} className="user-img" alt={profile.username} />
          <h4>Hello! {profile.username}</h4>

          {/* <EditProfileSettings isUser={isUser} />  */}

        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-12">
 
              <MemeList
                pager={this.props.pager}
                memes={this.props.memes}
                memesCount={this.props.memesCount}
                state={this.props.currentPage} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
