import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Select, Slider } from 'antd';
import Node from './base_node';
import RelationEdge from './edge';
import DagreCanvas from './dagre-canvas';
import './index.less';
import 'antd/dist/antd.css';
import 'butterfly-dag/dist/index.css';

import { fetchDataAndProcess } from './data'; // Import the function from data.js

const Option = Select.Option;

class DagreLayout extends Component {
  constructor() {
    super();
    this.canvas = null;
    this.state = {
      graphData: null, // State to hold the fetched data
      addNodesStatus: true
    };
  }

  async componentDidMount() {
    try {
      const data = await fetchDataAndProcess(); // Fetch the data
      this.setState({ graphData: data }, () => {
        const root = document.getElementById('dag-canvas');
        this.canvas = new DagreCanvas({
          root: root,
          disLinkable: true,
          linkable: true,
          draggable: true,
          zoomable: true,
          moveable: true,
          layout: {
            type: 'dagreLayout',
            options: {
              rankdir: 'TB',
              nodesep: 40,
              ranksep: 40,
              controlPoints: false,
            },
          },
          theme: {
            edge: {
              shapeType: 'AdvancedBezier',
              arrow: true,
              arrowPosition: 0.5,
              Class: RelationEdge
            }
          }
        });
        if (this.state.graphData) {
          this.canvas.draw(this.state.graphData); // Draw the graph using the fetched data
        }
      });
    } catch (error) {
      console.error('Error fetching graph data:', error);
    }
  }


  // Add nodes
  addNodes = () => {
    if (!this.state.addNodesStatus) {
      return;
    }
    this.canvas.addNodes([
      {
        id: 'test8',
        name: 'test8',
        Class: Node,
        color: '#c6e5ff'
      },
      {
        id: 'test9',
        name: 'test9',
        Class: Node,
        color: '#c6e5ff'
      }
    ]);
    this.canvas.addEdges([
      {
        source: 'test4',
        target: 'test8',
      },
      {
        source: 'test4',
        target: 'test9',
      },
    ]);
    this.canvas.drageReDraw();
    this.setState({
      addNodesStatus: false
    });
  }

  // Remove nodes
  removeNodes = () => {
    this.canvas.removeNodes(['test8', 'test9']);
    this.canvas.removeEdges([
      {
        source: 'test4',
        target: 'test8',
      },
      {
        source: 'test4',
        target: 'test9',
      },
    ]);
    this.canvas.drageReDraw();
    this.setState({
      addNodesStatus: true
    });
  }

  // Handle configuration changes
  optionsChange = (key, value) => {
    const oldOptions = this.canvas.layout.options;
    const newOptions = { ...oldOptions, [key]: value };
    this.canvas.drageReDraw(newOptions);
  }

  render() {
    return (
      <div className='dagreLayout-page'>
        <div className='operate-bar'>
          <div className='operate-bar-title'>Property configuration</div>
          {/* 
          <div className='operate-item'>
            <div className='operate-node'>Add and delete nodes:</div>
            <Button onClick={this.addNodes}>Add node</Button>
            <Button onClick={this.removeNodes}>Delete node</Button>
          </div> 
          */}
          <div
            style={{
              width: '200px',
            }}
            className='operate-item'>
            <div className='operate-rankdir'>Layout direction:</div>
            <Select defaultValue="TB" style={{ width: 120 }} onChange={this.optionsChange.bind(this, 'rankdir')}>
              <Option value="TB">TB</Option>
              <Option value="BT">BT</Option>
              <Option value="LR">LR</Option>
              <Option value="RL">RL</Option>
            </Select>
          </div>
          <div className='operate-item'>
            <div className='operate-align'>Alignment direction:</div>
            <Select defaultValue='default' style={{ width: 120 }} onChange={this.optionsChange.bind(this, 'align')}>
              <Option value={undefined}>default</Option>
              <Option value="UL">UL</Option>
              <Option value="UR">UR</Option>
              <Option value="DL">DL</Option>
              <Option value="DR">DR</Option>
            </Select>
          </div>
          <div className='operate-item'>
            <div className='operate-nodesep'>Horizontal spacing:</div>
            <Slider defaultValue={40} onAfterChange={this.optionsChange.bind(this, 'nodesep')} />
          </div>
          <div className='operate-item'>
            <div className='operate-ranksep'>Layer spacing:</div>
            <Slider defaultValue={40} onAfterChange={this.optionsChange.bind(this, 'ranksep')} />
          </div>
        </div>
        <div className="flow-canvas" id="dag-canvas"></div>
      </div>
    );
  }
}

ReactDOM.render(<DagreLayout />, document.getElementById('root'));

export default DagreLayout;
