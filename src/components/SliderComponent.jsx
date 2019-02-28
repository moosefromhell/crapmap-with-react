//https://material-ui.com/lab/slider/

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: '80%',
  },
  slider: {
    padding: '22px 0px',
  },
};

const theme = createMuiTheme({
    overrides: {
      MuiSlider: { // Name of the component ⚛️ / style sheet
        thumb: { // Name of the rule
          backgroundColor: 'white', // Some CSS
        },
        trackBefore:{
            backgroundImage: 'linear-gradient(260deg, #FF4700, #5200E8, #00FFDE)',
        }
      },
    },
  });

class StepSlider extends React.Component {
  state = {
    value: 25,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
            <Slider
            classes={{ container: classes.slider }}
            value={value}
            min={0}
            max={50}
            step={1}
            onChange={this.handleChange}
            />
        </MuiThemeProvider>
      </div>
    );
  }
}

StepSlider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepSlider);