/*
T8 - because I was out of ideas for a name. 

Sanitizing user data before putting into HTML.

Example (here 'what' comes from the user, hence can be unsafe):

    document.querySelector('#target').innerHTML = t8.sane('<div><p>Hello {what}!</p></div>',{what: 'World'});

And yeah, the way it is declared here is, well, this is just an example for now. Just copy and paste it somewhere.

More: https://github.com/kpion/t8
*/

const t8 = {

    // returns string, sanitizes everything in the data object
    sane(template,data) {
        return template.replace(/\{(.*?)\}/g, (fullmatch, varname) => {
            return this.sanitize(this.objPath(varname.split('.'), data));
        });	
    },

    //just returns string and data in an unsafe, raw format
    raw(template,data) {
        return template.replace(/\{(.*?)\}/g, (fullmatch, varname) => {
            return this.objPath(varname.split('.'), data);
        });	
    },

    //replaces < with &lt; etc. Could be a bit more optimized.
    sanitize (str) {
        const replacements = {
            '"': '&quot;', 
            '&': '&amp;', 
            "'": '&apos;',
            '<': '&lt;', 
            '>': '&gt;',
        };
        return str.toString().replace(/[\<\>\&\"\']/g, c => replacements[c]);  
    },


    /* 
    Internal use only utility. 
    Given a string "person.name" and an object {person: {name: 'John'}} will return the value, "John".
    */
	objPath (keyChain, obj) {
        let cur = obj;
        for (var index = 0;index < keyChain.length; index++) {
            let key = keyChain[index];
            if(typeof cur[key] === 'undefined'){
                return undefined;
            }
            cur = cur[key]; 
        }
        return cur;
    }

}
