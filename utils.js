const isEven = value => (value & 1) == 0
const isPowerOf2 = value => (value & (value - 1)) == 0

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
        throw new Error(`Can not create shader: ${source}`)
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

const clear = gl => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clearDepth(1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

const parseShader = vertexShaderSource => {
    const attributes = []
    const uniforms = []

    const add = line => {
        const words = line.split(' ')
        const type = words[0]
        const name = words[words.length - 1]

        if (type === 'attribute') attributes.push(name)
        else if (type === 'uniform') uniforms.push(name)
    }

    const lines = vertexShaderSource
        .trim()
        .replace(/\n/g, '')
        .split('void main')[0]
        .split(';')

    lines.forEach(line => add(line))

    return {
        attributes,
        uniforms,
    }
}

// combine createProgram with parsing vertex shader
// @return {program : createProgram, attr : shader attributes, uni : shader uniforms}
const genProgram = (gl, vertexShaderSource, fragmentShaderSource) => {
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource)
    const vars = parseShader(vertexShaderSource)
    const attr = {}
    const uni = {}
    //gl.getAttribLocation(program, 'aVertexPosition')
    vars.attributes.forEach(
        item => (attr[item] = gl.getAttribLocation(program, item))
    )
    vars.uniforms.forEach(
        item => (uni[item] = gl.getUniformLocation(program, item))
    )

    return { program, attr, uni }
}

export {
    isEven,
    isPowerOf2,
    clear,
    defaultInit,
    createShader,
    createProgram,
    canvas,
    webgl,
    append,
    genProgram,
}
