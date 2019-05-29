# `<myuw-search>`

## Getting Started

Add the following import to your page's `<head>`:

```html
<script type="module" src="https://unpkg.com/@myuw-web-components/myuw-search@^1?module"></script>
<script nomodule src="https://unpkg.com/@myuw-web-components/myuw-search@^1"></script>
```

**Important:** For responsive features to work properly, ensure your application includes the viewport meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Use the component's HTML tag wherever you want:

```html
<myuw-search
    input-label="Search MyUW"
    button-label="Submit search"
    icon="search">
</myuw-search>
```

Listen for the `myuw-search` CustomEvent and process the value how you like:

```js
/*
    1. Listen for myuw-search event
    2. Get the event data from event.detail.value
    3. Do what you want with the search term!
*/
document.body.addEventListener('myuw-search', (event) => {
  var valueFromSearchBar = event.detail.value // "detail" object is part of CustomEvent spec
  /*
    Perform search logic here. For example:
      - Pass the search value as a parameter to your app's search page
  */
}, false );
```

### Configurable properties via attributes

- **inputLabel (input-label)**: Text to use in the aria-label and placeholder of the search field
- **buttonLabel (button-label)**: Text to use for the aria-label of the search button
- **icon (icon)**: Text name of the material icon to use for the submit button ("search" by default)

### Custom CSS properties

- **--myuw-search-border**: Used to set the border color of the search component (to support themes with light background colors). Defaults to `none`.
- **--myuw-app-bar-color**: Used by to set the color of the search button icon on small screens. Defaults to white.

## Development and contribution

To run the demo app locally and test the component, run the following commands:

```bash
$ npm install
$ npm start
```


Cross-browser testing provided by:<br/>
<a href="https://www.browserstack.com/"><img width="160" src="https://myuw-web-components.github.io/img/Browserstack-logo.svg" alt="BrowserStack"/></a>
