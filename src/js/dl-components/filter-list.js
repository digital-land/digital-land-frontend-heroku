import '../../govuk/vendor/polyfills/Function/prototype/bind'

// Back to top module as seen in govuk-design-system
// https://github.com/alphagov/collections/blob/e1f3c74facd889426d24ac730ed0057aa64e2801/app/assets/javascripts/organisation-list-filter.js
function FilterList ($form) {
  this.$form = $form
  this.filterTimeout = null
  this.$noMatches = document.querySelector('.js-no-filter-list-matches')
}

FilterList.prototype.init = function (params) {
  this.setupOptions(params)
  const $form = this.$form
  // Form should only appear if the JS is working
  $form.classList.add('filter-organisations-list__form--active')

  // We don't want the form to submit/refresh the page on enter key
  $form.addEventListener('submit', function () { return false })

  const $input = $form.querySelector('input')
  const boundFilterViaTimeout = this.filterViaTimeout.bind(this)
  $input.addEventListener('keyup', boundFilterViaTimeout)
}

FilterList.prototype.filterViaTimeout = function (e) {
  clearTimeout(this.filterTimeout)

  const boundFilterList = this.filterList.bind(this)
  this.filterTimeout = setTimeout(function () {
    boundFilterList(e)
  }, 200)
}

FilterList.prototype.filterList = function (e) {
  function convertNodeListToArray (nl) {
    return Array.prototype.slice.call(nl)
  }
  const itemsToFilter = convertNodeListToArray(document.querySelectorAll('[data-filter="item"]'))
  const listsToFilter = convertNodeListToArray(document.querySelectorAll('[data-filter="list"]'))
  const searchTerm = e.target.value

  const boundMatchSearchTerm = this.matchSearchTerm.bind(this)
  itemsToFilter
    .filter(function ($item) {
      return boundMatchSearchTerm($item, searchTerm)
    })
    .forEach(function (item) {
      item.classList.add('js-hidden')
    })

  this.updateListCounts(listsToFilter)
}

FilterList.prototype.matchSearchTerm = function (item, term) {
  // const itemLabels = item.dataset.filterItemLabels
  const itemLabels = item.querySelector('a').textContent
  item.classList.remove('js-hidden')
  var searchTermRegexp = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
  if (searchTermRegexp.exec(itemLabels) !== null) {
    return false
  }
  return true
}

FilterList.prototype.updateListCounts = function (lists) {
  var totalMatches = 0
  const list_section_selector = this.list_section_selector
  const count_wrapper_selector = this.count_wrapper_selector

  lists.forEach(function (list) {
    var matchingCount = list.querySelectorAll('[data-filter="item"]:not(.js-hidden)').length
    var listSection = list.closest(list_section_selector)
    var countWrapper = listSection.querySelector(count_wrapper_selector)
    var listCount = countWrapper.querySelector('.js-list-count')
    var accessibleListCount = countWrapper.querySelector('.js-accessible-list-count')

    // show/hide sections with matching items
    if (matchingCount > 0) {
      listSection.classList.remove('js-hidden')
      listCount.textContent = matchingCount
      accessibleListCount.textContent = matchingCount
    } else {
      listSection.classList.add('js-hidden')
    }

    totalMatches += matchingCount
  })

  // if no results show message
  if (this.$noMatches) {
    if (totalMatches == 0) {
      this.$noMatches.classList.remove('js-hidden')
    } else {
      this.$noMatches.classList.add('js-hidden')
    }
  }
}

FilterList.prototype.setupOptions = function (params) {
  params = params || {}
  this.list_section_selector = params.list_section_selector || '.list-count'
  this.count_wrapper_selector = params.count_wrapper_selector || '.list-count__wrapper'
}

export default FilterList
