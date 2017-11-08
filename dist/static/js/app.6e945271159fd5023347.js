webpackJsonp([1],{

/***/ "+cmH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "login"
    }
  }, [_c('div', {
    staticClass: "input"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.username),
      expression: "username"
    }],
    attrs: {
      "id": "username",
      "type": "text",
      "placeholder": "账号"
    },
    domProps: {
      "value": (_vm.username)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.username = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.password),
      expression: "password"
    }],
    attrs: {
      "id": "password",
      "type": "password",
      "placeholder": "密码"
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('a', {
    staticClass: "btn_",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.login()
      }
    }
  }, [_vm._v("登录")]), _vm._v(" "), _c('a', {
    staticClass: "btn_",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.regiest()
      }
    }
  }, [_vm._v("注册")])])
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "/N+9":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "0lA4":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "1ZYm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__("pFYg");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function diff_match_patch() {
  this.Diff_Timeout = 1.0;

  this.Diff_EditCost = 4;

  this.Match_Threshold = 0.5;

  this.Match_Distance = 1000;

  this.Patch_DeleteThreshold = 0.5;

  this.Patch_Margin = 4;

  this.Match_MaxBits = 32;
}

var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;

diff_match_patch.Diff;

diff_match_patch.prototype.diff_main = function (text1, text2, opt_checklines, opt_deadline) {
  if (typeof opt_deadline == 'undefined') {
    if (this.Diff_Timeout <= 0) {
      opt_deadline = Number.MAX_VALUE;
    } else {
      opt_deadline = new Date().getTime() + this.Diff_Timeout * 1000;
    }
  }
  var deadline = opt_deadline;

  if (text1 == null || text2 == null) {
    throw new Error('Null input. (diff_main)');
  }

  if (text1 == text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  if (typeof opt_checklines == 'undefined') {
    opt_checklines = true;
  }
  var checklines = opt_checklines;

  var commonlength = this.diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  commonlength = this.diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  var diffs = this.diff_compute_(text1, text2, checklines, deadline);

  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  this.diff_cleanupMerge(diffs);
  return diffs;
};

diff_match_patch.prototype.diff_compute_ = function (text1, text2, checklines, deadline) {
  var diffs;

  if (!text1) {
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    diffs = [[DIFF_INSERT, longtext.substring(0, i)], [DIFF_EQUAL, shorttext], [DIFF_INSERT, longtext.substring(i + shorttext.length)]];

    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length == 1) {
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }

  var hm = this.diff_halfMatch_(text1, text2);
  if (hm) {
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];

    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);

    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  if (checklines && text1.length > 100 && text2.length > 100) {
    return this.diff_lineMode_(text1, text2, deadline);
  }

  return this.diff_bisect_(text1, text2, deadline);
};

diff_match_patch.prototype.diff_lineMode_ = function (text1, text2, deadline) {
  var a = this.diff_linesToChars_(text1, text2);
  text1 = a.chars1;
  text2 = a.chars2;
  var linearray = a.lineArray;

  var diffs = this.diff_main(text1, text2, false, deadline);

  this.diff_charsToLines_(diffs, linearray);

  this.diff_cleanupSemantic(diffs);

  diffs.push([DIFF_EQUAL, '']);
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        break;
      case DIFF_EQUAL:
        if (count_delete >= 1 && count_insert >= 1) {
          diffs.splice(pointer - count_delete - count_insert, count_delete + count_insert);
          pointer = pointer - count_delete - count_insert;
          var a = this.diff_main(text_delete, text_insert, false, deadline);
          for (var j = a.length - 1; j >= 0; j--) {
            diffs.splice(pointer, 0, a[j]);
          }
          pointer = pointer + a.length;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
    pointer++;
  }
  diffs.pop();

  return diffs;
};

diff_match_patch.prototype.diff_bisect_ = function (text1, text2, deadline) {
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);

  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;

  var front = delta % 2 != 0;

  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    if (new Date().getTime() > deadline) {
      break;
    }

    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        k1end += 2;
      } else if (y1 > text2_length) {
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }

    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) == text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        k2end += 2;
      } else if (y2 > text2_length) {
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;

          x2 = text1_length - x2;
          if (x1 >= x2) {
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }
  }

  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};

diff_match_patch.prototype.diff_bisectSplit_ = function (text1, text2, x, y, deadline) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  var diffs = this.diff_main(text1a, text2a, false, deadline);
  var diffsb = this.diff_main(text1b, text2b, false, deadline);

  return diffs.concat(diffsb);
};

diff_match_patch.prototype.diff_linesToChars_ = function (text1, text2) {
  var lineArray = [];
  var lineHash = {};
  lineArray[0] = '';

  function diff_linesToCharsMunge_(text) {
    var chars = '';

    var lineStart = 0;
    var lineEnd = -1;

    var lineArrayLength = lineArray.length;
    while (lineEnd < text.length - 1) {
      lineEnd = text.indexOf('\n', lineStart);
      if (lineEnd == -1) {
        lineEnd = text.length - 1;
      }
      var line = text.substring(lineStart, lineEnd + 1);
      lineStart = lineEnd + 1;

      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== undefined) {
        chars += String.fromCharCode(lineHash[line]);
      } else {
        chars += String.fromCharCode(lineArrayLength);
        lineHash[line] = lineArrayLength;
        lineArray[lineArrayLength++] = line;
      }
    }
    return chars;
  }

  var chars1 = diff_linesToCharsMunge_(text1);
  var chars2 = diff_linesToCharsMunge_(text2);
  return { chars1: chars1, chars2: chars2, lineArray: lineArray };
};

diff_match_patch.prototype.diff_charsToLines_ = function (diffs, lineArray) {
  for (var x = 0; x < diffs.length; x++) {
    var chars = diffs[x][1];
    var text = [];
    for (var y = 0; y < chars.length; y++) {
      text[y] = lineArray[chars.charCodeAt(y)];
    }
    diffs[x][1] = text.join('');
  }
};

diff_match_patch.prototype.diff_commonPrefix = function (text1, text2) {
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }

  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};

diff_match_patch.prototype.diff_commonSuffix = function (text1, text2) {
  if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }

  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};

diff_match_patch.prototype.diff_commonOverlap_ = function (text1, text2) {
  var text1_length = text1.length;
  var text2_length = text2.length;

  if (text1_length == 0 || text2_length == 0) {
    return 0;
  }

  if (text1_length > text2_length) {
    text1 = text1.substring(text1_length - text2_length);
  } else if (text1_length < text2_length) {
    text2 = text2.substring(0, text1_length);
  }
  var text_length = Math.min(text1_length, text2_length);

  if (text1 == text2) {
    return text_length;
  }

  var best = 0;
  var length = 1;
  while (true) {
    var pattern = text1.substring(text_length - length);
    var found = text2.indexOf(pattern);
    if (found == -1) {
      return best;
    }
    length += found;
    if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
      best = length;
      length++;
    }
  }
};

diff_match_patch.prototype.diff_halfMatch_ = function (text1, text2) {
  if (this.Diff_Timeout <= 0) {
    return null;
  }
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;
  }
  var dmp = this;
  function diff_halfMatchI_(longtext, shorttext, i) {
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i), shorttext.substring(j));
      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i), shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));

  var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};

diff_match_patch.prototype.diff_cleanupSemantic = function (diffs) {
  var changes = false;
  var equalities = [];
  var equalitiesLength = 0;
  var lastequality = null;

  var pointer = 0;
  var length_insertions1 = 0;
  var length_deletions1 = 0;

  var length_insertions2 = 0;
  var length_deletions2 = 0;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {
      equalities[equalitiesLength++] = pointer;
      length_insertions1 = length_insertions2;
      length_deletions1 = length_deletions2;
      length_insertions2 = 0;
      length_deletions2 = 0;
      lastequality = diffs[pointer][1];
    } else {
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      }

      if (lastequality && lastequality.length <= Math.max(length_insertions1, length_deletions1) && lastequality.length <= Math.max(length_insertions2, length_deletions2)) {
        diffs.splice(equalities[equalitiesLength - 1], 0, [DIFF_DELETE, lastequality]);

        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;

        equalitiesLength--;

        equalitiesLength--;
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
        length_insertions1 = 0;
        length_deletions1 = 0;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastequality = null;
        changes = true;
      }
    }
    pointer++;
  }

  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
  this.diff_cleanupSemanticLossless(diffs);

  pointer = 1;
  while (pointer < diffs.length) {
    if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
      var deletion = diffs[pointer - 1][1];
      var insertion = diffs[pointer][1];
      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
      if (overlap_length1 >= overlap_length2) {
        if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
          diffs.splice(pointer, 0, [DIFF_EQUAL, insertion.substring(0, overlap_length1)]);
          diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
          pointer++;
        }
      } else {
        if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
          diffs.splice(pointer, 0, [DIFF_EQUAL, deletion.substring(0, overlap_length2)]);
          diffs[pointer - 1][0] = DIFF_INSERT;
          diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
          diffs[pointer + 1][0] = DIFF_DELETE;
          diffs[pointer + 1][1] = deletion.substring(overlap_length2);
          pointer++;
        }
      }
      pointer++;
    }
    pointer++;
  }
};

diff_match_patch.prototype.diff_cleanupSemanticLossless = function (diffs) {
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      return 6;
    }

    var char1 = one.charAt(one.length - 1);
    var char2 = two.charAt(0);
    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
    var whitespace1 = nonAlphaNumeric1 && char1.match(diff_match_patch.whitespaceRegex_);
    var whitespace2 = nonAlphaNumeric2 && char2.match(diff_match_patch.whitespaceRegex_);
    var lineBreak1 = whitespace1 && char1.match(diff_match_patch.linebreakRegex_);
    var lineBreak2 = whitespace2 && char2.match(diff_match_patch.linebreakRegex_);
    var blankLine1 = lineBreak1 && one.match(diff_match_patch.blanklineEndRegex_);
    var blankLine2 = lineBreak2 && two.match(diff_match_patch.blanklineStartRegex_);

    if (blankLine1 || blankLine2) {
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      return 3;
    } else if (whitespace1 || whitespace2) {
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      return 1;
    }
    return 0;
  }

  var pointer = 1;

  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1];

      var commonOffset = this.diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      }

      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);

        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }

      if (diffs[pointer - 1][1] != bestEquality1) {
        if (bestEquality1) {
          diffs[pointer - 1][1] = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }
        diffs[pointer][1] = bestEdit;
        if (bestEquality2) {
          diffs[pointer + 1][1] = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }
    pointer++;
  }
};

diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
diff_match_patch.whitespaceRegex_ = /\s/;
diff_match_patch.linebreakRegex_ = /[\r\n]/;
diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;

diff_match_patch.prototype.diff_cleanupEfficiency = function (diffs) {
  var changes = false;
  var equalities = [];
  var equalitiesLength = 0;
  var lastequality = null;

  var pointer = 0;
  var pre_ins = false;

  var pre_del = false;

  var post_ins = false;

  var post_del = false;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {
      if (diffs[pointer][1].length < this.Diff_EditCost && (post_ins || post_del)) {
        equalities[equalitiesLength++] = pointer;
        pre_ins = post_ins;
        pre_del = post_del;
        lastequality = diffs[pointer][1];
      } else {
        equalitiesLength = 0;
        lastequality = null;
      }
      post_ins = post_del = false;
    } else {
      if (diffs[pointer][0] == DIFF_DELETE) {
        post_del = true;
      } else {
        post_ins = true;
      }

      if (lastequality && (pre_ins && pre_del && post_ins && post_del || lastequality.length < this.Diff_EditCost / 2 && pre_ins + pre_del + post_ins + post_del == 3)) {
        diffs.splice(equalities[equalitiesLength - 1], 0, [DIFF_DELETE, lastequality]);

        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        equalitiesLength--;
        lastequality = null;
        if (pre_ins && pre_del) {
          post_ins = post_del = true;
          equalitiesLength = 0;
        } else {
          equalitiesLength--;
          pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
          post_ins = post_del = false;
        }
        changes = true;
      }
    }
    pointer++;
  }

  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};

diff_match_patch.prototype.diff_cleanupMerge = function (diffs) {
  diffs.push([DIFF_EQUAL, '']);
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            commonlength = this.diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }

            commonlength = this.diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length - commonlength);
              text_delete = text_delete.substring(0, text_delete.length - commonlength);
            }
          }

          if (count_delete === 0) {
            diffs.splice(pointer - count_insert, count_delete + count_insert, [DIFF_INSERT, text_insert]);
          } else if (count_insert === 0) {
            diffs.splice(pointer - count_delete, count_delete + count_insert, [DIFF_DELETE, text_delete]);
          } else {
            diffs.splice(pointer - count_delete - count_insert, count_delete + count_insert, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);
          }
          pointer = pointer - count_delete - count_insert + (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();
  }

  var changes = false;
  pointer = 1;

  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
      if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }

  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};

diff_match_patch.prototype.diff_xIndex = function (diffs, loc) {
  var chars1 = 0;
  var chars2 = 0;
  var last_chars1 = 0;
  var last_chars2 = 0;
  var x;
  for (x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {
      chars1 += diffs[x][1].length;
    }
    if (diffs[x][0] !== DIFF_DELETE) {
      chars2 += diffs[x][1].length;
    }
    if (chars1 > loc) {
      break;
    }
    last_chars1 = chars1;
    last_chars2 = chars2;
  }

  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
    return last_chars2;
  }

  return last_chars2 + (loc - last_chars1);
};

diff_match_patch.prototype.diff_prettyHtml = function (diffs) {
  var html = [];
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_para = /\n/g;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];
    var data = diffs[x][1];
    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;').replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
    switch (op) {
      case DIFF_INSERT:
        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
        break;
      case DIFF_DELETE:
        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
        break;
      case DIFF_EQUAL:
        html[x] = '<span>' + text + '</span>';
        break;
    }
  }
  return html.join('');
};

diff_match_patch.prototype.diff_text1 = function (diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};

diff_match_patch.prototype.diff_text2 = function (diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_DELETE) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};

diff_match_patch.prototype.diff_levenshtein = function (diffs) {
  var levenshtein = 0;
  var insertions = 0;
  var deletions = 0;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];
    var data = diffs[x][1];
    switch (op) {
      case DIFF_INSERT:
        insertions += data.length;
        break;
      case DIFF_DELETE:
        deletions += data.length;
        break;
      case DIFF_EQUAL:
        levenshtein += Math.max(insertions, deletions);
        insertions = 0;
        deletions = 0;
        break;
    }
  }
  levenshtein += Math.max(insertions, deletions);
  return levenshtein;
};

diff_match_patch.prototype.diff_toDelta = function (diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    switch (diffs[x][0]) {
      case DIFF_INSERT:
        text[x] = '+' + encodeURI(diffs[x][1]);
        break;
      case DIFF_DELETE:
        text[x] = '-' + diffs[x][1].length;
        break;
      case DIFF_EQUAL:
        text[x] = '=' + diffs[x][1].length;
        break;
    }
  }
  return text.join('\t').replace(/%20/g, ' ');
};

diff_match_patch.prototype.diff_fromDelta = function (text1, delta) {
  var diffs = [];
  var diffsLength = 0;
  var pointer = 0;
  var tokens = delta.split(/\t/g);
  for (var x = 0; x < tokens.length; x++) {
    var param = tokens[x].substring(1);
    switch (tokens[x].charAt(0)) {
      case '+':
        try {
          diffs[diffsLength++] = [DIFF_INSERT, decodeURI(param)];
        } catch (ex) {
          throw new Error('Illegal escape in diff_fromDelta: ' + param);
        }
        break;
      case '-':
      case '=':
        var n = parseInt(param, 10);
        if (isNaN(n) || n < 0) {
          throw new Error('Invalid number in diff_fromDelta: ' + param);
        }
        var text = text1.substring(pointer, pointer += n);
        if (tokens[x].charAt(0) == '=') {
          diffs[diffsLength++] = [DIFF_EQUAL, text];
        } else {
          diffs[diffsLength++] = [DIFF_DELETE, text];
        }
        break;
      default:
        if (tokens[x]) {
          throw new Error('Invalid diff operation in diff_fromDelta: ' + tokens[x]);
        }
    }
  }
  if (pointer != text1.length) {
    throw new Error('Delta length (' + pointer + ') does not equal source text length (' + text1.length + ').');
  }
  return diffs;
};

diff_match_patch.prototype.match_main = function (text, pattern, loc) {
  if (text == null || pattern == null || loc == null) {
    throw new Error('Null input. (match_main)');
  }

  loc = Math.max(0, Math.min(loc, text.length));
  if (text == pattern) {
    return 0;
  } else if (!text.length) {
    return -1;
  } else if (text.substring(loc, loc + pattern.length) == pattern) {
    return loc;
  } else {
    return this.match_bitap_(text, pattern, loc);
  }
};

diff_match_patch.prototype.match_bitap_ = function (text, pattern, loc) {
  if (pattern.length > this.Match_MaxBits) {
    throw new Error('Pattern too long for this browser.');
  }

  var s = this.match_alphabet_(pattern);

  var dmp = this;
  function match_bitapScore_(e, x) {
    var accuracy = e / pattern.length;
    var proximity = Math.abs(loc - x);
    if (!dmp.Match_Distance) {
      return proximity ? 1.0 : accuracy;
    }
    return accuracy + proximity / dmp.Match_Distance;
  }

  var score_threshold = this.Match_Threshold;

  var best_loc = text.indexOf(pattern, loc);
  if (best_loc != -1) {
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);

    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
    if (best_loc != -1) {
      score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    }
  }

  var matchmask = 1 << pattern.length - 1;
  best_loc = -1;

  var bin_min, bin_mid;
  var bin_max = pattern.length + text.length;
  var last_rd;
  for (var d = 0; d < pattern.length; d++) {
    bin_min = 0;
    bin_mid = bin_max;
    while (bin_min < bin_mid) {
      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
        bin_min = bin_mid;
      } else {
        bin_max = bin_mid;
      }
      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
    }

    bin_max = bin_mid;
    var start = Math.max(1, loc - bin_mid + 1);
    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;

    var rd = Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;
    for (var j = finish; j >= start; j--) {
      var charMatch = s[text.charAt(j - 1)];
      if (d === 0) {
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
      } else {
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
      }
      if (rd[j] & matchmask) {
        var score = match_bitapScore_(d, j - 1);

        if (score <= score_threshold) {
          score_threshold = score;
          best_loc = j - 1;
          if (best_loc > loc) {
            start = Math.max(1, 2 * loc - best_loc);
          } else {
            break;
          }
        }
      }
    }

    if (match_bitapScore_(d + 1, loc) > score_threshold) {
      break;
    }
    last_rd = rd;
  }
  return best_loc;
};

diff_match_patch.prototype.match_alphabet_ = function (pattern) {
  var s = {};
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] = 0;
  }
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
  }
  return s;
};

diff_match_patch.prototype.patch_addContext_ = function (patch, text) {
  if (text.length == 0) {
    return;
  }
  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
  var padding = 0;

  while (text.indexOf(pattern) != text.lastIndexOf(pattern) && pattern.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin) {
    padding += this.Patch_Margin;
    pattern = text.substring(patch.start2 - padding, patch.start2 + patch.length1 + padding);
  }

  padding += this.Patch_Margin;

  var prefix = text.substring(patch.start2 - padding, patch.start2);
  if (prefix) {
    patch.diffs.unshift([DIFF_EQUAL, prefix]);
  }

  var suffix = text.substring(patch.start2 + patch.length1, patch.start2 + patch.length1 + padding);
  if (suffix) {
    patch.diffs.push([DIFF_EQUAL, suffix]);
  }

  patch.start1 -= prefix.length;
  patch.start2 -= prefix.length;

  patch.length1 += prefix.length + suffix.length;
  patch.length2 += prefix.length + suffix.length;
};

