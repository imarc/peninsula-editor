# Peninsula

Peninsula is a WYSIWYG, module-based editor that allows you to manage content from the frontend of your site.

## Install

### Javascript

Install Package:
```console
npm i peninsula-editor
```

ES6

```javascript
import PeninsulaEditor from 'peninsula-editor'

new PeninsulaEditor({
  patch: '/api/v1/',
  modulesGet: '/modules.json',
})
```

Include base component before closing `</body>` tag:

```html
        <!-- ... -->
        <peninsula-editor>
    </body>
</html>
```

### Styles

Include styles in the head:

```html
    <link rel="stylesheet" href="/dist/peninsula.min.css">
</head>
```

### Auth

It's also recommened that you gate the resources behind some kind of auth so only content creators can access content management and the website isn't loading unnecessary resources for regular users. 

Twig as an example: 

```twig
  <!-- ... -->
  {% if user.isAdmin(user) %}
      <!-- Module including the library -->
      <script src="/js/{module}" defer></script>
      <link rel="stylesheet" href="/dist/peninsula.min.css">
  {% endif %}
</head>
```

```twig
        <!-- ... -->
        {% if user.isAdmin(user) %}
            <peninsula-editor>
        {% endif %}
    </body>
</html>
```

### Configure

Configuration properties for Peninsual Editor.

#### patch
URL to patch content to

* **Type:** `string`
* **Default:** `/api/v1/`

#### modulesGet
URL or resource to get module data

* **Type:** `string`
* **Default:** `/modules.json`

#### CSRFtoken
CSRF Token if required for patching or getting data

* **Type:** `string`
* **Optional** 



