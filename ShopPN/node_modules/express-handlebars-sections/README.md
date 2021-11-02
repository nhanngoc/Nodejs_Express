# express-handlebars-sections

This module add support to express-handlebars to manage sections. It means that you can define one or more sections in the template, and then in the view specify what is the content for each section.

## Installation

```sh
$ npm install express-handlebars-sections
```

## Usage
#### 1- Configure the express handlebars.
If you register the Handlebars view engine directly use this:

```javascript
var express = require('express');
var express_handlebars  = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');

var app = express();

app.engine('handlebars', express_handlebars({
	section: express_handlebars_sections()  // CONFIGURE 'express_handlebars_sections'

	// properties used by express-handlebars configuration ...
}));
```
or if you prefer register Handlebars view engine with a Handlebars instance use this:
```javascript
var express = require('express');
var express_handlebars  = require('express-handlebars');
var express_handlebars_sections = require('express-handlebars-sections');

var app = express();

var hbs = express_handlebars.create({
	// properties used by express-handlebars configuration ...
});
express_handlebars_sections(hbs);   // CONFIGURE 'express_handlebars_sections'

app.engine('handlebars', handlebars.engine);
```

#### 2- Define your sections in the layout
Here we going to define two sections, one for the header and other for the footer of my page.
```html
<head>
    <title>Hello express-handlebars-sections</title>
</head>
<body>
    <!-- DEFINE A 'header' SECTION -->
    {{{_sections.header}}}

    {{{body}}

    <!-- DEFINE A 'footer' SECTION -->
    {{{_sections.footer}}}
</body>
</html>
```

#### 3- Define the content for your sections in the view
Then in a view that will use the previous layout we can define what is the content that we want to render of each section.

```html
<p>This is my Body Content</p>

{{#section 'header'}}
    <h1>This is my Header Content</h1>
{{/section}}

{{#section 'footer'}}
    <h1>This is my Footer Content</h1>
{{/section}}
```

This will result the following code:
```html
<head>
    <title>Hello express-handlebars-sections</title>
</head>
<body>
    <h1>This is my Header Content</h1>
    <p>This is my Body Content</p>
    <h1>This is my Footer Content</h1>
</body>
</html>
```

#### Note
It's not necessary define the content for a section. If no content is specified it does nothing.

## Use Cases

### Define a default content for the section
We can define a default content for the section in the layout. In this case if the view dosen't define a content for the section, its default content will be rendered.
```html
<head>
    <title>Hello express-handlebars-sections</title>
</head>
<body>

<!-- DEFINE THE DEFAULT CONTENT FOR THE 'header' SECTION -->
{{#section 'header'}}
    <p>Default Header</p>
{{/section}}

{{{_sections.header}}}

...
```

In this case if any content for the 'header' section is defined in the view, it will be render the default content. 
**Is necessary define the default content before define the section.**
for example the following code is incorrect
```html
{{{_sections.header}}}

<!-- DEFINE THE DEFAULT CONTENT FOR THE 'header' SECTION -->
{{#section 'header'}}
    <p>Default Header</p>
{{/section}}
```

### Require content for the section
You can force to require a content for a section, throwing an Error if no content is defined.
```html
<head>
    <title>Hello express-handlebars-sections</title>
</head>
<body>

<!-- DEFINE A REQUIRED 'header' SECTION -->
{{{_sections._get 'header'}}}
```

In this case if no content is defined for the 'header' section (either in view or layout) it will trhow the Error **"The section 'header' is required."**.
