# Role-Based Login System in React

This project is a **Role-Based Login System** built using **React**. The login form allows users to authenticate with specific emails and a common password, redirecting them to their respective dashboards based on their roles (Researcher, Funder, Admin).

## Website Overview

- **Login Page**: Users can log in using predefined email addresses for specific roles.
- **Role-Based Redirection**: Upon login, users are redirected to different dashboards based on their roles (Researcher, Funder, Admin).
- **Password**: A common password `Global@1234` is used for all users.
- **Responsive Design**: Built with React and CSS for a mobile-friendly, responsive layout.

## Login Details

The following login credentials can be used to access the system:

| **Role**       | **Email**                | **Password**  | **Redirect URL**       |
|----------------|--------------------------|---------------|------------------------|
| **Researcher** | `researcher@gmail.com`    | `Global@1234` | `/researcher`           |
| **Funder**     | `chava@gmail.com`         | `Global@1234` | `/funder`               |
| **Admin**      | `admin@gmail.com`         | `Global@1234` | `/admin`                |

If incorrect login details are entered, an alert will notify the user of an invalid email or password.

## Live Website

You can access the live website here: https://lxc4668.uta.cloud/

### Key Features

1. **Role-Based Authentication**: Users are authenticated based on their email and password and redirected to their respective dashboards.
2. **Common Password**: The same password `Global@1234` is used for all roles.
3. **Form Validation**: Basic form validation is implemented to ensure both email and password fields are filled.
4. **Responsive UI**: The UI is styled using Bootstrap for a responsive and modern design.

## How to Use

1. **Login**: Navigate to the login page and enter one of the predefined email addresses and the common password (`Global@1234`).
2. **Redirection**: Upon successful login, you will be redirected to the appropriate dashboard based on your role:
    - **Researcher**: `/researcher`
    - **Funder**: `/funder`
    - **Admin**: `/admin`

If you do not have valid credentials, you will be shown an error message.

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your system.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/harishnaidugaddam/sparks.git
   cd sparks
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the application:
   ```sh
   npm start
   ```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

---