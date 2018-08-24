var MyUWSearch = (function (exports) {
    'use strict';

    var tpl = "<style> @import url(https://fonts.googleapis.com/icon?family=Material+Icons);\n\n    :host {\n        display: flex;\n        flex: auto;\n    }\n\n    :host([hidden]) {\n        display: none;\n    }\n\n    #form {\n        display: flex;\n        flex: auto;\n        flex-direction: row;\n        padding: 0 18px;\n        margin: 0;\n    }\n\n    #input {\n        display: flex;\n        flex: auto;\n        height: 40px;\n        padding: 0 8px;\n        font-size: 1rem;\n        overflow: hidden;\n        border: none;\n        border-top-left-radius: 5px;\n        border-bottom-left-radius: 5px;\n\n    }\n\n    #submit {\n        border-top-right-radius: 5px;\n        border-bottom-right-radius: 5px;\n        border: none;\n        border-left: 1px solid #333;\n        color: #333;\n        background: #fff;\n        width: 56px;\n        font-size: 1.8rem;\n    }\n\n    #icon {\n        color: #333;\n    } </style> <form id=\"form\" class=\"myuw-search-container\" onsubmit=\"$event.preventDefault(); submitSearch($event)\"> <input id=\"input\" name=\"myuw-search-input\" aria-label=\"\" type=\"text\" placeholder=\"\"> <button id=\"submit\" aria-label=\"\" type=\"submit\"> <i id=\"icon\" class=\"material-icons\"></i> </button> </form> ";

    class MyUWSearch extends HTMLElement {
        constructor() {
            super();

            // Create a shadowroot for this element
            this.attachShadow({mode: 'open'});

            // Append the custom HTML to the shadowroot
            this.shadowRoot.appendChild(MyUWSearch.template.content.cloneNode(true));
        }

        static get observedAttributes() {
            return [
                'input-label',
                'button-label',
                'icon'
            ];
        }

        /**
        *   Web component lifecycle hook to update changed properties
        */
        attributeChangedCallback(name, oldValue, newValue) {
            // Update the attribute internally
            this[name] = newValue;
            // Update the component
            this.updateComponent(name, newValue);
        }

        /**
        *   When component is first attached to the DOM,
        *   get its defined attributes and listen for
        *   scrolling
        */
        connectedCallback() {
            // Get all attributes
            this.icon           = this.getAttribute('icon') || 'search';
            this.inputLabel     = this.getAttribute('input-label') || 'Search';
            this.buttonLabel    = this.getAttribute('button-label') || 'Submit search';

            // Get elements to update
            this.$form      = this.shadowRoot.querySelector('form#form');
            this.$icon      = this.shadowRoot.querySelector('i#icon');
            this.$input     = this.shadowRoot.querySelector('input#input');
            this.$button    = this.shadowRoot.querySelector('button#submit');
            
            // Set icon and label values
            this.$icon.innerText = this.icon;
            this.$input.setAttribute('aria-label', this.inputLabel);
            this.$input.setAttribute('placeholder', this.inputLabel);
            this.$button.setAttribute('aria-label', this.buttonLabel);

            // Add click event listener for submit button
            
            this.$button.addEventListener('click', e => {
                this.submitSearch(e);
            });

            this.updateComponent();
        }

        /**
        *   Clean up event listeners if element is removed from the DOM
        */
        disconnectedCallback() {

        }

        /**
        *   Update the component state 
        */
        updateComponent() {
            
        }

        /**
         *  Submit search
         */
        submitSearch(event) {
            event.preventDefault();
            event.stopPropagation();
            if (this.callback && typeof this.callback === 'function') {
                this.callback( this.$input.value );
            }
        }
    }

    MyUWSearch.template = (function template(src) {
      const template = (document.createElement('template'));
      template.innerHTML = src;
      return template;
    })(tpl);

    window.customElements.define('myuw-search', MyUWSearch);

    exports.MyUWSearch = MyUWSearch;

    return exports;

}({}));
