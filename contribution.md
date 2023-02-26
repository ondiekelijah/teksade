- [Welcome to Teksade Open Source Community!](#welcome-to-teksade-open-source-community)
  - [Contributing Guidelines](#contributing-guidelines)
  - [Coding Standards](#coding-standards)
    - [Coding Standards](#coding-standards-1)
    - [Best Practices](#best-practices)
    - [Use of Libraries and Frameworks](#use-of-libraries-and-frameworks)
    - [Git Branching and Naming Pattern](#git-branching-and-naming-pattern)
      - [Branching Pattern](#branching-pattern)
      - [Naming Pattern](#naming-pattern)
    - [Git Flow](#git-flow)
      - [Example](#example)
  - [Our Techstack](#our-techstack)
  - [Code of Conduct](#code-of-conduct)
    - [Our Pledge](#our-pledge)
    - [Our Ethics](#our-ethics)
    - [Our Responsibilities](#our-responsibilities)
    - [Scope](#scope)
    - [Enforcement](#enforcement)
  - [Communication](#communication)



# Welcome to Teksade Open Source Community!

We are thrilled to have you as a contributor to the Teksade project. Our goal is to create a friendly and inclusive environment for everyone to collaborate and contribute their skills to the project.

Please take a moment to read the following guidelines before contributing to the project.



## Contributing Guidelines

To ensure a smooth contribution process, please follow these guidelines:

1. **Fork** the repository and **clone** it to your local machine.
2. **Create a new branch** for your changes.
3. **Make the necessary changes** and **commit** them with a clear and descriptive message.
4. **Push** your changes to your forked repository.
5. **Submit a pull request** to the main repository.


When contributing to this repository, first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. 

Please ensure that your changes are in line with the project's coding standards and requirements. If your changes are substantial, please open an issue to discuss them with the maintainers before submitting a pull request.

Also  adhere to our [Code of Conduct](#code-of-conduct)

## Coding Standards
When contributing to a project, it's important to follow the established coding standards and best practices to ensure consistency and maintainability of the codebase. Here are some guidelines to follow:

### Coding Standards
- Use a consistent coding style throughout the project. This includes things like indentation, spacing, and naming conventions.
- Follow established language-specific coding standards and conventions, such as PEP 8 for Python or PSR standards for PHP.
- Avoid writing code that is overly complex or difficult to understand.
- Comment your code to make it easier for others to understand its purpose and functionality.
### Best Practices
- Use libraries and frameworks whenever possible to avoid reinventing the wheel and improve code quality.
- Write code that is modular and reusable, with a focus on separation of concerns.
- Write unit tests to ensure that your code is functioning as expected and to catch bugs early on.
- Use version control to manage your code changes and collaborate effectively with others.
### Use of Libraries and Frameworks
When using libraries and frameworks, it's important to follow these guidelines:

- Use libraries and frameworks that are widely used and have a strong community of developers. This can help ensure that the code is reliable and well-maintained.
- Use libraries and frameworks that are well-documented and have good support resources, such as forums or documentation.
- Avoid using too many libraries and frameworks, as this can lead to bloated code and performance issues.
- Use the latest stable versions of libraries and frameworks to take advantage of bug fixes and new features.
 
### Git Branching and Naming Pattern
When working on a project using Git, it's important to follow a consistent branching and naming pattern to keep your codebase organized and easy to navigate. Here are some guidelines to follow:

#### Branching Pattern
- **master**: The master branch should always contain your stable code that is ready to be released to production.

- **develop**: The develop branch is where you merge in all of your feature branches. This branch should always be in a working state, but may contain incomplete features that are still being developed.

- **Feature branches**: Each new feature or bugfix that you work on should be developed on its own feature branch, branched off of develop. These branches should be named in a descriptive way that indicates the feature being developed (e.g. login-page-redesign).

#### Naming Pattern
When naming your branches, you should follow a consistent naming pattern that is easy to understand and provides information about the contents of the branch. Here are some guidelines to follow:

- Use lowercase letters and hyphens to separate words (e.g. new-feature).
- Use descriptive names that indicate the purpose of the branch (e.g. add-login-form).
- Prefix the branch name with feature/ for feature branches, bugfix/ for bugfix branches, and hotfix/ for emergency hotfixes that need to be applied to production code.
### Git Flow
Git Flow is a popular branching model that provides a structured approach to managing Git branches. It involves the use of two long-lived branches (master and develop) and a set of short-lived feature branches. Here are the basic steps involved in Git Flow:

- Create a new feature branch off of develop.
- Develop and test the new feature on the feature branch.
- Merge the feature branch back into develop when it is complete.
- Once the develop branch is stable and ready to release, create a new release branch off of develop.
- Test the release branch and fix any issues that are discovered.
- Merge the release branch back into develop and master.
- Tag the master branch with the release version number.
- Deploy the tagged release to production.
   
Using Git Flow help to keep our codebase organized and make it easier to manage projects with multiple contributors.

#### Example
Here's an example of how Git Flow might look in practice:

```bash
# create a new feature branch
git checkout -b feature/add-login-form develop

# make some changes and commit them
git add .
git commit -m "Add login form"

# merge the feature branch back into develop
git checkout develop
git merge --no-ff feature/add-login-form

# create a new release branch
git checkout -b release/1.0.0 develop

# test the release branch and fix any issues
# ...

# merge the release branch back into develop and master
git checkout develop
git merge --no-ff release/1.0.0
git checkout master
git merge --no-ff release/1.0.0

# tag the master branch with the release version number
git tag -a 1.0.0 -m "Release 1.0.0"

# deploy the tagged release to production
# ...
```

By following a consistent Git branching and naming pattern and using a structured approach like Git Flow, you can make it easier to collaborate with others and manage your codebase effectively.

## Our Techstack
1. [Next Js](https://nextjs.org/)
2. [Tailwind css](https://tailwindcss.com/)
3.  [Typescript](https://www.typescriptlang.org/)
4.  [GraphQL](https://graphql.org/)

to  ensire as safe onboarding for contributors  we provide the following links to  helpful material  to get up to  speed with  the techstack . 
1. [GraphQl Youtube tutorial](https://youtu.be/qux4-yWeZvo)
2. [Next Js crash course by Academind](https://youtu.be/MFuwkrseXVE)
3.  [Typescript for React devs playlist](https://www.typescriptlang.org/)









## Code of Conduct

### Our Pledge


The Teksade Open Source Community is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, race, age, religion, or any other characteristic protected by law. We do not tolerate harassment of participants in any form.

###  Our Ethics 

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at [INSERT EMAIL ADDRESS]. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.



## Communication

If you have any questions, concerns, or suggestions, please feel free to join our [Whatsapp forum](https://chat.whatsapp.com/ET94DkTEO1EB5EuSkEXJ4N) or reach out to one of our maintainers. We are always here to help!

Thank you for considering contributing to Teksade! We look forward to working with you.

