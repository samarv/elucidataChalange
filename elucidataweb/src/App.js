import React, { Component } from 'react';
import FileInput from 'react-simple-file-input'
import Plot from 'react-plotly.js';
import report from './report.svg';
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
        <div className="Header">
          <h1>
            Elucidata
          </h1>
        </div>
        <div className="Container">
          <div className="body" >
            <img src= {report} alt="report" />
              <p>
                  Glance at all your results. 
                <br />
                  Upload JSON file to plot 
                <br />
                  an interactive graph
              </p>
          </div>
          
          <label >
            <FileInput
              readAs='binary'
              style={ { display: 'flex'} }

              onLoadStart={this.showProgressBar}
              onLoad={this.handleFileSelected}
              onProgress={this.updateProgressBar}

              cancelIf={fileIsIncorrectFiletype}
              abortIf={this.cancelButtonClicked}

              onCancel={this.showInvalidFileTypeMessage}
              onAbort={this.resetCancelButtonClicked}
              />

            <span>
              
            </span>

          </label>
        </div>
        <div>
          {
            this.state.fileContents 
              ? 
                
                <Plot
                  data={
                    this.state.fileContents.groups[0].peaks.map(item => {
                      return {
                        x: item.eic.rt,
                        y: item.eic.intensity,
                        type: 'scatter',
                        fill: 'tonexty',
                        mode: 'none',
                        name: item.sampleName
                      }
                    })
                  }
                  layout={ 
                    {
                      width: 700, 
                      height: 500, 
                      title: 'Elucidata',
                      xaxis: {
                        title: 'Retention Times(in minutes)',
                        titlefont: {
                          family: 'Arial, sans-serif',
                          size: 18,
                          color: 'lightgrey'
                        },
                        showticklabels: true,
                        tickangle: 'auto',
                        tickfont: {
                          family: 'Old Standard TT, serif',
                          size: 14,
                          color: 'black'
                        },
                        exponentformat: 'e',
                        showexponent: 'all'
                      },
                      yaxis: {
                        title: 'Intensity',
                        titlefont: {
                          family: 'Arial, sans-serif',
                          size: 18,
                          color: 'lightgrey'
                        },
                        showticklabels: true,
                        tickangle: 45,
                        tickfont: {
                          family: 'Old Standard TT, serif',
                          size: 14,
                          color: 'black'
                        },
                        exponentformat: 'e',
                        showexponent: 'all'
                      }
                    } 
                  }
                />
              : 
                console.log("false")}
           
        </div>
      </div>
    );
  }
}

export default App;