diff_match_patch.prototype.patch_make = function (a, opt_b, opt_c) {
  var text1, diffs;
  if (typeof a == 'string' && typeof opt_b == 'string' && typeof opt_c == 'undefined') {
    text1 = a;
    diffs = this.diff_main(text1, opt_b, true);
    if (diffs.length > 2) {
      this.diff_cleanupSemantic(diffs);
      this.diff_cleanupEfficiency(diffs);
    }
  } else if (a && (typeof a === 'undefined' ? 'undefined' : (0, _typeof3.default)(a)) == 'object' && typeof opt_b == 'undefined' && typeof opt_c == 'undefined') {
    diffs = a;
    text1 = this.diff_text1(diffs);
  } else if (typeof a == 'string' && opt_b && (typeof opt_b === 'undefined' ? 'undefined' : (0, _typeof3.default)(opt_b)) == 'object' && typeof opt_c == 'undefined') {
    text1 = a;
    diffs = opt_b;
  } else if (typeof a == 'string' && typeof opt_b == 'string' && opt_c && (typeof opt_c === 'undefined' ? 'undefined' : (0, _typeof3.default)(opt_c)) == 'object') {
    text1 = a;
    diffs = opt_c;
  } else {
    throw new Error('Unknown call format to patch_make.');
  }

  if (diffs.length === 0) {
    return [];
  }
  var patches = [];
  var patch = new diff_match_patch.patch_obj();
  var patchDiffLength = 0;
  var char_count1 = 0;
  var char_count2 = 0;
  var prepatch_text = text1;
  var postpatch_text = text1;
  for (var x = 0; x < diffs.length; x++) {
    var diff_type = diffs[x][0];
    var diff_text = diffs[x][1];

    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
      patch.start1 = char_count1;
      patch.start2 = char_count2;
    }

    switch (diff_type) {
      case DIFF_INSERT:
        patch.diffs[patchDiffLength++] = diffs[x];
        patch.length2 += diff_text.length;
        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text + postpatch_text.substring(char_count2);
        break;
      case DIFF_DELETE:
        patch.length1 += diff_text.length;
        patch.diffs[patchDiffLength++] = diffs[x];
        postpatch_text = postpatch_text.substring(0, char_count2) + postpatch_text.substring(char_count2 + diff_text.length);
        break;
      case DIFF_EQUAL:
        if (diff_text.length <= 2 * this.Patch_Margin && patchDiffLength && diffs.length != x + 1) {
          patch.diffs[patchDiffLength++] = diffs[x];
          patch.length1 += diff_text.length;
          patch.length2 += diff_text.length;
        } else if (diff_text.length >= 2 * this.Patch_Margin) {
          if (patchDiffLength) {
            this.patch_addContext_(patch, prepatch_text);
            patches.push(patch);
            patch = new diff_match_patch.patch_obj();
            patchDiffLength = 0;

            prepatch_text = postpatch_text;
            char_count1 = char_count2;
          }
        }
        break;
    }

    if (diff_type !== DIFF_INSERT) {
      char_count1 += diff_text.length;
    }
    if (diff_type !== DIFF_DELETE) {
      char_count2 += diff_text.length;
    }
  }

  if (patchDiffLength) {
    this.patch_addContext_(patch, prepatch_text);
    patches.push(patch);
  }

  return patches;
};

diff_match_patch.prototype.patch_deepCopy = function (patches) {
  var patchesCopy = [];
  for (var x = 0; x < patches.length; x++) {
    var patch = patches[x];
    var patchCopy = new diff_match_patch.patch_obj();
    patchCopy.diffs = [];
    for (var y = 0; y < patch.diffs.length; y++) {
      patchCopy.diffs[y] = patch.diffs[y].slice();
    }
    patchCopy.start1 = patch.start1;
    patchCopy.start2 = patch.start2;
    patchCopy.length1 = patch.length1;
    patchCopy.length2 = patch.length2;
    patchesCopy[x] = patchCopy;
  }
  return patchesCopy;
};

diff_match_patch.prototype.patch_apply = function (patches, text) {
  if (patches.length == 0) {
    return [text, []];
  }

  patches = this.patch_deepCopy(patches);

  var nullPadding = this.patch_addPadding(patches);
  text = nullPadding + text + nullPadding;

  this.patch_splitMax(patches);

  var delta = 0;
  var results = [];
  for (var x = 0; x < patches.length; x++) {
    var expected_loc = patches[x].start2 + delta;
    var text1 = this.diff_text1(patches[x].diffs);
    var start_loc;
    var end_loc = -1;
    if (text1.length > this.Match_MaxBits) {
      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits), expected_loc);
      if (start_loc != -1) {
        end_loc = this.match_main(text, text1.substring(text1.length - this.Match_MaxBits), expected_loc + text1.length - this.Match_MaxBits);
        if (end_loc == -1 || start_loc >= end_loc) {
          start_loc = -1;
        }
      }
    } else {
      start_loc = this.match_main(text, text1, expected_loc);
    }
    if (start_loc == -1) {
      results[x] = false;

      delta -= patches[x].length2 - patches[x].length1;
    } else {
      results[x] = true;
      delta = start_loc - expected_loc;
      var text2;
      if (end_loc == -1) {
        text2 = text.substring(start_loc, start_loc + text1.length);
      } else {
        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
      }
      if (text1 == text2) {
        text = text.substring(0, start_loc) + this.diff_text2(patches[x].diffs) + text.substring(start_loc + text1.length);
      } else {
        var diffs = this.diff_main(text1, text2, false);
        if (text1.length > this.Match_MaxBits && this.diff_levenshtein(diffs) / text1.length > this.Patch_DeleteThreshold) {
          results[x] = false;
        } else {
          this.diff_cleanupSemanticLossless(diffs);
          var index1 = 0;
          var index2;
          for (var y = 0; y < patches[x].diffs.length; y++) {
            var mod = patches[x].diffs[y];
            if (mod[0] !== DIFF_EQUAL) {
              index2 = this.diff_xIndex(diffs, index1);
            }
            if (mod[0] === DIFF_INSERT) {
              text = text.substring(0, start_loc + index2) + mod[1] + text.substring(start_loc + index2);
            } else if (mod[0] === DIFF_DELETE) {
              text = text.substring(0, start_loc + index2) + text.substring(start_loc + this.diff_xIndex(diffs, index1 + mod[1].length));
            }
            if (mod[0] !== DIFF_DELETE) {
              index1 += mod[1].length;
            }
          }
        }
      }
    }
  }

  text = text.substring(nullPadding.length, text.length - nullPadding.length);
  return [text, results];
};

diff_match_patch.prototype.patch_addPadding = function (patches) {
  var paddingLength = this.Patch_Margin;
  var nullPadding = '';
  for (var x = 1; x <= paddingLength; x++) {
    nullPadding += String.fromCharCode(x);
  }

  for (var x = 0; x < patches.length; x++) {
    patches[x].start1 += paddingLength;
    patches[x].start2 += paddingLength;
  }

  var patch = patches[0];
  var diffs = patch.diffs;
  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
    diffs.unshift([DIFF_EQUAL, nullPadding]);
    patch.start1 -= paddingLength;
    patch.start2 -= paddingLength;
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[0][1].length) {
    var extraLength = paddingLength - diffs[0][1].length;
    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
    patch.start1 -= extraLength;
    patch.start2 -= extraLength;
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  patch = patches[patches.length - 1];
  diffs = patch.diffs;
  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
    diffs.push([DIFF_EQUAL, nullPadding]);
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  return nullPadding;
};

diff_match_patch.prototype.patch_splitMax = function (patches) {
  var patch_size = this.Match_MaxBits;
  for (var x = 0; x < patches.length; x++) {
    if (patches[x].length1 <= patch_size) {
      continue;
    }
    var bigpatch = patches[x];

    patches.splice(x--, 1);
    var start1 = bigpatch.start1;
    var start2 = bigpatch.start2;
    var precontext = '';
    while (bigpatch.diffs.length !== 0) {
      var patch = new diff_match_patch.patch_obj();
      var empty = true;
      patch.start1 = start1 - precontext.length;
      patch.start2 = start2 - precontext.length;
      if (precontext !== '') {
        patch.length1 = patch.length2 = precontext.length;
        patch.diffs.push([DIFF_EQUAL, precontext]);
      }
      while (bigpatch.diffs.length !== 0 && patch.length1 < patch_size - this.Patch_Margin) {
        var diff_type = bigpatch.diffs[0][0];
        var diff_text = bigpatch.diffs[0][1];
        if (diff_type === DIFF_INSERT) {
          patch.length2 += diff_text.length;
          start2 += diff_text.length;
          patch.diffs.push(bigpatch.diffs.shift());
          empty = false;
        } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 && patch.diffs[0][0] == DIFF_EQUAL && diff_text.length > 2 * patch_size) {
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          empty = false;
          patch.diffs.push([diff_type, diff_text]);
          bigpatch.diffs.shift();
        } else {
          diff_text = diff_text.substring(0, patch_size - patch.length1 - this.Patch_Margin);
          patch.length1 += diff_text.length;
          start1 += diff_text.length;
          if (diff_type === DIFF_EQUAL) {
            patch.length2 += diff_text.length;
            start2 += diff_text.length;
          } else {
            empty = false;
          }
          patch.diffs.push([diff_type, diff_text]);
          if (diff_text == bigpatch.diffs[0][1]) {
            bigpatch.diffs.shift();
          } else {
            bigpatch.diffs[0][1] = bigpatch.diffs[0][1].substring(diff_text.length);
          }
        }
      }

      precontext = this.diff_text2(patch.diffs);
      precontext = precontext.substring(precontext.length - this.Patch_Margin);

      var postcontext = this.diff_text1(bigpatch.diffs).substring(0, this.Patch_Margin);
      if (postcontext !== '') {
        patch.length1 += postcontext.length;
        patch.length2 += postcontext.length;
        if (patch.diffs.length !== 0 && patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
          patch.diffs[patch.diffs.length - 1][1] += postcontext;
        } else {
          patch.diffs.push([DIFF_EQUAL, postcontext]);
        }
      }
      if (!empty) {
        patches.splice(++x, 0, patch);
      }
    }
  }
};

diff_match_patch.prototype.patch_toText = function (patches) {
  var text = [];
  for (var x = 0; x < patches.length; x++) {
    text[x] = patches[x];
  }
  return text.join('');
};

