import { defaultInit, createProgram } from './utils.js'
import { vs, fs } from './shaders.js'
import cube3 from './shapes.js'

// init and add to DOM default canvas then return webgl context
const gl = defaultInit()

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
// create program
const program = createProgram(gl, vs, fs)
// program variables
const positionLocation = gl.getAttribLocation(program, 'position')
const projectionLocation = gl.getUniformLocation(program, 'projection')
const modelViewLocation = gl.getUniformLocation(program, 'modelView')

gl.useProgram(program)

gl.uniformMatrix4fv(projectionLocation, false, [
    0.5,
    0,
    0,
    0,

    0,
    0.5,
    0,
    0,

    0,
    0,
    0.5,
    0,

    0,
    0,
    0,
    1,
])

// create buffer with example verticles
const positionBuffer = gl.createBuffer()

const cube = new Float32Array([-1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0])
const triangle = new Float32Array([0, 0, 0, 0.2, 0.7, 0])

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, cube, gl.STATIC_DRAW)

// draw
//select buffer
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.enableVertexAttribArray(positionLocation)
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
// gl.useProgram(program)
gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
