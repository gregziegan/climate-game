(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.b6.fi === region.cC.fi)
	{
		return 'on line ' + region.b6.fi;
	}
	return 'on lines ' + region.b6.fi + ' through ' + region.cC.fi;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.e2,
		impl.gy,
		impl.f6,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		X: func(record.X),
		b7: record.b7,
		bS: record.bS
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.X;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.b7;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.bS) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.e2,
		impl.gy,
		impl.f6,
		function(sendToApp, initialModel) {
			var view = impl.gA;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.e2,
		impl.gy,
		impl.f6,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.b$ && impl.b$(sendToApp)
			var view = impl.gA;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.bh);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.F) && (_VirtualDom_doc.title = title = doc.F);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.fB;
	var onUrlRequest = impl.fC;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		b$: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.dk === next.dk
							&& curr.cQ === next.cQ
							&& curr.df.a === next.df.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		e2: function(flags)
		{
			return A3(impl.e2, flags, _Browser_getUrl(), key);
		},
		gA: impl.gA,
		gy: impl.gy,
		f6: impl.f6
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { eT: 'hidden', en: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { eT: 'mozHidden', en: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { eT: 'msHidden', en: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { eT: 'webkitHidden', en: 'webkitvisibilitychange' }
		: { eT: 'hidden', en: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		dt: _Browser_getScene(),
		dL: {
			gD: _Browser_window.pageXOffset,
			gE: _Browser_window.pageYOffset,
			dQ: _Browser_doc.documentElement.clientWidth,
			cL: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		dQ: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		cL: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			dt: {
				dQ: node.scrollWidth,
				cL: node.scrollHeight
			},
			dL: {
				gD: node.scrollLeft,
				gE: node.scrollTop,
				dQ: node.clientWidth,
				cL: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			dt: _Browser_getScene(),
			dL: {
				gD: x,
				gE: y,
				dQ: _Browser_doc.documentElement.clientWidth,
				cL: _Browser_doc.documentElement.clientHeight
			},
			eF: {
				gD: x + rect.left,
				gE: y + rect.top,
				dQ: rect.width,
				cL: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $author$project$Main$Flags = function (debug) {
	return {G: debug};
};
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.i) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.l),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.l);
		} else {
			var treeLen = builder.i * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.m) : builder.m;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.i);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.l) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.l);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{m: nodeList, i: (len / $elm$core$Array$branchFactor) | 0, l: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$map = _Json_map1;
var $author$project$Main$decodeFlags = A2(
	$elm$json$Json$Decode$map,
	$author$project$Main$Flags,
	A2($elm$json$Json$Decode$field, 'debug', $elm$json$Json$Decode$bool));
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {cH: fragment, cQ: host, dd: path, df: port_, dk: protocol, dl: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$document = _Browser_document;
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $author$project$Main$FailedToBoot = {$: 1};
var $author$project$Main$InitialTime = function (a) {
	return {$: 3, a: a};
};
var $author$project$Main$Initializing = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$RandomStart = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$random$Random$Generate = $elm$core$Basics$identity;
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = $elm$core$Basics$identity;
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0;
		return function (seed0) {
			var _v1 = genA(seed0);
			var a = _v1.a;
			var seed1 = _v1.b;
			return _Utils_Tuple2(
				func(a),
				seed1);
		};
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0;
		return A2($elm$random$Random$map, func, generator);
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			A2($elm$random$Random$map, tagger, generator));
	});
var $author$project$Economy$Economy = function (occupiedHousing) {
	return function (availableHousing) {
		return function (hospitalBeds) {
			return function (surgeons) {
				return function (openPrimaryEnrollment) {
					return function (openSecondaryEnrollment) {
						return function (openTertiaryEnrollment) {
							return function (food) {
								return function (clothing) {
									return function (prescriptionDrugs) {
										return {ap: availableHousing, et: clothing, eN: food, eU: hospitalBeds, a0: occupiedHousing, fE: openPrimaryEnrollment, fF: openSecondaryEnrollment, fG: openTertiaryEnrollment, fL: prescriptionDrugs, f7: surgeons};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $elm$random$Random$map2 = F3(
	function (func, _v0, _v1) {
		var genA = _v0;
		var genB = _v1;
		return function (seed0) {
			var _v2 = genA(seed0);
			var a = _v2.a;
			var seed1 = _v2.b;
			var _v3 = genB(seed1);
			var b = _v3.a;
			var seed2 = _v3.b;
			return _Utils_Tuple2(
				A2(func, a, b),
				seed2);
		};
	});
var $elm_community$random_extra$Random$Extra$andMap = $elm$random$Random$map2($elm$core$Basics$apR);
var $elm$random$Random$andThen = F2(
	function (callback, _v0) {
		var genA = _v0;
		return function (seed) {
			var _v1 = genA(seed);
			var result = _v1.a;
			var newSeed = _v1.b;
			var _v2 = callback(result);
			var genB = _v2;
			return genB(newSeed);
		};
	});
var $author$project$Housing$locationBased = function (location) {
	switch (location) {
		case 0:
			return 1.0;
		case 1:
			return 1.0;
		default:
			return 1.0;
	}
};
var $author$project$Housing$buildHouse = function (location) {
	return {
		bc: 1,
		bf: 1,
		bm: $author$project$Housing$locationBased(location),
		bp: $author$project$Housing$locationBased(location),
		bB: function () {
			switch (location) {
				case 0:
					return 1;
				case 1:
					return 0.8;
				default:
					return 0.4;
			}
		}(),
		bH: location,
		bT: 1.0,
		cd: $author$project$Housing$locationBased(location)
	};
};
var $author$project$Housing$Rural = 2;
var $author$project$Housing$Suburban = 1;
var $author$project$Housing$Urban = 0;
var $elm$random$Random$addOne = function (value) {
	return _Utils_Tuple2(1, value);
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$float = F2(
	function (a, b) {
		return function (seed0) {
			var seed1 = $elm$random$Random$next(seed0);
			var range = $elm$core$Basics$abs(b - a);
			var n1 = $elm$random$Random$peel(seed1);
			var n0 = $elm$random$Random$peel(seed0);
			var lo = (134217727 & n1) * 1.0;
			var hi = (67108863 & n0) * 1.0;
			var val = ((hi * 134217728.0) + lo) / 9007199254740992.0;
			var scaled = (val * range) + a;
			return _Utils_Tuple2(
				scaled,
				$elm$random$Random$next(seed1));
		};
	});
var $elm$random$Random$getByWeight = F3(
	function (_v0, others, countdown) {
		getByWeight:
		while (true) {
			var weight = _v0.a;
			var value = _v0.b;
			if (!others.b) {
				return value;
			} else {
				var second = others.a;
				var otherOthers = others.b;
				if (_Utils_cmp(
					countdown,
					$elm$core$Basics$abs(weight)) < 1) {
					return value;
				} else {
					var $temp$_v0 = second,
						$temp$others = otherOthers,
						$temp$countdown = countdown - $elm$core$Basics$abs(weight);
					_v0 = $temp$_v0;
					others = $temp$others;
					countdown = $temp$countdown;
					continue getByWeight;
				}
			}
		}
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$random$Random$weighted = F2(
	function (first, others) {
		var normalize = function (_v0) {
			var weight = _v0.a;
			return $elm$core$Basics$abs(weight);
		};
		var total = normalize(first) + $elm$core$List$sum(
			A2($elm$core$List$map, normalize, others));
		return A2(
			$elm$random$Random$map,
			A2($elm$random$Random$getByWeight, first, others),
			A2($elm$random$Random$float, 0, total));
	});
var $elm$random$Random$uniform = F2(
	function (value, valueList) {
		return A2(
			$elm$random$Random$weighted,
			$elm$random$Random$addOne(value),
			A2($elm$core$List$map, $elm$random$Random$addOne, valueList));
	});
var $author$project$Housing$genLocation = A2(
	$elm$random$Random$uniform,
	0,
	_List_fromArray(
		[1, 2]));
var $author$project$Housing$generate = A2($elm$random$Random$map, $author$project$Housing$buildHouse, $author$project$Housing$genLocation);
var $elm$random$Random$int = F2(
	function (a, b) {
		return function (seed0) {
			var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
			var lo = _v0.a;
			var hi = _v0.b;
			var range = (hi - lo) + 1;
			if (!((range - 1) & range)) {
				return _Utils_Tuple2(
					(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
					$elm$random$Random$next(seed0));
			} else {
				var threshhold = (((-range) >>> 0) % range) >>> 0;
				var accountForBias = function (seed) {
					accountForBias:
					while (true) {
						var x = $elm$random$Random$peel(seed);
						var seedN = $elm$random$Random$next(seed);
						if (_Utils_cmp(x, threshhold) < 0) {
							var $temp$seed = seedN;
							seed = $temp$seed;
							continue accountForBias;
						} else {
							return _Utils_Tuple2((x % range) + lo, seedN);
						}
					}
				};
				return accountForBias(seed0);
			}
		};
	});
var $elm$random$Random$listHelp = F4(
	function (revList, n, gen, seed) {
		listHelp:
		while (true) {
			if (n < 1) {
				return _Utils_Tuple2(revList, seed);
			} else {
				var _v0 = gen(seed);
				var value = _v0.a;
				var newSeed = _v0.b;
				var $temp$revList = A2($elm$core$List$cons, value, revList),
					$temp$n = n - 1,
					$temp$gen = gen,
					$temp$seed = newSeed;
				revList = $temp$revList;
				n = $temp$n;
				gen = $temp$gen;
				seed = $temp$seed;
				continue listHelp;
			}
		}
	});
var $elm$random$Random$list = F2(
	function (n, _v0) {
		var gen = _v0;
		return function (seed) {
			return A4($elm$random$Random$listHelp, _List_Nil, n, gen, seed);
		};
	});
var $author$project$Economy$genAvailableHousing = A2(
	$elm$random$Random$andThen,
	function (len) {
		return A2($elm$random$Random$list, len, $author$project$Housing$generate);
	},
	A2($elm$random$Random$int, 5, 15));
var $author$project$Economy$genClothing = A2($elm$random$Random$int, 10, 20);
var $author$project$Economy$genFood = A2($elm$random$Random$int, 10, 20);
var $author$project$Economy$genHospitalBeds = A2($elm$random$Random$int, 10, 20);
var $elm$random$Random$constant = function (value) {
	return function (seed) {
		return _Utils_Tuple2(value, seed);
	};
};
var $author$project$Economy$genOccupiedHousing = $elm$random$Random$constant(_List_Nil);
var $author$project$Economy$genOpenPrimaryEnrollment = $elm$random$Random$constant(0);
var $author$project$Economy$genOpenSecondaryEnrollment = $elm$random$Random$constant(0);
var $author$project$Economy$genOpenTertiaryEnrollment = $elm$random$Random$constant(0);
var $author$project$Economy$genPrescriptionDrugs = A2($elm$random$Random$int, 10, 20);
var $author$project$Economy$genSurgeons = $elm$random$Random$constant(0);
var $author$project$Economy$generate = A2(
	$elm_community$random_extra$Random$Extra$andMap,
	$author$project$Economy$genClothing,
	A2(
		$elm_community$random_extra$Random$Extra$andMap,
		$author$project$Economy$genFood,
		A2(
			$elm_community$random_extra$Random$Extra$andMap,
			$author$project$Economy$genOpenTertiaryEnrollment,
			A2(
				$elm_community$random_extra$Random$Extra$andMap,
				$author$project$Economy$genOpenSecondaryEnrollment,
				A2(
					$elm_community$random_extra$Random$Extra$andMap,
					$author$project$Economy$genOpenPrimaryEnrollment,
					A2(
						$elm_community$random_extra$Random$Extra$andMap,
						$author$project$Economy$genSurgeons,
						A2(
							$elm_community$random_extra$Random$Extra$andMap,
							$author$project$Economy$genPrescriptionDrugs,
							A2(
								$elm_community$random_extra$Random$Extra$andMap,
								$author$project$Economy$genHospitalBeds,
								A2(
									$elm_community$random_extra$Random$Extra$andMap,
									$author$project$Economy$genAvailableHousing,
									A2($elm$random$Random$map, $author$project$Economy$Economy, $author$project$Economy$genOccupiedHousing))))))))));
var $author$project$Person$Person = function (id) {
	return function (name) {
		return function (age) {
			return function (job) {
				return function (hasPrimaryEducation) {
					return function (hasSecondaryEducation) {
						return function (tertiaryQualifications) {
							return function (interest) {
								return function (wantsLivingRoom) {
									return function (wantsFlexRoom) {
										return function (prescriptionsNeeded) {
											return function (surgeriesNeeded) {
												return function (needsHospitalization) {
													return function (house) {
														return {bc: age, eQ: hasPrimaryEducation, eR: hasSecondaryEducation, eW: house, e_: id, bA: interest, ff: job, aF: name, bN: needsHospitalization, a4: prescriptionsNeeded, a8: surgeriesNeeded, r: tertiaryQualifications, dM: wantsFlexRoom, dN: wantsLivingRoom};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Person$genAge = A2($elm$random$Random$int, 0, 100);
var $author$project$Person$genHousing = $elm$random$Random$constant(
	$elm$core$Maybe$Just(
		$author$project$Housing$buildHouse(0)));
var $elm$random$Random$maxInt = 2147483647;
var $elm$random$Random$minInt = -2147483648;
var $author$project$Person$genId = A2($elm$random$Random$int, $elm$random$Random$minInt, $elm$random$Random$maxInt);
var $author$project$Person$Engineering = 1;
var $author$project$Person$Medical = 0;
var $author$project$Person$SocialWork = 2;
var $author$project$Person$Teaching = 3;
var $author$project$Person$Trade = 4;
var $author$project$Person$Unknown = 5;
var $author$project$Person$genInterest = A2(
	$elm$random$Random$uniform,
	4,
	_List_fromArray(
		[0, 1, 2, 3, 5]));
var $author$project$Job$Carpenter = 8;
var $author$project$Job$CivilEngineer = 3;
var $author$project$Job$Doctor = 1;
var $author$project$Job$Electrician = 9;
var $author$project$Job$Farmer = 0;
var $author$project$Job$Nurse = 2;
var $author$project$Job$Professor = 7;
var $author$project$Job$Programmer = 4;
var $author$project$Job$SocialWorker = 5;
var $author$project$Job$Teacher = 6;
var $author$project$Job$train = function (title) {
	switch (title) {
		case 1:
			return {I: 100000, F: title};
		case 2:
			return {I: 80000, F: title};
		case 3:
			return {I: 70000, F: title};
		case 4:
			return {I: 80000, F: title};
		case 5:
			return {I: 65000, F: title};
		case 6:
			return {I: 75000, F: title};
		case 7:
			return {I: 85000, F: title};
		case 8:
			return {I: 50000, F: title};
		case 9:
			return {I: 55000, F: title};
		default:
			return {I: 50000, F: title};
	}
};
var $author$project$Job$generate = A2(
	$elm$random$Random$map,
	$author$project$Job$train,
	A2(
		$elm$random$Random$uniform,
		0,
		_List_fromArray(
			[1, 2, 3, 4, 5, 6, 7, 8, 9])));
var $author$project$Person$genJob = A3(
	$elm$random$Random$map2,
	F2(
		function (n, job) {
			return (n < 10) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(job);
		}),
	A2($elm$random$Random$int, 1, 100),
	$author$project$Job$generate);
var $author$project$Person$genName = A2(
	$elm$random$Random$uniform,
	'Alexandria',
	_List_fromArray(
		['Bernard', 'Marquita', 'Noam', 'Karl']));
var $author$project$Person$genNeedsHospitalization = A2(
	$elm$random$Random$map,
	function (n) {
		return n < 5;
	},
	A2($elm$random$Random$int, 1, 100));
var $author$project$Person$genPrescriptionsNeeded = A2($elm$random$Random$int, 0, 5);
var $author$project$Person$genPrimaryEducation = A2(
	$elm$random$Random$map,
	function (n) {
		return n < 90;
	},
	A2($elm$random$Random$int, 1, 100));
var $author$project$Person$genSecondaryEducation = A2(
	$elm$random$Random$map,
	function (n) {
		return n < 75;
	},
	A2($elm$random$Random$int, 1, 100));
var $author$project$Person$genSurgeriesNeeded = A2($elm$random$Random$int, 0, 2);
var $author$project$Person$EngineeringDegree = 1;
var $author$project$Person$MedicalDegree = 3;
var $author$project$Person$SocialWorkDegree = 2;
var $author$project$Person$TeachingDegree = 4;
var $author$project$Person$TradeDegree = 0;
var $author$project$Person$generateQualification = A2(
	$elm$random$Random$uniform,
	0,
	_List_fromArray(
		[1, 2, 3, 4]));
var $author$project$Person$genTertiaryEducation = A2(
	$elm$random$Random$andThen,
	function (len) {
		return A2($elm$random$Random$list, len, $author$project$Person$generateQualification);
	},
	A2($elm$random$Random$int, 1, 3));
var $elm_community$random_extra$Random$Extra$bool = A2(
	$elm$random$Random$uniform,
	true,
	_List_fromArray(
		[false]));
var $author$project$Person$genWantsFlexRoom = $elm_community$random_extra$Random$Extra$bool;
var $author$project$Person$genWantsLivingRoom = $elm_community$random_extra$Random$Extra$bool;
var $author$project$Person$generate = A2(
	$elm_community$random_extra$Random$Extra$andMap,
	$author$project$Person$genHousing,
	A2(
		$elm_community$random_extra$Random$Extra$andMap,
		$author$project$Person$genNeedsHospitalization,
		A2(
			$elm_community$random_extra$Random$Extra$andMap,
			$author$project$Person$genSurgeriesNeeded,
			A2(
				$elm_community$random_extra$Random$Extra$andMap,
				$author$project$Person$genPrescriptionsNeeded,
				A2(
					$elm_community$random_extra$Random$Extra$andMap,
					$author$project$Person$genWantsFlexRoom,
					A2(
						$elm_community$random_extra$Random$Extra$andMap,
						$author$project$Person$genWantsLivingRoom,
						A2(
							$elm_community$random_extra$Random$Extra$andMap,
							$author$project$Person$genInterest,
							A2(
								$elm_community$random_extra$Random$Extra$andMap,
								$author$project$Person$genTertiaryEducation,
								A2(
									$elm_community$random_extra$Random$Extra$andMap,
									$author$project$Person$genSecondaryEducation,
									A2(
										$elm_community$random_extra$Random$Extra$andMap,
										$author$project$Person$genPrimaryEducation,
										A2(
											$elm_community$random_extra$Random$Extra$andMap,
											$author$project$Person$genJob,
											A2(
												$elm_community$random_extra$Random$Extra$andMap,
												$author$project$Person$genAge,
												A2(
													$elm_community$random_extra$Random$Extra$andMap,
													$author$project$Person$genName,
													A2($elm$random$Random$map, $author$project$Person$Person, $author$project$Person$genId))))))))))))));
var $author$project$Population$generate = A2(
	$elm$random$Random$andThen,
	function (len) {
		return A2($elm$random$Random$list, len, $author$project$Person$generate);
	},
	A2($elm$random$Random$int, 5, 15));
var $elm$random$Random$pair = F2(
	function (genA, genB) {
		return A3(
			$elm$random$Random$map2,
			F2(
				function (a, b) {
					return _Utils_Tuple2(a, b);
				}),
			genA,
			genB);
	});
var $author$project$Main$generateStart = A2($elm$random$Random$pair, $author$project$Economy$generate, $author$project$Population$generate);
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Main$initialPage = F2(
	function (potentialFlags, initialWorldModel) {
		if (!potentialFlags.$) {
			var flags = potentialFlags.a;
			return _Utils_Tuple2(
				$author$project$Main$Initializing(
					{bj: flags.G, h: $elm$core$Maybe$Nothing, v: $elm$core$Maybe$Nothing, ca: $elm$core$Maybe$Nothing, g: initialWorldModel}),
				$elm$core$Platform$Cmd$batch(
					_List_fromArray(
						[
							A2($elm$core$Task$perform, $author$project$Main$InitialTime, $elm$time$Time$now),
							A2($elm$random$Random$generate, $author$project$Main$RandomStart, $author$project$Main$generateStart)
						])));
		} else {
			return _Utils_Tuple2($author$project$Main$FailedToBoot, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$entity = F3(
	function (entityString, name, description) {
		return _Utils_Tuple2(
			entityString,
			{aC: description, aF: name});
	});
var $author$project$Main$initialWorldModelSpec = _List_fromArray(
	[
		A3($author$project$Main$entity, 'OFFICE.location', 'Presidential office', 'Office of the president (you).'),
		A3($author$project$Main$entity, 'OFFICE_ENTRANCE.location', 'Entrance to your office', 'News crews and protestors show up here time to time.'),
		A3($author$project$Main$entity, 'PLAYER.current_location=OFFICE_ENTRANCE', 'Yourself', 'You are the president of your country.'),
		A3($author$project$Main$entity, 'LEGISLATOR.character.upset.current_location=OFFICE', 'Legislator', 'Always busy drafting bills for our country.'),
		A3($author$project$Main$entity, 'SIGN.choice.current_location=OFFICE', 'Sign bill', 'Approve the legislator\'s bill'),
		A3($author$project$Main$entity, 'VETO.choice.current_location=OFFICE', 'Veto', 'Veto the legislator\'s bill'),
		A3($author$project$Main$entity, 'EXPLAIN.choice.current_location=OFFICE', 'Explain further', '{?Could you explain further?|Alright, let me hear more.|Please continue.}')
	]);
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		if (ra.$ === 1) {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				if (rc.$ === 1) {
					var x = rc.a;
					return $elm$core$Result$Err(x);
				} else {
					var c = rc.a;
					return $elm$core$Result$Ok(
						A3(func, a, b, c));
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $author$project$Main$content__________________________________ = $elm$core$Dict$insert;
var $author$project$Main$narrative_content = A3(
	$author$project$Main$content__________________________________,
	'moving around',
	'You go explore over there.',
	A3(
		$author$project$Main$content__________________________________,
		'introducing the legislator',
		'Hey Malcolm, how\'s it going?',
		A3($author$project$Main$content__________________________________, 'entering the office for the first time', 'You\'re eager to start your first day as president. What to do first?', $elm$core$Dict$empty)));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$deadEndsToString = function (deadEnds) {
	var problemToString = function (p) {
		switch (p.$) {
			case 0:
				var s = p.a;
				return 'expecting \'' + (s + '\'');
			case 1:
				return 'expecting int';
			case 2:
				return 'expecting hex';
			case 3:
				return 'expecting octal';
			case 4:
				return 'expecting binary';
			case 5:
				return 'expecting float';
			case 6:
				return 'expecting number';
			case 7:
				return 'expecting variable';
			case 8:
				var s = p.a;
				return 'expecting symbol \'' + (s + '\'');
			case 9:
				var s = p.a;
				return 'expecting keyword \'' + (s + '\'');
			case 10:
				return 'expecting end';
			case 11:
				return 'unexpected char';
			case 12:
				var s = p.a;
				return 'problem ' + s;
			default:
				return 'bad repeat';
		}
	};
	var deadEndToString = function (deadend) {
		return problemToString(deadend.dh) + (' at row ' + ($elm$core$String$fromInt(deadend.dp) + (', col ' + $elm$core$String$fromInt(deadend.cw))));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$intersperse,
			'; ',
			A2($elm$core$List$map, deadEndToString, deadEnds)));
};
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {cw: col, ew: contextStack, dh: problem, dp: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.dp, s.cw, x, s.c));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.f2),
			s.a) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$UnexpectedChar = {$: 11};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.a, s.f2);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cw: 1, c: s.c, d: s.d, a: s.a + 1, dp: s.dp + 1, f2: s.f2}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{cw: s.cw + 1, c: s.c, d: s.d, a: newOffset, dp: s.dp, f2: s.f2}));
		};
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.f2);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.a, offset) < 0,
					0,
					{cw: col, c: s0.c, d: s0.d, a: offset, dp: row, f2: s0.f2});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.a, s.dp, s.cw, s);
	};
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3($elm$core$String$slice, s0.a, s1.a, s0.f2),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty = function (s) {
	return $elm$core$String$isEmpty(s) ? $elm$parser$Parser$problem('cannot be empty') : $elm$parser$Parser$succeed(s);
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser = function () {
	var valid = function (c) {
		return $elm$core$Char$isAlphaNum(c) || A2(
			$elm$core$List$member,
			c,
			_List_fromArray(
				['_', '-', ':', '#', '+']));
	};
	return A2(
		$elm$parser$Parser$andThen,
		$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty,
		$elm$parser$Parser$getChompedString(
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(0),
					$elm$parser$Parser$chompIf($elm$core$Char$isAlpha)),
				$elm$parser$Parser$chompWhile(valid))));
}();
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$addTag = F2(
	function (value, entity) {
		return _Utils_update(
			entity,
			{
				dF: A2($elm$core$Set$insert, value, entity.dF)
			});
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyLinks = $elm$core$Dict$empty;
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyStats = $elm$core$Dict$empty;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyTags = $elm$core$Set$empty;
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0;
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.a, s.dp, s.cw, s.f2);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{cw: newCol, c: s.c, d: s.d, a: newOffset, dp: newRow, f2: s.f2});
	};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser = function () {
	var int_ = A2(
		$elm$parser$Parser$andThen,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$String$toInt,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Maybe$map($elm$parser$Parser$succeed),
				$elm$core$Maybe$withDefault(
					$elm$parser$Parser$problem('not an int')))),
		$elm$parser$Parser$getChompedString(
			$elm$parser$Parser$chompWhile($elm$core$Char$isDigit)));
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$negate),
					$elm$parser$Parser$symbol('-')),
				int_),
				int_
			]));
}();
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser = function () {
	var valid = function (c) {
		return $elm$core$Char$isAlphaNum(c) || A2(
			$elm$core$List$member,
			c,
			_List_fromArray(
				['_', ':', '#']));
	};
	return A2(
		$elm$parser$Parser$andThen,
		$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty,
		$elm$parser$Parser$getChompedString(
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(0),
				$elm$parser$Parser$chompWhile(valid))));
}();
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setLink = F3(
	function (key, value, entity) {
		return _Utils_update(
			entity,
			{
				c2: A3($elm$core$Dict$insert, key, value, entity.c2)
			});
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setStat = F3(
	function (key, value, entity) {
		return _Utils_update(
			entity,
			{
				n: A3($elm$core$Dict$insert, key, value, entity.n)
			});
	});
var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\n') || (c === '\r'));
	});
var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propsParser = function () {
	var toComponent = F2(
		function (key, fn) {
			return fn(key);
		});
	var helper = function (acc) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed(toComponent),
								$elm$parser$Parser$spaces),
							$elm$parser$Parser$symbol('.')),
						$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed($elm$core$Basics$identity),
									$elm$parser$Parser$symbol('=')),
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											$elm$parser$Parser$map,
											function (v) {
												return function (k) {
													return $elm$parser$Parser$Loop(
														A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setLink, k, v, acc));
												};
											},
											$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser),
											A2(
											$elm$parser$Parser$map,
											function (v) {
												return function (k) {
													return $elm$parser$Parser$Loop(
														A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setStat, k, v, acc));
												};
											},
											$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser)
										]))),
								$elm$parser$Parser$succeed(
								function (t) {
									return $elm$parser$Parser$Loop(
										A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$addTag, t, acc));
								})
							]))),
					$elm$parser$Parser$succeed(
					$elm$parser$Parser$Done(acc))
				]));
	};
	var emptyNarrativeComponent = {c2: $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyLinks, n: $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyStats, dF: $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$emptyTags};
	return A2($elm$parser$Parser$loop, emptyNarrativeComponent, helper);
}();
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$entityParser = function () {
	var toEntity = F2(
		function (id, narrativeComponent) {
			return _Utils_Tuple2(id, narrativeComponent);
		});
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed(toEntity),
			$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser),
		A2($elm$parser$Parser$ignorer, $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propsParser, $elm$parser$Parser$end));
}();
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {cw: col, dh: problem, dp: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.dp, p.cw, p.dh);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{cw: 1, c: _List_Nil, d: 1, a: 0, dp: 1, f2: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$parseEntity = F2(
	function (extendFn, _v0) {
		var text = _v0.a;
		var extraFields = _v0.b;
		return A2(
			$elm$core$Result$mapError,
			$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$deadEndsToString,
			A2(
				$elm$core$Result$map,
				$elm$core$Tuple$mapSecond(
					extendFn(extraFields)),
				A2($elm$parser$Parser$run, $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$entityParser, text)));
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$parseMany = F2(
	function (extendFn, entities) {
		var displayError = F2(
			function (source, e) {
				return _Utils_Tuple2('Entity def: ' + source, e);
			});
		var addParsedEntity = F2(
			function (entity, acc) {
				var source = entity.a;
				var extraFields = entity.b;
				var _v0 = A2($jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$parseEntity, extendFn, entity);
				if (!_v0.$) {
					var _v1 = _v0.a;
					var id = _v1.a;
					var parsedEntity = _v1.b;
					return A2(
						$elm$core$Result$map,
						A2($elm$core$Dict$insert, id, parsedEntity),
						acc);
				} else {
					var err = _v0.a;
					if (!acc.$) {
						return $elm$core$Result$Err(
							_List_fromArray(
								[
									A2(displayError, source, err)
								]));
					} else {
						var errors = acc.a;
						return $elm$core$Result$Err(
							A2(
								$elm$core$List$cons,
								A2(displayError, source, err),
								errors));
					}
				}
			});
		return A3(
			$elm$core$List$foldl,
			addParsedEntity,
			$elm$core$Result$Ok($elm$core$Dict$empty),
			entities);
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$Looping = 1;
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$Randomly = 2;
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$Sticking = 0;
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0;
	return function (s0) {
		var _v1 = parse(s0);
		if (_v1.$ === 1) {
			var x = _v1.b;
			return A2($elm$parser$Parser$Advanced$Bad, false, x);
		} else {
			var a = _v1.b;
			var s1 = _v1.c;
			return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
		}
	};
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$break = $elm$parser$Parser$symbol('|');
var $elm$parser$Parser$Advanced$findSubString = _Parser_findSubString;
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$parser$Parser$Advanced$chompUntil = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$findSubString, str, s.a, s.dp, s.cw, s.f2);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A4($elm$parser$Parser$Advanced$fromInfo, newRow, newCol, expecting, s.c)) : A3(
			$elm$parser$Parser$Advanced$Good,
			_Utils_cmp(s.a, newOffset) < 0,
			0,
			{cw: newCol, c: s.c, d: s.d, a: newOffset, dp: newRow, f2: s.f2});
	};
};
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$chompUntil = function (str) {
	return $elm$parser$Parser$Advanced$chompUntil(
		$elm$parser$Parser$toToken(str));
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close = $elm$parser$Parser$symbol('}');
var $elm$parser$Parser$Advanced$commit = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, true, a, s);
	};
};
var $elm$parser$Parser$commit = $elm$parser$Parser$Advanced$commit;
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{m: nodeList, i: nodeListSize, l: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return function (s) {
		var _v0 = thunk(0);
		var parse = _v0;
		return parse(s);
	};
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$open = $elm$parser$Parser$symbol('{');
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareLink = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareStat = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasTag = function (a) {
	return {$: 0, a: a};
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Not = function (a) {
	return {$: 3, a: a};
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLink = function (a) {
	return {$: 0, a: a};
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificStat = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 9, a: a};
};
var $elm$parser$Parser$Advanced$keyword = function (_v0) {
	var kwd = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(kwd);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, kwd, s.a, s.dp, s.cw, s.f2);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return (_Utils_eq(newOffset, -1) || (0 <= A3(
			$elm$parser$Parser$Advanced$isSubChar,
			function (c) {
				return $elm$core$Char$isAlphaNum(c) || (c === '_');
			},
			newOffset,
			s.f2))) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{cw: newCol, c: s.c, d: s.d, a: newOffset, dp: newRow, f2: s.f2});
	};
};
var $elm$parser$Parser$keyword = function (kwd) {
	return $elm$parser$Parser$Advanced$keyword(
		A2(
			$elm$parser$Parser$Advanced$Token,
			kwd,
			$elm$parser$Parser$ExpectingKeyword(kwd)));
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$MatchAny = function (a) {
	return {$: 1, a: a};
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$selectorParser = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$map,
			$elm$core$Basics$always($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$MatchAny),
			$elm$parser$Parser$symbol('*')),
			A2(
			$elm$parser$Parser$map,
			$elm$core$Basics$always(
				$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match('$')),
			$elm$parser$Parser$symbol('$')),
			A2($elm$parser$Parser$map, $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match, $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser)
		]));
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
function $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$matcherParser() {
	var toMatcher = F2(
		function (selector, queries) {
			return selector(queries);
		});
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed(toMatcher),
			$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$selectorParser),
		$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$queriesParser());
}
function $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$queriesParser() {
	var toQuery = F4(
		function (acc, negate, propName, queryConstructor) {
			return negate ? $elm$parser$Parser$Loop(
				A2(
					$elm$core$List$cons,
					$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Not(
						queryConstructor(propName)),
					acc)) : $elm$parser$Parser$Loop(
				A2(
					$elm$core$List$cons,
					queryConstructor(propName),
					acc));
		});
	var compareParser = F2(
		function (kind, mapper) {
			return A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed(mapper),
							$elm$parser$Parser$keyword('(' + kind)),
						$elm$parser$Parser$chompWhile(
							$elm$core$Basics$eq(' '))),
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									$elm$parser$Parser$map,
									$elm$core$Basics$always('$'),
									$elm$parser$Parser$token('$')),
									$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser
								])),
						$elm$parser$Parser$symbol('.'))),
				A2(
					$elm$parser$Parser$ignorer,
					$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser,
					$elm$parser$Parser$symbol(')')));
		});
	var helper = function (acc) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed(
									toQuery(acc)),
								$elm$parser$Parser$symbol('.')),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$map,
										$elm$core$Basics$always(true),
										$elm$parser$Parser$symbol('!')),
										$elm$parser$Parser$succeed(false)
									]))),
						$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed($elm$core$Basics$identity),
									$elm$parser$Parser$symbol('>')),
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											compareParser,
											'stat',
											F3(
												function (compareID, compareKey, key) {
													return A3(
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														2,
														A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareStat, compareID, compareKey));
												})),
											A2(
											$elm$parser$Parser$map,
											function (n) {
												return function (key) {
													return A3(
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														2,
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificStat(n));
												};
											},
											$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser)
										]))),
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed($elm$core$Basics$identity),
									$elm$parser$Parser$symbol('<')),
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											compareParser,
											'stat',
											F3(
												function (compareID, compareKey, key) {
													return A3(
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														0,
														A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareStat, compareID, compareKey));
												})),
											A2(
											$elm$parser$Parser$map,
											function (n) {
												return function (key) {
													return A3(
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														0,
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificStat(n));
												};
											},
											$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser)
										]))),
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed($elm$core$Basics$identity),
									$elm$parser$Parser$symbol('=')),
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											$elm$parser$Parser$map,
											function (n) {
												return function (key) {
													return A3(
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														1,
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificStat(n));
												};
											},
											$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser),
											A2(
											$elm$parser$Parser$map,
											function (_v0) {
												return function (key) {
													return A2(
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
														key,
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLink(
															A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match, '$', _List_Nil)));
												};
											},
											$elm$parser$Parser$symbol('$')),
											A2(
											$elm$parser$Parser$map,
											function (id) {
												return function (key) {
													return A2(
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
														key,
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLink(
															A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match, id, _List_Nil)));
												};
											},
											$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser),
											A2(
											compareParser,
											'stat',
											F3(
												function (compareID, compareKey, key) {
													return A3(
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
														key,
														1,
														A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareStat, compareID, compareKey));
												})),
											A2(
											compareParser,
											'link',
											F3(
												function (compareID, compareKey, key) {
													return A2(
														$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
														key,
														A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareLink, compareID, compareKey));
												})),
											A2(
											$elm$parser$Parser$keeper,
											A2(
												$elm$parser$Parser$ignorer,
												$elm$parser$Parser$succeed($elm$core$Basics$identity),
												$elm$parser$Parser$symbol('(')),
											A2(
												$elm$parser$Parser$ignorer,
												A2(
													$elm$parser$Parser$map,
													function (matcher) {
														return function (key) {
															return A2(
																$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
																key,
																$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLink(matcher));
														};
													},
													$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$matcherParser()),
												$elm$parser$Parser$symbol(')')))
										]))),
								$elm$parser$Parser$succeed(
								function (t) {
									return $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasTag(t);
								})
							]))),
					$elm$parser$Parser$succeed(
					$elm$parser$Parser$Done(acc))
				]));
	};
	return A2($elm$parser$Parser$loop, _List_Nil, helper);
}
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$matcherParser = $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$matcherParser();
$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$matcherParser = function () {
	return $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$matcherParser;
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$queriesParser = $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$queriesParser();
$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$cyclic$queriesParser = function () {
	return $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$queriesParser;
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseMatcher = function (text) {
	return A2(
		$elm$core$Result$mapError,
		$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$deadEndsToString,
		A2(
			$elm$parser$Parser$run,
			A2($elm$parser$Parser$ignorer, $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$matcherParser, $elm$parser$Parser$end),
			text));
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$sequence = function (list) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (r, acc) {
				if (!r.$) {
					var a = r.a;
					return A2(
						$elm$core$Result$map,
						$elm$core$List$cons(a),
						acc);
				} else {
					var e = r.a;
					return $elm$core$Result$Err(e);
				}
			}),
		$elm$core$Result$Ok(_List_Nil),
		list);
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$parseMultiple = F2(
	function (parser, strings) {
		return $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$sequence(
			A2($elm$core$List$map, parser, strings));
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$fromResult = function (res) {
	if (!res.$) {
		var s = res.a;
		return $elm$parser$Parser$succeed(s);
	} else {
		var e = res.a;
		return $elm$parser$Parser$problem(e);
	}
};
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$propertyText = function (config) {
	var keywords = A2(
		$elm$core$List$map,
		function (_v0) {
			var propName = _v0.a;
			var fn = _v0.b;
			return A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(fn),
				$elm$parser$Parser$keyword(propName));
		},
		$elm$core$Dict$toList(config.fM));
	var getProp = F2(
		function (id, propFn) {
			return propFn(
				A3($elm$core$String$replace, '$', config.gw, id));
		});
	return A2(
		$elm$parser$Parser$andThen,
		$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$fromResult,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(getProp),
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$andThen,
						$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty,
						$elm$parser$Parser$getChompedString(
							$elm$parser$Parser$chompWhile(
								function (c) {
									return !A2(
										$elm$core$List$member,
										c,
										_List_fromArray(
											['{', '.', '|', '}']));
								}))),
					$elm$parser$Parser$symbol('.'))),
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$oneOf(keywords),
				$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close)));
};
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasStat = F5(
	function (key, comparator, statMatcher, store, entity) {
		if (!statMatcher.$) {
			var value = statMatcher.a;
			return function (actual) {
				return _Utils_eq(
					A2($elm$core$Basics$compare, actual, value),
					comparator);
			}(
				A2(
					$elm$core$Maybe$withDefault,
					0,
					A2($elm$core$Dict$get, key, entity.n)));
		} else {
			var compareID = statMatcher.a;
			var compareKey = statMatcher.b;
			return A2(
				$elm$core$Maybe$withDefault,
				false,
				A2(
					$elm$core$Maybe$map,
					$elm$core$Basics$eq(comparator),
					A3(
						$elm$core$Maybe$map2,
						$elm$core$Basics$compare,
						A2($elm$core$Dict$get, key, entity.n),
						A2(
							$elm$core$Maybe$andThen,
							A2(
								$elm$core$Basics$composeR,
								function ($) {
									return $.n;
								},
								$elm$core$Dict$get(compareKey)),
							A2($elm$core$Dict$get, compareID, store)))));
		}
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasTag = F2(
	function (value, entity) {
		return A2($elm$core$Set$member, value, entity.dF);
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findSpecific = F3(
	function (id, queries, store) {
		var matchesQueries = function (entity) {
			return A2(
				$elm$core$List$all,
				function (q) {
					return A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$queryFn, q, store, entity);
				},
				queries) ? _List_fromArray(
				[
					_Utils_Tuple2(id, entity)
				]) : _List_Nil;
		};
		return A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				matchesQueries,
				A2($elm$core$Dict$get, id, store)));
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasLink = F4(
	function (key, linkMatcher, store, entity) {
		var assertMatch = F2(
			function (matcher, actualID) {
				if (!matcher.$) {
					var expectedID = matcher.a;
					var qs = matcher.b;
					return _Utils_eq(expectedID, actualID) && (!$elm$core$List$isEmpty(
						A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findSpecific, actualID, qs, store)));
				} else {
					var qs = matcher.a;
					return !$elm$core$List$isEmpty(
						A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findSpecific, actualID, qs, store));
				}
			});
		if (!linkMatcher.$) {
			var entityMatcher = linkMatcher.a;
			return A2(
				$elm$core$Maybe$withDefault,
				false,
				A2(
					$elm$core$Maybe$map,
					assertMatch(entityMatcher),
					A2($elm$core$Dict$get, key, entity.c2)));
		} else {
			var compareID = linkMatcher.a;
			var compareKey = linkMatcher.b;
			return A2(
				$elm$core$Maybe$withDefault,
				false,
				A3(
					$elm$core$Maybe$map2,
					$elm$core$Basics$eq,
					A2($elm$core$Dict$get, key, entity.c2),
					A2(
						$elm$core$Maybe$andThen,
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.c2;
							},
							$elm$core$Dict$get(compareKey)),
						A2($elm$core$Dict$get, compareID, store))));
		}
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$queryFn = F2(
	function (q, store) {
		switch (q.$) {
			case 0:
				var value = q.a;
				return $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasTag(value);
			case 1:
				var key = q.a;
				var comparator = q.b;
				var value = q.c;
				return A4($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasStat, key, comparator, value, store);
			case 2:
				var key = q.a;
				var value = q.b;
				return A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$hasLink, key, value, store);
			default:
				var nestedQuery = q.a;
				return A2(
					$elm$core$Basics$composeL,
					$elm$core$Basics$not,
					A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$queryFn, nestedQuery, store));
		}
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findGeneral = F2(
	function (queries, store) {
		var gatherMatches = F2(
			function (id, entity) {
				return A2(
					$elm$core$List$all,
					function (q) {
						return A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$queryFn, q, store, entity);
					},
					queries);
			});
		return $elm$core$Dict$toList(
			A2($elm$core$Dict$filter, gatherMatches, store));
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query = F2(
	function (matcher, store) {
		if (!matcher.$) {
			var id = matcher.a;
			var queries = matcher.b;
			return A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findSpecific, id, queries, store);
		} else {
			var queries = matcher.a;
			return A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$findGeneral, queries, store);
		}
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$replaceTrigger = F2(
	function (trigger, matcher) {
		var replaceInSelector = function (id) {
			return (id === '$') ? trigger : id;
		};
		var replaceInQuery = function (q) {
			_v1$3:
			while (true) {
				switch (q.$) {
					case 1:
						if ((q.c.$ === 1) && (q.c.a === '$')) {
							var key = q.a;
							var comparison = q.b;
							var _v3 = q.c;
							var compareKey = _v3.b;
							return A3(
								$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasStat,
								key,
								comparison,
								A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareStat, trigger, compareKey));
						} else {
							break _v1$3;
						}
					case 2:
						if (!q.b.$) {
							if ((!q.b.a.$) && (q.b.a.a === '$')) {
								var key = q.a;
								var _v2 = q.b.a;
								var queries = _v2.b;
								return A2(
									$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
									key,
									$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLink(
										A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match, trigger, queries)));
							} else {
								break _v1$3;
							}
						} else {
							if (q.b.a === '$') {
								var key = q.a;
								var _v4 = q.b;
								var compareKey = _v4.b;
								return A2(
									$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$HasLink,
									key,
									A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$CompareLink, trigger, compareKey));
							} else {
								break _v1$3;
							}
						}
					default:
						break _v1$3;
				}
			}
			return q;
		};
		if (matcher.$ === 1) {
			var queries = matcher.a;
			return $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$MatchAny(
				A2($elm$core$List$map, replaceInQuery, queries));
		} else {
			var id = matcher.a;
			var queries = matcher.b;
			return A2(
				$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match,
				replaceInSelector(id),
				A2($elm$core$List$map, replaceInQuery, queries));
		}
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$notReserved = function (_char) {
	return !A2(
		$elm$core$List$member,
		_char,
		_List_fromArray(
			['{', '}', '|']));
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$staticText = A2(
	$elm$parser$Parser$andThen,
	$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty,
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed(0),
			$elm$parser$Parser$chompWhile($jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$notReserved))));