diff_match_patch.prototype.patch_fromText = function (textline) {
  var patches = [];
  if (!textline) {
    return patches;
  }
  var text = textline.split('\n');
  var textPointer = 0;
  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
  while (textPointer < text.length) {
    var m = text[textPointer].match(patchHeader);
    if (!m) {
      throw new Error('Invalid patch string: ' + text[textPointer]);
    }
    var patch = new diff_match_patch.patch_obj();
    patches.push(patch);
    patch.start1 = parseInt(m[1], 10);
    if (m[2] === '') {
      patch.start1--;
      patch.length1 = 1;
    } else if (m[2] == '0') {
      patch.length1 = 0;
    } else {
      patch.start1--;
      patch.length1 = parseInt(m[2], 10);
    }

    patch.start2 = parseInt(m[3], 10);
    if (m[4] === '') {
      patch.start2--;
      patch.length2 = 1;
    } else if (m[4] == '0') {
      patch.length2 = 0;
    } else {
      patch.start2--;
      patch.length2 = parseInt(m[4], 10);
    }
    textPointer++;

    while (textPointer < text.length) {
      var sign = text[textPointer].charAt(0);
      try {
        var line = decodeURI(text[textPointer].substring(1));
      } catch (ex) {
        throw new Error('Illegal escape in patch_fromText: ' + line);
      }
      if (sign == '-') {
        patch.diffs.push([DIFF_DELETE, line]);
      } else if (sign == '+') {
        patch.diffs.push([DIFF_INSERT, line]);
      } else if (sign == ' ') {
        patch.diffs.push([DIFF_EQUAL, line]);
      } else if (sign == '@') {
        break;
      } else if (sign === '') {} else {
        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
      }
      textPointer++;
    }
  }
  return patches;
};

diff_match_patch.patch_obj = function () {
  this.diffs = [];

  this.start1 = null;

  this.start2 = null;

  this.length1 = 0;

  this.length2 = 0;
};

diff_match_patch.patch_obj.prototype.toString = function () {
  var coords1, coords2;
  if (this.length1 === 0) {
    coords1 = this.start1 + ',0';
  } else if (this.length1 == 1) {
    coords1 = this.start1 + 1;
  } else {
    coords1 = this.start1 + 1 + ',' + this.length1;
  }
  if (this.length2 === 0) {
    coords2 = this.start2 + ',0';
  } else if (this.length2 == 1) {
    coords2 = this.start2 + 1;
  } else {
    coords2 = this.start2 + 1 + ',' + this.length2;
  }
  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
  var op;

  for (var x = 0; x < this.diffs.length; x++) {
    switch (this.diffs[x][0]) {
      case DIFF_INSERT:
        op = '+';
        break;
      case DIFF_DELETE:
        op = '-';
        break;
      case DIFF_EQUAL:
        op = ' ';
        break;
    }
    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
  }
  return text.join('').replace(/%20/g, ' ');
};

module.exports = {
  diff_match_patch: diff_match_patch,
  DIFF_DELETE: DIFF_DELETE,
  DIFF_INSERT: DIFF_INSERT,
  DIFF_EQUAL: DIFF_EQUAL
};

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "42Hy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__ = __webpack_require__("DK6z");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_596680c8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__ = __webpack_require__("K1uj");
function injectStyle (ssrContext) {
  __webpack_require__("Xlcg")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-596680c8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_596680c8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "4Q/i":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__("0lA4");

__webpack_require__("ZZIN");

__webpack_require__("/N+9");

__webpack_require__("wDCA");

var _EditorValueAdvance = __webpack_require__("lI4S");

var _EditorValueAdvance2 = _interopRequireDefault(_EditorValueAdvance);

var _Delay = __webpack_require__("9gyD");

var _Delay2 = _interopRequireDefault(_Delay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  props: {
    value: {
      type: String,
      default: ' '
    },
    offChange: {
      type: Boolean,
      default: false
    },
    nodeName: {
      type: String,
      default: 'default'
    },
    selectedNodeId: {
      type: String,
      default: 'default'
    },
    changed: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {

      project: {
        locKsaveData: false,
        selectedIndex: -1,
        EVA: "",
        nodeDataEVA: "",
        Delay: ""
      },
      editor: "",
      Delay: ""
    };
  },


  watch: {
    nodeName: function nodeName() {
      console.log('change');
      this.change(this.nodeName);
    },
    value: function value() {
      console.log('set value');
      this.project.nodeDataEVA.reset();
      this.project.nodeDataEVA.value = this.value;
      this.editor.setValue(this.value);
    }
  },

  methods: {
    saveConfig: function saveConfig() {},
    onEditorChange: function onEditorChange(value) {
      if (!this.offChange) {
        return;
      }
      this.$emit('update:changed', true);

      this.$emit('onchange', { value: this.editor.getValue() });

      this.project.Delay.push();
    },
    change: function change(nodeText) {
      if (!nodeText) {
        return;
      }

      var val = nodeText,
          m,
          mode,
          spec;
      if (m = /.+\.([^.]+)$/.exec(val)) {
        var info = CodeMirror.findModeByExtension(m[1]);
        if (info) {
          mode = info.mode;
          spec = info.mime;
        }
      } else if (/\//.test(val)) {
        var info = CodeMirror.findModeByMIME(val);
        if (info) {
          mode = info.mode;
          spec = val;
        }
      } else {
        mode = spec = val;
      }
      if (mode) {
        console.log('change');
        this.editor.setOption("mode", spec);
        CodeMirror.autoLoadMode(this.editor, mode);
        console.log('change to ', spec);
      } else {
        console.log("Could not find a mode corresponding to " + val);
      }
    }
  },
  mounted: function mounted() {

    var self = this;

    CodeMirror.modeURL = "/vendors/codemirror/mode/%N/%N.js";

    self.project.nodeDataEVA = new _EditorValueAdvance2.default();

    var e = document.getElementById('ta2');
    this.editor = CodeMirror.fromTextArea(e, {
      mode: 'markdown',
      lineNumbers: true,
      theme: "zenburn",
      extraKeys: {
        "Enter": "newlineAndIndentContinueMarkdownList",
        "Alt-H": function AltH(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection('```html\r\n' + spaces + '\r\n```');
        },
        "Alt-J": function AltJ(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection('```js\r\n' + spaces + '\r\n```');
        },
        "Alt-K": function AltK(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection('```\r\n' + spaces + '\r\n```');
        },
        "Alt-L": function AltL(cm) {
          var spaces = cm.getSelection();
          cm.replaceSelection('[' + spaces + ']()');
        },
        "Alt-1": function Alt1(cm) {
          var curosr = cm.getCursor();
          cm.setCursor(curosr.line, 0);
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection("#" + spaces);
        },
        "Alt-2": function Alt2(cm) {
          var curosr = cm.getCursor();
          cm.setCursor(curosr.line, 0);
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection("##" + spaces);
        },
        "Alt-3": function Alt3(cm) {
          var curosr = cm.getCursor();
          cm.setCursor(curosr.line, 0);
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection("###" + spaces);
        }
      },
      keymap: "sublime"
    });
    var code_mirror = document.getElementsByClassName('CodeMirror')[0];
    code_mirror.style.height = window.innerHeight + "px";
    window.onresize = function () {
      code_mirror.style.height = window.innerHeight + "px";
    };

    var element = document.getElementsByClassName("textarea")[0];

    element.addEventListener("dragover", function (event) {
      event.preventDefault();
    }, false);

    this.editor.on("change", this.onEditorChange);

    this.project.Delay = new _Delay2.default(500, function (obj) {
      self.project.nodeDataEVA.value = self.editor.getValue();
      console.log('emit saveNodeData');
      self.$emit('saveNodeData', { patch_list: self.project.nodeDataEVA.patch_list,
        value: self.project.nodeDataEVA.value });
    });

    var code_mirror = document.getElementsByClassName('flex_contain')[0];
    code_mirror.style.height = window.innerHeight - 5 + "px";
    window.onresize = function () {
      code_mirror.style.height = window.innerHeight - 5 + "px";
    };
  }
};

/***/ }),

/***/ "4Vh3":
/***/ (function(module, exports) {

module.exports = {"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}

/***/ }),

/***/ "6ZSt":
/***/ (function(module, exports) {

module.exports = {"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}}

/***/ }),

/***/ "8YCc":
/***/ (function(module, exports) {

module.exports = {"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}

/***/ }),

/***/ "8rrx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditModule_vue__ = __webpack_require__("zf5a");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditModule_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditModule_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_87c64a88_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_EditModule_vue__ = __webpack_require__("W1eq");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditModule_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_87c64a88_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_EditModule_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "9gyD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var Delay = function(millisecond,func){
    this.index = ""
    this.millisecond = millisecond || 2000
    this.func = func
    this.obj = ""
}
Delay.prototype.push = function(obj){
    clearTimeout(this.index)
    this.obj = JSON.stringify(obj)
    var self = this
    this.index = setTimeout(function(){
    	self.func(self.obj)
    }, this.millisecond);
}
Delay.prototype.execute = function(){
    clearTimeout(this.index)
    this.func(this.obj)
}
/* harmony default export */ __webpack_exports__["default"] = (Delay);

/***/ }),

/***/ "Bzxj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__("mvHQ");

var _stringify2 = _interopRequireDefault(_stringify);

__webpack_require__("0lA4");

__webpack_require__("ZZIN");

__webpack_require__("/N+9");

__webpack_require__("wDCA");

var _EditorValueAdvance = __webpack_require__("lI4S");

var _EditorValueAdvance2 = _interopRequireDefault(_EditorValueAdvance);

var _CONSTANT = __webpack_require__("ZKqQ");

var CONSTANT = _interopRequireWildcard(_CONSTANT);

var _base = __webpack_require__("doxq");

var BASE = _interopRequireWildcard(_base);

var _index = __webpack_require__("r5Aq");

var API = _interopRequireWildcard(_index);

var _Delay = __webpack_require__("9gyD");

var _Delay2 = _interopRequireDefault(_Delay);

var _uid = __webpack_require__("JsAd");

var _uid2 = _interopRequireDefault(_uid);

var _editor = __webpack_require__("HPrd");

var _editor2 = _interopRequireDefault(_editor);

__webpack_require__("DmIg");

__webpack_require__("hXsh");

var _icon_obj = __webpack_require__("d8vM");

var _icon_obj2 = _interopRequireDefault(_icon_obj);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var marked = __webpack_require__("EFqf");
var renderer = new marked.Renderer();
var radCode = renderer.code;
renderer.code = function (code, lang, escaped) {
  if (lang === 'raw') {
    return '<p class="lang-raw">' + code + '</p>';
  }

  var self = this;
  return radCode.call(self, code, lang, escaped);
};
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  highlight: function highlight(code, type, sss) {
    return __webpack_require__("V8mf").highlightAuto(code).value;
  }, renderer: renderer
});

