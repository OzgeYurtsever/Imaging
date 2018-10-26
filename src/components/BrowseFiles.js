import React from 'react';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';

function getBlobUrl(url) {
  const baseUrl = window.URL || window.webkitURL;
  const blob = new Blob([`importScripts('${url}')`], {
    type: 'application/javascript'
  });

  return baseUrl.createObjectURL(blob);
}

let webWorkerUrl = getBlobUrl(
  'https://unpkg.com/cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderWebWorker.min.js'
);
let codecsUrl = getBlobUrl(
  'https://unpkg.com/cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoaderCodecs.js'
);

var config = {
  startWebWorkersOnDemand: true,
  webWorkerPath: webWorkerUrl,
  taskConfiguration: {
    decodeTask: {
      loadCodecsOnStartup: true,
      initializeCodecsOnStartup: false,
      codecsPath: codecsUrl,
      usePDFJS: false
    }
  }
};

class BrowseFiles extends React.Component {
  componentDidMount() {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.external.Hammer = Hammer;
    var element = this.display;
    cornerstone.enable(element);
  }

  render() {
    console.log('browsefiles props:', this.props);
    return (
      <div>
        <div>
          <input
            type="file"
            ref={node => (this.fileSelected = node)}
            onChange={this.handleImageUpload}
          />
        </div>
        <div id="image-display" ref={node => (this.display = node)} />
      </div>
    );
  }

  handleImageUpload = e => {
    e.preventDefault();
    e.stopPropagation();

    const files = this.fileSelected.files;

    if (files) {
      let file = files[0];
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
      cornerstone.loadImage(imageId).then(img => {
        const viewport = cornerstone.getDefaultViewport(
          this.display.children[0],
          img
        );
        cornerstone.displayImage(this.display, img, viewport);
      });
    }
  };
}
export default BrowseFiles;