var $elm$core$String$trim = _String_trim;
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$conditionalText = function (config) {
	var assert = function (matcher) {
		return !$elm$core$List$isEmpty(
			A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query, matcher, config.g));
	};
	var process = function (_v5) {
		var queryText = _v5.a;
		var ifText = _v5.b;
		var elseText = _v5.c;
		return function (_final) {
			if (!_final.$) {
				if (_final.a) {
					return $elm$parser$Parser$commit(ifText);
				} else {
					return $elm$parser$Parser$commit(elseText);
				}
			} else {
				var e = _final.a;
				return $elm$parser$Parser$problem(e);
			}
		}(
			A2(
				$elm$core$Result$map,
				$elm$core$List$all(
					A2(
						$elm$core$Basics$composeR,
						$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$replaceTrigger(config.gw),
						assert)),
				A2(
					$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$parseMultiple,
					$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseMatcher,
					A2(
						$elm$core$List$map,
						$elm$core$String$trim,
						A2($elm$core$String$split, '&', queryText)))));
	};
	return A2(
		$elm$parser$Parser$andThen,
		process,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$keeper,
					$elm$parser$Parser$succeed(
						F3(
							function (a, b, c) {
								return _Utils_Tuple3(a, b, c);
							})),
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$andThen,
							$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$notEmpty,
							$elm$parser$Parser$getChompedString(
								$elm$parser$Parser$chompUntil('?'))),
						$elm$parser$Parser$symbol('?'))),
				$elm$parser$Parser$lazy(
					function (_v2) {
						return $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseText(config);
					})),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed($elm$core$Basics$identity),
							$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$break),
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$lazy(
								function (_v3) {
									return $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseText(config);
								}),
							$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close)),
						A2(
						$elm$parser$Parser$map,
						$elm$core$Basics$always(''),
						$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close)
					]))));
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$cyclingText = function (config) {
	var helper = function (acc) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					$elm$core$Basics$always(
						$elm$parser$Parser$Loop(
							A2($elm$core$List$cons, '', acc))),
					$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$break),
					A2(
					$elm$parser$Parser$map,
					$elm$core$Basics$always(
						$elm$parser$Parser$Done(
							$elm$core$List$reverse(
								A2($elm$core$List$cons, '', acc)))),
					$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close),
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						$elm$parser$Parser$succeed(
							F2(
								function (a, f) {
									return f(a);
								})),
						$elm$parser$Parser$lazy(
							function (_v1) {
								return $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseText(config);
							})),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$map,
								$elm$core$Basics$always(
									function (t) {
										return $elm$parser$Parser$Loop(
											A2($elm$core$List$cons, t, acc));
									}),
								$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$break),
								A2(
								$elm$parser$Parser$map,
								$elm$core$Basics$always(
									function (t) {
										return $elm$parser$Parser$Done(
											$elm$core$List$reverse(
												A2($elm$core$List$cons, t, acc)));
									}),
								$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$close)
							])))
				]));
	};
	var findCurrent = F2(
		function (cycleType, l) {
			switch (cycleType) {
				case 2:
					return A2(
						$elm$core$Maybe$withDefault,
						'ERROR finding correct cycling text',
						function (i) {
							return A2(
								$elm$core$Array$get,
								i,
								$elm$core$Array$fromList(l));
						}(
							A2(
								$elm$core$Basics$modBy,
								$elm$core$List$length(l),
								A2(
									$elm$random$Random$step,
									A2($elm$random$Random$int, 0, 200),
									$elm$random$Random$initialSeed(
										config.ez * $elm$core$String$length(config.gw))).a)));
				case 1:
					return A2(
						$elm$core$Maybe$withDefault,
						'ERROR finding correct cycling text',
						A2(
							$elm$core$Array$get,
							A2(
								$elm$core$Basics$modBy,
								$elm$core$List$length(l),
								config.ez),
							$elm$core$Array$fromList(l)));
				default:
					return A2(
						$elm$core$Maybe$withDefault,
						'ERROR finding correct cycling text',
						A2(
							$elm$core$Array$get,
							A2(
								$elm$core$Basics$min,
								$elm$core$List$length(l) - 1,
								config.ez),
							$elm$core$Array$fromList(l)));
			}
		});
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed(findCurrent),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$map,
						$elm$core$Basics$always(1),
						$elm$parser$Parser$symbol('~')),
						A2(
						$elm$parser$Parser$map,
						$elm$core$Basics$always(2),
						$elm$parser$Parser$symbol('?')),
						$elm$parser$Parser$succeed(0)
					]))),
		A2($elm$parser$Parser$loop, _List_Nil, helper));
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseText = function (config) {
	var topLevel = $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$open),
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$elm$parser$Parser$backtrackable(
							$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$conditionalText(config)),
							$elm$parser$Parser$backtrackable(
							$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$propertyText(config)),
							$elm$parser$Parser$backtrackable(
							$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$cyclingText(config))
						]))),
				$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$staticText
			]));
	var join = F2(
		function (next, base) {
			return $elm$parser$Parser$Loop(
				_Utils_ap(next, base));
		});
	var l = function (base) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					join(base),
					topLevel),
					$elm$parser$Parser$succeed(
					$elm$parser$Parser$Done(base))
				]));
	};
	return A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		A2($elm$parser$Parser$loop, '', l));
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$top = function (config) {
	return A2(
		$elm$parser$Parser$ignorer,
		$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseText(config),
		$elm$parser$Parser$end);
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseMany = function (content) {
	var emptyConfig = {ez: 0, fM: $elm$core$Dict$empty, gw: '', g: $elm$core$Dict$empty};
	var displayError = F3(
		function (k, v, e) {
			return _Utils_Tuple2(
				'Narrative content: ' + (k + ('\n' + (v + ' '))),
				$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$deadEndsToString(e));
		});
	return A3(
		$elm$core$Dict$foldl,
		F3(
			function (k, v, acc) {
				var _v0 = A2(
					$elm$parser$Parser$run,
					$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$top(emptyConfig),
					v);
				if (!_v0.$) {
					return acc;
				} else {
					var e = _v0.a;
					if (!acc.$) {
						return $elm$core$Result$Err(
							_List_fromArray(
								[
									A3(displayError, k, v, e)
								]));
					} else {
						var errors = acc.a;
						return $elm$core$Result$Err(
							A2(
								$elm$core$List$cons,
								A3(displayError, k, v, e),
								errors));
					}
				}
			}),
		$elm$core$Result$Ok(0),
		content);
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$EntityTrigger = function (a) {
	return {$: 1, a: a};
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$SpecificTrigger = function (a) {
	return {$: 0, a: a};
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$AddTag = function (a) {
	return {$: 0, a: a};
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$DecStat = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$IncStat = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$LookUpLinkTarget = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$RemoveTag = function (a) {
	return {$: 1, a: a};
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetLink = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetStat = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLinkTarget = function (a) {
	return {$: 0, a: a};
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$changeEntityParser = function () {
	var toUpdateEntity = F3(
		function (acc, propName, updateConstructor) {
			return $elm$parser$Parser$Loop(
				A2(
					$elm$core$List$cons,
					updateConstructor(propName),
					acc));
		});
	var lookupParser = function (mapper) {
		return A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed(mapper),
						$elm$parser$Parser$keyword('(link')),
					$elm$parser$Parser$chompWhile(
						$elm$core$Basics$eq(' '))),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$map,
								$elm$core$Basics$always('$'),
								$elm$parser$Parser$token('$')),
								$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser
							])),
					$elm$parser$Parser$symbol('.'))),
			A2(
				$elm$parser$Parser$ignorer,
				$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser,
				$elm$parser$Parser$symbol(')')));
	};
	var helper = function (acc) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed($elm$core$Basics$identity),
							$elm$parser$Parser$chompWhile(
								$elm$core$Basics$eq(' '))),
						$elm$parser$Parser$symbol('.')),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed(
										function (t) {
											return $elm$parser$Parser$Loop(
												A2(
													$elm$core$List$cons,
													$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$RemoveTag(t),
													acc));
										}),
									$elm$parser$Parser$symbol('-')),
								$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser),
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$keeper,
									$elm$parser$Parser$succeed(
										toUpdateEntity(acc)),
									$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$propertyNameParser),
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											$elm$parser$Parser$keeper,
											A2(
												$elm$parser$Parser$ignorer,
												$elm$parser$Parser$succeed($elm$core$Basics$identity),
												$elm$parser$Parser$symbol('+')),
											A2(
												$elm$parser$Parser$map,
												function (n) {
													return function (key) {
														return A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$IncStat, key, n);
													};
												},
												$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser)),
											A2(
											$elm$parser$Parser$keeper,
											A2(
												$elm$parser$Parser$ignorer,
												$elm$parser$Parser$succeed($elm$core$Basics$identity),
												$elm$parser$Parser$symbol('-')),
											A2(
												$elm$parser$Parser$map,
												function (n) {
													return function (key) {
														return A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$DecStat, key, n);
													};
												},
												$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser)),
											A2(
											$elm$parser$Parser$keeper,
											A2(
												$elm$parser$Parser$ignorer,
												$elm$parser$Parser$succeed($elm$core$Basics$identity),
												$elm$parser$Parser$symbol('=')),
											$elm$parser$Parser$oneOf(
												_List_fromArray(
													[
														A2(
														$elm$parser$Parser$map,
														function (n) {
															return function (key) {
																return A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetStat, key, n);
															};
														},
														$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$numberParser),
														A2(
														$elm$parser$Parser$map,
														function (_v0) {
															return function (key) {
																return A2(
																	$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetLink,
																	key,
																	$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLinkTarget('$'));
															};
														},
														$elm$parser$Parser$symbol('$')),
														A2(
														$elm$parser$Parser$map,
														function (id) {
															return function (key) {
																return A2(
																	$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetLink,
																	key,
																	$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SpecificLinkTarget(id));
															};
														},
														$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser),
														lookupParser(
														F3(
															function (lookupID, lookupKey, key) {
																return A2(
																	$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$SetLink,
																	key,
																	A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$LookUpLinkTarget, lookupID, lookupKey));
															}))
													]))),
											$elm$parser$Parser$succeed(
											function (t) {
												return $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$AddTag(t);
											})
										])))
							]))),
					$elm$parser$Parser$succeed(
					$elm$parser$Parser$Done(acc))
				]));
	};
	return A2($elm$parser$Parser$loop, _List_Nil, helper);
}();
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Update = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$UpdateAll = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$updateTargetParser = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$map,
			$elm$core$Basics$always(
				$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Update('$')),
			$elm$parser$Parser$symbol('$')),
			A2($elm$parser$Parser$map, $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Update, $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$idParser),
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$elm$parser$Parser$symbol('(')),
				$elm$parser$Parser$symbol('*')),
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$map,
					function (queries) {
						return $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$UpdateAll(queries);
					},
					$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$queriesParser),
				$elm$parser$Parser$symbol(')')))
		]));
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$changesParser = function () {
	var toChange = F2(
		function (selector, updates) {
			return selector(updates);
		});
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed(toChange),
			$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$updateTargetParser),
		$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$changeEntityParser);
}();
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$ruleParser = function () {
	var toRule = F3(
		function (trigger, conditions, changes) {
			return {eo: changes, cx: conditions, gw: trigger};
		});
	var specificTriggerParser = A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$succeed($elm$core$Basics$identity),
			$elm$parser$Parser$token('\"')),
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$getChompedString(
				$elm$parser$Parser$chompUntil('\"')),
			$elm$parser$Parser$symbol('\"')));
	var triggerParser = A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed($elm$core$Basics$identity),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$elm$parser$Parser$keyword('ON:'),
							$elm$parser$Parser$keyword('ON')
						]))),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2($elm$parser$Parser$map, $jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$SpecificTrigger, specificTriggerParser),
						A2($elm$parser$Parser$map, $jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$EntityTrigger, $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$matcherParser)
					])),
			$elm$parser$Parser$spaces));
	var conditionsParser = A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$identity),
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							$elm$parser$Parser$keyword('IF:'),
							$elm$parser$Parser$keyword('IF'),
							$elm$parser$Parser$succeed(0)
						]))),
			$elm$parser$Parser$spaces),
		A2(
			$elm$parser$Parser$loop,
			_List_Nil,
			function (acc) {
				return $elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							$elm$parser$Parser$map,
							function (_v1) {
								return $elm$parser$Parser$Done(
									$elm$core$List$reverse(acc));
							},
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											$elm$parser$Parser$keyword('DO:'),
											$elm$parser$Parser$keyword('DO'),
											$elm$parser$Parser$end
										])),
								$elm$parser$Parser$spaces)),
							A2(
							$elm$parser$Parser$map,
							function (condition) {
								return $elm$parser$Parser$Loop(
									A2($elm$core$List$cons, condition, acc));
							},
							A2($elm$parser$Parser$ignorer, $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$matcherParser, $elm$parser$Parser$spaces))
						]));
			}));
	var changesParser_ = A2(
		$elm$parser$Parser$loop,
		_List_Nil,
		function (acc) {
			return $elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$map,
						function (_v0) {
							return $elm$parser$Parser$Done(
								$elm$core$List$reverse(acc));
						},
						$elm$parser$Parser$end),
						A2(
						$elm$parser$Parser$map,
						function (condition) {
							return $elm$parser$Parser$Loop(
								A2($elm$core$List$cons, condition, acc));
						},
						A2($elm$parser$Parser$ignorer, $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$changesParser, $elm$parser$Parser$spaces))
					]));
		});
	return A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(toRule),
				triggerParser),
			conditionsParser),
		changesParser_);
}();
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseRule = F2(
	function (extendFn, _v0) {
		var source = _v0.a;
		var extraFields = _v0.b;
		return A2(
			$elm$core$Result$mapError,
			$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$deadEndsToString,
			A2(
				$elm$core$Result$map,
				extendFn(extraFields),
				A2(
					$elm$parser$Parser$run,
					A2($elm$parser$Parser$ignorer, $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$ruleParser, $elm$parser$Parser$end),
					source)));
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseRules = F2(
	function (extendFn, rules) {
		var displayError = F3(
			function (k, v, e) {
				return _Utils_Tuple2('Rule: ' + (k + ('\n' + (v.a + ' '))), e);
			});
		var addParsedRule = F3(
			function (id, ruleSpec, acc) {
				var _v0 = A2($jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseRule, extendFn, ruleSpec);
				if (!_v0.$) {
					var parsedRule = _v0.a;
					return A2(
						$elm$core$Result$map,
						A2($elm$core$Dict$insert, id, parsedRule),
						acc);
				} else {
					var err = _v0.a;
					if (!acc.$) {
						return $elm$core$Result$Err(
							_List_fromArray(
								[
									A3(displayError, id, ruleSpec, err)
								]));
					} else {
						var errors = acc.a;
						return $elm$core$Result$Err(
							A2(
								$elm$core$List$cons,
								A3(displayError, id, ruleSpec, err),
								errors));
					}
				}
			});
		return A3(
			$elm$core$Dict$foldl,
			addParsedRule,
			$elm$core$Result$Ok($elm$core$Dict$empty),
			rules);
	});
var $author$project$Main$rule_______________________ = F3(
	function (k, v, dict) {
		return A3(
			$elm$core$Dict$insert,
			k,
			_Utils_Tuple2(
				v,
				{}),
			dict);
	});
var $author$project$Main$rulesSpec = A3(
	$author$project$Main$rule_______________________,
	'making choices',
	'\n            ON: *.choice.!current_location=PLAYER\n            DO: $.current_location=PLAYER\n            ',
	A3($author$project$Main$rule_______________________, 'moving around', '\n            ON: *.location\n            DO: PLAYER.current_location=$\n            ', $elm$core$Dict$empty));
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Main$Tick = function (a) {
	return {$: 4, a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {dj: processes, dE: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 1) {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.dj;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.dE);
		if (_v0.$ === 1) {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Main$second = 1000;
var $author$project$Main$subscriptions = function (page) {
	switch (page.$) {
		case 1:
			return $elm$core$Platform$Sub$none;
		case 0:
			return $elm$core$Platform$Sub$none;
		default:
			return $elm$core$Platform$Sub$batch(
				_List_fromArray(
					[
						A2($elm$time$Time$every, $author$project$Main$second, $author$project$Main$Tick)
					]));
	}
};
var $author$project$Main$Ready = function (a) {
	return {$: 2, a: a};
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Date = $elm$core$Basics$identity;
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Day = $elm$core$Basics$identity;
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$Year = $elm$core$Basics$identity;
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.b6, posixMinutes) < 0) {
					return posixMinutes + era.a;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		eA: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		fp: month,
		gF: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).eA;
	});
var $elm$time$Time$Apr = 3;
var $elm$time$Time$Aug = 7;
var $elm$time$Time$Dec = 11;
var $elm$time$Time$Feb = 1;
var $elm$time$Time$Jan = 0;
var $elm$time$Time$Jul = 6;
var $elm$time$Time$Jun = 5;
var $elm$time$Time$Mar = 2;
var $elm$time$Time$May = 4;
var $elm$time$Time$Nov = 10;
var $elm$time$Time$Oct = 9;
var $elm$time$Time$Sep = 8;
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).fp;
		switch (_v0) {
			case 1:
				return 0;
			case 2:
				return 1;
			case 3:
				return 2;
			case 4:
				return 3;
			case 5:
				return 4;
			case 6:
				return 5;
			case 7:
				return 6;
			case 8:
				return 7;
			case 9:
				return 8;
			case 10:
				return 9;
			case 11:
				return 10;
			default:
				return 11;
		}
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).gF;
	});
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$fromPosix = function (posix) {
	return {
		eA: A2($elm$time$Time$toDay, $elm$time$Time$utc, posix),
		fp: A2($elm$time$Time$toMonth, $elm$time$Time$utc, posix),
		gF: A2($elm$time$Time$toYear, $elm$time$Time$utc, posix)
	};
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$fromPosix = $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$fromPosix;
var $author$project$History$Datum = F2(
	function (time, number) {
		return {bP: number, ca: time};
	});
var $author$project$History$totalHousing = A2($elm$core$Basics$composeL, $elm$core$Basics$toFloat, $elm$core$List$length);
var $author$project$History$initHousing = F2(
	function (time, housing) {
		return A2(
			$author$project$History$Datum,
			time,
			$author$project$History$totalHousing(housing));
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $author$project$History$initHousingHistory = F2(
	function (time, economy) {
		var initHistory = A2(
			$elm$core$Basics$composeL,
			$elm$core$List$singleton,
			$author$project$History$initHousing(time));
		return {
			aA: initHistory(economy.ap),
			aG: initHistory(economy.a0)
		};
	});
var $author$project$History$initPublicHealthHistory = F2(
	function (time, economy) {
		return {
			aP: $elm$core$List$singleton(
				A2($author$project$History$Datum, time, economy.eU)),
			c7: $elm$core$List$singleton(
				A2($author$project$History$Datum, time, 0))
		};
	});
var $author$project$History$init = F2(
	function (time, economy) {
		return {
			eX: A2($author$project$History$initHousingHistory, time, economy),
			a5: A2($author$project$History$initPublicHealthHistory, time, economy)
		};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Debug$State = $elm$core$Basics$identity;
var $jschomay$elm_narrative_engine$NarrativeEngine$Debug$init = {bC: 'Start', bD: 'Begin', bY: ''};
var $author$project$Main$initialModel = F5(
	function (debugMode, time, economy, population, worldModel) {
		return {
			as: $PanagiotisGeorgiadis$elm_datetime$Calendar$fromPosix(time),
			G: debugMode ? $elm$core$Maybe$Just($jschomay$elm_narrative_engine$NarrativeEngine$Debug$init) : $elm$core$Maybe$Nothing,
			h: economy,
			aD: 1,
			s: 1,
			cO: _List_Nil,
			aE: A2($author$project$History$init, time, economy),
			v: population,
			aj: $elm$core$Dict$empty,
			aJ: 0,
			aK: 'You\'re a democratically elected president: do the work to give your people happy and healthy lives.',
			g: worldModel
		};
	});
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$decStat = F3(
	function (key, delta, entity) {
		var current = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2($elm$core$Dict$get, key, entity.n));
		return _Utils_update(
			entity,
			{
				n: A3($elm$core$Dict$insert, key, current - delta, entity.n)
			});
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$incStat = F3(
	function (key, delta, entity) {
		var current = A2(
			$elm$core$Maybe$withDefault,
			0,
			A2($elm$core$Dict$get, key, entity.n));
		return _Utils_update(
			entity,
			{
				n: A3($elm$core$Dict$insert, key, current + delta, entity.n)
			});
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$remove, key, dict);
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$removeTag = F2(
	function (value, entity) {
		return _Utils_update(
			entity,
			{
				dF: A2($elm$core$Set$remove, value, entity.dF)
			});
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update = F3(
	function (id, updateFn, store) {
		return A3(
			$elm$core$Dict$update,
			id,
			$elm$core$Maybe$map(updateFn),
			store);
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$applyChanges = F3(
	function (entityUpdates, trigger, store) {
		var parseID = function (id) {
			if (id === '$') {
				return trigger;
			} else {
				return id;
			}
		};
		var applyChange = F3(
			function (id, change, updated_store) {
				switch (change.$) {
					case 0:
						var tag_ = change.a;
						return A3(
							$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
							id,
							$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$addTag(tag_),
							updated_store);
					case 1:
						var tag_ = change.a;
						return A3(
							$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
							id,
							$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$removeTag(tag_),
							updated_store);
					case 2:
						var key = change.a;
						var stat_ = change.b;
						return A3(
							$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
							id,
							A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setStat, key, stat_),
							updated_store);
					case 3:
						var key = change.a;
						var amount = change.b;
						return A3(
							$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
							id,
							A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$incStat, key, amount),
							updated_store);
					case 4:
						var key = change.a;
						var amount = change.b;
						return A3(
							$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
							id,
							A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$decStat, key, amount),
							updated_store);
					default:
						if (!change.b.$) {
							var key = change.a;
							var linkID = change.b.a;
							return A3(
								$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
								id,
								A2(
									$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setLink,
									key,
									parseID(linkID)),
								updated_store);
						} else {
							var key = change.a;
							var _v3 = change.b;
							var linkID = _v3.a;
							var linkKey = _v3.b;
							return A2(
								$elm$core$Maybe$withDefault,
								updated_store,
								A2(
									$elm$core$Maybe$map,
									function (targetID) {
										return A3(
											$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$update,
											id,
											A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$setLink, key, targetID),
											updated_store);
									},
									A2(
										$elm$core$Maybe$andThen,
										A2(
											$elm$core$Basics$composeR,
											function ($) {
												return $.c2;
											},
											$elm$core$Dict$get(linkKey)),
										A2(
											$elm$core$Dict$get,
											parseID(linkID),
											updated_store))));
						}
				}
			});
		var updateEntity = function (id) {
			return $elm$core$List$foldl(
				applyChange(id));
		};
		var applyUpdate = F2(
			function (entityUpdate, updated_store) {
				if (!entityUpdate.$) {
					var id = entityUpdate.a;
					var changes = entityUpdate.b;
					return A3(
						updateEntity,
						parseID(id),
						updated_store,
						changes);
				} else {
					var queries = entityUpdate.a;
					var changes = entityUpdate.b;
					return A3(
						$elm$core$List$foldl,
						F2(
							function (_v1, acc) {
								var id = _v1.a;
								return A3(updateEntity, id, acc, changes);
							}),
						updated_store,
						A2(
							$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query,
							$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$MatchAny(queries),
							updated_store));
				}
			});
		return A3($elm$core$List$foldl, applyUpdate, store, entityUpdates);
	});
var $author$project$Person$average = function (id) {
	return {
		bc: 35,
		eQ: true,
		eR: true,
		eW: $elm$core$Maybe$Nothing,
		e_: id,
		bA: 4,
		ff: $elm$core$Maybe$Just(
			$author$project$Job$train(8)),
		aF: 'Joe',
		bN: false,
		a4: 1,
		a8: 0,
		r: _List_fromArray(
			[0]),
		dM: false,
		dN: true
	};
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Economy$healthModifiers = {et: 0.5, eN: 0, cP: 0.25, dg: 0, dC: 0};
var $author$project$Economy$provideClothes = function (economy) {
	return _Utils_update(
		economy,
		{et: economy.et - 1});
};
var $author$project$Economy$clothingStats = function (service) {
	var stats = service.n;
	var economy = service.h;
	var updatedEconomy = $author$project$Economy$provideClothes(economy);
	return _Utils_update(
		service,
		{
			h: updatedEconomy,
			n: (updatedEconomy.et >= 0) ? stats : _Utils_update(
				stats,
				{s: $author$project$Economy$healthModifiers.et * stats.s})
		});
};
var $author$project$Person$wantsTertiaryEducation = function (person) {
	return !function () {
		var _v0 = person.bA;
		switch (_v0) {
			case 0:
				return A2($elm$core$List$member, 3, person.r);
			case 1:
				return A2($elm$core$List$member, 1, person.r);
			case 2:
				return A2($elm$core$List$member, 2, person.r);
			case 3:
				return A2($elm$core$List$member, 4, person.r);
			case 4:
				return A2($elm$core$List$member, 0, person.r);
			default:
				return true;
		}
	}();
};
var $author$project$Person$canGoToCollege = function (person) {
	return _Utils_eq(person.ff, $elm$core$Maybe$Nothing) && (person.eQ && (person.eR && $author$project$Person$wantsTertiaryEducation(person)));
};
var $author$project$Economy$provideEducation = F2(
	function (person, economy) {
		if (!person.eQ) {
			var remainingSeats = economy.fE - 1;
			return _Utils_Tuple2(
				_Utils_update(
					economy,
					{fE: remainingSeats}),
				remainingSeats >= 0);
		} else {
			if (!person.eR) {
				var remainingSeats = economy.fF - 1;
				return _Utils_Tuple2(
					_Utils_update(
						economy,
						{fF: remainingSeats}),
					remainingSeats >= 0);
			} else {
				if ($author$project$Person$canGoToCollege(person)) {
					var remainingSeats = economy.fG - 1;
					return _Utils_Tuple2(
						_Utils_update(
							economy,
							{fG: remainingSeats}),
						remainingSeats >= 0);
				} else {
					return _Utils_Tuple2(economy, true);
				}
			}
		}
	});
var $author$project$Economy$educationStats = function (service) {
	var person = service.H;
	var stats = service.n;
	var economy = service.h;
	var _v0 = A2($author$project$Economy$provideEducation, person, economy);
	var updatedEconomy = _v0.a;
	var openSeats = _v0.b;
	return _Utils_update(
		service,
		{
			h: updatedEconomy,
			n: openSeats ? stats : _Utils_update(
				stats,
				{aD: stats.aD * 0.75})
		});
};
var $author$project$Economy$provideFood = function (economy) {
	return _Utils_update(
		economy,
		{eN: economy.eN - 1});
};
var $author$project$Economy$foodStats = function (service) {
	var stats = service.n;
	var economy = service.h;
	var updatedEconomy = $author$project$Economy$provideFood(economy);
	return _Utils_update(
		service,
		{
			h: updatedEconomy,
			n: (updatedEconomy.eN >= 0) ? stats : _Utils_update(
				stats,
				{s: $author$project$Economy$healthModifiers.eN * stats.s})
		});
};
var $author$project$Economy$hospitalize = F2(
	function (person, economy) {
		var bedsNeeded = person.bN ? 1 : 0;
		return _Utils_Tuple2(
			_Utils_update(
				economy,
				{eU: economy.eU - bedsNeeded}),
			_Utils_update(
				person,
				{bN: (bedsNeeded - economy.eU) >= 0}));
	});
var $author$project$Economy$hospitalizationStats = function (service) {
	var person = service.H;
	var stats = service.n;
	var economy = service.h;
	var _v0 = A2($author$project$Economy$hospitalize, person, economy);
	var updatedEconomy = _v0.a;
	var updatedPerson = _v0.b;
	return _Utils_update(
		service,
		{
			h: updatedEconomy,
			H: updatedPerson,
			n: updatedPerson.bN ? _Utils_update(
				stats,
				{s: $author$project$Economy$healthModifiers.cP * stats.s}) : stats
		});
};
var $author$project$Housing$amenities = function (location) {
	switch (location) {
		case 0:
			return 1.0;
		case 1:
			return 0.7;
		default:
			return 0.5;
	}
};
var $author$project$Housing$score = function (_v0) {
	var water = _v0.cd;
	var heating = _v0.bp;
	var electricity = _v0.bm;
	var internet = _v0.bB;
	var location = _v0.bH;
	var quality = _v0.bT;
	var age = _v0.bc;
	var bedrooms = _v0.bf;
	return ((((((1 * water) * heating) * electricity) * $author$project$Housing$amenities(location)) * internet) * (quality / age)) * bedrooms;
};
var $author$project$Person$housingScore = function (person) {
	var _v0 = person.eW;
	if (!_v0.$) {
		var house = _v0.a;
		return $author$project$Housing$score(house);
	} else {
		return 0;
	}
};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $author$project$Economy$provideHousing = F2(
	function (person, economy) {
		var available = $elm$core$List$head(economy.ap);
		return _Utils_Tuple2(
			_Utils_update(
				person,
				{eW: available}),
			_Utils_update(
				economy,
				{
					ap: A2($elm$core$List$drop, 1, economy.ap),
					a0: function () {
						if (!available.$) {
							var house = available.a;
							return A2($elm$core$List$cons, house, economy.a0);
						} else {
							return economy.a0;
						}
					}()
				}));
	});
var $author$project$Economy$housingStats = function (service) {
	var stats = service.n;
	var economy = service.h;
	var person = service.H;
	var _v0 = A2($author$project$Economy$provideHousing, person, economy);
	var updatedPerson = _v0.a;
	var updatedEconomy = _v0.b;
	return _Utils_update(
		service,
		{
			h: updatedEconomy,
			H: updatedPerson,
			n: _Utils_update(
				stats,
				{
					s: $author$project$Person$housingScore(updatedPerson) * stats.s
				})
		});
};
var $author$project$Economy$idealStats = {aD: 1.0, s: 1.0};
var $author$project$Economy$provideDrugs = F2(
	function (person, economy) {
		return _Utils_Tuple2(
			_Utils_update(
				economy,
				{fL: economy.fL - person.a4}),
			_Utils_update(
				person,
				{
					a4: A2($elm$core$Basics$max, person.a4 - economy.fL, 0)
				}));
	});
var $author$project$Economy$prescriptionStats = function (service) {
	var person = service.H;
	var stats = service.n;
	var economy = service.h;
	var _v0 = A2($author$project$Economy$provideDrugs, person, economy);
	var updatedEconomy = _v0.a;
	var updatedPerson = _v0.b;
	return _Utils_update(
		service,
		{
			h: updatedEconomy,
			H: updatedPerson,
			n: (updatedPerson.a4 >= 0) ? stats : _Utils_update(
				stats,
				{s: $author$project$Economy$healthModifiers.dg * stats.s})
		});
};
var $author$project$Economy$performSurgeries = F2(
	function (person, economy) {
		return _Utils_Tuple2(
			_Utils_update(
				economy,
				{f7: economy.f7 - person.a8}),
			_Utils_update(
				person,
				{
					a8: A2($elm$core$Basics$max, person.a8 - economy.f7, 0)
				}));
	});
var $author$project$Economy$surgeryStats = function (service) {
	var person = service.H;
	var stats = service.n;
	var economy = service.h;
	var _v0 = A2($author$project$Economy$performSurgeries, person, economy);
	var updatedEconomy = _v0.a;
	var updatedPerson = _v0.b;
	return _Utils_update(
		service,
		{
			h: updatedEconomy,
			H: updatedPerson,
			n: (updatedPerson.a8 >= 0) ? stats : _Utils_update(
				stats,
				{s: $author$project$Economy$healthModifiers.dC * stats.s})
		});
};
var $author$project$Economy$provide = F2(
	function (person, economy) {
		var service = {h: economy, H: person, n: $author$project$Economy$idealStats};
		return $author$project$Economy$educationStats(
			$author$project$Economy$housingStats(
				$author$project$Economy$hospitalizationStats(
					$author$project$Economy$surgeryStats(
						$author$project$Economy$prescriptionStats(
							$author$project$Economy$clothingStats(
								$author$project$Economy$foodStats(service)))))));
	});
var $author$project$Economy$distributeHelp = F2(
	function (person, _v0) {
		var serviced = _v0.a;
		var economy = _v0.b;
		var currentEconomy = A2(
			$elm$core$Maybe$withDefault,
			economy,
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.h;
				},
				$elm$core$List$head(serviced)));
		var service = A2($author$project$Economy$provide, person, currentEconomy);
		return _Utils_Tuple2(
			A2($elm$core$List$cons, service, serviced),
			currentEconomy);
	});
var $author$project$Economy$toTuple = function (_v0) {
	var happiness = _v0.aD;
	var health = _v0.s;
	return _Utils_Tuple2(happiness, health);
};
var $elm$core$List$unzip = function (pairs) {
	var step = F2(
		function (_v0, _v1) {
			var x = _v0.a;
			var y = _v0.b;
			var xs = _v1.a;
			var ys = _v1.b;
			return _Utils_Tuple2(
				A2($elm$core$List$cons, x, xs),
				A2($elm$core$List$cons, y, ys));
		});
	return A3(
		$elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		pairs);
};
var $author$project$Economy$distribute = F2(
	function (population, economy) {
		var popSize = $elm$core$List$length(population);
		var _v0 = A3(
			$elm$core$List$foldl,
			$author$project$Economy$distributeHelp,
			_Utils_Tuple2(_List_Nil, economy),
			population);
		var services = _v0.a;
		var currentEconomy = _v0.b;
		var _v1 = $elm$core$List$unzip(
			A2(
				$elm$core$List$map,
				A2(
					$elm$core$Basics$composeL,
					$author$project$Economy$toTuple,
					function ($) {
						return $.n;
					}),
				services));
		var happiness = _v1.a;
		var health = _v1.b;
		return {
			co: $elm$core$List$sum(happiness) / popSize,
			cp: $elm$core$List$sum(health) / popSize,
			h: currentEconomy
		};
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$matchCondition = F3(
	function (trigger, store, matcher) {
		return !$elm$core$List$isEmpty(
			function (m) {
				return A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query, m, store);
			}(
				A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$replaceTrigger, trigger, matcher)));
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$matchTrigger = F3(
	function (store, trigger, triggerMatcher) {
		if (!triggerMatcher.$) {
			var t = triggerMatcher.a;
			return _Utils_eq(trigger, t);
		} else {
			if (!triggerMatcher.a.$) {
				var em = triggerMatcher.a;
				var id = em.a;
				var qs = em.b;
				return _Utils_eq(id, trigger) && (!$elm$core$List$isEmpty(
					A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query, em, store)));
			} else {
				var qs = triggerMatcher.a.a;
				return !$elm$core$List$isEmpty(
					A2(
						$jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query,
						A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$Match, trigger, qs),
						store));
			}
		}
	});
var $elm$core$List$sortBy = _List_sortBy;
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$weight = function (_v0) {
	var trigger = _v0.gw;
	var conditions = _v0.cx;
	var queryScore = function (matcher) {
		if (!matcher.$) {
			var id = matcher.a;
			var queries = matcher.b;
			return $elm$core$List$length(queries);
		} else {
			var queries = matcher.a;
			return $elm$core$List$length(queries);
		}
	};
	var triggerScore = function () {
		if (!trigger.$) {
			return 0;
		} else {
			if (!trigger.a.$) {
				var em = trigger.a;
				return 100 + queryScore(em);
			} else {
				var em = trigger.a;
				return 0 + queryScore(em);
			}
		}
	}();
	var conditionsScore = A3(
		$elm$core$List$foldl,
		F2(
			function (matcher, acc) {
				if (!matcher.$) {
					return (10 + queryScore(matcher)) + acc;
				} else {
					return (0 + queryScore(matcher)) + acc;
				}
			}),
		0,
		conditions);
	return conditionsScore + triggerScore;
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$findMatchingRule = F3(
	function (trigger, rules, store) {
		return $elm$core$List$head(
			$elm$core$List$reverse(
				A2(
					$elm$core$List$sortBy,
					A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$weight),
					$elm$core$Dict$toList(
						A2(
							$elm$core$Dict$filter,
							F2(
								function (ruleId, rule) {
									return A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$matchTrigger, store, trigger, rule.gw) && A2(
										$elm$core$List$all,
										A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$matchCondition, trigger, store),
										rule.cx);
								}),
							rules)))));
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parse = F2(
	function (config, text) {
		var _v0 = A2(
			$elm$parser$Parser$run,
			$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$top(config),
			text);
		if (!_v0.$) {
			var parsed = _v0.a;
			return A2(
				$elm$core$List$filter,
				A2(
					$elm$core$Basics$composeL,
					A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
					$elm$core$String$trim),
				A2($elm$core$String$split, '---', parsed));
		} else {
			var e = _v0.a;
			return _List_fromArray(
				['ERROR could not parse: ' + text]);
		}
	});
var $author$project$Main$getDescription = F3(
	function (config, entityID, worldModel_) {
		return A2(
			$elm$core$Maybe$withDefault,
			'ERROR parsing narrative content for ' + entityID,
			$elm$core$List$head(
				A2(
					$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parse,
					config,
					A2(
						$elm$core$Maybe$withDefault,
						'ERROR can\'t find entity ' + entityID,
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.aC;
							},
							A2($elm$core$Dict$get, entityID, worldModel_))))));
	});
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay = ((1000 * 60) * 60) * 24;
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$isLeapYear = function (_v0) {
	var _int = _v0;
	return (!A2($elm$core$Basics$modBy, 4, _int)) && ((!A2($elm$core$Basics$modBy, 400, _int)) || (!(!A2($elm$core$Basics$modBy, 100, _int))));
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInYear = function (year) {
	return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$isLeapYear(year) ? ($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * 366) : ($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * 365);
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$yearFromInt = function (year) {
	return (year > 0) ? $elm$core$Maybe$Just(year) : $elm$core$Maybe$Nothing;
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceEpoch = function (_v0) {
	var year = _v0;
	var getTotalMillis = A2(
		$elm$core$Basics$composeL,
		A2(
			$elm$core$Basics$composeL,
			$elm$core$List$sum,
			$elm$core$List$map($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInYear)),
		$elm$core$List$filterMap($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$yearFromInt));
	var epochYear = 1970;
	return (year >= 1970) ? getTotalMillis(
		A2($elm$core$List$range, epochYear, year - 1)) : (-getTotalMillis(
		A2($elm$core$List$range, year, epochYear - 1)));
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt = function (_v0) {
	var day = _v0;
	return day;
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheMonth = function (day) {
	return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * ($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt(day) - 1);
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$monthToInt = function (month) {
	switch (month) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 7;
		case 7:
			return 8;
		case 8:
			return 9;
		case 9:
			return 10;
		case 10:
			return 11;
		default:
			return 12;
	}
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$months = $elm$core$Array$fromList(
	_List_fromArray(
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.l)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.l, tail);
		return (notAppended < 0) ? {
			m: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.m),
			i: builder.i + 1,
			l: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			m: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.m),
			i: builder.i + 1,
			l: $elm$core$Elm$JsArray$empty
		} : {m: builder.m, i: builder.i, l: appended});
	});
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (!node.$) {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						m: _List_Nil,
						i: 0,
						l: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (!_v0.$) {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (!_v0.$) {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getPrecedingMonths = function (month) {
	return $elm$core$Array$toList(
		A3(
			$elm$core$Array$slice,
			0,
			$PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$monthToInt(month) - 1,
			$PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$months));
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$lastDayOf = F2(
	function (year, month) {
		switch (month) {
			case 0:
				return 31;
			case 1:
				return $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$isLeapYear(year) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheYear = F2(
	function (year, month) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (m, res) {
					return res + ($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay * $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$dayToInt(
						A2($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$lastDayOf, year, m)));
				}),
			0,
			$PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$getPrecedingMonths(month));
	});
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$toMillis = function (_v0) {
	var year = _v0.gF;
	var month = _v0.fp;
	var day = _v0.eA;
	return ($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceEpoch(year) + A2($PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheYear, year, month)) + $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisSinceStartOfTheMonth(day);
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$toPosix = A2($elm$core$Basics$composeL, $elm$time$Time$millisToPosix, $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$toMillis);
var $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$incrementDay = function (date) {
	var millis = $elm$time$Time$posixToMillis(
		$PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$toPosix(date)) + $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$millisInADay;
	var newDate = $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$fromPosix(
		$elm$time$Time$millisToPosix(millis));
	return newDate;
};
var $PanagiotisGeorgiadis$elm_datetime$Calendar$incrementDay = $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$incrementDay;
var $author$project$Main$getName = F2(
	function (entityID, worldModel_) {
		return A2(
			$elm$core$Maybe$withDefault,
			'ERROR can\'t find entity ' + entityID,
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.aF;
				},
				A2($elm$core$Dict$get, entityID, worldModel_)));
	});
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $author$project$Main$makeConfig = F3(
	function (trigger, matchedRule, model) {
		return {
			ez: A2(
				$elm$core$Maybe$withDefault,
				0,
				A2($elm$core$Dict$get, matchedRule, model.aj)),
			fM: A2(
				$elm$core$Dict$singleton,
				'name',
				function (id) {
					return $elm$core$Result$Ok(
						A2($author$project$Main$getName, id, model.g));
				}),
			gw: trigger,
			g: model.g
		};
	});
var $author$project$Capital$Capital = F9(
	function (housing, hospitalBeds, surgeons, openPrimaryEnrollment, openSecondaryEnrollment, openTertiaryEnrollment, food, clothing, prescriptionDrugs) {
		return {et: clothing, eN: food, eU: hospitalBeds, eX: housing, fE: openPrimaryEnrollment, fF: openSecondaryEnrollment, fG: openTertiaryEnrollment, fL: prescriptionDrugs, f7: surgeons};
	});
var $author$project$Job$classSize = 30;
var $author$project$Job$work = function (job) {
	var capital = A9($author$project$Capital$Capital, _List_Nil, 0, 0, 0, 0, 0, 0, 0, 0);
	var _v0 = job.F;
	switch (_v0) {
		case 0:
			return _Utils_update(
				capital,
				{eN: 50});
		case 1:
			return _Utils_update(
				capital,
				{fL: capital.fL + 1, f7: capital.f7 + 1});
		case 2:
			return _Utils_update(
				capital,
				{eU: capital.eU + 5, fL: capital.fL + 3});
		case 3:
			return _Utils_update(
				capital,
				{
					eX: _List_fromArray(
						[
							$author$project$Housing$buildHouse(0)
						])
				});
		case 4:
			return capital;
		case 5:
			return _Utils_update(
				capital,
				{fL: capital.fL + 2});
		case 6:
			return _Utils_update(
				capital,
				{fF: capital.fF + $author$project$Job$classSize});
		case 7:
			return _Utils_update(
				capital,
				{fG: capital.fG + $author$project$Job$classSize});
		case 8:
			return capital;
		default:
			return capital;
	}
};
var $author$project$Economy$work = F2(
	function (economy, job) {
		var capital = $author$project$Job$work(job);
		return _Utils_update(
			economy,
			{
				ap: _Utils_ap(economy.ap, capital.eX),
				eN: economy.eN + capital.eN,
				eU: economy.eU + capital.eU,
				fE: economy.fE + capital.fE,
				fF: economy.fF + capital.fF,
				fG: economy.fG + capital.fG,
				fL: economy.fL + capital.fL,
				f7: economy.f7 + capital.f7
			});
	});
var $author$project$Economy$produce = F2(
	function (people, economy) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (person, economyWithCapital) {
					return A2(
						$elm$core$Maybe$withDefault,
						economyWithCapital,
						A2(
							$elm$core$Maybe$map,
							$author$project$Economy$work(economy),
							person.ff));
				}),
			economy,
			people);
	});
var $author$project$History$recordHousing = F3(
	function (time, economy, history) {
		return _Utils_update(
			history,
			{
				aA: A2(
					$elm$core$List$cons,
					A2($author$project$History$initHousing, time, economy.ap),
					history.aA),
				aG: A2(
					$elm$core$List$cons,
					A2($author$project$History$initHousing, time, economy.a0),
					history.aG)
			});
	});
var $author$project$History$recordPublicHealth = F3(
	function (time, economy, history) {
		return _Utils_update(
			history,
			{
				aP: A2(
					$elm$core$List$cons,
					A2($author$project$History$Datum, time, economy.eU),
					history.aP)
			});
	});
var $author$project$History$record = F3(
	function (time, economy, history) {
		return _Utils_update(
			history,
			{
				eX: A3($author$project$History$recordHousing, time, economy, history.eX),
				a5: A3($author$project$History$recordPublicHealth, time, economy, history.a5)
			});
	});
var $author$project$Main$score = function (product) {
	return (product.co + (product.cp / 2)) * 100;
};
var $jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastInteractionId = F2(
	function (id, _v0) {
		var state = _v0;
		return _Utils_update(
			state,
			{bC: id});
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastMatchedRuleId = F2(
	function (id, _v0) {
		var state = _v0;
		return _Utils_update(
			state,
			{bD: id});
	});
var $PanagiotisGeorgiadis$elm_datetime$Calendar$toMillis = $PanagiotisGeorgiadis$elm_datetime$Calendar$Internal$toMillis;
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $author$project$Person$isQualified = F2(
	function (title, person) {
		switch (title) {
			case 0:
				return person.eR;
			case 1:
				return A2($elm$core$List$member, 3, person.r);
			case 2:
				return A2($elm$core$List$member, 3, person.r);
			case 3:
				return A2($elm$core$List$member, 1, person.r);
			case 4:
				return A2($elm$core$List$member, 1, person.r);
			case 5:
				return A2($elm$core$List$member, 2, person.r);
			case 6:
				return A2($elm$core$List$member, 4, person.r);
			case 7:
				return A2($elm$core$List$member, 4, person.r);
			case 8:
				return A2($elm$core$List$member, 0, person.r);
			default:
				return A2($elm$core$List$member, 0, person.r);
		}
	});
var $author$project$Population$trainHelp = F3(
	function (title, newPop, population) {
		trainHelp:
		while (true) {
			if (!population.b) {
				return newPop;
			} else {
				var person = population.a;
				var rest = population.b;
				if (_Utils_eq(person.ff, $elm$core$Maybe$Nothing) && A2($author$project$Person$isQualified, title, person)) {
					return A2(
						$elm$core$List$append,
						newPop,
						A2(
							$elm$core$List$cons,
							_Utils_update(
								person,
								{
									ff: $elm$core$Maybe$Just(
										$author$project$Job$train(title))
								}),
							rest));
				} else {
					var $temp$title = title,
						$temp$newPop = A2($elm$core$List$cons, person, newPop),
						$temp$population = rest;
					title = $temp$title;
					newPop = $temp$newPop;
					population = $temp$population;
					continue trainHelp;
				}
			}
		}
	});
var $author$project$Population$train = F2(
	function (title, population) {
		return A3($author$project$Population$trainHelp, title, _List_Nil, population);
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Debug$updateSearch = F2(
	function (text, _v0) {
		var state = _v0;
		return _Utils_update(
			state,
			{bY: text});
	});
var $author$project$Main$updateGame = F3(
	function (rules, msg, model) {
		var economy = model.h;
		switch (msg.$) {
			case 0:
				var trigger = msg.a;
				var _v1 = A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$Rules$findMatchingRule, trigger, rules, model.g);
				if (!_v1.$) {
					var _v2 = _v1.a;
					var matchedRuleID = _v2.a;
					var changes = _v2.b.eo;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								G: A2(
									$elm$core$Maybe$map,
									A2(
										$elm$core$Basics$composeL,
										$jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastMatchedRuleId(matchedRuleID),
										$jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastInteractionId(trigger)),
									model.G),
								aj: A3(
									$elm$core$Dict$update,
									matchedRuleID,
									A2(
										$elm$core$Basics$composeR,
										$elm$core$Maybe$map(
											$elm$core$Basics$add(1)),
										A2(
											$elm$core$Basics$composeR,
											$elm$core$Maybe$withDefault(1),
											$elm$core$Maybe$Just)),
									model.aj),
								aK: A2(
									$elm$core$Maybe$withDefault,
									'ERROR parsing narrative content for ' + matchedRuleID,
									$elm$core$List$head(
										A2(
											$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parse,
											A3($author$project$Main$makeConfig, trigger, matchedRuleID, model),
											A2(
												$elm$core$Maybe$withDefault,
												'ERROR finding narrative content for ' + matchedRuleID,
												A2($elm$core$Dict$get, matchedRuleID, $author$project$Main$narrative_content))))),
								g: A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$applyChanges, changes, trigger, model.g)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								G: A2(
									$elm$core$Maybe$map,
									A2(
										$elm$core$Basics$composeL,
										$jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastMatchedRuleId(trigger),
										$jschomay$elm_narrative_engine$NarrativeEngine$Debug$setLastInteractionId(trigger)),
									model.G),
								aj: A3(
									$elm$core$Dict$update,
									trigger,
									A2(
										$elm$core$Basics$composeR,
										$elm$core$Maybe$map(
											$elm$core$Basics$add(1)),
										A2(
											$elm$core$Basics$composeR,
											$elm$core$Maybe$withDefault(1),
											$elm$core$Maybe$Just)),
									model.aj),
								aK: A3(
									$author$project$Main$getDescription,
									A3($author$project$Main$makeConfig, trigger, trigger, model),
									trigger,
									model.g)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 1:
				var searchText = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							G: A2(
								$elm$core$Maybe$map,
								$jschomay$elm_narrative_engine$NarrativeEngine$Debug$updateSearch(searchText),
								model.G)
						}),
					$elm$core$Platform$Cmd$none);
			case 5:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							h: _Utils_update(
								economy,
								{eN: economy.eN + 1})
						}),
					$elm$core$Platform$Cmd$none);
			case 6:
				var title = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							v: A2($author$project$Population$train, title, model.v)
						}),
					$elm$core$Platform$Cmd$none);
			case 4:
				var posixTime = msg.a;
				var product = A2(
					$author$project$Economy$distribute,
					model.v,
					A2($author$project$Economy$produce, model.v, model.h));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							as: $PanagiotisGeorgiadis$elm_datetime$Calendar$incrementDay(model.as),
							h: product.h,
							aD: product.co,
							s: product.cp,
							aE: A3(
								$author$project$History$record,
								$elm$time$Time$millisToPosix(
									$PanagiotisGeorgiadis$elm_datetime$Calendar$toMillis(model.as)),
								product.h,
								model.aE),
							v: A2(
								$elm$core$List$cons,
								$author$project$Person$average(
									$elm$time$Time$posixToMillis(posixTime)),
								model.v),
							aJ: model.aJ + $author$project$Main$score(product)
						}),
					$elm$core$Platform$Cmd$none);
			case 7:
				var points = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cO: points}),
					$elm$core$Platform$Cmd$none);
			case 3:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$updateInitializing = F3(
	function (_v0, msg, initialWorld) {
		switch (msg.$) {
			case 2:
				var _v2 = msg.a;
				var economy = _v2.a;
				var population = _v2.b;
				return _Utils_update(
					initialWorld,
					{
						h: $elm$core$Maybe$Just(economy),
						v: $elm$core$Maybe$Just(population)
					});
			case 3:
				var time = msg.a;
				return _Utils_update(
					initialWorld,
					{
						ca: $elm$core$Maybe$Just(time)
					});
			default:
				return initialWorld;
		}
	});
