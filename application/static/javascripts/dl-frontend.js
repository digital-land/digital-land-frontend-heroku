(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('DLFrontend', ['exports'], factory) :
  (global = global || self, factory(global.DLFrontend = {}));
}(this, function (exports) { 'use strict';

  (function(undefined$1) {

  // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
  var detect = (
    // In IE8, defineProperty could only act on DOM elements, so full support
    // for the feature requires the ability to set a property on an arbitrary object
    'defineProperty' in Object && (function() {
    	try {
    		var a = {};
    		Object.defineProperty(a, 'test', {value:42});
    		return true;
    	} catch(e) {
    		return false
    	}
    }())
  );

  if (detect) return

  // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always
  (function (nativeDefineProperty) {

  	var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
  	var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
  	var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

  	Object.defineProperty = function defineProperty(object, property, descriptor) {

  		// Where native support exists, assume it
  		if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
  			return nativeDefineProperty(object, property, descriptor);
  		}

  		if (object === null || !(object instanceof Object || typeof object === 'object')) {
  			throw new TypeError('Object.defineProperty called on non-object');
  		}

  		if (!(descriptor instanceof Object)) {
  			throw new TypeError('Property description must be an object');
  		}

  		var propertyString = String(property);
  		var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;
  		var getterType = 'get' in descriptor && typeof descriptor.get;
  		var setterType = 'set' in descriptor && typeof descriptor.set;

  		// handle descriptor.get
  		if (getterType) {
  			if (getterType !== 'function') {
  				throw new TypeError('Getter must be a function');
  			}
  			if (!supportsAccessors) {
  				throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
  			}
  			if (hasValueOrWritable) {
  				throw new TypeError(ERR_VALUE_ACCESSORS);
  			}
  			Object.__defineGetter__.call(object, propertyString, descriptor.get);
  		} else {
  			object[propertyString] = descriptor.value;
  		}

  		// handle descriptor.set
  		if (setterType) {
  			if (setterType !== 'function') {
  				throw new TypeError('Setter must be a function');
  			}
  			if (!supportsAccessors) {
  				throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
  			}
  			if (hasValueOrWritable) {
  				throw new TypeError(ERR_VALUE_ACCESSORS);
  			}
  			Object.__defineSetter__.call(object, propertyString, descriptor.set);
  		}

  		// OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above
  		if ('value' in descriptor) {
  			object[propertyString] = descriptor.value;
  		}

  		return object;
  	};
  }(Object.defineProperty));
  })
  .call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  (function(undefined$1) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
    var detect = 'bind' in Function.prototype;

    if (detect) return

    // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always
    Object.defineProperty(Function.prototype, 'bind', {
        value: function bind(that) { // .length is 1
            // add necessary es5-shim utilities
            var $Array = Array;
            var $Object = Object;
            var ObjectPrototype = $Object.prototype;
            var ArrayPrototype = $Array.prototype;
            var Empty = function Empty() {};
            var to_string = ObjectPrototype.toString;
            var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
            var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, tryFunctionObject = function tryFunctionObject(value) { try { fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]'; isCallable = function isCallable(value) { if (typeof value !== 'function') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };
            var array_slice = ArrayPrototype.slice;
            var array_concat = ArrayPrototype.concat;
            var array_push = ArrayPrototype.push;
            var max = Math.max;
            // /add necessary es5-shim utilities

            // 1. Let Target be the this value.
            var target = this;
            // 2. If IsCallable(Target) is false, throw a TypeError exception.
            if (!isCallable(target)) {
                throw new TypeError('Function.prototype.bind called on incompatible ' + target);
            }
            // 3. Let A be a new (possibly empty) internal list of all of the
            //   argument values provided after thisArg (arg1, arg2 etc), in order.
            // XXX slicedArgs will stand in for "A" if used
            var args = array_slice.call(arguments, 1); // for normal call
            // 4. Let F be a new native ECMAScript object.
            // 11. Set the [[Prototype]] internal property of F to the standard
            //   built-in Function prototype object as specified in 15.3.3.1.
            // 12. Set the [[Call]] internal property of F as described in
            //   15.3.4.5.1.
            // 13. Set the [[Construct]] internal property of F as described in
            //   15.3.4.5.2.
            // 14. Set the [[HasInstance]] internal property of F as described in
            //   15.3.4.5.3.
            var bound;
            var binder = function () {

                if (this instanceof bound) {
                    // 15.3.4.5.2 [[Construct]]
                    // When the [[Construct]] internal method of a function object,
                    // F that was created using the bind function is called with a
                    // list of arguments ExtraArgs, the following steps are taken:
                    // 1. Let target be the value of F's [[TargetFunction]]
                    //   internal property.
                    // 2. If target has no [[Construct]] internal method, a
                    //   TypeError exception is thrown.
                    // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Construct]] internal
                    //   method of target providing args as the arguments.

                    var result = target.apply(
                        this,
                        array_concat.call(args, array_slice.call(arguments))
                    );
                    if ($Object(result) === result) {
                        return result;
                    }
                    return this;

                } else {
                    // 15.3.4.5.1 [[Call]]
                    // When the [[Call]] internal method of a function object, F,
                    // which was created using the bind function is called with a
                    // this value and a list of arguments ExtraArgs, the following
                    // steps are taken:
                    // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                    //   property.
                    // 2. Let boundThis be the value of F's [[BoundThis]] internal
                    //   property.
                    // 3. Let target be the value of F's [[TargetFunction]] internal
                    //   property.
                    // 4. Let args be a new list containing the same values as the
                    //   list boundArgs in the same order followed by the same
                    //   values as the list ExtraArgs in the same order.
                    // 5. Return the result of calling the [[Call]] internal method
                    //   of target providing boundThis as the this value and
                    //   providing args as the arguments.

                    // equiv: target.call(this, ...boundArgs, ...args)
                    return target.apply(
                        that,
                        array_concat.call(args, array_slice.call(arguments))
                    );

                }

            };

            // 15. If the [[Class]] internal property of Target is "Function", then
            //     a. Let L be the length property of Target minus the length of A.
            //     b. Set the length own property of F to either 0 or L, whichever is
            //       larger.
            // 16. Else set the length own property of F to 0.

            var boundLength = max(0, target.length - args.length);

            // 17. Set the attributes of the length own property of F to the values
            //   specified in 15.3.5.1.
            var boundArgs = [];
            for (var i = 0; i < boundLength; i++) {
                array_push.call(boundArgs, '$' + i);
            }

            // XXX Build a dynamic function with desired amount of arguments is the only
            // way to set the length property of a function.
            // In environments where Content Security Policies enabled (Chrome extensions,
            // for ex.) all use of eval or Function costructor throws an exception.
            // However in all of these environments Function.prototype.bind exists
            // and so this code will never be executed.
            bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

            if (target.prototype) {
                Empty.prototype = target.prototype;
                bound.prototype = new Empty();
                // Clean up dangling references.
                Empty.prototype = null;
            }

            // TODO
            // 18. Set the [[Extensible]] internal property of F to true.

            // TODO
            // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
            // 20. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
            //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
            //   false.
            // 21. Call the [[DefineOwnProperty]] internal method of F with
            //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
            //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
            //   and false.

            // TODO
            // NOTE Function objects created using Function.prototype.bind do not
            // have a prototype property or the [[Code]], [[FormalParameters]], and
            // [[Scope]] internal properties.
            // XXX can't delete prototype in pure-js.

            // 22. Return F.
            return bound;
        }
    });
  })
  .call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});

  // Back to top module as seen in govuk-design-system
  // https://github.com/alphagov/govuk-design-system/blob/master/src/javascripts/components/back-to-top.js
  function BackToTop ($module) {
    this.$module = $module;
  }

  BackToTop.prototype.init = function (params) {
    this.setupOptions(params);
    // Check if we can use Intersection Observers
    if (!('IntersectionObserver' in window)) {
      // If there's no support fallback to regular behaviour
      // Since JavaScript is enabled we can remove the default hidden state
      return this.$module.classList.remove('back-to-top--hidden')
    }

    var $footer = document.querySelector(this.footer_selector);
    var $subNav = document.querySelector(this.head_selector);

    // Check if there is anything to observe
    if (!$footer || !$subNav) {
      return
    }

    var footerIsIntersecting = false;
    var subNavIsIntersecting = false;
    var subNavIntersectionRatio = 0;

    var observer = new window.IntersectionObserver(function (entries) {
      // Find the elements we care about from the entries
      var footerEntry = entries.find(function (entry) {
        return entry.target === $footer
      });
      var subNavEntry = entries.find(function (entry) {
        return entry.target === $subNav
      });

      // If there is an entry this means the element has changed so lets check if it's intersecting.
      if (footerEntry) {
        footerIsIntersecting = footerEntry.isIntersecting;
      }
      if (subNavEntry) {
        subNavIsIntersecting = subNavEntry.isIntersecting;
        subNavIntersectionRatio = subNavEntry.intersectionRatio;
      }

      // If the subnav or the footer not visible then fix the back to top link to follow the user
      if (subNavIsIntersecting || footerIsIntersecting) {
        this.$module.classList.remove('back-to-top--fixed', this.classes);
      } else {
        this.$module.classList.add('back-to-top--fixed', this.classes);
      }

      // If the subnav is visible but you can see it all at once, then a back to top link is likely not as useful.
      // We hide the link but make it focusable for screen readers users who might still find it useful.
      if (subNavIsIntersecting && subNavIntersectionRatio === 1) {
        this.$module.classList.add('back-to-top--hidden');
      } else {
        this.$module.classList.remove('back-to-top--hidden');
      }
    }.bind(this));

    observer.observe($footer);
    observer.observe($subNav);
  };

  BackToTop.prototype.setupOptions = function(params) {
    params = params || {};
    this.footer_selector = params.footer_selector || ".app-footer";
    this.head_selector = params.head_selector || ".app-subnav";
    this.classes = params.classes || "";
  };

  // ====================================
  // Filter checkboxes module
  // ====================================

  // to do (see https://www.gov.uk/search/all?keywords=publications&content_purpose_supergroup%5B%5D=services&organisations%5B%5D=academy-for-social-justice&order=relevance)
  // - aria-describedby, hidden span that counts how many options are showing and how many of them are selected
  // - aria-controls, indicate that it controls the list of checkboxes
  // - hide textbox when no js

  function FilterCheckboxes($module) {
    this.$module = $module;
    this.$textbox = $module.querySelector('.filter-group__auto-filter__input');
    this.checkboxArr = [...$module.querySelectorAll(".govuk-checkboxes__item")];
  }

  FilterCheckboxes.prototype.init = function() {
    var $module = this.$module;
    var $checkboxes = this.checkboxArr;

    // if no checkboxes then return
    if (!$checkboxes) {
      return
    }

    // returns true is the item has been hidden with display:none
    this.isDisplayNone = function(el) {
      var style = window.getComputedStyle(el);
      return ((style.display === 'none') || (style.visibility === 'hidden'))
    };

    // returns true if the item's checkbox is checked
    this.isItemChecked = function(el) {
      var chbx = el.querySelector("input");
      return chbx.checked
    };

    this.ariaDescription = $module.querySelector('.filter-group__auto-filter__desc');
    // To do: check it exists
    // set initial aria message
    var boundUpdateAriaDescribedBy = this.updateAriaDescribedBy.bind(this);
    boundUpdateAriaDescribedBy();

    // Bind event changes to the textarea
    var boundInputEvents = this.bindInputEvents.bind(this);
    boundInputEvents();
  };

  FilterCheckboxes.prototype.getCheckboxInput = function(el) {
    return el.querySelector("input")
  };

  FilterCheckboxes.prototype.bindInputEvents = function() {
    var $textbox = this.$textbox;
    var checkboxArr = this.checkboxArr.map(this.getCheckboxInput);

    $textbox.addEventListener('input', this.filterCheckboxes.bind(this));

    var boundUpdateAriaDescribedBy = this.updateAriaDescribedBy.bind(this);
    checkboxArr.forEach(chbxEl => chbxEl.addEventListener('change', boundUpdateAriaDescribedBy));
  };

  FilterCheckboxes.prototype.filterCheckboxes = function() {
    var $textbox = this.$textbox;
    var boundFilterCheckboxesArr = this.filterCheckboxesArr.bind(this);
    // filter the array of checkboxes
    var reducedArr = boundFilterCheckboxesArr($textbox.value);

    var boundUpdateAriaDescribedBy = this.updateAriaDescribedBy.bind(this);

    // show only those checkboxes remaining
    var boundDisplayMatchingCheckboxes = this.displayMatchingCheckboxes.bind(this);
    boundDisplayMatchingCheckboxes(reducedArr, boundUpdateAriaDescribedBy);

  };

  FilterCheckboxes.prototype.filterCheckboxesArr = function(query) {
    var checkboxArr = this.checkboxArr;
    return checkboxArr.filter(function(el) {
      const checkbox = el.querySelector('label');
      return checkbox.textContent.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
  };

  FilterCheckboxes.prototype.displayMatchingCheckboxes = function(ckbxArr, cb) {
    // hide all
    this.checkboxArr.forEach((ckbx) => ckbx.style.display = 'none');
    // re show those in filtered array
    ckbxArr.forEach((ckbx) => ckbx.style.display = 'block');

    if(cb) {
      cb();
    }
  };

  FilterCheckboxes.prototype.updateAriaDescribedBy = function() {
    var checkboxArr = this.checkboxArr;
    var displayedCheckboxes = checkboxArr.filter(chbx => !this.isDisplayNone(chbx));
    var checkedAndDisplayed = displayedCheckboxes.filter(chbx => this.isItemChecked(chbx));

    var boundGenerateAriaMessage = this.generateAriaMessage.bind(this);
    boundGenerateAriaMessage(displayedCheckboxes.length, checkedAndDisplayed.length);
  };

  FilterCheckboxes.prototype.generateAriaMessage = function(optionCount, selectedCount) {
    var ariaEl = this.ariaDescription;
    var optionStr = ariaEl.dataset.single;
    if(optionCount > 1) {
      optionStr = ariaEl.dataset.multiple;
    }

    ariaEl.textContent = optionCount + " " + optionStr + ", " + selectedCount + " " + ariaEl.dataset.selected;
  };

  // ================================
  // Selected counts for filters
  // ================================

  function SelectedCounter($module) {
    this.$module = $module;
    this.$fieldset = $module.querySelector("fieldset");
    this.$inputs = this.$fieldset.querySelectorAll("input");
  }

  SelectedCounter.prototype.init = function() {
    var $module = this.$module;
    var $inputs = this.$inputs;

    // if no inputs then return
    if (!$inputs) {
      return
    }

    //
    var boundFetchCountElement = this.fetchCountElement.bind(this);
    this.countMessage = boundFetchCountElement();

    // if current count is 0 hide the message
    this.message_is_hidden = false;
    if(this.currentCount == 0) {
      this.hideCountMessage();
    }

    // Bind event changes to the textarea
    var boundChangeEvents = this.bindChangeEvents.bind(this);
    boundChangeEvents();
  };

  SelectedCounter.prototype.fetchCountElement = function() {
    var $module = this.$module;
    var countMessage = $module.querySelector(".filter-group__selected-text");

    // if the count message doesn;t exist, create one
    if(!countMessage) {
      countMessage = this.createCountElement();
    }

    this.countElement = countMessage.querySelector(".filter-group__selected-text__count");
    this.currentCount = parseInt(this.countElement.textContent);

    return countMessage
  };

  SelectedCounter.prototype.createCountElement = function() {
    var $module = this.$module;
    var $summary = $module.querySelector(".filter-group__summary");
    var firstIcon = $summary.querySelector("svg");

    var countMessage = document.createElement("span");
    countMessage.classList.add("filter-group__selected-text");
    countMessage.textContent = " selected";
    firstIcon.insertAdjacentElement('beforebegin', countMessage);

    countMessage.insertAdjacentHTML('afterbegin', '<span class="filter-group__selected-text__count">0</span>' );
    
    return countMessage
  };

  SelectedCounter.prototype.bindChangeEvents = function() {
    var $inputs = this.$inputs;
    //console.log(this)
    $inputs.forEach(input => {
      input.addEventListener('change', this.updateCount.bind(this));
    });
  };

  SelectedCounter.prototype.updateCount = function() {
    var $fieldset = this.$fieldset;
    var count = $fieldset.querySelectorAll("input:checked").length;

    // if 0 hide
    if(count == 0) {
      this.countElement.textContent = 0;
      this.hideCountMessage();
    } else if (count != this.currentCount) {
      // if changed update
      this.countElement.textContent = count;
      this.showCountMessage();
    }
    // if same, do nothing ----
    
    this.currentCount = count;
  };

  SelectedCounter.prototype.hideCountMessage = function() {
    this.countMessage.classList.add("govuk-visually-hidden");
    this.message_is_hidden = true;
  };

  SelectedCounter.prototype.showCountMessage = function() {
    this.countMessage.classList.remove("govuk-visually-hidden");
    this.message_is_hidden = false;
  };

  // (function(Modules) {

  function ScrollableTables($module) {
    this.$module = $module;
  }

  ScrollableTables.prototype.init = function() {
    this.data_table = this.$module.querySelector("table");

    // might be worth adding the shadows separately
    this.left_shadow = this.$module.querySelector(".data-table-left-shadow");
    this.right_shadow = this.$module.querySelector(".data-table-right-shadow");

    this.table_viewer = this.$module.querySelector(".wide-table");
    this.table_viewer.addEventListener("scroll", this.toggleShadows.bind(this));

    // trigger toggleShadow for set up
    this.toggleShadows();
  };

  ScrollableTables.prototype.toggleShadows = function() {
    function scrolledRight(containedEl, viewerEl) {
      return (
        containedEl.offsetWidth - (viewerEl.scrollLeft + viewerEl.offsetWidth)
      );
    }

    this.left_shadow.classList.toggle(
      "visible",
      scrolledRight(this.data_table, this.table_viewer) <
        this.data_table.offsetWidth - this.table_viewer.offsetWidth
    );

    this.right_shadow.classList.toggle(
      "visible",
      this.table_viewer.scrollLeft <
        this.data_table.offsetWidth - this.table_viewer.offsetWidth
    );

    setTimeout(
      function() {
        this.left_shadow.classList.add("with-transition");
        this.right_shadow.classList.add("with-transition");
      }.bind(this),
      2000
    );
  };

  function LinkableTable($module) {
    this.$module = $module;
  }

  LinkableTable.prototype.init = function(params) {
    this.setupOptions(params);

    this.data_table = this.$module.querySelector("table");
    this.data_table_head = this.data_table.querySelector("thead tr");
    this.data_table_body = this.data_table.querySelector("tbody");
    this.rows = this.data_table.querySelectorAll("tbody tr");

    this.addLinkColumn();
    // do I need to delay this?
    this.initialSelected();
  };

  LinkableTable.prototype.setupOptions = function(params) {
    params = params || {};
    this.idPrefix = params.idPrefix || "table-x-";
  };

  LinkableTable.prototype.addLinkColumn = function() {
    const first_cell = this.data_table_head.querySelector("th");
    this.data_table_head.insertBefore(
      this.createCell({ type: "head" }),
      first_cell
    );
    var rows = this.getTableRowsArray();
    rows.forEach((row, idx) => {
      console.log(idx);
      idx = idx + 1;
      var href = "#" + this.idPrefix + idx.toString();
      if (row.id) {
        href = "#" + row.id;
      }
      this.addCellToRow(
        row,
        this.createCell({ linkIdx: idx.toString(), linkHref: href })
      );
    });
  };

  LinkableTable.prototype.createCell = function(params) {
    params = params || {};
    var boundLinkToRowHandler = this.linkToRowHandler.bind(this);
    var cell =
      params.type == "head"
        ? document.createElement("th")
        : document.createElement("td");
    cell.classList.add("data-table__row-link");

    if (params.linkIdx) {
      var _link = document.createElement("a");
      _link.setAttribute("href", params.linkHref);
      _link.textContent = "#" + params.linkIdx;
      _link.addEventListener("click", boundLinkToRowHandler);
      console.log(_link);
      cell.append(_link);
    }
    return cell;
  };

  LinkableTable.prototype.linkToRowHandler = function(e) {
    //e.preventDefault();
    this.deselectRows();
    this.selectRow(e.currentTarget.closest("tr"));
    console.log(e.currentTarget);
  };

  LinkableTable.prototype.addCellToRow = function(row, cell) {
    const first_cell = row.querySelector("td");
    row.insertBefore(cell, first_cell);
  };

  LinkableTable.prototype.getTableRowsArray = function() {
    var rows = [];
    var trs = this.data_table_body.querySelectorAll("tr");
    console.log(trs);
    for (var i = 0; i < trs.length; i++) {
      rows.push(trs[i]);
    }
    return rows;
  };

  LinkableTable.prototype.deselectRows = function() {
    this.rows.forEach(row => {
      row.classList.remove("data-table__row-selected");
    });
  };

  LinkableTable.prototype.selectRow = function(row) {
    row.classList.add("data-table__row-selected");
  };

  LinkableTable.prototype.highlightHashed = function(hash) {
    var hashless_hash = hash.replace("#", "");

    if (hash.includes(this.idPrefix)) {
      const link = document.querySelector(`[href='${hash}']`);
      const row = link.closest("tr");
      this.selectRow(row);
      row.scrollIntoView({ block: "center" });
    } else if (document.getElementById(hashless_hash)) {
      // make sure element with id from hash is inside the table
      var el = document.getElementById(hashless_hash);
      if (this.data_table_body.contains(el)) {
        this.selectRow(el);
      }
    }
  };

  LinkableTable.prototype.hashChangeHandler = function() {
    this.deselectRows();
    this.highlightHashed(window.location.hash);
  };

  LinkableTable.prototype.initialSelected = function() {
    if (window.location.hash) {
      this.highlightHashed(window.location.hash);
    }

    // add event listener for URL hash changes
    const boundHashChangeHandler = this.hashChangeHandler.bind(this);
    window.addEventListener("hashchange", boundHashChangeHandler);
  };

  exports.BackToTop = BackToTop;
  exports.FilterCheckboxes = FilterCheckboxes;
  exports.LinkableTable = LinkableTable;
  exports.ScrollableTables = ScrollableTables;
  exports.SelectedCounter = SelectedCounter;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
