# Usage Instructions

To use this project, follow these steps:

1. Import the `Physics` class into your JavaScript file.

```javascript
import Physics from './Physics.js';

1. Define the properties for your 3D object, including dimensions, position, rotation, and color.

const dimension = { x: 10, y: 0.1, z: 10 };
const position = { x: 0, y: 0, z: 0 };
const rotation = { x: 0, y: 0, z: 0, w: 1 };
const color = 'red';

2. Create an instance of the Physics class by passing these properties to its constructor.

const physicsInstance = new Physics(dimension, position, rotation, color, scene);

3. Use the createFinalObject method to create a 3D object based on your specifications of physicsInstance.

physicsInstance.createFinalObject();

4. In your animation loop (e.g., in the tick function), call the updatePhysics method to update the physics simulation.

function tick() {
    
    // Update the physics simulation
    physicsInstance.updatePhysics();
    
}


