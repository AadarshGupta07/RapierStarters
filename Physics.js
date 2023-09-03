
/**
 * Represents an object with position.
 * @typedef {Object} Position
 * @property {number} x - The x-coordinate.
 * @property {number} y - The y-coordinate.
 * @property {number} z - The z-coordinate.
 */

/**
 * Represents an object with dimension.
 * @typedef {Object} Dimension
 * @property {number} width - The width.
 * @property {number} height - The height.
 * @property {number} depth - The depth.
 */

/**
 * Represents an object with dimension.
 * @typedef {Object} Rotation
 * @property {number} x - Along the x axis.
 * @property {number} y - Along the y axis.
 * @property {number} z - Along the z axis.
 * @property {number} w - w.
 */

/**
 * Represents an object with Color.
 * @typedef {Object} Color
 * @property {string} color - The THREE color as a string.
 */

import * as RAPIER from '@dimforge/rapier3d'
import * as THREE from 'three'

export default class Physics {

    /**
     * Creates an instance of Physics class.
     * @param {Dimension} dimensionObject - The dimension object.
     * @param {Position} positionObject - The position object.
     * @param {Rotation} quaternionRotationObject - The rotation object.
     * @param {Color} THREEColor - color string.
     */

    constructor( Dimension, Position, Rotation, Color, scene ) {

        this.gravity = { x: 0.0, y: -9.81, z: 0.0 }
        this.world = new RAPIER.World(this.gravity)
        this.scene = scene

        this.wantDebugger = true

        this.dimension = Dimension
        this.position = Position
        this.rotation = Rotation

        this.color = Color

        this.P_Object = null;
        this.T_Object = null;


    }

    createThreeCube( w, h, d, color ) {

        let cube = new THREE.Mesh(new THREE.BoxGeometry( w * 2, h * 2, d * 2 ), new THREE.MeshBasicMaterial({ color: color, wireframe: false }))

        return cube

    }

    createPhysicsCube( w, h, d, x, y, z, x_, y_, z_, w_ ) {


        let cubeColliderDesc = new RAPIER.ColliderDesc( new RAPIER.Cuboid( w, h, d ) ).setTranslation( x, y, z )
        let cube = this.world.createCollider( cubeColliderDesc );

        if ( x_ ) {

            cube.setRotation( { x: x_, y: y_, z: z_, w: w_ } )

        }

        // debugger
        if ( this.wantDebugger ) {

            let debug = () => {

                let debugCube = new THREE.Mesh( new THREE.BoxGeometry(w * 2, h * 2, d * 2), new THREE.MeshBasicMaterial({ color: 'lime', wireframe: true }))

                let cube_position = cube.translation();
                let cube_rotation = cube.rotation();

                debugCube.position.set( cube_position.x, cube_position.y, cube_position.z )
                debugCube.quaternion.set( cube_rotation.x, cube_rotation.y, cube_rotation.z, cube_rotation.w )
                this.scene.add( debugCube )

            }

            debug()
        }

        //

        return cube

    }

    createFinalObject() {

        this.T_Object = this.createThreeCube( this.dimension.x, this.dimension.y, this.dimension.z, this.color );
        this.scene.add( this.T_Object );

        this.P_Object = this.createPhysicsCube(

            this.dimension.x,
            this.dimension.y,
            this.dimension.z,

            this.position.x,
            this.position.y,
            this.position.z,

            this.rotation.x,
            this.rotation.y,
            this.rotation.z,
            this.rotation.w

        );

    }

    updatePhysics() {

        this.world.step();

        if ( this.P_Object ) {

            const P_Object_position = this.P_Object.translation();
            const P_Object_rotation = this.P_Object.rotation();

            if ( this.T_Object ) {

                this.T_Object.position.set( P_Object_position.x, P_Object_position.y, P_Object_position.z );
                this.T_Object.quaternion.set( P_Object_rotation.x, P_Object_rotation.y, P_Object_rotation.z, P_Object_rotation.w );

            }

        }

    }
}


// Usage

// import Physics from './Physics.js'

// const dimension = { x: 10, y: 0.1, z: 10 };
// const position = { x: 0, y: 0, z: 0 };
// const rotation = { x: 0, y: 0, z: 0, w: 1 };
// const color = 'red';

// const physicsInstance = new Physics(dimension, position, rotation, color, scene);

// physicsInstance.createFinalObject();

// In tick()
// physicsInstance.updatePhysics();
