import { defaultInit, createProgram, clear } from './utils.js'
import { vertexShaderSource, fragmentShaderSource } from './shaders.js'
import mat4 from './mat4.js'
import { cube3D } from './shapes.js'
import { loadObjectBuffers, enableObjectBuffers } from './buffers.js'
import { loadTexture } from './textures.js'

let rotation = 0.0

const objs = [
    {
        obj: null,
        transition: null, //[0,0,0]
        scale: null, // [0,0,0]
        rotate: {
            x: null, // [0,0,0],
            y: null, // [0,0,0]
            z: null, // [0,0,0]
        },
    },
]

// init and add to DOM default canvas then return webgl context
const gl = defaultInit()
//default settings
gl.enable(gl.DEPTH_TEST)
gl.depthFunc(gl.LEQUAL)
// gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

const program = createProgram(gl, vertexShaderSource, fragmentShaderSource)

const programInfo = {
    program: program,
    attr: {
        vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(program, 'aVertexColor'),
        texture: gl.getAttribLocation(program, 'aTextureCoord'),
    },
    uni: {
        projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
        sampler: gl.getUniformLocation(program, 'uSampler'),
    },
}

const cube = loadObjectBuffers(gl, cube3D)
const texture = loadTexture(gl, './texture.png')
gl.activeTexture(gl.TEXTURE0)
gl.bindTexture(gl.TEXTURE_2D, texture)
gl.uniform1i(programInfo.uni.sampler, 0)

enableObjectBuffers(gl, programInfo, cube)

const setProjection = () => {
    gl.useProgram(programInfo.program)
    // perspective matrix

    const projectionMatrix = mat4.perspective(
        mat4.create(),
        (45 * Math.PI) / 180,
        gl.canvas.clientWidth / gl.canvas.clientHeight,
        0.1,
        100.0
    )
    // mat4.rotate(projectionMatrix, projectionMatrix, 0.2, [0, 1, 0])

    // prettier-ignore
    gl.uniformMatrix4fv(programInfo.uni.projectionMatrix,false,projectionMatrix)
}
setProjection()

const drawScene = () => {
    clear(gl)
    gl.useProgram(programInfo.program)

    // modelView matrix
    const modelViewMatrix = mat4.create()

    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -10.0])
    // mat4.rotate(modelViewMatrix, modelViewMatrix, rotation, [0, 0, 1])
    // mat4.rotate(modelViewMatrix, modelViewMatrix, rotation, [0, 1, 0])

    //copy reference matrix

    const worldMatrix = [...modelViewMatrix]
    // mat4.scale(modelViewMatrix, modelViewMatrix, [1, 2, 1])
    // console.log(worldMatrix)

    gl.uniformMatrix4fv(programInfo.uni.modelViewMatrix, false, modelViewMatrix)
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
    /////////////////////////////////////////////////////////////////

    mat4.translate(modelViewMatrix, worldMatrix, [4, 0.0, 0.0])
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation * 2, [0, 1, 0])
    gl.uniformMatrix4fv(programInfo.uni.modelViewMatrix, false, modelViewMatrix)
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)

    mat4.translate(modelViewMatrix, worldMatrix, [-4, 0.0, 0.0])
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation * 4, [0, 1, 0])
    gl.uniformMatrix4fv(programInfo.uni.modelViewMatrix, false, modelViewMatrix)
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
}

let prev = 0
const animate = timestamp => {
    timestamp *= 0.001
    const dt = timestamp - prev
    prev = timestamp

    rotation += dt

    // drawScene(gl, programInfo, initBuffers(gl))
    drawScene()
    // console.log(`timestamp: ${timestamp * 0.001}\ndt: ${dt}\nprev: ${prev}`)
    requestAnimationFrame(animate)
}
requestAnimationFrame(animate)
