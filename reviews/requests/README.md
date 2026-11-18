# Review requests

The GM adds one markdown file here per proposed change to decision rights, process gates, or the improvement loop.
Each file states the change, the evidence, the expected effect, and the revert condition.
A GitHub Action sends it to a second model and writes the verdict to the `ops-data` branch under `reviews/verdicts/`.
