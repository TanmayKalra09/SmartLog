# **Contributing Guidelines** 📄

This documentation contains a set of guidelines to help you during the contribution process for **SmartLog**.
We are happy to welcome all the contributions from anyone willing to improve/add new features to this project.
Thank you for helping out and remember, **no contribution is too small.**

Please note we have a [code of conduct](CODE_OF_CONDUCT.md) - please follow it in all your interactions with the project.

## **Need some help regarding the basics?🤔**

You can refer to the following articles on basics of Git and Github and also contact the Project Maintainers,
in case you are stuck:

- [Forking a Repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
- [Cloning a Repo](https://help.github.com/en/desktop/contributing-to-projects/creating-an-issue-or-pull-request)
- [How to create a Pull Request](https://opensource.com/article/19/7/create-pull-request-github)
- [Getting started with Git and GitHub](https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6)
- [Learn GitHub from Scratch](https://docs.github.com/en/get-started/start-your-journey/git-and-github-learning-resources)


## **Project Structure** 🏗️

```bash
SmartLog/
│
├── public/     
├── server/                
│   ├── controllers/         
│   ├── db/   
│   ├── middleware/          
│   ├── models/               
│   ├── routers/             
│   ├── utils/   
│   ├── index.js            
│   ├── package.json        
│   ├── .gitignore
│   ├── app.js
│   ├── index.js
│   ├── package-lock.json  
│   └── package.json  
│
├── src/                 
│   ├── assets/           
│   ├── components/      
│   ├── App.css         
│   ├── App.jsx
│   ├── index.css                      
│   └── main.jsx        
│
├── .gitignore              
├── CODE_OF_CONDUCT.md
├── CONTRIBUTOR.md 
├── eslint.config.js
├── index.html
├── package-lock.json       
├── package.json             
├── README.md      
├── SECURITY.md
├── vercel.json          
└── vite.config.js             
```


## **Development Setup** 🛠️

## **Steps to Contribute Using the Command Line** 💻

1. **Fork the Repository:**
Click on the "Fork" button on the top right of the repository page on GitHub to create your own copy.
2. **Clone the Repository:**

```bash
git clone https://github.com/your-username/SmartLog.git
```

3. **Navigate to the Project Directory:**

```bash
cd SmartLog
```

4. **Create a New Branch:**

```bash
git checkout -b feature/your-feature-name
```

Use prefixes like `feature/`, `fix/`, `docs/`, or `refactor/` for better organization.

5. **Set Up Your Development Environment:**

**Frontend Setup:**
```bash
cd src
npm install
npm run dev
```

**Backend Setup:**

```bash
cd server
npm install
npm run dev
```

6. **Make Your Changes:**
    - **Frontend contributions:** Work in the `src/` directory
    - **Backend contributions:** Work in the `server/` directory
7. **Test Your Changes:**
    - Ensure all services are running and communicating properly
    - Test API endpoints using tools like Postman or curl
    - Verify frontend functionality in the browser
8. **Stage and Commit Changes:**

```bash
git add .
git commit -m "concise description"
```

**Commit Message Convention:**
    - `feat:` for new features
    - `fix:` for bug fixes
    - `docs:` for documentation updates
    - `style:` for code style changes
    - `refactor:` for code refactoring
    - `test:` for adding tests


9. **Push Changes to GitHub:**

```bash
git push origin feature/your-feature-name
```

10. **Create a Pull Request:**
    - Go to your forked repository on GitHub
    - Click "Compare \& pull request"
    - Use the format: `[Component]: Description` 
    - Provide detailed description of changes and add screenshots if applicable

## **Alternatively Contribute Using GitHub Desktop** 🖥️

1. **Open GitHub Desktop:** Launch GitHub Desktop and log in to your GitHub account.
2. **Clone the Repository:** Use File > Clone Repository and select SmartLog.
3. **Switch to the Correct Branch:** Create a new branch for your feature using the branch dropdown.
4. **Make Changes:** Work in your preferred code editor on the appropriate component. 
5. **Commit Changes:** Stage your files and write a descriptive commit message following our convention.
6. **Push Changes:** Click "Push origin" to push your branch to GitHub.
7. **Create a Pull Request:** Follow the same PR creation process as described above.

## **Pull Request Process** 🚀

1. **Self-review your code** - Ensure clean, well-commented code
2. **Add proper descriptions** - Explain what your code does and why
3. **Include comments** - Especially in complex logic areas
4. **Add screenshots** - For UI changes, include before/after images
5. **Update documentation** - If you're adding new features or changing APIs
6. **Test thoroughly** - Ensure your changes don't break existing functionality
7. **Follow coding standards** - Maintain consistency with existing codebase

**PR Title Format:** `[Component]: Brief description`


## **Issue Report Process** 📌

1. **Check existing issues** - Avoid duplicates by searching first
2. **Use issue templates** - Follow the provided templates for bugs/features
3. **Provide detailed descriptions** - Include steps to reproduce, expected behavior, screenshots
4. **Label appropriately** - Use labels like `bug`, `enhancement`, `documentation`, `good first issue`
5. **Wait for assignment** - Don't start working until you're assigned to avoid conflicts
6. **Ask questions** - If anything is unclear, comment on the issue

## **Community Guidelines** 🤝

- **Be respectful** - Treat all contributors with respect and kindness
- **Be inclusive** - Welcome contributors of all skill levels
- **Be collaborative** - Help others and ask for help when needed
- **Be patient** - Code reviews take time; maintainers are volunteers


## **Getting Help** 💬

**Project Admin:** [Tanmay Kalra](https://github.com/TanmayKalra09)

- **GitHub Issues:** [SmartLog Issues](https://github.com/TanmayKalra09/SmartLog/issues)


## **Thank you for contributing!** 💗

We truly appreciate your time and effort to help improve SmartLog. Whether you're fixing a typo, adding a new feature, every contribution makes a difference.

Happy contributing! Together, let's build something amazing. 🚀
