const canvas = (width = 800, height = 600) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
}

const webgl = canvas => canvas.getContext('webgl')
const append = (child, parent = document.body) => parent.append(child)

export { canvas, webgl, append }
