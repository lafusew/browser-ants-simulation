<p align="center">
  <a href="">
    <img src="https://raw.githubusercontent.com/lafusew/browser-ants-simulation/main/src/img/md_header.png" alt="Ants Simulation" width="90%"/>
  </a>
</p>

# Trying to simulate Ants

Ants colony basic behavior simulation written in Typescript and using Canvas 2D as renderer.
Inspired by __Sebastian Lague__ and __Pezza__ work.

## What are we simulating?

For now, not much... But the goal is to model a simple pheromone-based Colony behavior.
Ants aren't organized like humans are. Similarly to **boids** each ant follows a set of rules. Putting all those single behavior together results in an organized-looking behavior as a whole.

## How does ants move 

Check Pezzza's Work explanation [here](https://www.youtube.com/watch?v=81GQNPJip2Y&t=116s).  Implemented rules should be the same in my simulation.

## Optimization

Pre generating random numbers at start and picking them at run time. 
Other than that for now nothing has been done to try to optimize simulation. At some point we might want to delegate some processing to an other thread using a web-worker. Or even write movement logic in a Web Assembly module. 
