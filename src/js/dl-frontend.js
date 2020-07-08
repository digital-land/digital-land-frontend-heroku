import BackToTop from './dl-components/back-to-top'
import FilterCheckboxes from './dl-components/filter-checkboxes'
import SelectedCounter from './dl-components/selected-counter'
import ScrollableTables from './dl-components/scrollable-table'
import LinkableTable from './dl-components/linkable-table'
import FilterList from './dl-components/filter-list'
import InputCopy from './dl-components/input-copy'
import FilterTimelineByDate from './dl-components/filter-timeline-by-date'
import AppTabs from './dl-components/app-tabs'

function polyfill (options) {
  // polyfill for browsers without NodeList forEach method
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach
  }
}

export {
  polyfill,
  BackToTop,
  FilterCheckboxes,
  SelectedCounter,
  ScrollableTables,
  LinkableTable,
  FilterList,
  InputCopy,
  FilterTimelineByDate,
  AppTabs
}
