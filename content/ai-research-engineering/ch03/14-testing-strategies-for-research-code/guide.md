# Testing Strategies for Research Code

Lesson 13 established that research code can carry debt production code can't. That doesn't mean research code should have zero tests — it means the *kind* of testing that pays off is different. The goal isn't to prove the model is accurate; it's to catch the class of bug that wastes a day of compute before anyone notices the run was broken from the start. This lesson covers what's actually worth testing with pytest, and what isn't.

## What you'll learn

- The four kinds of tests that catch real, expensive bugs in ML code
- How to write a data-shape/dtype test, a forward-pass smoke test, an overfit-a-batch test, and a determinism test
- Why "the model got 94% accuracy" is not something you unit test
- How to run a fast test suite with pytest so tests don't become a tax on iteration speed

## What's worth testing

The bugs worth catching with tests are the ones that are silent, expensive, and easy to introduce by accident: a reshape that transposes two axes, a label that gets shifted by one, a loss function that's accidentally always zero, a data loader that changes behavior between runs. None of these show up as a crash — they show up as a model that trains to a slightly-wrong number, and you find out after burning a day of GPU time. Four tests catch the overwhelming majority of these:

### 1. Data pipeline shape and dtype checks

```python
def test_batch_shape_and_dtype():
    loader = get_dataloader(batch_size=8, split="train")
    images, labels = next(iter(loader))
    assert images.shape == (8, 3, 224, 224)
    assert images.dtype == torch.float32
    assert labels.shape == (8,)
    assert labels.dtype == torch.int64
    assert labels.min() >= 0 and labels.max() < NUM_CLASSES
```

This catches silent reshape bugs, an accidental channel-order swap, or a label off-by-one, before they corrupt a real run.

### 2. Forward-pass smoke test

```python
def test_model_forward_pass_runs():
    model = build_model(cfg_for_test())
    x = torch.randn(2, 3, 224, 224)
    out = model(x)
    assert out.shape == (2, NUM_CLASSES)
    assert torch.isfinite(out).all()
```

This just confirms the model builds and runs end to end on a tiny input, with no NaNs — a cheap check that catches a huge fraction of "the run crashed after an hour" bugs instantly, in under a second.

### 3. Loss-decreases-on-overfit-a-batch test

```python
def test_loss_decreases_when_overfitting_one_batch():
    torch.manual_seed(0)
    model = build_model(cfg_for_test())
    optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
    x, y = get_one_fixed_batch()

    losses = []
    for _ in range(50):
        optimizer.zero_grad()
        loss = criterion(model(x), y)
        loss.backward()
        optimizer.step()
        losses.append(loss.item())

    assert losses[-1] < losses[0] * 0.1
```

This is the single highest-value test in ML code. If a model can't drive the loss down on one fixed batch it's allowed to memorize, something fundamental is broken — gradients aren't flowing, the loss function is wired to the wrong tensor, or the optimizer isn't touching the right parameters. It catches bugs that would otherwise only show up as "training is oddly slow to converge" days into a real run.

### 4. Deterministic-with-fixed-seed test

```python
def test_same_seed_gives_same_result():
    torch.manual_seed(0)
    out1 = build_model(cfg_for_test())(torch.randn(2, 3, 224, 224))
    torch.manual_seed(0)
    out2 = build_model(cfg_for_test())(torch.randn(2, 3, 224, 224))
    assert torch.allclose(out1, out2)
```

This guards an assumption the whole experiment-tracking workflow depends on: that re-running with the same seed reproduces the same result. If this test fails, something — uninitialized state, a nondeterministic op, a global RNG leak — will make every "reproduce run #214" request impossible to honor.

## What's NOT worth unit testing

- **The model's actual accuracy number.** "Assert accuracy > 90%" is not a unit test — it's a flaky, slow, expensive integration check that will fail for reasons that have nothing to do with a bug (different hardware, a slightly different data split, natural run-to-run variance). Track accuracy with experiment-tracking tools (Chapter 4), not `assert`.
- **Whether a specific architectural idea works.** That's the experiment itself, not a test of the code.
- **Exploratory notebook cells or one-off scripts.** As covered in Lesson 11, code that gets used once doesn't earn the cost of a test.

## Running the suite without taxing iteration speed

```bash
pytest tests/ -q                 # run everything, quiet output
pytest tests/ -k "shape or smoke"  # run just the fast ones
pytest tests/test_training.py -v   # one file, verbose
```

Keep the four tests above fast (seconds, not minutes) by using tiny models and tiny fake batches — a `cfg_for_test()` with a 2-layer model and a batch size of 2 catches the same bugs as the real config, far faster. A test suite that takes thirty seconds gets run before every push; one that takes twenty minutes gets skipped.

## Key terms

- **Smoke test** — a minimal test that only confirms code runs end to end without crashing, not that its output is correct
- **Overfit-a-batch test** — training on one fixed batch for many steps and asserting the loss drops sharply; the highest-value correctness check in ML code
- **Determinism test** — asserting that re-running with the same seed produces the same output, a precondition for reproducible experiment tracking
- **`pytest -k`** — runs only tests whose name matches the given expression, used to run a fast subset during iteration
