<script lang="ts">
    import {Universe} from "./core/universe"
    import {Body} from "./core/body";
    import {Vector} from "./core/geometry/vector";
    import {onMount} from "svelte";
    
    let universe = new Universe<2>([
        new Body<2>(0, new Vector<2>(300, 250), new Vector<2>(22.36, 0)),
        new Body<2>(25000, new Vector<2>(300, 300), new Vector<2>(0, 0)),
    ])
    
    let main_canvas: HTMLCanvasElement
    
    function draw() {
        let context = main_canvas.getContext("2d")
        
        if (context == null) {
            return
        }
        
        // Set canvas resolution to match its CSS size
        main_canvas.width = main_canvas.offsetWidth
        main_canvas.height = main_canvas.offsetHeight
        
        context.clearRect(0, 0, main_canvas.width, main_canvas.height)
        
        for (const body of universe.bodies) {
            context.beginPath()
            context.arc(body.position.x(), body.position.y(), 30, 0, 2 * Math.PI)
            context.stroke()
        }
    }
    
    onMount(() => draw())
    
    let fps = 60
    let previousTime = 0
    
    function loop(currentTime: number) {
        let timePassed = currentTime - previousTime
        if (timePassed <= 1000 / fps) {
            requestAnimationFrame(loop)
            return
        }
        previousTime = currentTime
        
        let simsteps = 150
        for(let i = 0; i < simsteps; i++) {
            universe.update(1 / (simsteps * fps))
        }
        
        draw()
        requestAnimationFrame(loop)
    }
    
    loop(0)
</script>

<main class="p-5">
    <h1 class="text-center text-3xl mb-5">Simulation below!!</h1>
    
    <button on:click={draw}>Draw!</button>

    <canvas bind:this={main_canvas} id="canvas" class="w-full h-screen border border-1 border-black rounded">
        Your browser doesn't support canvas.
    </canvas>
</main>
