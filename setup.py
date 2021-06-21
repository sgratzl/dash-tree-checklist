import json
from setuptools import setup
from pathlib import Path
from itertools import chain


with open('package.json') as f:
    package = json.load(f)

with open("README.md") as readme_file:
    readme = readme_file.read()

package_name = package["name"].replace(" ", "_").replace("-", "_")
base = Path(package_name)

files = [f"{package_name}/{f.name}" for f in chain(base.glob('*.js'), base.glob('*.json'), base.glob('*.map'))]

setup(
    name=package_name,
    version=package["version"],
    author=package['author'],
    author_email="sam@sgratzl.com",
    url=package['homepage'],
    packages=[package_name],
    include_package_data=True,
    license=package['license'],
    description=package.get('description', package_name),
    long_description=readme,
    long_description_content_type="text/markdown",
    install_requires=[],
    classifiers = [
        'Framework :: Dash',
    ],
)