var $author$project$Main$update = F3(
	function (rules, msg, page) {
		switch (page.$) {
			case 1:
				return _Utils_Tuple2($author$project$Main$FailedToBoot, $elm$core$Platform$Cmd$none);
			case 0:
				var initialWorld = page.a;
				var world = A3($author$project$Main$updateInitializing, rules, msg, initialWorld);
				var _v1 = world.h;
				if (!_v1.$) {
					var economy = _v1.a;
					var population = A2($elm$core$Maybe$withDefault, _List_Nil, world.v);
					var _v2 = world.ca;
					if (!_v2.$) {
						var time = _v2.a;
						return _Utils_Tuple2(
							$author$project$Main$Ready(
								A5($author$project$Main$initialModel, world.bj, time, economy, population, world.g)),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							$author$project$Main$Initializing(world),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(
						$author$project$Main$Initializing(world),
						$elm$core$Platform$Cmd$none);
				}
			default:
				var model = page.a;
				return A2(
					$elm$core$Tuple$mapFirst,
					$author$project$Main$Ready,
					A3($author$project$Main$updateGame, rules, msg, model));
		}
	});
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $elm$html$Html$code = _VirtualDom_node('code');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$parseErrorsView = function (errors) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background', 'black'),
				A2($elm$html$Html$Attributes$style, 'color', 'red'),
				A2($elm$html$Html$Attributes$style, 'padding', '4em'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'center')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Errors when parsing!  Please fix:')
					])),
				A2(
				$elm$html$Html$ul,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'width', '100%')
					]),
				A2(
					$elm$core$List$map,
					function (_v0) {
						var source = _v0.a;
						var error = _v0.b;
						return A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'margin-bottom', '2em')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$pre,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'background', 'white'),
											A2($elm$html$Html$Attributes$style, 'padding', '1em'),
											A2($elm$html$Html$Attributes$style, 'color', 'black'),
											A2($elm$html$Html$Attributes$style, 'overflow', ' auto'),
											A2($elm$html$Html$Attributes$style, 'width', '100%')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$code,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(source)
												]))
										])),
									$elm$html$Html$text(error)
								]));
					},
					errors))
			]));
};
var $author$project$Main$UpdateDebugSearchText = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$CenterX = 1;
var $mdgriffith$elm_ui$Element$centerX = $mdgriffith$elm_ui$Internal$Model$AlignX(1);
var $mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
var $elm$core$Basics$round = _Basics_round;
var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 255));
};
var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsColumn = 1;
var $mdgriffith$elm_ui$Internal$Model$asColumn = 1;
var $mdgriffith$elm_ui$Internal$Style$classes = {dU: 'a', bb: 'atv', dX: 'ab', dY: 'cx', dZ: 'cy', d_: 'acb', d$: 'accx', d0: 'accy', d1: 'acr', cl: 'al', cm: 'ar', d2: 'at', bd: 'ah', be: 'av', d4: 's', eb: 'bh', ec: 'b', ed: 'w7', ef: 'bd', eg: 'bdt', aQ: 'bn', eh: 'bs', aR: 'cpe', eq: 'cp', er: 'cpx', es: 'cpy', V: 'c', eu: 'ctr', aT: 'cb', aU: 'ccx', W: 'ccy', aB: 'cl', aV: 'cr', ev: 'ct', ex: 'cptr', ey: 'ctxt', eM: 'fcs', cG: 'focus-within', eO: 'fs', eP: 'g', bo: 'hbh', bq: 'hc', cM: 'he', br: 'hf', cN: 'hfp', eY: 'hv', e$: 'ic', e1: 'fr', aY: 'lbl', e3: 'iml', e4: 'imlf', e5: 'imlp', e6: 'implw', e7: 'it', fe: 'i', c1: 'lnk', au: 'nb', c5: 'notxt', fz: 'ol', fA: 'or', ae: 'oq', fI: 'oh', db: 'pg', dc: 'p', fJ: 'ppe', fQ: 'ui', dp: 'r', fS: 'sb', fT: 'sbx', fU: 'sby', fV: 'sbt', fY: 'e', f_: 'cap', f$: 'sev', f5: 'sk', b9: 't', ga: 'tc', gb: 'w8', gc: 'w2', gd: 'w9', ge: 'tj', a9: 'tja', gf: 'tl', gg: 'w3', gh: 'w5', gi: 'w4', gj: 'tr', gk: 'w6', gl: 'w1', gm: 'tun', dI: 'ts', ak: 'clr', gx: 'u', cf: 'wc', dR: 'we', cg: 'wf', dS: 'wfp', ch: 'wrp'};
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.d4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.V);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.d4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.eP);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.d4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.db);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.d4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dc);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.d4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dp);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.d4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.fY);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 1:
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 2:
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 3:
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 4:
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							$elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsEl = 2;
var $mdgriffith$elm_ui$Internal$Model$asEl = 2;
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = 4;
var $mdgriffith$elm_ui$Internal$Model$asParagraph = 4;
var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 0:
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 1:
			return 'auto';
		case 2:
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 3:
			var min = x.a;
			var len = x.b;
			return 'min' + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'mv-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			return $elm$core$Maybe$Just(
				'tfrm-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 13:
			var name = style.a;
			return name;
		case 12:
			var name = style.a;
			var o = style.b;
			return name;
		case 0:
			var _class = style.a;
			return _class;
		case 1:
			var name = style.a;
			return name;
		case 2:
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 3:
			var _class = style.a;
			return _class;
		case 4:
			var _class = style.a;
			return _class;
		case 5:
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 7:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 6:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 8:
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.fR)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.O)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.f0.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.f0.b)))))));
		case 9:
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.dp) + ('-' + ($elm$core$String$fromInt(pos.cw) + ('-' + ($elm$core$String$fromInt(pos.dQ) + ('-' + $elm$core$String$fromInt(pos.cL)))))));
		case 11:
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector) {
					case 0:
						return 'fs';
					case 1:
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (sty) {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_v1 === '') {
							return '';
						} else {
							var styleName = _v1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2($elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2($elm$core$Set$insert, styleName, cache),
			A2($elm$core$List$cons, style, existing));
	});
var $mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return 'rgba(' + ($elm$core$String$fromInt(
		$elm$core$Basics$round(red * 255)) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(green * 255))) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(blue * 255))) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))));
};
var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.cU ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.a.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.a.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.aq) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.fZ) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.ar))
				])));
};
var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cG) + ':focus-within',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.ee),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.d9),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										aq: shadow.aq,
										ar: shadow.ar,
										cU: false,
										a: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.a)),
										fZ: shadow.fZ
									}));
						},
						focus.fX),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4) + ':focus .focusable, ') + (($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4) + '.focusable:focus, ') + ('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4) + ' .focusable-thumb'))),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.ee),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.d9),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										aq: shadow.aq,
										ar: shadow.ar,
										cU: false,
										a: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.a)),
										fZ: shadow.fZ
									}));
						},
						focus.fX),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Style$AllChildren = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = 3;
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = 2;
var $mdgriffith$elm_ui$Internal$Style$Self = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Bottom = 1;
var $mdgriffith$elm_ui$Internal$Style$CenterX = 4;
var $mdgriffith$elm_ui$Internal$Style$CenterY = 5;
var $mdgriffith$elm_ui$Internal$Style$Top = 0;
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[0, 1, 2, 3, 4, 5]);
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ev);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aT);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aV);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aB);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aU);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.W);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d2);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dX);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cm);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cl);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dY);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dZ);
	}
};
var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _v0 = values(alignment);
		var content = _v0.a;
		var indiv = _v0.b;
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$contentName(alignment),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						indiv)
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bo),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eb),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fV),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b9),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.br),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cg),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bq),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.br),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cg),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cf),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment) {
				case 0:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 1:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 2:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 3:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 4:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = 0;
var $mdgriffith$elm_ui$Internal$Style$Behind = 5;
var $mdgriffith$elm_ui$Internal$Style$Below = 1;
var $mdgriffith$elm_ui$Internal$Style$OnLeft = 3;
var $mdgriffith$elm_ui$Internal$Style$OnRight = 2;
var $mdgriffith$elm_ui$Internal$Style$Within = 4;
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = 0;
	var _v0 = function () {
		switch (loc) {
			case 0:
				return 0;
			case 1:
				return 0;
			case 2:
				return 0;
			case 3:
				return 0;
			case 4:
				return 0;
			default:
				return 0;
		}
	}();
	return _List_fromArray(
		[0, 1, 2, 3, 4, 5]);
}();
var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fY),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e$))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.br),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-height', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cg),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fQ),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.br)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.br),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.au),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.au),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fY),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc) {
							case 0:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dU),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.br),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cg),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 1:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ec),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.br),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 2:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fA),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 3:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fz),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 4:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eb),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ch),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c5),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ex),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ey),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fJ),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aR),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ak),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ae),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.eY, $mdgriffith$elm_ui$Internal$Style$classes.ak)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.eY, $mdgriffith$elm_ui$Internal$Style$classes.ae)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.eM, $mdgriffith$elm_ui$Internal$Style$classes.ak)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.eM, $mdgriffith$elm_ui$Internal$Style$classes.ae)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.bb, $mdgriffith$elm_ui$Internal$Style$classes.ak)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.bb, $mdgriffith$elm_ui$Internal$Style$classes.ae)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dI),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							$elm$core$String$join,
							', ',
							A2(
								$elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fS),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fT),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dp),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fU),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.V),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fY),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eq),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.er),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.es),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cf),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aQ),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ef),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eg),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eh),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b9),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e7),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'inherit')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fY),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dp),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dR),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c1),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.br),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cN),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cg),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eu),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.d1,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.d$,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.d$,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.d$,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dZ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.d$ + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.d1 + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.d$)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.f$),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aY),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'baseline')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.V),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0px'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', 'min-content'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cM),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.br),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cg),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cf),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.d_,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.d0,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dZ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.d0,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dZ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.d0,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dZ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.d0 + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.d_ + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.d0)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eu),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.f$),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eP),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 1:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 2:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 3:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 4:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.db),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4 + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.d4 + ($mdgriffith$elm_ui$Internal$Style$selfName(3) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.d4))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.d4 + ($mdgriffith$elm_ui$Internal$Style$selfName(2) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.d4))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e3),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e6),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fY),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e5),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e4),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dc),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-wrap', 'break-word'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bo),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eb),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b9),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dc),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::after',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::before',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fY),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dR),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e1),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eb),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dU),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ec),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fA),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fz),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.b9),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dp),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.V),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eP),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gl),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gc),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gg),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gi),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gh),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gk),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ed),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gb),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gd),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fe),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.f5),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gx),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gx),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.f5)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gm),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ge),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.a9),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ga),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gj),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gf),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + $elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							$elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 6)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 8, 32)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.d4 + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.d4 + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dp) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dp) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eu) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $mdgriffith$elm_ui$Internal$Style$Intermediate = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return {aS: closing, q: _List_Nil, Z: _List_Nil, M: selector};
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 0:
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								Z: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.Z)
							});
					case 3:
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									{aS: '\n}', q: _List_Nil, Z: props, M: '@supports (' + (prop + (':' + (value + (') {' + parent.M))))},
									rendered.q)
							});
					case 5:
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.M + (' + ' + selector), ''),
										adjRules),
									rendered.q)
							});
					case 1:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.M + (' > ' + child), ''),
										childRules),
									rendered.q)
							});
					case 2:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.M + (' ' + child), ''),
										childRules),
									rendered.q)
							});
					case 4:
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.M, descriptor),
											''),
										descriptorRules),
									rendered.q)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								q: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.M, ''),
										batched),
									rendered.q)
							});
				}
			});
		return A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender);
	});
var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return $elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _v2 = rule.Z;
		if (!_v2.b) {
			return '';
		} else {
			return rule.M + ('{' + (renderValues(rule.Z) + (rule.aS + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.q)));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			renderIntermediate,
			A3(
				$elm$core$List$foldr,
				F2(
					function (_v1, existing) {
						var name = _v1.a;
						var styleRules = _v1.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$mdgriffith$elm_ui$Internal$Style$renderRules,
								A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	$mdgriffith$elm_ui$Internal$Style$overrides,
	$mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _v0 = opts.fo;
	switch (_v0) {
		case 0:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'div',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$virtual_dom$VirtualDom$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								$elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
							]))
					]));
		case 1:
			return $elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						$elm$virtual_dom$VirtualDom$property,
						'rules',
						$elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 0:
			return 'serif';
		case 1:
			return 'sans-serif';
		case 2:
			return 'monospace';
		case 3:
			var name = font.a;
			return '\"' + (name + '\"');
		case 4:
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.aF;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return name === 'smcp';
		case 1:
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.dJ);
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _v0, existing) {
		var key = _v0.a;
		var val = _v0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var $mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 1) {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					$elm$core$List$foldl,
					$mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo) {
				case 1:
					var _v2 = options.eY;
					switch (_v2) {
						case 0:
							return _List_Nil;
						case 2:
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 0:
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[
							selector + ('-fs:focus {' + (renderedProps + '\n}')),
							('.' + ($mdgriffith$elm_ui$Internal$Style$classes.d4 + (':focus ' + (selector + '-fs  {')))) + (renderedProps + '\n}'),
							(selector + '-fs:focus-within {') + (renderedProps + '\n}'),
							('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.d4) + (' .focusable-thumb' + (selector + '-fs {')))) + (renderedProps + '\n}')
						]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							$elm$core$List$foldl,
							$mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return '\"' + (name + '\"');
		case 1:
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.dJ)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'translate3d(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + ('px, ' + ($elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + ($elm$core$String$fromFloat(tx) + ('px, ' + ($elm$core$String$fromFloat(ty) + ('px, ' + ($elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + ($elm$core$String$fromFloat(sx) + (', ' + ($elm$core$String$fromFloat(sy) + (', ' + ($elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + ($elm$core$String$fromFloat(ox) + (', ' + ($elm$core$String$fromFloat(oy) + (', ' + ($elm$core$String$fromFloat(oz) + (', ' + ($elm$core$String$fromFloat(angle) + 'rad)')))))));
			return $elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 0:
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 13:
				var name = rule.a;
				var prop = rule.b;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 12:
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							$elm$core$String$fromFloat(opacity))
						]));
			case 2:
				var i = rule.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			case 1:
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 3:
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 4:
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							$mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 5:
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.fY;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.dp;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.ch + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.cm;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.dc;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.db;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.cl;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.V;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.d4;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)')),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 7:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							$elm$core$String$fromFloat(top) + ('px ' + ($elm$core$String$fromFloat(right) + ('px ' + ($elm$core$String$fromFloat(bottom) + ('px ' + ($elm$core$String$fromFloat(left) + 'px')))))))
						]));
			case 6:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 8:
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 0:
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 1:
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 1) {
										if (_v2.b.$ === 1) {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 1) {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 2:
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 1) {
										if (_v7.b.$ === 1) {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 1) {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 3:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = $elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = $elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.f0.a);
				var ySpacing = toGridLength(template.f0.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.fR)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.O)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.O)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.f0.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.f0.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.O)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.fR)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.O)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.f0.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.f0.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 9:
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.dp) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.cL) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.cw) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.dQ) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.dp) + (' / ' + ($elm$core$String$fromInt(position.dp + position.cL) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.cw) + (' / ' + ($elm$core$String$fromInt(position.cw + position.dQ) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.dp) + ('-' + ($elm$core$String$fromInt(position.cw) + ('-' + ($elm$core$String$fromInt(position.dQ) + ('-' + $elm$core$String$fromInt(position.cL)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 11:
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						$mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						$elm$core$Maybe$Just(_class));
				};
				return A2($elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _v12 = _Utils_Tuple2(_class, val);
				if ((!_v12.a.$) && (!_v12.b.$)) {
					var cls = _v12.a.a;
					var v = _v12.b.a;
					return A4(
						$mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (style) {
					var styled = A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						$mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var $mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_v0) {
			var name = _v0.a;
			var val = _v0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, renderPair, rules)) + '}'));
	});
var $mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _v0) {
		var parentAdj = _v0.a;
		var textAdjustment = _v0.b;
		return _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.b9 + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.b9)))))))))), textAdjustment)
			]);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _v0, otherFontName) {
		var full = _v0.a;
		var capital = _v0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_Utils_ap(
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.f_, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.eO, full)));
	});
var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.f_ + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.f_))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.f_ + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.b9 + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.f_ + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.b9)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {cL: height / size, fZ: size, dK: vertical};
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.em, adjustment.ea, adjustment.eC, adjustment.fj]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.eC,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.ea,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.em,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		em: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		cI: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				$elm$core$String$fromFloat(converted.cL)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.dK) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.fZ) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 1) {
					if (face.$ === 5) {
						var _with = face.a;
						var _v2 = _with.dW;
						if (_v2.$ === 1) {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.cI;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.em;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		$elm$core$Maybe$Nothing,
		typefaces);
};
var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 4) {
			var url = font.b;
			return $elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_v2) {
		var name = _v2.a;
		var typefaces = _v2.b;
		var imports = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2($elm$core$List$map, $elm$core$Tuple$first, rules);
	var fontAdjustments = function (_v1) {
		var name = _v1.a;
		var typefaces = _v1.b;
		var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_v0.$ === 1) {
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _v0.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontImports, rules)),
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontAdjustments, rules)));
};
var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 1) {
		var name = rule.a;
		var typefaces = rule.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					a6: _Utils_ap(
						rendered.a6,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					aM: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 1) {
							return rendered.aM;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.aM);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{a6: _List_Nil, aM: _List_Nil},
			stylesheet);
		var topLevel = _v0.aM;
		var rules = _v0.a6;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.fo;
		switch (_v0) {
			case 0:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			case 1:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			default:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							$elm$virtual_dom$VirtualDom$property,
							'rules',
							A2($mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.eM)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				$mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			$elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var $mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.eM)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			$mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2($elm$core$List$cons, dynamicStyleSheet, children)) : A2($elm$core$List$cons, dynamicStyleSheet, children);
	});
var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _v0) {
		var fieldOne = _v0.a;
		var fieldTwo = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var $elm$html$Html$s = _VirtualDom_node('s');
var $elm$html$Html$u = _VirtualDom_node('u');
var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
var $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 1) {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return keyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return $elm$html$Html$div;
								case 'p':
									return $elm$html$Html$p;
								default:
									return $elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return unkeyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 0:
					return A2(createNode, 'div', attributes);
				case 1:
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						$elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.d4 + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.fY))
									]))
							]));
			}
		}();
		switch (parentContext) {
			case 0:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.d4, $mdgriffith$elm_ui$Internal$Style$classes.fY, $mdgriffith$elm_ui$Internal$Style$classes.eu, $mdgriffith$elm_ui$Internal$Style$classes.W, $mdgriffith$elm_ui$Internal$Style$classes.d1])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.d4, $mdgriffith$elm_ui$Internal$Style$classes.fY, $mdgriffith$elm_ui$Internal$Style$classes.eu, $mdgriffith$elm_ui$Internal$Style$classes.W, $mdgriffith$elm_ui$Internal$Style$classes.d$])))
						]),
					_List_fromArray(
						[html])) : html));
			case 1:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.d4, $mdgriffith$elm_ui$Internal$Style$classes.fY, $mdgriffith$elm_ui$Internal$Style$classes.eu, $mdgriffith$elm_ui$Internal$Style$classes.d0])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.d4, $mdgriffith$elm_ui$Internal$Style$classes.fY, $mdgriffith$elm_ui$Internal$Style$classes.eu, $mdgriffith$elm_ui$Internal$Style$classes.d_])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.d4 + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.b9 + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.cf + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.bq)))));
var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.d4 + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.b9 + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.cg + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.br)))));
var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_v8, _v9) {
				var key = _v8.a;
				var child = _v8.b;
				var htmls = _v9.a;
				var existingStyles = _v9.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.eZ, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.dA : _Utils_ap(styled.dA, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.eZ, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.dA : _Utils_ap(styled.dA, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _v6) {
				var htmls = _v6.a;
				var existingStyles = _v6.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.eZ, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.dA : _Utils_ap(styled.dA, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.eZ, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.dA : _Utils_ap(styled.dA, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 1) {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.dA : _Utils_ap(rendered.dA, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.ad,
						rendered.c6,
						rendered.aa,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.ep)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						eZ: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.ad,
							rendered.c6,
							rendered.aa,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.ep))),
						dA: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _v3 = A3(
				$elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _v3.a;
			var styles = _v3.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.dA : _Utils_ap(rendered.dA, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.ad,
						rendered.c6,
						rendered.aa,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.ep)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						eZ: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.ad,
							rendered.c6,
							rendered.aa,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.ep))),
						dA: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 10, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location) {
							case 0:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fY, $mdgriffith$elm_ui$Internal$Style$classes.dU]));
							case 1:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fY, $mdgriffith$elm_ui$Internal$Style$classes.ec]));
							case 2:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fY, $mdgriffith$elm_ui$Internal$Style$classes.fA]));
							case 3:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fY, $mdgriffith$elm_ui$Internal$Style$classes.fz]));
							case 4:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fY, $mdgriffith$elm_ui$Internal$Style$classes.e1]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.au, $mdgriffith$elm_ui$Internal$Style$classes.fY, $mdgriffith$elm_ui$Internal$Style$classes.eb]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 3:
							return $elm$virtual_dom$VirtualDom$text('');
						case 2:
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 0:
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.eZ, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 0:
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 1:
				var existingBehind = existing.a;
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 2:
				var existingInFront = existing.a;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2($elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2($elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2($elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 1:
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.bd + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cl);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.bd + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cm);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.bd + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dY);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.be + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.d2);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.be + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dX);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.be + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dZ);
	}
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 0:
				switch (component.$) {
					case 0:
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 1:
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 2:
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 1:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 1:
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 2:
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 1:
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 2:
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 3:
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 4:
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
var $mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_v0, _v1) {
		var one = _v0.a;
		var two = _v0.b;
		var three = _v1.a;
		var four = _v1.b;
		return A2($mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var $mdgriffith$elm_ui$Internal$Flag$none = A2($mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 0:
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.cM + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.bq,
				_List_Nil);
		case 2:
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.br,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.cN + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.d4 + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.V + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				$elm$core$String$fromInt(minSize) + 'px !important');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 0:
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.dR + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.cf,
				_List_Nil);
		case 2:
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.cg,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.dS + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.d4 + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.dp + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
var $mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 3) {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 2:
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 7:
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_v1.$ === 1) {
					return {
						aa: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						ep: children,
						ad: has,
						c6: node,
						dA: styles
					};
				} else {
					var _class = _v1.a;
					return {
						aa: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						ep: children,
						ad: has,
						c6: node,
						dA: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 0:
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 3:
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 1:
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2($elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 4:
						var flag = attribute.a;
						var style = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2($mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2($elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 10:
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 7:
						var width = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 0:
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.dR + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3(
											$mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + $elm$core$String$fromInt(px),
											'width',
											$elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cf),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cg),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.dS + (' width-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.d4 + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.dp + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _v4.a;
									var newClass = _v4.b;
									var newStyles = _v4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 8:
						var height = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 0:
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.cM + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.bq + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.br + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.cN + (' height-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.d4 + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.V + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _v6.a;
									var newClass = _v6.b;
									var newStyles = _v6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 2:
						var description = attribute.a;
						switch (description.$) {
							case 0:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 1:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 2:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 3:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 4:
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											$mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + $elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 9:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 8:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 5:
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 6:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 9:
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 3:
									return styles;
								case 2:
									var str = elem.a;
									return styles;
								case 0:
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.dA);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3($mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 6:
						var x = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
var $mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			$mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				$mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				$mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				$mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				$elm$core$List$reverse(attributes)));
	});
var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 8, a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 1};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 7, a: a};
};
var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
var $mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.ev + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.aB)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$getLink = F3(
	function (id, key, store) {
		return A2(
			$elm$core$Maybe$andThen,
			function (linkedID) {
				return A2($elm$core$Dict$member, linkedID, store) ? $elm$core$Maybe$Just(linkedID) : $elm$core$Maybe$Nothing;
			},
			A2(
				$elm$core$Maybe$andThen,
				A2(
					$elm$core$Basics$composeR,
					function ($) {
						return $.c2;
					},
					$elm$core$Dict$get(key)),
				A2($elm$core$Dict$get, id, store)));
	});
