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

// VS : attributes uniforms textures
// FS : uniforms textures varyings
