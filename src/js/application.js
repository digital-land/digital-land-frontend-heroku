
// Needs to come after GOV.UK js because makes use of:
// 	* 'govuk-frontend/govuk/vendor/polyfills/Function/prototype/bind'
// 	* 'govuk-frontend/govuk/common' {nodeListForEach}

function nodeListForEach (nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback)
  }
  for (var i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes)
  }
}

// Back to top module as seen in govuk-design-system
// https://github.com/alphagov/govuk-design-system/blob/master/src/javascripts/components/back-to-top.js
function BackToTop ($module, options) {
  this.$module = $module
  this.$observedElement = options.$observedElement
  this.intersectionRatio = 0
}

BackToTop.prototype.init = function () {
  var $observedElement = this.$observedElement

  // If there's no element for the back to top to follow, exit early.
  if (!$observedElement) {
    return
  }

  if (!('IntersectionObserver' in window)) {
    // If there's no support fallback to regular sticky behaviour
    return this.update()
  }

  // Create new IntersectionObserver
  var observer = new window.IntersectionObserver(function (entries) {
    // Available data when an intersection happens
    // Back to top visibility
    // Element enters the viewport
    if (entries[0].intersectionRatio !== 0) {
      // How much of the element is visible
      this.intersectionRatio = entries[0].intersectionRatio
    // Element leaves the viewport
    } else {
      this.intersectionRatio = 0
    }
    this.update()
  }.bind(this), {
    // Call the observer, when the element enters the viewport,
    // when 25%, 50%, 75% and the whole element are visible
    threshold: [0, 0.25, 0.5, 0.75, 1]
  })

  observer.observe($observedElement)
}

BackToTop.prototype.update = function () {
  var thresholdPercent = (this.intersectionRatio * 100)

  if (thresholdPercent === 100) {
    this.hide()
  } else if (thresholdPercent < 90) {
    this.show()
  }
}

BackToTop.prototype.hide = function () {
  this.$module.classList.add('app-back-to-top--hidden')
}

BackToTop.prototype.show = function () {
  this.$module.classList.remove('app-back-to-top--hidden')
}
