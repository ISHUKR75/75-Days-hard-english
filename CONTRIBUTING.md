# Contributing to 75 Days Hard English Course

First off, thank you for considering contributing to this project! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

## Where do I go from here?

If you've noticed a bug or have a feature request, please make sure it hasn't already been addressed by searching the [issues](https://github.com/ISHUKR75/75-Days-hard-english/issues). If not, feel free to open a new issue using our templates.

## Code Structure

The project uses Next.js (App Router). All content is stored in the `data/` directory using JSON files. Please respect the existing architecture:
- **No duplicates:** Ensure shared logic goes into `lib/` or `services/`.
- **State Management:** Use `store/` (Zustand). Do not introduce new context providers unless absolutely necessary.
- **Styling:** Use Tailwind CSS in the `components/` or `app/` directories.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2. Update the README.md with details of changes to the interface, if applicable.
3. Your pull request will be reviewed by maintainers. Please address any requested changes promptly.
4. Once approved, your PR will be merged into the main branch.

Happy coding!