var JSTREE_PROJECT = "";
exports.default = {
  name: 'hello',
  components: {
    editor: _editor2.default
  },
  data: function data() {
    return {
      MODULE: {
        fileBlock: []
      },
      moduleList: {
        list: []
      },
      configList: {
        list: [{ name: "配置1" }, { name: "配置2" }]
      },
      project: {
        value: "",
        offChange: false,
        nodeName: "",
        changed: false,
        EVA: ""
      },
      ui: {
        a: 1
      },
      editor: "",
      Delay: "",
      selectedNodeId: "",
      rawValue: ""
    };
  },

  computed: {
    article_markdown_preview_text: function article_markdown_preview_text() {
      return marked(this.rawValue);
    }
  },

  methods: {
    htmlOnchange: function htmlOnchange() {
      console.log('changed');
    },
    codeBlockDragStart: function codeBlockDragStart(event) {
      console.log('drag');
      event.originalEvent.dataTransfer.setData("text/plain", $(event.currentTarget).text());
      event.effectAllowed = "copyMove";
    },
    saveConfig: function saveConfig() {},
    saveTreeProject: function saveTreeProject() {
      this.project.EVA.value = (0, _stringify2.default)($("#projectTree").jstree("get_json"));

      API.PROJECT.update(this.$route.params.projectId, this.project.EVA.patch_list).then(function (res) {});
    },
    saveNodeData: function saveNodeData(event) {
      var self = this;
      API.PROJECT.saveNodeData({
        patch_list: event.patch_list,
        selectedNodeId: this.project.selectedNodeId,
        projectId: this.$route.params.projectId
      }).then(function (res) {
        console.log(123);
        self.project.changed = false;
      });
    }
  },
  mounted: function mounted() {

    var self = this;

    $('#moduleTree').jstree({
      'core': {
        'data': {
          'url': CONSTANT.IP + ":" + CONSTANT.PORT + '/module/tree',
          'data': function data(node) {
            return { 'token': BASE.getToken() };
          }
        },
        "check_callback": true
      },
      "plugins": ["contextmenu", "wholerow"],
      contextmenu: {
        "items": {
          "refresh": {
            "label": "刷新",
            "action": function action(data) {
              console.log('jump to url');
            }
          },
          "rename": {
            "label": "编辑模块",
            "action": function action(data) {
              console.log('jump to url');
            }
          }
        }
      }
    }).on('select_node.jstree', function (obj, node) {

      API.MODULE.loadNodeData(node.node.a_attr.module_id).then(function (res) {
        console.log(res);
        try {
          self.rawValue = res.result.content;
        } catch (err) {
          self.rawValue = "";
        }
      });
    });

    console.log(_icon_obj2.default);
    $('#projectTree').jstree({
      'core': {
        'data': {
          'url': CONSTANT.IP + ":" + CONSTANT.PORT + '/project/tree',
          'data': function data(node) {
            return { 'token': BASE.getToken(),
              'project_id': self.$route.params.projectId
            };
          }
        },
        "check_callback": true

      },
      "types": _icon_obj2.default,
      "plugins": ["contextmenu", "dnd", "wholerow", "types"],
      contextmenu: {
        "items": {
          "create": {
            "label": "增加节点",
            "action": function action(data) {
              var inst = $.jstree.reference(data.reference),
                  obj = inst.get_node(data.reference);
              inst.create_node(obj, {}, "last", function (new_node) {
                new_node.a_attr.module_id = (0, _uid2.default)(40);
                try {
                  inst.edit(new_node);
                } catch (ex) {
                  setTimeout(function () {
                    inst.edit(new_node);
                  }, 0);
                }
              });
            }
          },
          "rename": {
            "label": "重命名",
            "action": function action(data) {
              var inst = $.jstree.reference(data.reference),
                  obj = inst.get_node(data.reference);
              inst.edit(obj);
            }
          },
          "remove": {
            "label": "删除",
            "action": function action(data) {
              var inst = $.jstree.reference(data.reference),
                  obj = inst.get_node(data.reference);
              if (inst.is_selected(obj)) {
                inst.delete_node(inst.get_selected());
              } else {
                inst.delete_node(obj);
              }
            }
          }
        },
        dnd: {
          dnd_stop: function dnd_stop() {
            console.log(123);
          }
        }
      }
    }).on('changed.jstree', function (e, data) {}).on('move_node.jstree', function (data, element, helper, event) {
      console.log('move_node');
      self.saveTreeProject('move_node');
    }).on('rename_node.jstree', function (event, node) {

      var node = JSTREE_PROJECT.get_node(node.node.id);

      var fileType = /[^\.]+$/.exec(node.text)[0];

      JSTREE_PROJECT.set_type(node, fileType);
      for (i in _icon_obj2.default) {
        if (fileType === i) {
          fileType = false;
        }
      }
      if (fileType) {
        JSTREE_PROJECT.set_type(node, 'default');
      }


      self.saveTreeProject('rename_node');

      console.log('rename_node');
    }).on('delete_node.jstree', function () {
      self.saveTreeProject('delete_node');console.log('delete_node');
    }).on('ready.jstree', function () {

      self.project.EVA = new _EditorValueAdvance2.default();

      self.project.EVA.value = (0, _stringify2.default)($("#projectTree").jstree("get_json"));

      JSTREE_PROJECT = $.jstree.reference("#projectTree");
    }).on('select_node.jstree', function (obj, node) {

      self.project.selectedNodeId = node.node.a_attr.module_id;
      self.project.offChange = false;
      self.project.value = undefined;
      API.PROJECT.loadNodeData(node.node.a_attr.module_id, self.$route.params.projectId).then(function (res) {
        if (self.project.selectedNodeId != res.selectedNodeId) {
          console.log('selectedNodeId error');
          return;
        }
        self.project.nodeName = node.node.text;

        try {
          self.project.value = res.result.content;
        } catch (ex) {
          self.project.value = "";
        }
        setTimeout(function () {
          self.project.offChange = true;
        }, 10);
      });
    });

    $("#markdown_parse_preview").on("DOMSubtreeModified", function () {
      $("pre code").prop("draggable", true);
      console.log('bind');
    });
    $("body").on("dragstart", "pre code", self.codeBlockDragStart);
  }
};

/***/ }),

/***/ "DK6z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'hello',
  data: function data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
};

/***/ }),

/***/ "DfYF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "EditProject"
  }, [_c('div', {
    staticClass: "navbar"
  }, [_c('li', [_c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("首页")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/all"
    }
  }, [_vm._v("模块列表")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "flex_contain"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "flex_right"
  }, [_c('editor', {
    staticStyle: {
      "width": "50%"
    },
    attrs: {
      "value": _vm.project.value,
      "offChange": _vm.project.offChange,
      "nodeName": _vm.project.nodeName,
      "changed": _vm.project.changed
    },
    on: {
      "update:changed": function($event) {
        _vm.project.changed = $event
      },
      "saveNodeData": _vm.saveNodeData
    }
  }, [_c('div', {
    staticStyle: {
      "float": "left"
    },
    slot: "button"
  }, [_c('a', {
    staticClass: "btn btn_ok",
    attrs: {
      "href": "#"
    },
    on: {
      "click": _vm.newPreview
    }
  }, [_vm._v("生成")])])]), _vm._v(" "), _c('div', {
    staticClass: "blockList_wrap markdown_parse_preview_wrap",
    staticStyle: {
      "width": "50%"
    }
  }, [_c('div', {
    attrs: {
      "id": "markdown_parse_preview"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.article_markdown_preview_text)
    }
  })])], 1)])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "flex_left"
  }, [_c('div', {
    staticClass: "tree_block",
    attrs: {
      "id": "moduleTree"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "tree_block",
    attrs: {
      "id": "projectTree"
    }
  })])
}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "DmIg":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "HPrd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editor_vue__ = __webpack_require__("4Q/i");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editor_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editor_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_560026fe_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_editor_vue__ = __webpack_require__("gedk");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editor_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_560026fe_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_editor_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "K1uj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hello"
  }, [_c('h2', [_vm._v("技术探索")]), _vm._v(" "), _c('ul', [_c('router-link', {
    attrs: {
      "to": "/Login"
    }
  }, [_vm._v("登陆注册")]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/ProjectList"
    }
  }, [_vm._v("项目列表")]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/edit_module"
    }
  }, [_vm._v("配置模块")]), _vm._v(" "), _c('router-link', {
    attrs: {
      "to": "/EditModule"
    }
  }, [_vm._v("编辑模块")])], 1)])
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "KYqO":
/***/ (function(module, exports) {

module.exports = {"_args":[[{"raw":"elliptic@^6.0.0","scope":null,"escapedName":"elliptic","name":"elliptic","rawSpec":"^6.0.0","spec":">=6.0.0 <7.0.0","type":"range"},"C:\\Users\\jesse\\Documents\\GitHub\\fastInit_Frontend\\node_modules\\browserify-sign"]],"_cnpm_publish_time":1487798867116,"_from":"elliptic@>=6.0.0 <7.0.0","_hasShrinkwrap":false,"_id":"elliptic@6.4.0","_inCache":true,"_location":"/elliptic","_nodeVersion":"7.0.0","_npmOperationalInternal":{"host":"packages-18-east.internal.npmjs.com","tmp":"tmp/elliptic-6.4.0.tgz_1487798866428_0.30510620190761983"},"_npmUser":{"name":"indutny","email":"fedor@indutny.com"},"_npmVersion":"3.10.8","_phantomChildren":{},"_requested":{"raw":"elliptic@^6.0.0","scope":null,"escapedName":"elliptic","name":"elliptic","rawSpec":"^6.0.0","spec":">=6.0.0 <7.0.0","type":"range"},"_requiredBy":["/browserify-sign","/create-ecdh"],"_resolved":"https://registry.npm.taobao.org/elliptic/download/elliptic-6.4.0.tgz","_shasum":"cac9af8762c85836187003c8dfe193e5e2eae5df","_shrinkwrap":null,"_spec":"elliptic@^6.0.0","_where":"C:\\Users\\jesse\\Documents\\GitHub\\fastInit_Frontend\\node_modules\\browserify-sign","author":{"name":"Fedor Indutny","email":"fedor@indutny.com"},"bugs":{"url":"https://github.com/indutny/elliptic/issues"},"dependencies":{"bn.js":"^4.4.0","brorand":"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0","inherits":"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"},"description":"EC cryptography","devDependencies":{"brfs":"^1.4.3","coveralls":"^2.11.3","grunt":"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2","istanbul":"^0.4.2","jscs":"^2.9.0","jshint":"^2.6.0","mocha":"^2.1.0"},"directories":{},"dist":{"shasum":"cac9af8762c85836187003c8dfe193e5e2eae5df","size":41164,"noattachment":false,"tarball":"http://registry.npm.taobao.org/elliptic/download/elliptic-6.4.0.tgz"},"files":["lib"],"gitHead":"6b0d2b76caae91471649c8e21f0b1d3ba0f96090","homepage":"https://github.com/indutny/elliptic","keywords":["EC","Elliptic","curve","Cryptography"],"license":"MIT","main":"lib/elliptic.js","maintainers":[{"name":"indutny","email":"fedor@indutny.com"}],"name":"elliptic","optionalDependencies":{},"publish_time":1487798867116,"readme":"ERROR: No README data found!","repository":{"type":"git","url":"git+ssh://git@github.com/indutny/elliptic.git"},"scripts":{"jscs":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","jshint":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","lint":"npm run jscs && npm run jshint","test":"npm run lint && npm run unit","unit":"istanbul test _mocha --reporter=spec test/index.js","version":"grunt dist && git add dist/"},"version":"6.4.0"}

/***/ }),

