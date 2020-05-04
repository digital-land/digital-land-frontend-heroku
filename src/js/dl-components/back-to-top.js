import '../../govuk/vendor/polyfills/Function/prototype/bind'

// Back to top module as seen in govuk-design-system
// https://github.com/alphagov/govuk-design-system/blob/master/src/javascripts/components/back-to-top.js
function BackToTop ($module) {
  this.$module = $module
}

BackToTop.prototype.init = function (params) {
  this.setupOptions(params)
  // Check if we can use Intersection Observers
  if (!('IntersectionObserver' in window)) {
    // If there's no support fallback to regular behaviour
    // Since JavaScript is enabled we can remove the default hidden state
    return this.$module.classList.remove('back-to-top--hidden')
  }

  var $footer = document.querySelector(this.footer_selector)
  var $subNav = document.querySelector(this.head_selector)

  // Check if there is anything to observe
  if (!$footer || !$subNav) {
    return
  }

  var $subNavStyles = document.defaultView.getComputedStyle($subNav)
  if ($subNavStyles.getPropertyValue('margin-bottom').indexOf('px')) {
    if (parseInt($subNavStyles.getPropertyValue('margin-bottom').replace('px', '')) < 100) {
      $subNav.style.marginBottom = '100px'
    }
  }

  var footerIsIntersecting = false
  var subNavIsIntersecting = false
  var subNavIntersectionRatio = 0

  var observer = new window.IntersectionObserver(function (entries) {
    // Find the elements we care about from the entries
    var footerEntry = entries.find(function (entry) {
      return entry.target === $footer
    })
    var subNavEntry = entries.find(function (entry) {
      return entry.target === $subNav
    })

    // If there is an entry this means the element has changed so lets check if it's intersecting.
    if (footerEntry) {
      footerIsIntersecting = footerEntry.isIntersecting
    }
    if (subNavEntry) {
      subNavIsIntersecting = subNavEntry.isIntersecting
      subNavIntersectionRatio = subNavEntry.intersectionRatio
    }

    // If the subnav or the footer not visible then fix the back to top link to follow the user
    if (subNavIsIntersecting || footerIsIntersecting) {
      this.$module.classList.remove('back-to-top--fixed')
      if (this.classes) {
        this.$module.classList.remove(this.classes)
      }
    } else {
      this.$module.classList.add('back-to-top--fixed')
      if (this.classes) {
        this.$module.classList.add(this.classes)
      }
    }

    // If the subnav is visible but you can see it all at once, then a back to top link is likely not as useful.
    // We hide the link but make it focusable for screen readers users who might still find it useful.
    if (subNavIsIntersecting && subNavIntersectionRatio === 1) {
      this.$module.classList.add('back-to-top--hidden')
    } else {
      this.$module.classList.remove('back-to-top--hidden')
    }
  }.bind(this))

  observer.observe($footer)
  observer.observe($subNav)
}

BackToTop.prototype.passedBottom = function ($el) {
  var $elPos = $el.getClientRects()
  var viewportBottom = window.scrollY + window.innerHeight
  return $elPos < viewportBottom
}

BackToTop.prototype.setupOptions = function (params) {
  params = params || {}
  this.footer_selector = params.footer_selector || '.app-footer'
  this.head_selector = params.head_selector || '.app-subnav'
  this.classes = params.classes || ''
}

export default BackToTop
