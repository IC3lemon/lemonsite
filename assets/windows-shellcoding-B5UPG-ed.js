const e=`# Shellcoding (but for windows) [blog under construction]
So much more of a pain than linux shellcoding. Also not frequently documented sadly.
[found this blog](https://idafchev.github.io/exploit/2017/09/26/writing_windows_shellcode.html)

---

![https://learn.microsoft.com/en-gb/archive/blogs/hanybarakat/deeper-into-windows-architecture](image.png)

> - the shellcode must find where in memory the DLL we’re looking for is located. Then the shellcode must find the address of the exported function, that we’re going to use.
> - shellcode to execute \`calc.exe\`. To accomplish this I’ll make use of the \`WinExec\` function, which has only two arguments and is **exported by kernel32.dll**.
<br>
---
<br>

#### [\`TEB\`](https://en.wikipedia.org/wiki/Win32_Thread_Information_Block) - thread environment block
- holds info about current thread
- FS has the address of TEB 
- on of the fields in TEB -> [\`PEB\`](https://en.wikipedia.org/wiki/Process_Environment_Block)
- \`[TEB+0x30] -> PEB\`
- \`[PEB+0x0C] -> PEB_LDR_DATA\` (info about loaded DLLs)
    - \`PEB->InInitializationOrderModuleList\` (holds the DLLs in order of their initialization)
    - \`PEB->InMemoryOrderModuleList\` (holds the DLLs in the order they appear in memory)
        - stored at [PEB_LDR_DATA+0x14]
        -  The base address of the DLL is stored 0x10 bytes below its list entry connection.
        - The DLLs in InMemoryOrderModuleList are **kernelbase.dll**, **ntdll.dll** and **kernel32**.dll. This is valid for all Windows versions
    - \`PEB->Theresathirdoneidkwhatitdoes\`

---
So **to find the address of kernel32.dll** we must traverse several in-memory structures. The steps to do so are:

1. Get address of PEB with \`fs:0x30\`
2. Get address of \`PEB_LDR_DATA (offset 0x0C)\`
3. Get address of the first list entry in the \`InMemoryOrderModuleList (offset 0x14)\`
4. Get address of the second (\`ntdll.dll\`) list entry in the \`InMemoryOrderModuleList (offset 0x00)\`
5. Get address of the third (\`kernel32.dll\`) list entry in the \`InMemoryOrderModuleList (offset 0x00)\`
6. Get the base address of \`kernel32.dll\` (offset 0x10)
ī
\`\`\`sh
mov ebx, fs:0x30	; Get pointer to PEB
mov ebx, [ebx + 0x0C] ; Get pointer to PEB_LDR_DATA
mov ebx, [ebx + 0x14] ; Get pointer to first entry in InMemoryOrderModuleList
mov ebx, [ebx]		; Get pointer to second (ntdll.dll) entry in InMemoryOrderModuleList
mov ebx, [ebx]		; Get pointer to third (kernel32.dll) entry in InMemoryOrderModuleList
mov ebx, [ebx + 0x10] ; Get kernel32.dll base address
\`\`\`
---
at this point, this guy was using WinREPL to evaluate asm in a repl manner. \\
However WinREPL is discontinued and shit, I wasn't able to recompile it. \\
I tried a bunch of alternatives, all outdated, but eventually wrote [\`this script\`](../asm_repl.py) to do the same. \\
then while running it i noticed the PEB offset was wrong that i was grepping \\
then i found this \\
https://malwaretech.com/wiki/locating-modules-via-the-peb-x64

https://j00ru.vexillium.org/syscalls/nt/64/`;export{e as default};
