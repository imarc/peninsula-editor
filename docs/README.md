# Peninsula

Peninsula is a WYSIWYG, module-based editor that allows you to manage content from the frontend of your site.

## Install

Install Package:
```html
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
