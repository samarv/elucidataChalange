import React, { Component } from 'react';
import FileInput from 'react-simple-file-input'
import Plot from 'react-plotly.js';

import './App.css';

var allowedFileTypes = ["application/json"];

function fileIsIncorrectFiletype(file){
  if (allowedFileTypes.indexOf(file.type) === -1) {
    return true;
  } else {
    return false;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cancelButtonClicked: false
    };
  }

  cancelButtonClicked = () => {
    return this.state.cancelButtonClicked;
  }

  resetCancelButtonClicked = () => {
    this.setState({ cancelButtonClicked: false });
  }

  showInvalidFileTypeMessage = (file) => {
    window.alert("Tried to upload invalid filetype " + file.type);
  }

  showProgressBar = () => {
    this.setState({ progressBarVisible: true});
  }

  updateProgressBar = (event) => {
    this.setState({
      progressPercent: (event.loaded / event.total) * 100
    });
  }

  handleFileSelected = (event, file) => {
    this.setState({file: file, fileContents: JSON.parse(event.target.result)});
    console.log(JSON.parse(event.target.result))
  }
  render() {
    return (
      <div className="App">
        <div className="Container">

          <label >
            <FileInput
              readAs='binary'
              style={ { display: 'none' } }

              onLoadStart={this.showProgressBar}
              onLoad={this.handleFileSelected}
              onProgress={this.updateProgressBar}

              cancelIf={fileIsIncorrectFiletype}
              abortIf={this.cancelButtonClicked}

              onCancel={this.showInvalidFileTypeMessage}
              onAbort={this.resetCancelButtonClicked}
              />

            <span>
              Upload JSON
            </span>

          </label>
        </div>
        <div>
          {
            this.state.fileContents 
              ? 
                <Plot
                data={[
                  {
                    x: this.state.fileContents.groups[0].peaks[0].eic.rt,
                    y: this.state.fileContents.groups[0].peaks[0].eic.intensity,
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: {color: 'red'},
                  }
                ]}
                layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
              />
              : 
                console.log("false")}
           
        </div>
      </div>
    );
  }
}

export default App;
