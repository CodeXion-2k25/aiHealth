# Contributing to This Project 🚀

Thank you for considering contributing to this project! Your help is greatly appreciated. 🎉

## How to Contribute

1. **Fork the Repository**  
   - Click the "Fork" button on the top right of the repo.
   - Clone your forked repository to your local machine:
     ```sh
     git clone https://github.com/CodeXion-2k25/AIhealth.git
     cd AIhealth
     ```

2. **Create a New Branch**  
   - Use a descriptive name:
     ```sh
     git checkout -b feature/your-feature-name
     ```

3. **Install Dependencies**  
   - Ensure you have Node.js installed.
   - Install project dependencies:
     ```sh
     npm install
     ```

4. **Make Your Changes**  
   - Modify the code in **Next.js (frontend)** or **Express.js (backend)** as needed.
   - Follow the **coding standards** (see below).

5. **Run and Test**  
   - Start the development server:
     ```sh
     npm run dev  # For Next.js frontend
     npm run start # For Express.js backend
     ```
   - Ensure your changes work without breaking existing functionality.

6. **Commit and Push**  
   - Commit with a meaningful message:
     ```sh
     git commit -m "Add feature: [short description]"
     ```
   - Push the changes to your fork:
     ```sh
     git push origin feature/your-feature-name
     ```

7. **Create a Pull Request (PR)**  
   - Go to the original repository on GitHub.
   - Click "New Pull Request" and select your branch.
   - Describe your changes clearly.
   - Link any related issues.

---

## 🛠 Code Standards

- Use **ESLint** and **Prettier** for consistent code formatting.
- Follow the existing project **folder structure**.
- Use **meaningful variable and function names**.
- Ensure the code is **modular** and **reusable**.

### **Frontend (Next.js)**
- Use **functional components** and **React hooks** (`useState`, `useEffect`, etc.).
- Organize components under `/components` and pages under `/pages`.
- Use environment variables (`.env.local`) for sensitive configurations.

### **Backend (Express.js)**
- Follow **MVC (Model-View-Controller)** pattern for structuring APIs.
- Use **middleware** for request validation and error handling.
- Secure routes using **JWT authentication** (if applicable).

---

## 📌 Issue Reporting

- Check **existing issues** before opening a new one.
- Provide a **clear and detailed description** of the problem.
- Include **steps to reproduce** the issue, if possible.
- Add relevant **screenshots or error logs**.

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as this project.

---

## 🙌 Need Help?

If you have any questions, feel free to open a **discussion** or contact us.  

Happy coding! 🚀✨
