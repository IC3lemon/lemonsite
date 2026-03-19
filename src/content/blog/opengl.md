# OpenGL
Learning and hating how to draw the same goddamn triangle.
## The Pipeline
Every OpenGL tutorial starts the same way: "Let's draw a triangle!" And then you spend 200 lines of boilerplate just to get three colored vertices on screen.
```cpp
float vertices[] = {
    -0.5f, -0.5f, 0.0f,  // bottom left
     0.5f, -0.5f, 0.0f,  // bottom right
     0.0f,  0.5f, 0.0f   // top
};
unsigned int VBO, VAO;
glGenVertexArrays(1, &VAO);
glGenBuffers(1, &VBO);
glBindVertexArray(VAO);
glBindBuffer(GL_ARRAY_BUFFER, VBO);
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);
glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);
```
## Shaders
The vertex shader:
```glsl
#version 330 core
layout (location = 0) in vec3 aPos;
void main() {
    gl_Position = vec4(aPos, 1.0);
}
```
The fragment shader:
```glsl
#version 330 core
out vec4 FragColor;
void main() {
    FragColor = vec4(1.0, 0.5, 0.2, 1.0);
}
```