/***/ "KkAg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = __webpack_require__("r5Aq");

var API = _interopRequireWildcard(_index);

var _base = __webpack_require__("doxq");

var BASE = _interopRequireWildcard(_base);

var _co = __webpack_require__("sqs/");

var _co2 = _interopRequireDefault(_co);

__webpack_require__("Rl9M");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    name: 'hello',
    data: function data() {
        return {
            createShow: false,
            project_name: '',
            list: [{
                project_name: "fastInit",
                project_id: 1
            }, {
                name: "fastInit2",
                id: 2
            }]
        };
    },

    methods: {
        jumpProject: function jumpProject(id) {
            this.$router.push('/EditProject/' + id);
        },
        createProject: function createProject() {
            var self = this;

            var project_name = this.project_name;

            API.PROJECT.create(project_name).then(function (res) {
                self.project_name = '';


                API.PROJECT.list().then(function (res) {
                    self.list = res.list;
                });
                console.log('创建项目成功');
            }).catch(function (err) {
                alert('创建项目失败');
            });

            this.createShow = false;
        }
    },
    mounted: function mounted() {
        var self = this;

        API.PROJECT.list().then(function (res) {
            self.list = res.list;
        });
    }
};

/***/ }),

/***/ "M93x":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__("xJD8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e30745a4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("NgMs");
function injectStyle (ssrContext) {
  __webpack_require__("kifh")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e30745a4_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "NHnr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__("M93x");

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__("YaEn");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.productionTip = false;

new _vue2.default({
  el: '#app',
  router: _router2.default,
  template: '<App/>',
  components: { App: _App2.default }
});

/***/ }),

/***/ "NgMs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "ODCM":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "QDfD":
/***/ (function(module, exports) {

module.exports = {"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}

/***/ }),

/***/ "Rl9M":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "W1eq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "EditModule"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "flex_contain"
  }, [_c('div', {
    staticClass: "editArea"
  }, [_c('editor', {
    attrs: {
      "value": _vm.project.value,
      "offChange": _vm.project.offChange,
      "changed": _vm.project.changed
    },
    on: {
      "update:changed": function($event) {
        _vm.project.changed = $event
      },
      "saveNodeData": _vm.saveNodeData,
      "onchange": _vm.editorOnchange
    }
  }, [_c('div', {
    staticStyle: {
      "float": "left"
    },
    slot: "button"
  }, [_c('a', {
    staticClass: "btn btn_ok",
    attrs: {
      "href": "#"
    },
    on: {
      "click": _vm.newPreview
    }
  }, [_vm._v("生成")])])])], 1), _vm._v(" "), _c('div', {
    staticClass: "preview markdown_parse_preview_wrap"
  }, [_c('div', {
    attrs: {
      "id": "markdown_parse_preview"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.article_markdown_preview_text)
    }
  })])])])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "floder"
  }, [_c('div', {
    staticClass: "tree_block",
    attrs: {
      "id": "moduleTree"
    }
  })])
}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "Xlcg":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "YaEn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__("7+uW");

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__("/ocq");

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Index = __webpack_require__("42Hy");

var _Index2 = _interopRequireDefault(_Index);

var _EditProject = __webpack_require__("jy6Y");

var _EditProject2 = _interopRequireDefault(_EditProject);

var _EditModule = __webpack_require__("8rrx");

var _EditModule2 = _interopRequireDefault(_EditModule);

var _Login = __webpack_require__("xJsL");

var _Login2 = _interopRequireDefault(_Login);

var _ProjectList = __webpack_require__("gtnv");

var _ProjectList2 = _interopRequireDefault(_ProjectList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'ProjectList',
    component: _ProjectList2.default
  }, {
    path: '/all',
    name: 'Index',
    component: _Index2.default
  }, {
    path: '/Login',
    name: 'Login',
    component: _Login2.default
  }, {
    path: '/ProjectList',
    name: 'ProjectList',
    component: _ProjectList2.default
  }, {
    path: '/EditProject',
    name: 'EditProject',
    component: _EditProject2.default
  }, {
    path: '/EditProject/:projectId',
    name: 'WriteArticle',
    component: _EditProject2.default
  }, {
    path: '/EditModule',
    name: 'EditModule',
    component: _EditModule2.default
  }]
});

/***/ }),

/***/ "ZKqQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
;let setip=''
if (true) {
 setip = 'http://118.89.19.201'
  // setip = 'http://localhost'
}else{
 setip = 'http://localhost'
}
const IP = setip
/* harmony export (immutable) */ __webpack_exports__["IP"] = IP;

const PORT = 8302
/* harmony export (immutable) */ __webpack_exports__["PORT"] = PORT;

const OAUTH_PORT = 8000
/* harmony export (immutable) */ __webpack_exports__["OAUTH_PORT"] = OAUTH_PORT;






const FLAG="APP_"
/* harmony export (immutable) */ __webpack_exports__["FLAG"] = FLAG;

const USERNAME = FLAG+'USERNAME'
/* harmony export (immutable) */ __webpack_exports__["USERNAME"] = USERNAME;
 //用户名
const SESSION_TOKEN = FLAG+'SESSION_TOKEN'
/* harmony export (immutable) */ __webpack_exports__["SESSION_TOKEN"] = SESSION_TOKEN;
 //token
const SESSION_EXPIRED = FLAG+'SESSION_EXPIRED'
/* harmony export (immutable) */ __webpack_exports__["SESSION_EXPIRED"] = SESSION_EXPIRED;
 //session过期时间
const ACCOUNT_STATE = FLAG+'ACCOUNT_STATE'
/* harmony export (immutable) */ __webpack_exports__["ACCOUNT_STATE"] = ACCOUNT_STATE;
 //账户状态
const TIMEOUT = 3000000;
/* harmony export (immutable) */ __webpack_exports__["TIMEOUT"] = TIMEOUT;
//超时时间
const HTTP_FAIL = "与服务器通信失败，请检查手机网络"
/* harmony export (immutable) */ __webpack_exports__["HTTP_FAIL"] = HTTP_FAIL;

const DATA_INVALID = "无法识别服务器返回的数据包"
/* harmony export (immutable) */ __webpack_exports__["DATA_INVALID"] = DATA_INVALID;

const DAY = 86399500
/* harmony export (immutable) */ __webpack_exports__["DAY"] = DAY;


/***/ }),

/***/ "ZZIN":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "d8vM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "html": {
    "icon": "iconfont icon-html"
  },
  "py": {
    "icon": "iconfont icon-python"
  },
  "vue": {
    "icon": "iconfont icon-vue"
  },
  "json": {
    "icon": "iconfont icon-json_file__ea"
  },
  "babelrc": {
    "icon": "iconfont icon-a_babel"
  }
};

/***/ }),

/***/ "dcOb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ProjectList"
  }, [_c('div', {
    staticClass: "navbar"
  }, [_c('li', [_c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_vm._v("首页")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/all"
    }
  }, [_vm._v("模块列表")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "nav_bar"
  }, [_c('a', {
    staticClass: "btn btn_ok",
    attrs: {
      "href": ""
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.createShow = true
      }
    }
  }, [_vm._v("新建项目")]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.createShow),
      expression: "createShow"
    }],
    staticClass: "projectProperty"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project_name),
      expression: "project_name"
    }],
    attrs: {
      "type": "text",
      "name": "",
      "placeholder": "项目名称"
    },
    domProps: {
      "value": (_vm.project_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.project_name = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "btn_wrap"
  }, [_c('a', {
    staticClass: "btn btn_ok",
    attrs: {
      "href": ""
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.createProject($event)
      }
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('a', {
    staticClass: "btn btn_cancel",
    attrs: {
      "href": ""
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.createShow = false
      }
    }
  }, [_vm._v("取消")])])])]), _vm._v(" "), _c('div', [_c('h3', [_vm._v("项目列表")]), _vm._v(" "), _vm._l((_vm.list), function(item, index) {
    return _c('div', {
      staticClass: "cell",
      on: {
        "click": function($event) {
          _vm.jumpProject(item.project_id)
        }
      }
    }, [_vm._v("\n                " + _vm._s(item.project_name) + "\n            ")])
  })], 2)])
}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "doxq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__ = __webpack_require__("ZKqQ");



const removeToken = function(page_this) {
    localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["SESSION_TOKEN"]);
    localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["ACCOUNT_STATE"]);
};
/* harmony export (immutable) */ __webpack_exports__["removeToken"] = removeToken;

const saveToken = function(token) {
    localStorage.setItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["SESSION_TOKEN"], token);
    localStorage.setItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["SESSION_EXPIRED"], 'date');
};
/* harmony export (immutable) */ __webpack_exports__["saveToken"] = saveToken;

const getToken = function(){
    var current = new Date();

    let token_expired = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["SESSION_EXPIRED"]) || 'Now';

    if(token_expired!='Now' && token_expired < current){
        return ''
    }else{
        return localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["SESSION_TOKEN"])
    }
}
/* harmony export (immutable) */ __webpack_exports__["getToken"] = getToken;