var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Heading = function (a) {
	return {$: 4, a: a};
};
var $mdgriffith$elm_ui$Element$Region$heading = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Describe, $mdgriffith$elm_ui$Internal$Model$Heading);
var $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5(
	function (a, b, c, d, e) {
		return {$: 7, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
var $mdgriffith$elm_ui$Element$padding = function (x) {
	var f = x;
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + $elm$core$String$fromInt(x),
			f,
			f,
			f,
			f));
};
var $mdgriffith$elm_ui$Internal$Model$Paragraph = {$: 9};
var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 5, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
var $mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y)));
	});
var $mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var $mdgriffith$elm_ui$Element$paragraph = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asParagraph,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Paragraph),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$spacing(5),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $author$project$Main$percent = function (num) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(num * 100)) + '%';
};
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Main$query = F2(
	function (q, worldModel) {
		return A2(
			$elm$core$Result$withDefault,
			_List_Nil,
			A2(
				$elm$core$Result$map,
				function (parsedMatcher) {
					return A2($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$query, parsedMatcher, worldModel);
				},
				$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseMatcher(q)));
	});
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Element$rgb255 = F3(
	function (red, green, blue) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, red / 255, green / 255, blue / 255, 1);
	});
var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + $elm$core$String$fromInt(radius),
			'border-radius',
			$elm$core$String$fromInt(radius) + 'px'));
};
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $author$project$Main$InteractWith = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Button = {$: 8};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $mdgriffith$elm_ui$Element$Input$enter = 'Enter';
var $mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 0};
var $mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 4) && (attr.b.$ === 11)) && (!attr.b.a)) {
		var _v1 = attr.b;
		var _v2 = _v1.a;
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
	return A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onClick);
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $mdgriffith$elm_ui$Element$Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _v0 = lookup(code);
		if (_v0.$ === 1) {
			return $elm$json$Json$Decode$fail('No key matched');
		} else {
			var msg = _v0.a;
			return $elm$json$Json$Decode$succeed(msg);
		}
	};
	var isKey = A2(
		$elm$json$Json$Decode$andThen,
		decode,
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		A2(
			$elm$html$Html$Events$preventDefaultOn,
			'keydown',
			A2(
				$elm$json$Json$Decode$map,
				function (fired) {
					return _Utils_Tuple2(fired, true);
				},
				isKey)));
};
var $mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.ex);
var $mdgriffith$elm_ui$Element$Input$space = ' ';
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $mdgriffith$elm_ui$Element$Input$button = F2(
	function (attrs, _v0) {
		var onPress = _v0.a1;
		var label = _v0.aZ;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aU + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.W + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.fV + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.c5)))))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$pointer,
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$Input$focusDefault(attrs),
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Button),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											$elm$html$Html$Attributes$tabindex(0)),
										function () {
											if (onPress.$ === 1) {
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Internal$Model$Attr(
														$elm$html$Html$Attributes$disabled(true)),
													attrs);
											} else {
												var msg = onPress.a;
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Element$Events$onClick(msg),
													A2(
														$elm$core$List$cons,
														$mdgriffith$elm_ui$Element$Input$onKeyLookup(
															function (code) {
																return _Utils_eq(code, $mdgriffith$elm_ui$Element$Input$enter) ? $elm$core$Maybe$Just(msg) : (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space) ? $elm$core$Maybe$Just(msg) : $elm$core$Maybe$Nothing);
															}),
														attrs));
											}
										}()))))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $author$project$Main$viewEntity = function (_v0) {
	var id = _v0.a;
	var name = _v0.b.aF;
	return A2(
		$mdgriffith$elm_ui$Element$Input$button,
		_List_Nil,
		{
			aZ: $mdgriffith$elm_ui$Element$text(name),
			a1: $elm$core$Maybe$Just(
				$author$project$Main$InteractWith(id))
		});
};
var $author$project$Main$viewEntities = function (entities) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$padding(10)
			]),
		A2($elm$core$List$map, $author$project$Main$viewEntity, entities));
};
var $mdgriffith$elm_ui$Internal$Model$BorderWidth = F5(
	function (a, b, c, d, e) {
		return {$: 6, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Element$Border$width = function (v) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + $elm$core$String$fromInt(v),
			v,
			v,
			v,
			v));
};
var $author$project$Main$choiceColumn = function (model) {
	var currentLocation = A2(
		$elm$core$Maybe$withDefault,
		'ERROR getting current location',
		A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$getLink, 'PLAYER', 'current_location', model.g));
	var locations = A2(
		$elm$core$List$filter,
		function (_v0) {
			var locationID = _v0.a;
			return !_Utils_eq(locationID, currentLocation);
		},
		A2($author$project$Main$query, '*.location', model.g));
	var choices = A2($author$project$Main$query, '*.choice.current_location=(link PLAYER.current_location)', model.g);
	var characters = A2($author$project$Main$query, '*.character.current_location=(link PLAYER.current_location)', model.g);
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$spacing(5),
				$mdgriffith$elm_ui$Element$Border$width(2),
				$mdgriffith$elm_ui$Element$padding(5),
				$mdgriffith$elm_ui$Element$Border$rounded(3),
				$mdgriffith$elm_ui$Element$Border$color(
				A3($mdgriffith$elm_ui$Element$rgb255, 0, 0, 255))
			]),
		$elm$core$List$concat(
			_List_fromArray(
				[
					$elm$core$List$isEmpty(choices) ? _List_Nil : _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Region$heading(3)
							]),
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text('Choices:')
							])),
						$author$project$Main$viewEntities(choices)
					]),
					$elm$core$List$isEmpty(characters) ? _List_Nil : _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Region$heading(3)
							]),
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text('People in the room:')
							])),
						$author$project$Main$viewEntities(characters)
					]),
					$elm$core$List$isEmpty(locations) ? _List_Nil : _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Region$heading(3)
							]),
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text('Places you can go:')
							])),
						$author$project$Main$viewEntities(locations)
					]),
					_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Region$heading(3)
							]),
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text('Statistics:')
							])),
						A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_Nil,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text(
								$author$project$Main$percent(model.aD) + ' of your citizens are happy')
							])),
						A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_Nil,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text(
								$author$project$Main$percent(model.s) + ' of your citizens are healthy')
							])),
						A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Region$heading(3)
							]),
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text('Score:')
							])),
						A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_Nil,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text(
								$elm$core$String$fromInt(
									$elm$core$Basics$round(model.aJ)))
							]))
					])
				])));
};
var $author$project$Main$Hint = function (a) {
	return {$: 7, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$CenterY = 1;
var $mdgriffith$elm_ui$Element$centerY = $mdgriffith$elm_ui$Internal$Model$AlignY(1);
var $author$project$Main$HarvestFood = {$: 5};
var $mdgriffith$elm_ui$Element$Background$image = function (src) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		A2($elm$virtual_dom$VirtualDom$style, 'background', 'url(\"' + (src + '\") center / cover no-repeat')));
};
var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Element$px = $mdgriffith$elm_ui$Internal$Model$Px;
var $author$project$Main$clickerEarth = A2(
	$mdgriffith$elm_ui$Element$Input$button,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width(
			$mdgriffith$elm_ui$Element$px(280)),
			$mdgriffith$elm_ui$Element$height(
			$mdgriffith$elm_ui$Element$px(280)),
			$mdgriffith$elm_ui$Element$Background$image('./public/EarthGame.svg')
		]),
	{
		aZ: $mdgriffith$elm_ui$Element$text(''),
		a1: $elm$core$Maybe$Just($author$project$Main$HarvestFood)
	});
var $author$project$Main$onlyForJob = F2(
	function (title, person) {
		return A2(
			$elm$core$Maybe$andThen,
			function (job) {
				return _Utils_eq(title, job.F) ? $elm$core$Maybe$Just(person) : $elm$core$Maybe$Nothing;
			},
			person.ff);
	});
var $mdgriffith$elm_ui$Internal$Model$AsRow = 0;
var $mdgriffith$elm_ui$Internal$Model$asRow = 0;
var $mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.aB + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.W)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $author$project$Main$civilEngineer = function (_v0) {
	return A2(
		$mdgriffith$elm_ui$Element$paragraph,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Region$heading(2)
			]),
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$text('C')
			]));
};
var $author$project$Main$doctor = function (_v0) {
	return A2(
		$mdgriffith$elm_ui$Element$paragraph,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Region$heading(2)
			]),
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$text('D')
			]));
};
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $mdgriffith$elm_ui$Element$image = F2(
	function (attrs, _v0) {
		var src = _v0.f2;
		var description = _v0.aC;
		var imageAttributes = A2(
			$elm$core$List$filter,
			function (a) {
				switch (a.$) {
					case 7:
						return true;
					case 8:
						return true;
					default:
						return false;
				}
			},
			attrs);
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.e$),
				attrs),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[
						A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asEl,
						$mdgriffith$elm_ui$Internal$Model$NodeName('img'),
						_Utils_ap(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Internal$Model$Attr(
									$elm$html$Html$Attributes$src(src)),
									$mdgriffith$elm_ui$Internal$Model$Attr(
									$elm$html$Html$Attributes$alt(description))
								]),
							imageAttributes),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil))
					])));
	});
var $author$project$Main$farmer = function (person) {
	return A2(
		$mdgriffith$elm_ui$Element$image,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(32)),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(64))
			]),
		{
			aC: 'An 8-bit representation of a farmer.',
			f2: './public/farmer' + ($elm$core$String$fromInt(
				A2($elm$core$Basics$modBy, 3, person.e_)) + '.png')
		});
};
var $mdgriffith$elm_ui$Internal$Model$Empty = {$: 3};
var $mdgriffith$elm_ui$Element$none = $mdgriffith$elm_ui$Internal$Model$Empty;
var $author$project$Main$nurse = function (_v0) {
	return A2(
		$mdgriffith$elm_ui$Element$paragraph,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Region$heading(2)
			]),
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$text('N')
			]));
};
var $author$project$Main$socialWorker = function (_v0) {
	return A2(
		$mdgriffith$elm_ui$Element$paragraph,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Region$heading(2)
			]),
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$text('S')
			]));
};
var $author$project$Main$viewWorker = function (title) {
	switch (title) {
		case 0:
			return $author$project$Main$farmer;
		case 1:
			return $author$project$Main$doctor;
		case 2:
			return $author$project$Main$nurse;
		case 3:
			return $author$project$Main$civilEngineer;
		case 5:
			return $author$project$Main$socialWorker;
		default:
			return function (_v1) {
				return $mdgriffith$elm_ui$Element$none;
			};
	}
};
var $author$project$Main$viewWorkforce = F2(
	function (population, title) {
		return A2(
			$mdgriffith$elm_ui$Element$row,
			_List_Nil,
			A2(
				$elm$core$List$filterMap,
				A2(
					$elm$core$Basics$composeL,
					$elm$core$Maybe$map(
						$author$project$Main$viewWorker(title)),
					$author$project$Main$onlyForJob(title)),
				population));
	});
var $author$project$Main$clickerEconomy = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
			]),
		A2(
			$elm$core$List$map,
			$author$project$Main$viewWorkforce(model.v),
			_List_fromArray(
				[0, 1, 2, 3, 5])));
};
var $author$project$Main$Train = function (a) {
	return {$: 6, a: a};
};
var $author$project$Population$canTrain = F2(
	function (title, population) {
		return A2(
			$elm$core$List$any,
			function (person) {
				return _Utils_eq(person.ff, $elm$core$Maybe$Nothing) && A2($author$project$Person$isQualified, title, person);
			},
			population);
	});
var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$bgColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Model$Label = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Element$Region$description = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Describe, $mdgriffith$elm_ui$Internal$Model$Label);
var $author$project$Job$description = function (title) {
	switch (title) {
		case 0:
			return 'produce food';
		case 1:
			return 'perform surgeries; prescribe drugs';
		case 2:
			return 'prescribe drugs';
		case 3:
			return 'build housing';
		case 4:
			return 'increase efficiency';
		case 5:
			return 'increase happiness';
		case 6:
			return 'train citizens for jobs and more school';
		case 7:
			return 'train citizens for jobs';
		case 8:
			return 'build housing';
		default:
			return 'build housing';
	}
};
var $mdgriffith$elm_ui$Element$rgb = F3(
	function (r, g, b) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, r, g, b, 1);
	});
var $author$project$Palette$grey = A3($mdgriffith$elm_ui$Element$rgb, 130, 130, 130);
var $author$project$Job$showTitle = function (title) {
	switch (title) {
		case 0:
			return 'Farmer';
		case 1:
			return 'Doctor';
		case 2:
			return 'Nurse';
		case 3:
			return 'Civil Engineer';
		case 4:
			return 'Programmer';
		case 5:
			return 'Social Worker';
		case 6:
			return 'Teacher';
		case 7:
			return 'Professor';
		case 8:
			return 'Carpenter';
		default:
			return 'Electrician';
	}
};
var $elm$core$String$toLower = _String_toLower;
var $author$project$Main$trainButton = F2(
	function (population, title) {
		var titleString = $author$project$Job$showTitle(title);
		return A2($author$project$Population$canTrain, title, population) ? A2(
			$mdgriffith$elm_ui$Element$Input$button,
			_List_Nil,
			{
				aZ: $mdgriffith$elm_ui$Element$text(
					'Train a ' + (titleString + (' to ' + $author$project$Job$description(title)))),
				a1: $elm$core$Maybe$Just(
					$author$project$Main$Train(title))
			}) : A2(
			$mdgriffith$elm_ui$Element$Input$button,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Background$color($author$project$Palette$grey),
					$mdgriffith$elm_ui$Element$Region$description('Someone without a job is must be available before training.')
				]),
			{
				aZ: $mdgriffith$elm_ui$Element$text(
					'No prospective ' + ($elm$core$String$toLower(titleString) + ' available')),
				a1: $elm$core$Maybe$Nothing
			});
	});
var $author$project$Main$clickerStore = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$spacing(20)
			]),
		A2(
			$elm$core$List$map,
			$author$project$Main$trainButton(model.v),
			_List_fromArray(
				[0, 1, 2, 3, 5])));
};
var $terezka$line_charts$LineChart$Container$Margin = F4(
	function (top, right, bottom, left) {
		return {ei: bottom, c_: left, fP: right, dG: top};
	});
var $terezka$line_charts$Internal$Container$Config = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Container$custom = $elm$core$Basics$identity;
var $terezka$line_charts$LineChart$Container$custom = $terezka$line_charts$Internal$Container$custom;
var $terezka$line_charts$Internal$Container$Relative = 1;
var $terezka$line_charts$Internal$Container$relative = 1;
var $terezka$line_charts$LineChart$Container$relative = $terezka$line_charts$Internal$Container$relative;
var $author$project$History$containerConfig = $terezka$line_charts$LineChart$Container$custom(
	{
		d7: _List_Nil,
		d8: _List_Nil,
		e_: 'line-chart-area',
		fk: A4($terezka$line_charts$LineChart$Container$Margin, 30, 100, 30, 70),
		fZ: $terezka$line_charts$LineChart$Container$relative
	});
var $terezka$line_charts$Internal$Dots$Config = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Dots$custom = function (style_) {
	return {
		bz: function (_v0) {
			return style_;
		},
		bE: function (_v1) {
			return style_;
		}
	};
};
var $terezka$line_charts$LineChart$Dots$custom = $terezka$line_charts$Internal$Dots$custom;
var $terezka$line_charts$Internal$Axis$Values$Around = function (a) {
	return {$: 1, a: a};
};
var $terezka$line_charts$Internal$Axis$Values$around = $terezka$line_charts$Internal$Axis$Values$Around;
var $terezka$line_charts$Internal$Axis$Title$Config = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Axis$Title$custom = F4(
	function (position, x, y, title) {
		return {
			a: _Utils_Tuple2(x, y),
			a3: position,
			gA: title
		};
	});
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$tspan = $elm$svg$Svg$trustedNode('tspan');
var $terezka$line_charts$Internal$Svg$label = F2(
	function (color, string) {
		return A2(
			$elm$svg$Svg$text_,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill(color),
					$elm$svg$Svg$Attributes$style('pointer-events: none;')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$tspan,
					_List_Nil,
					_List_fromArray(
						[
							$elm$svg$Svg$text(string)
						]))
				]));
	});
var $terezka$line_charts$Internal$Axis$Title$atPosition = F3(
	function (position, x, y) {
		return A2(
			$elm$core$Basics$composeL,
			A3($terezka$line_charts$Internal$Axis$Title$custom, position, x, y),
			$terezka$line_charts$Internal$Svg$label('inherit'));
	});
var $terezka$line_charts$Internal$Axis$Title$atDataMax = function () {
	var position = F2(
		function (data, range) {
			return A2($elm$core$Basics$min, data.c3, range.c3);
		});
	return $terezka$line_charts$Internal$Axis$Title$atPosition(position);
}();
var $terezka$line_charts$Internal$Axis$Config = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Axis$custom = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Axis$Ticks$Config = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Axis$Ticks$custom = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Axis$Values$ceilingTo = F2(
	function (prec, number) {
		return prec * $elm$core$Basics$ceiling(number / prec);
	});
var $terezka$line_charts$Internal$Axis$Values$getBeginning = F2(
	function (min, interval) {
		var multiple = min / interval;
		return _Utils_eq(
			multiple,
			$elm$core$Basics$round(multiple)) ? min : A2($terezka$line_charts$Internal$Axis$Values$ceilingTo, interval, min);
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			$elm$core$List$any,
			function (c) {
				return (c !== '0') && (c !== '.');
			},
			$elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$Char$fromCode = _Char_fromCode;
var $myrho$elm_round$Round$increaseNum = function (_v0) {
	var head = _v0.a;
	var tail = _v0.b;
	if (head === '9') {
		var _v1 = $elm$core$String$uncons(tail);
		if (_v1.$ === 1) {
			return '01';
		} else {
			var headtail = _v1.a;
			return A2(
				$elm$core$String$cons,
				'0',
				$myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = $elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			$elm$core$String$cons,
			$elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $elm$core$String$reverse = _String_reverse;
var $myrho$elm_round$Round$splitComma = function (str) {
	var _v0 = A2($elm$core$String$split, '.', str);
	if (_v0.b) {
		if (_v0.b.b) {
			var before = _v0.a;
			var _v1 = _v0.b;
			var after = _v1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _v0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var $myrho$elm_round$Round$toDecimal = function (fl) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(
			$elm$core$Basics$abs(fl)));
	if (_v0.b) {
		if (_v0.b.b) {
			var num = _v0.a;
			var _v1 = _v0.b;
			var exp = _v1.a;
			var e = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(
					A2($elm$core$String$startsWith, '+', exp) ? A2($elm$core$String$dropLeft, 1, exp) : exp));
			var _v2 = $myrho$elm_round$Round$splitComma(num);
			var before = _v2.a;
			var after = _v2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return a + ('.' + b);
					},
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$mapFirst($elm$core$String$fromChar),
						$elm$core$String$uncons(
							_Utils_ap(
								A2(
									$elm$core$String$repeat,
									$elm$core$Basics$abs(e),
									'0'),
								total))))) : A3($elm$core$String$padRight, e + 1, '0', total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _v0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var $myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if ($elm$core$Basics$isInfinite(fl) || $elm$core$Basics$isNaN(fl)) {
			return $elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _v0 = $myrho$elm_round$Round$splitComma(
				$myrho$elm_round$Round$toDecimal(
					$elm$core$Basics$abs(fl)));
			var before = _v0.a;
			var after = _v0.b;
			var r = $elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2($elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					$elm$core$String$padRight,
					r,
					'0',
					_Utils_ap(before, after)));
			var totalLen = $elm$core$String$length(normalized);
			var roundDigitIndex = A2($elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3($elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3($elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? $elm$core$String$reverse(
				A2(
					$elm$core$Maybe$withDefault,
					'1',
					A2(
						$elm$core$Maybe$map,
						$myrho$elm_round$Round$increaseNum,
						$elm$core$String$uncons(
							$elm$core$String$reverse(remains))))) : remains;
			var numLen = $elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					$elm$core$String$repeat,
					$elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				$elm$core$String$length(after)) < 0) ? (A3($elm$core$String$slice, 0, numLen - s, num) + ('.' + A3($elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3($elm$core$String$padRight, s, '0', after))));
			return A2($myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var $myrho$elm_round$Round$round = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 1) {
				return false;
			} else {
				if ('5' === _v0.a.a) {
					if (_v0.a.b === '') {
						var _v1 = _v0.a;
						return !signed;
					} else {
						var _v2 = _v0.a;
						return true;
					}
				} else {
					var _v3 = _v0.a;
					var _int = _v3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						$elm$core$Char$toCode(_int));
				}
			}
		}));
var $elm$core$String$toFloat = _String_toFloat;
var $terezka$line_charts$Internal$Axis$Values$correctFloat = function (prec) {
	return A2(
		$elm$core$Basics$composeR,
		$myrho$elm_round$Round$round(prec),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$String$toFloat,
			$elm$core$Maybe$withDefault(0)));
};
var $terezka$line_charts$Internal$Axis$Values$getMultiples = F3(
	function (magnitude, allowDecimals, hasTickAmount) {
		var defaults = hasTickAmount ? _List_fromArray(
			[1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) : _List_fromArray(
			[1, 2, 2.5, 5, 10]);
		return allowDecimals ? defaults : ((magnitude === 1) ? A2(
			$elm$core$List$filter,
			function (n) {
				return _Utils_eq(
					$elm$core$Basics$round(n),
					n);
			},
			defaults) : ((magnitude <= 0.1) ? _List_fromArray(
			[1 / magnitude]) : defaults));
	});
var $terezka$line_charts$Internal$Axis$Values$getPrecision = function (number) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(number));
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var before = _v0.a;
		var _v1 = _v0.b;
		var after = _v1.a;
		return $elm$core$Basics$abs(
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(after)));
	} else {
		var _v2 = A2(
			$elm$core$String$split,
			'.',
			$elm$core$String$fromFloat(number));
		if ((_v2.b && _v2.b.b) && (!_v2.b.b.b)) {
			var before = _v2.a;
			var _v3 = _v2.b;
			var after = _v3.a;
			return $elm$core$String$length(after);
		} else {
			return 0;
		}
	}
};
var $elm$core$Basics$e = _Basics_e;
var $elm$core$Basics$pow = _Basics_pow;
var $terezka$line_charts$Internal$Utils$magnitude = function (num) {
	return A2(
		$elm$core$Basics$pow,
		10,
		$elm$core$Basics$floor(
			A2($elm$core$Basics$logBase, $elm$core$Basics$e, num) / A2($elm$core$Basics$logBase, $elm$core$Basics$e, 10)));
};
var $terezka$line_charts$Internal$Axis$Values$getInterval = F3(
	function (intervalRaw, allowDecimals, hasTickAmount) {
		var magnitude = $terezka$line_charts$Internal$Utils$magnitude(intervalRaw);
		var multiples = A3($terezka$line_charts$Internal$Axis$Values$getMultiples, magnitude, allowDecimals, hasTickAmount);
		var normalized = intervalRaw / magnitude;
		var findMultipleExact = function (multiples_) {
			findMultipleExact:
			while (true) {
				if (multiples_.b) {
					var m1 = multiples_.a;
					var rest = multiples_.b;
					if (_Utils_cmp(m1 * magnitude, intervalRaw) > -1) {
						return m1;
					} else {
						var $temp$multiples_ = rest;
						multiples_ = $temp$multiples_;
						continue findMultipleExact;
					}
				} else {
					return 1;
				}
			}
		};
		var findMultiple = function (multiples_) {
			findMultiple:
			while (true) {
				if (multiples_.b) {
					if (multiples_.b.b) {
						var m1 = multiples_.a;
						var _v2 = multiples_.b;
						var m2 = _v2.a;
						var rest = _v2.b;
						if (_Utils_cmp(normalized, (m1 + m2) / 2) < 1) {
							return m1;
						} else {
							var $temp$multiples_ = A2($elm$core$List$cons, m2, rest);
							multiples_ = $temp$multiples_;
							continue findMultiple;
						}
					} else {
						var m1 = multiples_.a;
						var rest = multiples_.b;
						if (_Utils_cmp(normalized, m1) < 1) {
							return m1;
						} else {
							var $temp$multiples_ = rest;
							multiples_ = $temp$multiples_;
							continue findMultiple;
						}
					}
				} else {
					return 1;
				}
			}
		};
		var multiple = hasTickAmount ? findMultipleExact(multiples) : findMultiple(multiples);
		var precision = $terezka$line_charts$Internal$Axis$Values$getPrecision(magnitude) + $terezka$line_charts$Internal$Axis$Values$getPrecision(multiple);
		return A2($terezka$line_charts$Internal$Axis$Values$correctFloat, precision, multiple * magnitude);
	});
var $terezka$line_charts$Internal$Axis$Values$positions = F5(
	function (range, beginning, interval, m, acc) {
		positions:
		while (true) {
			var next = A2(
				$terezka$line_charts$Internal$Axis$Values$correctFloat,
				$terezka$line_charts$Internal$Axis$Values$getPrecision(interval),
				beginning + (m * interval));
			if (_Utils_cmp(next, range.c3) > 0) {
				return acc;
			} else {
				var $temp$range = range,
					$temp$beginning = beginning,
					$temp$interval = interval,
					$temp$m = m + 1,
					$temp$acc = _Utils_ap(
					acc,
					_List_fromArray(
						[next]));
				range = $temp$range;
				beginning = $temp$beginning;
				interval = $temp$interval;
				m = $temp$m;
				acc = $temp$acc;
				continue positions;
			}
		}
	});
var $terezka$line_charts$Internal$Axis$Values$values = F4(
	function (allowDecimals, exact, amountRough, range) {
		var intervalRough = (range.c3 - range.bK) / amountRough;
		var interval = A3($terezka$line_charts$Internal$Axis$Values$getInterval, intervalRough, allowDecimals, exact);
		var intervalSafe = (!interval) ? 1 : interval;
		var beginning = A2($terezka$line_charts$Internal$Axis$Values$getBeginning, range.bK, intervalSafe);
		var amountRoughSafe = (!amountRough) ? 1 : amountRough;
		return A5($terezka$line_charts$Internal$Axis$Values$positions, range, beginning, intervalSafe, 0, _List_Nil);
	});
var $terezka$line_charts$Internal$Axis$Values$float = function (amount) {
	if (!amount.$) {
		var amount_ = amount.a;
		return A3($terezka$line_charts$Internal$Axis$Values$values, true, true, amount_);
	} else {
		var amount_ = amount.a;
		return A3($terezka$line_charts$Internal$Axis$Values$values, true, false, amount_);
	}
};
var $terezka$line_charts$Internal$Axis$Tick$Negative = 0;
var $terezka$line_charts$Internal$Axis$Tick$Config = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Axis$Tick$custom = $elm$core$Basics$identity;
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $avh4$elm_color$Color$scaleFrom255 = function (c) {
	return c / 255;
};
var $avh4$elm_color$Color$rgb255 = F3(
	function (r, g, b) {
		return A4(
			$avh4$elm_color$Color$RgbaSpace,
			$avh4$elm_color$Color$scaleFrom255(r),
			$avh4$elm_color$Color$scaleFrom255(g),
			$avh4$elm_color$Color$scaleFrom255(b),
			1.0);
	});
var $terezka$line_charts$LineChart$Colors$gray = A3($avh4$elm_color$Color$rgb255, 163, 163, 163);
var $terezka$line_charts$Internal$Axis$Tick$float = function (n) {
	return $terezka$line_charts$Internal$Axis$Tick$custom(
		{
			ar: $terezka$line_charts$LineChart$Colors$gray,
			bl: 0,
			eP: true,
			aZ: $elm$core$Maybe$Just(
				A2(
					$terezka$line_charts$Internal$Svg$label,
					'inherit',
					$elm$core$String$fromFloat(n))),
			bF: 5,
			a3: n,
			dQ: 1
		});
};
var $terezka$line_charts$LineChart$Axis$Tick$float = $terezka$line_charts$Internal$Axis$Tick$float;
var $terezka$line_charts$Internal$Axis$Range$Padded = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $terezka$line_charts$Internal$Axis$Range$padded = $terezka$line_charts$Internal$Axis$Range$Padded;
var $terezka$line_charts$Internal$Axis$Line$Config = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Axis$Line$custom = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Coordinate$smallestRange = F2(
	function (data, range_) {
		return {
			c3: A2($elm$core$Basics$min, data.c3, range_.c3),
			bK: A2($elm$core$Basics$max, data.bK, range_.bK)
		};
	});
var $terezka$line_charts$Internal$Axis$Line$rangeFrame = function (color) {
	return $terezka$line_charts$Internal$Axis$Line$custom(
		F2(
			function (data, range) {
				var smallest = A2($terezka$line_charts$Internal$Coordinate$smallestRange, data, range);
				return {ar: color, cC: smallest.c3, eG: _List_Nil, b6: smallest.bK, dQ: 1};
			}));
};
var $terezka$line_charts$Internal$Axis$default = F3(
	function (pixels_, title_, variable_) {
		return $terezka$line_charts$Internal$Axis$custom(
			{
				U: $terezka$line_charts$Internal$Axis$Line$rangeFrame($terezka$line_charts$LineChart$Colors$gray),
				ag: pixels_,
				ah: A2($terezka$line_charts$Internal$Axis$Range$padded, 20, 20),
				w: $terezka$line_charts$Internal$Axis$Ticks$custom(
					F2(
						function (data, range_) {
							var smallest = A2($terezka$line_charts$Internal$Coordinate$smallestRange, data, range_);
							var rangeSmall = smallest.c3 - smallest.bK;
							var rangeLong = range_.c3 - range_.bK;
							var diff = 1 - ((rangeLong - rangeSmall) / rangeLong);
							var amount = $elm$core$Basics$round((diff * pixels_) / 90);
							return A2(
								$elm$core$List$map,
								$terezka$line_charts$LineChart$Axis$Tick$float,
								A2(
									$terezka$line_charts$Internal$Axis$Values$float,
									$terezka$line_charts$Internal$Axis$Values$around(amount),
									smallest));
						})),
				F: A3($terezka$line_charts$Internal$Axis$Title$atDataMax, 0, 0, title_),
				al: A2($elm$core$Basics$composeL, $elm$core$Maybe$Just, variable_)
			});
	});
var $terezka$line_charts$LineChart$Axis$default = $terezka$line_charts$Internal$Axis$default;
var $terezka$line_charts$Internal$Axis$Intersection$Config = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Data$Point = F2(
	function (x, y) {
		return {gD: x, gE: y};
	});
var $terezka$line_charts$Internal$Axis$Intersection$custom = F2(
	function (toX, toY) {
		return function (_v0) {
			var x = _v0.gD;
			var y = _v0.gE;
			return A2(
				$terezka$line_charts$Internal$Data$Point,
				toX(x),
				toY(y));
		};
	});
var $terezka$line_charts$Internal$Axis$Intersection$default = A2(
	$terezka$line_charts$Internal$Axis$Intersection$custom,
	function ($) {
		return $.bK;
	},
	function ($) {
		return $.bK;
	});
var $terezka$line_charts$LineChart$Axis$Intersection$default = $terezka$line_charts$Internal$Axis$Intersection$default;
var $terezka$line_charts$Internal$Legends$Grouped = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $terezka$line_charts$Internal$Svg$Transfrom = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $terezka$line_charts$Internal$Svg$offset = F2(
	function (x, y) {
		return A2($terezka$line_charts$Internal$Svg$Transfrom, x, y);
	});
var $terezka$line_charts$Internal$Svg$addPosition = F2(
	function (_v0, _v1) {
		var x = _v0.a;
		var y = _v0.b;
		var xf = _v1.a;
		var yf = _v1.b;
		return A2($terezka$line_charts$Internal$Svg$Transfrom, xf + x, yf + y);
	});
var $terezka$line_charts$Internal$Svg$toPosition = A2(
	$elm$core$List$foldr,
	$terezka$line_charts$Internal$Svg$addPosition,
	A2($terezka$line_charts$Internal$Svg$Transfrom, 0, 0));
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $terezka$line_charts$Internal$Svg$transform = function (translations) {
	var _v0 = $terezka$line_charts$Internal$Svg$toPosition(translations);
	var x = _v0.a;
	var y = _v0.b;
	return $elm$svg$Svg$Attributes$transform(
		'translate(' + ($elm$core$String$fromFloat(x) + (', ' + ($elm$core$String$fromFloat(y) + ')'))));
};
var $terezka$line_charts$Internal$Legends$defaultLegend = F2(
	function (index, _v0) {
		var sample = _v0.bX;
		var label = _v0.aZ;
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__legend'),
					$terezka$line_charts$Internal$Svg$transform(
					_List_fromArray(
						[
							A2($terezka$line_charts$Internal$Svg$offset, 20, index * 20)
						]))
				]),
			_List_fromArray(
				[
					sample,
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$terezka$line_charts$Internal$Svg$transform(
							_List_fromArray(
								[
									A2($terezka$line_charts$Internal$Svg$offset, 40, 4)
								]))
						]),
					_List_fromArray(
						[
							A2($terezka$line_charts$Internal$Svg$label, 'inherit', label)
						]))
				]));
	});
var $terezka$line_charts$Internal$Coordinate$lengthX = function (system) {
	return A2($elm$core$Basics$max, 1, (system.aW.fZ.dQ - system.aW.fk.c_) - system.aW.fk.fP);
};
var $terezka$line_charts$Internal$Coordinate$reachX = function (system) {
	var diff = system.gD.c3 - system.gD.bK;
	return (diff > 0) ? diff : 1;
};
var $terezka$line_charts$LineChart$Coordinate$scaleSvgX = F2(
	function (system, value) {
		return (value * $terezka$line_charts$Internal$Coordinate$lengthX(system)) / $terezka$line_charts$Internal$Coordinate$reachX(system);
	});
var $terezka$line_charts$LineChart$Coordinate$toSvgX = F2(
	function (system, value) {
		return A2($terezka$line_charts$LineChart$Coordinate$scaleSvgX, system, value - system.gD.bK) + system.aW.fk.c_;
	});
var $terezka$line_charts$Internal$Coordinate$lengthY = function (system) {
	return A2($elm$core$Basics$max, 1, (system.aW.fZ.cL - system.aW.fk.ei) - system.aW.fk.dG);
};
var $terezka$line_charts$Internal$Coordinate$reachY = function (system) {
	var diff = system.gE.c3 - system.gE.bK;
	return (diff > 0) ? diff : 1;
};
var $terezka$line_charts$LineChart$Coordinate$scaleSvgY = F2(
	function (system, value) {
		return (value * $terezka$line_charts$Internal$Coordinate$lengthY(system)) / $terezka$line_charts$Internal$Coordinate$reachY(system);
	});
var $terezka$line_charts$LineChart$Coordinate$toSvgY = F2(
	function (system, value) {
		return A2($terezka$line_charts$LineChart$Coordinate$scaleSvgY, system, system.gE.c3 - value) + system.aW.fk.dG;
	});
var $terezka$line_charts$Internal$Svg$move = F3(
	function (system, x, y) {
		return A2(
			$terezka$line_charts$Internal$Svg$Transfrom,
			A2($terezka$line_charts$LineChart$Coordinate$toSvgX, system, x),
			A2($terezka$line_charts$LineChart$Coordinate$toSvgY, system, y));
	});
var $terezka$line_charts$Internal$Legends$defaultLegends = F8(
	function (toX, toY, offsetX, offsetY, hovered, _arguments, system, legends) {
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__legends'),
					$terezka$line_charts$Internal$Svg$transform(
					_List_fromArray(
						[
							A3(
							$terezka$line_charts$Internal$Svg$move,
							system,
							toX(system.gD),
							toY(system.gE)),
							A2($terezka$line_charts$Internal$Svg$offset, offsetX, offsetY)
						]))
				]),
			A2($elm$core$List$indexedMap, $terezka$line_charts$Internal$Legends$defaultLegend, legends));
	});
var $terezka$line_charts$Internal$Legends$hover = function (data) {
	return A2(
		$terezka$line_charts$Internal$Legends$Grouped,
		30,
		A5(
			$terezka$line_charts$Internal$Legends$defaultLegends,
			function ($) {
				return $.c3;
			},
			function ($) {
				return $.c3;
			},
			0,
			10,
			data));
};
var $terezka$line_charts$Internal$Legends$default = $terezka$line_charts$Internal$Legends$hover(_List_Nil);
var $terezka$line_charts$LineChart$Legends$default = $terezka$line_charts$Internal$Legends$default;
var $terezka$line_charts$Internal$Line$Config = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Line$Style = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Line$style = F2(
	function (width, color_) {
		return {ar: color_, dQ: width};
	});
var $terezka$line_charts$Internal$Line$default = function (_v0) {
	return A2($terezka$line_charts$Internal$Line$style, 1, $elm$core$Basics$identity);
};
var $terezka$line_charts$LineChart$Line$default = $terezka$line_charts$Internal$Line$default;
var $terezka$line_charts$Internal$Grid$Dots = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $terezka$line_charts$Internal$Grid$dots = $terezka$line_charts$Internal$Grid$Dots;
var $terezka$line_charts$LineChart$Grid$dots = $terezka$line_charts$Internal$Grid$dots;
var $terezka$line_charts$Internal$Dots$Empty = function (a) {
	return {$: 0, a: a};
};
var $terezka$line_charts$Internal$Dots$Style = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Dots$style = F2(
	function (radius, variety) {
		return {bU: radius, cc: variety};
	});
