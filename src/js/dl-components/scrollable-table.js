// (function(Modules) {
//   "use strict";

//   Modules.ScrollingTables = function() {
//     var _this = this;

//     this.start = function(component) {
//       this.$component = $(component);
//       this.$table = this.$component.find("table");

//       this.insertShadows();

//       this.$scrollableTable.on("scroll", this.toggleShadows);
//     };

//     this.insertShadows = function() {
//       _this.$table.wrap('<div class="fullscreen-scrollable-table"/>');

//       _this.$component.append(
//         '<div class="fullscreen-right-shadow visible" />'
//       );
//       _this.$component.prepend('<div class="fullscreen-left-shadow" />');

//       _this.$scrollableTable = _this.$component.find(
//         ".fullscreen-scrollable-table"
//       );
//     };

//     this.toggleShadows = function() {
//       _this.$component
//         .find(".fullscreen-right-shadow")
//         .toggleClass(
//           "visible",
//           _this.$scrollableTable.scrollLeft() <
//             _this.$table.width() - _this.$scrollableTable.width()
//         );
//       _this.$component
//         .find(".fullscreen-left-shadow")
//         .toggleClass(
//           "visible",
//           _this.$scrollableTable.scrollRight() <
//             _this.$table.width() - _this.$scrollableTable.width()
//         );

//       setTimeout(function() {
//         return _this.$component
//           .find(".fullscreen-right-shadow, .fullscreen-left-shadow")
//           .addClass("with-transition");
//       }, 3000);
//     };
//   };
// })(window.GOVUK.Modules);

import "../../govuk/vendor/polyfills/Function/prototype/bind";

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

export default ScrollableTables;
