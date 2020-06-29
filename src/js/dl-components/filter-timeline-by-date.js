import '../../govuk/vendor/polyfills/Function/prototype/bind'
import { convertNodeListToArray } from '../helpers/nodelist_to_array'

// Back to top module as seen in govuk-design-system
// https://github.com/alphagov/collections/blob/e1f3c74facd889426d24ac730ed0057aa64e2801/app/assets/javascripts/organisation-list-filter.js
function FilterTimelineByDate ($module) {
  this.$module = $module
  this.filterTimeout = null
  this.$statusArea = $module.querySelector('.filter-timeline__status-area')
  this.filterObj = {
    year: '',
    month: '',
    day: ''
  }
}

FilterTimelineByDate.prototype.init = function (params) {
  const that = this
  this.setupOptions(params)
  // get timeline to filter
  this.getTimeline()

  // get the input fields
  this.$inputs = this.getInputs()
  const boundFilterViaTimeout = this.filterViaTimeout.bind(this)
  this.$inputs.forEach(function (input) {
    input.addEventListener('keyup', boundFilterViaTimeout)
  })

  const $resetBtn = this.$statusArea.querySelector('.filter-timeline__reset')
  $resetBtn.addEventListener('click', function (e) {
    that.reset()
  })

  // make sure message area hidden by default
  this.$statusArea.classList.add('js-hidden')
}

FilterTimelineByDate.prototype.getTimeline = function () {
  var timelineSelector = this.$module.dataset.timelineSelector || 'js-timeline-to-filter'
  this.timeline = document.querySelector(`.${timelineSelector}`)
  this.timelineItems = convertNodeListToArray(this.timeline.querySelectorAll('.dl-timeline__entry'))
}

FilterTimelineByDate.prototype.getInputs = function () {
  var inputs = this.$module.querySelectorAll('input')
  return convertNodeListToArray(inputs)
}

FilterTimelineByDate.prototype.filterViaTimeout = function (e) {
  clearTimeout(this.filterTimeout)

  const boundFilterTimeline = this.filterTimeline.bind(this)
  this.filterTimeout = setTimeout(function () {
    boundFilterTimeline(e)
  }, 250)
}

FilterTimelineByDate.prototype.areFiltersSet = function () {
  const dateComponents = ['year', 'month', 'day']
  const fObj = this.filterObj

  for (let i = 0; i < 3; i++) {
    if (fObj[dateComponents[i]]) {
      return true
    }
  }
  return false
}

FilterTimelineByDate.prototype.filterTimeline = function (e) {
  const currentInput = e.target
  this.filterObj[currentInput.dataset.filterTimelineType] = currentInput.value

  if (this.areFiltersSet()) {
    // hide them all
    this.timelineItems.forEach(function (item) {
      item.classList.add('js-hidden')
    })

    // unhide the items that match
    const matchedItems = this.matchTimelineItems()
    matchedItems.forEach(function (item) {
      item.classList.remove('js-hidden')
    })

    // show status area
    this.$statusArea.classList.remove('js-hidden')
    // update count
    this.setCountMessage(matchedItems.length)

    if (matchedItems.length === 0) {
      this.timeline.classList.add('dl-timeline--empty')
    } else {
      this.timeline.classList.remove('dl-timeline--empty')
    }
  } else {
    this.reset()
  }
}

FilterTimelineByDate.prototype.matchTimelineItems = function () {
  const fObj = this.filterObj
  let items = this.timelineItems
  const dateComponents = ['year', 'month', 'day']
  const that = this

  dateComponents.forEach(function (_type) {
    if (fObj[_type]) {
      items = items.filter(function (item) {
        return that.checkDatePart(item, _type, fObj[_type])
      })
    }
  })
  return items
}

FilterTimelineByDate.prototype.checkDatePart = function ($el, datePart, val) {
  function capitalise (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  if ($el.dataset[`timeline${capitalise(datePart)}`] === val) {
    return true
  }
  return false
}

FilterTimelineByDate.prototype.setCountMessage = function (count) {
  const $count = this.$statusArea.querySelector('.filter-timeline__count')
  var countMessage = count + ' item'
  if (count !== 1) {
    countMessage = countMessage + 's'
  }
  $count.textContent = countMessage
}

FilterTimelineByDate.prototype.reset = function () {
  // remove input values
  this.$inputs.forEach(function ($input) {
    $input.value = ''
  })
  // reset stored filter values
  this.defaulFilters()
  // show all items
  this.timelineItems.forEach(function (item) {
    item.classList.remove('js-hidden')
  })
  // back to initial view
  this.$statusArea.classList.add('js-hidden')
}

FilterTimelineByDate.prototype.defaulFilters = function () {
  // all filter options to empty
  this.filterObj = {
    year: '',
    month: '',
    day: ''
  }
}

FilterTimelineByDate.prototype.setupOptions = function (params) {
  params = params || {}
}

export default FilterTimelineByDate
