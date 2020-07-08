const canvas = (width = 800, height = 600) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
}

const webgl = canvas => canvas.getContext('webgl')
const append = (child, parent = document.body) => parent.append(child)

const defaultInit = () => {
    //
    const defaultCanvas = canvas()
    append(defaultCanvas)
    const gl = webgl(defaultCanvas)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    return gl
}

// webgl utils

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

const createProgram = (gl, vertexShaderSource, fragmentShaderSource) => {
    // create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    )

    // create program
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

export { defaultInit, createShader, createProgram, canvas, webgl, append }
