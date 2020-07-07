import { canvas, webgl, append } from './utils.js'
import { vertexShaderSource, fragmentShaderSource } from './shaders.js'

const display = canvas()
append(display)
const gl = webgl(display)

gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const createShader = (gl, type, source) => {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
    else {
        gl.deleteShader(shader)
        throw new Error('Can not create shader')
    }
}

const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program
    else {
        gl.deleteProgram(program)
        throw new Error('Can not create program')
    }
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
)
const program = createProgram(gl, vertexShader, fragmentShader)

// gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
gl.useProgram(program)
///////////////////////////////////////////////////////////////

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
const positionBuffer = gl.createBuffer()

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, 0, 0, 0.5, 0.7, 0]),
    gl.STATIC_DRAW
)

gl.enableVertexAttribArray(positionAttributeLocation)
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

gl.drawArrays(gl.TRIANGLES, 0, 3)

// program = combiantion of two compiled shaders
// getAttribLocation(program,name) (WebGLProgram,string) return location of an attribute variable
// createBuffer() create buffer storing data (vertices or colors)
// bindBuffer(target,buffer)
// -- target(gl.ARRAY_BUFFER [vertex coordinates,texture coordinate data,vertex color data] | gl.ELEMENT_ARRAY_BUFFER [element indices])
// bufferData(target,size | [ArrayBuffer,SharedArrayBuffer,ArrayBufferView],usage [gl.STATIC_DRAW,gl.DYNAMIC_DRAW,gl.STREAM_DRAW])
// [POINTS,LINE_STRIP,LINE_LOOP,LINES,TRIANGLE_STRIP,TRIANGLE_FAN,TRIANGLES]

// glsl
// vertex shader
// attributes flaot vec2 vec3 vec4 mat2 mat3 mat4 ex. attribute vec3 aPosition
// uniforms
//textures
//gl_Position = ...

//fragment shader
// gl_FragColor = ...
// precision mediump float
