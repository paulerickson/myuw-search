var MyUWSearch = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var tpl = "<style> @import url(https://fonts.googleapis.com/icon?family=Material+Icons);\n\n    :host,\n    myuw-search {\n        display: flex;\n        flex: auto;\n        border: var(--myuw-search-border, none);\n        border-radius: 5px;\n    }\n\n    :host([hidden]) {\n        display: none;\n    }\n\n    myuw-search {\n        border: var(--myuw-search-border, none);\n    }\n\n    #form {\n        display: flex;\n        flex: auto;\n        flex-direction: row;\n        margin: 0;\n    }\n\n    #input {\n        display: flex;\n        flex: auto;\n        height: 40px;\n        padding: 0 8px 0 12px;\n        font-size: 1rem;\n        overflow: hidden;\n        border: none;\n        border-top-left-radius: 3px;\n        border-bottom-left-radius: 3px;\n        margin: 0;\n    }\n\n    #submit {\n        padding: 0;\n        position: relative;\n        border-top-right-radius: 3px;\n        border-bottom-right-radius: 3px;\n        border: none;\n        border-left: 1px solid;\n        border-color: rgba(0,0,0,0.15);\n        color: #333;\n        background: #fff;\n        width: 56px;\n        height: 40px;\n        font-size: 1.8rem;\n        margin: 0;\n        cursor: pointer;\n        transition: background-color 0.2s ease-in-out;\n    }\n\n    #submit #icon {\n        width: 24px;\n        height: 24px;\n        position: absolute;\n        top: 8px;\n        left: 16px;\n    }\n\n    #submit:hover {\n        background-color: #ebeaea;\n    }\n\n    #toggle {\n        display: none;\n    }\n\n    #icon {\n        color: #333;\n    }\n    @media screen, \\0 all, \\\\0 screen {\n      @media (max-width: 600px) {\n        :host,\n        myuw-search {\n            border: none;\n        }\n        #form {\n            justify-content: flex-end;\n            padding: 0;\n            align-items: center;\n        }\n        #submit {\n            display: none;\n        }\n        #input {\n            width: 0;\n            max-width: 0;\n            margin: 0;\n            padding: 0;\n            height: 56px;\n            border-top-right-radius: 5px;\n            border-bottom-right-radius: 5px;\n            opacity: 0;\n            transition: opacity .4s cubic-bezier(.25, .8, .25, 1);\n        }\n        #toggle {\n            display: flex;\n            transition: background 0.2s cubic-bezier(.25, .8, .25, 1);\n            background: transparent;\n            border: none;\n            margin: 0 0 0 6px;\n            height: 42px;\n            width: 42px;\n            min-width: initial;\n            padding: 0;\n            min-width: 42px;\n            line-height: 24px;\n            border-radius: 50%;\n            cursor: pointer;\n            outline: none;\n            justify-content: center;\n\n        }\n        #toggle:hover {\n            background: var(--myuw-bar-button-hover, rgba(0,0,0,0.12));\n        }\n\n        #iconToggle {\n            color: var(--myuw-app-bar-color, #fff);\n            transition: background 0.2s cubic-bezier(.25, .8, .25, 1);\n            background: var(--myuw-bar-button-bg, transparent);\n            border-radius: 50%;\n            overflow: hidden;\n            position: relative;\n            height: 34px;\n            width: 34px;\n            line-height: 34px;\n            padding: 0;\n            margin: 0;\n        }\n        #form[expanded] {\n            position: absolute;\n            top: 3px;\n            left: 3px;\n            right: var(--search-mobile-origin);\n            margin-left: 0;\n            margin-right: 0;\n            width: auto;\n            border: var(--myuw-search-border, 1px solid rgba(0,0,0,0.5));\n            border-radius: 5px;\n        }\n        #form[expanded] #input {\n            opacity: 1;\n            width: 100%;\n            max-width: none;\n            padding: 0 16px;\n        }\n        #form[expanded] #toggle {\n            position: absolute;\n            right: 0;\n            margin: 0 6px;\n            background: transparent;\n        }\n        #form[expanded] #toggle:hover {\n            background: rgba(0,0,0,0.12);\n            opacity: 1;\n        }\n        #form[expanded] #iconToggle {\n            color: #000;\n            background: transparent;\n        }\n    }\n  } </style> <form id=\"form\" class=\"myuw-search-container\" onsubmit=\"$event.preventDefault(); submitSearch($event)\"> <button id=\"toggle\" aria-label=\"\" type=\"button\"> <i id=\"iconToggle\" class=\"material-icons\"></i> </button> <input id=\"input\" name=\"myuw-search-input\" aria-label=\"\" type=\"text\" placeholder=\"\"> <button id=\"submit\" aria-label=\"\" type=\"submit\"> <i id=\"icon\" class=\"material-icons\"></i> </button> </form> ";

  var MyUWSearch =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(MyUWSearch, _HTMLElement);

    function MyUWSearch() {
      var _this;

      _classCallCheck(this, MyUWSearch);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MyUWSearch).call(this)); // Create a shadowroot for this element

      _this.attachShadow({
        mode: 'open'
      }); // Append the custom HTML to the shadowroot


      _this.shadowRoot.appendChild(MyUWSearch.template.content.cloneNode(true));

      return _this;
    }

    _createClass(MyUWSearch, [{
      key: "attributeChangedCallback",

      /**
      *   Web component lifecycle hook to update changed properties
      */
      value: function attributeChangedCallback(name, oldValue, newValue) {
        // Update the attribute internally
        this[name] = newValue; // Update the component

        this.updateComponent(name, newValue);
      }
      /**
      *   When component is first attached to the DOM,
      *   get its defined attributes and listen for
      *   scrolling
      */

    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        // Get all attributes
        this.icon = this.getAttribute('icon') || 'search';
        this.inputLabel = this.getAttribute('input-label') || 'Search';
        this.buttonLabel = this.getAttribute('button-label') || 'Submit search'; // Get elements to update

        this.$form = this.shadowRoot.querySelector('form#form');
        this.$icon = this.shadowRoot.querySelector('i#icon');
        this.$input = this.shadowRoot.querySelector('input#input');
        this.$button = this.shadowRoot.querySelector('button#submit');
        this.$toggle = this.shadowRoot.querySelector('button#toggle');
        this.$toggleIcon = this.shadowRoot.querySelector('i#iconToggle'); // Set icon and label values

        this.$icon.innerText = this.icon;
        this.$toggleIcon.innerText = this.icon;
        this.$input.setAttribute('aria-label', this.inputLabel);
        this.$input.setAttribute('placeholder', this.inputLabel);
        this.$button.setAttribute('aria-label', this.buttonLabel);
        this.$toggle.setAttribute('aria-label', 'show search'); // Get viewport width and toggle button position
        // this.$cssWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        // this.$togglePosition = this.$toggle.getBoundingClientRect();
        // Add click event listeners for submit and toggle buttons

        this.$button.addEventListener('click', function (e) {
          _this2.submitSearch(e);
        });
        this.$toggle.addEventListener('click', function (e) {
          _this2.toggleSearch(e);
        }); // Listen for clicks outside the element

        document.addEventListener('click', function (e) {
          if (_this2.$form.hasAttribute('expanded')) {
            if (!e.target.closest('myuw-search')) {
              _this2.toggleSearch(e);
            }
          }
        });
      }
      /**
      *   Clean up event listeners if element is removed from the DOM
      */

    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {}
      /**
      *   Update the component state 
      */

    }, {
      key: "updateComponent",
      value: function updateComponent(attribute, value) {
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

    }, {
      key: "submitSearch",
      value: function submitSearch(event) {
        event.preventDefault();
        event.stopPropagation(); // Using `callback` property:

        if (this.callback && typeof this.callback === 'function') {
          this.callback(this.$input.value);
        } // Emitting a custom event:


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

    }, {
      key: "toggleSearch",
      value: function toggleSearch(event) {
        // Get viewport width and position of toggle button
        this.$cssWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        this.$togglePosition = this.$toggle.getBoundingClientRect(); // Get value for 'right' positioning of form anchor (minus width of button)

        var right = Math.floor(this.$cssWidth - this.$togglePosition.left - 42); // Set positioning

        this.$form.style.right = right; // Set icon for toggle button and expand form

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
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['input-label', 'button-label', 'icon'];
      }
    }]);

    return MyUWSearch;
  }(_wrapNativeSuper(HTMLElement));

  MyUWSearch.template = function template(src) {
    var template = document.createElement('template');
    template.innerHTML = src;
    return template;
  }(tpl);

  window.customElements.define('myuw-search', MyUWSearch);
  /**
   * Polyfill for supporting the CustomEvent constructor in IE9+
   * From: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
   */

  (function () {
    if (typeof window.CustomEvent === 'function') {
      return false;
    }

    function CustomEvent(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  })();

  exports.MyUWSearch = MyUWSearch;

  return exports;

}({}));
