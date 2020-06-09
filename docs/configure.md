# Configure

Configuration properties for Peninsual Editor.

Example:
```javascript
new PeninsulaEditor({
  patch: '/api/v1/',
  modulesGet: '/modules.json',
  CSRFtoken: '#####',
  username: 'Full Name',
  homepage: '/',
  dashboard: '/admin',
  logout: '/logout'
})
```

## patch
URL to patch content to

* **Type:** `string`
* **Default:** `/api/v1/`

## modulesGet
URL or resource to get module data

* **Type:** `string`
* **Default:** `/modules.json`

## imagePost
URL for posting base64 uri of image to upload

* **Type:** `string`
* **Default:** `/api/v1/cms/files/`

## CSRFtoken
CSRF Token if required for patching or getting data

* **Type:** `string`
* **Optional** 

## username
Name of content manager/user

* **Type:** `string`
* **Optional**

## homepage
Site homepage URL

* **Type:** `string`
* **Optional**

## dashboard
Backend URL if applicable

* **Type:** `string`
* **Optional**

## logout
URL for logging user out

* **Type:** `string`
* **Optional**

## ckConfig
Extend CKEditor's base config with your own custom configuration.

* **Type:** `object`
* **Optional**