const saveUsername = function(username){
    localStorage.setItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["USERNAME"], username);
}
/* harmony export (immutable) */ __webpack_exports__["saveUsername"] = saveUsername;

const getUsername = function(){
    return localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__PREDEFINED_CONSTANT_js__["USERNAME"]);
}
/* harmony export (immutable) */ __webpack_exports__["getUsername"] = getUsername;


/***/ }),

/***/ "ejIc":
/***/ (function(module, exports) {

module.exports = {"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}

/***/ }),

/***/ "eq8s":
/***/ (function(module, exports) {

module.exports = {
    dbName:'fastInit',
    dbPort:8301,
    servePort:8302
}

/***/ }),

/***/ "gedk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "textarea_wrap"
  }, [_c('div', {
    staticClass: "add_wrap"
  }, [_vm._t("button"), _vm._v(" "), _c('a', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.changed === true),
      expression: "changed===true"
    }],
    staticClass: "saving",
    attrs: {
      "href": ""
    }
  }, [_vm._v("*")])], 2), _vm._v(" "), _vm._m(0)])
}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "textarea"
  }, [_c('textarea', {
    attrs: {
      "name": "",
      "id": "ta2",
      "cols": "30",
      "rows": "10"
    }
  })])
}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "gtnv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProjectList_vue__ = __webpack_require__("KkAg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProjectList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProjectList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f604bbe_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ProjectList_vue__ = __webpack_require__("dcOb");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ProjectList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f604bbe_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_ProjectList_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "hXsh":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "jAsR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_js__ = __webpack_require__("m1K9");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_md5__ = __webpack_require__("L6bb");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_js__ = __webpack_require__("doxq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_co__ = __webpack_require__("sqs/");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_co___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_co__);





const login = function(username,password){
    
    let data = {
        username,
        password:__WEBPACK_IMPORTED_MODULE_1_md5___default()(password),
        device:'html5'
    }
    return __WEBPACK_IMPORTED_MODULE_3_co___default()(function*(){
        let obj = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({ path:'/login',
                  data: { username: username, password: __WEBPACK_IMPORTED_MODULE_1_md5___default()(password) },
                PORT:8000
                })
        let res = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({ path:'/oauth_login',data: { 'token': obj.token }})
            
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__base_js__["saveUsername"])(username)
        __WEBPACK_IMPORTED_MODULE_2__base_js__["saveToken"](res.token)
        
        return res   
    })
    
        // .then(function(obj) {
        //     // 传递tokenA给后台验证
        //     mFetch({ path:'/oauth_login',data: { 'token': obj.token }})
        //     .then(function(res) {
        //         saveUsername(username)
        //         BASE.saveToken(res.token)
        //     })

        // })
}
/* harmony export (immutable) */ __webpack_exports__["login"] = login;

// 注册
const regiest = function(username,password){
    let data = {
        username,
        password:__WEBPACK_IMPORTED_MODULE_1_md5___default()(password)
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({ path:'/regiest',
                    data: { username: username, password: __WEBPACK_IMPORTED_MODULE_1_md5___default()(password) },
                    PORT:8000
                })

}
/* harmony export (immutable) */ __webpack_exports__["regiest"] = regiest;

// 测试登录状态
const login_status_check = function(token){
    
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({path:'/regiest',data:{token}})
}
/* harmony export (immutable) */ __webpack_exports__["login_status_check"] = login_status_check;


/***/ }),

/***/ "jy6Y":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditProject_vue__ = __webpack_require__("Bzxj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditProject_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditProject_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d5daf0e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_EditProject_vue__ = __webpack_require__("DfYF");
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_EditProject_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d5daf0e_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_EditProject_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "kifh":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "lI4S":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var GDMP = __webpack_require__("1ZYm")
console.log(GDMP)
// import GDMP from '../../../src/vendors/google-diff-match-patch-js/diff_match_patch.js'
// 编辑器增量更新
// 使用方式
/*
import EVA from '../../serve/fontend/Obj/EditorValueAdvance.js'
this.EVA = new EVA()
self.EVA.reset() // 重置对比值

self.EVA.value = 11 //设置值
self.EVA.value = 22 //再次设置值，这时与之前的值开始进行比较

var cc = self.EVA.value //获取值

self.EVA.patch_list //获取差异值
`
*/
function EditorValueAdvance(){
	let old_value = ""
	let value = ""
	let patch_list = undefined

	let dmp = new GDMP.diff_match_patch()
	Object.defineProperty(this, 'value', {
		get:function(){
			return value
		},
	    set: function(text) {
			old_value = value
			value = text
	    }
	})
	Object.defineProperty(this, 'reset', {
		value:function(){
			old_value = ""
			value = ""
			patch_list = undefined
		}
	})
	Object.defineProperty(this, 'patch_list', {
		get: function(){
			let diffs = dmp.diff_main(old_value, value, true)
			let result = dmp.patch_make(old_value, value, diffs)
			return result
		}
	})
}
/* harmony default export */ __webpack_exports__["default"] = (EditorValueAdvance);


/***/ }),

/***/ "m1K9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_js__ = __webpack_require__("doxq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PREDEFINED_CONSTANT_js__ = __webpack_require__("ZKqQ");

__webpack_require__("hKoQ").polyfill();
var fetch = __webpack_require__("j9g7");

var CODE = __webpack_require__("ZKqQ").CODE
var CONFIG = __webpack_require__("eq8s")



// 业务逻辑错误处理

// 对返回报文进行预处理
// 返回 false 表示发生业务逻辑问题
// 返回 true 表示未发生业务逻辑问题，继续执行
const preProcessRsp = function(store,reslove,reject) {
    if (!store.status) {
        reject(store)
        return false
    }
    return true;
};

const mFetch = function(options) {
    let opt = Object.assign({
        data:{},
        path:'',
        token:'',
        IP:__WEBPACK_IMPORTED_MODULE_1__PREDEFINED_CONSTANT_js__["IP"],
        PORT:CONFIG.servePort
    },options)
    return new Promise(function(reslove,reject){

        // path,data,token
        let comb_data = {}
        if(opt.data===undefined){
            opt.data = {}
        }else{
            comb_data = opt.data
            if(opt.data.token === undefined){
                comb_data = Object.assign(opt.data,{token:__WEBPACK_IMPORTED_MODULE_0__base_js__["getToken"]()})
            }
        }
        let root = this
        fetch(opt.IP+':'+opt.PORT+opt.path,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(comb_data)
        })
        .then(function(response) {
            // HTTP 错误处理
            if (response.status != 200) {
                // throw new Error("Bad response from server: status",response.status);
                reject("Bad response from server: status",response.status)
            }
            return response.json();
        })
        .then(function(res) {
            if(preProcessRsp(res,reslove,reject)){
                reslove(res)
            }else{
                reject(res.msg)
            }
        })
        .catch(function(ex){
            reject({
                MSG:ex.message
            })
        });
    })   
};
/* harmony default export */ __webpack_exports__["a"] = (mFetch);

/***/ }),

/***/ "nKb+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__("Xxa5");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _index = __webpack_require__("r5Aq");

var API = _interopRequireWildcard(_index);

var _base = __webpack_require__("doxq");

var BASE = _interopRequireWildcard(_base);

var _co = __webpack_require__("sqs/");

var _co2 = _interopRequireDefault(_co);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'hello',
    data: function data() {
        return {
            username: '',
            password: ''
        };
    },

    methods: {
        login: function login() {

            var self = this;
            API.LOGIN.login(this.username, this.password).then(function (res) {
                console.log('logon success', res);
                self.$root.username = BASE.getUsername();
                self.$router.push('ProjectList');
            }).catch(function (err) {
                console.log('login fail', err);
                alert(err.msg);
            });
        },
        regiest: function regiest() {
            var self = this;
            (0, _co2.default)(_regenerator2.default.mark(function _callee() {
                var regiest_res, login;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return API.LOGIN.regiest(self.username, self.password);

                            case 2:
                                regiest_res = _context.sent;

                                if (!confirm('注册成功，立即登录')) {
                                    _context.next = 8;
                                    break;
                                }

                                _context.next = 6;
                                return API.LOGIN.login(self.username, self.password);

                            case 6:
                                login = _context.sent;

                                self.$router.push('ProjectList');

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            })).catch(function (err) {
                console.log('regiest fail', err);
                alert(err.msg);
            });
        }
    }
};

/***/ }),

/***/ "r5Aq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_login_js__ = __webpack_require__("jAsR");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_project_js__ = __webpack_require__("s+KM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__module_module_js__ = __webpack_require__("tadA");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "LOGIN", function() { return __WEBPACK_IMPORTED_MODULE_0__module_login_js__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "PROJECT", function() { return __WEBPACK_IMPORTED_MODULE_1__module_project_js__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "MODULE", function() { return __WEBPACK_IMPORTED_MODULE_2__module_module_js__; });
// import mFetch from './ajax.js'
// 添加单词
// export const articleUpdate = function(title,content){
    
//     let data={
//         title,
//         content
//     }
//     return mFetch('/article/update'
//             ,data
//             )
// }
// import * as ARTICLE from './module/article.js'
// import * as FLODER from './module/floder.js'

// import * as CONFIG from './module/userConfig.js'




/***/ }),

/***/ "s+KM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_js__ = __webpack_require__("m1K9");

// 模块
	// 读取节点所有节点
	// 添加节点
	// 移动节点
	// 重命名节点

	// 选中节点-加载模块
var module = {
	loadNode:function(projectId){

	},
	addMoveRenameNode:function(type,nodeId,param){

	},
	selectNode:function(nodeId){

	}
}


// 读取节点所有节点
    // 添加节点
    // 移动节点
    // 重命名节点
    // 选中节点-加载代码
    // 保存节点代码（advnce历史记录）

