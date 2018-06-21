# Install

Assuming you already have `node` installed on your computer. If not, you can use `homebrew` to install node

```
  brew install node
```

Theming `origin` requires help from `node-sass`, `gulp` and `bower`, so we need to install them first.

```
  sudo npm install --global gulp node-sass bower
```

These tools should be install globally, so we include a flag `--global` in the command.


For the first time cloning `origin` theme, you'll need to install node package required for the workflow:

```
  $ cd [drupal]/themes/custom/origin
  $ npm install
```

# Usage

🚨 The current configuration is set up to work with local development only. Local hostname must match variable found in `GulpConfig.js`
ie: I use MAMP set up with vhost name `d8boilerplate.pantheon`, so in `GulpConfig.js`, hostname must say the same `d8boilerplate.pantheon`.

To start working on theming:

```
  $ cd [drupal]/themes/custom/origin
  $ gulp
```

Development website will be opened automatically on your default browser.
