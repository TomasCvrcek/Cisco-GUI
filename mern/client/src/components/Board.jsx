import React, { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import DeviceMenu from './DeviceMenu';
import 'reactflow/dist/style.css';
import '../App.css';
import '../styles/DeviceMenu.css'
import { useAuthContext } from '../hooks/useAuthContext';

/*
const initialEdges = [
  { id: 'e12', source: '1', target: '2', animated: true },
  { id: 'e13', source: '1', target: '3', animated: true },
  { id: 'e22a', source: '2', target: '2a', animated: true },
  { id: 'e22b', source: '2', target: '2b', animated: true },
  { id: 'e22c', source: '2', target: '2c', animated: true },
  { id: 'e2c2d', source: '2c', target: '2d', animated: true },
];
*/
const MenuNode = ({ data, id}) => (
  <div className="custom-node">
    <h3>{data.label}</h3>
    <DeviceMenu deviceId={id} config={data.configuration} type={data.devicetype}/>
  </div>
);


const nodeTypes = {menuNode: MenuNode };

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [menuNodes, setMenuNodes] = useState([]);
  const [menuEdges, setMenuEdges] = useState([]);
  const {user} = useAuthContext()



  useEffect(() => {
    if(user){
    axios.get('http://localhost:5555/devices',{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
      }
  })
      .then(response => {
        const mappedNodes = response.data.map(device => ({
          id: device._id,
          type: 'default',
          position: { x: device.position.x, y: device.position.y },
          configuration: device.configuration,
          devicetype: device.device,
          data: { label: `(${device.device} ${device.model})`}
        }));
        setNodes(mappedNodes);
        console.log('devices mapped')
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
      });
    }
  }, [user]);


  const addOriginalEdge = (edge) => {
    setOriginalEdges((prevEdges) => [...prevEdges, edge]);
  };


  const addMenuEdge = (edge) => {
    setMenuEdges((prevEdges) => [...prevEdges, edge]);
  };




  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

const destroyDevice = (id) => {
  if(user){
    try {
      axios.delete(`http://localhost:5555/devices/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    })
        .then(() => {
          setNodes((prevNodes) => prevNodes.filter(node => node.id !== id));
          setMenuNodes((prevNodes) => prevNodes.filter(node => node.id !== id+1));
        })
        .catch(error => {
          console.error('Error deleting device:', error.message);
        });
    } catch (error) {
      console.error('Error deleting device:', error.message);
    }
  }
}


  const makeDevice = (device, model, configuration, event, type, reactFlowInstance) => {

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const deviceData = {
      device: device,
      model: model,
      name: `${device} ${model}`,
      position: position,
      configuration: configuration,
    };

    console.log('device data', deviceData)
    if(user){
      try {
        axios.post('http://localhost:5555/devices', deviceData,{
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
          }
      })
        .then(response => {
          const newDeviceId = response.data;
          console.log('New device ID:', response);
          const newNode = {
            id: newDeviceId,
            type,
            position,
            data: { label:  `${device} ${model}` },
          };

          console.log('newNode',newNode)
          setNodes((nds) =>  nds.concat(newNode));
        })
          .catch((error) => {
            console.error('Error posting device data:', error.message);
          });
      } catch (error) {
        console.error('Error fetching device body:', error.message);
      }
    }
  }



  //open menu
  const handleNodeDoubleClick = useCallback((event, node) => {
    if (nodes.some(element => element.id === node.id)) {
        const newPosition = {
            x: node.position.x + 200,
            y: node.position.y
        };
        if (menuNodes.some(element => element.id === node.id + 1)) {
            const updatedMenuNodes = menuNodes.map(element => {
                if (element.id === node.id + 1) {
                    return { ...element, position: newPosition, devicetype: node.devicetype, configuration: node.configuration };
                }
                return element;
            });
            setMenuNodes(updatedMenuNodes);
        } else {
            const newMenuNode = {
                id: node.id + 1,
                type: 'menuNode',
                position: newPosition,
                data: { label: node.data.label + ' menu', configuration: node.configuration, devicetype: node.devicetype }
            };
            setMenuNodes((prevNodes) => prevNodes.concat(newMenuNode));
        }
    } else null;
}, [nodes, menuNodes]);


//get node ID
  const handleNodeClick = useCallback((event, node) => {

    setSelectedNodeId(node.id)
    console.log('menu nodes: ', menuNodes)
  }, [menuNodes, nodes]);

  //deleting nodes
  const handleDeleteKeyPress = useCallback((event) => {
    if (event.keyCode === 46 && reactFlowInstance && selectedNodeId && (nodes.some(element => element.id === selectedNodeId))) {
      console.log('Delete key pressed for node ID:', selectedNodeId);
      destroyDevice(selectedNodeId);
    } else {
      if (event.keyCode === 46) {
        setMenuNodes(prevNodes => prevNodes.filter(node => node.id !== selectedNodeId));
      }
    }
  }, [reactFlowInstance, selectedNodeId, nodes, destroyDevice]);



  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      const model = event.dataTransfer.getData('bagr');
      const typeOfDevice = event.dataTransfer.getData('typeOfDevice');
      const configuration = event.dataTransfer.getData('configuration');
      if (typeof type === 'undefined' || !type) {
        return;
      }

      makeDevice(typeOfDevice, model, configuration, event, type, reactFlowInstance)
    },
    [reactFlowInstance]
  );


  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={[...nodes, ...menuNodes]} 
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDoubleClick={handleNodeDoubleClick}
            onNodeClick={handleNodeClick}
            onKeyDown={handleDeleteKeyPress}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;