const create = function(project_name){
	let data={
    	project_name
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({path:'/project/create',data})
}
/* harmony export (immutable) */ __webpack_exports__["create"] = create;

const update = function(project_id,patch_list){
	let data={
    	patch_list,
    	project_id
    }
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({path:'/project/update',data})
}
/* harmony export (immutable) */ __webpack_exports__["update"] = update;

const list = function(){
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({path:'/project/list'})
}
/* harmony export (immutable) */ __webpack_exports__["list"] = list;



const loadNodeData = function(selectedNodeId,projectId){
	console.log('loadNodeData')
	let data = {
        selectedNodeId,
        projectId
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({path:'/project/loadNodeData',data}).then(function(res){
    	
        return Object.assign({},res,{selectedNodeId})
    })
	// return new Promise(function(reslove,reject){
	// 	setTimeout(function() {
	// 		reslove({value:Math.random().toString()})
	// 	}, 500);
	// })

}
/* harmony export (immutable) */ __webpack_exports__["loadNodeData"] = loadNodeData;

const saveNodeData = function(obj){
	console.log('saveNodeData')

	let data={
		projectId:obj.projectId,
    	selectedNodeId:obj.selectedNodeId,
    	patch_list:obj.patch_list
    }

   	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({path:'/project/saveNodeData',data})

	// return new Promise(function(reslove,reject){
	// 	setTimeout(function() {
	// 		reslove('node Data')
	// 	}, 500);
	// })
}
/* harmony export (immutable) */ __webpack_exports__["saveNodeData"] = saveNodeData;




/***/ }),

/***/ "tadA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ajax_js__ = __webpack_require__("m1K9");




// 读取节点所有节点
    // 添加节点
    // 移动节点
    // 重命名节点
    // 选中节点-加载代码
    // 保存节点代码（advnce历史记录）

const create = function(project_name){
	let data={
    	project_name
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({path:'/module/create',data})
}
/* harmony export (immutable) */ __webpack_exports__["create"] = create;

const update = function(patch_list){
	let data={
    	patch_list
    }
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({path:'/module/update',data})
}
/* harmony export (immutable) */ __webpack_exports__["update"] = update;

const loadNodeData = function(selectedNodeId){
    let data = {
        selectedNodeId
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({path:'/module/loadNodeData',data}).then(function(res){
        return Object.assign({},res,{selectedNodeId})
    })
}
/* harmony export (immutable) */ __webpack_exports__["loadNodeData"] = loadNodeData;

const saveNodeData = function(patch_list,selectedNodeId){

   let data = {
    selectedNodeId,
    patch_list
   }

   return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ajax_js__["a" /* default */])({path:'/module/saveNodeData',data})
}
/* harmony export (immutable) */ __webpack_exports__["saveNodeData"] = saveNodeData;

// export const list = function(){
// 	return mFetch({path:'/module/list'})
// }




/***/ }),

/***/ "wDCA":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "xJD8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'app'
};

/***/ }),

/***/ "xJsL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__ = __webpack_require__("nKb+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c6173a9a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__ = __webpack_require__("+cmH");
function injectStyle (ssrContext) {
  __webpack_require__("ODCM")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c6173a9a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c6173a9a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "zf5a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__("mvHQ");

var _stringify2 = _interopRequireDefault(_stringify);

__webpack_require__("0lA4");

__webpack_require__("ZZIN");

__webpack_require__("zgqW");

var _EditorValueAdvance = __webpack_require__("lI4S");

var _EditorValueAdvance2 = _interopRequireDefault(_EditorValueAdvance);

var _CONSTANT = __webpack_require__("ZKqQ");

var CONSTANT = _interopRequireWildcard(_CONSTANT);

var _base = __webpack_require__("doxq");

var BASE = _interopRequireWildcard(_base);

var _index = __webpack_require__("r5Aq");

var API = _interopRequireWildcard(_index);

var _Delay = __webpack_require__("9gyD");

var _Delay2 = _interopRequireDefault(_Delay);

var _uid = __webpack_require__("JsAd");

var _uid2 = _interopRequireDefault(_uid);

var _editor = __webpack_require__("HPrd");

var _editor2 = _interopRequireDefault(_editor);

__webpack_require__("DmIg");

__webpack_require__("hXsh");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var marked = __webpack_require__("EFqf");
var renderer = new marked.Renderer();
var radCode = renderer.code;
renderer.code = function (code, lang, escaped) {
  if (lang === 'raw') {
    return '<p class="lang-raw">' + code + '</p>';
  }
  var self = this;
  return radCode.call(self, code, lang, escaped);
};
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  highlight: function highlight(code, type, sss) {
    return __webpack_require__("V8mf").highlightAuto(code).value;
  }, renderer: renderer
});

exports.default = {
  components: {
    editor: _editor2.default
  },
  data: function data() {
    return {
      Delay: "",
      selectedNodeId: "",
      locKsaveData: false,
      treeNode: {
        EVA: ""
      },
      moduleList: {
        newModuleName: "",
        visibleAddModule: false,
        list: []
      },
      blockCode: {
        blockInput: [{ value: "" }],
        selectedIndex: 0,
        element: null,
        selectionStart: 0,
        cacheList: []
      },
      fileBlock: {
        newFileBlockName: "",
        visibleAddFileBlock: false,
        list: [],
        dropOverIndex: -1,
        selectedIndex: -1
      },
      ui: {
        add_module: 1
      },
      project: {
        value: "",
        offChange: false,
        nodeName: "",
        changed: false,
        rawValue: ""
      }
    };
  },

  methods: {
    editorOnchange: function editorOnchange(event) {
      this.project.rawValue = event.value;
    },
    newPreview: function newPreview() {},
    saveTree: function saveTree() {
      this.treeNode.EVA.value = (0, _stringify2.default)($("#moduleTree").jstree("get_json"));

      API.MODULE.update(this.treeNode.EVA.patch_list).then(function (res) {});
    },
    addModule: function addModule() {

      this.moduleList.list.push({ name: this.moduleList.newModuleName });
      this.moduleList.newModuleName = "";
      this.moduleList.visibleAddModule = false;
    },

    codeBlockDragStart: function codeBlockDragStart(index, event) {
      this.fileBlock.selectedIndex = index;

      event.effectAllowed = "copyMove";
    },
    fileBlockOnDrop: function fileBlockOnDrop(index, event) {
      var list = this.fileBlock.list[index].blockList || [];
      list.push(this.blockCode.cacheList[this.fileBlock.selectedIndex]);
      this.fileBlock.list[index].blockList = list;

      this.blockCode.cacheList.splice(this.fileBlock.selectedIndex, 1);

      this.fileBlock.dropOverIndex = -1;
    },
    fileBlockOnDropOver: function fileBlockOnDropOver(index) {
      this.fileBlock.dropOverIndex = index;
    },
    fileBlockOnDropOut: function fileBlockOnDropOut(event) {
      console.log(event);
      var parent = document.querySelector(".classify");
      if (event.fromElement === parent) {
        this.fileBlock.dropOverIndex = -1;
      }
    },
    addFileBlock: function addFileBlock() {
      var newName = this.fileBlock.newFileBlockName;
      this.fileBlock.list.push({ name: newName, blockList: [] });
      this.fileBlock.visibleAddFileBlock = false;
    },
    block_textarea_select: function block_textarea_select(index, event) {

      this.blockCode.element = event.target;

      this.blockCode.selectedIndex = index;

      this.blockCode.selectionStart = event.target.selectionStart;
    },
    saveNodeData: function saveNodeData(event) {
      var self = this;
      API.MODULE.saveNodeData(event.patch_list, self.selectedNodeId).then(function (res) {
        self.project.changed = false;
      });
    }
  },


  computed: {
    article_markdown_preview_text: function article_markdown_preview_text() {

      return marked(this.project.rawValue);
    }
  },

  mounted: function mounted() {

    var self = this;

    $('#moduleTree').jstree({
      'core': {
        'data': {
          'url': CONSTANT.IP + ":" + CONSTANT.PORT + '/module/tree',
          'data': function data(node) {
            return { 'token': BASE.getToken() };
          }
        },
        "check_callback": true
      },
      "plugins": ["contextmenu", "dnd"],
      contextmenu: {
        "items": {
          "create": {
            "label": "增加节点",
            "action": function action(data) {
              var inst = $.jstree.reference(data.reference),
                  obj = inst.get_node(data.reference);
              inst.create_node(obj, {}, "last", function (new_node) {
                new_node.a_attr.module_id = (0, _uid2.default)(40);
                try {
                  inst.edit(new_node);
                } catch (ex) {
                  setTimeout(function () {
                    inst.edit(new_node);
                  }, 0);
                }
              });
            }
          },
          "rename": {
            "label": "重命名",
            "action": function action(data) {
              var inst = $.jstree.reference(data.reference),
                  obj = inst.get_node(data.reference);

              inst.edit(obj);
            }
          },
          "remove": {
            "label": "删除",
            "action": function action(data) {
              var inst = $.jstree.reference(data.reference),
                  obj = inst.get_node(data.reference);
              if (inst.is_selected(obj)) {
                inst.delete_node(inst.get_selected());
              } else {
                inst.delete_node(obj);
              }
            }
          }
        },
        dnd: {
          dnd_stop: function dnd_stop() {
            console.log(123);
          }
        }
      }
    }).on('changed.jstree', function (e, data) {}).on('move_node.jstree', function (data, element, helper, event) {
      console.log('move_node');
      self.saveTree('move_node');
    }).on('rename_node.jstree', function () {
      self.saveTree('rename_node');console.log('rename_node');
    }).on('delete_node.jstree', function () {
      self.saveTree('delete_node');console.log('delete_node');
    }).on('ready.jstree', function () {

      self.treeNode.EVA = new _EditorValueAdvance2.default();

      self.treeNode.EVA.value = (0, _stringify2.default)($("#moduleTree").jstree("get_json"));
    }).on('select_node.jstree', function (obj, node) {

      self.locKsaveData = true;
      self.selectedNodeId = node.node.a_attr.module_id;
      self.project.value = undefined;
      API.MODULE.loadNodeData(node.node.a_attr.module_id).then(function (res) {
        self.project.selectedNodeId = node.node.a_attr.module_id;
        self.project.offChange = false;

        if (self.selectedNodeId != res.selectedNodeId) {
          console.log('selectedNodeId not equart current node id');
          return;
        }

        setTimeout(function () {
          self.project.nodeName = node.node.text;
          try {
            self.project.value = res.result.content;
          } catch (ex) {
            console.log(ex);
            self.project.value = "";
          }
          self.project.rawValue = self.project.value;
          self.project.offChange = true;
        }, 10);
      });
    });
  }
};

/***/ }),

/***/ "zgqW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},["NHnr"]);
//# sourceMappingURL=app.6e945271159fd5023347.js.map