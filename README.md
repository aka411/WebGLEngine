# WebGL2 3D Game Engine built from scratch
This is a custom 3D game engine that i having been writing in pure JavaScript without using any libraries.It uses WebGL2 as the rendering API.

Entity–component–system (ECS) architectural design pattern is used in designing the game engine.
It also features a custom written physics engine for handling object collision and response.Below you can see a demo scene from the engine.
![Demo Gif](https://github.com/aka411/WebGLEngine/blob/main/demo.gif)
The camera rotation is done using quaternions. 

## Current Features
- A geometry generator for generating sphere and plane geometries.
- A collision engine for detecting sphere-sphere and sphere-plane collisions.
- A perspective and orthographic camera that can be rotated using mouse and moved by using arrow keys of the keyboard.
- Point light support.
- A custom math library for matrix ,quaternions and vector data structures and operations.
  

## To Do
- Adding frutsum culling for better rendering performance.
- Adding spatial partitioning to optimize collision detection.
- Adding Shadows.
- Sorting object render calls to reduce state change
- Implementing a better scene graph for adding more complex objects.


## To run it
- Just clone the project folder to your PC.
- Then open the index file.
  
