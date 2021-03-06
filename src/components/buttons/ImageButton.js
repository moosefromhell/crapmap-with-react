import React, { Component } from 'react'
import Tooltip from '@material-ui/core/Tooltip'

export default class ImageButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: null
        }
        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            console.log(image);
            this.setState({
                image
            })
        }
        this.props.sendData(e.target.files[0]);
    }


  render() {
    return (
      <div onClick={this._uploadImage}>
        <Tooltip title="Add An Image">
          <input type="file" onChange={this._handleChange} name="postingImg" id="file" class="inputfile" accept="image/*" style={{ marginTop: 20 }} />
        </Tooltip>
      </div>
    )
  }
}


// article on the input label thing https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/

