import { defaultInit, createProgram } from './utils.js'
import { vertexShaderSource, fragmentShaderSource } from './shaders.js'

import mat4 from './mat4.js'
// init and add to DOM default canvas then return webgl context
const gl = defaultInit()

// gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

const program = createProgram(gl, vertexShaderSource, fragmentShaderSource)

const programInfo = {
    program: program,
    attr: {
        vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(program, 'aVertexColor'),
    },
    uni: {
        projectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(program, 'uModelViewMatrix'),
    },
}

const initBuffers = gl => {
    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0]
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    /////////////////////////////////////////////////////////////////////////////////
    // prettier-ignore
    const colors = [1.0,1.0,1.0,1.0, 1.0,0.0,0.0,1.0, 0.0,1.0,0.0,1.0, 0.0,0.0,1.0,1.0]
    const colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
    return { position: positionBuffer, color: colorBuffer }
}

const drawScene = (gl, programInfo, buffers) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clearDepth(1.0)

    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)

    // perspective matrix
    const fieldOfView = (45 * Math.PI) / 180
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
    const zNear = 0.1
    const zFar = 100.0
    // create identity mat 4x4
    const projectionMatrix = mat4.create()
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

    // modelView matrix
    const modelViewMatrix = mat4.create()
    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -6.0])

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
    gl.vertexAttribPointer(
        programInfo.attr.vertexPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0
    )
    gl.enableVertexAttribArray(programInfo.attr.vertexPosition)

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color)
    gl.vertexAttribPointer(
        programInfo.attr.vertexColor,
        4,
        gl.FLOAT,
        false,
        0,
        0
    )
    gl.enableVertexAttribArray(programInfo.attr.vertexColor)

    gl.useProgram(programInfo.program)

    gl.uniformMatrix4fv(
        programInfo.uni.projectionMatrix,
        false,
        projectionMatrix
    )
    gl.uniformMatrix4fv(programInfo.uni.modelViewMatrix, false, modelViewMatrix)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

drawScene(gl, programInfo, initBuffers(gl))
