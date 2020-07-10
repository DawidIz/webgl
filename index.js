import { genProgram, defaultInit, createProgram, clear } from './utils.js'
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

const program2 = genProgram(gl, vertexShaderSource, fragmentShaderSource)

const program = createProgram(gl, vertexShaderSource, fragmentShaderSource)
const programInfo = {
    program: program,
    attr: {
        vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(program, 'aVertexColor'),
        texture: gl.getAttribLocation(program, 'aTextureCoord'),
        normal: gl.getAttribLocation(program, 'aVertexNormal'),
    },
    uni: {
        projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
        sampler: gl.getUniformLocation(program, 'uSampler'),
        normalMatrix: gl.getUniformLocation(program, 'uNormalMatrix'),
    },
}

// program2.attr.aVer

console.log(program2.attr.aVertexColor)
console.log(programInfo)

gl.useProgram(programInfo.program)

const cube = loadObjectBuffers(gl, cube3D)
const texture = loadTexture(gl, './lena.png')
gl.activeTexture(gl.TEXTURE0)
gl.bindTexture(gl.TEXTURE_2D, texture)
gl.uniform1i(programInfo.uni.sampler, 0)

enableObjectBuffers(gl, programInfo, cube)

const setProjection = () => {
    // perspective matrix

    const projectionMatrix = mat4.perspective(
        mat4.create(),
        (45 * Math.PI) / 180,
        gl.canvas.clientWidth / gl.canvas.clientHeight,
        0.1,
        100.0
    )
    // mat4.rotate(projectionMatrix, projectionMatrix, 0.2, [0, 0, 0])

    // prettier-ignore
    gl.uniformMatrix4fv(programInfo.uni.projectionMatrix,false,projectionMatrix)
}
setProjection()

const setNormals = matrix => {
    //matrix modelViewMatrix
    const normalMatrix = mat4.create()
    mat4.invert(normalMatrix, matrix)
    mat4.transpose(normalMatrix, normalMatrix)

    gl.uniformMatrix4fv(programInfo.uni.normalMatrix, false, normalMatrix)
}

const drawScene = () => {
    clear(gl)

    // modelView matrix
    let modelViewMatrix = mat4.create()

    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -10.0])
    // mat4.rotate(modelViewMatrix, modelViewMatrix, rotation, [1, 0, 0])
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation, [1, 1, 1])
    //copy reference matrix

    let worldMatrix = [...modelViewMatrix]
    // mat4.scale(modelViewMatrix, modelViewMatrix, [1, 2, 1])
    // console.log(worldMatrix)

    setNormals(modelViewMatrix)
    gl.uniformMatrix4fv(programInfo.uni.modelViewMatrix, false, modelViewMatrix)
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)
    /////////////////////////////////////////////////////////////////
    worldMatrix = modelViewMatrix = mat4.create()
    mat4.translate(modelViewMatrix, worldMatrix, [4, 0.0, -10.0])
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation * 2, [1, -1, 0])

    setNormals(modelViewMatrix)

    gl.uniformMatrix4fv(programInfo.uni.modelViewMatrix, false, modelViewMatrix)
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0)

    /////////////////////////////////////////////////////////////////
    worldMatrix = modelViewMatrix = mat4.create()
    mat4.translate(modelViewMatrix, worldMatrix, [-4, 0.0, -10.0])
    mat4.rotate(modelViewMatrix, modelViewMatrix, rotation * 4, [1, 1, 0])

    setNormals(modelViewMatrix)
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