var $terezka$line_charts$Internal$Dots$empty = F2(
	function (radius, border) {
		return A2(
			$terezka$line_charts$Internal$Dots$style,
			radius,
			$terezka$line_charts$Internal$Dots$Empty(border));
	});
var $terezka$line_charts$LineChart$Dots$empty = $terezka$line_charts$Internal$Dots$empty;
var $ryannhg$date_format$DateFormat$DayOfMonthSuffix = {$: 6};
var $ryannhg$date_format$DateFormat$dayOfMonthSuffix = $ryannhg$date_format$DateFormat$DayOfMonthSuffix;
var $ryannhg$date_format$DateFormat$Language$Language = F6(
	function (toMonthName, toMonthAbbreviation, toWeekdayName, toWeekdayAbbreviation, toAmPm, toOrdinalSuffix) {
		return {gp: toAmPm, gq: toMonthAbbreviation, gr: toMonthName, aw: toOrdinalSuffix, gs: toWeekdayAbbreviation, gt: toWeekdayName};
	});
var $ryannhg$date_format$DateFormat$Language$toEnglishAmPm = function (hour) {
	return (hour > 11) ? 'pm' : 'am';
};
var $ryannhg$date_format$DateFormat$Language$toEnglishMonthName = function (month) {
	switch (month) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		default:
			return 'December';
	}
};
var $ryannhg$date_format$DateFormat$Language$toEnglishSuffix = function (num) {
	var _v0 = A2($elm$core$Basics$modBy, 100, num);
	switch (_v0) {
		case 11:
			return 'th';
		case 12:
			return 'th';
		case 13:
			return 'th';
		default:
			var _v1 = A2($elm$core$Basics$modBy, 10, num);
			switch (_v1) {
				case 1:
					return 'st';
				case 2:
					return 'nd';
				case 3:
					return 'rd';
				default:
					return 'th';
			}
	}
};
var $ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName = function (weekday) {
	switch (weekday) {
		case 0:
			return 'Monday';
		case 1:
			return 'Tuesday';
		case 2:
			return 'Wednesday';
		case 3:
			return 'Thursday';
		case 4:
			return 'Friday';
		case 5:
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $ryannhg$date_format$DateFormat$Language$english = A6(
	$ryannhg$date_format$DateFormat$Language$Language,
	$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishAmPm,
	$ryannhg$date_format$DateFormat$Language$toEnglishSuffix);
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $ryannhg$date_format$DateFormat$amPm = F3(
	function (language, zone, posix) {
		return language.gp(
			A2($elm$time$Time$toHour, zone, posix));
	});
var $ryannhg$date_format$DateFormat$dayOfMonth = $elm$time$Time$toDay;
var $elm$time$Time$Sun = 6;
var $elm$time$Time$Fri = 4;
var $elm$time$Time$Mon = 0;
var $elm$time$Time$Sat = 5;
var $elm$time$Time$Thu = 3;
var $elm$time$Time$Tue = 1;
var $elm$time$Time$Wed = 2;
var $ryannhg$date_format$DateFormat$days = _List_fromArray(
	[6, 0, 1, 2, 3, 4, 5]);
var $elm$time$Time$toWeekday = F2(
	function (zone, time) {
		var _v0 = A2(
			$elm$core$Basics$modBy,
			7,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60 * 24));
		switch (_v0) {
			case 0:
				return 3;
			case 1:
				return 4;
			case 2:
				return 5;
			case 3:
				return 6;
			case 4:
				return 0;
			case 5:
				return 1;
			default:
				return 2;
		}
	});
var $ryannhg$date_format$DateFormat$dayOfWeek = F2(
	function (zone, posix) {
		return function (_v1) {
			var i = _v1.a;
			return i;
		}(
			A2(
				$elm$core$Maybe$withDefault,
				_Utils_Tuple2(0, 6),
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (_v0) {
							var day = _v0.b;
							return _Utils_eq(
								day,
								A2($elm$time$Time$toWeekday, zone, posix));
						},
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (i, day) {
									return _Utils_Tuple2(i, day);
								}),
							$ryannhg$date_format$DateFormat$days)))));
	});
var $ryannhg$date_format$DateFormat$isLeapYear = function (year_) {
	return (!(!A2($elm$core$Basics$modBy, 4, year_))) ? false : ((!(!A2($elm$core$Basics$modBy, 100, year_))) ? true : ((!(!A2($elm$core$Basics$modBy, 400, year_))) ? false : true));
};
var $ryannhg$date_format$DateFormat$daysInMonth = F2(
	function (year_, month) {
		switch (month) {
			case 0:
				return 31;
			case 1:
				return $ryannhg$date_format$DateFormat$isLeapYear(year_) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var $ryannhg$date_format$DateFormat$months = _List_fromArray(
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
var $ryannhg$date_format$DateFormat$monthPair = F2(
	function (zone, posix) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, 0),
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (_v0) {
						var i = _v0.a;
						var m = _v0.b;
						return _Utils_eq(
							m,
							A2($elm$time$Time$toMonth, zone, posix));
					},
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (a, b) {
								return _Utils_Tuple2(a, b);
							}),
						$ryannhg$date_format$DateFormat$months))));
	});
var $ryannhg$date_format$DateFormat$monthNumber_ = F2(
	function (zone, posix) {
		return 1 + function (_v0) {
			var i = _v0.a;
			var m = _v0.b;
			return i;
		}(
			A2($ryannhg$date_format$DateFormat$monthPair, zone, posix));
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $ryannhg$date_format$DateFormat$dayOfYear = F2(
	function (zone, posix) {
		var monthsBeforeThisOne = A2(
			$elm$core$List$take,
			A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) - 1,
			$ryannhg$date_format$DateFormat$months);
		var daysBeforeThisMonth = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				$ryannhg$date_format$DateFormat$daysInMonth(
					A2($elm$time$Time$toYear, zone, posix)),
				monthsBeforeThisOne));
		return daysBeforeThisMonth + A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix);
	});
var $ryannhg$date_format$DateFormat$quarter = F2(
	function (zone, posix) {
		return (A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) / 4) | 0;
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $ryannhg$date_format$DateFormat$toFixedLength = F2(
	function (totalChars, num) {
		var numStr = $elm$core$String$fromInt(num);
		var numZerosNeeded = totalChars - $elm$core$String$length(numStr);
		var zeros = A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				function (_v0) {
					return '0';
				},
				A2($elm$core$List$range, 1, numZerosNeeded)));
		return _Utils_ap(zeros, numStr);
	});
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $ryannhg$date_format$DateFormat$toNonMilitary = function (num) {
	return (!num) ? 12 : ((num <= 12) ? num : (num - 12));
};
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $elm$core$String$toUpper = _String_toUpper;
var $ryannhg$date_format$DateFormat$millisecondsPerYear = $elm$core$Basics$round((((1000 * 60) * 60) * 24) * 365.25);
var $ryannhg$date_format$DateFormat$firstDayOfYear = F2(
	function (zone, time) {
		return $elm$time$Time$millisToPosix(
			$ryannhg$date_format$DateFormat$millisecondsPerYear * A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$weekOfYear = F2(
	function (zone, posix) {
		var firstDay = A2($ryannhg$date_format$DateFormat$firstDayOfYear, zone, posix);
		var firstDayOffset = A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, firstDay);
		var daysSoFar = A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix);
		return (((daysSoFar + firstDayOffset) / 7) | 0) + 1;
	});
var $ryannhg$date_format$DateFormat$year = F2(
	function (zone, time) {
		return $elm$core$String$fromInt(
			A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$piece = F4(
	function (language, zone, posix, token) {
		switch (token.$) {
			case 0:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 1:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.aw(num));
				}(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 2:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 3:
				return language.gq(
					A2($elm$time$Time$toMonth, zone, posix));
			case 4:
				return language.gr(
					A2($elm$time$Time$toMonth, zone, posix));
			case 17:
				return $elm$core$String$fromInt(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 18:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.aw(num));
				}(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 5:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 6:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.aw(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 7:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 8:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 9:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.aw(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 10:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 11:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 12:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.aw(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 13:
				return language.gs(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 14:
				return language.gt(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 19:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 20:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.aw(num));
				}(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 21:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 15:
				return A2(
					$elm$core$String$right,
					2,
					A2($ryannhg$date_format$DateFormat$year, zone, posix));
			case 16:
				return A2($ryannhg$date_format$DateFormat$year, zone, posix);
			case 22:
				return $elm$core$String$toUpper(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 23:
				return $elm$core$String$toLower(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 24:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toHour, zone, posix));
			case 25:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toHour, zone, posix));
			case 26:
				return $elm$core$String$fromInt(
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 27:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 28:
				return $elm$core$String$fromInt(
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 29:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 30:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMinute, zone, posix));
			case 31:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toMinute, zone, posix));
			case 32:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toSecond, zone, posix));
			case 33:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toSecond, zone, posix));
			case 34:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMillis, zone, posix));
			case 35:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($elm$time$Time$toMillis, zone, posix));
			default:
				var string = token.a;
				return string;
		}
	});
var $ryannhg$date_format$DateFormat$formatWithLanguage = F4(
	function (language, tokens, zone, time) {
		return A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				A3($ryannhg$date_format$DateFormat$piece, language, zone, time),
				tokens));
	});
var $ryannhg$date_format$DateFormat$format = $ryannhg$date_format$DateFormat$formatWithLanguage($ryannhg$date_format$DateFormat$Language$english);
var $ryannhg$date_format$DateFormat$MonthNameFull = {$: 4};
var $ryannhg$date_format$DateFormat$monthNameFull = $ryannhg$date_format$DateFormat$MonthNameFull;
var $ryannhg$date_format$DateFormat$Text = function (a) {
	return {$: 36, a: a};
};
var $ryannhg$date_format$DateFormat$text = $ryannhg$date_format$DateFormat$Text;
var $ryannhg$date_format$DateFormat$YearNumber = {$: 16};
var $ryannhg$date_format$DateFormat$yearNumber = $ryannhg$date_format$DateFormat$YearNumber;
var $author$project$GameTime$usFormat = A2(
	$ryannhg$date_format$DateFormat$format,
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$monthNameFull,
			$ryannhg$date_format$DateFormat$text(' '),
			$ryannhg$date_format$DateFormat$dayOfMonthSuffix,
			$ryannhg$date_format$DateFormat$text(', '),
			$ryannhg$date_format$DateFormat$yearNumber
		]),
	$elm$time$Time$utc);
var $author$project$History$formatX = function (datum) {
	return $author$project$GameTime$usFormat(datum.ca);
};
var $author$project$History$formatY = function (datum) {
	return $elm$core$String$fromFloat(datum.bP);
};
var $terezka$line_charts$Internal$Events$Config = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Events$custom = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Events$Decoder = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Events$distanceX = F3(
	function (system, searched, dot) {
		return $elm$core$Basics$abs(
			A2($terezka$line_charts$LineChart$Coordinate$toSvgX, system, dot.gD) - A2($terezka$line_charts$LineChart$Coordinate$toSvgX, system, searched.gD));
	});
var $terezka$line_charts$Internal$Events$getNearestXHelp = F3(
	function (points, system, searched) {
		var distanceX_ = A2($terezka$line_charts$Internal$Events$distanceX, system, searched);
		var getClosest = F2(
			function (point, allClosest) {
				var _v0 = $elm$core$List$head(allClosest);
				if (!_v0.$) {
					var closest = _v0.a;
					return _Utils_eq(closest.fK.gD, point.fK.gD) ? A2($elm$core$List$cons, point, allClosest) : ((_Utils_cmp(
						distanceX_(closest.fK),
						distanceX_(point.fK)) > 0) ? _List_fromArray(
						[point]) : allClosest);
				} else {
					return _List_fromArray(
						[point]);
				}
			});
		return A3($elm$core$List$foldl, getClosest, _List_Nil, points);
	});
var $terezka$line_charts$LineChart$Coordinate$scaleDataX = F2(
	function (system, value) {
		return (value * $terezka$line_charts$Internal$Coordinate$reachX(system)) / $terezka$line_charts$Internal$Coordinate$lengthX(system);
	});
var $terezka$line_charts$LineChart$Coordinate$toDataX = F2(
	function (system, value) {
		return system.gD.bK + A2($terezka$line_charts$LineChart$Coordinate$scaleDataX, system, value - system.aW.fk.c_);
	});
var $terezka$line_charts$LineChart$Coordinate$scaleDataY = F2(
	function (system, value) {
		return (value * $terezka$line_charts$Internal$Coordinate$reachY(system)) / $terezka$line_charts$Internal$Coordinate$lengthY(system);
	});
var $terezka$line_charts$LineChart$Coordinate$toDataY = F2(
	function (system, value) {
		return system.gE.c3 - A2($terezka$line_charts$LineChart$Coordinate$scaleDataY, system, value - system.aW.fk.dG);
	});
var $terezka$line_charts$LineChart$Coordinate$toData = F2(
	function (system, point) {
		return {
			gD: A2($terezka$line_charts$LineChart$Coordinate$toDataX, system, point.gD),
			gE: A2($terezka$line_charts$LineChart$Coordinate$toDataY, system, point.gE)
		};
	});
var $terezka$line_charts$Internal$Events$getNearestX = F3(
	function (points, system, searchedSvg) {
		var searched = A2($terezka$line_charts$LineChart$Coordinate$toData, system, searchedSvg);
		return A2(
			$elm$core$List$map,
			function ($) {
				return $.gz;
			},
			A3($terezka$line_charts$Internal$Events$getNearestXHelp, points, system, searched));
	});
var $terezka$line_charts$Internal$Events$Event = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$svg$Svg$Events$on = $elm$html$Html$Events$on;
var $terezka$line_charts$Internal$Events$onMouseLeave = function (msg) {
	return A2(
		$terezka$line_charts$Internal$Events$Event,
		false,
		F2(
			function (_v0, _v1) {
				return A2(
					$elm$svg$Svg$Events$on,
					'mouseleave',
					$elm$json$Json$Decode$succeed(msg));
			}));
};
var $terezka$line_charts$Internal$Events$Options = F3(
	function (stopPropagation, preventDefault, catchOutsideChart) {
		return {cs: catchOutsideChart, bS: preventDefault, b7: stopPropagation};
	});
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $elm$svg$Svg$Events$custom = $elm$html$Html$Events$custom;
var $terezka$line_charts$Internal$Events$map = F2(
	function (f, _v0) {
		var a = _v0;
		return F3(
			function (ps, s, p) {
				return f(
					A3(a, ps, s, p));
			});
	});
var $terezka$line_charts$LineChart$Coordinate$Point = F2(
	function (x, y) {
		return {gD: x, gE: y};
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $debois$elm_dom$DOM$offsetHeight = A2($elm$json$Json$Decode$field, 'offsetHeight', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$offsetWidth = A2($elm$json$Json$Decode$field, 'offsetWidth', $elm$json$Json$Decode$float);
var $elm$json$Json$Decode$map4 = _Json_map4;
var $debois$elm_dom$DOM$offsetLeft = A2($elm$json$Json$Decode$field, 'offsetLeft', $elm$json$Json$Decode$float);
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $debois$elm_dom$DOM$offsetParent = F2(
	function (x, decoder) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$json$Json$Decode$field,
					'offsetParent',
					$elm$json$Json$Decode$null(x)),
					A2($elm$json$Json$Decode$field, 'offsetParent', decoder)
				]));
	});
var $debois$elm_dom$DOM$offsetTop = A2($elm$json$Json$Decode$field, 'offsetTop', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$scrollLeft = A2($elm$json$Json$Decode$field, 'scrollLeft', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$scrollTop = A2($elm$json$Json$Decode$field, 'scrollTop', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$position = F2(
	function (x, y) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (_v0) {
				var x_ = _v0.a;
				var y_ = _v0.b;
				return A2(
					$debois$elm_dom$DOM$offsetParent,
					_Utils_Tuple2(x_, y_),
					A2($debois$elm_dom$DOM$position, x_, y_));
			},
			A5(
				$elm$json$Json$Decode$map4,
				F4(
					function (scrollLeftP, scrollTopP, offsetLeftP, offsetTopP) {
						return _Utils_Tuple2((x + offsetLeftP) - scrollLeftP, (y + offsetTopP) - scrollTopP);
					}),
				$debois$elm_dom$DOM$scrollLeft,
				$debois$elm_dom$DOM$scrollTop,
				$debois$elm_dom$DOM$offsetLeft,
				$debois$elm_dom$DOM$offsetTop));
	});
var $debois$elm_dom$DOM$boundingClientRect = A4(
	$elm$json$Json$Decode$map3,
	F3(
		function (_v0, width, height) {
			var x = _v0.a;
			var y = _v0.b;
			return {cL: height, c_: x, dG: y, dQ: width};
		}),
	A2($debois$elm_dom$DOM$position, 0, 0),
	$debois$elm_dom$DOM$offsetWidth,
	$debois$elm_dom$DOM$offsetHeight);
var $elm$json$Json$Decode$lazy = function (thunk) {
	return A2(
		$elm$json$Json$Decode$andThen,
		thunk,
		$elm$json$Json$Decode$succeed(0));
};
var $debois$elm_dom$DOM$parentElement = function (decoder) {
	return A2($elm$json$Json$Decode$field, 'parentElement', decoder);
};
function $terezka$line_charts$Internal$Events$cyclic$position() {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$debois$elm_dom$DOM$boundingClientRect,
				$elm$json$Json$Decode$lazy(
				function (_v0) {
					return $debois$elm_dom$DOM$parentElement(
						$terezka$line_charts$Internal$Events$cyclic$position());
				})
			]));
}
var $terezka$line_charts$Internal$Events$position = $terezka$line_charts$Internal$Events$cyclic$position();
$terezka$line_charts$Internal$Events$cyclic$position = function () {
	return $terezka$line_charts$Internal$Events$position;
};
var $debois$elm_dom$DOM$target = function (decoder) {
	return A2($elm$json$Json$Decode$field, 'target', decoder);
};
var $terezka$line_charts$Internal$Events$toJsonDecoder = F4(
	function (options, data, system, _v0) {
		var decoder = _v0;
		var withOptions = function (msg) {
			return {X: msg, bS: options.bS, b7: options.b7};
		};
		var handle = F3(
			function (mouseX, mouseY, _v1) {
				var left = _v1.c_;
				var top = _v1.dG;
				var height = _v1.cL;
				var width = _v1.dQ;
				var y = mouseY - top;
				var x = mouseX - left;
				var widthPercent = width / system.aW.fZ.dQ;
				var newSize = {cL: height, dQ: width};
				var heightPercent = height / system.aW.fZ.cL;
				var newMargin = {ei: system.aW.fk.ei * heightPercent, c_: system.aW.fk.c_ * widthPercent, fP: system.aW.fk.fP * widthPercent, dG: system.aW.fk.dG * heightPercent};
				var newSystem = _Utils_update(
					system,
					{
						aW: {fk: newMargin, fZ: newSize}
					});
				return A3(
					decoder,
					data,
					newSystem,
					A2($terezka$line_charts$LineChart$Coordinate$Point, x, y));
			});
		return A2(
			$elm$json$Json$Decode$map,
			withOptions,
			A4(
				$elm$json$Json$Decode$map3,
				handle,
				A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
				A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float),
				$debois$elm_dom$DOM$target($terezka$line_charts$Internal$Events$position)));
	});
var $terezka$line_charts$Internal$Events$on = F3(
	function (event, toMsg, decoder) {
		return A2(
			$terezka$line_charts$Internal$Events$Event,
			false,
			F2(
				function (data, system) {
					var defaultOptions = A3($terezka$line_charts$Internal$Events$Options, false, false, false);
					return A2(
						$elm$svg$Svg$Events$custom,
						event,
						A4(
							$terezka$line_charts$Internal$Events$toJsonDecoder,
							defaultOptions,
							data,
							system,
							A2($terezka$line_charts$Internal$Events$map, toMsg, decoder)));
				}));
	});
var $terezka$line_charts$Internal$Events$onMouseMove = $terezka$line_charts$Internal$Events$on('mousemove');
var $terezka$line_charts$Internal$Events$hoverMany = function (msg) {
	return $terezka$line_charts$Internal$Events$custom(
		_List_fromArray(
			[
				A2($terezka$line_charts$Internal$Events$onMouseMove, msg, $terezka$line_charts$Internal$Events$getNearestX),
				$terezka$line_charts$Internal$Events$onMouseLeave(
				msg(_List_Nil))
			]));
};
var $terezka$line_charts$LineChart$Events$hoverMany = $terezka$line_charts$Internal$Events$hoverMany;
var $terezka$line_charts$Internal$Junk$Config = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Junk$find = F2(
	function (hovered, data) {
		find:
		while (true) {
			if (!hovered.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = hovered.a;
				var rest = hovered.b;
				if (A2(
					$elm$core$List$any,
					$elm$core$Basics$eq(first),
					data)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$hovered = rest,
						$temp$data = data;
					hovered = $temp$hovered;
					data = $temp$data;
					continue find;
				}
			}
		}
	});
var $terezka$line_charts$Internal$Junk$shouldFlip = F2(
	function (system, x) {
		return _Utils_cmp(x - system.gD.bK, system.gD.c3 - x) > 0;
	});
var $terezka$line_charts$Internal$Junk$standardStyles = _List_fromArray(
	[
		_Utils_Tuple2('padding', '5px'),
		_Utils_Tuple2('min-width', '100px'),
		_Utils_Tuple2('background', 'rgba(255,255,255,0.8)'),
		_Utils_Tuple2('border', '1px solid #d3d3d3'),
		_Utils_Tuple2('border-radius', '5px'),
		_Utils_Tuple2('pointer-events', 'none')
	]);
var $terezka$line_charts$Internal$Junk$hoverAt = F5(
	function (system, x, y, styles, view) {
		var yPercentage = (A2($terezka$line_charts$LineChart$Coordinate$toSvgY, system, y) * 100) / system.aW.fZ.cL;
		var space = A2($terezka$line_charts$Internal$Junk$shouldFlip, system, x) ? (-15) : 15;
		var xPercentage = ((A2($terezka$line_charts$LineChart$Coordinate$toSvgX, system, x) + space) * 100) / system.aW.fZ.dQ;
		var positionStyles = _List_fromArray(
			[
				_Utils_Tuple2(
				'left',
				$elm$core$String$fromFloat(xPercentage) + '%'),
				_Utils_Tuple2(
				'top',
				$elm$core$String$fromFloat(yPercentage) + '%'),
				_Utils_Tuple2('margin-right', '-400px'),
				_Utils_Tuple2('position', 'absolute'),
				A2($terezka$line_charts$Internal$Junk$shouldFlip, system, x) ? _Utils_Tuple2('transform', 'translateX(-100%)') : _Utils_Tuple2('transform', 'translateX(0)')
			]);
		var containerStyles = _Utils_ap(
			$terezka$line_charts$Internal$Junk$standardStyles,
			_Utils_ap(positionStyles, styles));
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var p = _v0.a;
					var v = _v0.b;
					return A2($elm$html$Html$Attributes$style, p, v);
				},
				containerStyles),
			view);
	});
var $terezka$line_charts$Internal$Junk$middle = F2(
	function (r, system) {
		var range = r(system);
		return range.bK + ((range.c3 - range.bK) / 2);
	});
var $terezka$line_charts$Internal$Junk$hover = F3(
	function (system, x, styles) {
		var y = A2(
			$terezka$line_charts$Internal$Junk$middle,
			function ($) {
				return $.gE;
			},
			system);
		var containerStyles = _Utils_ap(
			_List_fromArray(
				[
					A2($terezka$line_charts$Internal$Junk$shouldFlip, system, x) ? _Utils_Tuple2('transform', 'translate(-100%, -50%)') : _Utils_Tuple2('transform', 'translate(0, -50%)')
				]),
			styles);
		return A4($terezka$line_charts$Internal$Junk$hoverAt, system, x, y, containerStyles);
	});
var $avh4$elm_color$Color$toCssString = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	var roundTo = function (x) {
		return $elm$core$Basics$round(x * 1000) / 1000;
	};
	var pct = function (x) {
		return $elm$core$Basics$round(x * 10000) / 100;
	};
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'rgba(',
				$elm$core$String$fromFloat(
				pct(r)),
				'%,',
				$elm$core$String$fromFloat(
				pct(g)),
				'%,',
				$elm$core$String$fromFloat(
				pct(b)),
				'%,',
				$elm$core$String$fromFloat(
				roundTo(a)),
				')'
			]));
};
var $terezka$line_charts$Internal$Junk$viewHeader = $elm$html$Html$p(
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'margin-top', '3px'),
			A2($elm$html$Html$Attributes$style, 'margin-bottom', '5px'),
			A2($elm$html$Html$Attributes$style, 'padding', '3px'),
			A2($elm$html$Html$Attributes$style, 'border-bottom', '1px solid rgb(163, 163, 163)')
		]));
var $terezka$line_charts$Internal$Utils$viewMaybe = F2(
	function (a, view) {
		return A2(
			$elm$core$Maybe$withDefault,
			$elm$svg$Svg$text(''),
			A2($elm$core$Maybe$map, view, a));
	});
var $terezka$line_charts$Internal$Junk$viewRow = F3(
	function (color, label, value) {
		return A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin', '3px'),
					A2($elm$html$Html$Attributes$style, 'color', color)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(label + (': ' + value))
				]));
	});
var $terezka$line_charts$Internal$Junk$hoverManyHtml = F8(
	function (system, toX, toY, formatX, formatY, first, hovered, series) {
		var x = A2(
			$elm$core$Maybe$withDefault,
			A2(
				$terezka$line_charts$Internal$Junk$middle,
				function ($) {
					return $.gD;
				},
				system),
			toX(first));
		var viewValue = function (_v0) {
			var color = _v0.a;
			var label = _v0.b;
			var data = _v0.c;
			return A2(
				$terezka$line_charts$Internal$Utils$viewMaybe,
				A2($terezka$line_charts$Internal$Junk$find, hovered, data),
				function (hovered_) {
					return A3(
						$terezka$line_charts$Internal$Junk$viewRow,
						$avh4$elm_color$Color$toCssString(color),
						label,
						formatY(hovered_));
				});
		};
		return A4(
			$terezka$line_charts$Internal$Junk$hover,
			system,
			x,
			_List_Nil,
			A2(
				$elm$core$List$cons,
				$terezka$line_charts$Internal$Junk$viewHeader(
					_List_fromArray(
						[
							$elm$html$Html$text(
							formatX(first))
						])),
				A2($elm$core$List$map, viewValue, series)));
	});
var $terezka$line_charts$Internal$Junk$Layers = F3(
	function (below, above, html) {
		return {dU: above, ec: below, eZ: html};
	});
var $terezka$line_charts$Internal$Junk$none = F4(
	function (_v0, _v1, _v2, _v3) {
		return A3($terezka$line_charts$Internal$Junk$Layers, _List_Nil, _List_Nil, _List_Nil);
	});
var $terezka$line_charts$Internal$Utils$concat = F3(
	function (first, second, third) {
		return _Utils_ap(
			first,
			_Utils_ap(second, third));
	});
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $terezka$line_charts$Internal$Path$Line = function (a) {
	return {$: 1, a: a};
};
var $terezka$line_charts$Internal$Path$Move = function (a) {
	return {$: 0, a: a};
};
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $terezka$line_charts$Internal$Path$join = function (commands) {
	return A2($elm$core$String$join, ' ', commands);
};
var $terezka$line_charts$Internal$Path$bool = function (bool_) {
	return bool_ ? '1' : '0';
};
var $terezka$line_charts$Internal$Path$point = function (point_) {
	return $elm$core$String$fromFloat(point_.gD) + (' ' + $elm$core$String$fromFloat(point_.gE));
};
var $terezka$line_charts$Internal$Path$points = function (points_) {
	return A2(
		$elm$core$String$join,
		',',
		A2($elm$core$List$map, $terezka$line_charts$Internal$Path$point, points_));
};
var $terezka$line_charts$Internal$Path$toString = function (command) {
	switch (command.$) {
		case 9:
			return 'Z';
		case 0:
			var p = command.a;
			return 'M' + $terezka$line_charts$Internal$Path$point(p);
		case 1:
			var p = command.a;
			return 'L' + $terezka$line_charts$Internal$Path$point(p);
		case 2:
			var x = command.a;
			return 'H' + $elm$core$String$fromFloat(x);
		case 3:
			var y = command.a;
			return 'V' + $elm$core$String$fromFloat(y);
		case 4:
			var c1 = command.a;
			var c2 = command.b;
			var p = command.c;
			return 'C' + $terezka$line_charts$Internal$Path$points(
				_List_fromArray(
					[c1, c2, p]));
		case 5:
			var c1 = command.a;
			var p = command.b;
			return 'Q' + $terezka$line_charts$Internal$Path$points(
				_List_fromArray(
					[c1, p]));
		case 6:
			var c1 = command.a;
			var p = command.b;
			return 'Q' + $terezka$line_charts$Internal$Path$points(
				_List_fromArray(
					[c1, p]));
		case 7:
			var p = command.a;
			return 'T' + $terezka$line_charts$Internal$Path$point(p);
		default:
			var rx = command.a;
			var ry = command.b;
			var xAxisRotation = command.c;
			var largeArcFlag = command.d;
			var sweepFlag = command.e;
			var p = command.f;
			return 'A' + $terezka$line_charts$Internal$Path$join(
				_List_fromArray(
					[
						$elm$core$String$fromFloat(rx),
						$elm$core$String$fromFloat(ry),
						$elm$core$String$fromInt(xAxisRotation),
						$terezka$line_charts$Internal$Path$bool(largeArcFlag),
						$terezka$line_charts$Internal$Path$bool(sweepFlag),
						$terezka$line_charts$Internal$Path$point(p)
					]));
	}
};
var $terezka$line_charts$Internal$Path$Arc = F6(
	function (a, b, c, d, e, f) {
		return {$: 8, a: a, b: b, c: c, d: d, e: e, f: f};
	});
var $terezka$line_charts$Internal$Path$Close = {$: 9};
var $terezka$line_charts$Internal$Path$CubicBeziers = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $terezka$line_charts$Internal$Path$CubicBeziersShort = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $terezka$line_charts$Internal$Path$Horizontal = function (a) {
	return {$: 2, a: a};
};
var $terezka$line_charts$Internal$Path$QuadraticBeziers = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $terezka$line_charts$Internal$Path$QuadraticBeziersShort = function (a) {
	return {$: 7, a: a};
};
var $terezka$line_charts$Internal$Path$Vertical = function (a) {
	return {$: 3, a: a};
};
var $terezka$line_charts$LineChart$Coordinate$toSvg = F2(
	function (system, point) {
		return {
			gD: A2($terezka$line_charts$LineChart$Coordinate$toSvgX, system, point.gD),
			gE: A2($terezka$line_charts$LineChart$Coordinate$toSvgY, system, point.gE)
		};
	});
var $terezka$line_charts$Internal$Path$translate = F2(
	function (system, command) {
		switch (command.$) {
			case 0:
				var p = command.a;
				return $terezka$line_charts$Internal$Path$Move(
					A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, p));
			case 1:
				var p = command.a;
				return $terezka$line_charts$Internal$Path$Line(
					A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, p));
			case 2:
				var x = command.a;
				return $terezka$line_charts$Internal$Path$Horizontal(
					A2($terezka$line_charts$LineChart$Coordinate$toSvgX, system, x));
			case 3:
				var y = command.a;
				return $terezka$line_charts$Internal$Path$Vertical(
					A2($terezka$line_charts$LineChart$Coordinate$toSvgY, system, y));
			case 4:
				var c1 = command.a;
				var c2 = command.b;
				var p = command.c;
				return A3(
					$terezka$line_charts$Internal$Path$CubicBeziers,
					A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, c1),
					A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, c2),
					A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, p));
			case 5:
				var c1 = command.a;
				var p = command.b;
				return A2(
					$terezka$line_charts$Internal$Path$CubicBeziersShort,
					A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, c1),
					A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, p));
			case 6:
				var c1 = command.a;
				var p = command.b;
				return A2(
					$terezka$line_charts$Internal$Path$QuadraticBeziers,
					A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, c1),
					A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, p));
			case 7:
				var p = command.a;
				return $terezka$line_charts$Internal$Path$QuadraticBeziersShort(
					A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, p));
			case 8:
				var rx = command.a;
				var ry = command.b;
				var xAxisRotation = command.c;
				var largeArcFlag = command.d;
				var sweepFlag = command.e;
				var p = command.f;
				return A6(
					$terezka$line_charts$Internal$Path$Arc,
					rx,
					ry,
					xAxisRotation,
					largeArcFlag,
					sweepFlag,
					A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, p));
			default:
				return $terezka$line_charts$Internal$Path$Close;
		}
	});
var $terezka$line_charts$Internal$Path$description = F2(
	function (system, commands) {
		return $terezka$line_charts$Internal$Path$join(
			A2(
				$elm$core$List$map,
				A2(
					$elm$core$Basics$composeR,
					$terezka$line_charts$Internal$Path$translate(system),
					$terezka$line_charts$Internal$Path$toString),
				commands));
	});
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $terezka$line_charts$Internal$Path$viewPath = function (attributes) {
	return A2($elm$svg$Svg$path, attributes, _List_Nil);
};
var $terezka$line_charts$Internal$Path$view = F3(
	function (system, attributes, commands) {
		return $terezka$line_charts$Internal$Path$viewPath(
			_Utils_ap(
				attributes,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d(
						A2($terezka$line_charts$Internal$Path$description, system, commands))
					])));
	});
var $terezka$line_charts$Internal$Svg$vertical = F5(
	function (system, userAttributes, x, y1, y2) {
		var attributes = A3(
			$terezka$line_charts$Internal$Utils$concat,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke(
					$avh4$elm_color$Color$toCssString($terezka$line_charts$LineChart$Colors$gray)),
					$elm$svg$Svg$Attributes$style('pointer-events: none;')
				]),
			userAttributes,
			_List_Nil);
		return A3(
			$terezka$line_charts$Internal$Path$view,
			system,
			attributes,
			_List_fromArray(
				[
					$terezka$line_charts$Internal$Path$Move(
					{gD: x, gE: y1}),
					$terezka$line_charts$Internal$Path$Line(
					{gD: x, gE: y1}),
					$terezka$line_charts$Internal$Path$Line(
					{gD: x, gE: y2})
				]));
	});
var $terezka$line_charts$Internal$Svg$verticalGrid = F3(
	function (system, userAttributes, x) {
		var attributes = A3(
			$terezka$line_charts$Internal$Utils$concat,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke(
					$avh4$elm_color$Color$toCssString($terezka$line_charts$LineChart$Colors$gray)),
					$elm$svg$Svg$Attributes$style('pointer-events: none;')
				]),
			userAttributes,
			_List_Nil);
		return A5($terezka$line_charts$Internal$Svg$vertical, system, attributes, x, system.gE.bK, system.gE.c3);
	});
var $terezka$line_charts$Internal$Junk$hoverMany = F3(
	function (hovered, formatX, formatY) {
		if (!hovered.b) {
			return $terezka$line_charts$Internal$Junk$none;
		} else {
			var first = hovered.a;
			var rest = hovered.b;
			return F4(
				function (series, toX, toY, system) {
					var xValue = A2(
						$elm$core$Maybe$withDefault,
						0,
						toX(first));
					return {
						dU: _List_Nil,
						ec: _List_fromArray(
							[
								A3($terezka$line_charts$Internal$Svg$verticalGrid, system, _List_Nil, xValue)
							]),
						eZ: _List_fromArray(
							[
								A8($terezka$line_charts$Internal$Junk$hoverManyHtml, system, toX, toY, formatX, formatY, first, hovered, series)
							])
					};
				});
		}
	});
var $terezka$line_charts$LineChart$Junk$hoverMany = $terezka$line_charts$Internal$Junk$hoverMany;
var $terezka$line_charts$Internal$Interpolation$Monotone = 1;
var $terezka$line_charts$LineChart$Interpolation$monotone = 1;
var $terezka$line_charts$Internal$Area$Stacked = function (a) {
	return {$: 2, a: a};
};
var $terezka$line_charts$Internal$Area$stacked = $terezka$line_charts$Internal$Area$Stacked;
var $terezka$line_charts$LineChart$Area$stacked = $terezka$line_charts$Internal$Area$stacked;
var $terezka$line_charts$LineChart$Axis$Tick$Interval = F2(
	function (unit, multiple) {
		return {fq: multiple, cb: unit};
	});
var $terezka$line_charts$LineChart$Axis$Tick$Day = 4;
var $terezka$line_charts$LineChart$Axis$Tick$Hour = 3;
var $terezka$line_charts$LineChart$Axis$Tick$Millisecond = 0;
var $terezka$line_charts$LineChart$Axis$Tick$Minute = 2;
var $terezka$line_charts$LineChart$Axis$Tick$Month = 5;
var $terezka$line_charts$LineChart$Axis$Tick$Second = 1;
var $terezka$line_charts$LineChart$Axis$Tick$Year = 6;
var $terezka$line_charts$Internal$Axis$Values$Time$all = _List_fromArray(
	[0, 1, 2, 3, 4, 5, 6]);
var $justinmimbs$time_extra$Time$Extra$Day = 11;
var $justinmimbs$date$Date$Days = 3;
var $justinmimbs$time_extra$Time$Extra$Millisecond = 15;
var $justinmimbs$time_extra$Time$Extra$Month = 2;
var $justinmimbs$date$Date$Months = 1;
var $justinmimbs$date$Date$RD = $elm$core$Basics$identity;
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m) {
			case 0:
				return 0;
			case 1:
				return 31;
			case 2:
				return 59 + leapDays;
			case 3:
				return 90 + leapDays;
			case 4:
				return 120 + leapDays;
			case 5:
				return 151 + leapDays;
			case 6:
				return 181 + leapDays;
			case 7:
				return 212 + leapDays;
			case 8:
				return 243 + leapDays;
			case 9:
				return 273 + leapDays;
			case 10:
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m) {
			case 0:
				return 31;
			case 1:
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 7;
		case 7:
			return 8;
		case 8:
			return 9;
		case 9:
			return 10;
		case 10:
			return 11;
		default:
			return 12;
	}
};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		case 7:
			return 6;
		case 8:
			return 7;
		case 9:
			return 8;
		case 10:
			return 9;
		case 11:
			return 10;
		default:
			return 11;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {eA: d, fp: m, gF: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0;
	var y = $justinmimbs$date$Date$year(rd);
	return {
		bR: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		gF: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0;
	var date = $justinmimbs$date$Date$toOrdinalDate(rd);
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.gF, 0, date.bR);
};
var $justinmimbs$date$Date$add = F3(
	function (unit, n, _v0) {
		var rd = _v0;
		switch (unit) {
			case 0:
				return A3($justinmimbs$date$Date$add, 1, 12 * n, rd);
			case 1:
				var date = $justinmimbs$date$Date$toCalendarDate(rd);
				var wholeMonths = ((12 * (date.gF - 1)) + ($justinmimbs$date$Date$monthToNumber(date.fp) - 1)) + n;
				var m = $justinmimbs$date$Date$numberToMonth(
					A2($elm$core$Basics$modBy, 12, wholeMonths) + 1);
				var y = A2($justinmimbs$date$Date$floorDiv, wholeMonths, 12) + 1;
				return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A2(
					$elm$core$Basics$min,
					date.eA,
					A2($justinmimbs$date$Date$daysInMonth, y, m));
			case 2:
				return rd + (7 * n);
			default:
				return rd + n;
		}
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
			$elm$core$Basics$clamp,
			1,
			A2($justinmimbs$date$Date$daysInMonth, y, m),
			d);
	});
