import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="navbar-nav mr-auto">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>

      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="navbar-nav mr-auto">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/addMeme" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Meme
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link"> 
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    );
  }

  return null;
};

class Header extends React.Component {
  render() {
    return (
      <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      
        <h1>
          <Link to="/" className="navbar-brand">
            {this.props.appName.toUpperCase()}
          </Link>
        </h1>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <LoggedOutView currentUser={this.props.currentUser} />

          <LoggedInView currentUser={this.props.currentUser} />
        </div>
      </nav>
    </header>
      // <nav className="navbar navbar-light">
      //   <div className="container">

      //     <Link to="/" className="navbar-brand">
      //       {this.props.appName.toLowerCase()}
      //     </Link>

      //     <LoggedOutView currentUser={this.props.currentUser} />

      //     <LoggedInView currentUser={this.props.currentUser} />
      //   </div>
      // </nav>
    );
  }
}

export default Header;
