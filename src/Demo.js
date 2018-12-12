import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import "./demo.css";
const gr = require("mxgraph-js");

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: {},
      layout: {},
      json: "",
      dragElt: null,
      createVisile: false,
      currentNode: null,
      currentTask: ""
    };
    this.LoadGraph = this.LoadGraph.bind(this);
  }
  componentDidMount() {
    this.LoadGraph();
  }
  LoadGraph = () => {
    gr.mxGraph.prototype.getAllConnectionConstraints = function(
      terminal,
      source
    ) {
      if (terminal != null && terminal.shape != null) {
        if (terminal.shape.stencil != null) {
          if (terminal.shape.stencil != null) {
            return terminal.shape.stencil.constraints;
          }
        } else if (terminal.shape.constraints != null) {
          return terminal.shape.constraints;
        }
      }

      return null;
    };

    // Defines the default constraints for all shapes
    const mxConnectionConstraint = gr.mxConnectionConstraint;
    const mxPoint = gr.mxPoint;
    gr.mxShape.prototype.constraints = [
      new mxConnectionConstraint(new mxPoint(0.25, 0), true),
      new mxConnectionConstraint(new mxPoint(0.5, 0), true),
      new mxConnectionConstraint(new mxPoint(0.75, 0), true),
      new mxConnectionConstraint(new mxPoint(0, 0.25), true),
      new mxConnectionConstraint(new mxPoint(0, 0.5), true),
      new mxConnectionConstraint(new mxPoint(0, 0.75), true),
      new mxConnectionConstraint(new mxPoint(1, 0.25), true),
      new mxConnectionConstraint(new mxPoint(1, 0.5), true),
      new mxConnectionConstraint(new mxPoint(1, 0.75), true),
      new mxConnectionConstraint(new mxPoint(0.25, 1), true),
      new mxConnectionConstraint(new mxPoint(0.5, 1), true),
      new mxConnectionConstraint(new mxPoint(0.75, 1), true)
    ];

    // Edges have no connection points
    gr.mxPolyline.prototype.constraints = null;
    if (!gr.mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      gr.mxUtils.error("Browser is not supported!", 200, false);
    } else {
      // Disables the built-in context menu
      const container = document.querySelector("#graphContainer");
      gr.mxEvent.disableContextMenu(container);

      // Creates the graph inside the given container
      var graph = new gr.mxGraph(container);
      graph.setConnectable(true);

      // Enables connect preview for the default edge style
      graph.connectionHandler.createEdgeState = function(me) {
        var edge = graph.createEdge(null, null, null, null, null);

        return new gr.mxCellState(
          this.graph.view,
          edge,
          this.graph.getCellStyle(edge)
        );
      };

      // Specifies the default edge style
      graph.getStylesheet().getDefaultEdgeStyle()["edgeStyle"] =
        "orthogonalEdgeStyle";

      // Enables rubberband selection
      new gr.mxRubberband(graph);

      // Gets the default parent for inserting new cells. This
      // is normally the first child of the root (ie. layer 0).
      var parent = graph.getDefaultParent();

      // Adds cells to the model in a single step
      graph.getModel().beginUpdate();
      try {
        var v1 = graph.insertVertex(parent, null, "shape1,", 20, 20, 80, 30);
        var v2 = graph.insertVertex(parent, null, "shape2", 200, 150, 80, 30);
        var e1 = graph.insertEdge(parent, null, "edge", v1, v2);
      } finally {
        // Updates the display
        graph.getModel().endUpdate();
      }
    }
  };
  render() {
    return <div id="graphContainer" />;
  }
}
export default Demo;