var $justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			$justinmimbs$date$Date$fromCalendarDate,
			A2($elm$time$Time$toYear, zone, posix),
			A2($elm$time$Time$toMonth, zone, posix),
			A2($elm$time$Time$toDay, zone, posix));
	});
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0;
	return rd;
};
var $justinmimbs$time_extra$Time$Extra$dateToMillis = function (date) {
	var daysSinceEpoch = $justinmimbs$date$Date$toRataDie(date) - 719163;
	return daysSinceEpoch * 86400000;
};
var $justinmimbs$time_extra$Time$Extra$timeFromClock = F4(
	function (hour, minute, second, millisecond) {
		return (((hour * 3600000) + (minute * 60000)) + (second * 1000)) + millisecond;
	});
var $justinmimbs$time_extra$Time$Extra$timeFromPosix = F2(
	function (zone, posix) {
		return A4(
			$justinmimbs$time_extra$Time$Extra$timeFromClock,
			A2($elm$time$Time$toHour, zone, posix),
			A2($elm$time$Time$toMinute, zone, posix),
			A2($elm$time$Time$toSecond, zone, posix),
			A2($elm$time$Time$toMillis, zone, posix));
	});
var $justinmimbs$time_extra$Time$Extra$toOffset = F2(
	function (zone, posix) {
		var millis = $elm$time$Time$posixToMillis(posix);
		var localMillis = $justinmimbs$time_extra$Time$Extra$dateToMillis(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix);
		return ((localMillis - millis) / 60000) | 0;
	});
var $justinmimbs$time_extra$Time$Extra$posixFromDateTime = F3(
	function (zone, date, time) {
		var millis = $justinmimbs$time_extra$Time$Extra$dateToMillis(date) + time;
		var offset0 = A2(
			$justinmimbs$time_extra$Time$Extra$toOffset,
			zone,
			$elm$time$Time$millisToPosix(millis));
		var posix1 = $elm$time$Time$millisToPosix(millis - (offset0 * 60000));
		var offset1 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix1);
		if (_Utils_eq(offset0, offset1)) {
			return posix1;
		} else {
			var posix2 = $elm$time$Time$millisToPosix(millis - (offset1 * 60000));
			var offset2 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix2);
			return _Utils_eq(offset1, offset2) ? posix2 : posix1;
		}
	});
var $justinmimbs$time_extra$Time$Extra$add = F4(
	function (interval, n, zone, posix) {
		add:
		while (true) {
			switch (interval) {
				case 15:
					return $elm$time$Time$millisToPosix(
						$elm$time$Time$posixToMillis(posix) + n);
				case 14:
					var $temp$interval = 15,
						$temp$n = n * 1000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 13:
					var $temp$interval = 15,
						$temp$n = n * 60000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 12:
					var $temp$interval = 15,
						$temp$n = n * 3600000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 11:
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							3,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 2:
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							1,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 0:
					var $temp$interval = 2,
						$temp$n = n * 12,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 1:
					var $temp$interval = 2,
						$temp$n = n * 3,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 3:
					var $temp$interval = 11,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				default:
					var weekday = interval;
					var $temp$interval = 11,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
			}
		}
	});
var $justinmimbs$date$Date$Day = 11;
var $justinmimbs$date$Date$Friday = 8;
var $justinmimbs$date$Date$Monday = 4;
var $justinmimbs$date$Date$Month = 2;
var $justinmimbs$date$Date$Quarter = 1;
var $justinmimbs$date$Date$Saturday = 9;
var $justinmimbs$date$Date$Sunday = 10;
var $justinmimbs$date$Date$Thursday = 7;
var $justinmimbs$date$Date$Tuesday = 5;
var $justinmimbs$date$Date$Wednesday = 6;
var $justinmimbs$date$Date$Week = 3;
var $justinmimbs$date$Date$Year = 0;
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$weekdayToNumber = function (wd) {
	switch (wd) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		default:
			return 7;
	}
};
var $justinmimbs$date$Date$daysSincePreviousWeekday = F2(
	function (wd, date) {
		return A2(
			$elm$core$Basics$modBy,
			7,
			($justinmimbs$date$Date$weekdayNumber(date) + 7) - $justinmimbs$date$Date$weekdayToNumber(wd));
	});
var $justinmimbs$date$Date$firstOfMonth = F2(
	function (y, m) {
		return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + 1;
	});
var $justinmimbs$date$Date$firstOfYear = function (y) {
	return $justinmimbs$date$Date$daysBeforeYear(y) + 1;
};
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.fp;
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $justinmimbs$date$Date$quarterToMonth = function (q) {
	return $justinmimbs$date$Date$numberToMonth((q * 3) - 2);
};
var $justinmimbs$date$Date$floor = F2(
	function (interval, date) {
		var rd = date;
		switch (interval) {
			case 0:
				return $justinmimbs$date$Date$firstOfYear(
					$justinmimbs$date$Date$year(date));
			case 1:
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$quarterToMonth(
						$justinmimbs$date$Date$quarter(date)));
			case 2:
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$month(date));
			case 3:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 0, date);
			case 4:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 0, date);
			case 5:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 1, date);
			case 6:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 2, date);
			case 7:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 3, date);
			case 8:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 4, date);
			case 9:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 5, date);
			case 10:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 6, date);
			default:
				return date;
		}
	});
var $justinmimbs$time_extra$Time$Extra$floorDate = F3(
	function (dateInterval, zone, posix) {
		return A3(
			$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
			zone,
			A2(
				$justinmimbs$date$Date$floor,
				dateInterval,
				A2($justinmimbs$date$Date$fromPosix, zone, posix)),
			0);
	});
var $justinmimbs$time_extra$Time$Extra$floor = F3(
	function (interval, zone, posix) {
		switch (interval) {
			case 15:
				return posix;
			case 14:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						A2($elm$time$Time$toSecond, zone, posix),
						0));
			case 13:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						0,
						0));
			case 12:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						0,
						0,
						0));
			case 11:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 11, zone, posix);
			case 2:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 2, zone, posix);
			case 0:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 0, zone, posix);
			case 1:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 1, zone, posix);
			case 3:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 3, zone, posix);
			case 4:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 4, zone, posix);
			case 5:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 5, zone, posix);
			case 6:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 6, zone, posix);
			case 7:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 7, zone, posix);
			case 8:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 8, zone, posix);
			case 9:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 9, zone, posix);
			default:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 10, zone, posix);
		}
	});
var $justinmimbs$time_extra$Time$Extra$ceiling = F3(
	function (interval, zone, posix) {
		var floored = A3($justinmimbs$time_extra$Time$Extra$floor, interval, zone, posix);
		return _Utils_eq(floored, posix) ? posix : A4($justinmimbs$time_extra$Time$Extra$add, interval, 1, zone, floored);
	});
var $justinmimbs$time_extra$Time$Extra$Hour = 12;
var $justinmimbs$time_extra$Time$Extra$Minute = 13;
var $justinmimbs$time_extra$Time$Extra$Second = 14;
var $justinmimbs$time_extra$Time$Extra$Year = 0;
var $terezka$line_charts$Internal$Axis$Values$Time$toExtraUnit = function (unit) {
	switch (unit) {
		case 0:
			return 15;
		case 1:
			return 14;
		case 2:
			return 13;
		case 3:
			return 12;
		case 4:
			return 11;
		case 5:
			return 2;
		default:
			return 0;
	}
};
var $terezka$line_charts$Internal$Axis$Values$Time$beginAt = F4(
	function (zone, min, unit, multiple) {
		return A3(
			$justinmimbs$time_extra$Time$Extra$ceiling,
			$terezka$line_charts$Internal$Axis$Values$Time$toExtraUnit(unit),
			zone,
			A4(
				$justinmimbs$time_extra$Time$Extra$add,
				$terezka$line_charts$Internal$Axis$Values$Time$toExtraUnit(unit),
				multiple,
				zone,
				min));
	});
var $terezka$line_charts$Internal$Axis$Values$Time$multiples = function (unit) {
	switch (unit) {
		case 0:
			return _List_fromArray(
				[1, 2, 5, 10, 20, 25, 50, 100, 200, 500]);
		case 1:
			return _List_fromArray(
				[1, 2, 5, 10, 15, 30]);
		case 2:
			return _List_fromArray(
				[1, 2, 5, 10, 15, 30]);
		case 3:
			return _List_fromArray(
				[1, 2, 3, 4, 6, 8, 12]);
		case 4:
			return _List_fromArray(
				[1, 2]);
		case 5:
			return _List_fromArray(
				[1, 2, 3, 4, 6]);
		default:
			return _List_fromArray(
				[1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 10000]);
	}
};
var $terezka$line_charts$Internal$Axis$Values$Time$toMs = function (unit) {
	switch (unit) {
		case 0:
			return 1;
		case 1:
			return 1000;
		case 2:
			return 60000;
		case 3:
			return 3600000;
		case 4:
			return 24 * 3600000;
		case 5:
			return (28 * 24) * 3600000;
		default:
			return (364 * 24) * 3600000;
	}
};
var $terezka$line_charts$Internal$Axis$Values$Time$findBestMultiple = F2(
	function (interval, unit) {
		var middleOfNext = F2(
			function (m1, m2) {
				return ((m1 * $terezka$line_charts$Internal$Axis$Values$Time$toMs(unit)) + (m2 * $terezka$line_charts$Internal$Axis$Values$Time$toMs(unit))) / 2;
			});
		var findBest_ = function (multiples_) {
			findBest_:
			while (true) {
				if (multiples_.b) {
					if (multiples_.b.b) {
						var m1 = multiples_.a;
						var _v1 = multiples_.b;
						var m2 = _v1.a;
						var rest = _v1.b;
						if (_Utils_cmp(
							interval,
							A2(middleOfNext, m1, m2)) < 1) {
							return m1;
						} else {
							var $temp$multiples_ = A2($elm$core$List$cons, m2, rest);
							multiples_ = $temp$multiples_;
							continue findBest_;
						}
					} else {
						var m = multiples_.a;
						return m;
					}
				} else {
					return 1;
				}
			}
		};
		return findBest_(
			$terezka$line_charts$Internal$Axis$Values$Time$multiples(unit));
	});
var $terezka$line_charts$Internal$Axis$Values$Time$highestMultiple = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$reverse,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$List$head,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Maybe$withDefault(0),
			$elm$core$Basics$toFloat)));
var $terezka$line_charts$Internal$Axis$Values$Time$findBestUnit = F2(
	function (interval, units_) {
		var middleOfNext = F2(
			function (u1, u2) {
				return (($terezka$line_charts$Internal$Axis$Values$Time$toMs(u1) * $terezka$line_charts$Internal$Axis$Values$Time$highestMultiple(
					$terezka$line_charts$Internal$Axis$Values$Time$multiples(u1))) + $terezka$line_charts$Internal$Axis$Values$Time$toMs(u2)) / 2;
			});
		var findBest_ = F2(
			function (units__, u0) {
				findBest_:
				while (true) {
					if (units__.b) {
						if (units__.b.b) {
							var u1 = units__.a;
							var _v1 = units__.b;
							var u2 = _v1.a;
							var rest = _v1.b;
							if (_Utils_cmp(
								interval,
								A2(middleOfNext, u1, u2)) < 1) {
								return u1;
							} else {
								var $temp$units__ = A2($elm$core$List$cons, u2, rest),
									$temp$u0 = u1;
								units__ = $temp$units__;
								u0 = $temp$u0;
								continue findBest_;
							}
						} else {
							var u = units__.a;
							return u;
						}
					} else {
						return 6;
					}
				}
			});
		return A2(findBest_, units_, 6);
	});
var $terezka$line_charts$Internal$Axis$Values$Time$floatToPosix = function (ms) {
	return $elm$time$Time$millisToPosix(
		$elm$core$Basics$round(ms));
};
var $justinmimbs$time_extra$Time$Extra$Week = 3;
var $justinmimbs$time_extra$Time$Extra$toFractionalDay = F2(
	function (zone, posix) {
		return A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix) / 86400000;
	});
var $justinmimbs$time_extra$Time$Extra$toMonths = F2(
	function (zone, posix) {
		var wholeMonths = (12 * (A2($elm$time$Time$toYear, zone, posix) - 1)) + ($justinmimbs$date$Date$monthToNumber(
			A2($elm$time$Time$toMonth, zone, posix)) - 1);
		var fractionalMonth = (A2($elm$time$Time$toDay, zone, posix) + A2($justinmimbs$time_extra$Time$Extra$toFractionalDay, zone, posix)) / 100;
		return wholeMonths + fractionalMonth;
	});
var $justinmimbs$time_extra$Time$Extra$toRataDieMoment = F2(
	function (zone, posix) {
		return $justinmimbs$date$Date$toRataDie(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$toFractionalDay, zone, posix);
	});
var $elm$core$Basics$truncate = _Basics_truncate;
var $justinmimbs$time_extra$Time$Extra$diff = F4(
	function (interval, zone, posix1, posix2) {
		diff:
		while (true) {
			switch (interval) {
				case 15:
					return $elm$time$Time$posixToMillis(posix2) - $elm$time$Time$posixToMillis(posix1);
				case 14:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 15, zone, posix1, posix2) / 1000) | 0;
				case 13:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 15, zone, posix1, posix2) / 60000) | 0;
				case 12:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 15, zone, posix1, posix2) / 3600000) | 0;
				case 11:
					return (A2($justinmimbs$time_extra$Time$Extra$toRataDieMoment, zone, posix2) - A2($justinmimbs$time_extra$Time$Extra$toRataDieMoment, zone, posix1)) | 0;
				case 2:
					return (A2($justinmimbs$time_extra$Time$Extra$toMonths, zone, posix2) - A2($justinmimbs$time_extra$Time$Extra$toMonths, zone, posix1)) | 0;
				case 0:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 2, zone, posix1, posix2) / 12) | 0;
				case 1:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 2, zone, posix1, posix2) / 3) | 0;
				case 3:
					return (A4($justinmimbs$time_extra$Time$Extra$diff, 11, zone, posix1, posix2) / 7) | 0;
				default:
					var weekday = interval;
					var $temp$interval = 3,
						$temp$zone = zone,
						$temp$posix1 = A3($justinmimbs$time_extra$Time$Extra$floor, weekday, zone, posix1),
						$temp$posix2 = A3($justinmimbs$time_extra$Time$Extra$floor, weekday, zone, posix2);
					interval = $temp$interval;
					zone = $temp$zone;
					posix1 = $temp$posix1;
					posix2 = $temp$posix2;
					continue diff;
			}
		}
	});
var $terezka$line_charts$Internal$Axis$Values$Time$getUnitChange = F4(
	function (interval, zone, value, next_) {
		var equalBy = function (unit) {
			return !A4(
				$justinmimbs$time_extra$Time$Extra$diff,
				$terezka$line_charts$Internal$Axis$Values$Time$toExtraUnit(unit),
				zone,
				A3(
					$justinmimbs$time_extra$Time$Extra$floor,
					$terezka$line_charts$Internal$Axis$Values$Time$toExtraUnit(unit),
					zone,
					value),
				A3(
					$justinmimbs$time_extra$Time$Extra$floor,
					$terezka$line_charts$Internal$Axis$Values$Time$toExtraUnit(unit),
					zone,
					next_));
		};
		var unitChange_ = function (units) {
			unitChange_:
			while (true) {
				if (units.b) {
					var unit = units.a;
					var rest = units.b;
					if (_Utils_cmp(
						$terezka$line_charts$Internal$Axis$Values$Time$toMs(unit),
						$terezka$line_charts$Internal$Axis$Values$Time$toMs(interval)) < 1) {
						var $temp$units = rest;
						units = $temp$units;
						continue unitChange_;
					} else {
						if (!equalBy(unit)) {
							return $elm$core$Maybe$Just(unit);
						} else {
							return $elm$core$Maybe$Nothing;
						}
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		};
		return unitChange_($terezka$line_charts$Internal$Axis$Values$Time$all);
	});
var $terezka$line_charts$Internal$Axis$Values$Time$next = F4(
	function (zone, timestamp, unit, multiple) {
		return A4(
			$justinmimbs$time_extra$Time$Extra$add,
			$terezka$line_charts$Internal$Axis$Values$Time$toExtraUnit(unit),
			multiple,
			zone,
			timestamp);
	});
var $terezka$line_charts$Internal$Axis$Values$Time$posixsToFloat = function (posix) {
	return $elm$time$Time$posixToMillis(posix);
};
var $terezka$line_charts$Internal$Axis$Values$Time$values = F3(
	function (zone, amountRough, range) {
		var intervalRough = (range.c3 - range.bK) / amountRough;
		var unit = A2($terezka$line_charts$Internal$Axis$Values$Time$findBestUnit, intervalRough, $terezka$line_charts$Internal$Axis$Values$Time$all);
		var multiple = A2($terezka$line_charts$Internal$Axis$Values$Time$findBestMultiple, intervalRough, unit);
		var toTime = F3(
			function (unitChange, value, isFirst) {
				return {
					en: unitChange,
					fa: A2($terezka$line_charts$LineChart$Axis$Tick$Interval, unit, multiple),
					fc: isFirst,
					go: value,
					gG: zone
				};
			});
		var toTimes = F3(
			function (values_, unitChange, acc) {
				toTimes:
				while (true) {
					if (values_.b) {
						if (values_.b.b) {
							var value = values_.a;
							var _v1 = values_.b;
							var next_ = _v1.a;
							var rest = _v1.b;
							var newUnitChange = A4($terezka$line_charts$Internal$Axis$Values$Time$getUnitChange, unit, zone, value, next_);
							var isFirst = $elm$core$List$isEmpty(acc);
							var newAcc = A2(
								$elm$core$List$cons,
								A3(toTime, unitChange, value, isFirst),
								acc);
							var $temp$values_ = A2($elm$core$List$cons, next_, rest),
								$temp$unitChange = newUnitChange,
								$temp$acc = newAcc;
							values_ = $temp$values_;
							unitChange = $temp$unitChange;
							acc = $temp$acc;
							continue toTimes;
						} else {
							var value = values_.a;
							return A2(
								$elm$core$List$cons,
								A3(
									toTime,
									unitChange,
									value,
									$elm$core$List$isEmpty(acc)),
								acc);
						}
					} else {
						return acc;
					}
				}
			});
		var interval = $terezka$line_charts$Internal$Axis$Values$Time$toMs(unit) * multiple;
		var beginning = A4(
			$terezka$line_charts$Internal$Axis$Values$Time$beginAt,
			zone,
			$terezka$line_charts$Internal$Axis$Values$Time$floatToPosix(range.bK),
			unit,
			multiple);
		var toPositions = F2(
			function (acc, i) {
				toPositions:
				while (true) {
					var next_ = A4($terezka$line_charts$Internal$Axis$Values$Time$next, zone, beginning, unit, i * multiple);
					if (_Utils_cmp(
						$terezka$line_charts$Internal$Axis$Values$Time$posixsToFloat(next_),
						range.c3) > 0) {
						return acc;
					} else {
						var $temp$acc = _Utils_ap(
							acc,
							_List_fromArray(
								[next_])),
							$temp$i = i + 1;
						acc = $temp$acc;
						i = $temp$i;
						continue toPositions;
					}
				}
			});
		return A3(
			toTimes,
			A2(toPositions, _List_Nil, 0),
			$elm$core$Maybe$Nothing,
			_List_Nil);
	});
var $terezka$line_charts$Internal$Axis$Values$time = $terezka$line_charts$Internal$Axis$Values$Time$values;
var $terezka$line_charts$LineChart$Axis$Tick$custom = $terezka$line_charts$Internal$Axis$Tick$custom;
var $ryannhg$date_format$DateFormat$AmPmLowercase = {$: 23};
var $ryannhg$date_format$DateFormat$amPmLowercase = $ryannhg$date_format$DateFormat$AmPmLowercase;
var $ryannhg$date_format$DateFormat$DayOfWeekNameFull = {$: 14};
var $ryannhg$date_format$DateFormat$dayOfWeekNameFull = $ryannhg$date_format$DateFormat$DayOfWeekNameFull;
var $ryannhg$date_format$DateFormat$HourNumber = {$: 26};
var $ryannhg$date_format$DateFormat$hourNumber = $ryannhg$date_format$DateFormat$HourNumber;
var $ryannhg$date_format$DateFormat$MillisecondNumber = {$: 34};
var $ryannhg$date_format$DateFormat$millisecondNumber = $ryannhg$date_format$DateFormat$MillisecondNumber;
var $ryannhg$date_format$DateFormat$MinuteNumber = {$: 30};
var $ryannhg$date_format$DateFormat$minuteNumber = $ryannhg$date_format$DateFormat$MinuteNumber;
var $ryannhg$date_format$DateFormat$MonthNameAbbreviated = {$: 3};
var $ryannhg$date_format$DateFormat$monthNameAbbreviated = $ryannhg$date_format$DateFormat$MonthNameAbbreviated;
var $ryannhg$date_format$DateFormat$SecondNumber = {$: 32};
var $ryannhg$date_format$DateFormat$secondNumber = $ryannhg$date_format$DateFormat$SecondNumber;
var $terezka$line_charts$LineChart$Axis$Tick$formatBold = function (unit) {
	var tokens = function () {
		switch (unit) {
			case 0:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$millisecondNumber]);
			case 1:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$secondNumber]);
			case 2:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$minuteNumber]);
			case 3:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$hourNumber, $ryannhg$date_format$DateFormat$amPmLowercase]);
			case 4:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$dayOfWeekNameFull]);
			case 5:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$monthNameAbbreviated]);
			default:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$yearNumber]);
		}
	}();
	return $ryannhg$date_format$DateFormat$format(tokens);
};
var $ryannhg$date_format$DateFormat$MinuteFixed = {$: 31};
var $ryannhg$date_format$DateFormat$minuteFixed = $ryannhg$date_format$DateFormat$MinuteFixed;
var $terezka$line_charts$LineChart$Axis$Tick$formatNorm = function (unit) {
	var tokens = function () {
		switch (unit) {
			case 0:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$millisecondNumber]);
			case 1:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$secondNumber]);
			case 2:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$minuteFixed]);
			case 3:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$hourNumber, $ryannhg$date_format$DateFormat$amPmLowercase]);
			case 4:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$dayOfMonthSuffix]);
			case 5:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$monthNameAbbreviated]);
			default:
				return _List_fromArray(
					[$ryannhg$date_format$DateFormat$yearNumber]);
		}
	}();
	return $ryannhg$date_format$DateFormat$format(tokens);
};
var $terezka$line_charts$LineChart$Axis$Tick$nextUnit = function (unit) {
	switch (unit) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		default:
			return 6;
	}
};
var $terezka$line_charts$LineChart$Axis$Tick$format = function (_v0) {
	var zone = _v0.gG;
	var change = _v0.en;
	var interval = _v0.fa;
	var timestamp = _v0.go;
	var isFirst = _v0.fc;
	if (isFirst) {
		return A3(
			$terezka$line_charts$LineChart$Axis$Tick$formatBold,
			$terezka$line_charts$LineChart$Axis$Tick$nextUnit(interval.cb),
			zone,
			timestamp);
	} else {
		if (!change.$) {
			var change_ = change.a;
			return A3($terezka$line_charts$LineChart$Axis$Tick$formatBold, change_, zone, timestamp);
		} else {
			return A3($terezka$line_charts$LineChart$Axis$Tick$formatNorm, interval.cb, zone, timestamp);
		}
	}
};
var $avh4$elm_color$Color$gray = A4($avh4$elm_color$Color$RgbaSpace, 211 / 255, 215 / 255, 207 / 255, 1.0);
var $terezka$line_charts$LineChart$Axis$Tick$negative = 0;
var $terezka$line_charts$LineChart$Axis$Tick$time = function (time_) {
	return $terezka$line_charts$LineChart$Axis$Tick$custom(
		{
			ar: $avh4$elm_color$Color$gray,
			bl: $terezka$line_charts$LineChart$Axis$Tick$negative,
			eP: true,
			aZ: $elm$core$Maybe$Just(
				A2(
					$terezka$line_charts$Internal$Svg$label,
					'inherit',
					$terezka$line_charts$LineChart$Axis$Tick$format(time_))),
			bF: 5,
			a3: $elm$time$Time$posixToMillis(time_.go),
			dQ: 1
		});
};
var $terezka$line_charts$Internal$Axis$time = F4(
	function (zone, pixels_, title_, variable_) {
		return $terezka$line_charts$Internal$Axis$custom(
			{
				U: $terezka$line_charts$Internal$Axis$Line$rangeFrame($terezka$line_charts$LineChart$Colors$gray),
				ag: pixels_,
				ah: A2($terezka$line_charts$Internal$Axis$Range$padded, 20, 20),
				w: $terezka$line_charts$Internal$Axis$Ticks$custom(
					F2(
						function (data, range_) {
							var smallest = A2($terezka$line_charts$Internal$Coordinate$smallestRange, data, range_);
							var rangeSmall = smallest.c3 - smallest.bK;
							var rangeLong = range_.c3 - range_.bK;
							var diff = 1 - ((rangeLong - rangeSmall) / rangeLong);
							var amount = $elm$core$Basics$round((diff * pixels_) / 90);
							return A2(
								$elm$core$List$map,
								$terezka$line_charts$LineChart$Axis$Tick$time,
								A3($terezka$line_charts$Internal$Axis$Values$time, zone, amount, smallest));
						})),
				F: A3($terezka$line_charts$Internal$Axis$Title$atDataMax, 0, 0, title_),
				al: A2($elm$core$Basics$composeL, $elm$core$Maybe$Just, variable_)
			});
	});
var $terezka$line_charts$LineChart$Axis$time = $terezka$line_charts$Internal$Axis$time;
var $author$project$History$chartConfig = function (_v0) {
	var onHover = _v0.c9;
	var hinted = _v0.cO;
	return {
		d5: $terezka$line_charts$LineChart$Area$stacked(0.5),
		eu: $author$project$History$containerConfig,
		eD: $terezka$line_charts$LineChart$Dots$custom(
			A2($terezka$line_charts$LineChart$Dots$empty, 5, 1)),
		eG: $terezka$line_charts$LineChart$Events$hoverMany(onHover),
		eP: A2($terezka$line_charts$LineChart$Grid$dots, 1, $terezka$line_charts$LineChart$Colors$gray),
		e8: $terezka$line_charts$LineChart$Interpolation$monotone,
		e9: $terezka$line_charts$LineChart$Axis$Intersection$default,
		fg: A3($terezka$line_charts$LineChart$Junk$hoverMany, hinted, $author$project$History$formatX, $author$project$History$formatY),
		fh: $terezka$line_charts$LineChart$Legends$default,
		fi: $terezka$line_charts$LineChart$Line$default,
		gD: A4(
			$terezka$line_charts$LineChart$Axis$time,
			$elm$time$Time$utc,
			1270,
			'time',
			A2(
				$elm$core$Basics$composeL,
				A2($elm$core$Basics$composeL, $elm$core$Basics$toFloat, $elm$time$Time$posixToMillis),
				function ($) {
					return $.ca;
				})),
		gE: A3(
			$terezka$line_charts$LineChart$Axis$default,
			450,
			'housing',
			function ($) {
				return $.bP;
			})
	};
};
var $terezka$line_charts$Internal$Dots$Circle = 1;
var $terezka$line_charts$LineChart$Dots$circle = 1;
var $terezka$line_charts$LineChart$Colors$cyan = A3($avh4$elm_color$Color$rgb255, 0, 229, 255);
var $terezka$line_charts$Internal$Dots$Diamond = 4;
var $terezka$line_charts$LineChart$Dots$diamond = 4;
var $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Unstyled, $elm$core$Basics$always);
var $mdgriffith$elm_ui$Element$html = $mdgriffith$elm_ui$Internal$Model$unstyled;
var $terezka$line_charts$Internal$Line$Series = $elm$core$Basics$identity;
var $terezka$line_charts$Internal$Line$SeriesConfig = F5(
	function (color, shape, dashing, label, data) {
		return {ar: color, cy: dashing, ab: data, aZ: label, dv: shape};
	});
var $terezka$line_charts$Internal$Line$line = F4(
	function (color_, shape_, label_, data_) {
		return A5($terezka$line_charts$Internal$Line$SeriesConfig, color_, shape_, _List_Nil, label_, data_);
	});
var $terezka$line_charts$LineChart$line = $terezka$line_charts$Internal$Line$line;
var $terezka$line_charts$LineChart$Colors$pink = A3($avh4$elm_color$Color$rgb255, 245, 105, 215);
var $terezka$line_charts$Internal$Junk$addBelow = F2(
	function (below, layers) {
		return _Utils_update(
			layers,
			{
				ec: _Utils_ap(below, layers.ec)
			});
	});
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $terezka$line_charts$LineChart$chartAreaAttributes = function (system) {
	return _List_fromArray(
		[
			$elm$svg$Svg$Attributes$x(
			$elm$core$String$fromFloat(system.aW.fk.c_)),
			$elm$svg$Svg$Attributes$y(
			$elm$core$String$fromFloat(system.aW.fk.dG)),
			$elm$svg$Svg$Attributes$width(
			$elm$core$String$fromFloat(
				$terezka$line_charts$Internal$Coordinate$lengthX(system))),
			$elm$svg$Svg$Attributes$height(
			$elm$core$String$fromFloat(
				$terezka$line_charts$Internal$Coordinate$lengthY(system)))
		]);
};
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $terezka$line_charts$Internal$Events$toChartAttributes = F3(
	function (data, system, _v0) {
		var events = _v0;
		var order = function (_v1) {
			var outside = _v1.a;
			var event = _v1.b;
			return outside ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A2(event, data, system));
		};
		return A2($elm$core$List$filterMap, order, events);
	});
var $terezka$line_charts$LineChart$chartAreaPlatform = F3(
	function (config, data, system) {
		var attributes = $elm$core$List$concat(
			_List_fromArray(
				[
					_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill('transparent')
					]),
					$terezka$line_charts$LineChart$chartAreaAttributes(system),
					A3($terezka$line_charts$Internal$Events$toChartAttributes, data, system, config.eG)
				]));
		return A2($elm$svg$Svg$rect, attributes, _List_Nil);
	});
var $elm$svg$Svg$clipPath = $elm$svg$Svg$trustedNode('clipPath');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $terezka$line_charts$Internal$Utils$toChartAreaId = function (id) {
	return 'chart__chart-area--' + id;
};
var $terezka$line_charts$LineChart$clipPath = function (system) {
	return A2(
		$elm$svg$Svg$clipPath,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$id(
				$terezka$line_charts$Internal$Utils$toChartAreaId(system.e_))
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$rect,
				$terezka$line_charts$LineChart$chartAreaAttributes(system),
				_List_Nil)
			]));
};
var $terezka$line_charts$Internal$Line$color = F3(
	function (_v0, _v1, data_) {
		var config = _v0;
		var line_ = _v1;
		var _v2 = config(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.gz;
				},
				data_));
		var style_ = _v2;
		return style_.ar(line_.ar);
	});
var $terezka$line_charts$Internal$Container$properties = F2(
	function (f, _v0) {
		var properties_ = _v0;
		return f(properties_);
	});
var $terezka$line_charts$Internal$Container$sizeStyles = F3(
	function (_v0, width, height) {
		var properties_ = _v0;
		var _v1 = properties_.fZ;
		if (!_v1) {
			return _List_fromArray(
				[
					A2(
					$elm$html$Html$Attributes$style,
					'height',
					$elm$core$String$fromFloat(height) + 'px'),
					A2(
					$elm$html$Html$Attributes$style,
					'width',
					$elm$core$String$fromFloat(width) + 'px')
				]);
		} else {
			return _List_Nil;
		}
	});
var $terezka$line_charts$LineChart$container = F4(
	function (config, _v0, junkHtml, plot) {
		var frame = _v0.aW;
		var userAttributes = A2(
			$terezka$line_charts$Internal$Container$properties,
			function ($) {
				return $.d7;
			},
			config.eu);
		var sizeStyles = A3($terezka$line_charts$Internal$Container$sizeStyles, config.eu, frame.fZ.dQ, frame.fZ.cL);
		var styles = A2(
			$elm$core$List$cons,
			A2($elm$html$Html$Attributes$style, 'position', 'relative'),
			sizeStyles);
		return A2(
			$elm$html$Html$div,
			_Utils_ap(styles, userAttributes),
			A2($elm$core$List$cons, plot, junkHtml));
	});
var $terezka$line_charts$Internal$Line$data = function (_v0) {
	var config = _v0;
	return config.ab;
};
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $terezka$line_charts$Internal$Junk$getLayers = F5(
	function (series, toX, toY, system, _v0) {
		var toLayers = _v0;
		return A4(toLayers, series, toX, toY, system);
	});
var $terezka$line_charts$Internal$Line$label = function (_v0) {
	var config = _v0;
	return config.aZ;
};
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $terezka$line_charts$Internal$Events$toContainerAttributes = F3(
	function (data, system, _v0) {
		var events = _v0;
		var order = function (_v1) {
			var outside = _v1.a;
			var event = _v1.b;
			return outside ? $elm$core$Maybe$Just(
				A2(event, data, system)) : $elm$core$Maybe$Nothing;
		};
		return A2($elm$core$List$filterMap, order, events);
	});
var $terezka$line_charts$Internal$Data$Data = F3(
	function (user, point, isReal) {
		return {fd: isReal, fK: point, gz: user};
	});
var $terezka$line_charts$LineChart$setY = F2(
	function (datum, y) {
		return A3(
			$terezka$line_charts$Internal$Data$Data,
			datum.gz,
			A2($terezka$line_charts$Internal$Data$Point, datum.fK.gD, y),
			datum.fd);
	});
