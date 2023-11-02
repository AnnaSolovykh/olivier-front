# Olivier Meal Planning App

Olivier is an AI-powered meal planning and grocery shopping application designed for women who are juggling professional lives, family responsibilities, and a commitment to a healthy lifestyle. Simplifying meal planning, recipe management, and grocery shopping with intuitive features and AI technology, Olivier empowers users to craft a balanced and enjoyable diet.

We built this application during the Practicum course at Code The Dream school, you can watch our final project video presentation by following this [link](https://drive.google.com/file/d/12dl_sDWDZ_KIDzBptfClYFAyOvOA_SYG/view?usp=drive_link).

## Table of Contents

1. [Getting Started](#getting-started)
2. [Folder Structure](#folder-structure)
3. [Development](#development)
4. [Branching Strategy](#branching-strategy)
5. [Additional Resources](#additional-resources)
6. [Product Functionality](#product-functionality)
7. [Authors](#authors)
8. [Contributing & Improvements](#contributing-and-improvements)
9. [License](#license)

---

## Getting Started

### Front-End Repo for Node/React Practicum

This is the front-end for the team's practicum project. We recommend following these instructions after setting up the back-end server first. You can find the back-end repository [here](https://github.com/AnnaSolovykh/olivier-back).
1. Clone both the front-end and back-end repositories into a parent folder (e.g., "Practicum Project").
2. The front-end app (React) runs on port 3005, and the back-end server runs on port 3000. Ensure both are running simultaneously for testing.

#### Setting up the local development environment

1. Clone this repository into the parent folder.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file in the top level of your folder and add `PORT=3005`.
4. Pull the latest version of the `main` branch when needed.
5. Run `npm start` to start the development server.
6. Open [http://localhost:3000](http://localhost:3000) in your browser to access the data from the back-end server.
7. You now have your front-end and back-end running locally!

_Note: You may choose to run the front-end server either in Visual Studio Code or directly in the browser._

## Folder Structure

The frontend project is structured as follows:

- `public/`:
  - `documents/`: Documents used in the app.
  - `images/`: Images used in the app.
- `src/`: Contains the source code for the frontend application.
  - `components/`: React components used throughout the application.
  - `utils/`: Utility functions and helper files.
  - `Card.tsx` and `CustomTheme.tsx`: Custom styling and Chakra UI theme configuration.
  - `index.tsx`: Entry point of the application.

## Development

When working on the frontend, follow these development guidelines:

1. **Write clean and readable code.**

   - We use Prettier for code formatting. It's configured to maintain consistent code style automatically. [Read further here](https://www.notion.so/Prettier-configuration-8f5750844f3c45d78e8e4782c218898e).

2. **Use semicolons consistently** throughout the codebase.

3. **Use Typescript** to provide types where needed. Types should be provided in the `src/utils/types.tsx` folder.

4. Use **Node version 18 and higher** to enable AI functionality.

5. Use the **Chakra UI** component library for consistent and accessible UI design.

   - Custom styles and theme configuration can be found in the `Card.tsx` and `CustomTheme.tsx` files. [Chakra UI documentation](https://chakra-ui.com/docs/getting-started).

6. **Beautiful DND** is used for drag-and-drop functionality in our application. [Documentation and examples](https://beautiful-dnd.netlify.app/).

7. Use **Axios for API Integration**.

   - Axios is used for making HTTP requests to the backend API. The configuration for Axios and API integration can be found in the `utils/` directory. [API integration guide](https://www.notion.so/Axios-requests-5d83fd2786434776a5177d1bbc96e2e0).

8. **Maintain clear folder structure**:
   - `public/`: Documents and images.
   - `src/`: Source code.
9. **Use functional components and React hooks** for state management.

10. Use **React Router** for client-side routing.

11. **Institute a structured import order**:

- Group similar utilities.
  ```javascript
  import { Routes, Route } from "react-router-dom";
  ```
- First place third-party imports, then local imports.
  ```javascript
  import { Routes } from "react-router-dom";
  import Home from "./Home";
  ```

12. **Adhere to the following naming conventions**:

- Functional components should be named in PascalCase.
- Variables, hooks, functions, and arrays should be named in camelCase.
- All names should be descriptive and concise.

13. **One component should serve one purpose**. Use prop types to transfer data between components efficiently.

14. Use **reusable components** to avoid repetition and improve maintainability.

15. Use **arrow functions** to declare variables and components.

    ```javascript
    const Login = () => { ... }
    export default Login;
    ```

16. **If you need to set state inside render**, use the following patterns:

      - In case of one state to set (in one line):
      ```javascript
      <Input onChange={event => setEmail(event.target.value)} />
      ```
      - In case of more than one states to set:
      ```javascript
      <Input
         onChange={event => {
            setPassword(event.target.value);
            setErrorPassword("");
         }}
      />
      ```

17. Keep the **logic inside render** to an absolute minimum.

    ```javascript
    const handleShowPassword = () => { ... };
    ...
    <Button onClick={handleShowPassword}>Button</Button>
    ```

18. Use **ternary operator** for **conditional rendering**:

    ```javascript
    {
      showPassword ? <ViewIcon /> : <ViewOffIcon />;
    }
    ```

19. In case of a **long list of tag's attributes or component imports**, each one should start on a new line to improve readability.

20. For Select buttons, [Chakra Select](https://www.npmjs.com/package/@chakra-ui/select) and [Chakra React Select](https://github.com/csandman/chakra-react-select) are used.

---

## Branching Strategy

The primary branches in our repository are:

- `main`: The main branch represents our production-ready code. Changes are only merged into `main` after thorough testing and validation.

- `devops/initial-setup`: The `devops/initial-setup` branch serves as an intermediary branch for aggregating changes from various `dev` branches before merging into `main`. This branch helps ensure that all changes are integrated and tested together as a cohesive unit.

1. **Feature Development**:

   - Create a feature branch from `devops/initial-setup` when working on new features or bug fixes.
   - Name your feature branches descriptively to indicate the purpose of the work starting with `dev/` and include the Linear issue ID in the branch name (e.g., `dev/pr-template-PRA-29`).

2. **Review**:

   - Seek code reviews and await approvals from two team members.
   - Use Linear to track project progress and assign issue numbers to pull requests (e.g., PRA-175).
   - Read on for code review guidelines [here](https://www.notion.so/Code-Reviews-c5c0e2e0fef1449d833f4fed707fb739)

3. **Merging to `devops/initial-setup`**:

   - Once your changes are complete and approved, merge your feature branch into `devops/initial-setup`.

4. **Merging to `main`**:
   - Only after successful testing on `devops/initial-setup`, create a pull request to merge changes from `devops/initial-setup` into `main`.

---
## Product Functionality

Olivier offers a wide range of features (September 2023):

- **Register and Log In**: Create a user account to access all the app's features.

- **Password Reset Feature**: Easily reset your password if needed, ensuring account security.

- **AI-Powered Recipe Searches**: Quickly discover meal ideas powered by AI technology.
![](public\images\demo\gif_1.gif)

- **Manual Recipe Creation**: Create and customize recipes directly within the app.
![](public\images\demo\gif_2.gif)

- **Efficient Recipe Management**: Organize and manage your recipes with ease, using categories and tags.
![](public\images\demo\gif_3.gif)

- **Comprehensive Recipe Details**: Access detailed cooking instructions and ingredient lists.

- **Dynamic Weekly Meal Planner**: Craft and edit weekly menus with intuitive drag-and-drop functionality.
![](public\images\demo\gif_5.gif)

- **Smart Shopping Lists**: Generate smart shopping lists based on selected recipes.
![](public\images\demo\gif_4.gif)

- **Share Shopping Lists**: Share your shopping lists via email or print them out for convenient offline access.

---

## Additional Resources

- [React documentation](https://reactjs.org/)
- [TypeScript documentation](https://www.typescriptlang.org/docs/)
- [Chakra UI documentation](https://chakra-ui.com/docs/getting-started)
- [Axios documentation](https://axios-http.com/docs/intro)
- [Prettier documentation](https://prettier.io/docs/en/index.html)
- [Beautiful DND documentation](https://github.com/atlassian/react-beautiful-dnd)
- [Olivier video presentation](https://drive.google.com/file/d/12dl_sDWDZ_KIDzBptfClYFAyOvOA_SYG/view?usp=drive_link)
- [Practicum project pptx presentation](https://docs.google.com/presentation/d/1o9Oo3HQEbyEM5JsXdGRZEjWkLaWQQgWp)
- [Code The Dream organization](https://codethedream.org/)

---

## Authors

**Frontend**

- [Anna Pestova](https://github.com/AnnaPestova1)
- [Anna Solovykh](https://github.com/AnnaSolovykh)
- [Elena Gornovoy](https://github.com/ElenaGor8)
- [Svetlana Beynik](https://github.com/SvetlanaBeynik)

**Backend**

- [Elena Cherpakova](https://github.com/ElenaCherpakova)
- [Aigul Yedigeyeva](https://github.com/AigulY)

## Contributing & Improvements

We're always looking to improve and enhance our project. If you have suggestions, improvements, or find any bugs, please feel free to open a pull request or an issue on our GitHub repository.

Before submitting a pull request, please ensure the following:

1. Your code is well-documented and follows the project's coding style.
2. Your changes are well-tested and do not introduce new bugs.
3. Include a detailed description of the changes you are proposing.

We appreciate all contributions and look forward to collaborating with you!

---

## License

This project is available for use under the MIT License.
