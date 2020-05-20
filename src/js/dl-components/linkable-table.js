import '../../govuk/vendor/polyfills/Function/prototype/bind'

function LinkableTable ($module) {
  this.$module = $module
}

LinkableTable.prototype.init = function (params) {
  this.setupOptions(params)

  this.data_table = this.$module.querySelector('table')
  this.data_table_head = this.data_table.querySelector('thead tr')
  this.data_table_body = this.data_table.querySelector('tbody')
  this.rows = this.data_table.querySelectorAll('tbody tr')

  this.addLinkColumn()
  // do I need to delay this?
  this.initialSelected()
}

LinkableTable.prototype.setupOptions = function (params) {
  params = params || {}
  this.idPrefix = params.idPrefix || 'table-x-'
}

LinkableTable.prototype.addLinkColumn = function () {
  const firstCell = this.data_table_head.querySelector('th')
  this.data_table_head.insertBefore(
    this.createCell({ type: 'head' }),
    firstCell
  )
  var rows = this.getTableRowsArray()
  rows.forEach((row, idx) => {
    console.log(idx)
    idx = idx + 1
    var href = '#' + this.idPrefix + idx.toString()
    if (row.id) {
      href = '#' + row.id
    }
    this.addCellToRow(
      row,
      this.createCell({ linkIdx: idx.toString(), linkHref: href })
    )
  })
}

LinkableTable.prototype.createCell = function (params) {
  params = params || {}
  var boundLinkToRowHandler = this.linkToRowHandler.bind(this)
  var cell =
    params.type === 'head'
      ? document.createElement('th')
      : document.createElement('td')
  cell.classList.add('data-table__row-link')

  if (params.linkIdx) {
    var _link = document.createElement('a')
    _link.setAttribute('href', params.linkHref)
    _link.textContent = '#' + params.linkIdx
    _link.addEventListener('click', boundLinkToRowHandler)
    console.log(_link)
    cell.append(_link)
  }
  return cell
}

LinkableTable.prototype.linkToRowHandler = function (e) {
  // e.preventDefault();
  this.deselectRows()
  this.selectRow(e.currentTarget.closest('tr'))
  console.log(e.currentTarget)
}

LinkableTable.prototype.addCellToRow = function (row, cell) {
  const firstCell = row.querySelector('td')
  row.insertBefore(cell, firstCell)
}

LinkableTable.prototype.getTableRowsArray = function () {
  var rows = []
  var trs = this.data_table_body.querySelectorAll('tr')
  console.log(trs)
  for (var i = 0; i < trs.length; i++) {
    rows.push(trs[i])
  }
  return rows
}

LinkableTable.prototype.deselectRows = function () {
  this.rows.forEach(row => {
    row.classList.remove('data-table__row-selected')
  })
}

LinkableTable.prototype.selectRow = function (row) {
  row.classList.add('data-table__row-selected')
}

LinkableTable.prototype.highlightHashed = function (hash) {
  var hashlessHash = hash.replace('#', '')

  if (hash.includes(this.idPrefix)) {
    const link = document.querySelector(`[href='${hash}']`)
    const row = link.closest('tr')
    this.selectRow(row)
    row.scrollIntoView({ block: 'center' })
  } else if (document.getElementById(hashlessHash)) {
    // make sure element with id from hash is inside the table
    var el = document.getElementById(hashlessHash)
    if (this.data_table_body.contains(el)) {
      this.selectRow(el)
    }
  }
}

LinkableTable.prototype.hashChangeHandler = function () {
  this.deselectRows()
  this.highlightHashed(window.location.hash)
}

LinkableTable.prototype.initialSelected = function () {
  if (window.location.hash) {
    this.highlightHashed(window.location.hash)
  }

  // add event listener for URL hash changes
  const boundHashChangeHandler = this.hashChangeHandler.bind(this)
  window.addEventListener('hashchange', boundHashChangeHandler)
}

export default LinkableTable
