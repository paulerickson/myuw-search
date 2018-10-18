var tpl = "<style> @import url(https://fonts.googleapis.com/icon?family=Material+Icons);\n\n    :host,\n    myuw-search {\n        display: flex;\n        flex: auto;\n        border: var(--myuw-search-border, none);\n        border-radius: 5px;\n    }\n\n    :host([hidden]) {\n        display: none;\n    }\n\n    myuw-search {\n        border: var(--myuw-search-border, none);\n    }\n\n    #form {\n        display: flex;\n        flex: auto;\n        flex-direction: row;\n        margin: 0;\n    }\n\n    #input {\n        display: flex;\n        flex: auto;\n        height: 40px;\n        padding: 0 8px 0 12px;\n        font-size: 1rem;\n        overflow: hidden;\n        border: none;\n        border-top-left-radius: 3px;\n        border-bottom-left-radius: 3px;\n        margin: 0;\n    }\n\n    #submit {\n        padding: 0;\n        position: relative;\n        border-top-right-radius: 3px;\n        border-bottom-right-radius: 3px;\n        border: none;\n        border-left: 1px solid;\n        border-color: rgba(0,0,0,0.15);\n        color: #333;\n        background: #fff;\n        width: 56px;\n        height: 40px;\n        font-size: 1.8rem;\n        margin: 0;\n        cursor: pointer;\n        transition: background-color 0.2s ease-in-out;\n    }\n\n    #submit #icon {\n        width: 24px;\n        height: 24px;\n        position: absolute;\n        top: 8px;\n        left: 16px;\n    }\n\n    #submit:hover {\n        background-color: #ebeaea;\n    }\n\n    #toggle {\n        display: none;\n    }\n\n    #icon {\n        color: #333;\n    }\n    @media (max-width: 600px) {\n        :host,\n        myuw-search {\n            border: none;\n        }\n        #form {\n            justify-content: flex-end;\n            padding: 0;\n            align-items: center;\n        }\n        #submit {\n            display: none;\n        }\n        #input {\n            width: 0;\n            max-width: 0;\n            margin: 0;\n            padding: 0;\n            height: 56px;\n            border-top-right-radius: 5px;\n            border-bottom-right-radius: 5px;\n            opacity: 0;\n            transition: opacity .4s cubic-bezier(.25, .8, .25, 1);\n        }\n        #toggle {\n            display: flex;\n            transition: background 0.2s cubic-bezier(.25, .8, .25, 1);\n            background: transparent;\n            border: none;\n            margin: 0 0 0 6px;\n            height: 42px;\n            width: 42px;\n            min-width: initial;\n            padding: 0;\n            min-width: 42px;\n            line-height: 24px;\n            border-radius: 50%;\n            cursor: pointer;\n            outline: none;\n            justify-content: center;\n\n        }\n        #toggle:hover {\n            background: var(--myuw-bar-button-hover, rgba(0,0,0,0.12));\n        }\n\n        #iconToggle {\n            color: var(--myuw-app-bar-color, #fff);\n            transition: background 0.2s cubic-bezier(.25, .8, .25, 1);\n            background: var(--myuw-bar-button-bg, transparent);\n            border-radius: 50%;\n            overflow: hidden;\n            position: relative;\n            height: 34px;\n            width: 34px;\n            line-height: 34px;\n            padding: 0;\n            margin: 0;\n        }\n        #form[expanded] {\n            position: absolute;\n            top: 3px;\n            left: 3px;\n            right: var(--search-mobile-origin);\n            margin-left: 0;\n            margin-right: 0;\n            width: auto;\n            border: var(--myuw-search-border, 1px solid rgba(0,0,0,0.5));\n            border-radius: 5px;\n        }\n        #form[expanded] #input {\n            opacity: 1;\n            width: 100%;\n            max-width: none;\n            padding: 0 16px;\n        }\n        #form[expanded] #toggle {\n            position: absolute;\n            right: 0;\n            margin: 0 6px;\n            background: transparent;\n        }\n        #form[expanded] #toggle:hover {\n            background: rgba(0,0,0,0.12);\n            opacity: 1;\n        }\n        #form[expanded] #iconToggle {\n            color: #000;\n            background: transparent;\n        }\n    } </style> <form id=\"form\" class=\"myuw-search-container\" onsubmit=\"$event.preventDefault(); submitSearch($event)\"> <button id=\"toggle\" aria-label=\"\" type=\"button\"> <i id=\"iconToggle\" class=\"material-icons\"></i> </button> <input id=\"input\" name=\"myuw-search-input\" aria-label=\"\" type=\"text\" placeholder=\"\"> <button id=\"submit\" aria-label=\"\" type=\"submit\"> <i id=\"icon\" class=\"material-icons\"></i> </button> </form> ";

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
        this.$form          = this.shadowRoot.querySelector('form#form');
        this.$icon          = this.shadowRoot.querySelector('i#icon');
        this.$input         = this.shadowRoot.querySelector('input#input');
        this.$button        = this.shadowRoot.querySelector('button#submit');
        this.$toggle        = this.shadowRoot.querySelector('button#toggle');
        this.$toggleIcon    = this.shadowRoot.querySelector('i#iconToggle');
        
        // Set icon and label values
        this.$icon.innerText = this.icon;
        this.$toggleIcon.innerText = this.icon;
        this.$input.setAttribute('aria-label', this.inputLabel);
        this.$input.setAttribute('placeholder', this.inputLabel);
        this.$button.setAttribute('aria-label', this.buttonLabel);
        this.$toggle.setAttribute('aria-label', 'show search');

        // Get viewport width and toggle button position
        // this.$cssWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        // this.$togglePosition = this.$toggle.getBoundingClientRect();

        // Add click event listeners for submit and toggle buttons
        this.$button.addEventListener('click', e => {
            this.submitSearch(e);
        });
        
        this.$toggle.addEventListener('click', e => {
            this.toggleSearch(e);
        });

        // Listen for clicks outside the element
        document.addEventListener('click', e => {
            if (this.$form.hasAttribute('expanded')) {
                if (!e.target.closest('myuw-search')) {
                    this.toggleSearch(e);
                }
            }
        });
    }

    /**
    *   Clean up event listeners if element is removed from the DOM
    */
    disconnectedCallback() {

    }

    /**
    *   Update the component state 
    */
    updateComponent(attribute, value) {
        switch (attribute) {
            case 'input-label':
                if (this.$input) {
                    this.$input.setAttribute('placeholder', value);    
                }
                break;
            case 'button-label':
                if (this.$button) {
                    this.$button.setAttribute('aria-label', value);    
                }
                break;
            case 'icon':
                if (this.$icon) {
                    this.$icon.innerText = value;
                }
                break;
            default:
                break;
        }
    }

    /**
     *  Submit search
     */
    submitSearch(event) {
        event.preventDefault();
        event.stopPropagation();

        // Using `callback` property:
        if (this.callback && typeof this.callback === 'function') {
            this.callback(this.$input.value);
        }

        // Emitting a custom event:
        var customEvent = new CustomEvent('myuw-search', {
            bubbles: true,
            detail: {
                value: this.$input.value
            }
        });
        this.dispatchEvent(customEvent);
    }

    /**
     * (MOBILE-ONLY) Display the search bar
     */
    toggleSearch(event) {
        // Get viewport width and position of toggle button
        this.$cssWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        this.$togglePosition = this.$toggle.getBoundingClientRect();

        // Get value for 'right' positioning of form anchor (minus width of button)
        var right = Math.floor(this.$cssWidth - this.$togglePosition.left - 42);

        // Set positioning
        this.$form.style.right = right;

        // Set icon for toggle button and expand form
        if (this.$form.hasAttribute('expanded')) {
            this.$form.removeAttribute('expanded');
            this.$toggleIcon.innerText = this.icon;
            this.$toggle.setAttribute('aria-label', 'show search');
        } else {
            this.$form.setAttribute('expanded', 'true');
            this.$toggleIcon.innerText = 'arrow_forward';
            this.$toggle.setAttribute('aria-label', 'close search');
        }
    }
}

MyUWSearch.template = (function template(src) {
  const template = (document.createElement('template'));
  template.innerHTML = src;
  return template;
})(tpl);

window.customElements.define('myuw-search', MyUWSearch);

/**
 * Polyfill for supporting the CustomEvent constructor in IE9+
 * From: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */
(function () {
    if (typeof window.CustomEvent === 'function') {
        return false;
    }

    function CustomEvent (event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

export { MyUWSearch };
