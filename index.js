import { defaultInit, createProgram } from './utils.js'
import { vs, fs } from './shaders.js'
import { cube2d, cube3d } from './shapes.js'
import matrix from './matrix.js'

// init and add to DOM default canvas then return webgl context
const gl = defaultInit()

// gl.enable(gl.DEPTH_TEST)
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
// create program
const program = createProgram(gl, vs, fs)
// program variables
const positionLocation = gl.getAttribLocation(program, 'position')
const projectionLocation = gl.getUniformLocation(program, 'projection')
const modelViewLocation = gl.getUniformLocation(program, 'modelView')

gl.useProgram(program)

let mat = matrix.ortho(gl.canvas.width, gl.canvas.height, -1, 1)
// let mat = matrix.identity()
// mat = matrix.translate(mat, 0.5, 0.5, 0.5)
// mat = matrix.rotate(mat, 20)
mat = matrix.scale(mat, 200, 200)

gl.uniformMatrix4fv(projectionLocation, false, mat)

// create buffer with example verticles
const positionBuffer = gl.createBuffer()

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(gl.ARRAY_BUFFER, cube3d, gl.STATIC_DRAW)

// draw
//select buffer
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.enableVertexAttribArray(positionLocation)
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
// gl.useProgram(program)
gl.drawArrays(gl.LINES, 0, 36)
