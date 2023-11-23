# Contributing to EchoUtils

The following is a set of guidelines for contributing to EchoUtils.
If a topic is not covered in this document, please follow the established practice in whatever file or project you’re working on.

## Table of content

- [Contributing to EchoUtils](#contributing-to-echoutils)
  - [Table of content](#table-of-content)
  - [Issues](#issues)
  - [Reporting issues](#reporting-issues)
    - [Where to report](#where-to-report)
    - [Writing a good bug report](#writing-a-good-bug-report)
    - [Suggested workflow](#suggested-workflow)
    - [Contributing changes](#contributing-changes)
  - [Code conventions](#code-conventions)
  - [Development scripts](#development-scripts)
  - [Testing](#testing)
  - [License](#license)

## Issues

We use GitHub issues to track public bugs. Please ensure your description is clear and has sufficient instructions to be able to reproduce the issue.

## Reporting issues

We always welcome bug reports and overall feedback. Here are a few
tips on how you can make reporting your issue as effective as possible.

### Where to report

New issues can be reported in our [list of issues](https://github.com/equinor/echoutils/issues).

Before filing a new issue, please search the list of issues to make sure it does
not already exist.

If you do find an existing issue for what you wanted to report, please include
your own feedback in the discussion.

### Writing a good bug report

Good bug reports make it easier for maintainers to verify and root cause the
underlying problem.
The better a bug report, the faster the problem will be resolved. Ideally, a bug
report should contain the following information:

-   A high-level description of the problem.
-   A _minimal reproduction_, i.e. the smallest size of code/configuration required
    to reproduce the wrong behavior.
-   A description of the _expected behavior_, contrasted with the _actual behavior_ observed.

### Suggested workflow

We use and recommend the following workflow:

1. Create an issue for your work.
    - You can skip this step for trivial changes.
    - Get agreement from the team that your proposed change is a good one.
    - Clearly state that you are going to take on implementing it, if that's the case.
2. Create a personal fork of the repository on GitHub (if you don't already have one).
3. In your fork, create a branch off of main (`git checkout -b mybranch`).
    - Name the branch so that it clearly communicates your intentions, such as
      "issue-123" or "githubhandle-issue".
4. Make and commit your changes to your branch.
5. Add new tests corresponding to your change, if applicable.
6. Run the relevant scripts in [the section below](https://github.com/microsoft/chat-copilot/blob/main/CONTRIBUTING.md#dev-scripts) to ensure that your build is clean and all tests are passing.
7. Create a PR against the repository's **main** branch.
    - State in the description what issue or improvement your change is addressing.
8. Wait for feedback or approval of your changes from the code maintainers.
9. When area owners have signed off, and all checks are green, your PR will be merged.

### Contributing changes

Project maintainers will merge accepted code changes from contributors.

## Code conventions

Follow the coding rules stated here: [Coding rules](https://github.com/equinor/EchopediaWeb#coding-rules)

## Development scripts

See [Development](https://github.com/equinor/EchoUtils#development) for how to run the project.

## Testing

Run `npm run test` for unit testing.

Do not use real data in test mocks! Always use made up values.

## License

By contributing to examples, you agree that your contributions will be licensed under the LICENSE file in the root directory of this source tree.
