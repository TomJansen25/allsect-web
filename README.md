<h1 align="center">
  Allsect website
  <p style="font-size: 14px">made with Gatsby + Prismic + GraphQL + Firebase</p>
</h1>


## 🚀 Quick start

1.  **Clone source code from GCP.**

    Use the Gatsby CLI to create a new site, specifying the default starter.

    ```shell
    # Authenticate to and with the gcloud SDK and clone repos
    gcloud auth
    gcloud source repos clone allsect-web --project=allsect
    gcloud source repos clone allsect-functions --project=allsect
    ```

2.  **Run the website development server.**

    Navigate into the allsect-web directory and start developing.

    ```shell
    cd allsect-web/
    # Install all npm modules and run the development server
    npm install
    gatsby develop
    ```

3.  **Open the local development server and start editing.**

    The Allsect website is now running at `http://localhost:8000`!

    _Note: There's also a second link available now: _`http://localhost:8000/___graphql`_. Through this link you have access to and can query the underlying GraphQL Database._

4.  **Compile a new build version with your changes.**

    Use the Gatsby CLI to build a new deployment-ready version of the website after development.

    ```shell
    gatsby build
    gatsby serve
    ```

    The Allsect website is now running at `http://localhost:9000`! Make sure to check all basic functionality after building before actually deploying.

5. **Deploy a new version to Firebase.**

    Use the Firebase CLI to deploy a new compiled version of the website to firebase hosting.

    ```shell
    firebase login
    # make sure you are at the right account and project
    firebase projects:list
    firebase deploy
    ```    

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── custom_types
    ├── src
    │   │── backup
    │   ├── components
    │   ├── images
    │   ├── pages
    │   ├── styles
    │   ├── templates
    │   └── utils
    ├── .firebaserc
    ├── .gitignore
    ├── .prettierrc
    ├── firebase.json
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/custom_types`**: This directory contains the content types in JSON format defined in Prismic that are pulled and used by Gatsby.

3.  **`/src`**: This directory contains all the code for the front-end of the Allsect website, with the following sub-directories:
    1.  **`/backup`**: react components or gatsby pages that are currently not used but should be kept
    2.  **`/components`**: all react and styled-components ordered in sub-directories per page or website functionality
    3.  **`/images`**: static images such as the Allsect logo
    4.  **`/pages`**: every direct sub-domain of the website has its own page
    5.  **`/styles`**: contains two styled-components files with Allsect brand colors and global variables
    6.  **`/templates`**: contains template pages that are filled with content from Prismic
    7.  **`/utils`**: general utility functions used in several parts of the website

4.  **`.firebaserc`**: This file defines the Firebase CLI settings

5.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

6.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

7.  **`firebase.json`**: This file is the configuration file for [Firebase](https://firebase.google.com/) that defines the settings for Firebase Hosting.

8.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

9.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

10. **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

11. **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

12. **`LICENSE`**: Gatsby is licensed under the MIT license.

13. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

14. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

15. **`README.md`**: A text file containing useful reference information about your project.
