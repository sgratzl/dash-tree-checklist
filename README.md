# Dash Tree Checklist

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Usage

### Python

latest released version

```sh
pip install https://github.com/sgratzl/dash-tree-checklist/releases/latest/download/dash_tree_checklist.tar.gz
```

latest source code version

```sh
pip install git+https://github.com/sgratzl/dash-tree-checklist@binaries#dash_tree_checklist
```

### R

```R
devtools::install_github("sgratzl/dash-tree-checklist@binaries")
```

### Julia

```sh
pkg
add sgratzl/dash-tree-checklist#binaries
```

## Development Environment

### Install dependencies

Requirements: Python, Node

```sh
npm install
python -m venv venv
. venv/bind/activate # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt -r requirements-dev.txt
```

### Commands

```sh
npm start     # start test app
npm run build # build the components, assumes an activated virtualenv
npm run lint
npm run fix
```

---

OLD

### Write your component code in `src/lib/components/DashTreeChecklist.react.js`.

- The demo app is in `src/demo` and you will import your example component code into your demo app.
- Test your code in a Python environment:
  1. Build your code
     ```
     $ npm run build
     ```
  2. Run and modify the `usage.py` sample dash app:
     ```
     $ python usage.py
     ```
- Write tests for your component.
  - A sample test is available in `tests/test_usage.py`, it will load `usage.py` and you can then automate interactions with selenium.
  - Run the tests with `$ pytest tests`.
  - The Dash team uses these types of integration tests extensively. Browse the Dash component code on GitHub for more examples of testing (e.g. https://github.com/plotly/dash-core-components)
- Add custom styles to your component by putting your custom CSS files into your distribution folder (`dash_tree_checklist`).
  - Make sure that they are referenced in `MANIFEST.in` so that they get properly included when you're ready to publish your component.
  - Make sure the stylesheets are added to the `_css_dist` dict in `dash_tree_checklist/__init__.py` so dash will serve them automatically when the component suite is requested.
- [Review your code](./review_checklist.md)

### Create a production build and publish:

1. Build your code:
   ```
   $ npm run build
   ```
2. Create a Python distribution

   ```
   $ python setup.py sdist bdist_wheel
   ```

   This will create source and wheel distribution in the generated the `dist/` folder.
   See [PyPA](https://packaging.python.org/guides/distributing-packages-using-setuptools/#packaging-your-project)
   for more information.

3. Test your tarball by copying it into a new environment and installing it locally:

   ```
   $ pip install dash_tree_checklist-0.0.1.tar.gz
   ```

4. Share your component with the community! https://community.plotly.com/c/dash
   1. Publish this repository to GitHub
   2. Tag your GitHub repository with the plotly-dash tag so that it appears here: https://github.com/topics/plotly-dash
   3. Create a post in the Dash community forum: https://community.plotly.com/c/dash
