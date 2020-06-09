# Editing

There are four types of editing: `simpletext`, `richtext`, `image`, and `html`.

Different editors are applied to different elements using the `data-editor="{{ type }}"` attribute.

The editor will automatically look for all editors and apply editing capabilities.

## Simple Text
For editing plain text of an element. Typically for things like headers, cta text, etc.

Example:

```html
<header>
    <h2 data-editor="simpletext">This text will be editable</h2>
</header>
```

## Rich Text
For if you would like to edit rich text content.

Example: 
```html
<article data-editor="richtext">
    <h2>Header</h2>
    <p>
        Some Rich Text content.
    </p>
</article>
```

### Extending Editor Configuration
Under the hood, peninsula uses CKeditor for rich text editing. While peninsula uses it's own custom build of CKeditor, there are certain options that can be customized per-project by extending the base config. NOTE: `toolbar` and `plugins` are already set and cannot be configured.

You can learn more about configuring ckeditor [here](https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html).

Example:
```javascript
new PeninsulaEditor({
    /* .... */
    ckConfig: {
        heading: {
            options: [
                {
                    model: 'headingTwoBlue',
                    view: {
                        name: 'h2',
                        classes: 'headingBlue'
                    },
                    title: 'Heading 2 (blue)',
                    converterPriority: 'high'
                },
            ]
        }, 
    }
});
```

## Image
For uploading an image.

Example: 
```html
<img src="" data-editor="image">
```

Image will be uploaded as a base64 URI, endpoint should respond with a public location of the uploaded file for populating to the `src` attribute.

Example Response:
```json
{
    "pathname":"vol:\/\/public\/files\/f93db7f5a8c8d98569ea486273fd565b.png",
    "filename":"f93db7f5a8c8d98569ea486273fd565b.png",
    "size":170066
}
```

## HTML
For editing html inline

Example:
```html
<div class="video-embed" data-editor="html">
</div>
```