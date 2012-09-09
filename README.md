# WordPress Grunt Starter Theme

This is my attempt to speed up my workflow when creating a WordPress theme.
I've tried so many bootstrap-scripts, all of them were basically great and
inspired me a lot - but either the scripts were too complicated for my taste or
they were not flexible enough.

So this is a basic concept and it doesn't intend to match all needs but might
be a useful entry point not just for me.

**Note:** This is not a complete WordPress-Theme.

## What it does

1. Concat and minify javascript.
2. Compile Compass / SASS stylesheets
3. Keep Theme-Metadata (Author, Version, Title) in sync with package.json
( easily increment version with grunt-bump )

## Structure

    base-theme/
        css/
            admin.css
            editor-style.css
            style.css
        javascripts/
            lib/
                jquery.plugin.js
            src/
                jquery
            admin.dev.js
            admin.min.js
            theme.dev.js
            theme.min.js
        scss/
            _partial1.scss
            _partial2.scss
            style.scss
            editor-style.scss
            admin.scss
        grunt.js
        index.php
        package.json
        style.css

## style.css without css
I would like to have a clean directory structure, so the style.css in the theme root really bugs me.
WordPress needs this file and it contains the theme-information (title, author, etc).
My approach is that this file doesn't contain any css-code, but only the template-metadata.
It won't be included as a stylesheet, all stylesheets are located in the "css/"-Folder.

I use grunt to render the project-information (version, author, title, etc) into the style.css - File.

## editor-style
SCSS is great to keep the editor-style.css in sync with the front-end (style.css) - the idea is to create
a partial called "_typography.scss" (or a mixin) and share it for editor-style.css and style.css