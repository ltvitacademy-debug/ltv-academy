# Classical Control Electronics for Qubits

Every "quantum computer" you've read about is secretly a hybrid machine: a wall of ordinary classical electronics doing almost all of the physical work of generating, routing, and reading the signals that a much smaller number of qubits actually respond to. This lesson opens up that classical half of the stack.

## What you'll learn

- Why a quantum processor is really a classical control system wrapped around a small quantum core
- What room-temperature control hardware (AWGs, microwave/RF chains, DACs/ADCs, FPGAs) actually does
- How control signals get from room temperature down to a chip near absolute zero, and what sits in that path
- Why the control electronics themselves — not just the qubits — are a real scaling bottleneck
- The difference between a qubit-count number and a usable-system number

## Behind every qubit, a rack of classical hardware

A qubit doesn't respond to software commands directly. To rotate a superconducting qubit's state, a room-temperature system has to generate a precisely shaped microwave pulse — specific amplitude, phase, frequency, and timing — and deliver it to that exact qubit without disturbing its neighbors. To read a qubit out, a different piece of hardware has to send a probe signal in and capture a very faint returning signal, amplify it without burying it in noise, and digitize it fast enough to make a decision in real time. None of this is quantum; all of it is decades-old classical electronics, just operated at extreme precision.

## The room-temperature control stack

The core components, present in some form across most qubit hardware platforms:

- **Arbitrary waveform generators (AWGs)** synthesize the baseband pulse shapes (amplitude and phase envelopes over time) that will drive each qubit operation.
- **Microwave/RF signal generation and upconversion** mixes those baseband shapes up to the qubit's actual operating frequency (typically several GHz for superconducting qubits), since the AWG alone usually can't generate that frequency directly.
- **DACs and ADCs** convert between the digital waveform data a computer works with and the analog voltages the microwave hardware needs, in both the outgoing (control) and incoming (readout) directions.
- **FPGAs** sit in the loop to make real-time decisions — for example, reading out a qubit mid-circuit and deciding, within microseconds, which pulse to apply next (a requirement for mid-circuit measurement and feedback, and for quantum error correction).

A single multi-qubit chip can require one or more of each of these per qubit, or per small group of qubits, depending on the architecture.

## The path from room temperature to the cold chip

Superconducting and some other qubit types live inside a dilution refrigerator (a cryostat), at temperatures around 10-20 millikelvin — colder than deep space. The control signal has to travel from room-temperature electronics, down through the cryostat's temperature stages, to the chip, and the readout signal has to make the return trip. Along the way:

- **Attenuators** at each cryostat stage reduce the control signal's power (and, importantly, reduce the thermal noise riding along the same wire) so the qubit sees a clean, correctly-sized pulse rather than a noisy, saturating one.
- **Filters** strip out unwanted frequency components that could otherwise heat or disturb the qubit.
- **Amplifiers** on the readout path — often a HEMT (high-electron-mobility transistor) amplifier at an intermediate cold stage, sometimes paired with a near-quantum-noise-limited parametric amplifier even closer to the chip — boost the extremely weak signal coming back from the qubit before it's lost in the noise floor by the time it reaches room temperature.

This wiring has to be built, tuned, and characterized individually for every signal line into the fridge.

## Why this is a real scaling bottleneck, not a solved problem

It's tempting to assume that scaling a quantum computer is purely a qubit-physics problem. In practice, the classical control stack scales with the number of qubits too, and not always gracefully:

- **Wiring density.** Every qubit, in many current architectures, needs its own dedicated control and readout lines running into the cryostat. A cryostat has finite physical space and a finite number of feedthrough ports, so wiring density is a hard constraint on how many qubits a given fridge can support, independent of qubit quality.
- **Heat load per wire.** Each physical wire running from room temperature down to the coldest stage carries some amount of heat with it, and the refrigerator has a limited cooling capacity at its coldest stage. More wires means more heat load, which competes directly with keeping the chip cold enough to function. This is a real, actively worked engineering constraint — not a minor detail — and it's one of the reasons hardware vendors are investing heavily in approaches like cryogenic control electronics (moving some of the classical electronics itself into the cold stages) and multiplexed readout (sharing one signal chain across many qubits).

Treat "how many qubits does this chip have" as a different, narrower question from "how many qubits can this control system actually drive and read out reliably" — the second number is frequently the harder one to grow.

## Key terms

| Term | Meaning |
|---|---|
| AWG (arbitrary waveform generator) | Room-temperature instrument that synthesizes the baseband pulse shapes used to control qubits |
| Upconversion | Mixing a baseband signal up to the qubit's microwave operating frequency |
| Cryostat / dilution refrigerator | The system that cools the qubit chip down to roughly 10-20 millikelvin |
| HEMT amplifier | A cryogenic amplifier used on the readout chain to boost a qubit's faint return signal |
| Parametric amplifier | A near-quantum-noise-limited amplifier placed close to the chip to improve readout signal quality |
| Wiring density / heat load | Physical constraints — number of feedthrough wires and the heat they carry — that limit how many qubits a given control system can support |

## Check yourself

A vendor announces a 1,000-qubit chip. Why would an engineer evaluating that announcement ask specifically about the control electronics and cryostat wiring, rather than assuming qubit count alone tells them whether the system is usable at that scale?
