# T8 - Sanitize HTML

Safe HTML  injection with .innerHTML &amp; .insertAdjacentHTML &amp; friends.

As simple as 

``` document.querySelector('#target').innerHTML = t8.sane('<p>Hello {what}!</p>',{what: 'World'}); ```

See [Demo](https://jsfiddle.net/kpion/wfzqvtmd/)


## Introduction

You can't simply get some user input and make a HTML out, of it due to XSS. Hence the common solution is to use .appenchChild to add DOM Element, and .textContent to put user input into it.

And that is fine, although there are those exceptions where building whole HTML is just a much better (easier and faster) option.

T8 makes it safe by separating user data and your HTML markup. I.e. templates. Just like those libs like React, vue etc do, except T8 does only that.

## Example

One-liner, not very useful: 

``` document.querySelector('#target').innerHTML = t8.sane('<p>Hello {what}!</p>',{what: 'World'}); ``` 

And here comes an even less useful one:

```js

//example data object, coming from user (not safe):
let person = {
    name: 'John Smith',
    hack: 'hack <img src=x onerror="alert(\'XSS Attack\')"> us',
    animals: {
        cat:'Rambo',
        dog: 'Pinky'
    }
}

//our template 
let template = `
    <div>
        <p>Here is this guy, <b>{name}</b></p> 
        <p>He has a cat called {animals.cat} and a dog - {animals.dog}</p> 
        <p>And he tries to <b>{hack}</b></p> 
    </div>
`;

//safe scenario: 

document.querySelector('#target').innerHTML = t8.sane(template,person);

//unsafe scenario: 

document.querySelector('#target').innerHTML = '<p>Purposely unsafe:</p>' + t8.raw(template,person);

```
## Installation 

This huge package, thanks to the most advanced AI technologies, is highly compressed to a single js file [here](src/t8.js) so just copy &amp; past it... somewhere.

## Notes &amp; references

 - Generally about the XSS and .innerHTML:  https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/

 - When you want to just append a node or two to existing DOM, appendChild and friends is an obvious choice. It's safe and much faster for a browser to process. T8 is there to address a different issue - making a whole, big, sometimes complicated HTML structure. 

 - T8 and similar template based solutions are much different than tools designed to "sanitize" or "purify" HTML. The later try to get existing HTML (mixed, not separated into safe and unsafe data) and then clear it. Like [this one](https://github.com/punkave/sanitize-html) or [that one](https://github.com/cure53/DOMPurify) 


 - A different, [interesting approach](https://stackoverflow.com/a/2947012/4568686) (see code sample in this answer)

