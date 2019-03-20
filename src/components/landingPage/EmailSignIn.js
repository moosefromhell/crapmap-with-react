import React, { Component } from 'react';
// import { FirebaseContext } from '../../firebase';
import { auth } from './../../firebase.js'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab'
import LineDivider from '../addEditPin/LineDivider.js';

import store from '../../redux/store'
import { registerUser } from '../../redux/actions/userActions'



const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
class EmailForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      open: false,
      scroll: 'paper',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });

  };

  doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => auth.signOut();

  doPasswordReset = email => auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    auth.currentUser.updatePassword(password);

  onSubmit = event => {
    const { email, password } = this.state;
    this.doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        var actionObject = {
          userID: authUser.user.uid,
          auth: true
        }
        store.dispatch(registerUser(actionObject));
        this.props.sendData(authUser);

        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    // event.preventDefault();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  render() {
    const {
  
      email,
      password,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid = password === '' || email === '';


    return (
      <div>
        <Fab color="error"
          style={{
            width: 210,
            borderRadius: 4,
            margin: 10,
            opacity: 1
          }}
          onClick={this.handleClickOpen('paper')}>
          Login with Email
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
          style={{ 'z-index': 30, 'background-color': 'primary' }}>
          <DialogTitle>
            SIGN IN
          </DialogTitle>
          <LineDivider />
          <DialogContent>
            <form onSubmit={this.onSubmit}>
              <TextField
                id="outlined-name"
                label="Email"
                margin="normal"
                variant="outlined"
                value={email}
                onChange={this.onChange}
                placeholder="Email Address"
                name="email"
              />
              <TextField
                id="outlined-name"
                label="Password"
                margin="normal"
                variant="outlined"
                value={password}
                onChange={this.onChange}
                placeholder="Enter Password"
                name="password"
              />
              {error && <p>{error.message}</p>}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onSubmit} disabled={isInvalid} type="submit" color="primary">Sign In</Button>
            <Button onClick={this.handleClose} color="error">Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// EmailLogin.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   classes: PropTypes.object.isRequired,
//   show: PropTypes.bool,
//   children: PropTypes.node
// };

export default EmailForm;