var $terezka$line_charts$LineChart$normalize = function (datasets) {
	if (datasets.b) {
		var highest = datasets.a;
		var belows = datasets.b;
		var toPercentage = F2(
			function (highest_, datum) {
				return A2($terezka$line_charts$LineChart$setY, datum, (100 * datum.fK.gE) / highest_.fK.gE);
			});
		return A2(
			$elm$core$List$map,
			A2($elm$core$List$map2, toPercentage, highest),
			A2($elm$core$List$cons, highest, belows));
	} else {
		return datasets;
	}
};
var $terezka$line_charts$Internal$Utils$withFirst = F2(
	function (stuff, process) {
		if (stuff.b) {
			var first = stuff.a;
			var rest = stuff.b;
			return $elm$core$Maybe$Just(
				A2(process, first, rest));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $terezka$line_charts$LineChart$addBelows = F2(
	function (alldata, dataBelowAll) {
		var add = F2(
			function (below, datum) {
				return A2($terezka$line_charts$LineChart$setY, below, below.fK.gE + datum.fK.gE);
			});
		var iterate = F4(
			function (datum0, dataTop, dataBelowTop, result) {
				iterate:
				while (true) {
					var _v0 = _Utils_Tuple2(dataTop, dataBelowTop);
					if (_v0.a.b) {
						if (_v0.b.b) {
							var _v1 = _v0.a;
							var datum1 = _v1.a;
							var data = _v1.b;
							var _v2 = _v0.b;
							var datumBelow = _v2.a;
							var dataBelow = _v2.b;
							if (_Utils_cmp(datum1.fK.gD, datumBelow.fK.gD) > 0) {
								if (datumBelow.fd) {
									var $temp$datum0 = datum0,
										$temp$dataTop = A2($elm$core$List$cons, datum1, data),
										$temp$dataBelowTop = dataBelow,
										$temp$result = A2(
										$elm$core$List$cons,
										A2(add, datumBelow, datum0),
										result);
									datum0 = $temp$datum0;
									dataTop = $temp$dataTop;
									dataBelowTop = $temp$dataBelowTop;
									result = $temp$result;
									continue iterate;
								} else {
									var breakdata = _Utils_update(
										datum0,
										{fd: false});
									var $temp$datum0 = datum0,
										$temp$dataTop = A2($elm$core$List$cons, datum1, data),
										$temp$dataBelowTop = dataBelow,
										$temp$result = A2(
										$elm$core$List$cons,
										A2(add, datumBelow, datum0),
										result);
									datum0 = $temp$datum0;
									dataTop = $temp$dataTop;
									dataBelowTop = $temp$dataBelowTop;
									result = $temp$result;
									continue iterate;
								}
							} else {
								var $temp$datum0 = datum1,
									$temp$dataTop = data,
									$temp$dataBelowTop = A2($elm$core$List$cons, datumBelow, dataBelow),
									$temp$result = result;
								datum0 = $temp$datum0;
								dataTop = $temp$dataTop;
								dataBelowTop = $temp$dataBelowTop;
								result = $temp$result;
								continue iterate;
							}
						} else {
							var _v4 = _v0.a;
							var datum1 = _v4.a;
							var data = _v4.b;
							return result;
						}
					} else {
						if (_v0.b.b) {
							var _v3 = _v0.b;
							var datumBelow = _v3.a;
							var dataBelow = _v3.b;
							if (_Utils_cmp(datum0.fK.gD, datumBelow.fK.gD) < 1) {
								var $temp$datum0 = datum0,
									$temp$dataTop = _List_Nil,
									$temp$dataBelowTop = dataBelow,
									$temp$result = A2(
									$elm$core$List$cons,
									A2(add, datumBelow, datum0),
									result);
								datum0 = $temp$datum0;
								dataTop = $temp$dataTop;
								dataBelowTop = $temp$dataBelowTop;
								result = $temp$result;
								continue iterate;
							} else {
								var $temp$datum0 = datum0,
									$temp$dataTop = _List_Nil,
									$temp$dataBelowTop = dataBelow,
									$temp$result = A2($elm$core$List$cons, datumBelow, result);
								datum0 = $temp$datum0;
								dataTop = $temp$dataTop;
								dataBelowTop = $temp$dataBelowTop;
								result = $temp$result;
								continue iterate;
							}
						} else {
							return result;
						}
					}
				}
			});
		return $elm$core$List$reverse(
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2(
					$terezka$line_charts$Internal$Utils$withFirst,
					alldata,
					F2(
						function (first, rest) {
							return A4(iterate, first, rest, dataBelowAll, _List_Nil);
						}))));
	});
var $terezka$line_charts$LineChart$stack = function (dataset) {
	var stackBelows = F2(
		function (dataset_, result) {
			if (dataset_.b) {
				var data = dataset_.a;
				var belows = dataset_.b;
				return A2(
					stackBelows,
					belows,
					A2(
						$elm$core$List$cons,
						A3($elm$core$List$foldl, $terezka$line_charts$LineChart$addBelows, data, belows),
						result));
			} else {
				return result;
			}
		});
	return $elm$core$List$reverse(
		A2(stackBelows, dataset, _List_Nil));
};
var $terezka$line_charts$Internal$Axis$variable = function (_v0) {
	var config = _v0;
	return config.al;
};
var $terezka$line_charts$LineChart$toDataPoints = F2(
	function (config, lines) {
		var y = $terezka$line_charts$Internal$Axis$variable(config.gE);
		var x = $terezka$line_charts$Internal$Axis$variable(config.gD);
		var addPoint = function (datum) {
			var _v1 = _Utils_Tuple2(
				x(datum),
				y(datum));
			if (!_v1.a.$) {
				if (!_v1.b.$) {
					var x_ = _v1.a.a;
					var y_ = _v1.b.a;
					return $elm$core$Maybe$Just(
						A3(
							$terezka$line_charts$Internal$Data$Data,
							datum,
							A2($terezka$line_charts$Internal$Data$Point, x_, y_),
							true));
				} else {
					var x_ = _v1.a.a;
					var _v2 = _v1.b;
					return $elm$core$Maybe$Just(
						A3(
							$terezka$line_charts$Internal$Data$Data,
							datum,
							A2($terezka$line_charts$Internal$Data$Point, x_, 0),
							false));
				}
			} else {
				if (!_v1.b.$) {
					var _v3 = _v1.a;
					var y_ = _v1.b.a;
					return $elm$core$Maybe$Nothing;
				} else {
					var _v4 = _v1.a;
					var _v5 = _v1.b;
					return $elm$core$Maybe$Nothing;
				}
			}
		};
		var data = A2(
			$elm$core$List$map,
			A2(
				$elm$core$Basics$composeR,
				$terezka$line_charts$Internal$Line$data,
				$elm$core$List$filterMap(addPoint)),
			lines);
		var _v0 = config.d5;
		switch (_v0.$) {
			case 0:
				return data;
			case 1:
				return data;
			case 2:
				return $terezka$line_charts$LineChart$stack(data);
			default:
				return $terezka$line_charts$LineChart$normalize(
					$terezka$line_charts$LineChart$stack(data));
		}
	});
var $terezka$line_charts$Internal$Coordinate$Frame = F2(
	function (margin, size) {
		return {fk: margin, fZ: size};
	});
var $terezka$line_charts$Internal$Coordinate$Size = F2(
	function (width, height) {
		return {cL: height, dQ: width};
	});
var $terezka$line_charts$LineChart$Coordinate$Range = F2(
	function (min, max) {
		return {c3: max, bK: min};
	});
var $terezka$line_charts$Internal$Axis$Range$applyX = F2(
	function (range, system) {
		switch (range.$) {
			case 0:
				var padMin = range.a;
				var padMax = range.b;
				var _v1 = system;
				var frame = _v1.aW;
				var _v2 = frame;
				var size = _v2.fZ;
				var system_ = _Utils_update(
					system,
					{
						aW: _Utils_update(
							frame,
							{
								fZ: _Utils_update(
									size,
									{
										dQ: A2($elm$core$Basics$max, 1, (size.dQ - padMin) - padMax)
									})
							})
					});
				var scale = $terezka$line_charts$LineChart$Coordinate$scaleDataX(system_);
				return A2(
					$terezka$line_charts$LineChart$Coordinate$Range,
					system.gD.bK - scale(padMin),
					system.gD.c3 + scale(padMax));
			case 1:
				var min = range.a;
				var max = range.b;
				return A2($terezka$line_charts$LineChart$Coordinate$Range, min, max);
			default:
				var toRange = range.a;
				return toRange(system.gD);
		}
	});
var $terezka$line_charts$Internal$Axis$Range$applyY = F2(
	function (range, system) {
		switch (range.$) {
			case 0:
				var padMin = range.a;
				var padMax = range.b;
				var _v1 = system;
				var frame = _v1.aW;
				var _v2 = frame;
				var size = _v2.fZ;
				var system_ = _Utils_update(
					system,
					{
						aW: _Utils_update(
							frame,
							{
								fZ: _Utils_update(
									size,
									{
										cL: A2($elm$core$Basics$max, 1, (size.cL - padMin) - padMax)
									})
							})
					});
				var scale = $terezka$line_charts$LineChart$Coordinate$scaleDataY(system_);
				return A2(
					$terezka$line_charts$LineChart$Coordinate$Range,
					system.gE.bK - scale(padMin),
					system.gE.c3 + scale(padMax));
			case 1:
				var min = range.a;
				var max = range.b;
				return A2($terezka$line_charts$LineChart$Coordinate$Range, min, max);
			default:
				var toRange = range.a;
				return toRange(system.gE);
		}
	});
var $terezka$line_charts$Internal$Coordinate$ground = function (range_) {
	return _Utils_update(
		range_,
		{
			bK: A2($elm$core$Basics$min, range_.bK, 0)
		});
};
var $terezka$line_charts$Internal$Area$hasArea = function (config) {
	switch (config.$) {
		case 0:
			return false;
		case 1:
			return true;
		case 2:
			return true;
		default:
			return true;
	}
};
var $terezka$line_charts$Internal$Axis$pixels = function (_v0) {
	var config = _v0;
	return config.ag;
};
var $terezka$line_charts$Internal$Axis$range = function (_v0) {
	var config = _v0;
	return config.ah;
};
var $terezka$line_charts$Internal$Coordinate$maximum = function (toValue) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$List$map(toValue),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$List$maximum,
			$elm$core$Maybe$withDefault(1)));
};
var $terezka$line_charts$Internal$Coordinate$minimum = function (toValue) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$List$map(toValue),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$List$minimum,
			$elm$core$Maybe$withDefault(0)));
};
var $terezka$line_charts$Internal$Coordinate$range = F2(
	function (toValue, data) {
		var range_ = {
			c3: A2($terezka$line_charts$Internal$Coordinate$maximum, toValue, data),
			bK: A2($terezka$line_charts$Internal$Coordinate$minimum, toValue, data)
		};
		return _Utils_eq(range_.bK, range_.c3) ? _Utils_update(
			range_,
			{c3: range_.c3 + 1}) : range_;
	});
var $terezka$line_charts$LineChart$toSystem = F2(
	function (config, data) {
		var yRange = A2(
			$terezka$line_charts$Internal$Coordinate$range,
			A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.fK;
				},
				function ($) {
					return $.gE;
				}),
			data);
		var xRange = A2(
			$terezka$line_charts$Internal$Coordinate$range,
			A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.fK;
				},
				function ($) {
					return $.gD;
				}),
			data);
		var size = A2(
			$terezka$line_charts$Internal$Coordinate$Size,
			$terezka$line_charts$Internal$Axis$pixels(config.gD),
			$terezka$line_charts$Internal$Axis$pixels(config.gE));
		var hasArea = $terezka$line_charts$Internal$Area$hasArea(config.d5);
		var container_ = A2($terezka$line_charts$Internal$Container$properties, $elm$core$Basics$identity, config.eu);
		var frame = A2($terezka$line_charts$Internal$Coordinate$Frame, container_.fk, size);
		var adjustDomainRange = function (domain) {
			return hasArea ? $terezka$line_charts$Internal$Coordinate$ground(domain) : domain;
		};
		var system = {
			aW: frame,
			e_: container_.e_,
			gD: xRange,
			ci: xRange,
			gE: adjustDomainRange(yRange),
			cj: yRange
		};
		return _Utils_update(
			system,
			{
				gD: A2(
					$terezka$line_charts$Internal$Axis$Range$applyX,
					$terezka$line_charts$Internal$Axis$range(config.gD),
					system),
				gE: A2(
					$terezka$line_charts$Internal$Axis$Range$applyY,
					$terezka$line_charts$Internal$Axis$range(config.gE),
					system)
			});
	});
var $terezka$line_charts$Internal$Axis$ticks = function (_v0) {
	var config = _v0;
	return config.w;
};
var $terezka$line_charts$Internal$Axis$Tick$properties = function (_v0) {
	var properties_ = _v0;
	return properties_;
};
var $terezka$line_charts$Internal$Axis$Ticks$ticks = F3(
	function (dataRange, range, _v0) {
		var values = _v0;
		return A2(
			$elm$core$List$map,
			$terezka$line_charts$Internal$Axis$Tick$properties,
			A2(values, dataRange, range));
	});
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $terezka$line_charts$Internal$Svg$gridDot = F3(
	function (radius, color, point) {
		return A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$cx(
					$elm$core$String$fromFloat(point.gD)),
					$elm$svg$Svg$Attributes$cy(
					$elm$core$String$fromFloat(point.gE)),
					$elm$svg$Svg$Attributes$r(
					$elm$core$String$fromFloat(radius)),
					$elm$svg$Svg$Attributes$fill(
					$avh4$elm_color$Color$toCssString(color))
				]),
			_List_Nil);
	});
var $terezka$line_charts$Internal$Grid$viewDots = F5(
	function (system, verticals, horizontals, radius, color) {
		var dot = F2(
			function (x, y) {
				return A2(
					$terezka$line_charts$LineChart$Coordinate$toSvg,
					system,
					A2($terezka$line_charts$LineChart$Coordinate$Point, x, y));
			});
		var dots_ = function (g) {
			return A2(
				$elm$core$List$map,
				dot(g),
				horizontals);
		};
		var alldots = A2($elm$core$List$concatMap, dots_, verticals);
		return A2(
			$elm$core$List$map,
			A2($terezka$line_charts$Internal$Svg$gridDot, radius, color),
			alldots);
	});
var $terezka$line_charts$Internal$Svg$horizontal = F5(
	function (system, userAttributes, y, x1, x2) {
		var attributes = A3(
			$terezka$line_charts$Internal$Utils$concat,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke(
					$avh4$elm_color$Color$toCssString($terezka$line_charts$LineChart$Colors$gray)),
					$elm$svg$Svg$Attributes$style('pointer-events: none;')
				]),
			userAttributes,
			_List_Nil);
		return A3(
			$terezka$line_charts$Internal$Path$view,
			system,
			attributes,
			_List_fromArray(
				[
					$terezka$line_charts$Internal$Path$Move(
					{gD: x1, gE: y}),
					$terezka$line_charts$Internal$Path$Line(
					{gD: x1, gE: y}),
					$terezka$line_charts$Internal$Path$Line(
					{gD: x2, gE: y})
				]));
	});
var $terezka$line_charts$Internal$Svg$horizontalGrid = F3(
	function (system, userAttributes, y) {
		var attributes = A3(
			$terezka$line_charts$Internal$Utils$concat,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke(
					$avh4$elm_color$Color$toCssString($terezka$line_charts$LineChart$Colors$gray)),
					$elm$svg$Svg$Attributes$style('pointer-events: none;')
				]),
			userAttributes,
			_List_Nil);
		return A5($terezka$line_charts$Internal$Svg$horizontal, system, attributes, y, system.gD.bK, system.gD.c3);
	});
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $terezka$line_charts$Internal$Grid$viewLines = F5(
	function (system, verticals, horizontals, width, color) {
		var attributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$strokeWidth(
				$elm$core$String$fromFloat(width)),
				$elm$svg$Svg$Attributes$stroke(
				$avh4$elm_color$Color$toCssString(color))
			]);
		return _Utils_ap(
			A2(
				$elm$core$List$map,
				A2($terezka$line_charts$Internal$Svg$horizontalGrid, system, attributes),
				horizontals),
			A2(
				$elm$core$List$map,
				A2($terezka$line_charts$Internal$Svg$verticalGrid, system, attributes),
				verticals));
	});
var $terezka$line_charts$Internal$Grid$view = F4(
	function (system, xAxis, yAxis, grid) {
		var hasGrid = function (tick) {
			return tick.eP ? $elm$core$Maybe$Just(tick.a3) : $elm$core$Maybe$Nothing;
		};
		var horizontals = A2(
			$elm$core$List$filterMap,
			hasGrid,
			A3(
				$terezka$line_charts$Internal$Axis$Ticks$ticks,
				system.cj,
				system.gE,
				$terezka$line_charts$Internal$Axis$ticks(yAxis)));
		var verticals = A2(
			$elm$core$List$filterMap,
			hasGrid,
			A3(
				$terezka$line_charts$Internal$Axis$Ticks$ticks,
				system.ci,
				system.gD,
				$terezka$line_charts$Internal$Axis$ticks(xAxis)));
		if (!grid.$) {
			var radius = grid.a;
			var color = grid.b;
			return A5($terezka$line_charts$Internal$Grid$viewDots, system, verticals, horizontals, radius, color);
		} else {
			var width = grid.a;
			var color = grid.b;
			return A5($terezka$line_charts$Internal$Grid$viewLines, system, verticals, horizontals, width, color);
		}
	});
var $terezka$line_charts$Internal$Svg$End = 2;
var $terezka$line_charts$Internal$Svg$Start = 0;
var $terezka$line_charts$Internal$Svg$anchorStyle = function (anchor) {
	var anchorString = function () {
		switch (anchor) {
			case 0:
				return 'start';
			case 1:
				return 'middle';
			default:
				return 'end';
		}
	}();
	return $elm$svg$Svg$Attributes$style('text-anchor: ' + (anchorString + ';'));
};
var $terezka$line_charts$Internal$Legends$viewFree = F5(
	function (system, placement, viewLabel, line, data) {
		var _v0 = function () {
			if (!placement) {
				return _Utils_Tuple3(data, 2, -10);
			} else {
				return _Utils_Tuple3(
					$elm$core$List$reverse(data),
					0,
					10);
			}
		}();
		var orderedPoints = _v0.a;
		var anchor = _v0.b;
		var xOffset = _v0.c;
		var transform = function (_v3) {
			var x = _v3.gD;
			var y = _v3.gE;
			return $terezka$line_charts$Internal$Svg$transform(
				_List_fromArray(
					[
						A3($terezka$line_charts$Internal$Svg$move, system, x, y),
						A2($terezka$line_charts$Internal$Svg$offset, xOffset, 3)
					]));
		};
		var viewLegend = function (_v2) {
			var point = _v2.fK;
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						transform(point),
						$terezka$line_charts$Internal$Svg$anchorStyle(anchor)
					]),
				_List_fromArray(
					[
						viewLabel(
						$terezka$line_charts$Internal$Line$label(line))
					]));
		};
		return A2(
			$terezka$line_charts$Internal$Utils$viewMaybe,
			$elm$core$List$head(orderedPoints),
			viewLegend);
	});
var $terezka$line_charts$Internal$Legends$viewFrees = F3(
	function (_v0, placement, view_) {
		var system = _v0.dD;
		var lines = _v0.bG;
		var data = _v0.ab;
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__legends')
				]),
			A3(
				$elm$core$List$map2,
				A3($terezka$line_charts$Internal$Legends$viewFree, system, placement, view_),
				lines,
				data));
	});
var $terezka$line_charts$Internal$Line$shape = function (_v0) {
	var config = _v0;
	return config.dv;
};
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $elm$svg$Svg$Attributes$strokeOpacity = _VirtualDom_attribute('stroke-opacity');
var $terezka$line_charts$Internal$Dots$varietyAttributes = F2(
	function (color, variety) {
		switch (variety.$) {
			case 0:
				var width = variety.a;
				return _List_fromArray(
					[
						$elm$svg$Svg$Attributes$stroke(
						$avh4$elm_color$Color$toCssString(color)),
						$elm$svg$Svg$Attributes$strokeWidth(
						$elm$core$String$fromInt(width)),
						$elm$svg$Svg$Attributes$fill('white')
					]);
			case 2:
				var width = variety.a;
				var opacity = variety.b;
				return _List_fromArray(
					[
						$elm$svg$Svg$Attributes$stroke(
						$avh4$elm_color$Color$toCssString(color)),
						$elm$svg$Svg$Attributes$strokeWidth(
						$elm$core$String$fromInt(width)),
						$elm$svg$Svg$Attributes$strokeOpacity(
						$elm$core$String$fromFloat(opacity)),
						$elm$svg$Svg$Attributes$fill(
						$avh4$elm_color$Color$toCssString(color))
					]);
			case 1:
				var width = variety.a;
				return _List_fromArray(
					[
						$elm$svg$Svg$Attributes$stroke('white'),
						$elm$svg$Svg$Attributes$strokeWidth(
						$elm$core$String$fromInt(width)),
						$elm$svg$Svg$Attributes$fill(
						$avh4$elm_color$Color$toCssString(color))
					]);
			default:
				return _List_fromArray(
					[
						$elm$svg$Svg$Attributes$fill(
						$avh4$elm_color$Color$toCssString(color))
					]);
		}
	});
var $terezka$line_charts$Internal$Dots$viewCircle = F5(
	function (events, variety, color, area, point) {
		var radius = $elm$core$Basics$sqrt(area / $elm$core$Basics$pi);
		var attributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$cx(
				$elm$core$String$fromFloat(point.gD)),
				$elm$svg$Svg$Attributes$cy(
				$elm$core$String$fromFloat(point.gE)),
				$elm$svg$Svg$Attributes$r(
				$elm$core$String$fromFloat(radius))
			]);
		return A2(
			$elm$svg$Svg$circle,
			_Utils_ap(
				events,
				_Utils_ap(
					attributes,
					A2($terezka$line_charts$Internal$Dots$varietyAttributes, color, variety))),
			_List_Nil);
	});
var $terezka$line_charts$Internal$Dots$pathPlus = F2(
	function (area, point) {
		var side = $elm$core$Basics$sqrt(area / 5);
		var r6 = side / 2;
		var r3 = side;
		var commands = _List_fromArray(
			[
				'M' + ($elm$core$String$fromFloat(point.gD - r6) + (' ' + $elm$core$String$fromFloat((point.gE - r3) - r6))),
				'v' + $elm$core$String$fromFloat(r3),
				'h' + $elm$core$String$fromFloat(-r3),
				'v' + $elm$core$String$fromFloat(r3),
				'h' + $elm$core$String$fromFloat(r3),
				'v' + $elm$core$String$fromFloat(r3),
				'h' + $elm$core$String$fromFloat(r3),
				'v' + $elm$core$String$fromFloat(-r3),
				'h' + $elm$core$String$fromFloat(r3),
				'v' + $elm$core$String$fromFloat(-r3),
				'h' + $elm$core$String$fromFloat(-r3),
				'v' + $elm$core$String$fromFloat(-r3),
				'h' + $elm$core$String$fromFloat(-r3),
				'v' + $elm$core$String$fromFloat(r3)
			]);
		return A2($elm$core$String$join, ' ', commands);
	});
var $terezka$line_charts$Internal$Dots$viewCross = F5(
	function (events, variety, color, area, point) {
		var rotation = 'rotate(45 ' + ($elm$core$String$fromFloat(point.gD) + (' ' + ($elm$core$String$fromFloat(point.gE) + ')')));
		var attributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$d(
				A2($terezka$line_charts$Internal$Dots$pathPlus, area, point)),
				$elm$svg$Svg$Attributes$transform(rotation)
			]);
		return A2(
			$elm$svg$Svg$path,
			_Utils_ap(
				events,
				_Utils_ap(
					attributes,
					A2($terezka$line_charts$Internal$Dots$varietyAttributes, color, variety))),
			_List_Nil);
	});
var $terezka$line_charts$Internal$Dots$viewDiamond = F5(
	function (events, variety, color, area, point) {
		var side = $elm$core$Basics$sqrt(area);
		var rotation = 'rotate(45 ' + ($elm$core$String$fromFloat(point.gD) + (' ' + ($elm$core$String$fromFloat(point.gE) + ')')));
		var attributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(point.gD - (side / 2))),
				$elm$svg$Svg$Attributes$y(
				$elm$core$String$fromFloat(point.gE - (side / 2))),
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromFloat(side)),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromFloat(side)),
				$elm$svg$Svg$Attributes$transform(rotation)
			]);
		return A2(
			$elm$svg$Svg$rect,
			_Utils_ap(
				events,
				_Utils_ap(
					attributes,
					A2($terezka$line_charts$Internal$Dots$varietyAttributes, color, variety))),
			_List_Nil);
	});
var $terezka$line_charts$Internal$Dots$viewPlus = F5(
	function (events, variety, color, area, point) {
		var attributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$d(
				A2($terezka$line_charts$Internal$Dots$pathPlus, area, point))
			]);
		return A2(
			$elm$svg$Svg$path,
			_Utils_ap(
				events,
				_Utils_ap(
					attributes,
					A2($terezka$line_charts$Internal$Dots$varietyAttributes, color, variety))),
			_List_Nil);
	});
var $terezka$line_charts$Internal$Dots$viewSquare = F5(
	function (events, variety, color, area, point) {
		var side = $elm$core$Basics$sqrt(area);
		var attributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(point.gD - (side / 2))),
				$elm$svg$Svg$Attributes$y(
				$elm$core$String$fromFloat(point.gE - (side / 2))),
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromFloat(side)),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromFloat(side))
			]);
		return A2(
			$elm$svg$Svg$rect,
			_Utils_ap(
				events,
				_Utils_ap(
					attributes,
					A2($terezka$line_charts$Internal$Dots$varietyAttributes, color, variety))),
			_List_Nil);
	});
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $elm$core$Basics$tan = _Basics_tan;
var $terezka$line_charts$Internal$Dots$pathTriangle = F2(
	function (area, point) {
		var side = $elm$core$Basics$sqrt(
			(area * 4) / $elm$core$Basics$sqrt(3));
		var height = ($elm$core$Basics$sqrt(3) * side) / 2;
		var fromMiddle = height - (($elm$core$Basics$tan(
			$elm$core$Basics$degrees(30)) * side) / 2);
		var commands = _List_fromArray(
			[
				'M' + ($elm$core$String$fromFloat(point.gD) + (' ' + $elm$core$String$fromFloat(point.gE - fromMiddle))),
				'l' + ($elm$core$String$fromFloat((-side) / 2) + (' ' + $elm$core$String$fromFloat(height))),
				'h' + $elm$core$String$fromFloat(side),
				'z'
			]);
		return A2($elm$core$String$join, ' ', commands);
	});
var $terezka$line_charts$Internal$Dots$viewTriangle = F5(
	function (events, variety, color, area, point) {
		var attributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$d(
				A2($terezka$line_charts$Internal$Dots$pathTriangle, area, point))
			]);
		return A2(
			$elm$svg$Svg$path,
			_Utils_ap(
				events,
				_Utils_ap(
					attributes,
					A2($terezka$line_charts$Internal$Dots$varietyAttributes, color, variety))),
			_List_Nil);
	});
var $terezka$line_charts$Internal$Dots$viewShape = F5(
	function (system, _v0, shape, color, point) {
		var radius = _v0.bU;
		var variety = _v0.cc;
		var view_ = function () {
			switch (shape) {
				case 1:
					return $terezka$line_charts$Internal$Dots$viewCircle;
				case 2:
					return $terezka$line_charts$Internal$Dots$viewTriangle;
				case 3:
					return $terezka$line_charts$Internal$Dots$viewSquare;
				case 4:
					return $terezka$line_charts$Internal$Dots$viewDiamond;
				case 5:
					return $terezka$line_charts$Internal$Dots$viewCross;
				case 6:
					return $terezka$line_charts$Internal$Dots$viewPlus;
				default:
					return F5(
						function (_v2, _v3, _v4, _v5, _v6) {
							return $elm$svg$Svg$text('');
						});
			}
		}();
		var size = (2 * $elm$core$Basics$pi) * radius;
		var pointSvg = A2($terezka$line_charts$LineChart$Coordinate$toSvg, system, point);
		return A5(view_, _List_Nil, variety, color, size, pointSvg);
	});
var $terezka$line_charts$Internal$Dots$viewSample = F5(
	function (_v0, shape, color, system, data) {
		var config = _v0;
		var _v1 = config.bE(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.gz;
				},
				data));
		var style_ = _v1;
		return A4($terezka$line_charts$Internal$Dots$viewShape, system, style_, shape, color);
	});
var $elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $terezka$line_charts$Internal$Area$opacity = function (config) {
	switch (config.$) {
		case 0:
			return 0;
		case 1:
			var opacity_ = config.a;
			return opacity_;
		case 2:
			var opacity_ = config.a;
			return opacity_;
		default:
			var opacity_ = config.a;
			return opacity_;
	}
};
var $terezka$line_charts$Internal$Line$toAreaAttributes = F3(
	function (_v0, _v1, area) {
		var serie = _v0;
		var style_ = _v1;
		return _List_fromArray(
			[
				$elm$svg$Svg$Attributes$class('chart__interpolation__area__fragment'),
				$elm$svg$Svg$Attributes$fill(
				$avh4$elm_color$Color$toCssString(
					style_.ar(serie.ar)))
			]);
	});
var $elm$svg$Svg$Attributes$strokeDasharray = _VirtualDom_attribute('stroke-dasharray');
var $terezka$line_charts$Internal$Line$toSeriesAttributes = F2(
	function (_v0, _v1) {
		var serie = _v0;
		var style_ = _v1;
		return _List_fromArray(
			[
				$elm$svg$Svg$Attributes$style('pointer-events: none;'),
				$elm$svg$Svg$Attributes$class('chart__interpolation__line__fragment'),
				$elm$svg$Svg$Attributes$stroke(
				$avh4$elm_color$Color$toCssString(
					style_.ar(serie.ar))),
				$elm$svg$Svg$Attributes$strokeWidth(
				$elm$core$String$fromFloat(style_.dQ)),
				$elm$svg$Svg$Attributes$strokeDasharray(
				A2(
					$elm$core$String$join,
					' ',
					A2($elm$core$List$map, $elm$core$String$fromFloat, serie.cy))),
				$elm$svg$Svg$Attributes$fill('transparent')
			]);
	});
var $terezka$line_charts$Internal$Utils$viewIf = F2(
	function (condition, view) {
		return condition ? view(0) : $elm$svg$Svg$text('');
	});
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $terezka$line_charts$Internal$Line$viewSample = F5(
	function (_v0, line_, area, data_, sampleWidth) {
		var look = _v0;
		var style_ = look(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.gz;
				},
				data_));
		var sizeAttributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$x1('0'),
				$elm$svg$Svg$Attributes$y1('0'),
				$elm$svg$Svg$Attributes$x2(
				$elm$core$String$fromFloat(sampleWidth)),
				$elm$svg$Svg$Attributes$y2('0')
			]);
		var rectangleAttributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$x('0'),
				$elm$svg$Svg$Attributes$y('0'),
				$elm$svg$Svg$Attributes$height('9'),
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromFloat(sampleWidth))
			]);
		var lineAttributes = A2($terezka$line_charts$Internal$Line$toSeriesAttributes, line_, style_);
		var areaAttributes = A2(
			$elm$core$List$cons,
			$elm$svg$Svg$Attributes$fillOpacity(
				$elm$core$String$fromFloat(
					$terezka$line_charts$Internal$Area$opacity(area))),
			A3($terezka$line_charts$Internal$Line$toAreaAttributes, line_, style_, area));
		var viewRectangle = function (_v1) {
			return A2(
				$elm$svg$Svg$rect,
				_Utils_ap(areaAttributes, rectangleAttributes),
				_List_Nil);
		};
		return A2(
			$elm$svg$Svg$g,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$line,
					_Utils_ap(lineAttributes, sizeAttributes),
					_List_Nil),
					A2(
					$terezka$line_charts$Internal$Utils$viewIf,
					$terezka$line_charts$Internal$Area$hasArea(area),
					viewRectangle)
				]));
	});
var $terezka$line_charts$Internal$Legends$viewSample = F4(
	function (_v0, sampleWidth, line, data) {
		var system = _v0.dD;
		var lineConfig = _v0.c0;
		var dotsConfig = _v0.cB;
		var area = _v0.d5;
		var shape = $terezka$line_charts$Internal$Line$shape(line);
		var dotPosition = A2(
			$terezka$line_charts$LineChart$Coordinate$toData,
			system,
			A2($terezka$line_charts$Internal$Data$Point, sampleWidth / 2, 0));
		var color = A3($terezka$line_charts$Internal$Line$color, lineConfig, line, data);
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__sample')
				]),
			_List_fromArray(
				[
					A5($terezka$line_charts$Internal$Line$viewSample, lineConfig, line, area, data, sampleWidth),
					A6($terezka$line_charts$Internal$Dots$viewSample, dotsConfig, shape, color, system, data, dotPosition)
				]));
	});
var $terezka$line_charts$Internal$Legends$viewGrouped = F3(
	function (_arguments, sampleWidth, container) {
		var toLegend = F2(
			function (line, data) {
				return {
					aZ: $terezka$line_charts$Internal$Line$label(line),
					bX: A4($terezka$line_charts$Internal$Legends$viewSample, _arguments, sampleWidth, line, data)
				};
			});
		var legends = A3($elm$core$List$map2, toLegend, _arguments.bG, _arguments.ab);
		return A2(container, _arguments.dD, legends);
	});
var $terezka$line_charts$Internal$Legends$view = function (_arguments) {
	var _v0 = _arguments.fh;
	switch (_v0.$) {
		case 1:
			var placement = _v0.a;
			var view_ = _v0.b;
			return A3($terezka$line_charts$Internal$Legends$viewFrees, _arguments, placement, view_);
		case 2:
			var sampleWidth = _v0.a;
			var container = _v0.b;
			return A3(
				$terezka$line_charts$Internal$Legends$viewGrouped,
				_arguments,
				sampleWidth,
				container(_arguments));
		default:
			return $elm$svg$Svg$text('');
	}
};
var $terezka$line_charts$Internal$Area$opacityContainer = function (config) {
	switch (config.$) {
		case 0:
			return 1;
		case 1:
			var opacity_ = config.a;
			return 1;
		case 2:
			var opacity_ = config.a;
			return opacity_;
		default:
			var opacity_ = config.a;
			return opacity_;
	}
};
var $terezka$line_charts$Internal$Utils$unzip3 = function (pairs) {
	var step = F2(
		function (_v0, _v1) {
			var a = _v0.a;
			var b = _v0.b;
			var c = _v0.c;
			var aas = _v1.a;
			var bs = _v1.b;
			var cs = _v1.c;
			return _Utils_Tuple3(
				A2($elm$core$List$cons, a, aas),
				A2($elm$core$List$cons, b, bs),
				A2($elm$core$List$cons, c, cs));
		});
	return A3(
		$elm$core$List$foldr,
		step,
		_Utils_Tuple3(_List_Nil, _List_Nil, _List_Nil),
		pairs);
};
var $elm$core$List$map3 = _List_map3;
var $terezka$line_charts$Internal$Line$viewNormal = function (_v0) {
	var areas = _v0.a;
	var lines = _v0.b;
	var dots = _v0.c;
	var view_ = F3(
		function (area_, line_, dots_) {
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('chart__line')
					]),
				_List_fromArray(
					[area_, line_, dots_]));
		});
	return A4($elm$core$List$map3, view_, areas, lines, dots);
};
var $terezka$line_charts$Internal$Data$isWithinRange = F2(
	function (system, point) {
		return _Utils_eq(
			A3($elm$core$Basics$clamp, system.gD.bK, system.gD.c3, point.gD),
			point.gD) && _Utils_eq(
			A3($elm$core$Basics$clamp, system.gE.bK, system.gE.c3, point.gE),
			point.gE);
	});
var $terezka$line_charts$Internal$Utils$part = F4(
	function (isReal, points, current, parts) {
		part:
		while (true) {
			if (points.b) {
				var first = points.a;
				var rest = points.b;
				if (isReal(first)) {
					var $temp$isReal = isReal,
						$temp$points = rest,
						$temp$current = _Utils_ap(
						current,
						_List_fromArray(
							[first])),
						$temp$parts = parts;
					isReal = $temp$isReal;
					points = $temp$points;
					current = $temp$current;
					parts = $temp$parts;
					continue part;
				} else {
					var $temp$isReal = isReal,
						$temp$points = rest,
						$temp$current = _List_Nil,
						$temp$parts = A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							current,
							$elm$core$Maybe$Just(first)),
						parts);
					isReal = $temp$isReal;
					points = $temp$points;
					current = $temp$current;
					parts = $temp$parts;
					continue part;
				}
			} else {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(current, $elm$core$Maybe$Nothing),
					parts);
			}
		}
	});
var $terezka$line_charts$Internal$Interpolation$linear = $elm$core$List$map(
	$elm$core$List$map($terezka$line_charts$Internal$Path$Line));
var $terezka$line_charts$Internal$Interpolation$First = {$: 0};
var $terezka$line_charts$Internal$Interpolation$Previous = function (a) {
	return {$: 1, a: a};
};
var $terezka$line_charts$Internal$Interpolation$monotoneCurve = F4(
	function (point0, point1, tangent0, tangent1) {
		var dx = (point1.gD - point0.gD) / 3;
		return A3(
			$terezka$line_charts$Internal$Path$CubicBeziers,
			{gD: point0.gD + dx, gE: point0.gE + (dx * tangent0)},
			{gD: point1.gD - dx, gE: point1.gE - (dx * tangent1)},
			point1);
	});
var $terezka$line_charts$Internal$Interpolation$slope2 = F3(
	function (point0, point1, t) {
		var h = point1.gD - point0.gD;
		return (!(!h)) ? ((((3 * (point1.gE - point0.gE)) / h) - t) / 2) : t;
	});
var $terezka$line_charts$Internal$Interpolation$sign = function (x) {
	return (x < 0) ? (-1) : 1;
};
var $terezka$line_charts$Internal$Interpolation$toH = F2(
	function (h0, h1) {
		return (!h0) ? ((h1 < 0) ? (0 * (-1)) : h1) : h0;
	});
var $terezka$line_charts$Internal$Interpolation$slope3 = F3(
	function (point0, point1, point2) {
		var h1 = point2.gD - point1.gD;
		var h0 = point1.gD - point0.gD;
		var s0h = A2($terezka$line_charts$Internal$Interpolation$toH, h0, h1);
		var s0 = (point1.gE - point0.gE) / s0h;
		var s1h = A2($terezka$line_charts$Internal$Interpolation$toH, h1, h0);
		var s1 = (point2.gE - point1.gE) / s1h;
		var p = ((s0 * h1) + (s1 * h0)) / (h0 + h1);
		var slope = ($terezka$line_charts$Internal$Interpolation$sign(s0) + $terezka$line_charts$Internal$Interpolation$sign(s1)) * A2(
			$elm$core$Basics$min,
			A2(
				$elm$core$Basics$min,
				$elm$core$Basics$abs(s0),
				$elm$core$Basics$abs(s1)),
			0.5 * $elm$core$Basics$abs(p));
		return $elm$core$Basics$isNaN(slope) ? 0 : slope;
	});
var $terezka$line_charts$Internal$Interpolation$monotonePart = F2(
	function (points, _v0) {
		var tangent = _v0.a;
		var commands = _v0.b;
		var _v1 = _Utils_Tuple2(tangent, points);
		_v1$4:
		while (true) {
			if (!_v1.a.$) {
				if (_v1.b.b && _v1.b.b.b) {
					if (_v1.b.b.b.b) {
						var _v2 = _v1.a;
						var _v3 = _v1.b;
						var p0 = _v3.a;
						var _v4 = _v3.b;
						var p1 = _v4.a;
						var _v5 = _v4.b;
						var p2 = _v5.a;
						var rest = _v5.b;
						var t1 = A3($terezka$line_charts$Internal$Interpolation$slope3, p0, p1, p2);
						var t0 = A3($terezka$line_charts$Internal$Interpolation$slope2, p0, p1, t1);
						return A2(
							$terezka$line_charts$Internal$Interpolation$monotonePart,
							A2(
								$elm$core$List$cons,
								p1,
								A2($elm$core$List$cons, p2, rest)),
							_Utils_Tuple2(
								$terezka$line_charts$Internal$Interpolation$Previous(t1),
								_Utils_ap(
									commands,
									_List_fromArray(
										[
											A4($terezka$line_charts$Internal$Interpolation$monotoneCurve, p0, p1, t0, t1)
										]))));
					} else {
						var _v9 = _v1.a;
						var _v10 = _v1.b;
						var p0 = _v10.a;
						var _v11 = _v10.b;
						var p1 = _v11.a;
						var t1 = A3($terezka$line_charts$Internal$Interpolation$slope3, p0, p1, p1);
						return _Utils_Tuple2(
							$terezka$line_charts$Internal$Interpolation$Previous(t1),
							_Utils_ap(
								commands,
								_List_fromArray(
									[
										A4($terezka$line_charts$Internal$Interpolation$monotoneCurve, p0, p1, t1, t1),
										$terezka$line_charts$Internal$Path$Line(p1)
									])));
					}
				} else {
					break _v1$4;
				}
			} else {
				if (_v1.b.b && _v1.b.b.b) {
					if (_v1.b.b.b.b) {
						var t0 = _v1.a.a;
						var _v6 = _v1.b;
						var p0 = _v6.a;
						var _v7 = _v6.b;
						var p1 = _v7.a;
						var _v8 = _v7.b;
						var p2 = _v8.a;
						var rest = _v8.b;
						var t1 = A3($terezka$line_charts$Internal$Interpolation$slope3, p0, p1, p2);
						return A2(
							$terezka$line_charts$Internal$Interpolation$monotonePart,
							A2(
								$elm$core$List$cons,
								p1,
								A2($elm$core$List$cons, p2, rest)),
							_Utils_Tuple2(
								$terezka$line_charts$Internal$Interpolation$Previous(t1),
								_Utils_ap(
									commands,
									_List_fromArray(
										[
											A4($terezka$line_charts$Internal$Interpolation$monotoneCurve, p0, p1, t0, t1)
										]))));
					} else {
						var t0 = _v1.a.a;
						var _v12 = _v1.b;
						var p0 = _v12.a;
						var _v13 = _v12.b;
						var p1 = _v13.a;
						var t1 = A3($terezka$line_charts$Internal$Interpolation$slope3, p0, p1, p1);
						return _Utils_Tuple2(
							$terezka$line_charts$Internal$Interpolation$Previous(t1),
							_Utils_ap(
								commands,
								_List_fromArray(
									[
										A4($terezka$line_charts$Internal$Interpolation$monotoneCurve, p0, p1, t0, t1),
										$terezka$line_charts$Internal$Path$Line(p1)
									])));
					}
				} else {
					break _v1$4;
				}
			}
		}
		return _Utils_Tuple2(tangent, commands);
	});
var $terezka$line_charts$Internal$Interpolation$monotoneSection = F2(
	function (points, _v0) {
		var tangent = _v0.a;
		var acc = _v0.b;
		var _v1 = function () {
			if (points.b) {
				var p0 = points.a;
				var rest = points.b;
				return A2(
					$terezka$line_charts$Internal$Interpolation$monotonePart,
					A2($elm$core$List$cons, p0, rest),
					_Utils_Tuple2(
						tangent,
						_List_fromArray(
							[
								$terezka$line_charts$Internal$Path$Line(p0)
							])));
			} else {
				return _Utils_Tuple2(tangent, _List_Nil);
			}
		}();
		var t0 = _v1.a;
		var commands = _v1.b;
		return _Utils_Tuple2(
			t0,
			A2($elm$core$List$cons, commands, acc));
	});
var $terezka$line_charts$Internal$Interpolation$monotone = function (sections) {
	return A3(
		$elm$core$List$foldr,
		$terezka$line_charts$Internal$Interpolation$monotoneSection,
		_Utils_Tuple2($terezka$line_charts$Internal$Interpolation$First, _List_Nil),
		sections).b;
};
var $terezka$line_charts$Internal$Interpolation$after = F2(
	function (a, b) {
		return _List_fromArray(
			[
				a,
				A2($terezka$line_charts$Internal$Data$Point, b.gD, a.gE),
				b
			]);
	});
