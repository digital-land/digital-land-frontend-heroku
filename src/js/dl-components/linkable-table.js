import "../../govuk/vendor/polyfills/Function/prototype/bind";

function LinkableTable($module) {
  this.$module = $module;
}

LinkableTable.prototype.init = function(params) {
  this.setupOptions(params);

  this.data_table = this.$module.querySelector("table");
  this.data_table_head = this.data_table.querySelector("thead tr");
  this.data_table_body = this.data_table.querySelector("tbody");

  this.addLinkColumn();
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
    this.addCellToRow(row, this.createCell({ linkIdx: idx.toString() }));
  });
};

LinkableTable.prototype.createCell = function(params) {
  params = params || {};
  var cell =
    params.type == "head"
      ? document.createElement("th")
      : document.createElement("td");
  if (params.linkIdx) {
    var _link = document.createElement("a");
    _link.setAttribute("href", "#" + this.idPrefix + params.linkIdx);
    _link.textContent = "#" + params.linkIdx;
    console.log(_link);
    cell.append(_link);
  }
  return cell;
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

export default LinkableTable;
