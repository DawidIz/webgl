import { canvas, webgl, append } from './utils.js'
import { vertex, fragment } from './shaders.js'

const display = canvas()
append(display)
const gl = webgl(display)
console.log(gl)

gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

const vShader = gl.createShader(gl.VERTEX_SHADER)
const fShader = gl.createShader(gl.FRAGMENT_SHADER)

gl.shaderSource(vShader, vertex)
gl.compileShader(vShader)
gl.shaderSource(fShader, fragment)
gl.compileShader(fShader)

const program = gl.createProgram()
gl.attachShader(program, vShader)
gl.attachShader(program, fShader)
gl.linkProgram(program)
gl.useProgram(program)
