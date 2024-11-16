# Role-Based Login System in React

This project is a **Role-Based Login System** built using **React** . The login form allows users to authenticate with specific emails and a common password, redirecting them to their respective dashboards based on their roles (Researcher, Funder, Admin).

## Website Overview

- **Login Page**: Users can log in using predefined email addresses for specific roles.
- **Role-Based Redirection**: Upon login, users are redirected to different dashboards based on their roles (Researcher, Funder, Admin).
- **Password**: A common password `Global@1234` is used for all users.
- **Responsive Design**: Built with react and css for a mobile-friendly, responsive layout.

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

