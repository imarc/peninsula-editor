# Modules
Peninsula also allows for managing modules on a page.

## Structure

If a module contains a module or modules, they must ALL be modules. In other words, because modules allow for reording, direct children of a module that don't contain module attributes, will be ignored/removed. 

Example:
```html
    <section data-module="section" data-module-name="Primary Content">

        <!-- This will be ignored/removed -->
        <h3>A Title</h3>

        <!-- Will be added to module list -->
        <div class="card" data-module="card" data-module-name="Advertisement">
        </div>

        <!-- Will be added to module list -->
        <div class="cta" data-module="cta" data-module-name="Call to Action">
        </div>

    </section>
```

## Adding editors
Editors can be applied to any part of a module. Modules that are reordered will always retain their changes and editor state.

Example:
```html
<div class="card" data-module="card" data-module-name="Resource">
    <img src="/image.jpg" data-editor="image">
    <h2 class="title" data-editor="simpletext">Title<h2>
    <div class="content" data-editor="richtext">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </div>
</div>
```

Or, a module itself can be an editor: 
```html
<div class="card" data-module="fullwidth" data-module-name="Body Content" data-editor="richtext">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</div>
```
