const e=`# Graphics programming notes

literally me just reading and learning [\`from here\`](https://learnopengl.com/book/book_pdf.pdf) [\`and here\`](https://tfetimes.com/wp-content/uploads/2015/04/F.Dunn-I.Parberry-3D-Math-Primer-for-Graphics-and-Game-Development.pdf) \\
also a fucking amazing video https://youtu.be/qjWkNZ0SXfo?si=m5EVxOgfkrUruY_C 

<br>

***

<br>

The process of transforming 3D coordinates to 2D pixels \\
is managed by the graphics pipeline of OpenGL. \\
The graphics pipeline can be divided into two large parts: 

- the first transforms your 3D coordinates into 2D coordinates
- the second part transforms the 2D coordinates into actual colored pixels.

<br>

stages of the graphics pipeline \\
![alt text](shader.png)

<br>
***
<br>

## \`vertex buffer object (VBO)\`

Vertex data is sent it as input to step 1: the vertex shader. \\
To do that, create memory on the GPU where we store the vertex data. \\
We manage this memory via so called **\`vertex buffer objects (VBO)\`**
<br><br>
like any object in OpenGL, buffers have a unique ID corresponding to it \\
and this is how you make and write to buffers : 

\`\`\`cpp
unsigned int VBO;
glGenBuffers(1, &VBO);
glBindBuffer(GL_ARRAY_BUFFER, VBO);
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW)
\`\`\`

***From this point on any buffer calls we make (on the \`GL_ARRAY_BUFFER\` target) will be used to configure the currently bound buffer, which is \`VBO\`***

> - \`glGenBuffers\` : what ID to give the object and what var its bound to
> - \`glBindBuffers\` : the type of a vertex buffer is \`GL_ARRAY_BUFFER\`, VBO is bound to that
> - \`glBufferData\` : function to write vertex data to \`GL_ARRAY_BUFFER\` target i.e. VBO

the fourth param in \`glBufferData\` -> tells graphic card how to manage the data
- \`GL_STREAM_DRAW\` : the data is set only once and used by the GPU a few times.
- \`GL_STATIC_DRAW\` : the data is set only once and used many times.
- \`GL_DYNAMIC_DRAW\` : the data is changed a lot and used many times.

<br>
***
<br>

## \`vertex shader\`

very basic vertex shader code \`vertex.glsl\`

\`\`\`glsl
#version 300 es
layout (location = 0) in vec3 aPos;
void main()
{
    gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);
}
\`\`\`

to be used in main.cpp, we need a shader object, referenced by an ID. \\
and its created like this, using \`glCreateShader\`

\`\`\`cpp
unsigned int vertexShader; // object
vertexShader = glCreateShader(GL_VERTEX_SHADER);
\`\`\`

Now attach the shader source code to the shader object and compile the shader

\`\`\`cpp
glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);
glCompileShader(vertexShader);
\`\`\``;export{e as default};