var $terezka$line_charts$Internal$Interpolation$stepped = function (sections) {
	var expand = F2(
		function (result, section) {
			expand:
			while (true) {
				if (section.a.b) {
					if (section.a.b.b) {
						var _v1 = section.a;
						var a = _v1.a;
						var _v2 = _v1.b;
						var b = _v2.a;
						var rest = _v2.b;
						var broken = section.b;
						var $temp$result = _Utils_ap(
							result,
							A2($terezka$line_charts$Internal$Interpolation$after, a, b)),
							$temp$section = _Utils_Tuple2(
							A2($elm$core$List$cons, b, rest),
							broken);
						result = $temp$result;
						section = $temp$section;
						continue expand;
					} else {
						if (!section.b.$) {
							var _v3 = section.a;
							var last = _v3.a;
							var broken = section.b.a;
							return _Utils_ap(
								result,
								_List_fromArray(
									[
										A2($terezka$line_charts$Internal$Data$Point, broken.gD, last.gE)
									]));
						} else {
							var _v4 = section.a;
							var last = _v4.a;
							var _v5 = section.b;
							return result;
						}
					}
				} else {
					return result;
				}
			}
		});
	return A2(
		$elm$core$List$map,
		A2(
			$elm$core$Basics$composeR,
			expand(_List_Nil),
			$elm$core$List$map($terezka$line_charts$Internal$Path$Line)),
		sections);
};
var $terezka$line_charts$Internal$Interpolation$toCommands = F2(
	function (interpolation, data) {
		var pointsSections = $elm$core$List$map(
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Tuple$mapFirst(
					$elm$core$List$map(
						function ($) {
							return $.fK;
						})),
				$elm$core$Tuple$mapSecond(
					$elm$core$Maybe$map(
						function ($) {
							return $.fK;
						}))));
		var points = $elm$core$List$map(
			A2(
				$elm$core$Basics$composeR,
				$elm$core$Tuple$first,
				$elm$core$List$map(
					function ($) {
						return $.fK;
					})));
		switch (interpolation) {
			case 0:
				return $terezka$line_charts$Internal$Interpolation$linear(
					points(data));
			case 1:
				return $terezka$line_charts$Internal$Interpolation$monotone(
					points(data));
			default:
				return $terezka$line_charts$Internal$Interpolation$stepped(
					pointsSections(data));
		}
	});
var $terezka$line_charts$Internal$Area$opacitySingle = function (config) {
	switch (config.$) {
		case 0:
			return 0;
		case 1:
			var opacity_ = config.a;
			return opacity_;
		case 2:
			var opacity_ = config.a;
			return 1;
		default:
			var opacity_ = config.a;
			return 1;
	}
};
var $terezka$line_charts$Internal$Path$toPoint = function (command) {
	switch (command.$) {
		case 9:
			return A2($terezka$line_charts$LineChart$Coordinate$Point, 0, 0);
		case 0:
			var p = command.a;
			return p;
		case 1:
			var p = command.a;
			return p;
		case 2:
			var x = command.a;
			return A2($terezka$line_charts$LineChart$Coordinate$Point, x, 0);
		case 3:
			var y = command.a;
			return A2($terezka$line_charts$LineChart$Coordinate$Point, 0, y);
		case 4:
			var c1 = command.a;
			var c2 = command.b;
			var p = command.c;
			return p;
		case 5:
			var c1 = command.a;
			var p = command.b;
			return p;
		case 6:
			var c1 = command.a;
			var p = command.b;
			return p;
		case 7:
			var p = command.a;
			return p;
		default:
			var rx = command.a;
			var ry = command.b;
			var xAxisRotation = command.c;
			var largeArcFlag = command.d;
			var sweepFlag = command.e;
			var p = command.f;
			return p;
	}
};
var $terezka$line_charts$Internal$Utils$towardsZero = function (_v0) {
	var max = _v0.c3;
	var min = _v0.bK;
	return A3($elm$core$Basics$clamp, min, max, 0);
};
var $terezka$line_charts$Internal$Utils$last = function (list) {
	return $elm$core$List$head(
		A2(
			$elm$core$List$drop,
			$elm$core$List$length(list) - 1,
			list));
};
var $terezka$line_charts$Internal$Utils$lastSafe = F2(
	function (first, rest) {
		return A2(
			$elm$core$Maybe$withDefault,
			first,
			$terezka$line_charts$Internal$Utils$last(rest));
	});
var $terezka$line_charts$Internal$Utils$viewWithEdges = F2(
	function (stuff, view) {
		if (stuff.b) {
			var first = stuff.a;
			var rest = stuff.b;
			return A3(
				view,
				first,
				rest,
				A2($terezka$line_charts$Internal$Utils$lastSafe, first, rest));
		} else {
			return $elm$svg$Svg$text('');
		}
	});
var $elm$svg$Svg$Attributes$clipPath = _VirtualDom_attribute('clip-path');
var $terezka$line_charts$Internal$Svg$withinChartArea = function (_v0) {
	var id = _v0.e_;
	return $elm$svg$Svg$Attributes$clipPath(
		'url(#' + ($terezka$line_charts$Internal$Utils$toChartAreaId(id) + ')'));
};
var $terezka$line_charts$LineChart$Junk$withinChartArea = $terezka$line_charts$Internal$Svg$withinChartArea;
var $terezka$line_charts$Internal$Line$viewArea = F5(
	function (_v0, line_, style_, interpolation, data_) {
		var system = _v0.dD;
		var lineConfig = _v0.c0;
		var area = _v0.d5;
		var ground = function (point) {
			return A2(
				$terezka$line_charts$Internal$Data$Point,
				point.gD,
				$terezka$line_charts$Internal$Utils$towardsZero(system.gE));
		};
		var commands = F3(
			function (first, middle, last) {
				return A3(
					$terezka$line_charts$Internal$Utils$concat,
					_List_fromArray(
						[
							$terezka$line_charts$Internal$Path$Move(
							ground(
								$terezka$line_charts$Internal$Path$toPoint(first))),
							$terezka$line_charts$Internal$Path$Line(
							$terezka$line_charts$Internal$Path$toPoint(first))
						]),
					interpolation,
					_List_fromArray(
						[
							$terezka$line_charts$Internal$Path$Line(
							ground(
								$terezka$line_charts$Internal$Path$toPoint(last)))
						]));
			});
		var attributes = A2(
			$elm$core$List$cons,
			$terezka$line_charts$LineChart$Junk$withinChartArea(system),
			A2(
				$elm$core$List$cons,
				$elm$svg$Svg$Attributes$fillOpacity(
					$elm$core$String$fromFloat(
						$terezka$line_charts$Internal$Area$opacitySingle(area))),
				A3($terezka$line_charts$Internal$Line$toAreaAttributes, line_, style_, area)));
		return A2(
			$terezka$line_charts$Internal$Utils$viewWithEdges,
			interpolation,
			F3(
				function (first, middle, last) {
					return A3(
						$terezka$line_charts$Internal$Path$view,
						system,
						attributes,
						A3(commands, first, middle, last));
				}));
	});
var $terezka$line_charts$Internal$Dots$view = F2(
	function (_v0, data) {
		var system = _v0.dD;
		var dotsConfig = _v0.cB;
		var shape = _v0.dv;
		var color = _v0.ar;
		var _v1 = dotsConfig;
		var config = _v1;
		var _v2 = config.bz(data.gz);
		var style_ = _v2;
		return A5($terezka$line_charts$Internal$Dots$viewShape, system, style_, shape, color, data.fK);
	});
var $terezka$line_charts$Internal$Line$viewDot = F3(
	function (_arguments, _v0, _v1) {
		var lineConfig = _v0;
		var style_ = _v1;
		return $terezka$line_charts$Internal$Dots$view(
			{
				ar: style_.ar(lineConfig.ar),
				cB: _arguments.cB,
				dv: lineConfig.dv,
				dD: _arguments.dD
			});
	});
var $terezka$line_charts$Internal$Utils$viewWithFirst = F2(
	function (stuff, view) {
		if (stuff.b) {
			var first = stuff.a;
			var rest = stuff.b;
			return A2(view, first, rest);
		} else {
			return $elm$svg$Svg$text('');
		}
	});
var $terezka$line_charts$Internal$Line$viewSeries = F5(
	function (_v0, line_, style_, interpolation, data_) {
		var system = _v0.dD;
		var lineConfig = _v0.c0;
		var attributes = A2(
			$elm$core$List$cons,
			$terezka$line_charts$LineChart$Junk$withinChartArea(system),
			A2($terezka$line_charts$Internal$Line$toSeriesAttributes, line_, style_));
		return A2(
			$terezka$line_charts$Internal$Utils$viewWithFirst,
			data_,
			F2(
				function (first, _v1) {
					return A3(
						$terezka$line_charts$Internal$Path$view,
						system,
						attributes,
						A2(
							$elm$core$List$cons,
							$terezka$line_charts$Internal$Path$Move(first.fK),
							interpolation));
				}));
	});
var $terezka$line_charts$Internal$Line$viewSingle = F3(
	function (_arguments, line_, data_) {
		var style_ = function (_v1) {
			var look = _v1;
			return look(
				A2(
					$elm$core$List$map,
					function ($) {
						return $.gz;
					},
					data_));
		}(_arguments.c0);
		var sections = A4(
			$terezka$line_charts$Internal$Utils$part,
			function ($) {
				return $.fd;
			},
			data_,
			_List_Nil,
			_List_Nil);
		var parts = A2($elm$core$List$map, $elm$core$Tuple$first, sections);
		var viewDots = A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__dots')
				]),
			A2(
				$elm$core$List$map,
				A3($terezka$line_charts$Internal$Line$viewDot, _arguments, line_, style_),
				A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeL,
						$terezka$line_charts$Internal$Data$isWithinRange(_arguments.dD),
						function ($) {
							return $.fK;
						}),
					$elm$core$List$concat(parts))));
		var commands = A2($terezka$line_charts$Internal$Interpolation$toCommands, _arguments.e8, sections);
		var viewAreas = function (_v0) {
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('chart__interpolation__area')
					]),
				A3(
					$elm$core$List$map2,
					A3($terezka$line_charts$Internal$Line$viewArea, _arguments, line_, style_),
					commands,
					parts));
		};
		var viewSeriess = A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__interpolation__line')
				]),
			A3(
				$elm$core$List$map2,
				A3($terezka$line_charts$Internal$Line$viewSeries, _arguments, line_, style_),
				commands,
				parts));
		return _Utils_Tuple3(
			A2(
				$terezka$line_charts$Internal$Utils$viewIf,
				$terezka$line_charts$Internal$Area$hasArea(_arguments.d5),
				viewAreas),
			viewSeriess,
			viewDots);
	});
var $terezka$line_charts$Internal$Line$viewStacked = F2(
	function (area, _v0) {
		var areas = _v0.a;
		var lines = _v0.b;
		var dots = _v0.c;
		var toList = F2(
			function (l, d) {
				return _List_fromArray(
					[l, d]);
			});
		var opacity = 'opacity: ' + $elm$core$String$fromFloat(
			$terezka$line_charts$Internal$Area$opacityContainer(area));
		var bottoms = $elm$core$List$concat(
			A3($elm$core$List$map2, toList, lines, dots));
		return _List_fromArray(
			[
				A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('chart__bottoms'),
						$elm$svg$Svg$Attributes$style(opacity)
					]),
				areas),
				A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('chart__tops')
					]),
				bottoms)
			]);
	});
var $terezka$line_charts$Internal$Line$view = F3(
	function (_arguments, lines, datas) {
		var container = $elm$svg$Svg$g(
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__lines')
				]));
		var buildSeriesViews = ($terezka$line_charts$Internal$Area$opacityContainer(_arguments.d5) < 1) ? $terezka$line_charts$Internal$Line$viewStacked(_arguments.d5) : $terezka$line_charts$Internal$Line$viewNormal;
		return container(
			buildSeriesViews(
				$terezka$line_charts$Internal$Utils$unzip3(
					A3(
						$elm$core$List$map2,
						$terezka$line_charts$Internal$Line$viewSingle(_arguments),
						lines,
						datas))));
	});
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $terezka$line_charts$LineChart$viewBoxAttribute = function (_v0) {
	var frame = _v0.aW;
	return $elm$svg$Svg$Attributes$viewBox(
		'0 0 ' + ($elm$core$String$fromFloat(frame.fZ.dQ) + (' ' + $elm$core$String$fromFloat(frame.fZ.cL))));
};
var $terezka$line_charts$Internal$Axis$Line$config = function (_v0) {
	var config_ = _v0;
	return config_;
};
var $terezka$line_charts$Internal$Axis$Title$config = function (_v0) {
	var title = _v0;
	return title;
};
var $terezka$line_charts$Internal$Axis$Intersection$getY = function (_v0) {
	var func = _v0;
	return A2(
		$elm$core$Basics$composeL,
		function ($) {
			return $.gE;
		},
		func);
};
var $terezka$line_charts$Internal$Axis$attributesLine = F2(
	function (system, _v0) {
		var events = _v0.eG;
		var width = _v0.dQ;
		var color = _v0.ar;
		return _Utils_ap(
			events,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$strokeWidth(
					$elm$core$String$fromFloat(width)),
					$elm$svg$Svg$Attributes$stroke(
					$avh4$elm_color$Color$toCssString(color)),
					$terezka$line_charts$Internal$Svg$withinChartArea(system)
				]));
	});
var $terezka$line_charts$Internal$Axis$viewHorizontalAxisLine = F3(
	function (system, axisPosition, config) {
		return A5(
			$terezka$line_charts$Internal$Svg$horizontal,
			system,
			A2($terezka$line_charts$Internal$Axis$attributesLine, system, config),
			axisPosition,
			config.b6,
			config.cC);
	});
var $terezka$line_charts$Internal$Axis$attributesTick = function (_v0) {
	var width = _v0.dQ;
	var color = _v0.ar;
	return _List_fromArray(
		[
			$elm$svg$Svg$Attributes$strokeWidth(
			$elm$core$String$fromFloat(width)),
			$elm$svg$Svg$Attributes$stroke(
			$avh4$elm_color$Color$toCssString(color))
		]);
};
var $terezka$line_charts$Internal$Axis$Tick$isPositive = function (direction) {
	if (direction === 1) {
		return true;
	} else {
		return false;
	}
};
var $terezka$line_charts$Internal$Axis$lengthOfTick = function (_v0) {
	var length = _v0.bF;
	var direction = _v0.bl;
	return $terezka$line_charts$Internal$Axis$Tick$isPositive(direction) ? (-length) : length;
};
var $terezka$line_charts$Internal$Svg$Middle = 1;
var $terezka$line_charts$Internal$Axis$viewHorizontalLabel = F4(
	function (system, _v0, position, view) {
		var direction = _v0.bl;
		var length = _v0.bF;
		var yOffset = $terezka$line_charts$Internal$Axis$Tick$isPositive(direction) ? ((-5) - length) : (15 + length);
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$terezka$line_charts$Internal$Svg$transform(
					_List_fromArray(
						[
							A3($terezka$line_charts$Internal$Svg$move, system, position.gD, position.gE),
							A2($terezka$line_charts$Internal$Svg$offset, 0, yOffset)
						])),
					$terezka$line_charts$Internal$Svg$anchorStyle(1)
				]),
			_List_fromArray(
				[view]));
	});
var $terezka$line_charts$Internal$Svg$xTick = F5(
	function (system, height, userAttributes, y, x) {
		var attributes = A3(
			$terezka$line_charts$Internal$Utils$concat,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke(
					$avh4$elm_color$Color$toCssString($terezka$line_charts$LineChart$Colors$gray))
				]),
			userAttributes,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1(
					$elm$core$String$fromFloat(
						A2($terezka$line_charts$LineChart$Coordinate$toSvgX, system, x))),
					$elm$svg$Svg$Attributes$x2(
					$elm$core$String$fromFloat(
						A2($terezka$line_charts$LineChart$Coordinate$toSvgX, system, x))),
					$elm$svg$Svg$Attributes$y1(
					$elm$core$String$fromFloat(
						A2($terezka$line_charts$LineChart$Coordinate$toSvgY, system, y))),
					$elm$svg$Svg$Attributes$y2(
					$elm$core$String$fromFloat(
						A2($terezka$line_charts$LineChart$Coordinate$toSvgY, system, y) + height))
				]));
		return A2($elm$svg$Svg$line, attributes, _List_Nil);
	});
var $terezka$line_charts$Internal$Axis$viewHorizontalTick = F3(
	function (system, point, tick) {
		var x = point.gD;
		var y = point.gE;
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__tick')
				]),
			_List_fromArray(
				[
					A5(
					$terezka$line_charts$Internal$Svg$xTick,
					system,
					$terezka$line_charts$Internal$Axis$lengthOfTick(tick),
					$terezka$line_charts$Internal$Axis$attributesTick(tick),
					y,
					x),
					A2(
					$terezka$line_charts$Internal$Utils$viewMaybe,
					tick.aZ,
					A3($terezka$line_charts$Internal$Axis$viewHorizontalLabel, system, tick, point))
				]));
	});
var $terezka$line_charts$Internal$Axis$viewHorizontalTitle = F3(
	function (system, at, _v0) {
		var title = _v0.F;
		var position = at(
			A2(title.a3, system.ci, system.gD));
		var _v1 = title.a;
		var xOffset = _v1.a;
		var yOffset = _v1.b;
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__title'),
					$terezka$line_charts$Internal$Svg$transform(
					_List_fromArray(
						[
							A3($terezka$line_charts$Internal$Svg$move, system, position.gD, position.gE),
							A2($terezka$line_charts$Internal$Svg$offset, xOffset + 15, yOffset + 5)
						])),
					$terezka$line_charts$Internal$Svg$anchorStyle(0)
				]),
			_List_fromArray(
				[title.gA]));
	});
var $terezka$line_charts$Internal$Axis$viewHorizontal = F3(
	function (system, intersection, _v0) {
		var config = _v0;
		var viewConfig = {
			e9: A2($terezka$line_charts$Internal$Axis$Intersection$getY, intersection, system),
			fi: A3($terezka$line_charts$Internal$Axis$Line$config, config.U, system.ci, system.gD),
			w: A3($terezka$line_charts$Internal$Axis$Ticks$ticks, system.ci, system.gD, config.w),
			F: $terezka$line_charts$Internal$Axis$Title$config(config.F)
		};
		var viewAxisLine = A2($terezka$line_charts$Internal$Axis$viewHorizontalAxisLine, system, viewConfig.e9);
		var at = function (x) {
			return {gD: x, gE: viewConfig.e9};
		};
		var viewTick = function (tick) {
			return A3(
				$terezka$line_charts$Internal$Axis$viewHorizontalTick,
				system,
				at(tick.a3),
				tick);
		};
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__axis--horizontal')
				]),
			_List_fromArray(
				[
					A3($terezka$line_charts$Internal$Axis$viewHorizontalTitle, system, at, viewConfig),
					viewAxisLine(viewConfig.fi),
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('chart__ticks')
						]),
					A2($elm$core$List$map, viewTick, viewConfig.w))
				]));
	});
var $terezka$line_charts$Internal$Axis$Intersection$getX = function (_v0) {
	var func = _v0;
	return A2(
		$elm$core$Basics$composeL,
		function ($) {
			return $.gD;
		},
		func);
};
var $terezka$line_charts$Internal$Axis$viewVerticalAxisLine = F3(
	function (system, axisPosition, config) {
		return A5(
			$terezka$line_charts$Internal$Svg$vertical,
			system,
			A2($terezka$line_charts$Internal$Axis$attributesLine, system, config),
			axisPosition,
			config.b6,
			config.cC);
	});
var $terezka$line_charts$Internal$Axis$viewVerticalLabel = F4(
	function (system, _v0, position, view) {
		var direction = _v0.bl;
		var length = _v0.bF;
		var xOffset = $terezka$line_charts$Internal$Axis$Tick$isPositive(direction) ? (5 + length) : ((-5) - length);
		var anchor = $terezka$line_charts$Internal$Axis$Tick$isPositive(direction) ? 0 : 2;
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$terezka$line_charts$Internal$Svg$transform(
					_List_fromArray(
						[
							A3($terezka$line_charts$Internal$Svg$move, system, position.gD, position.gE),
							A2($terezka$line_charts$Internal$Svg$offset, xOffset, 5)
						])),
					$terezka$line_charts$Internal$Svg$anchorStyle(anchor)
				]),
			_List_fromArray(
				[view]));
	});
var $terezka$line_charts$Internal$Svg$yTick = F5(
	function (system, width, userAttributes, x, y) {
		var attributes = A3(
			$terezka$line_charts$Internal$Utils$concat,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__tick'),
					$elm$svg$Svg$Attributes$stroke(
					$avh4$elm_color$Color$toCssString($terezka$line_charts$LineChart$Colors$gray))
				]),
			userAttributes,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1(
					$elm$core$String$fromFloat(
						A2($terezka$line_charts$LineChart$Coordinate$toSvgX, system, x))),
					$elm$svg$Svg$Attributes$x2(
					$elm$core$String$fromFloat(
						A2($terezka$line_charts$LineChart$Coordinate$toSvgX, system, x) - width)),
					$elm$svg$Svg$Attributes$y1(
					$elm$core$String$fromFloat(
						A2($terezka$line_charts$LineChart$Coordinate$toSvgY, system, y))),
					$elm$svg$Svg$Attributes$y2(
					$elm$core$String$fromFloat(
						A2($terezka$line_charts$LineChart$Coordinate$toSvgY, system, y)))
				]));
		return A2($elm$svg$Svg$line, attributes, _List_Nil);
	});
var $terezka$line_charts$Internal$Axis$viewVerticalTick = F3(
	function (system, point, tick) {
		var x = point.gD;
		var y = point.gE;
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__tick')
				]),
			_List_fromArray(
				[
					A5(
					$terezka$line_charts$Internal$Svg$yTick,
					system,
					$terezka$line_charts$Internal$Axis$lengthOfTick(tick),
					$terezka$line_charts$Internal$Axis$attributesTick(tick),
					x,
					y),
					A2(
					$terezka$line_charts$Internal$Utils$viewMaybe,
					tick.aZ,
					A3($terezka$line_charts$Internal$Axis$viewVerticalLabel, system, tick, point))
				]));
	});
var $terezka$line_charts$Internal$Axis$viewVerticalTitle = F3(
	function (system, at, _v0) {
		var title = _v0.F;
		var position = at(
			A2(title.a3, system.cj, system.gE));
		var _v1 = title.a;
		var xOffset = _v1.a;
		var yOffset = _v1.b;
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__title'),
					$terezka$line_charts$Internal$Svg$transform(
					_List_fromArray(
						[
							A3($terezka$line_charts$Internal$Svg$move, system, position.gD, position.gE),
							A2($terezka$line_charts$Internal$Svg$offset, xOffset + 2, yOffset - 10)
						])),
					$terezka$line_charts$Internal$Svg$anchorStyle(2)
				]),
			_List_fromArray(
				[title.gA]));
	});
var $terezka$line_charts$Internal$Axis$viewVertical = F3(
	function (system, intersection, _v0) {
		var config = _v0;
		var viewConfig = {
			e9: A2($terezka$line_charts$Internal$Axis$Intersection$getX, intersection, system),
			fi: A3($terezka$line_charts$Internal$Axis$Line$config, config.U, system.cj, system.gE),
			w: A3($terezka$line_charts$Internal$Axis$Ticks$ticks, system.cj, system.gE, config.w),
			F: $terezka$line_charts$Internal$Axis$Title$config(config.F)
		};
		var viewAxisLine = A2($terezka$line_charts$Internal$Axis$viewVerticalAxisLine, system, viewConfig.e9);
		var at = function (y) {
			return {gD: viewConfig.e9, gE: y};
		};
		var viewTick = function (tick) {
			return A3(
				$terezka$line_charts$Internal$Axis$viewVerticalTick,
				system,
				at(tick.a3),
				tick);
		};
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('chart__axis--vertical')
				]),
			_List_fromArray(
				[
					A3($terezka$line_charts$Internal$Axis$viewVerticalTitle, system, at, viewConfig),
					viewAxisLine(viewConfig.fi),
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('chart__ticks')
						]),
					A2($elm$core$List$map, viewTick, viewConfig.w))
				]));
	});
var $terezka$line_charts$LineChart$viewCustom = F2(
	function (config, lines) {
		var junkLineInfo = function (line_) {
			return _Utils_Tuple3(
				A3($terezka$line_charts$Internal$Line$color, config.fi, line_, _List_Nil),
				$terezka$line_charts$Internal$Line$label(line_),
				$terezka$line_charts$Internal$Line$data(line_));
		};
		var getJunk = A3(
			$terezka$line_charts$Internal$Junk$getLayers,
			A2($elm$core$List$map, junkLineInfo, lines),
			$terezka$line_charts$Internal$Axis$variable(config.gD),
			$terezka$line_charts$Internal$Axis$variable(config.gE));
		var data = A2($terezka$line_charts$LineChart$toDataPoints, config, lines);
		var dataAll = $elm$core$List$concat(data);
		var dataSafe = A2(
			$elm$core$List$map,
			$elm$core$List$filter(
				function ($) {
					return $.fd;
				}),
			data);
		var dataAllSafe = $elm$core$List$concat(dataSafe);
		var system = A2($terezka$line_charts$LineChart$toSystem, config, dataAllSafe);
		var viewLines = $terezka$line_charts$Internal$Line$view(
			{d5: config.d5, cB: config.eD, e8: config.e8, c0: config.fi, dD: system});
		var viewLegends = $terezka$line_charts$Internal$Legends$view(
			{
				d5: config.d5,
				ab: dataSafe,
				cB: config.eD,
				fh: config.fh,
				c0: config.fi,
				bG: lines,
				dD: system,
				gD: $terezka$line_charts$Internal$Axis$variable(config.gD),
				gE: $terezka$line_charts$Internal$Axis$variable(config.gE)
			});
		var attributes = $elm$core$List$concat(
			_List_fromArray(
				[
					A2(
					$terezka$line_charts$Internal$Container$properties,
					function ($) {
						return $.d8;
					},
					config.eu),
					A3($terezka$line_charts$Internal$Events$toContainerAttributes, dataAll, system, config.eG),
					_List_fromArray(
					[
						$terezka$line_charts$LineChart$viewBoxAttribute(system)
					])
				]));
		var addGrid = $terezka$line_charts$Internal$Junk$addBelow(
			A4($terezka$line_charts$Internal$Grid$view, system, config.gD, config.gE, config.eP));
		var junk = addGrid(
			A2(getJunk, system, config.fg));
		return A4(
			$terezka$line_charts$LineChart$container,
			config,
			system,
			junk.eZ,
			A2(
				$elm$svg$Svg$svg,
				attributes,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$defs,
						_List_Nil,
						_List_fromArray(
							[
								$terezka$line_charts$LineChart$clipPath(system)
							])),
						A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$class('chart__junk--below')
							]),
						junk.ec),
						A2(viewLines, lines, data),
						A3($terezka$line_charts$LineChart$chartAreaPlatform, config, dataAll, system),
						A3($terezka$line_charts$Internal$Axis$viewHorizontal, system, config.e9, config.gD),
						A3($terezka$line_charts$Internal$Axis$viewVertical, system, config.e9, config.gE),
						viewLegends,
						A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$class('chart__junk--above')
							]),
						junk.dU)
					])));
	});
var $author$project$History$viewCharts = F2(
	function (housingConfig, history) {
		return $mdgriffith$elm_ui$Element$html(
			A2(
				$terezka$line_charts$LineChart$viewCustom,
				$author$project$History$chartConfig(housingConfig),
				_List_fromArray(
					[
						A4($terezka$line_charts$LineChart$line, $terezka$line_charts$LineChart$Colors$pink, $terezka$line_charts$LineChart$Dots$diamond, 'Available Housing', history.eX.aA),
						A4($terezka$line_charts$LineChart$line, $terezka$line_charts$LineChart$Colors$cyan, $terezka$line_charts$LineChart$Dots$circle, 'Occupied Housing', history.eX.aG)
					])));
	});
var $author$project$Main$clickerGame = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$centerY,
				$mdgriffith$elm_ui$Element$spacing(30),
				$mdgriffith$elm_ui$Element$padding(10)
			]),
		_List_fromArray(
			[
				$author$project$Main$clickerEconomy(model),
				$author$project$Main$clickerEarth,
				$author$project$Main$clickerStore(model),
				A2(
				$author$project$History$viewCharts,
				{h: model.h, cO: model.cO, c9: $author$project$Main$Hint},
				model.aE)
			]));
};
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $jschomay$elm_narrative_engine$NarrativeEngine$Debug$debugBar = F3(
	function (msg, worldModel, _v0) {
		var lastInteractionId = _v0.bC;
		var lastMatchedRuleId = _v0.bD;
		var searchText = _v0.bY;
		var fuzzyMatch = F2(
			function (search, text) {
				return A2(
					$elm$core$String$contains,
					$elm$core$String$toLower(search),
					$elm$core$String$toLower(text));
			});
		var displayEntity = function (_v3) {
			var id = _v3.a;
			var tags = _v3.b.dF;
			var stats = _v3.b.n;
			var links = _v3.b.c2;
			return A2(
				$elm$core$String$join,
				'.',
				A2(
					$elm$core$List$filter,
					A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
					A2(
						$elm$core$List$map,
						$elm$core$String$join('.'),
						_List_fromArray(
							[
								_List_fromArray(
								[id]),
								$elm$core$Set$toList(tags),
								A2(
								$elm$core$List$map,
								function (_v1) {
									var key = _v1.a;
									var value = _v1.b;
									return A2(
										$elm$core$String$join,
										'=',
										_List_fromArray(
											[
												key,
												$elm$core$String$fromInt(value)
											]));
								},
								$elm$core$Dict$toList(stats)),
								A2(
								$elm$core$List$map,
								function (_v2) {
									var key = _v2.a;
									var value = _v2.b;
									return A2(
										$elm$core$String$join,
										'=',
										_List_fromArray(
											[key, value]));
								},
								$elm$core$Dict$toList(links))
							]))));
		};
		var displayWorldModel = A2(
			$elm$core$List$map,
			displayEntity,
			$elm$core$Dict$toList(worldModel));
		var filteredDisplayWorldModel = $elm$core$String$isEmpty(searchText) ? _List_Nil : A2(
			$elm$core$List$sortBy,
			function (text) {
				return A2(
					$elm$core$String$startsWith,
					$elm$core$String$toLower(searchText),
					$elm$core$String$toLower(text)) ? (-1) : 0;
			},
			A2(
				$elm$core$List$filter,
				fuzzyMatch(searchText),
				displayWorldModel));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'color', 'yellow'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'Courier'),
					A2($elm$html$Html$Attributes$style, 'background', 'black'),
					A2($elm$html$Html$Attributes$style, 'opacity', '0.9'),
					A2($elm$html$Html$Attributes$style, 'lineHeight', '1.5em')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Debug mode'),
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Events$onInput(msg),
							$elm$html$Html$Attributes$value(searchText),
							$elm$html$Html$Attributes$placeholder('Search world model'),
							A2($elm$html$Html$Attributes$style, 'margin', '0 10px')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text('Last triggered rule: ' + (lastInteractionId + (' - ' + lastMatchedRuleId)))
						])),
					A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'borderTop', '1px solid #333')
						]),
					A2(
						$elm$core$List$map,
						function (e) {
							return A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(e)
									]));
						},
						filteredDisplayWorldModel))
				]));
	});
var $mdgriffith$elm_ui$Element$fillPortion = $mdgriffith$elm_ui$Internal$Model$Fill;
var $author$project$Main$formatDate = function (date) {
	return $author$project$GameTime$usFormat(
		$elm$time$Time$millisToPosix(
			$PanagiotisGeorgiadis$elm_datetime$Calendar$toMillis(date)));
};
var $mdgriffith$elm_ui$Internal$Model$AsTextColumn = 5;
var $mdgriffith$elm_ui$Internal$Model$asTextColumn = 5;
var $mdgriffith$elm_ui$Internal$Model$Max = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$maximum = F2(
	function (i, l) {
		return A2($mdgriffith$elm_ui$Internal$Model$Max, i, l);
	});
var $mdgriffith$elm_ui$Internal$Model$Min = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$minimum = F2(
	function (i, l) {
		return A2($mdgriffith$elm_ui$Internal$Model$Min, i, l);
	});
var $mdgriffith$elm_ui$Element$textColumn = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asTextColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width(
					A2(
						$mdgriffith$elm_ui$Element$maximum,
						750,
						A2($mdgriffith$elm_ui$Element$minimum, 500, $mdgriffith$elm_ui$Element$fill))),
				attrs),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $author$project$Main$gameStats = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$textColumn,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$paragraph,
				_List_Nil,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(
						'Current Time: ' + $author$project$Main$formatDate(model.as))
					])),
				A2(
				$mdgriffith$elm_ui$Element$paragraph,
				_List_Nil,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(
						'Available Food: ' + $elm$core$String$fromInt(model.h.eN))
					]))
			]));
};
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = 1;
var $mdgriffith$elm_ui$Internal$Model$Layout = 0;
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	d9: $elm$core$Maybe$Nothing,
	ee: $elm$core$Maybe$Nothing,
	fX: $elm$core$Maybe$Just(
		{
			aq: 0,
			ar: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			a: _Utils_Tuple2(0, 0),
			fZ: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 0:
					var hoverable = opt.a;
					var _v4 = record.eY;
					if (_v4.$ === 1) {
						return _Utils_update(
							record,
							{
								eY: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 1:
					var focusStyle = opt.a;
					var _v5 = record.eM;
					if (_v5.$ === 1) {
						return _Utils_update(
							record,
							{
								eM: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.fo;
					if (_v6.$ === 1) {
						return _Utils_update(
							record,
							{
								fo: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			eM: function () {
				var _v0 = record.eM;
				if (_v0.$ === 1) {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			eY: function () {
				var _v1 = record.eY;
				if (_v1.$ === 1) {
					return 1;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			fo: function () {
				var _v2 = record.fo;
				if (_v2.$ === 1) {
					return 0;
				} else {
					var actualMode = _v2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			$elm$core$List$foldr,
			combine,
			{eM: $elm$core$Maybe$Nothing, eY: $elm$core$Maybe$Nothing, fo: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 0:
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 1:
				var styles = el.a.dA;
				var html = el.a.eZ;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 2:
				var text = el.a;
				return $mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return $mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _v0 = options.fo;
			if (_v0 === 1) {
				return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 1};
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 3, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
var $elm$core$String$words = _String_words;
var $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 0:
						return 'serif';
					case 1:
						return 'sans-serif';
					case 2:
						return 'monospace';
					case 3:
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 4:
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.aF;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
				}
			}());
	});
var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			$mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			$mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontSize,
			$mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				$mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var $mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_v0, attrs, child) {
		var options = _v0.fH;
		return A3(
			$mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							[$mdgriffith$elm_ui$Internal$Style$classes.fQ, $mdgriffith$elm_ui$Internal$Style$classes.d4, $mdgriffith$elm_ui$Internal$Style$classes.fY]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith(
	{fH: _List_Nil});
var $mdgriffith$elm_ui$Internal$Model$Top = 0;
var $mdgriffith$elm_ui$Element$alignTop = $mdgriffith$elm_ui$Internal$Model$AlignY(0);
var $author$project$Main$storyColumn = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$textColumn,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$padding(10),
				$mdgriffith$elm_ui$Element$alignTop
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$paragraph,
				_List_Nil,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(model.aK)
					]))
			]));
};
var $author$project$Main$view = function (model) {
	var currentLocation = A2(
		$elm$core$Maybe$withDefault,
		'ERROR getting current location',
		A3($jschomay$elm_narrative_engine$NarrativeEngine$Core$WorldModel$getLink, 'PLAYER', 'current_location', model.g));
	return A2(
		$mdgriffith$elm_ui$Element$layout,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$centerX,
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$fillPortion(3))
			]),
		A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$spacing(10)
				]),
			_Utils_ap(
				function () {
					var _v0 = model.G;
					if (!_v0.$) {
						var debugState = _v0.a;
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Element$html(
								A3($jschomay$elm_narrative_engine$NarrativeEngine$Debug$debugBar, $author$project$Main$UpdateDebugSearchText, model.g, debugState))
							]);
					} else {
						return _List_Nil;
					}
				}(),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Region$heading(1)
							]),
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text(
								'You are currently located in the ' + A2($author$project$Main$getName, currentLocation, model.g))
							])),
						A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Region$heading(2)
							]),
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text(
								A3(
									$author$project$Main$getDescription,
									A3($author$project$Main$makeConfig, currentLocation, currentLocation, model),
									currentLocation,
									model.g))
							])),
						A2(
						$mdgriffith$elm_ui$Element$row,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$spacing(10)
							]),
						_List_fromArray(
							[
								$author$project$Main$choiceColumn(model),
								$author$project$Main$storyColumn(model)
							])),
						$author$project$Main$clickerGame(model),
						$author$project$Main$gameStats(model)
					]))));
};
var $author$project$Main$viewPage = F2(
	function (parsedData, page) {
		switch (page.$) {
			case 1:
				return {
					bh: _List_fromArray(
						[
							$elm$html$Html$text('Failed to boot game.')
						]),
					F: 'Failed to boot'
				};
			case 0:
				return {
					bh: _List_fromArray(
						[
							$elm$html$Html$text('Loading...')
						]),
					F: 'Game Initializing'
				};
			default:
				var model = page.a;
				return {
					bh: _List_fromArray(
						[
							function () {
							if (!parsedData.$) {
								return $author$project$Main$view(model);
							} else {
								var errors = parsedData.a;
								return $jschomay$elm_narrative_engine$NarrativeEngine$Syntax$Helpers$parseErrorsView(errors);
							}
						}()
						]),
					F: 'Leader Game'
				};
		}
	});
var $author$project$Main$main = function () {
	var addExtraRuleFields = F2(
		function (_v3, rule) {
			return rule;
		});
	var addExtraEntityFields = F2(
		function (_v1, _v2) {
			var name = _v1.aF;
			var description = _v1.aC;
			var tags = _v2.dF;
			var stats = _v2.n;
			var links = _v2.c2;
			return {aC: description, c2: links, aF: name, n: stats, dF: tags};
		});
	var parsedData = A4(
		$elm$core$Result$map3,
		F3(
			function (parsedInitialWorldModel, _v0, parsedRules) {
				return _Utils_Tuple2(parsedInitialWorldModel, parsedRules);
			}),
		A2($jschomay$elm_narrative_engine$NarrativeEngine$Syntax$EntityParser$parseMany, addExtraEntityFields, $author$project$Main$initialWorldModelSpec),
		$jschomay$elm_narrative_engine$NarrativeEngine$Syntax$NarrativeParser$parseMany($author$project$Main$narrative_content),
		A2($jschomay$elm_narrative_engine$NarrativeEngine$Syntax$RuleParser$parseRules, addExtraRuleFields, $author$project$Main$rulesSpec));
	return $elm$browser$Browser$document(
		{
			e2: function (flags) {
				return A2(
					$author$project$Main$initialPage,
					A2($elm$json$Json$Decode$decodeValue, $author$project$Main$decodeFlags, flags),
					A2(
						$elm$core$Result$withDefault,
						$elm$core$Dict$empty,
						A2($elm$core$Result$map, $elm$core$Tuple$first, parsedData)));
			},
			f6: $author$project$Main$subscriptions,
			gy: $author$project$Main$update(
				A2(
					$elm$core$Result$withDefault,
					$elm$core$Dict$empty,
					A2($elm$core$Result$map, $elm$core$Tuple$second, parsedData))),
			gA: $author$project$Main$viewPage(parsedData)
		});
}();
_Platform_export({'Main':{'init':$author$project$Main$main($elm$json$Json$Decode$value)(0)}});}(this));