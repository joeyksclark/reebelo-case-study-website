# TODO

This TODO list is by no means fully encompassing; it represents the next set of improvements I would prioritize.

## Code Quality and Best Practices

### TypeScript
- [ ] Address all instances of `ts-ignore` to ensure strict type-checking.
- [ ] Leverage typings more effectively, especially API request/response types for products and orders.

### Validation and Security
- [ ] Implement input validation across the application to ensure data integrity.
- [ ] The API currently has no authentication. This means anyone can view or update any user's orders/products. Integrate proper authentication and authorization mechanisms.
- [ ] Consider adding a proper login system rather than the current rudimentary method where users provide their names to view their orders.

### Testing
- [ ] Integrate testing into the deployment process.
- [ ] Expand test coverage beyond the happy path. Currently, tests only cover well-behaved callers. Add more edge cases and negative tests.

## Features and Functionalities

- [ ] Implement a separate backend system, which is currently lacking.
- [ ] Add transactional support, especially when creating orders that affect multiple tables.
- [ ] Design and implement a cart system, allowing users to add orders directly from the product page.
- [ ] Allow users to remove items from their orders.
- [ ] Consider database caching and implement more selective query mechanisms to improve performance.
- [ ] Investigate specific hosting solutions, and identify if there are any shortcomings in the current approach.

## UI/UX and Design

- [ ] Refactor UI components, introducing abstractions and performing general cleanup to improve modularity and reusability.
- [ ] Transition all CSS to use modules and abstract where appropriate.
- [ ] The current dashboard/database query design is not scalable. Consider redesigning for performance and scalability.

## Infrastructure and Deployment

- [ ] Maintain separate databases for development and the deployed version of the application to ensure data separation and integrity.

## General

- [ ] Look into potential issues or improvements in hosting.
- [ ] Provide documentation or guidelines for developers and users.

