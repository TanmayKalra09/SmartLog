# React Login Modal Component

A modern, accessible, animated React login modal featuring:

- Email & Password inputs with strong validation
- "Show Password" toggle
- Gravatar-based user avatars
- Animated SVG logo and heading
- User greeting on successful login
- Toast notifications and redirect after login
- Smooth modal transitions
- Easy integration in any layout

---

## Features


## Features

- **Login Form & Accessibility:**  
  Collects Email and Password with proper labels, screen-reader text, and ARIA roles for inclusive usage.

- **Password Validation:**  
  Enforces minimum 8 characters, uppercase, lowercase, digit, and special characters.

- **Show/Hide Password:**  
  Adjacent button toggles password input visibility for better usability.

- **Gravatar Avatars:**  
  Displays user's avatar using their email via Gravatar, with fallback to default icon.

- **Animated UI:**  
  Animated SVG logo, gradient headings, and fade-in effects for greeting and feedback. All controlled via CSS (`Login.css`).

- **Post-login Greeting:**  
  Friendly "Hi, [username]!" message and avatar for 2 seconds after success.

- **Toast Notification:**  
  Uses `react-hot-toast` to provide instant feedback.

- **Navigation:**  
  Redirects the user to the main website’s home page after login.

- **Fully Responsive & Accessible:**  
  Keyboard navigable and screen-reader friendly.

---

## Files Included

- `src/components/Login.tsx`  
  React component implementing the login modal UI, logic for password validation, Gravatar integration, and login workflow.

- `src/components/Login.css`  
  CSS styles for the modal overlay, login card, forms, inputs, buttons, greetings, logo, and animations.

---

## Installation and Setup

1. **Install dependencies:**

npm install react-router-dom react-hot-toast blueimp-md5

2. **TypeScript type definitions (for TS projects):**

npm install --save-dev @types/react @types/react-dom


3. **Usage in your app:**

Import and use the `Login` component where you want the login modal to appear.

import Login from './components/Login';

const [showLogin, setShowLogin] = useState(false);

return (
<>
<button onClick={() => setShowLogin(true)}>Login</button>
{showLogin && <Login onClose={() => setShowLogin(false)} />}
</>
);


4. **Add Toast container in your app root:**

import { Toaster } from 'react-hot-toast';

function App() {
return (
<>
{/* Your app content */}
<Toaster />
</>
);
}


5. **Ensure your app uses routing with `BrowserRouter`** for navigation support.

---

## How It Works

- User fills in email and password.
- "Show Password" button toggles visibility for convenience.
- Client-side validation ensures password strength.
- On submit, simulates backend login, then:
  - Stores a fake JWT token to localStorage.
  - Generates and displays Gravatar avatar and greeting.
  - Shows success toast.
- After 2 seconds, modal closes and user is redirected to the homepage.

---

## Accessibility Considerations

- Labels are properly associated with inputs.
- ARIA roles and `aria-describedby` attributes improve screen reader experience.
- Screen reader only descriptions provide useful hints without cluttering visual UI.
- All buttons have accessible names (`aria-label`).
- Keyboard focus and interactions are fully supported.

---
## Customization

- To use your company/users’ actual avatars, swap the Gravatar logic.
- Replace simulated login with real authentication API as needed.
- Use or adapt `Layout.css` for page-wide visual consistency.

---

## License

Open source under the MIT License.

---

## Acknowledgments

- [react-hot-toast](https://react-hot-toast.com) for toast notifications.
- [blueimp-md5](https://github.com/blueimp/JavaScript-MD5) for hashing emails to support Gravatar.
- [Gravatar](https://en.gravatar.com/) for providing unique user avatars based on email.
- [react-router-dom](https://reactrouter.com/) for routing and navigation.

---

Feel free to open an issue or submit a pull request to improve the login experience or add features!

Happy coding! 🚀
