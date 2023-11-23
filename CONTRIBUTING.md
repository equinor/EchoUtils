# Contributing to EchoUtils

The following is a set of guidelines for contributing to EchoUtils.
If a topic is not covered in this document, please follow the established practice in whatever file or project you’re working on.

## Table of content

- [Contributing to EchoUtils](#contributing-to-echoutils)
  - [Table of content](#table-of-content)
  - [Code conventions](#code-conventions)
  - [Pull Request Process](#pull-request-process)
    - [Names](#names)
    - [null and undefined](#null-and-undefined)
    - [General Assumptions](#general-assumptions)
    - [Classes](#classes)
    - [General Constructs](#general-constructs)
  - [Testing](#testing)

## Code conventions

Strive for **clean code** (and what to look for in code reviews/PRs)

**Interfaces / types**

-   Write code in a way that the compiler finds the BUGS! **Avoid ANY**.
-   Define variables as optional/nullable in interfaces where needed, or better:
    -   Parse the data from the api, strip away un-needed data, and cleanup types.
    -   Instead of null/undefined, use: StringOrEmpty, empty array instead of null, etc.
    -   ToDate for date types.
-   Prefer **immutable / readonly** objects/interfaces (prevents us from accidentally changing data)

**Architectural**

-   Use **PURE** functions to avoid hidden side effects. It also makes it a lot easier to add unit tests.
-   Single Responsibility - A function/class should only do one thing. Split into sub functions.
-   One level of abstraction per function.
-   Use as few arguments as possible per function.
-   Try to split UI and logic in different files. Ideally the UI shouldn't contain any logic. Logic also wants to get unit tested.
-   Avoid importing from other modules, eg. TurnAround is not allowed to import from Ayelix. Move common code to Utils, Components, or Framework.

**Style**

-   **Avoid if/else and loops**: Favor functional programming over imperative programming: Use map, filter, find.
-   Use undefined instead of null.

**Naming**

-   Use well defined function/variable names. (A well defined name is much better than comments, which often quickly get outdated/obsolete)
-   Function names should tell what a function does. Bad: onClick()/handleOnClick() **Good: openTag()**
-   Avoid negative names. **Good: IsActive, IsEnabled**. Bad: IsInActive/IsDeactivated IsDisabled. If(IsEnabled) is easier to read than if(!isDisabled) <- (double not)
-   Don't abbreviate names. Abbreviations rely on context you may or may not have.
-   Don't put types in variable names (don't use Hungarian notation like let bIsValid, let iSpeed, let szUserName)
-   Put units in variable name **Good: let delayInSeconds or delaySeconds**. Bad: let delay. Users of your function would not know the unit of time to use without looking into the function implementation.

**Code smells & Other**

-   **Avoid Code smells** like: Code duplication, long method, long class, long parameter list. etc.
-   **No Magic numbers** or strings! Bad: const time = 600000; **Good: const millisecondsInTenMinutes = 10 _ 60 _ 1000;**
-   Avoid premature optimization - benchmark first.
-   **Fix** all **eslint warnings and errors** in your files.
-   Always check-in the code in better shape than you found it, fix/cleanup smaller things as you edit a file.
-   Use readonly arrays in functions, to better communicate that nothing is changed.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a
   build.
2. Update the README.md with details of changes to the interface, this includes new environment
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent.
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you
   do not have permission to do that, you may request the second reviewer to merge it for you.

### Names

-   Use PascalCase for type names.
-   Do **not use "I"** as a prefix for interface names.
-   Use PascalCase for enum values.
-   Use camelCase for function names.
-   Use camelCase for property names and local variables.
-   Do not use "\_" as a prefix for private properties.
-   Use whole words in names when possible.

### null and undefined

Use **undefined**. Do not use null.

### General Assumptions

Consider objects like Nodes, Symbols, etc. as immutable outside the component that created them. Do not change them.
Consider arrays as immutable by default after creation.

### Classes

For consistency, do not use classes in the core compiler pipeline. Use function closures instead.

### General Constructs

For a variety of reasons, we avoid certain constructs, and use some of our own. Among them:

Do not use for..in statements; instead, use ts.forEach, ts.forEachKey and ts.forEachValue. Be aware of their slightly different semantics.
Try to **use ts.forEach, ts.map, and ts.filter instead of loops** when it is not strongly inconvenient.

Based on:
https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#names

**PR Headline:**

-   Type #UserStoryNumber: One sentence explaining for the user what's new/fixed

    -   BugFix #36331: Fixed missing tags for SFC
    -   Feature #30000: Stid media added - upload and view images

-   Not commonly used:
    -   Version: vNumber
    -   Patch: Very minor fix / Clean up (removed console.log)
    -   Doc: updated readme.me - Added git flow description

## Testing

Run `npm run test` for unit testing.

Do not use real data in test mocks! Always use made up values.
