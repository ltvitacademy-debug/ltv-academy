# CUDA Toolkit & Driver Versions

This closes out the CUDA programming chapter with the version-compatibility question that trips up almost everyone the first time: "CUDA Version: 12.4" shows up in `nvidia-smi`, `nvcc --version` reports something else, and `torch.version.cuda` reports a third number. None of that is a bug — this lesson explains what each number actually means.

## What you'll learn

- The difference between the NVIDIA driver, the CUDA Toolkit, and the CUDA runtime PyTorch ships with
- Why `nvidia-smi`'s "CUDA Version" is a ceiling, not an installed version
- How to check all three version numbers on a real machine
- What happens when they don't match, and why it's usually fine anyway

## Three different things, three different version numbers

- **NVIDIA driver** — the kernel-level software that lets the OS talk to the GPU at all. Installed system-wide, one version per machine.
- **CUDA Toolkit** — the full development kit: `nvcc` (the compiler), headers, libraries (cuBLAS, cuDNN, etc.), and profiling tools (Nsight). You can have multiple toolkit versions installed side by side.
- **CUDA runtime (bundled with PyTorch)** — modern PyTorch wheels ship their own copy of the CUDA runtime libraries, meaning you often don't need the full Toolkit installed at all just to run PyTorch on a GPU.

## Why nvidia-smi's "CUDA Version" is misleading

```
$ nvidia-smi
+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 550.90.07              Driver Version: 550.90.07      CUDA Version: 12.4     |
+-----------------------------------------------------------------------------------------+
```

The "CUDA Version" field here is **the maximum CUDA version this driver supports**, not the version of anything actually installed. A driver reporting CUDA 12.4 can run software built against CUDA 12.0, 11.8, or earlier — compatibility runs backward, not just at an exact match.

## Checking the toolkit and the PyTorch-bundled runtime separately

```
$ nvcc --version
Cuda compilation tools, release 12.1, V12.1.105

$ python -c "import torch; print(torch.version.cuda)"
12.1

$ python -c "import torch; print(torch.cuda.is_available())"
True
```

`nvcc --version` reports the installed Toolkit's version (if one is installed at all — it's entirely possible for this command to not exist on a machine that runs PyTorch GPU workloads fine). `torch.version.cuda` reports the CUDA runtime version that specific PyTorch build was compiled against, which is independent of whatever Toolkit version (if any) is installed on the system.

## Why mismatches are usually fine

As long as the driver's maximum supported CUDA version (from `nvidia-smi`) is equal to or higher than the version PyTorch was built against, everything works — PyTorch's bundled runtime doesn't need to match the system Toolkit at all. Problems only arise when the driver is older than what PyTorch requires (`torch.cuda.is_available()` returning `False`, or a kernel launch failing with a version-mismatch error), which is fixed by updating the driver, not by chasing an exact version match everywhere.

## Key terms

- **NVIDIA driver** — system-wide kernel software enabling OS/GPU communication; sets the maximum supported CUDA version
- **CUDA Toolkit** — the full development kit including `nvcc`, libraries, and profiling tools
- **CUDA runtime** — the subset of CUDA libraries an application actually needs at run time, often bundled directly with PyTorch
- **`torch.version.cuda`** — the CUDA version a specific PyTorch build was compiled against
- **Backward compatibility** — a newer driver can run software built against an older CUDA version, but not vice versa
