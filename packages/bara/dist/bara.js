(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bara", [], factory);
	else if(typeof exports === 'object')
		exports["bara"] = factory();
	else
		root["bara"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bara = __webpack_require__(2);
const { register, useStream, useTrigger, useEvent, useCondition, useAction, } = bara;
exports.register = register;
exports.useStream = useStream;
exports.useTrigger = useTrigger;
exports.useEvent = useEvent;
exports.useCondition = useCondition;
exports.useAction = useAction;
exports.default = bara;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));
//# sourceMappingURL=index.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const xstream_1 = __webpack_require__(4);
function Bara() {
    const streams = [];
    const triggers = {};
    /**
     * Bootstrap Bara application.
     */
    function bootstrap(app) {
        app();
    }
    function isStreamRegistered({ name }) {
        return streams.filter(s => s[0] === name).length > 0;
    }
    return {
        // Bara entrypoint
        register: (app) => {
            bootstrap(app);
        },
        // Below hooks must be called in main Bara Application
        useStream: (streamConfig, config) => {
            const slugName = streamConfig.name; // TODO need to be slugified
            let stream$;
            if (!isStreamRegistered(streamConfig)) {
                // Construct a stream object for consumer
                stream$ = xstream_1.default.create({
                    start: listener => {
                        const emit = (eventType, payload) => {
                            listener.next({ eventType, payload });
                        };
                        const error = listener.error;
                        const done = listener.complete;
                        streamConfig.setup({ emit, error, done });
                    },
                    stop: () => { },
                });
                // Assign to public stream registry
                const eventTypes = streamConfig.eventTypes;
                streams.push([
                    slugName,
                    {
                        eventTypes,
                        config: streamConfig,
                        stream: stream$,
                    },
                ]);
                // Map the stream event with app source stream!
            }
            else {
                stream$ = streams[slugName];
                console.warn(`[Bara Stream] Warning: The stream ${slugName} has been duplicate registered, please remove redundant code!`);
            }
            // This return allow multi forking for down stream
            return [stream$];
        },
        useTrigger: (triggerConfig) => {
            const slugName = triggerConfig.name; // TODO need to be slugified
            if (!Boolean(slugName in triggers)) {
                triggers[slugName] = {
                    config: triggerConfig,
                };
                triggers[slugName].config.event(slugName);
            }
            else {
                throw new Error(`[Bara Trigger] Error: Duplicate trigger name ${slugName} in the registry, please specify different name!`);
            }
        },
        // Below hooks must be used in a Bara Trigger
        useEvent: (eventType, config) => (triggerName) => {
            // Find existing stream based on event type
            const currentTrigger = triggers[triggerName];
            const upStreamRegistry = streams.find(s => {
                if (s && s[1].eventTypes) {
                    return s[1].eventTypes.indexOf(eventType) > -1;
                }
                else {
                    throw new Error(`[Bara Event] Could not find any event type of ${eventType} from streams: ${JSON.stringify(streams)}`);
                }
            });
            if (upStreamRegistry) {
                console.debug(`[Bara Event] Found stream ${upStreamRegistry[0]} of event types ${eventType}`);
                const newStream = upStreamRegistry[1].stream.filter(data => {
                    if ('condition' in currentTrigger.config) {
                        return currentTrigger.config.condition(data);
                    }
                    return true;
                });
                const eventStream = newStream.subscribe({
                    next: payload => {
                        currentTrigger.config.action(payload);
                    },
                });
            }
            else {
                console.warn(`[Bara Event] Not found any stream that will emit event type: ${eventType}`);
            }
            console.debug(`[Bara Event] Registered ${eventType} from ${triggerName}`);
        },
        useCondition: (conditionFunc) => (triggeringEvent) => conditionFunc(triggeringEvent),
        useAction: (actionFunc) => (triggeringEvent) => {
            actionFunc(triggeringEvent);
        },
    };
}
const { register, useStream, useTrigger, useEvent, useCondition, useAction, } = Bara();
exports.register = register;
exports.useStream = useStream;
exports.useTrigger = useTrigger;
exports.useEvent = useEvent;
exports.useCondition = useCondition;
exports.useAction = useAction;
//# sourceMappingURL=core.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var symbol_observable_1 = __webpack_require__(5);
var NO = {};
exports.NO = NO;
function noop() { }
function cp(a) {
    var l = a.length;
    var b = Array(l);
    for (var i = 0; i < l; ++i)
        b[i] = a[i];
    return b;
}
function and(f1, f2) {
    return function andFn(t) {
        return f1(t) && f2(t);
    };
}
function _try(c, t, u) {
    try {
        return c.f(t);
    }
    catch (e) {
        u._e(e);
        return NO;
    }
}
var NO_IL = {
    _n: noop,
    _e: noop,
    _c: noop,
};
exports.NO_IL = NO_IL;
// mutates the input
function internalizeProducer(producer) {
    producer._start = function _start(il) {
        il.next = il._n;
        il.error = il._e;
        il.complete = il._c;
        this.start(il);
    };
    producer._stop = producer.stop;
}
var StreamSub = /** @class */ (function () {
    function StreamSub(_stream, _listener) {
        this._stream = _stream;
        this._listener = _listener;
    }
    StreamSub.prototype.unsubscribe = function () {
        this._stream._remove(this._listener);
    };
    return StreamSub;
}());
var Observer = /** @class */ (function () {
    function Observer(_listener) {
        this._listener = _listener;
    }
    Observer.prototype.next = function (value) {
        this._listener._n(value);
    };
    Observer.prototype.error = function (err) {
        this._listener._e(err);
    };
    Observer.prototype.complete = function () {
        this._listener._c();
    };
    return Observer;
}());
var FromObservable = /** @class */ (function () {
    function FromObservable(observable) {
        this.type = 'fromObservable';
        this.ins = observable;
        this.active = false;
    }
    FromObservable.prototype._start = function (out) {
        this.out = out;
        this.active = true;
        this._sub = this.ins.subscribe(new Observer(out));
        if (!this.active)
            this._sub.unsubscribe();
    };
    FromObservable.prototype._stop = function () {
        if (this._sub)
            this._sub.unsubscribe();
        this.active = false;
    };
    return FromObservable;
}());
var Merge = /** @class */ (function () {
    function Merge(insArr) {
        this.type = 'merge';
        this.insArr = insArr;
        this.out = NO;
        this.ac = 0;
    }
    Merge.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var L = s.length;
        this.ac = L;
        for (var i = 0; i < L; i++)
            s[i]._add(this);
    };
    Merge.prototype._stop = function () {
        var s = this.insArr;
        var L = s.length;
        for (var i = 0; i < L; i++)
            s[i]._remove(this);
        this.out = NO;
    };
    Merge.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    Merge.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Merge.prototype._c = function () {
        if (--this.ac <= 0) {
            var u = this.out;
            if (u === NO)
                return;
            u._c();
        }
    };
    return Merge;
}());
var CombineListener = /** @class */ (function () {
    function CombineListener(i, out, p) {
        this.i = i;
        this.out = out;
        this.p = p;
        p.ils.push(this);
    }
    CombineListener.prototype._n = function (t) {
        var p = this.p, out = this.out;
        if (out === NO)
            return;
        if (p.up(t, this.i)) {
            var a = p.vals;
            var l = a.length;
            var b = Array(l);
            for (var i = 0; i < l; ++i)
                b[i] = a[i];
            out._n(b);
        }
    };
    CombineListener.prototype._e = function (err) {
        var out = this.out;
        if (out === NO)
            return;
        out._e(err);
    };
    CombineListener.prototype._c = function () {
        var p = this.p;
        if (p.out === NO)
            return;
        if (--p.Nc === 0)
            p.out._c();
    };
    return CombineListener;
}());
var Combine = /** @class */ (function () {
    function Combine(insArr) {
        this.type = 'combine';
        this.insArr = insArr;
        this.out = NO;
        this.ils = [];
        this.Nc = this.Nn = 0;
        this.vals = [];
    }
    Combine.prototype.up = function (t, i) {
        var v = this.vals[i];
        var Nn = !this.Nn ? 0 : v === NO ? --this.Nn : this.Nn;
        this.vals[i] = t;
        return Nn === 0;
    };
    Combine.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var n = this.Nc = this.Nn = s.length;
        var vals = this.vals = new Array(n);
        if (n === 0) {
            out._n([]);
            out._c();
        }
        else {
            for (var i = 0; i < n; i++) {
                vals[i] = NO;
                s[i]._add(new CombineListener(i, out, this));
            }
        }
    };
    Combine.prototype._stop = function () {
        var s = this.insArr;
        var n = s.length;
        var ils = this.ils;
        for (var i = 0; i < n; i++)
            s[i]._remove(ils[i]);
        this.out = NO;
        this.ils = [];
        this.vals = [];
    };
    return Combine;
}());
var FromArray = /** @class */ (function () {
    function FromArray(a) {
        this.type = 'fromArray';
        this.a = a;
    }
    FromArray.prototype._start = function (out) {
        var a = this.a;
        for (var i = 0, n = a.length; i < n; i++)
            out._n(a[i]);
        out._c();
    };
    FromArray.prototype._stop = function () {
    };
    return FromArray;
}());
var FromPromise = /** @class */ (function () {
    function FromPromise(p) {
        this.type = 'fromPromise';
        this.on = false;
        this.p = p;
    }
    FromPromise.prototype._start = function (out) {
        var prod = this;
        this.on = true;
        this.p.then(function (v) {
            if (prod.on) {
                out._n(v);
                out._c();
            }
        }, function (e) {
            out._e(e);
        }).then(noop, function (err) {
            setTimeout(function () { throw err; });
        });
    };
    FromPromise.prototype._stop = function () {
        this.on = false;
    };
    return FromPromise;
}());
var Periodic = /** @class */ (function () {
    function Periodic(period) {
        this.type = 'periodic';
        this.period = period;
        this.intervalID = -1;
        this.i = 0;
    }
    Periodic.prototype._start = function (out) {
        var self = this;
        function intervalHandler() { out._n(self.i++); }
        this.intervalID = setInterval(intervalHandler, this.period);
    };
    Periodic.prototype._stop = function () {
        if (this.intervalID !== -1)
            clearInterval(this.intervalID);
        this.intervalID = -1;
        this.i = 0;
    };
    return Periodic;
}());
var Debug = /** @class */ (function () {
    function Debug(ins, arg) {
        this.type = 'debug';
        this.ins = ins;
        this.out = NO;
        this.s = noop;
        this.l = '';
        if (typeof arg === 'string')
            this.l = arg;
        else if (typeof arg === 'function')
            this.s = arg;
    }
    Debug.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Debug.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Debug.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var s = this.s, l = this.l;
        if (s !== noop) {
            try {
                s(t);
            }
            catch (e) {
                u._e(e);
            }
        }
        else if (l)
            console.log(l + ':', t);
        else
            console.log(t);
        u._n(t);
    };
    Debug.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Debug.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Debug;
}());
var Drop = /** @class */ (function () {
    function Drop(max, ins) {
        this.type = 'drop';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.dropped = 0;
    }
    Drop.prototype._start = function (out) {
        this.out = out;
        this.dropped = 0;
        this.ins._add(this);
    };
    Drop.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Drop.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        if (this.dropped++ >= this.max)
            u._n(t);
    };
    Drop.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Drop.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Drop;
}());
var EndWhenListener = /** @class */ (function () {
    function EndWhenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    EndWhenListener.prototype._n = function () {
        this.op.end();
    };
    EndWhenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    EndWhenListener.prototype._c = function () {
        this.op.end();
    };
    return EndWhenListener;
}());
var EndWhen = /** @class */ (function () {
    function EndWhen(o, ins) {
        this.type = 'endWhen';
        this.ins = ins;
        this.out = NO;
        this.o = o;
        this.oil = NO_IL;
    }
    EndWhen.prototype._start = function (out) {
        this.out = out;
        this.o._add(this.oil = new EndWhenListener(out, this));
        this.ins._add(this);
    };
    EndWhen.prototype._stop = function () {
        this.ins._remove(this);
        this.o._remove(this.oil);
        this.out = NO;
        this.oil = NO_IL;
    };
    EndWhen.prototype.end = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    EndWhen.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    EndWhen.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    EndWhen.prototype._c = function () {
        this.end();
    };
    return EndWhen;
}());
var Filter = /** @class */ (function () {
    function Filter(passes, ins) {
        this.type = 'filter';
        this.ins = ins;
        this.out = NO;
        this.f = passes;
    }
    Filter.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Filter.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Filter.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO || !r)
            return;
        u._n(t);
    };
    Filter.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Filter.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Filter;
}());
var FlattenListener = /** @class */ (function () {
    function FlattenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    FlattenListener.prototype._n = function (t) {
        this.out._n(t);
    };
    FlattenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    FlattenListener.prototype._c = function () {
        this.op.inner = NO;
        this.op.less();
    };
    return FlattenListener;
}());
var Flatten = /** @class */ (function () {
    function Flatten(ins) {
        this.type = 'flatten';
        this.ins = ins;
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    }
    Flatten.prototype._start = function (out) {
        this.out = out;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
        this.ins._add(this);
    };
    Flatten.prototype._stop = function () {
        this.ins._remove(this);
        if (this.inner !== NO)
            this.inner._remove(this.il);
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    };
    Flatten.prototype.less = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (!this.open && this.inner === NO)
            u._c();
    };
    Flatten.prototype._n = function (s) {
        var u = this.out;
        if (u === NO)
            return;
        var _a = this, inner = _a.inner, il = _a.il;
        if (inner !== NO && il !== NO_IL)
            inner._remove(il);
        (this.inner = s)._add(this.il = new FlattenListener(u, this));
    };
    Flatten.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Flatten.prototype._c = function () {
        this.open = false;
        this.less();
    };
    return Flatten;
}());
var Fold = /** @class */ (function () {
    function Fold(f, seed, ins) {
        var _this = this;
        this.type = 'fold';
        this.ins = ins;
        this.out = NO;
        this.f = function (t) { return f(_this.acc, t); };
        this.acc = this.seed = seed;
    }
    Fold.prototype._start = function (out) {
        this.out = out;
        this.acc = this.seed;
        out._n(this.acc);
        this.ins._add(this);
    };
    Fold.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.acc = this.seed;
    };
    Fold.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(this.acc = r);
    };
    Fold.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Fold.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Fold;
}());
var Last = /** @class */ (function () {
    function Last(ins) {
        this.type = 'last';
        this.ins = ins;
        this.out = NO;
        this.has = false;
        this.val = NO;
    }
    Last.prototype._start = function (out) {
        this.out = out;
        this.has = false;
        this.ins._add(this);
    };
    Last.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.val = NO;
    };
    Last.prototype._n = function (t) {
        this.has = true;
        this.val = t;
    };
    Last.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Last.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (this.has) {
            u._n(this.val);
            u._c();
        }
        else
            u._e(new Error('last() failed because input stream completed'));
    };
    return Last;
}());
var MapOp = /** @class */ (function () {
    function MapOp(project, ins) {
        this.type = 'map';
        this.ins = ins;
        this.out = NO;
        this.f = project;
    }
    MapOp.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    MapOp.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    MapOp.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(r);
    };
    MapOp.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    MapOp.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return MapOp;
}());
var Remember = /** @class */ (function () {
    function Remember(ins) {
        this.type = 'remember';
        this.ins = ins;
        this.out = NO;
    }
    Remember.prototype._start = function (out) {
        this.out = out;
        this.ins._add(out);
    };
    Remember.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return Remember;
}());
var ReplaceError = /** @class */ (function () {
    function ReplaceError(replacer, ins) {
        this.type = 'replaceError';
        this.ins = ins;
        this.out = NO;
        this.f = replacer;
    }
    ReplaceError.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    ReplaceError.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    ReplaceError.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    ReplaceError.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        try {
            this.ins._remove(this);
            (this.ins = this.f(err))._add(this);
        }
        catch (e) {
            u._e(e);
        }
    };
    ReplaceError.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return ReplaceError;
}());
var StartWith = /** @class */ (function () {
    function StartWith(ins, val) {
        this.type = 'startWith';
        this.ins = ins;
        this.out = NO;
        this.val = val;
    }
    StartWith.prototype._start = function (out) {
        this.out = out;
        this.out._n(this.val);
        this.ins._add(out);
    };
    StartWith.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return StartWith;
}());
var Take = /** @class */ (function () {
    function Take(max, ins) {
        this.type = 'take';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.taken = 0;
    }
    Take.prototype._start = function (out) {
        this.out = out;
        this.taken = 0;
        if (this.max <= 0)
            out._c();
        else
            this.ins._add(this);
    };
    Take.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Take.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var m = ++this.taken;
        if (m < this.max)
            u._n(t);
        else if (m === this.max) {
            u._n(t);
            u._c();
        }
    };
    Take.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Take.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Take;
}());
var Stream = /** @class */ (function () {
    function Stream(producer) {
        this._prod = producer || NO;
        this._ils = [];
        this._stopID = NO;
        this._dl = NO;
        this._d = false;
        this._target = NO;
        this._err = NO;
    }
    Stream.prototype._n = function (t) {
        var a = this._ils;
        var L = a.length;
        if (this._d)
            this._dl._n(t);
        if (L == 1)
            a[0]._n(t);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._n(t);
        }
    };
    Stream.prototype._e = function (err) {
        if (this._err !== NO)
            return;
        this._err = err;
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._e(err);
        if (L == 1)
            a[0]._e(err);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._e(err);
        }
        if (!this._d && L == 0)
            throw this._err;
    };
    Stream.prototype._c = function () {
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._c();
        if (L == 1)
            a[0]._c();
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._c();
        }
    };
    Stream.prototype._x = function () {
        if (this._ils.length === 0)
            return;
        if (this._prod !== NO)
            this._prod._stop();
        this._err = NO;
        this._ils = [];
    };
    Stream.prototype._stopNow = function () {
        // WARNING: code that calls this method should
        // first check if this._prod is valid (not `NO`)
        this._prod._stop();
        this._err = NO;
        this._stopID = NO;
    };
    Stream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1)
            return;
        if (this._stopID !== NO) {
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    Stream.prototype._remove = function (il) {
        var _this = this;
        var ta = this._target;
        if (ta !== NO)
            return ta._remove(il);
        var a = this._ils;
        var i = a.indexOf(il);
        if (i > -1) {
            a.splice(i, 1);
            if (this._prod !== NO && a.length <= 0) {
                this._err = NO;
                this._stopID = setTimeout(function () { return _this._stopNow(); });
            }
            else if (a.length === 1) {
                this._pruneCycles();
            }
        }
    };
    // If all paths stemming from `this` stream eventually end at `this`
    // stream, then we remove the single listener of `this` stream, to
    // force it to end its execution and dispose resources. This method
    // assumes as a precondition that this._ils has just one listener.
    Stream.prototype._pruneCycles = function () {
        if (this._hasNoSinks(this, []))
            this._remove(this._ils[0]);
    };
    // Checks whether *there is no* path starting from `x` that leads to an end
    // listener (sink) in the stream graph, following edges A->B where B is a
    // listener of A. This means these paths constitute a cycle somehow. Is given
    // a trace of all visited nodes so far.
    Stream.prototype._hasNoSinks = function (x, trace) {
        if (trace.indexOf(x) !== -1)
            return true;
        else if (x.out === this)
            return true;
        else if (x.out && x.out !== NO)
            return this._hasNoSinks(x.out, trace.concat(x));
        else if (x._ils) {
            for (var i = 0, N = x._ils.length; i < N; i++)
                if (!this._hasNoSinks(x._ils[i], trace.concat(x)))
                    return false;
            return true;
        }
        else
            return false;
    };
    Stream.prototype.ctor = function () {
        return this instanceof MemoryStream ? MemoryStream : Stream;
    };
    /**
     * Adds a Listener to the Stream.
     *
     * @param {Listener} listener
     */
    Stream.prototype.addListener = function (listener) {
        listener._n = listener.next || noop;
        listener._e = listener.error || noop;
        listener._c = listener.complete || noop;
        this._add(listener);
    };
    /**
     * Removes a Listener from the Stream, assuming the Listener was added to it.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.removeListener = function (listener) {
        this._remove(listener);
    };
    /**
     * Adds a Listener to the Stream returning a Subscription to remove that
     * listener.
     *
     * @param {Listener} listener
     * @returns {Subscription}
     */
    Stream.prototype.subscribe = function (listener) {
        this.addListener(listener);
        return new StreamSub(this, listener);
    };
    /**
     * Add interop between most.js and RxJS 5
     *
     * @returns {Stream}
     */
    Stream.prototype[symbol_observable_1.default] = function () {
        return this;
    };
    /**
     * Creates a new Stream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {Stream}
     */
    Stream.create = function (producer) {
        if (producer) {
            if (typeof producer.start !== 'function'
                || typeof producer.stop !== 'function')
                throw new Error('producer requires both start and stop functions');
            internalizeProducer(producer); // mutates the input
        }
        return new Stream(producer);
    };
    /**
     * Creates a new MemoryStream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {MemoryStream}
     */
    Stream.createWithMemory = function (producer) {
        if (producer)
            internalizeProducer(producer); // mutates the input
        return new MemoryStream(producer);
    };
    /**
     * Creates a Stream that does nothing when started. It never emits any event.
     *
     * Marble diagram:
     *
     * ```text
     *          never
     * -----------------------
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.never = function () {
        return new Stream({ _start: noop, _stop: noop });
    };
    /**
     * Creates a Stream that immediately emits the "complete" notification when
     * started, and that's it.
     *
     * Marble diagram:
     *
     * ```text
     * empty
     * -|
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.empty = function () {
        return new Stream({
            _start: function (il) { il._c(); },
            _stop: noop,
        });
    };
    /**
     * Creates a Stream that immediately emits an "error" notification with the
     * value you passed as the `error` argument when the stream starts, and that's
     * it.
     *
     * Marble diagram:
     *
     * ```text
     * throw(X)
     * -X
     * ```
     *
     * @factory true
     * @param error The error event to emit on the created stream.
     * @return {Stream}
     */
    Stream.throw = function (error) {
        return new Stream({
            _start: function (il) { il._e(error); },
            _stop: noop,
        });
    };
    /**
     * Creates a stream from an Array, Promise, or an Observable.
     *
     * @factory true
     * @param {Array|PromiseLike|Observable} input The input to make a stream from.
     * @return {Stream}
     */
    Stream.from = function (input) {
        if (typeof input[symbol_observable_1.default] === 'function')
            return Stream.fromObservable(input);
        else if (typeof input.then === 'function')
            return Stream.fromPromise(input);
        else if (Array.isArray(input))
            return Stream.fromArray(input);
        throw new TypeError("Type of input to from() must be an Array, Promise, or Observable");
    };
    /**
     * Creates a Stream that immediately emits the arguments that you give to
     * *of*, then completes.
     *
     * Marble diagram:
     *
     * ```text
     * of(1,2,3)
     * 123|
     * ```
     *
     * @factory true
     * @param a The first value you want to emit as an event on the stream.
     * @param b The second value you want to emit as an event on the stream. One
     * or more of these values may be given as arguments.
     * @return {Stream}
     */
    Stream.of = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return Stream.fromArray(items);
    };
    /**
     * Converts an array to a stream. The returned stream will emit synchronously
     * all the items in the array, and then complete.
     *
     * Marble diagram:
     *
     * ```text
     * fromArray([1,2,3])
     * 123|
     * ```
     *
     * @factory true
     * @param {Array} array The array to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromArray = function (array) {
        return new Stream(new FromArray(array));
    };
    /**
     * Converts a promise to a stream. The returned stream will emit the resolved
     * value of the promise, and then complete. However, if the promise is
     * rejected, the stream will emit the corresponding error.
     *
     * Marble diagram:
     *
     * ```text
     * fromPromise( ----42 )
     * -----------------42|
     * ```
     *
     * @factory true
     * @param {PromiseLike} promise The promise to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromPromise = function (promise) {
        return new Stream(new FromPromise(promise));
    };
    /**
     * Converts an Observable into a Stream.
     *
     * @factory true
     * @param {any} observable The observable to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromObservable = function (obs) {
        if (obs.endWhen)
            return obs;
        var o = typeof obs[symbol_observable_1.default] === 'function' ? obs[symbol_observable_1.default]() : obs;
        return new Stream(new FromObservable(o));
    };
    /**
     * Creates a stream that periodically emits incremental numbers, every
     * `period` milliseconds.
     *
     * Marble diagram:
     *
     * ```text
     *     periodic(1000)
     * ---0---1---2---3---4---...
     * ```
     *
     * @factory true
     * @param {number} period The interval in milliseconds to use as a rate of
     * emission.
     * @return {Stream}
     */
    Stream.periodic = function (period) {
        return new Stream(new Periodic(period));
    };
    Stream.prototype._map = function (project) {
        return new (this.ctor())(new MapOp(project, this));
    };
    /**
     * Transforms each event from the input Stream through a `project` function,
     * to get a Stream that emits those transformed events.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7------
     *    map(i => i * 10)
     * --10--30-50----70-----
     * ```
     *
     * @param {Function} project A function of type `(t: T) => U` that takes event
     * `t` of type `T` from the input Stream and produces an event of type `U`, to
     * be emitted on the output Stream.
     * @return {Stream}
     */
    Stream.prototype.map = function (project) {
        return this._map(project);
    };
    /**
     * It's like `map`, but transforms each input event to always the same
     * constant value on the output Stream.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7-----
     *       mapTo(10)
     * --10--10-10----10----
     * ```
     *
     * @param projectedValue A value to emit on the output Stream whenever the
     * input Stream emits any value.
     * @return {Stream}
     */
    Stream.prototype.mapTo = function (projectedValue) {
        var s = this.map(function () { return projectedValue; });
        var op = s._prod;
        op.type = 'mapTo';
        return s;
    };
    /**
     * Only allows events that pass the test given by the `passes` argument.
     *
     * Each event from the input stream is given to the `passes` function. If the
     * function returns `true`, the event is forwarded to the output stream,
     * otherwise it is ignored and not forwarded.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2--3-----4-----5---6--7-8--
     *     filter(i => i % 2 === 0)
     * ------2--------4---------6----8--
     * ```
     *
     * @param {Function} passes A function of type `(t: T) => boolean` that takes
     * an event from the input stream and checks if it passes, by returning a
     * boolean.
     * @return {Stream}
     */
    Stream.prototype.filter = function (passes) {
        var p = this._prod;
        if (p instanceof Filter)
            return new Stream(new Filter(and(p.f, passes), p.ins));
        return new Stream(new Filter(passes, this));
    };
    /**
     * Lets the first `amount` many events from the input stream pass to the
     * output stream, then makes the output stream complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *    take(3)
     * --a---b--c|
     * ```
     *
     * @param {number} amount How many events to allow from the input stream
     * before completing the output stream.
     * @return {Stream}
     */
    Stream.prototype.take = function (amount) {
        return new (this.ctor())(new Take(amount, this));
    };
    /**
     * Ignores the first `amount` many events from the input stream, and then
     * after that starts forwarding events from the input stream to the output
     * stream.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *       drop(3)
     * --------------d---e--
     * ```
     *
     * @param {number} amount How many events to ignore from the input stream
     * before forwarding all events from the input stream to the output stream.
     * @return {Stream}
     */
    Stream.prototype.drop = function (amount) {
        return new Stream(new Drop(amount, this));
    };
    /**
     * When the input stream completes, the output stream will emit the last event
     * emitted by the input stream, and then will also complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c--d----|
     *       last()
     * -----------------d|
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.last = function () {
        return new Stream(new Last(this));
    };
    /**
     * Prepends the given `initial` value to the sequence of events emitted by the
     * input stream. The returned stream is a MemoryStream, which means it is
     * already `remember()`'d.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3---
     *   startWith(0)
     * 0--1---2-----3---
     * ```
     *
     * @param initial The value or event to prepend.
     * @return {MemoryStream}
     */
    Stream.prototype.startWith = function (initial) {
        return new MemoryStream(new StartWith(this, initial));
    };
    /**
     * Uses another stream to determine when to complete the current stream.
     *
     * When the given `other` stream emits an event or completes, the output
     * stream will complete. Before that happens, the output stream will behaves
     * like the input stream.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3--4----5----6---
     *   endWhen( --------a--b--| )
     * ---1---2-----3--4--|
     * ```
     *
     * @param other Some other stream that is used to know when should the output
     * stream of this operator complete.
     * @return {Stream}
     */
    Stream.prototype.endWhen = function (other) {
        return new (this.ctor())(new EndWhen(other, this));
    };
    /**
     * "Folds" the stream onto itself.
     *
     * Combines events from the past throughout
     * the entire execution of the input stream, allowing you to accumulate them
     * together. It's essentially like `Array.prototype.reduce`. The returned
     * stream is a MemoryStream, which means it is already `remember()`'d.
     *
     * The output stream starts by emitting the `seed` which you give as argument.
     * Then, when an event happens on the input stream, it is combined with that
     * seed value through the `accumulate` function, and the output value is
     * emitted on the output stream. `fold` remembers that output value as `acc`
     * ("accumulator"), and then when a new input event `t` happens, `acc` will be
     * combined with that to produce the new `acc` and so forth.
     *
     * Marble diagram:
     *
     * ```text
     * ------1-----1--2----1----1------
     *   fold((acc, x) => acc + x, 3)
     * 3-----4-----5--7----8----9------
     * ```
     *
     * @param {Function} accumulate A function of type `(acc: R, t: T) => R` that
     * takes the previous accumulated value `acc` and the incoming event from the
     * input stream and produces the new accumulated value.
     * @param seed The initial accumulated value, of type `R`.
     * @return {MemoryStream}
     */
    Stream.prototype.fold = function (accumulate, seed) {
        return new MemoryStream(new Fold(accumulate, seed, this));
    };
    /**
     * Replaces an error with another stream.
     *
     * When (and if) an error happens on the input stream, instead of forwarding
     * that error to the output stream, *replaceError* will call the `replace`
     * function which returns the stream that the output stream will replicate.
     * And, in case that new stream also emits an error, `replace` will be called
     * again to get another stream to start replicating.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2-----3--4-----X
     *   replaceError( () => --10--| )
     * --1---2-----3--4--------10--|
     * ```
     *
     * @param {Function} replace A function of type `(err) => Stream` that takes
     * the error that occurred on the input stream or on the previous replacement
     * stream and returns a new stream. The output stream will behave like the
     * stream that this function returns.
     * @return {Stream}
     */
    Stream.prototype.replaceError = function (replace) {
        return new (this.ctor())(new ReplaceError(replace, this));
    };
    /**
     * Flattens a "stream of streams", handling only one nested stream at a time
     * (no concurrency).
     *
     * If the input stream is a stream that emits streams, then this operator will
     * return an output stream which is a flat stream: emits regular events. The
     * flattening happens without concurrency. It works like this: when the input
     * stream emits a nested stream, *flatten* will start imitating that nested
     * one. However, as soon as the next nested stream is emitted on the input
     * stream, *flatten* will forget the previous nested one it was imitating, and
     * will start imitating the new nested one.
     *
     * Marble diagram:
     *
     * ```text
     * --+--------+---------------
     *   \        \
     *    \       ----1----2---3--
     *    --a--b----c----d--------
     *           flatten
     * -----a--b------1----2---3--
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.flatten = function () {
        return new Stream(new Flatten(this));
    };
    /**
     * Passes the input stream to a custom operator, to produce an output stream.
     *
     * *compose* is a handy way of using an existing function in a chained style.
     * Instead of writing `outStream = f(inStream)` you can write
     * `outStream = inStream.compose(f)`.
     *
     * @param {function} operator A function that takes a stream as input and
     * returns a stream as well.
     * @return {Stream}
     */
    Stream.prototype.compose = function (operator) {
        return operator(this);
    };
    /**
     * Returns an output stream that behaves like the input stream, but also
     * remembers the most recent event that happens on the input stream, so that a
     * newly added listener will immediately receive that memorised event.
     *
     * @return {MemoryStream}
     */
    Stream.prototype.remember = function () {
        return new MemoryStream(new Remember(this));
    };
    /**
     * Returns an output stream that identically behaves like the input stream,
     * but also runs a `spy` function for each event, to help you debug your app.
     *
     * *debug* takes a `spy` function as argument, and runs that for each event
     * happening on the input stream. If you don't provide the `spy` argument,
     * then *debug* will just `console.log` each event. This helps you to
     * understand the flow of events through some operator chain.
     *
     * Please note that if the output stream has no listeners, then it will not
     * start, which means `spy` will never run because no actual event happens in
     * that case.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3-----4--
     *         debug
     * --1----2-----3-----4--
     * ```
     *
     * @param {function} labelOrSpy A string to use as the label when printing
     * debug information on the console, or a 'spy' function that takes an event
     * as argument, and does not need to return anything.
     * @return {Stream}
     */
    Stream.prototype.debug = function (labelOrSpy) {
        return new (this.ctor())(new Debug(this, labelOrSpy));
    };
    /**
     * *imitate* changes this current Stream to emit the same events that the
     * `other` given Stream does. This method returns nothing.
     *
     * This method exists to allow one thing: **circular dependency of streams**.
     * For instance, let's imagine that for some reason you need to create a
     * circular dependency where stream `first$` depends on stream `second$`
     * which in turn depends on `first$`:
     *
     * <!-- skip-example -->
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var first$ = second$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * ```
     *
     * However, that is invalid JavaScript, because `second$` is undefined
     * on the first line. This is how *imitate* can help solve it:
     *
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var secondProxy$ = xs.create();
     * var first$ = secondProxy$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * secondProxy$.imitate(second$);
     * ```
     *
     * We create `secondProxy$` before the others, so it can be used in the
     * declaration of `first$`. Then, after both `first$` and `second$` are
     * defined, we hook `secondProxy$` with `second$` with `imitate()` to tell
     * that they are "the same". `imitate` will not trigger the start of any
     * stream, it just binds `secondProxy$` and `second$` together.
     *
     * The following is an example where `imitate()` is important in Cycle.js
     * applications. A parent component contains some child components. A child
     * has an action stream which is given to the parent to define its state:
     *
     * <!-- skip-example -->
     * ```js
     * const childActionProxy$ = xs.create();
     * const parent = Parent({...sources, childAction$: childActionProxy$});
     * const childAction$ = parent.state$.map(s => s.child.action$).flatten();
     * childActionProxy$.imitate(childAction$);
     * ```
     *
     * Note, though, that **`imitate()` does not support MemoryStreams**. If we
     * would attempt to imitate a MemoryStream in a circular dependency, we would
     * either get a race condition (where the symptom would be "nothing happens")
     * or an infinite cyclic emission of values. It's useful to think about
     * MemoryStreams as cells in a spreadsheet. It doesn't make any sense to
     * define a spreadsheet cell `A1` with a formula that depends on `B1` and
     * cell `B1` defined with a formula that depends on `A1`.
     *
     * If you find yourself wanting to use `imitate()` with a
     * MemoryStream, you should rework your code around `imitate()` to use a
     * Stream instead. Look for the stream in the circular dependency that
     * represents an event stream, and that would be a candidate for creating a
     * proxy Stream which then imitates the target Stream.
     *
     * @param {Stream} target The other stream to imitate on the current one. Must
     * not be a MemoryStream.
     */
    Stream.prototype.imitate = function (target) {
        if (target instanceof MemoryStream)
            throw new Error('A MemoryStream was given to imitate(), but it only ' +
                'supports a Stream. Read more about this restriction here: ' +
                'https://github.com/staltz/xstream#faq');
        this._target = target;
        for (var ils = this._ils, N = ils.length, i = 0; i < N; i++)
            target._add(ils[i]);
        this._ils = [];
    };
    /**
     * Forces the Stream to emit the given value to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param value The "next" value you want to broadcast to all listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendNext = function (value) {
        this._n(value);
    };
    /**
     * Forces the Stream to emit the given error to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param {any} error The error you want to broadcast to all the listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendError = function (error) {
        this._e(error);
    };
    /**
     * Forces the Stream to emit the "completed" event to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     */
    Stream.prototype.shamefullySendComplete = function () {
        this._c();
    };
    /**
     * Adds a "debug" listener to the stream. There can only be one debug
     * listener, that's why this is 'setDebugListener'. To remove the debug
     * listener, just call setDebugListener(null).
     *
     * A debug listener is like any other listener. The only difference is that a
     * debug listener is "stealthy": its presence/absence does not trigger the
     * start/stop of the stream (or the producer inside the stream). This is
     * useful so you can inspect what is going on without changing the behavior
     * of the program. If you have an idle stream and you add a normal listener to
     * it, the stream will start executing. But if you set a debug listener on an
     * idle stream, it won't start executing (not until the first normal listener
     * is added).
     *
     * As the name indicates, we don't recommend using this method to build app
     * logic. In fact, in most cases the debug operator works just fine. Only use
     * this one if you know what you're doing.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.setDebugListener = function (listener) {
        if (!listener) {
            this._d = false;
            this._dl = NO;
        }
        else {
            this._d = true;
            listener._n = listener.next || noop;
            listener._e = listener.error || noop;
            listener._c = listener.complete || noop;
            this._dl = listener;
        }
    };
    /**
     * Blends multiple streams together, emitting events from all of them
     * concurrently.
     *
     * *merge* takes multiple streams as arguments, and creates a stream that
     * behaves like each of the argument streams, in parallel.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3--------4---
     * ----a-----b----c---d------
     *            merge
     * --1-a--2--b--3-c---d--4---
     * ```
     *
     * @factory true
     * @param {Stream} stream1 A stream to merge together with other streams.
     * @param {Stream} stream2 A stream to merge together with other streams. Two
     * or more streams may be given as arguments.
     * @return {Stream}
     */
    Stream.merge = function merge() {
        var streams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            streams[_i] = arguments[_i];
        }
        return new Stream(new Merge(streams));
    };
    /**
     * Combines multiple input streams together to return a stream whose events
     * are arrays that collect the latest events from each input stream.
     *
     * *combine* internally remembers the most recent event from each of the input
     * streams. When any of the input streams emits an event, that event together
     * with all the other saved events are combined into an array. That array will
     * be emitted on the output stream. It's essentially a way of joining together
     * the events from multiple streams.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3--------4---
     * ----a-----b-----c--d------
     *          combine
     * ----1a-2a-2b-3b-3c-3d-4d--
     * ```
     *
     * @factory true
     * @param {Stream} stream1 A stream to combine together with other streams.
     * @param {Stream} stream2 A stream to combine together with other streams.
     * Multiple streams, not just two, may be given as arguments.
     * @return {Stream}
     */
    Stream.combine = function combine() {
        var streams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            streams[_i] = arguments[_i];
        }
        return new Stream(new Combine(streams));
    };
    return Stream;
}());
exports.Stream = Stream;
var MemoryStream = /** @class */ (function (_super) {
    __extends(MemoryStream, _super);
    function MemoryStream(producer) {
        var _this = _super.call(this, producer) || this;
        _this._has = false;
        return _this;
    }
    MemoryStream.prototype._n = function (x) {
        this._v = x;
        this._has = true;
        _super.prototype._n.call(this, x);
    };
    MemoryStream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1) {
            if (this._has)
                il._n(this._v);
            return;
        }
        if (this._stopID !== NO) {
            if (this._has)
                il._n(this._v);
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else if (this._has)
            il._n(this._v);
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    MemoryStream.prototype._stopNow = function () {
        this._has = false;
        _super.prototype._stopNow.call(this);
    };
    MemoryStream.prototype._x = function () {
        this._has = false;
        _super.prototype._x.call(this);
    };
    MemoryStream.prototype.map = function (project) {
        return this._map(project);
    };
    MemoryStream.prototype.mapTo = function (projectedValue) {
        return _super.prototype.mapTo.call(this, projectedValue);
    };
    MemoryStream.prototype.take = function (amount) {
        return _super.prototype.take.call(this, amount);
    };
    MemoryStream.prototype.endWhen = function (other) {
        return _super.prototype.endWhen.call(this, other);
    };
    MemoryStream.prototype.replaceError = function (replace) {
        return _super.prototype.replaceError.call(this, replace);
    };
    MemoryStream.prototype.remember = function () {
        return this;
    };
    MemoryStream.prototype.debug = function (labelOrSpy) {
        return _super.prototype.debug.call(this, labelOrSpy);
    };
    return MemoryStream;
}(Stream));
exports.MemoryStream = MemoryStream;
var xs = Stream;
exports.default = xs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQTZDO0FBRTdDLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztBQWdnRU4sZ0JBQUU7QUEvL0RWLFNBQVMsSUFBSSxLQUFJLENBQUM7QUFFbEIsU0FBUyxFQUFFLENBQUksQ0FBVztJQUN4QixJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ25CLElBQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsU0FBUyxHQUFHLENBQUksRUFBcUIsRUFBRSxFQUFxQjtJQUMxRCxPQUFPLFNBQVMsS0FBSyxDQUFDLENBQUk7UUFDeEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFNRCxTQUFTLElBQUksQ0FBTyxDQUFtQixFQUFFLENBQUksRUFBRSxDQUFjO0lBQzNELElBQUk7UUFDRixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDZjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDO0tBQ1g7QUFDSCxDQUFDO0FBUUQsSUFBTSxLQUFLLEdBQTBCO0lBQ25DLEVBQUUsRUFBRSxJQUFJO0lBQ1IsRUFBRSxFQUFFLElBQUk7SUFDUixFQUFFLEVBQUUsSUFBSTtD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LFVBQWEsT0FBZ0M7UUFDM0MsT0FBTyxpQkFBTSxZQUFZLFlBQUMsT0FBTyxDQUFvQixDQUFDO0lBQ3hELENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBS0QsNEJBQUssR0FBTCxVQUFNLFVBQWlEO1FBQ3JELE9BQU8saUJBQU0sS0FBSyxZQUFDLFVBQWlCLENBQW9CLENBQUM7SUFDM0QsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQXhFRCxDQUFxQyxNQUFNLEdBd0UxQztBQXhFWSxvQ0FBWTtBQTJFekIsSUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDO0FBRWxCLGtCQUFlLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkJG9ic2VydmFibGUgZnJvbSAnc3ltYm9sLW9ic2VydmFibGUnO1xuXG5jb25zdCBOTyA9IHt9O1xuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGNwPFQ+KGE6IEFycmF5PFQ+KTogQXJyYXk8VD4ge1xuICBjb25zdCBsID0gYS5sZW5ndGg7XG4gIGNvbnN0IGIgPSBBcnJheShsKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyArK2kpIGJbaV0gPSBhW2ldO1xuICByZXR1cm4gYjtcbn1cblxuZnVuY3Rpb24gYW5kPFQ+KGYxOiAodDogVCkgPT4gYm9vbGVhbiwgZjI6ICh0OiBUKSA9PiBib29sZWFuKTogKHQ6IFQpID0+IGJvb2xlYW4ge1xuICByZXR1cm4gZnVuY3Rpb24gYW5kRm4odDogVCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmMSh0KSAmJiBmMih0KTtcbiAgfTtcbn1cblxuaW50ZXJmYWNlIEZDb250YWluZXI8VCwgUj4ge1xuICBmKHQ6IFQpOiBSO1xufVxuXG5mdW5jdGlvbiBfdHJ5PFQsIFI+KGM6IEZDb250YWluZXI8VCwgUj4sIHQ6IFQsIHU6IFN0cmVhbTxhbnk+KTogUiB8IHt9IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYy5mKHQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdS5fZShlKTtcbiAgICByZXR1cm4gTk87XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbExpc3RlbmVyPFQ+IHtcbiAgX246ICh2OiBUKSA9PiB2b2lkO1xuICBfZTogKGVycjogYW55KSA9PiB2b2lkO1xuICBfYzogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgTk9fSUw6IEludGVybmFsTGlzdGVuZXI8YW55PiA9IHtcbiAgX246IG5vb3AsXG4gIF9lOiBub29wLFxuICBfYzogbm9vcCxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW50ZXJuYWxQcm9kdWNlcjxUPiB7XG4gIF9zdGFydChsaXN0ZW5lcjogSW50ZXJuYWxMaXN0ZW5lcjxUPik6IHZvaWQ7XG4gIF9zdG9wOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE91dFNlbmRlcjxUPiB7XG4gIG91dDogU3RyZWFtPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wZXJhdG9yPFQsIFI+IGV4dGVuZHMgSW50ZXJuYWxQcm9kdWNlcjxSPiwgSW50ZXJuYWxMaXN0ZW5lcjxUPiwgT3V0U2VuZGVyPFI+IHtcbiAgdHlwZTogc3RyaW5nO1xuICBpbnM6IFN0cmVhbTxUPjtcbiAgX3N0YXJ0KG91dDogU3RyZWFtPFI+KTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBZ2dyZWdhdG9yPFQsIFU+IGV4dGVuZHMgSW50ZXJuYWxQcm9kdWNlcjxVPiwgT3V0U2VuZGVyPFU+IHtcbiAgdHlwZTogc3RyaW5nO1xuICBpbnNBcnI6IEFycmF5PFN0cmVhbTxUPj47XG4gIF9zdGFydChvdXQ6IFN0cmVhbTxVPik6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjZXI8VD4ge1xuICBzdGFydDogKGxpc3RlbmVyOiBMaXN0ZW5lcjxUPikgPT4gdm9pZDtcbiAgc3RvcDogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMaXN0ZW5lcjxUPiB7XG4gIG5leHQ6ICh4OiBUKSA9PiB2b2lkO1xuICBlcnJvcjogKGVycjogYW55KSA9PiB2b2lkO1xuICBjb21wbGV0ZTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdWJzY3JpcHRpb24ge1xuICB1bnN1YnNjcmliZSgpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9ic2VydmFibGU8VD4ge1xuICBzdWJzY3JpYmUobGlzdGVuZXI6IExpc3RlbmVyPFQ+KTogU3Vic2NyaXB0aW9uO1xufVxuXG4vLyBtdXRhdGVzIHRoZSBpbnB1dFxuZnVuY3Rpb24gaW50ZXJuYWxpemVQcm9kdWNlcjxUPihwcm9kdWNlcjogUHJvZHVjZXI8VD4gJiBQYXJ0aWFsPEludGVybmFsUHJvZHVjZXI8VD4+KSB7XG4gIHByb2R1Y2VyLl9zdGFydCA9IGZ1bmN0aW9uIF9zdGFydChpbDogSW50ZXJuYWxMaXN0ZW5lcjxUPiAmIFBhcnRpYWw8TGlzdGVuZXI8VD4+KSB7XG4gICAgaWwubmV4dCA9IGlsLl9uO1xuICAgIGlsLmVycm9yID0gaWwuX2U7XG4gICAgaWwuY29tcGxldGUgPSBpbC5fYztcbiAgICB0aGlzLnN0YXJ0KGlsIGFzIExpc3RlbmVyPFQ+KTtcbiAgfTtcbiAgcHJvZHVjZXIuX3N0b3AgPSBwcm9kdWNlci5zdG9wO1xufVxuXG5jbGFzcyBTdHJlYW1TdWI8VD4gaW1wbGVtZW50cyBTdWJzY3JpcHRpb24ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zdHJlYW06IFN0cmVhbTxUPiwgcHJpdmF0ZSBfbGlzdGVuZXI6IEludGVybmFsTGlzdGVuZXI8VD4pIHt9XG5cbiAgdW5zdWJzY3JpYmUoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RyZWFtLl9yZW1vdmUodGhpcy5fbGlzdGVuZXIpO1xuICB9XG59XG5cbmNsYXNzIE9ic2VydmVyPFQ+IGltcGxlbWVudHMgTGlzdGVuZXI8VD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9saXN0ZW5lcjogSW50ZXJuYWxMaXN0ZW5lcjxUPikge31cblxuICBuZXh0KHZhbHVlOiBUKSB7XG4gICAgdGhpcy5fbGlzdGVuZXIuX24odmFsdWUpO1xuICB9XG5cbiAgZXJyb3IoZXJyOiBhbnkpIHtcbiAgICB0aGlzLl9saXN0ZW5lci5fZShlcnIpO1xuICB9XG5cbiAgY29tcGxldGUoKSB7XG4gICAgdGhpcy5fbGlzdGVuZXIuX2MoKTtcbiAgfVxufVxuXG5jbGFzcyBGcm9tT2JzZXJ2YWJsZTxUPiBpbXBsZW1lbnRzIEludGVybmFsUHJvZHVjZXI8VD4ge1xuICBwdWJsaWMgdHlwZSA9ICdmcm9tT2JzZXJ2YWJsZSc7XG4gIHB1YmxpYyBpbnM6IE9ic2VydmFibGU8VD47XG4gIHB1YmxpYyBvdXQ/OiBTdHJlYW08VD47XG4gIHByaXZhdGUgYWN0aXZlOiBib29sZWFuO1xuICBwcml2YXRlIF9zdWI6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihvYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFQ+KSB7XG4gICAgdGhpcy5pbnMgPSBvYnNlcnZhYmxlO1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08VD4pIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5fc3ViID0gdGhpcy5pbnMuc3Vic2NyaWJlKG5ldyBPYnNlcnZlcihvdXQpKTtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSB0aGlzLl9zdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIF9zdG9wKCkge1xuICAgIGlmICh0aGlzLl9zdWIpIHRoaXMuX3N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXJnZVNpZ25hdHVyZSB7XG4gICgpOiBTdHJlYW08YW55PjtcbiAgPFQxPihzMTogU3RyZWFtPFQxPik6IFN0cmVhbTxUMT47XG4gIDxUMSwgVDI+KFxuICAgIHMxOiBTdHJlYW08VDE+LFxuICAgIHMyOiBTdHJlYW08VDI+KTogU3RyZWFtPFQxIHwgVDI+O1xuICA8VDEsIFQyLCBUMz4oXG4gICAgczE6IFN0cmVhbTxUMT4sXG4gICAgczI6IFN0cmVhbTxUMj4sXG4gICAgczM6IFN0cmVhbTxUMz4pOiBTdHJlYW08VDEgfCBUMiB8IFQzPjtcbiAgPFQxLCBUMiwgVDMsIFQ0PihcbiAgICBzMTogU3RyZWFtPFQxPixcbiAgICBzMjogU3RyZWFtPFQyPixcbiAgICBzMzogU3RyZWFtPFQzPixcbiAgICBzNDogU3RyZWFtPFQ0Pik6IFN0cmVhbTxUMSB8IFQyIHwgVDMgfCBUND47XG4gIDxUMSwgVDIsIFQzLCBUNCwgVDU+KFxuICAgIHMxOiBTdHJlYW08VDE+LFxuICAgIHMyOiBTdHJlYW08VDI+LFxuICAgIHMzOiBTdHJlYW08VDM+LFxuICAgIHM0OiBTdHJlYW08VDQ+LFxuICAgIHM1OiBTdHJlYW08VDU+KTogU3RyZWFtPFQxIHwgVDIgfCBUMyB8IFQ0IHwgVDU+O1xuICA8VDEsIFQyLCBUMywgVDQsIFQ1LCBUNj4oXG4gICAgczE6IFN0cmVhbTxUMT4sXG4gICAgczI6IFN0cmVhbTxUMj4sXG4gICAgczM6IFN0cmVhbTxUMz4sXG4gICAgczQ6IFN0cmVhbTxUND4sXG4gICAgczU6IFN0cmVhbTxUNT4sXG4gICAgczY6IFN0cmVhbTxUNj4pOiBTdHJlYW08VDEgfCBUMiB8IFQzIHwgVDQgfCBUNSB8IFQ2PjtcbiAgPFQxLCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3PihcbiAgICBzMTogU3RyZWFtPFQxPixcbiAgICBzMjogU3RyZWFtPFQyPixcbiAgICBzMzogU3RyZWFtPFQzPixcbiAgICBzNDogU3RyZWFtPFQ0PixcbiAgICBzNTogU3RyZWFtPFQ1PixcbiAgICBzNjogU3RyZWFtPFQ2PixcbiAgICBzNzogU3RyZWFtPFQ3Pik6IFN0cmVhbTxUMSB8IFQyIHwgVDMgfCBUNCB8IFQ1IHwgVDYgfCBUNz47XG4gIDxUMSwgVDIsIFQzLCBUNCwgVDUsIFQ2LCBUNywgVDg+KFxuICAgIHMxOiBTdHJlYW08VDE+LFxuICAgIHMyOiBTdHJlYW08VDI+LFxuICAgIHMzOiBTdHJlYW08VDM+LFxuICAgIHM0OiBTdHJlYW08VDQ+LFxuICAgIHM1OiBTdHJlYW08VDU+LFxuICAgIHM2OiBTdHJlYW08VDY+LFxuICAgIHM3OiBTdHJlYW08VDc+LFxuICAgIHM4OiBTdHJlYW08VDg+KTogU3RyZWFtPFQxIHwgVDIgfCBUMyB8IFQ0IHwgVDUgfCBUNiB8IFQ3IHwgVDg+O1xuICA8VDEsIFQyLCBUMywgVDQsIFQ1LCBUNiwgVDcsIFQ4LCBUOT4oXG4gICAgczE6IFN0cmVhbTxUMT4sXG4gICAgczI6IFN0cmVhbTxUMj4sXG4gICAgczM6IFN0cmVhbTxUMz4sXG4gICAgczQ6IFN0cmVhbTxUND4sXG4gICAgczU6IFN0cmVhbTxUNT4sXG4gICAgczY6IFN0cmVhbTxUNj4sXG4gICAgczc6IFN0cmVhbTxUNz4sXG4gICAgczg6IFN0cmVhbTxUOD4sXG4gICAgczk6IFN0cmVhbTxUOT4pOiBTdHJlYW08VDEgfCBUMiB8IFQzIHwgVDQgfCBUNSB8IFQ2IHwgVDcgfCBUOCB8IFQ5PjtcbiAgPFQxLCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3LCBUOCwgVDksIFQxMD4oXG4gICAgczE6IFN0cmVhbTxUMT4sXG4gICAgczI6IFN0cmVhbTxUMj4sXG4gICAgczM6IFN0cmVhbTxUMz4sXG4gICAgczQ6IFN0cmVhbTxUND4sXG4gICAgczU6IFN0cmVhbTxUNT4sXG4gICAgczY6IFN0cmVhbTxUNj4sXG4gICAgczc6IFN0cmVhbTxUNz4sXG4gICAgczg6IFN0cmVhbTxUOD4sXG4gICAgczk6IFN0cmVhbTxUOT4sXG4gICAgczEwOiBTdHJlYW08VDEwPik6IFN0cmVhbTxUMSB8IFQyIHwgVDMgfCBUNCB8IFQ1IHwgVDYgfCBUNyB8IFQ4IHwgVDkgfCBUMTA+O1xuICA8VD4oLi4uc3RyZWFtOiBBcnJheTxTdHJlYW08VD4+KTogU3RyZWFtPFQ+O1xufVxuXG5jbGFzcyBNZXJnZTxUPiBpbXBsZW1lbnRzIEFnZ3JlZ2F0b3I8VCwgVD4sIEludGVybmFsTGlzdGVuZXI8VD4ge1xuICBwdWJsaWMgdHlwZSA9ICdtZXJnZSc7XG4gIHB1YmxpYyBpbnNBcnI6IEFycmF5PFN0cmVhbTxUPj47XG4gIHB1YmxpYyBvdXQ6IFN0cmVhbTxUPjtcbiAgcHJpdmF0ZSBhYzogbnVtYmVyOyAvLyBhYyBpcyBhY3RpdmVDb3VudFxuXG4gIGNvbnN0cnVjdG9yKGluc0FycjogQXJyYXk8U3RyZWFtPFQ+Pikge1xuICAgIHRoaXMuaW5zQXJyID0gaW5zQXJyO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPFQ+O1xuICAgIHRoaXMuYWMgPSAwO1xuICB9XG5cbiAgX3N0YXJ0KG91dDogU3RyZWFtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgY29uc3QgcyA9IHRoaXMuaW5zQXJyO1xuICAgIGNvbnN0IEwgPSBzLmxlbmd0aDtcbiAgICB0aGlzLmFjID0gTDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEw7IGkrKykgc1tpXS5fYWRkKHRoaXMpO1xuICB9XG5cbiAgX3N0b3AoKTogdm9pZCB7XG4gICAgY29uc3QgcyA9IHRoaXMuaW5zQXJyO1xuICAgIGNvbnN0IEwgPSBzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEw7IGkrKykgc1tpXS5fcmVtb3ZlKHRoaXMpO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPFQ+O1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAodSA9PT0gTk8pIHJldHVybjtcbiAgICB1Ll9uKHQpO1xuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKHUgPT09IE5PKSByZXR1cm47XG4gICAgdS5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgaWYgKC0tdGhpcy5hYyA8PSAwKSB7XG4gICAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgICBpZiAodSA9PT0gTk8pIHJldHVybjtcbiAgICAgIHUuX2MoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb21iaW5lU2lnbmF0dXJlIHtcbiAgKCk6IFN0cmVhbTxBcnJheTxhbnk+PjtcbiAgPFQxPihzMTogU3RyZWFtPFQxPik6IFN0cmVhbTxbVDFdPjtcbiAgPFQxLCBUMj4oXG4gICAgczE6IFN0cmVhbTxUMT4sXG4gICAgczI6IFN0cmVhbTxUMj4pOiBTdHJlYW08W1QxLCBUMl0+O1xuICA8VDEsIFQyLCBUMz4oXG4gICAgczE6IFN0cmVhbTxUMT4sXG4gICAgczI6IFN0cmVhbTxUMj4sXG4gICAgczM6IFN0cmVhbTxUMz4pOiBTdHJlYW08W1QxLCBUMiwgVDNdPjtcbiAgPFQxLCBUMiwgVDMsIFQ0PihcbiAgICBzMTogU3RyZWFtPFQxPixcbiAgICBzMjogU3RyZWFtPFQyPixcbiAgICBzMzogU3RyZWFtPFQzPixcbiAgICBzNDogU3RyZWFtPFQ0Pik6IFN0cmVhbTxbVDEsIFQyLCBUMywgVDRdPjtcbiAgPFQxLCBUMiwgVDMsIFQ0LCBUNT4oXG4gICAgczE6IFN0cmVhbTxUMT4sXG4gICAgczI6IFN0cmVhbTxUMj4sXG4gICAgczM6IFN0cmVhbTxUMz4sXG4gICAgczQ6IFN0cmVhbTxUND4sXG4gICAgczU6IFN0cmVhbTxUNT4pOiBTdHJlYW08W1QxLCBUMiwgVDMsIFQ0LCBUNV0+O1xuICA8VDEsIFQyLCBUMywgVDQsIFQ1LCBUNj4oXG4gICAgczE6IFN0cmVhbTxUMT4sXG4gICAgczI6IFN0cmVhbTxUMj4sXG4gICAgczM6IFN0cmVhbTxUMz4sXG4gICAgczQ6IFN0cmVhbTxUND4sXG4gICAgczU6IFN0cmVhbTxUNT4sXG4gICAgczY6IFN0cmVhbTxUNj4pOiBTdHJlYW08W1QxLCBUMiwgVDMsIFQ0LCBUNSwgVDZdPjtcbiAgPFQxLCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3PihcbiAgICBzMTogU3RyZWFtPFQxPixcbiAgICBzMjogU3RyZWFtPFQyPixcbiAgICBzMzogU3RyZWFtPFQzPixcbiAgICBzNDogU3RyZWFtPFQ0PixcbiAgICBzNTogU3RyZWFtPFQ1PixcbiAgICBzNjogU3RyZWFtPFQ2PixcbiAgICBzNzogU3RyZWFtPFQ3Pik6IFN0cmVhbTxbVDEsIFQyLCBUMywgVDQsIFQ1LCBUNiwgVDddPjtcbiAgPFQxLCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3LCBUOD4oXG4gICAgczE6IFN0cmVhbTxUMT4sXG4gICAgczI6IFN0cmVhbTxUMj4sXG4gICAgczM6IFN0cmVhbTxUMz4sXG4gICAgczQ6IFN0cmVhbTxUND4sXG4gICAgczU6IFN0cmVhbTxUNT4sXG4gICAgczY6IFN0cmVhbTxUNj4sXG4gICAgczc6IFN0cmVhbTxUNz4sXG4gICAgczg6IFN0cmVhbTxUOD4pOiBTdHJlYW08W1QxLCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3LCBUOF0+O1xuICA8VDEsIFQyLCBUMywgVDQsIFQ1LCBUNiwgVDcsIFQ4LCBUOT4oXG4gICAgczE6IFN0cmVhbTxUMT4sXG4gICAgczI6IFN0cmVhbTxUMj4sXG4gICAgczM6IFN0cmVhbTxUMz4sXG4gICAgczQ6IFN0cmVhbTxUND4sXG4gICAgczU6IFN0cmVhbTxUNT4sXG4gICAgczY6IFN0cmVhbTxUNj4sXG4gICAgczc6IFN0cmVhbTxUNz4sXG4gICAgczg6IFN0cmVhbTxUOD4sXG4gICAgczk6IFN0cmVhbTxUOT4pOiBTdHJlYW08W1QxLCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3LCBUOCwgVDldPjtcbiAgPFQxLCBUMiwgVDMsIFQ0LCBUNSwgVDYsIFQ3LCBUOCwgVDksIFQxMD4oXG4gICAgczE6IFN0cmVhbTxUMT4sXG4gICAgczI6IFN0cmVhbTxUMj4sXG4gICAgczM6IFN0cmVhbTxUMz4sXG4gICAgczQ6IFN0cmVhbTxUND4sXG4gICAgczU6IFN0cmVhbTxUNT4sXG4gICAgczY6IFN0cmVhbTxUNj4sXG4gICAgczc6IFN0cmVhbTxUNz4sXG4gICAgczg6IFN0cmVhbTxUOD4sXG4gICAgczk6IFN0cmVhbTxUOT4sXG4gICAgczEwOiBTdHJlYW08VDEwPik6IFN0cmVhbTxbVDEsIFQyLCBUMywgVDQsIFQ1LCBUNiwgVDcsIFQ4LCBUOSwgVDEwXT47XG4gICguLi5zdHJlYW06IEFycmF5PFN0cmVhbTxhbnk+Pik6IFN0cmVhbTxBcnJheTxhbnk+Pjtcbn1cblxuY2xhc3MgQ29tYmluZUxpc3RlbmVyPFQ+IGltcGxlbWVudHMgSW50ZXJuYWxMaXN0ZW5lcjxUPiwgT3V0U2VuZGVyPEFycmF5PFQ+PiB7XG4gIHByaXZhdGUgaTogbnVtYmVyO1xuICBwdWJsaWMgb3V0OiBTdHJlYW08QXJyYXk8VD4+O1xuICBwcml2YXRlIHA6IENvbWJpbmU8VD47XG5cbiAgY29uc3RydWN0b3IoaTogbnVtYmVyLCBvdXQ6IFN0cmVhbTxBcnJheTxUPj4sIHA6IENvbWJpbmU8VD4pIHtcbiAgICB0aGlzLmkgPSBpO1xuICAgIHRoaXMub3V0ID0gb3V0O1xuICAgIHRoaXMucCA9IHA7XG4gICAgcC5pbHMucHVzaCh0aGlzKTtcbiAgfVxuXG4gIF9uKHQ6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBwID0gdGhpcy5wLCBvdXQgPSB0aGlzLm91dDtcbiAgICBpZiAob3V0ID09PSBOTykgcmV0dXJuO1xuICAgIGlmIChwLnVwKHQsIHRoaXMuaSkpIHtcbiAgICAgIGNvbnN0IGEgPSBwLnZhbHM7XG4gICAgICBjb25zdCBsID0gYS5sZW5ndGg7XG4gICAgICBjb25zdCBiID0gQXJyYXkobCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7ICsraSkgYltpXSA9IGFbaV07XG4gICAgICBvdXQuX24oYik7XG4gICAgfVxuICB9XG5cbiAgX2UoZXJyOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBvdXQgPSB0aGlzLm91dDtcbiAgICBpZiAob3V0ID09PSBOTykgcmV0dXJuO1xuICAgIG91dC5fZShlcnIpO1xuICB9XG5cbiAgX2MoKTogdm9pZCB7XG4gICAgY29uc3QgcCA9IHRoaXMucDtcbiAgICBpZiAocC5vdXQgPT09IE5PKSByZXR1cm47XG4gICAgaWYgKC0tcC5OYyA9PT0gMCkgcC5vdXQuX2MoKTtcbiAgfVxufVxuXG5jbGFzcyBDb21iaW5lPFI+IGltcGxlbWVudHMgQWdncmVnYXRvcjxhbnksIEFycmF5PFI+PiB7XG4gIHB1YmxpYyB0eXBlID0gJ2NvbWJpbmUnO1xuICBwdWJsaWMgaW5zQXJyOiBBcnJheTxTdHJlYW08YW55Pj47XG4gIHB1YmxpYyBvdXQ6IFN0cmVhbTxBcnJheTxSPj47XG4gIHB1YmxpYyBpbHM6IEFycmF5PENvbWJpbmVMaXN0ZW5lcjxhbnk+PjtcbiAgcHVibGljIE5jOiBudW1iZXI7IC8vICpOKnVtYmVyIG9mIHN0cmVhbXMgc3RpbGwgdG8gc2VuZCAqYypvbXBsZXRlXG4gIHB1YmxpYyBObjogbnVtYmVyOyAvLyAqTip1bWJlciBvZiBzdHJlYW1zIHN0aWxsIHRvIHNlbmQgKm4qZXh0XG4gIHB1YmxpYyB2YWxzOiBBcnJheTxSPjtcblxuICBjb25zdHJ1Y3RvcihpbnNBcnI6IEFycmF5PFN0cmVhbTxhbnk+Pikge1xuICAgIHRoaXMuaW5zQXJyID0gaW5zQXJyO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPEFycmF5PFI+PjtcbiAgICB0aGlzLmlscyA9IFtdO1xuICAgIHRoaXMuTmMgPSB0aGlzLk5uID0gMDtcbiAgICB0aGlzLnZhbHMgPSBbXTtcbiAgfVxuXG4gIHVwKHQ6IGFueSwgaTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdiA9IHRoaXMudmFsc1tpXTtcbiAgICBjb25zdCBObiA9ICF0aGlzLk5uID8gMCA6IHYgPT09IE5PID8gLS10aGlzLk5uIDogdGhpcy5ObjtcbiAgICB0aGlzLnZhbHNbaV0gPSB0O1xuICAgIHJldHVybiBObiA9PT0gMDtcbiAgfVxuXG4gIF9zdGFydChvdXQ6IFN0cmVhbTxBcnJheTxSPj4pOiB2b2lkIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICBjb25zdCBzID0gdGhpcy5pbnNBcnI7XG4gICAgY29uc3QgbiA9IHRoaXMuTmMgPSB0aGlzLk5uID0gcy5sZW5ndGg7XG4gICAgY29uc3QgdmFscyA9IHRoaXMudmFscyA9IG5ldyBBcnJheShuKTtcbiAgICBpZiAobiA9PT0gMCkge1xuICAgICAgb3V0Ll9uKFtdKTtcbiAgICAgIG91dC5fYygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICB2YWxzW2ldID0gTk87XG4gICAgICAgIHNbaV0uX2FkZChuZXcgQ29tYmluZUxpc3RlbmVyKGksIG91dCwgdGhpcykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIGNvbnN0IHMgPSB0aGlzLmluc0FycjtcbiAgICBjb25zdCBuID0gcy5sZW5ndGg7XG4gICAgY29uc3QgaWxzID0gdGhpcy5pbHM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHNbaV0uX3JlbW92ZShpbHNbaV0pO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPEFycmF5PFI+PjtcbiAgICB0aGlzLmlscyA9IFtdO1xuICAgIHRoaXMudmFscyA9IFtdO1xuICB9XG59XG5cbmNsYXNzIEZyb21BcnJheTxUPiBpbXBsZW1lbnRzIEludGVybmFsUHJvZHVjZXI8VD4ge1xuICBwdWJsaWMgdHlwZSA9ICdmcm9tQXJyYXknO1xuICBwdWJsaWMgYTogQXJyYXk8VD47XG5cbiAgY29uc3RydWN0b3IoYTogQXJyYXk8VD4pIHtcbiAgICB0aGlzLmEgPSBhO1xuICB9XG5cbiAgX3N0YXJ0KG91dDogSW50ZXJuYWxMaXN0ZW5lcjxUPik6IHZvaWQge1xuICAgIGNvbnN0IGEgPSB0aGlzLmE7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSBhLmxlbmd0aDsgaSA8IG47IGkrKykgb3V0Ll9uKGFbaV0pO1xuICAgIG91dC5fYygpO1xuICB9XG5cbiAgX3N0b3AoKTogdm9pZCB7XG4gIH1cbn1cblxuY2xhc3MgRnJvbVByb21pc2U8VD4gaW1wbGVtZW50cyBJbnRlcm5hbFByb2R1Y2VyPFQ+IHtcbiAgcHVibGljIHR5cGUgPSAnZnJvbVByb21pc2UnO1xuICBwdWJsaWMgb246IGJvb2xlYW47XG4gIHB1YmxpYyBwOiBQcm9taXNlTGlrZTxUPjtcblxuICBjb25zdHJ1Y3RvcihwOiBQcm9taXNlTGlrZTxUPikge1xuICAgIHRoaXMub24gPSBmYWxzZTtcbiAgICB0aGlzLnAgPSBwO1xuICB9XG5cbiAgX3N0YXJ0KG91dDogSW50ZXJuYWxMaXN0ZW5lcjxUPik6IHZvaWQge1xuICAgIGNvbnN0IHByb2QgPSB0aGlzO1xuICAgIHRoaXMub24gPSB0cnVlO1xuICAgIHRoaXMucC50aGVuKFxuICAgICAgKHY6IFQpID0+IHtcbiAgICAgICAgaWYgKHByb2Qub24pIHtcbiAgICAgICAgICBvdXQuX24odik7XG4gICAgICAgICAgb3V0Ll9jKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZTogYW55KSA9PiB7XG4gICAgICAgIG91dC5fZShlKTtcbiAgICAgIH0sXG4gICAgKS50aGVuKG5vb3AsIChlcnI6IGFueSkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRocm93IGVycjsgfSk7XG4gICAgfSk7XG4gIH1cblxuICBfc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uID0gZmFsc2U7XG4gIH1cbn1cblxuY2xhc3MgUGVyaW9kaWMgaW1wbGVtZW50cyBJbnRlcm5hbFByb2R1Y2VyPG51bWJlcj4ge1xuICBwdWJsaWMgdHlwZSA9ICdwZXJpb2RpYyc7XG4gIHB1YmxpYyBwZXJpb2Q6IG51bWJlcjtcbiAgcHJpdmF0ZSBpbnRlcnZhbElEOiBhbnk7XG4gIHByaXZhdGUgaTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHBlcmlvZDogbnVtYmVyKSB7XG4gICAgdGhpcy5wZXJpb2QgPSBwZXJpb2Q7XG4gICAgdGhpcy5pbnRlcnZhbElEID0gLTE7XG4gICAgdGhpcy5pID0gMDtcbiAgfVxuXG4gIF9zdGFydChvdXQ6IEludGVybmFsTGlzdGVuZXI8bnVtYmVyPik6IHZvaWQge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGludGVydmFsSGFuZGxlcigpIHsgb3V0Ll9uKHNlbGYuaSsrKTsgfVxuICAgIHRoaXMuaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKGludGVydmFsSGFuZGxlciwgdGhpcy5wZXJpb2QpO1xuICB9XG5cbiAgX3N0b3AoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW50ZXJ2YWxJRCAhPT0gLTEpIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbElEKTtcbiAgICB0aGlzLmludGVydmFsSUQgPSAtMTtcbiAgICB0aGlzLmkgPSAwO1xuICB9XG59XG5cbmNsYXNzIERlYnVnPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBwdWJsaWMgdHlwZSA9ICdkZWJ1Zyc7XG4gIHB1YmxpYyBpbnM6IFN0cmVhbTxUPjtcbiAgcHVibGljIG91dDogU3RyZWFtPFQ+O1xuICBwcml2YXRlIHM6ICh0OiBUKSA9PiBhbnk7IC8vIHNweVxuICBwcml2YXRlIGw6IHN0cmluZzsgLy8gbGFiZWxcblxuICBjb25zdHJ1Y3RvcihpbnM6IFN0cmVhbTxUPik7XG4gIGNvbnN0cnVjdG9yKGluczogU3RyZWFtPFQ+LCBhcmc/OiBzdHJpbmcpO1xuICBjb25zdHJ1Y3RvcihpbnM6IFN0cmVhbTxUPiwgYXJnPzogKHQ6IFQpID0+IGFueSk7XG4gIGNvbnN0cnVjdG9yKGluczogU3RyZWFtPFQ+LCBhcmc/OiBzdHJpbmcgfCAoKHQ6IFQpID0+IGFueSkpO1xuICBjb25zdHJ1Y3RvcihpbnM6IFN0cmVhbTxUPiwgYXJnPzogc3RyaW5nIHwgKCh0OiBUKSA9PiBhbnkpIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5pbnMgPSBpbnM7XG4gICAgdGhpcy5vdXQgPSBOTyBhcyBTdHJlYW08VD47XG4gICAgdGhpcy5zID0gbm9vcDtcbiAgICB0aGlzLmwgPSAnJztcbiAgICBpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycpIHRoaXMubCA9IGFyZzsgZWxzZSBpZiAodHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJykgdGhpcy5zID0gYXJnO1xuICB9XG5cbiAgX3N0YXJ0KG91dDogU3RyZWFtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5vdXQgPSBOTyBhcyBTdHJlYW08VD47XG4gIH1cblxuICBfbih0OiBUKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIGNvbnN0IHMgPSB0aGlzLnMsIGwgPSB0aGlzLmw7XG4gICAgaWYgKHMgIT09IG5vb3ApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHModCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHUuX2UoZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChsKSBjb25zb2xlLmxvZyhsICsgJzonLCB0KTsgZWxzZSBjb25zb2xlLmxvZyh0KTtcbiAgICB1Ll9uKHQpO1xuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKHUgPT09IE5PKSByZXR1cm47XG4gICAgdS5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIHUuX2MoKTtcbiAgfVxufVxuXG5jbGFzcyBEcm9wPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBwdWJsaWMgdHlwZSA9ICdkcm9wJztcbiAgcHVibGljIGluczogU3RyZWFtPFQ+O1xuICBwdWJsaWMgb3V0OiBTdHJlYW08VD47XG4gIHB1YmxpYyBtYXg6IG51bWJlcjtcbiAgcHJpdmF0ZSBkcm9wcGVkOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IobWF4OiBudW1iZXIsIGluczogU3RyZWFtPFQ+KSB7XG4gICAgdGhpcy5pbnMgPSBpbnM7XG4gICAgdGhpcy5vdXQgPSBOTyBhcyBTdHJlYW08VD47XG4gICAgdGhpcy5tYXggPSBtYXg7XG4gICAgdGhpcy5kcm9wcGVkID0gMDtcbiAgfVxuXG4gIF9zdGFydChvdXQ6IFN0cmVhbTxUPik6IHZvaWQge1xuICAgIHRoaXMub3V0ID0gb3V0O1xuICAgIHRoaXMuZHJvcHBlZCA9IDA7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5vdXQgPSBOTyBhcyBTdHJlYW08VD47XG4gIH1cblxuICBfbih0OiBUKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIGlmICh0aGlzLmRyb3BwZWQrKyA+PSB0aGlzLm1heCkgdS5fbih0KTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAodSA9PT0gTk8pIHJldHVybjtcbiAgICB1Ll9jKCk7XG4gIH1cbn1cblxuY2xhc3MgRW5kV2hlbkxpc3RlbmVyPFQ+IGltcGxlbWVudHMgSW50ZXJuYWxMaXN0ZW5lcjxhbnk+IHtcbiAgcHJpdmF0ZSBvdXQ6IFN0cmVhbTxUPjtcbiAgcHJpdmF0ZSBvcDogRW5kV2hlbjxUPjtcblxuICBjb25zdHJ1Y3RvcihvdXQ6IFN0cmVhbTxUPiwgb3A6IEVuZFdoZW48VD4pIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLm9wID0gb3A7XG4gIH1cblxuICBfbigpIHtcbiAgICB0aGlzLm9wLmVuZCgpO1xuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICB0aGlzLm91dC5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgdGhpcy5vcC5lbmQoKTtcbiAgfVxufVxuXG5jbGFzcyBFbmRXaGVuPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBwdWJsaWMgdHlwZSA9ICdlbmRXaGVuJztcbiAgcHVibGljIGluczogU3RyZWFtPFQ+O1xuICBwdWJsaWMgb3V0OiBTdHJlYW08VD47XG4gIHB1YmxpYyBvOiBTdHJlYW08YW55PjsgLy8gbyA9IG90aGVyXG4gIHByaXZhdGUgb2lsOiBJbnRlcm5hbExpc3RlbmVyPGFueT47IC8vIG9pbCA9IG90aGVyIEludGVybmFsTGlzdGVuZXJcblxuICBjb25zdHJ1Y3RvcihvOiBTdHJlYW08YW55PiwgaW5zOiBTdHJlYW08VD4pIHtcbiAgICB0aGlzLmlucyA9IGlucztcbiAgICB0aGlzLm91dCA9IE5PIGFzIFN0cmVhbTxUPjtcbiAgICB0aGlzLm8gPSBvO1xuICAgIHRoaXMub2lsID0gTk9fSUw7XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08VD4pOiB2b2lkIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLm8uX2FkZCh0aGlzLm9pbCA9IG5ldyBFbmRXaGVuTGlzdGVuZXIob3V0LCB0aGlzKSk7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5vLl9yZW1vdmUodGhpcy5vaWwpO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPFQ+O1xuICAgIHRoaXMub2lsID0gTk9fSUw7XG4gIH1cblxuICBlbmQoKTogdm9pZCB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIHUuX2MoKTtcbiAgfVxuXG4gIF9uKHQ6IFQpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKHUgPT09IE5PKSByZXR1cm47XG4gICAgdS5fbih0KTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIHRoaXMuZW5kKCk7XG4gIH1cbn1cblxuY2xhc3MgRmlsdGVyPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBwdWJsaWMgdHlwZSA9ICdmaWx0ZXInO1xuICBwdWJsaWMgaW5zOiBTdHJlYW08VD47XG4gIHB1YmxpYyBvdXQ6IFN0cmVhbTxUPjtcbiAgcHVibGljIGY6ICh0OiBUKSA9PiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHBhc3NlczogKHQ6IFQpID0+IGJvb2xlYW4sIGluczogU3RyZWFtPFQ+KSB7XG4gICAgdGhpcy5pbnMgPSBpbnM7XG4gICAgdGhpcy5vdXQgPSBOTyBhcyBTdHJlYW08VD47XG4gICAgdGhpcy5mID0gcGFzc2VzO1xuICB9XG5cbiAgX3N0YXJ0KG91dDogU3RyZWFtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5vdXQgPSBOTyBhcyBTdHJlYW08VD47XG4gIH1cblxuICBfbih0OiBUKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIGNvbnN0IHIgPSBfdHJ5KHRoaXMsIHQsIHUpO1xuICAgIGlmIChyID09PSBOTyB8fCAhcikgcmV0dXJuO1xuICAgIHUuX24odCk7XG4gIH1cblxuICBfZShlcnI6IGFueSkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAodSA9PT0gTk8pIHJldHVybjtcbiAgICB1Ll9lKGVycik7XG4gIH1cblxuICBfYygpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKHUgPT09IE5PKSByZXR1cm47XG4gICAgdS5fYygpO1xuICB9XG59XG5cbmNsYXNzIEZsYXR0ZW5MaXN0ZW5lcjxUPiBpbXBsZW1lbnRzIEludGVybmFsTGlzdGVuZXI8VD4ge1xuICBwcml2YXRlIG91dDogU3RyZWFtPFQ+O1xuICBwcml2YXRlIG9wOiBGbGF0dGVuPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKG91dDogU3RyZWFtPFQ+LCBvcDogRmxhdHRlbjxUPikge1xuICAgIHRoaXMub3V0ID0gb3V0O1xuICAgIHRoaXMub3AgPSBvcDtcbiAgfVxuXG4gIF9uKHQ6IFQpIHtcbiAgICB0aGlzLm91dC5fbih0KTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgdGhpcy5vdXQuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIHRoaXMub3AuaW5uZXIgPSBOTyBhcyBTdHJlYW08VD47XG4gICAgdGhpcy5vcC5sZXNzKCk7XG4gIH1cbn1cblxuY2xhc3MgRmxhdHRlbjxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFN0cmVhbTxUPiwgVD4ge1xuICBwdWJsaWMgdHlwZSA9ICdmbGF0dGVuJztcbiAgcHVibGljIGluczogU3RyZWFtPFN0cmVhbTxUPj47XG4gIHB1YmxpYyBvdXQ6IFN0cmVhbTxUPjtcbiAgcHJpdmF0ZSBvcGVuOiBib29sZWFuO1xuICBwdWJsaWMgaW5uZXI6IFN0cmVhbTxUPjsgLy8gQ3VycmVudCBpbm5lciBTdHJlYW1cbiAgcHJpdmF0ZSBpbDogSW50ZXJuYWxMaXN0ZW5lcjxUPjsgLy8gQ3VycmVudCBpbm5lciBJbnRlcm5hbExpc3RlbmVyXG5cbiAgY29uc3RydWN0b3IoaW5zOiBTdHJlYW08U3RyZWFtPFQ+Pikge1xuICAgIHRoaXMuaW5zID0gaW5zO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPFQ+O1xuICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgdGhpcy5pbm5lciA9IE5PIGFzIFN0cmVhbTxUPjtcbiAgICB0aGlzLmlsID0gTk9fSUw7XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08VD4pOiB2b2lkIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICAgIHRoaXMuaW5uZXIgPSBOTyBhcyBTdHJlYW08VD47XG4gICAgdGhpcy5pbCA9IE5PX0lMO1xuICAgIHRoaXMuaW5zLl9hZGQodGhpcyk7XG4gIH1cblxuICBfc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucy5fcmVtb3ZlKHRoaXMpO1xuICAgIGlmICh0aGlzLmlubmVyICE9PSBOTykgdGhpcy5pbm5lci5fcmVtb3ZlKHRoaXMuaWwpO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPFQ+O1xuICAgIHRoaXMub3BlbiA9IHRydWU7XG4gICAgdGhpcy5pbm5lciA9IE5PIGFzIFN0cmVhbTxUPjtcbiAgICB0aGlzLmlsID0gTk9fSUw7XG4gIH1cblxuICBsZXNzKCk6IHZvaWQge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAodSA9PT0gTk8pIHJldHVybjtcbiAgICBpZiAoIXRoaXMub3BlbiAmJiB0aGlzLmlubmVyID09PSBOTykgdS5fYygpO1xuICB9XG5cbiAgX24oczogU3RyZWFtPFQ+KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIGNvbnN0IHtpbm5lciwgaWx9ID0gdGhpcztcbiAgICBpZiAoaW5uZXIgIT09IE5PICYmIGlsICE9PSBOT19JTCkgaW5uZXIuX3JlbW92ZShpbCk7XG4gICAgKHRoaXMuaW5uZXIgPSBzKS5fYWRkKHRoaXMuaWwgPSBuZXcgRmxhdHRlbkxpc3RlbmVyKHUsIHRoaXMpKTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIHRoaXMubGVzcygpO1xuICB9XG59XG5cbmNsYXNzIEZvbGQ8VCwgUj4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBSPiB7XG4gIHB1YmxpYyB0eXBlID0gJ2ZvbGQnO1xuICBwdWJsaWMgaW5zOiBTdHJlYW08VD47XG4gIHB1YmxpYyBvdXQ6IFN0cmVhbTxSPjtcbiAgcHVibGljIGY6ICh0OiBUKSA9PiBSO1xuICBwdWJsaWMgc2VlZDogUjtcbiAgcHJpdmF0ZSBhY2M6IFI7IC8vIGluaXRpYWxpemVkIGFzIHNlZWRcblxuICBjb25zdHJ1Y3RvcihmOiAoYWNjOiBSLCB0OiBUKSA9PiBSLCBzZWVkOiBSLCBpbnM6IFN0cmVhbTxUPikge1xuICAgIHRoaXMuaW5zID0gaW5zO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPFI+O1xuICAgIHRoaXMuZiA9ICh0OiBUKSA9PiBmKHRoaXMuYWNjLCB0KTtcbiAgICB0aGlzLmFjYyA9IHRoaXMuc2VlZCA9IHNlZWQ7XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08Uj4pOiB2b2lkIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLmFjYyA9IHRoaXMuc2VlZDtcbiAgICBvdXQuX24odGhpcy5hY2MpO1xuICAgIHRoaXMuaW5zLl9hZGQodGhpcyk7XG4gIH1cblxuICBfc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucy5fcmVtb3ZlKHRoaXMpO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPFI+O1xuICAgIHRoaXMuYWNjID0gdGhpcy5zZWVkO1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAodSA9PT0gTk8pIHJldHVybjtcbiAgICBjb25zdCByID0gX3RyeSh0aGlzLCB0LCB1KTtcbiAgICBpZiAociA9PT0gTk8pIHJldHVybjtcbiAgICB1Ll9uKHRoaXMuYWNjID0gciBhcyBSKTtcbiAgfVxuXG4gIF9lKGVycjogYW55KSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIHUuX2UoZXJyKTtcbiAgfVxuXG4gIF9jKCkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAodSA9PT0gTk8pIHJldHVybjtcbiAgICB1Ll9jKCk7XG4gIH1cbn1cblxuY2xhc3MgTGFzdDxUPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIFQ+IHtcbiAgcHVibGljIHR5cGUgPSAnbGFzdCc7XG4gIHB1YmxpYyBpbnM6IFN0cmVhbTxUPjtcbiAgcHVibGljIG91dDogU3RyZWFtPFQ+O1xuICBwcml2YXRlIGhhczogYm9vbGVhbjtcbiAgcHJpdmF0ZSB2YWw6IFQ7XG5cbiAgY29uc3RydWN0b3IoaW5zOiBTdHJlYW08VD4pIHtcbiAgICB0aGlzLmlucyA9IGlucztcbiAgICB0aGlzLm91dCA9IE5PIGFzIFN0cmVhbTxUPjtcbiAgICB0aGlzLmhhcyA9IGZhbHNlO1xuICAgIHRoaXMudmFsID0gTk8gYXMgVDtcbiAgfVxuXG4gIF9zdGFydChvdXQ6IFN0cmVhbTxUPik6IHZvaWQge1xuICAgIHRoaXMub3V0ID0gb3V0O1xuICAgIHRoaXMuaGFzID0gZmFsc2U7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5vdXQgPSBOTyBhcyBTdHJlYW08VD47XG4gICAgdGhpcy52YWwgPSBOTyBhcyBUO1xuICB9XG5cbiAgX24odDogVCkge1xuICAgIHRoaXMuaGFzID0gdHJ1ZTtcbiAgICB0aGlzLnZhbCA9IHQ7XG4gIH1cblxuICBfZShlcnI6IGFueSkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAodSA9PT0gTk8pIHJldHVybjtcbiAgICB1Ll9lKGVycik7XG4gIH1cblxuICBfYygpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKHUgPT09IE5PKSByZXR1cm47XG4gICAgaWYgKHRoaXMuaGFzKSB7XG4gICAgICB1Ll9uKHRoaXMudmFsKTtcbiAgICAgIHUuX2MoKTtcbiAgICB9IGVsc2UgdS5fZShuZXcgRXJyb3IoJ2xhc3QoKSBmYWlsZWQgYmVjYXVzZSBpbnB1dCBzdHJlYW0gY29tcGxldGVkJykpO1xuICB9XG59XG5cbmNsYXNzIE1hcE9wPFQsIFI+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgUj4ge1xuICBwdWJsaWMgdHlwZSA9ICdtYXAnO1xuICBwdWJsaWMgaW5zOiBTdHJlYW08VD47XG4gIHB1YmxpYyBvdXQ6IFN0cmVhbTxSPjtcbiAgcHVibGljIGY6ICh0OiBUKSA9PiBSO1xuXG4gIGNvbnN0cnVjdG9yKHByb2plY3Q6ICh0OiBUKSA9PiBSLCBpbnM6IFN0cmVhbTxUPikge1xuICAgIHRoaXMuaW5zID0gaW5zO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPFI+O1xuICAgIHRoaXMuZiA9IHByb2plY3Q7XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08Uj4pOiB2b2lkIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLmlucy5fYWRkKHRoaXMpO1xuICB9XG5cbiAgX3N0b3AoKTogdm9pZCB7XG4gICAgdGhpcy5pbnMuX3JlbW92ZSh0aGlzKTtcbiAgICB0aGlzLm91dCA9IE5PIGFzIFN0cmVhbTxSPjtcbiAgfVxuXG4gIF9uKHQ6IFQpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKHUgPT09IE5PKSByZXR1cm47XG4gICAgY29uc3QgciA9IF90cnkodGhpcywgdCwgdSk7XG4gICAgaWYgKHIgPT09IE5PKSByZXR1cm47XG4gICAgdS5fbihyIGFzIFIpO1xuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKHUgPT09IE5PKSByZXR1cm47XG4gICAgdS5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIHUuX2MoKTtcbiAgfVxufVxuXG5jbGFzcyBSZW1lbWJlcjxUPiBpbXBsZW1lbnRzIEludGVybmFsUHJvZHVjZXI8VD4ge1xuICBwdWJsaWMgdHlwZSA9ICdyZW1lbWJlcic7XG4gIHB1YmxpYyBpbnM6IFN0cmVhbTxUPjtcbiAgcHVibGljIG91dDogU3RyZWFtPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKGluczogU3RyZWFtPFQ+KSB7XG4gICAgdGhpcy5pbnMgPSBpbnM7XG4gICAgdGhpcy5vdXQgPSBOTyBhcyBTdHJlYW08VD47XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08VD4pOiB2b2lkIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLmlucy5fYWRkKG91dCk7XG4gIH1cblxuICBfc3RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucy5fcmVtb3ZlKHRoaXMub3V0KTtcbiAgICB0aGlzLm91dCA9IE5PIGFzIFN0cmVhbTxUPjtcbiAgfVxufVxuXG5jbGFzcyBSZXBsYWNlRXJyb3I8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIHB1YmxpYyB0eXBlID0gJ3JlcGxhY2VFcnJvcic7XG4gIHB1YmxpYyBpbnM6IFN0cmVhbTxUPjtcbiAgcHVibGljIG91dDogU3RyZWFtPFQ+O1xuICBwdWJsaWMgZjogKGVycjogYW55KSA9PiBTdHJlYW08VD47XG5cbiAgY29uc3RydWN0b3IocmVwbGFjZXI6IChlcnI6IGFueSkgPT4gU3RyZWFtPFQ+LCBpbnM6IFN0cmVhbTxUPikge1xuICAgIHRoaXMuaW5zID0gaW5zO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPFQ+O1xuICAgIHRoaXMuZiA9IHJlcGxhY2VyO1xuICB9XG5cbiAgX3N0YXJ0KG91dDogU3RyZWFtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5vdXQgPSBOTyBhcyBTdHJlYW08VD47XG4gIH1cblxuICBfbih0OiBUKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIHUuX24odCk7XG4gIH1cblxuICBfZShlcnI6IGFueSkge1xuICAgIGNvbnN0IHUgPSB0aGlzLm91dDtcbiAgICBpZiAodSA9PT0gTk8pIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgdGhpcy5pbnMuX3JlbW92ZSh0aGlzKTtcbiAgICAgICh0aGlzLmlucyA9IHRoaXMuZihlcnIpKS5fYWRkKHRoaXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHUuX2UoZSk7XG4gICAgfVxuICB9XG5cbiAgX2MoKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIHUuX2MoKTtcbiAgfVxufVxuXG5jbGFzcyBTdGFydFdpdGg8VD4gaW1wbGVtZW50cyBJbnRlcm5hbFByb2R1Y2VyPFQ+IHtcbiAgcHVibGljIHR5cGUgPSAnc3RhcnRXaXRoJztcbiAgcHVibGljIGluczogU3RyZWFtPFQ+O1xuICBwdWJsaWMgb3V0OiBTdHJlYW08VD47XG4gIHB1YmxpYyB2YWw6IFQ7XG5cbiAgY29uc3RydWN0b3IoaW5zOiBTdHJlYW08VD4sIHZhbDogVCkge1xuICAgIHRoaXMuaW5zID0gaW5zO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPFQ+O1xuICAgIHRoaXMudmFsID0gdmFsO1xuICB9XG5cbiAgX3N0YXJ0KG91dDogU3RyZWFtPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5vdXQgPSBvdXQ7XG4gICAgdGhpcy5vdXQuX24odGhpcy52YWwpO1xuICAgIHRoaXMuaW5zLl9hZGQob3V0KTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcy5vdXQpO1xuICAgIHRoaXMub3V0ID0gTk8gYXMgU3RyZWFtPFQ+O1xuICB9XG59XG5cbmNsYXNzIFRha2U8VD4gaW1wbGVtZW50cyBPcGVyYXRvcjxULCBUPiB7XG4gIHB1YmxpYyB0eXBlID0gJ3Rha2UnO1xuICBwdWJsaWMgaW5zOiBTdHJlYW08VD47XG4gIHB1YmxpYyBvdXQ6IFN0cmVhbTxUPjtcbiAgcHVibGljIG1heDogbnVtYmVyO1xuICBwcml2YXRlIHRha2VuOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IobWF4OiBudW1iZXIsIGluczogU3RyZWFtPFQ+KSB7XG4gICAgdGhpcy5pbnMgPSBpbnM7XG4gICAgdGhpcy5vdXQgPSBOTyBhcyBTdHJlYW08VD47XG4gICAgdGhpcy5tYXggPSBtYXg7XG4gICAgdGhpcy50YWtlbiA9IDA7XG4gIH1cblxuICBfc3RhcnQob3V0OiBTdHJlYW08VD4pOiB2b2lkIHtcbiAgICB0aGlzLm91dCA9IG91dDtcbiAgICB0aGlzLnRha2VuID0gMDtcbiAgICBpZiAodGhpcy5tYXggPD0gMCkgb3V0Ll9jKCk7IGVsc2UgdGhpcy5pbnMuX2FkZCh0aGlzKTtcbiAgfVxuXG4gIF9zdG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zLl9yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5vdXQgPSBOTyBhcyBTdHJlYW08VD47XG4gIH1cblxuICBfbih0OiBUKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIGNvbnN0IG0gPSArK3RoaXMudGFrZW47XG4gICAgaWYgKG0gPCB0aGlzLm1heCkgdS5fbih0KTsgZWxzZSBpZiAobSA9PT0gdGhpcy5tYXgpIHtcbiAgICAgIHUuX24odCk7XG4gICAgICB1Ll9jKCk7XG4gICAgfVxuICB9XG5cbiAgX2UoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB1ID0gdGhpcy5vdXQ7XG4gICAgaWYgKHUgPT09IE5PKSByZXR1cm47XG4gICAgdS5fZShlcnIpO1xuICB9XG5cbiAgX2MoKSB7XG4gICAgY29uc3QgdSA9IHRoaXMub3V0O1xuICAgIGlmICh1ID09PSBOTykgcmV0dXJuO1xuICAgIHUuX2MoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RyZWFtPFQ+IGltcGxlbWVudHMgSW50ZXJuYWxMaXN0ZW5lcjxUPiB7XG4gIHB1YmxpYyBfcHJvZDogSW50ZXJuYWxQcm9kdWNlcjxUPjtcbiAgcHJvdGVjdGVkIF9pbHM6IEFycmF5PEludGVybmFsTGlzdGVuZXI8VD4+OyAvLyAnaWxzJyA9IEludGVybmFsIGxpc3RlbmVyc1xuICBwcm90ZWN0ZWQgX3N0b3BJRDogYW55O1xuICBwcm90ZWN0ZWQgX2RsOiBJbnRlcm5hbExpc3RlbmVyPFQ+OyAvLyB0aGUgZGVidWcgbGlzdGVuZXJcbiAgcHJvdGVjdGVkIF9kOiBib29sZWFuOyAvLyBmbGFnIGluZGljYXRpbmcgdGhlIGV4aXN0ZW5jZSBvZiB0aGUgZGVidWcgbGlzdGVuZXJcbiAgcHJvdGVjdGVkIF90YXJnZXQ6IFN0cmVhbTxUPjsgLy8gaW1pdGF0aW9uIHRhcmdldCBpZiB0aGlzIFN0cmVhbSB3aWxsIGltaXRhdGVcbiAgcHJvdGVjdGVkIF9lcnI6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcm9kdWNlcj86IEludGVybmFsUHJvZHVjZXI8VD4pIHtcbiAgICB0aGlzLl9wcm9kID0gcHJvZHVjZXIgfHwgTk8gYXMgSW50ZXJuYWxQcm9kdWNlcjxUPjtcbiAgICB0aGlzLl9pbHMgPSBbXTtcbiAgICB0aGlzLl9zdG9wSUQgPSBOTztcbiAgICB0aGlzLl9kbCA9IE5PIGFzIEludGVybmFsTGlzdGVuZXI8VD47XG4gICAgdGhpcy5fZCA9IGZhbHNlO1xuICAgIHRoaXMuX3RhcmdldCA9IE5PIGFzIFN0cmVhbTxUPjtcbiAgICB0aGlzLl9lcnIgPSBOTztcbiAgfVxuXG4gIF9uKHQ6IFQpOiB2b2lkIHtcbiAgICBjb25zdCBhID0gdGhpcy5faWxzO1xuICAgIGNvbnN0IEwgPSBhLmxlbmd0aDtcbiAgICBpZiAodGhpcy5fZCkgdGhpcy5fZGwuX24odCk7XG4gICAgaWYgKEwgPT0gMSkgYVswXS5fbih0KTsgZWxzZSBpZiAoTCA9PSAwKSByZXR1cm47IGVsc2Uge1xuICAgICAgY29uc3QgYiA9IGNwKGEpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBMOyBpKyspIGJbaV0uX24odCk7XG4gICAgfVxuICB9XG5cbiAgX2UoZXJyOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZXJyICE9PSBOTykgcmV0dXJuO1xuICAgIHRoaXMuX2VyciA9IGVycjtcbiAgICBjb25zdCBhID0gdGhpcy5faWxzO1xuICAgIGNvbnN0IEwgPSBhLmxlbmd0aDtcbiAgICB0aGlzLl94KCk7XG4gICAgaWYgKHRoaXMuX2QpIHRoaXMuX2RsLl9lKGVycik7XG4gICAgaWYgKEwgPT0gMSkgYVswXS5fZShlcnIpOyBlbHNlIGlmIChMID09IDApIHJldHVybjsgZWxzZSB7XG4gICAgICBjb25zdCBiID0gY3AoYSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEw7IGkrKykgYltpXS5fZShlcnIpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX2QgJiYgTCA9PSAwKSB0aHJvdyB0aGlzLl9lcnI7XG4gIH1cblxuICBfYygpOiB2b2lkIHtcbiAgICBjb25zdCBhID0gdGhpcy5faWxzO1xuICAgIGNvbnN0IEwgPSBhLmxlbmd0aDtcbiAgICB0aGlzLl94KCk7XG4gICAgaWYgKHRoaXMuX2QpIHRoaXMuX2RsLl9jKCk7XG4gICAgaWYgKEwgPT0gMSkgYVswXS5fYygpOyBlbHNlIGlmIChMID09IDApIHJldHVybjsgZWxzZSB7XG4gICAgICBjb25zdCBiID0gY3AoYSk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEw7IGkrKykgYltpXS5fYygpO1xuICAgIH1cbiAgfVxuXG4gIF94KCk6IHZvaWQgeyAvLyB0ZWFyIGRvd24gbG9naWMsIGFmdGVyIGVycm9yIG9yIGNvbXBsZXRlXG4gICAgaWYgKHRoaXMuX2lscy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICBpZiAodGhpcy5fcHJvZCAhPT0gTk8pIHRoaXMuX3Byb2QuX3N0b3AoKTtcbiAgICB0aGlzLl9lcnIgPSBOTztcbiAgICB0aGlzLl9pbHMgPSBbXTtcbiAgfVxuXG4gIF9zdG9wTm93KCkge1xuICAgIC8vIFdBUk5JTkc6IGNvZGUgdGhhdCBjYWxscyB0aGlzIG1ldGhvZCBzaG91bGRcbiAgICAvLyBmaXJzdCBjaGVjayBpZiB0aGlzLl9wcm9kIGlzIHZhbGlkIChub3QgYE5PYClcbiAgICB0aGlzLl9wcm9kLl9zdG9wKCk7XG4gICAgdGhpcy5fZXJyID0gTk87XG4gICAgdGhpcy5fc3RvcElEID0gTk87XG4gIH1cblxuICBfYWRkKGlsOiBJbnRlcm5hbExpc3RlbmVyPFQ+KTogdm9pZCB7XG4gICAgY29uc3QgdGEgPSB0aGlzLl90YXJnZXQ7XG4gICAgaWYgKHRhICE9PSBOTykgcmV0dXJuIHRhLl9hZGQoaWwpO1xuICAgIGNvbnN0IGEgPSB0aGlzLl9pbHM7XG4gICAgYS5wdXNoKGlsKTtcbiAgICBpZiAoYS5sZW5ndGggPiAxKSByZXR1cm47XG4gICAgaWYgKHRoaXMuX3N0b3BJRCAhPT0gTk8pIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zdG9wSUQpO1xuICAgICAgdGhpcy5fc3RvcElEID0gTk87XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHAgPSB0aGlzLl9wcm9kO1xuICAgICAgaWYgKHAgIT09IE5PKSBwLl9zdGFydCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBfcmVtb3ZlKGlsOiBJbnRlcm5hbExpc3RlbmVyPFQ+KTogdm9pZCB7XG4gICAgY29uc3QgdGEgPSB0aGlzLl90YXJnZXQ7XG4gICAgaWYgKHRhICE9PSBOTykgcmV0dXJuIHRhLl9yZW1vdmUoaWwpO1xuICAgIGNvbnN0IGEgPSB0aGlzLl9pbHM7XG4gICAgY29uc3QgaSA9IGEuaW5kZXhPZihpbCk7XG4gICAgaWYgKGkgPiAtMSkge1xuICAgICAgYS5zcGxpY2UoaSwgMSk7XG4gICAgICBpZiAodGhpcy5fcHJvZCAhPT0gTk8gJiYgYS5sZW5ndGggPD0gMCkge1xuICAgICAgICB0aGlzLl9lcnIgPSBOTztcbiAgICAgICAgdGhpcy5fc3RvcElEID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLl9zdG9wTm93KCkpO1xuICAgICAgfSBlbHNlIGlmIChhLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLl9wcnVuZUN5Y2xlcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIElmIGFsbCBwYXRocyBzdGVtbWluZyBmcm9tIGB0aGlzYCBzdHJlYW0gZXZlbnR1YWxseSBlbmQgYXQgYHRoaXNgXG4gIC8vIHN0cmVhbSwgdGhlbiB3ZSByZW1vdmUgdGhlIHNpbmdsZSBsaXN0ZW5lciBvZiBgdGhpc2Agc3RyZWFtLCB0b1xuICAvLyBmb3JjZSBpdCB0byBlbmQgaXRzIGV4ZWN1dGlvbiBhbmQgZGlzcG9zZSByZXNvdXJjZXMuIFRoaXMgbWV0aG9kXG4gIC8vIGFzc3VtZXMgYXMgYSBwcmVjb25kaXRpb24gdGhhdCB0aGlzLl9pbHMgaGFzIGp1c3Qgb25lIGxpc3RlbmVyLlxuICBfcHJ1bmVDeWNsZXMoKSB7XG4gICAgaWYgKHRoaXMuX2hhc05vU2lua3ModGhpcywgW10pKSB0aGlzLl9yZW1vdmUodGhpcy5faWxzWzBdKTtcbiAgfVxuXG4gIC8vIENoZWNrcyB3aGV0aGVyICp0aGVyZSBpcyBubyogcGF0aCBzdGFydGluZyBmcm9tIGB4YCB0aGF0IGxlYWRzIHRvIGFuIGVuZFxuICAvLyBsaXN0ZW5lciAoc2luaykgaW4gdGhlIHN0cmVhbSBncmFwaCwgZm9sbG93aW5nIGVkZ2VzIEEtPkIgd2hlcmUgQiBpcyBhXG4gIC8vIGxpc3RlbmVyIG9mIEEuIFRoaXMgbWVhbnMgdGhlc2UgcGF0aHMgY29uc3RpdHV0ZSBhIGN5Y2xlIHNvbWVob3cuIElzIGdpdmVuXG4gIC8vIGEgdHJhY2Ugb2YgYWxsIHZpc2l0ZWQgbm9kZXMgc28gZmFyLlxuICBfaGFzTm9TaW5rcyh4OiBJbnRlcm5hbExpc3RlbmVyPGFueT4sIHRyYWNlOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XG4gICAgaWYgKHRyYWNlLmluZGV4T2YoeCkgIT09IC0xKVxuICAgICAgcmV0dXJuIHRydWU7IGVsc2VcbiAgICBpZiAoKHggYXMgYW55IGFzIE91dFNlbmRlcjxhbnk+KS5vdXQgPT09IHRoaXMpXG4gICAgICByZXR1cm4gdHJ1ZTsgZWxzZVxuICAgIGlmICgoeCBhcyBhbnkgYXMgT3V0U2VuZGVyPGFueT4pLm91dCAmJiAoeCBhcyBhbnkgYXMgT3V0U2VuZGVyPGFueT4pLm91dCAhPT0gTk8pXG4gICAgICByZXR1cm4gdGhpcy5faGFzTm9TaW5rcygoeCBhcyBhbnkgYXMgT3V0U2VuZGVyPGFueT4pLm91dCwgdHJhY2UuY29uY2F0KHgpKTsgZWxzZVxuICAgIGlmICgoeCBhcyBTdHJlYW08YW55PikuX2lscykge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIE4gPSAoeCBhcyBTdHJlYW08YW55PikuX2lscy5sZW5ndGg7IGkgPCBOOyBpKyspXG4gICAgICAgIGlmICghdGhpcy5faGFzTm9TaW5rcygoeCBhcyBTdHJlYW08YW55PikuX2lsc1tpXSwgdHJhY2UuY29uY2F0KHgpKSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBjdG9yKCk6IHR5cGVvZiBTdHJlYW0ge1xuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgTWVtb3J5U3RyZWFtID8gTWVtb3J5U3RyZWFtIDogU3RyZWFtO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBMaXN0ZW5lciB0byB0aGUgU3RyZWFtLlxuICAgKlxuICAgKiBAcGFyYW0ge0xpc3RlbmVyfSBsaXN0ZW5lclxuICAgKi9cbiAgYWRkTGlzdGVuZXIobGlzdGVuZXI6IFBhcnRpYWw8TGlzdGVuZXI8VD4+KTogdm9pZCB7XG4gICAgKGxpc3RlbmVyIGFzIEludGVybmFsTGlzdGVuZXI8VD4pLl9uID0gbGlzdGVuZXIubmV4dCB8fCBub29wO1xuICAgIChsaXN0ZW5lciBhcyBJbnRlcm5hbExpc3RlbmVyPFQ+KS5fZSA9IGxpc3RlbmVyLmVycm9yIHx8IG5vb3A7XG4gICAgKGxpc3RlbmVyIGFzIEludGVybmFsTGlzdGVuZXI8VD4pLl9jID0gbGlzdGVuZXIuY29tcGxldGUgfHwgbm9vcDtcbiAgICB0aGlzLl9hZGQobGlzdGVuZXIgYXMgSW50ZXJuYWxMaXN0ZW5lcjxUPik7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIExpc3RlbmVyIGZyb20gdGhlIFN0cmVhbSwgYXNzdW1pbmcgdGhlIExpc3RlbmVyIHdhcyBhZGRlZCB0byBpdC5cbiAgICpcbiAgICogQHBhcmFtIHtMaXN0ZW5lcjxUPn0gbGlzdGVuZXJcbiAgICovXG4gIHJlbW92ZUxpc3RlbmVyKGxpc3RlbmVyOiBQYXJ0aWFsPExpc3RlbmVyPFQ+Pik6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZShsaXN0ZW5lciBhcyBJbnRlcm5hbExpc3RlbmVyPFQ+KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgTGlzdGVuZXIgdG8gdGhlIFN0cmVhbSByZXR1cm5pbmcgYSBTdWJzY3JpcHRpb24gdG8gcmVtb3ZlIHRoYXRcbiAgICogbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7TGlzdGVuZXJ9IGxpc3RlbmVyXG4gICAqIEByZXR1cm5zIHtTdWJzY3JpcHRpb259XG4gICAqL1xuICBzdWJzY3JpYmUobGlzdGVuZXI6IFBhcnRpYWw8TGlzdGVuZXI8VD4+KTogU3Vic2NyaXB0aW9uIHtcbiAgICB0aGlzLmFkZExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gbmV3IFN0cmVhbVN1YjxUPih0aGlzLCBsaXN0ZW5lciBhcyBJbnRlcm5hbExpc3RlbmVyPFQ+KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgaW50ZXJvcCBiZXR3ZWVuIG1vc3QuanMgYW5kIFJ4SlMgNVxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RyZWFtfVxuICAgKi9cbiAgWyQkb2JzZXJ2YWJsZV0oKTogU3RyZWFtPFQ+IHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFN0cmVhbSBnaXZlbiBhIFByb2R1Y2VyLlxuICAgKlxuICAgKiBAZmFjdG9yeSB0cnVlXG4gICAqIEBwYXJhbSB7UHJvZHVjZXJ9IHByb2R1Y2VyIEFuIG9wdGlvbmFsIFByb2R1Y2VyIHRoYXQgZGljdGF0ZXMgaG93IHRvXG4gICAqIHN0YXJ0LCBnZW5lcmF0ZSBldmVudHMsIGFuZCBzdG9wIHRoZSBTdHJlYW0uXG4gICAqIEByZXR1cm4ge1N0cmVhbX1cbiAgICovXG4gIHN0YXRpYyBjcmVhdGU8VD4ocHJvZHVjZXI/OiBQcm9kdWNlcjxUPik6IFN0cmVhbTxUPiB7XG4gICAgaWYgKHByb2R1Y2VyKSB7XG4gICAgICBpZiAodHlwZW9mIHByb2R1Y2VyLnN0YXJ0ICE9PSAnZnVuY3Rpb24nXG4gICAgICB8fCB0eXBlb2YgcHJvZHVjZXIuc3RvcCAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcm9kdWNlciByZXF1aXJlcyBib3RoIHN0YXJ0IGFuZCBzdG9wIGZ1bmN0aW9ucycpO1xuICAgICAgaW50ZXJuYWxpemVQcm9kdWNlcihwcm9kdWNlcik7IC8vIG11dGF0ZXMgdGhlIGlucHV0XG4gICAgfVxuICAgIHJldHVybiBuZXcgU3RyZWFtKHByb2R1Y2VyIGFzIEludGVybmFsUHJvZHVjZXI8VD4gJiBQcm9kdWNlcjxUPik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBNZW1vcnlTdHJlYW0gZ2l2ZW4gYSBQcm9kdWNlci5cbiAgICpcbiAgICogQGZhY3RvcnkgdHJ1ZVxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyfSBwcm9kdWNlciBBbiBvcHRpb25hbCBQcm9kdWNlciB0aGF0IGRpY3RhdGVzIGhvdyB0b1xuICAgKiBzdGFydCwgZ2VuZXJhdGUgZXZlbnRzLCBhbmQgc3RvcCB0aGUgU3RyZWFtLlxuICAgKiBAcmV0dXJuIHtNZW1vcnlTdHJlYW19XG4gICAqL1xuICBzdGF0aWMgY3JlYXRlV2l0aE1lbW9yeTxUPihwcm9kdWNlcj86IFByb2R1Y2VyPFQ+KTogTWVtb3J5U3RyZWFtPFQ+IHtcbiAgICBpZiAocHJvZHVjZXIpIGludGVybmFsaXplUHJvZHVjZXIocHJvZHVjZXIpOyAvLyBtdXRhdGVzIHRoZSBpbnB1dFxuICAgIHJldHVybiBuZXcgTWVtb3J5U3RyZWFtPFQ+KHByb2R1Y2VyIGFzIEludGVybmFsUHJvZHVjZXI8VD4gJiBQcm9kdWNlcjxUPik7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFN0cmVhbSB0aGF0IGRvZXMgbm90aGluZyB3aGVuIHN0YXJ0ZWQuIEl0IG5ldmVyIGVtaXRzIGFueSBldmVudC5cbiAgICpcbiAgICogTWFyYmxlIGRpYWdyYW06XG4gICAqXG4gICAqIGBgYHRleHRcbiAgICogICAgICAgICAgbmV2ZXJcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogYGBgXG4gICAqXG4gICAqIEBmYWN0b3J5IHRydWVcbiAgICogQHJldHVybiB7U3RyZWFtfVxuICAgKi9cbiAgc3RhdGljIG5ldmVyKCk6IFN0cmVhbTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFN0cmVhbTxhbnk+KHtfc3RhcnQ6IG5vb3AsIF9zdG9wOiBub29wfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFN0cmVhbSB0aGF0IGltbWVkaWF0ZWx5IGVtaXRzIHRoZSBcImNvbXBsZXRlXCIgbm90aWZpY2F0aW9uIHdoZW5cbiAgICogc3RhcnRlZCwgYW5kIHRoYXQncyBpdC5cbiAgICpcbiAgICogTWFyYmxlIGRpYWdyYW06XG4gICAqXG4gICAqIGBgYHRleHRcbiAgICogZW1wdHlcbiAgICogLXxcbiAgICogYGBgXG4gICAqXG4gICAqIEBmYWN0b3J5IHRydWVcbiAgICogQHJldHVybiB7U3RyZWFtfVxuICAgKi9cbiAgc3RhdGljIGVtcHR5KCk6IFN0cmVhbTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFN0cmVhbTxhbnk+KHtcbiAgICAgIF9zdGFydChpbDogSW50ZXJuYWxMaXN0ZW5lcjxhbnk+KSB7IGlsLl9jKCk7IH0sXG4gICAgICBfc3RvcDogbm9vcCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgU3RyZWFtIHRoYXQgaW1tZWRpYXRlbHkgZW1pdHMgYW4gXCJlcnJvclwiIG5vdGlmaWNhdGlvbiB3aXRoIHRoZVxuICAgKiB2YWx1ZSB5b3UgcGFzc2VkIGFzIHRoZSBgZXJyb3JgIGFyZ3VtZW50IHdoZW4gdGhlIHN0cmVhbSBzdGFydHMsIGFuZCB0aGF0J3NcbiAgICogaXQuXG4gICAqXG4gICAqIE1hcmJsZSBkaWFncmFtOlxuICAgKlxuICAgKiBgYGB0ZXh0XG4gICAqIHRocm93KFgpXG4gICAqIC1YXG4gICAqIGBgYFxuICAgKlxuICAgKiBAZmFjdG9yeSB0cnVlXG4gICAqIEBwYXJhbSBlcnJvciBUaGUgZXJyb3IgZXZlbnQgdG8gZW1pdCBvbiB0aGUgY3JlYXRlZCBzdHJlYW0uXG4gICAqIEByZXR1cm4ge1N0cmVhbX1cbiAgICovXG4gIHN0YXRpYyB0aHJvdyhlcnJvcjogYW55KTogU3RyZWFtPGFueT4ge1xuICAgIHJldHVybiBuZXcgU3RyZWFtPGFueT4oe1xuICAgICAgX3N0YXJ0KGlsOiBJbnRlcm5hbExpc3RlbmVyPGFueT4pIHsgaWwuX2UoZXJyb3IpOyB9LFxuICAgICAgX3N0b3A6IG5vb3AsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHN0cmVhbSBmcm9tIGFuIEFycmF5LCBQcm9taXNlLCBvciBhbiBPYnNlcnZhYmxlLlxuICAgKlxuICAgKiBAZmFjdG9yeSB0cnVlXG4gICAqIEBwYXJhbSB7QXJyYXl8UHJvbWlzZUxpa2V8T2JzZXJ2YWJsZX0gaW5wdXQgVGhlIGlucHV0IHRvIG1ha2UgYSBzdHJlYW0gZnJvbS5cbiAgICogQHJldHVybiB7U3RyZWFtfVxuICAgKi9cbiAgc3RhdGljIGZyb208VD4oaW5wdXQ6IFByb21pc2VMaWtlPFQ+IHwgU3RyZWFtPFQ+IHwgQXJyYXk8VD4gfCBPYnNlcnZhYmxlPFQ+KTogU3RyZWFtPFQ+IHtcbiAgICBpZiAodHlwZW9mIGlucHV0WyQkb2JzZXJ2YWJsZV0gPT09ICdmdW5jdGlvbicpXG4gICAgICByZXR1cm4gU3RyZWFtLmZyb21PYnNlcnZhYmxlPFQ+KGlucHV0IGFzIE9ic2VydmFibGU8VD4pOyBlbHNlXG4gICAgaWYgKHR5cGVvZiAoaW5wdXQgYXMgUHJvbWlzZUxpa2U8VD4pLnRoZW4gPT09ICdmdW5jdGlvbicpXG4gICAgICByZXR1cm4gU3RyZWFtLmZyb21Qcm9taXNlPFQ+KGlucHV0IGFzIFByb21pc2VMaWtlPFQ+KTsgZWxzZVxuICAgIGlmIChBcnJheS5pc0FycmF5KGlucHV0KSlcbiAgICAgIHJldHVybiBTdHJlYW0uZnJvbUFycmF5PFQ+KGlucHV0KTtcblxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFR5cGUgb2YgaW5wdXQgdG8gZnJvbSgpIG11c3QgYmUgYW4gQXJyYXksIFByb21pc2UsIG9yIE9ic2VydmFibGVgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgU3RyZWFtIHRoYXQgaW1tZWRpYXRlbHkgZW1pdHMgdGhlIGFyZ3VtZW50cyB0aGF0IHlvdSBnaXZlIHRvXG4gICAqICpvZiosIHRoZW4gY29tcGxldGVzLlxuICAgKlxuICAgKiBNYXJibGUgZGlhZ3JhbTpcbiAgICpcbiAgICogYGBgdGV4dFxuICAgKiBvZigxLDIsMylcbiAgICogMTIzfFxuICAgKiBgYGBcbiAgICpcbiAgICogQGZhY3RvcnkgdHJ1ZVxuICAgKiBAcGFyYW0gYSBUaGUgZmlyc3QgdmFsdWUgeW91IHdhbnQgdG8gZW1pdCBhcyBhbiBldmVudCBvbiB0aGUgc3RyZWFtLlxuICAgKiBAcGFyYW0gYiBUaGUgc2Vjb25kIHZhbHVlIHlvdSB3YW50IHRvIGVtaXQgYXMgYW4gZXZlbnQgb24gdGhlIHN0cmVhbS4gT25lXG4gICAqIG9yIG1vcmUgb2YgdGhlc2UgdmFsdWVzIG1heSBiZSBnaXZlbiBhcyBhcmd1bWVudHMuXG4gICAqIEByZXR1cm4ge1N0cmVhbX1cbiAgICovXG4gIHN0YXRpYyBvZjxUPiguLi5pdGVtczogQXJyYXk8VD4pOiBTdHJlYW08VD4ge1xuICAgIHJldHVybiBTdHJlYW0uZnJvbUFycmF5PFQ+KGl0ZW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhbiBhcnJheSB0byBhIHN0cmVhbS4gVGhlIHJldHVybmVkIHN0cmVhbSB3aWxsIGVtaXQgc3luY2hyb25vdXNseVxuICAgKiBhbGwgdGhlIGl0ZW1zIGluIHRoZSBhcnJheSwgYW5kIHRoZW4gY29tcGxldGUuXG4gICAqXG4gICAqIE1hcmJsZSBkaWFncmFtOlxuICAgKlxuICAgKiBgYGB0ZXh0XG4gICAqIGZyb21BcnJheShbMSwyLDNdKVxuICAgKiAxMjN8XG4gICAqIGBgYFxuICAgKlxuICAgKiBAZmFjdG9yeSB0cnVlXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBiZSBjb252ZXJ0ZWQgYXMgYSBzdHJlYW0uXG4gICAqIEByZXR1cm4ge1N0cmVhbX1cbiAgICovXG4gIHN0YXRpYyBmcm9tQXJyYXk8VD4oYXJyYXk6IEFycmF5PFQ+KTogU3RyZWFtPFQ+IHtcbiAgICByZXR1cm4gbmV3IFN0cmVhbTxUPihuZXcgRnJvbUFycmF5PFQ+KGFycmF5KSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBwcm9taXNlIHRvIGEgc3RyZWFtLiBUaGUgcmV0dXJuZWQgc3RyZWFtIHdpbGwgZW1pdCB0aGUgcmVzb2x2ZWRcbiAgICogdmFsdWUgb2YgdGhlIHByb21pc2UsIGFuZCB0aGVuIGNvbXBsZXRlLiBIb3dldmVyLCBpZiB0aGUgcHJvbWlzZSBpc1xuICAgKiByZWplY3RlZCwgdGhlIHN0cmVhbSB3aWxsIGVtaXQgdGhlIGNvcnJlc3BvbmRpbmcgZXJyb3IuXG4gICAqXG4gICAqIE1hcmJsZSBkaWFncmFtOlxuICAgKlxuICAgKiBgYGB0ZXh0XG4gICAqIGZyb21Qcm9taXNlKCAtLS0tNDIgKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLTQyfFxuICAgKiBgYGBcbiAgICpcbiAgICogQGZhY3RvcnkgdHJ1ZVxuICAgKiBAcGFyYW0ge1Byb21pc2VMaWtlfSBwcm9taXNlIFRoZSBwcm9taXNlIHRvIGJlIGNvbnZlcnRlZCBhcyBhIHN0cmVhbS5cbiAgICogQHJldHVybiB7U3RyZWFtfVxuICAgKi9cbiAgc3RhdGljIGZyb21Qcm9taXNlPFQ+KHByb21pc2U6IFByb21pc2VMaWtlPFQ+KTogU3RyZWFtPFQ+IHtcbiAgICByZXR1cm4gbmV3IFN0cmVhbTxUPihuZXcgRnJvbVByb21pc2U8VD4ocHJvbWlzZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGFuIE9ic2VydmFibGUgaW50byBhIFN0cmVhbS5cbiAgICpcbiAgICogQGZhY3RvcnkgdHJ1ZVxuICAgKiBAcGFyYW0ge2FueX0gb2JzZXJ2YWJsZSBUaGUgb2JzZXJ2YWJsZSB0byBiZSBjb252ZXJ0ZWQgYXMgYSBzdHJlYW0uXG4gICAqIEByZXR1cm4ge1N0cmVhbX1cbiAgICovXG4gIHN0YXRpYyBmcm9tT2JzZXJ2YWJsZTxUPihvYnM6IHtzdWJzY3JpYmU6IGFueX0pOiBTdHJlYW08VD4ge1xuICAgIGlmICgob2JzIGFzIFN0cmVhbTxUPikuZW5kV2hlbikgcmV0dXJuIG9icyBhcyBTdHJlYW08VD47XG4gICAgY29uc3QgbyA9IHR5cGVvZiBvYnNbJCRvYnNlcnZhYmxlXSA9PT0gJ2Z1bmN0aW9uJyA/IG9ic1skJG9ic2VydmFibGVdKCkgOiBvYnM7XG4gICAgcmV0dXJuIG5ldyBTdHJlYW08VD4obmV3IEZyb21PYnNlcnZhYmxlKG8pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgc3RyZWFtIHRoYXQgcGVyaW9kaWNhbGx5IGVtaXRzIGluY3JlbWVudGFsIG51bWJlcnMsIGV2ZXJ5XG4gICAqIGBwZXJpb2RgIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogTWFyYmxlIGRpYWdyYW06XG4gICAqXG4gICAqIGBgYHRleHRcbiAgICogICAgIHBlcmlvZGljKDEwMDApXG4gICAqIC0tLTAtLS0xLS0tMi0tLTMtLS00LS0tLi4uXG4gICAqIGBgYFxuICAgKlxuICAgKiBAZmFjdG9yeSB0cnVlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwZXJpb2QgVGhlIGludGVydmFsIGluIG1pbGxpc2Vjb25kcyB0byB1c2UgYXMgYSByYXRlIG9mXG4gICAqIGVtaXNzaW9uLlxuICAgKiBAcmV0dXJuIHtTdHJlYW19XG4gICAqL1xuICBzdGF0aWMgcGVyaW9kaWMocGVyaW9kOiBudW1iZXIpOiBTdHJlYW08bnVtYmVyPiB7XG4gICAgcmV0dXJuIG5ldyBTdHJlYW08bnVtYmVyPihuZXcgUGVyaW9kaWMocGVyaW9kKSk7XG4gIH1cblxuICAvKipcbiAgICogQmxlbmRzIG11bHRpcGxlIHN0cmVhbXMgdG9nZXRoZXIsIGVtaXR0aW5nIGV2ZW50cyBmcm9tIGFsbCBvZiB0aGVtXG4gICAqIGNvbmN1cnJlbnRseS5cbiAgICpcbiAgICogKm1lcmdlKiB0YWtlcyBtdWx0aXBsZSBzdHJlYW1zIGFzIGFyZ3VtZW50cywgYW5kIGNyZWF0ZXMgYSBzdHJlYW0gdGhhdFxuICAgKiBiZWhhdmVzIGxpa2UgZWFjaCBvZiB0aGUgYXJndW1lbnQgc3RyZWFtcywgaW4gcGFyYWxsZWwuXG4gICAqXG4gICAqIE1hcmJsZSBkaWFncmFtOlxuICAgKlxuICAgKiBgYGB0ZXh0XG4gICAqIC0tMS0tLS0yLS0tLS0zLS0tLS0tLS00LS0tXG4gICAqIC0tLS1hLS0tLS1iLS0tLWMtLS1kLS0tLS0tXG4gICAqICAgICAgICAgICAgbWVyZ2VcbiAgICogLS0xLWEtLTItLWItLTMtYy0tLWQtLTQtLS1cbiAgICogYGBgXG4gICAqXG4gICAqIEBmYWN0b3J5IHRydWVcbiAgICogQHBhcmFtIHtTdHJlYW19IHN0cmVhbTEgQSBzdHJlYW0gdG8gbWVyZ2UgdG9nZXRoZXIgd2l0aCBvdGhlciBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtMiBBIHN0cmVhbSB0byBtZXJnZSB0b2dldGhlciB3aXRoIG90aGVyIHN0cmVhbXMuIFR3b1xuICAgKiBvciBtb3JlIHN0cmVhbXMgbWF5IGJlIGdpdmVuIGFzIGFyZ3VtZW50cy5cbiAgICogQHJldHVybiB7U3RyZWFtfVxuICAgKi9cbiAgc3RhdGljIG1lcmdlOiBNZXJnZVNpZ25hdHVyZSA9IGZ1bmN0aW9uIG1lcmdlKC4uLnN0cmVhbXM6IEFycmF5PFN0cmVhbTxhbnk+Pikge1xuICAgIHJldHVybiBuZXcgU3RyZWFtPGFueT4obmV3IE1lcmdlKHN0cmVhbXMpKTtcbiAgfSBhcyBNZXJnZVNpZ25hdHVyZTtcblxuICAvKipcbiAgICogQ29tYmluZXMgbXVsdGlwbGUgaW5wdXQgc3RyZWFtcyB0b2dldGhlciB0byByZXR1cm4gYSBzdHJlYW0gd2hvc2UgZXZlbnRzXG4gICAqIGFyZSBhcnJheXMgdGhhdCBjb2xsZWN0IHRoZSBsYXRlc3QgZXZlbnRzIGZyb20gZWFjaCBpbnB1dCBzdHJlYW0uXG4gICAqXG4gICAqICpjb21iaW5lKiBpbnRlcm5hbGx5IHJlbWVtYmVycyB0aGUgbW9zdCByZWNlbnQgZXZlbnQgZnJvbSBlYWNoIG9mIHRoZSBpbnB1dFxuICAgKiBzdHJlYW1zLiBXaGVuIGFueSBvZiB0aGUgaW5wdXQgc3RyZWFtcyBlbWl0cyBhbiBldmVudCwgdGhhdCBldmVudCB0b2dldGhlclxuICAgKiB3aXRoIGFsbCB0aGUgb3RoZXIgc2F2ZWQgZXZlbnRzIGFyZSBjb21iaW5lZCBpbnRvIGFuIGFycmF5LiBUaGF0IGFycmF5IHdpbGxcbiAgICogYmUgZW1pdHRlZCBvbiB0aGUgb3V0cHV0IHN0cmVhbS4gSXQncyBlc3NlbnRpYWxseSBhIHdheSBvZiBqb2luaW5nIHRvZ2V0aGVyXG4gICAqIHRoZSBldmVudHMgZnJvbSBtdWx0aXBsZSBzdHJlYW1zLlxuICAgKlxuICAgKiBNYXJibGUgZGlhZ3JhbTpcbiAgICpcbiAgICogYGBgdGV4dFxuICAgKiAtLTEtLS0tMi0tLS0tMy0tLS0tLS0tNC0tLVxuICAgKiAtLS0tYS0tLS0tYi0tLS0tYy0tZC0tLS0tLVxuICAgKiAgICAgICAgICBjb21iaW5lXG4gICAqIC0tLS0xYS0yYS0yYi0zYi0zYy0zZC00ZC0tXG4gICAqIGBgYFxuICAgKlxuICAgKiBAZmFjdG9yeSB0cnVlXG4gICAqIEBwYXJhbSB7U3RyZWFtfSBzdHJlYW0xIEEgc3RyZWFtIHRvIGNvbWJpbmUgdG9nZXRoZXIgd2l0aCBvdGhlciBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge1N0cmVhbX0gc3RyZWFtMiBBIHN0cmVhbSB0byBjb21iaW5lIHRvZ2V0aGVyIHdpdGggb3RoZXIgc3RyZWFtcy5cbiAgICogTXVsdGlwbGUgc3RyZWFtcywgbm90IGp1c3QgdHdvLCBtYXkgYmUgZ2l2ZW4gYXMgYXJndW1lbnRzLlxuICAgKiBAcmV0dXJuIHtTdHJlYW19XG4gICAqL1xuICBzdGF0aWMgY29tYmluZTogQ29tYmluZVNpZ25hdHVyZSA9IGZ1bmN0aW9uIGNvbWJpbmUoLi4uc3RyZWFtczogQXJyYXk8U3RyZWFtPGFueT4+KSB7XG4gICAgcmV0dXJuIG5ldyBTdHJlYW08QXJyYXk8YW55Pj4obmV3IENvbWJpbmU8YW55PihzdHJlYW1zKSk7XG4gIH0gYXMgQ29tYmluZVNpZ25hdHVyZTtcblxuICBwcm90ZWN0ZWQgX21hcDxVPihwcm9qZWN0OiAodDogVCkgPT4gVSk6IFN0cmVhbTxVPiB8IE1lbW9yeVN0cmVhbTxVPiB7XG4gICAgcmV0dXJuIG5ldyAodGhpcy5jdG9yKCkpPFU+KG5ldyBNYXBPcDxULCBVPihwcm9qZWN0LCB0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNmb3JtcyBlYWNoIGV2ZW50IGZyb20gdGhlIGlucHV0IFN0cmVhbSB0aHJvdWdoIGEgYHByb2plY3RgIGZ1bmN0aW9uLFxuICAgKiB0byBnZXQgYSBTdHJlYW0gdGhhdCBlbWl0cyB0aG9zZSB0cmFuc2Zvcm1lZCBldmVudHMuXG4gICAqXG4gICAqIE1hcmJsZSBkaWFncmFtOlxuICAgKlxuICAgKiBgYGB0ZXh0XG4gICAqIC0tMS0tLTMtLTUtLS0tLTctLS0tLS1cbiAgICogICAgbWFwKGkgPT4gaSAqIDEwKVxuICAgKiAtLTEwLS0zMC01MC0tLS03MC0tLS0tXG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm9qZWN0IEEgZnVuY3Rpb24gb2YgdHlwZSBgKHQ6IFQpID0+IFVgIHRoYXQgdGFrZXMgZXZlbnRcbiAgICogYHRgIG9mIHR5cGUgYFRgIGZyb20gdGhlIGlucHV0IFN0cmVhbSBhbmQgcHJvZHVjZXMgYW4gZXZlbnQgb2YgdHlwZSBgVWAsIHRvXG4gICAqIGJlIGVtaXR0ZWQgb24gdGhlIG91dHB1dCBTdHJlYW0uXG4gICAqIEByZXR1cm4ge1N0cmVhbX1cbiAgICovXG4gIG1hcDxVPihwcm9qZWN0OiAodDogVCkgPT4gVSk6IFN0cmVhbTxVPiB7XG4gICAgcmV0dXJuIHRoaXMuX21hcChwcm9qZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdCdzIGxpa2UgYG1hcGAsIGJ1dCB0cmFuc2Zvcm1zIGVhY2ggaW5wdXQgZXZlbnQgdG8gYWx3YXlzIHRoZSBzYW1lXG4gICAqIGNvbnN0YW50IHZhbHVlIG9uIHRoZSBvdXRwdXQgU3RyZWFtLlxuICAgKlxuICAgKiBNYXJibGUgZGlhZ3JhbTpcbiAgICpcbiAgICogYGBgdGV4dFxuICAgKiAtLTEtLS0zLS01LS0tLS03LS0tLS1cbiAgICogICAgICAgbWFwVG8oMTApXG4gICAqIC0tMTAtLTEwLTEwLS0tLTEwLS0tLVxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHByb2plY3RlZFZhbHVlIEEgdmFsdWUgdG8gZW1pdCBvbiB0aGUgb3V0cHV0IFN0cmVhbSB3aGVuZXZlciB0aGVcbiAgICogaW5wdXQgU3RyZWFtIGVtaXRzIGFueSB2YWx1ZS5cbiAgICogQHJldHVybiB7U3RyZWFtfVxuICAgKi9cbiAgbWFwVG88VT4ocHJvamVjdGVkVmFsdWU6IFUpOiBTdHJlYW08VT4ge1xuICAgIGNvbnN0IHMgPSB0aGlzLm1hcCgoKSA9PiBwcm9qZWN0ZWRWYWx1ZSk7XG4gICAgY29uc3Qgb3A6IE9wZXJhdG9yPFQsIFU+ID0gcy5fcHJvZCBhcyBPcGVyYXRvcjxULCBVPjtcbiAgICBvcC50eXBlID0gJ21hcFRvJztcbiAgICByZXR1cm4gcztcbiAgfVxuXG4gIGZpbHRlcjxTIGV4dGVuZHMgVD4ocGFzc2VzOiAodDogVCkgPT4gdCBpcyBTKTogU3RyZWFtPFM+O1xuICBmaWx0ZXIocGFzc2VzOiAodDogVCkgPT4gYm9vbGVhbik6IFN0cmVhbTxUPjtcbiAgLyoqXG4gICAqIE9ubHkgYWxsb3dzIGV2ZW50cyB0aGF0IHBhc3MgdGhlIHRlc3QgZ2l2ZW4gYnkgdGhlIGBwYXNzZXNgIGFyZ3VtZW50LlxuICAgKlxuICAgKiBFYWNoIGV2ZW50IGZyb20gdGhlIGlucHV0IHN0cmVhbSBpcyBnaXZlbiB0byB0aGUgYHBhc3Nlc2AgZnVuY3Rpb24uIElmIHRoZVxuICAgKiBmdW5jdGlvbiByZXR1cm5zIGB0cnVlYCwgdGhlIGV2ZW50IGlzIGZvcndhcmRlZCB0byB0aGUgb3V0cHV0IHN0cmVhbSxcbiAgICogb3RoZXJ3aXNlIGl0IGlzIGlnbm9yZWQgYW5kIG5vdCBmb3J3YXJkZWQuXG4gICAqXG4gICAqIE1hcmJsZSBkaWFncmFtOlxuICAgKlxuICAgKiBgYGB0ZXh0XG4gICAqIC0tMS0tLTItLTMtLS0tLTQtLS0tLTUtLS02LS03LTgtLVxuICAgKiAgICAgZmlsdGVyKGkgPT4gaSAlIDIgPT09IDApXG4gICAqIC0tLS0tLTItLS0tLS0tLTQtLS0tLS0tLS02LS0tLTgtLVxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFzc2VzIEEgZnVuY3Rpb24gb2YgdHlwZSBgKHQ6IFQpID0+IGJvb2xlYW5gIHRoYXQgdGFrZXNcbiAgICogYW4gZXZlbnQgZnJvbSB0aGUgaW5wdXQgc3RyZWFtIGFuZCBjaGVja3MgaWYgaXQgcGFzc2VzLCBieSByZXR1cm5pbmcgYVxuICAgKiBib29sZWFuLlxuICAgKiBAcmV0dXJuIHtTdHJlYW19XG4gICAqL1xuICBmaWx0ZXIocGFzc2VzOiAodDogVCkgPT4gYm9vbGVhbik6IFN0cmVhbTxUPiB7XG4gICAgY29uc3QgcCA9IHRoaXMuX3Byb2Q7XG4gICAgaWYgKHAgaW5zdGFuY2VvZiBGaWx0ZXIpXG4gICAgICByZXR1cm4gbmV3IFN0cmVhbTxUPihuZXcgRmlsdGVyPFQ+KFxuICAgICAgICBhbmQoKHAgYXMgRmlsdGVyPFQ+KS5mLCBwYXNzZXMpLFxuICAgICAgICAocCBhcyBGaWx0ZXI8VD4pLmluc1xuICAgICAgKSk7XG4gICAgcmV0dXJuIG5ldyBTdHJlYW08VD4obmV3IEZpbHRlcjxUPihwYXNzZXMsIHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMZXRzIHRoZSBmaXJzdCBgYW1vdW50YCBtYW55IGV2ZW50cyBmcm9tIHRoZSBpbnB1dCBzdHJlYW0gcGFzcyB0byB0aGVcbiAgICogb3V0cHV0IHN0cmVhbSwgdGhlbiBtYWtlcyB0aGUgb3V0cHV0IHN0cmVhbSBjb21wbGV0ZS5cbiAgICpcbiAgICogTWFyYmxlIGRpYWdyYW06XG4gICAqXG4gICAqIGBgYHRleHRcbiAgICogLS1hLS0tYi0tYy0tLS1kLS0tZS0tXG4gICAqICAgIHRha2UoMylcbiAgICogLS1hLS0tYi0tY3xcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnQgSG93IG1hbnkgZXZlbnRzIHRvIGFsbG93IGZyb20gdGhlIGlucHV0IHN0cmVhbVxuICAgKiBiZWZvcmUgY29tcGxldGluZyB0aGUgb3V0cHV0IHN0cmVhbS5cbiAgICogQHJldHVybiB7U3RyZWFtfVxuICAgKi9cbiAgdGFrZShhbW91bnQ6IG51bWJlcik6IFN0cmVhbTxUPiB7XG4gICAgcmV0dXJuIG5ldyAodGhpcy5jdG9yKCkpPFQ+KG5ldyBUYWtlPFQ+KGFtb3VudCwgdGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIElnbm9yZXMgdGhlIGZpcnN0IGBhbW91bnRgIG1hbnkgZXZlbnRzIGZyb20gdGhlIGlucHV0IHN0cmVhbSwgYW5kIHRoZW5cbiAgICogYWZ0ZXIgdGhhdCBzdGFydHMgZm9yd2FyZGluZyBldmVudHMgZnJvbSB0aGUgaW5wdXQgc3RyZWFtIHRvIHRoZSBvdXRwdXRcbiAgICogc3RyZWFtLlxuICAgKlxuICAgKiBNYXJibGUgZGlhZ3JhbTpcbiAgICpcbiAgICogYGBgdGV4dFxuICAgKiAtLWEtLS1iLS1jLS0tLWQtLS1lLS1cbiAgICogICAgICAgZHJvcCgzKVxuICAgKiAtLS0tLS0tLS0tLS0tLWQtLS1lLS1cbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnQgSG93IG1hbnkgZXZlbnRzIHRvIGlnbm9yZSBmcm9tIHRoZSBpbnB1dCBzdHJlYW1cbiAgICogYmVmb3JlIGZvcndhcmRpbmcgYWxsIGV2ZW50cyBmcm9tIHRoZSBpbnB1dCBzdHJlYW0gdG8gdGhlIG91dHB1dCBzdHJlYW0uXG4gICAqIEByZXR1cm4ge1N0cmVhbX1cbiAgICovXG4gIGRyb3AoYW1vdW50OiBudW1iZXIpOiBTdHJlYW08VD4ge1xuICAgIHJldHVybiBuZXcgU3RyZWFtPFQ+KG5ldyBEcm9wPFQ+KGFtb3VudCwgdGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIGlucHV0IHN0cmVhbSBjb21wbGV0ZXMsIHRoZSBvdXRwdXQgc3RyZWFtIHdpbGwgZW1pdCB0aGUgbGFzdCBldmVudFxuICAgKiBlbWl0dGVkIGJ5IHRoZSBpbnB1dCBzdHJlYW0sIGFuZCB0aGVuIHdpbGwgYWxzbyBjb21wbGV0ZS5cbiAgICpcbiAgICogTWFyYmxlIGRpYWdyYW06XG4gICAqXG4gICAqIGBgYHRleHRcbiAgICogLS1hLS0tYi0tYy0tZC0tLS18XG4gICAqICAgICAgIGxhc3QoKVxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLWR8XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcmV0dXJuIHtTdHJlYW19XG4gICAqL1xuICBsYXN0KCk6IFN0cmVhbTxUPiB7XG4gICAgcmV0dXJuIG5ldyBTdHJlYW08VD4obmV3IExhc3Q8VD4odGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXBlbmRzIHRoZSBnaXZlbiBgaW5pdGlhbGAgdmFsdWUgdG8gdGhlIHNlcXVlbmNlIG9mIGV2ZW50cyBlbWl0dGVkIGJ5IHRoZVxuICAgKiBpbnB1dCBzdHJlYW0uIFRoZSByZXR1cm5lZCBzdHJlYW0gaXMgYSBNZW1vcnlTdHJlYW0sIHdoaWNoIG1lYW5zIGl0IGlzXG4gICAqIGFscmVhZHkgYHJlbWVtYmVyKClgJ2QuXG4gICAqXG4gICAqIE1hcmJsZSBkaWFncmFtOlxuICAgKlxuICAgKiBgYGB0ZXh0XG4gICAqIC0tLTEtLS0yLS0tLS0zLS0tXG4gICAqICAgc3RhcnRXaXRoKDApXG4gICAqIDAtLTEtLS0yLS0tLS0zLS0tXG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gaW5pdGlhbCBUaGUgdmFsdWUgb3IgZXZlbnQgdG8gcHJlcGVuZC5cbiAgICogQHJldHVybiB7TWVtb3J5U3RyZWFtfVxuICAgKi9cbiAgc3RhcnRXaXRoKGluaXRpYWw6IFQpOiBNZW1vcnlTdHJlYW08VD4ge1xuICAgIHJldHVybiBuZXcgTWVtb3J5U3RyZWFtPFQ+KG5ldyBTdGFydFdpdGg8VD4odGhpcywgaW5pdGlhbCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZXMgYW5vdGhlciBzdHJlYW0gdG8gZGV0ZXJtaW5lIHdoZW4gdG8gY29tcGxldGUgdGhlIGN1cnJlbnQgc3RyZWFtLlxuICAgKlxuICAgKiBXaGVuIHRoZSBnaXZlbiBgb3RoZXJgIHN0cmVhbSBlbWl0cyBhbiBldmVudCBvciBjb21wbGV0ZXMsIHRoZSBvdXRwdXRcbiAgICogc3RyZWFtIHdpbGwgY29tcGxldGUuIEJlZm9yZSB0aGF0IGhhcHBlbnMsIHRoZSBvdXRwdXQgc3RyZWFtIHdpbGwgYmVoYXZlc1xuICAgKiBsaWtlIHRoZSBpbnB1dCBzdHJlYW0uXG4gICAqXG4gICAqIE1hcmJsZSBkaWFncmFtOlxuICAgKlxuICAgKiBgYGB0ZXh0XG4gICAqIC0tLTEtLS0yLS0tLS0zLS00LS0tLTUtLS0tNi0tLVxuICAgKiAgIGVuZFdoZW4oIC0tLS0tLS0tYS0tYi0tfCApXG4gICAqIC0tLTEtLS0yLS0tLS0zLS00LS18XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gb3RoZXIgU29tZSBvdGhlciBzdHJlYW0gdGhhdCBpcyB1c2VkIHRvIGtub3cgd2hlbiBzaG91bGQgdGhlIG91dHB1dFxuICAgKiBzdHJlYW0gb2YgdGhpcyBvcGVyYXRvciBjb21wbGV0ZS5cbiAgICogQHJldHVybiB7U3RyZWFtfVxuICAgKi9cbiAgZW5kV2hlbihvdGhlcjogU3RyZWFtPGFueT4pOiBTdHJlYW08VD4ge1xuICAgIHJldHVybiBuZXcgKHRoaXMuY3RvcigpKTxUPihuZXcgRW5kV2hlbjxUPihvdGhlciwgdGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFwiRm9sZHNcIiB0aGUgc3RyZWFtIG9udG8gaXRzZWxmLlxuICAgKlxuICAgKiBDb21iaW5lcyBldmVudHMgZnJvbSB0aGUgcGFzdCB0aHJvdWdob3V0XG4gICAqIHRoZSBlbnRpcmUgZXhlY3V0aW9uIG9mIHRoZSBpbnB1dCBzdHJlYW0sIGFsbG93aW5nIHlvdSB0byBhY2N1bXVsYXRlIHRoZW1cbiAgICogdG9nZXRoZXIuIEl0J3MgZXNzZW50aWFsbHkgbGlrZSBgQXJyYXkucHJvdG90eXBlLnJlZHVjZWAuIFRoZSByZXR1cm5lZFxuICAgKiBzdHJlYW0gaXMgYSBNZW1vcnlTdHJlYW0sIHdoaWNoIG1lYW5zIGl0IGlzIGFscmVhZHkgYHJlbWVtYmVyKClgJ2QuXG4gICAqXG4gICAqIFRoZSBvdXRwdXQgc3RyZWFtIHN0YXJ0cyBieSBlbWl0dGluZyB0aGUgYHNlZWRgIHdoaWNoIHlvdSBnaXZlIGFzIGFyZ3VtZW50LlxuICAgKiBUaGVuLCB3aGVuIGFuIGV2ZW50IGhhcHBlbnMgb24gdGhlIGlucHV0IHN0cmVhbSwgaXQgaXMgY29tYmluZWQgd2l0aCB0aGF0XG4gICAqIHNlZWQgdmFsdWUgdGhyb3VnaCB0aGUgYGFjY3VtdWxhdGVgIGZ1bmN0aW9uLCBhbmQgdGhlIG91dHB1dCB2YWx1ZSBpc1xuICAgKiBlbWl0dGVkIG9uIHRoZSBvdXRwdXQgc3RyZWFtLiBgZm9sZGAgcmVtZW1iZXJzIHRoYXQgb3V0cHV0IHZhbHVlIGFzIGBhY2NgXG4gICAqIChcImFjY3VtdWxhdG9yXCIpLCBhbmQgdGhlbiB3aGVuIGEgbmV3IGlucHV0IGV2ZW50IGB0YCBoYXBwZW5zLCBgYWNjYCB3aWxsIGJlXG4gICAqIGNvbWJpbmVkIHdpdGggdGhhdCB0byBwcm9kdWNlIHRoZSBuZXcgYGFjY2AgYW5kIHNvIGZvcnRoLlxuICAgKlxuICAgKiBNYXJibGUgZGlhZ3JhbTpcbiAgICpcbiAgICogYGBgdGV4dFxuICAgKiAtLS0tLS0xLS0tLS0xLS0yLS0tLTEtLS0tMS0tLS0tLVxuICAgKiAgIGZvbGQoKGFjYywgeCkgPT4gYWNjICsgeCwgMylcbiAgICogMy0tLS0tNC0tLS0tNS0tNy0tLS04LS0tLTktLS0tLS1cbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjY3VtdWxhdGUgQSBmdW5jdGlvbiBvZiB0eXBlIGAoYWNjOiBSLCB0OiBUKSA9PiBSYCB0aGF0XG4gICAqIHRha2VzIHRoZSBwcmV2aW91cyBhY2N1bXVsYXRlZCB2YWx1ZSBgYWNjYCBhbmQgdGhlIGluY29taW5nIGV2ZW50IGZyb20gdGhlXG4gICAqIGlucHV0IHN0cmVhbSBhbmQgcHJvZHVjZXMgdGhlIG5ldyBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAgICogQHBhcmFtIHNlZWQgVGhlIGluaXRpYWwgYWNjdW11bGF0ZWQgdmFsdWUsIG9mIHR5cGUgYFJgLlxuICAgKiBAcmV0dXJuIHtNZW1vcnlTdHJlYW19XG4gICAqL1xuICBmb2xkPFI+KGFjY3VtdWxhdGU6IChhY2M6IFIsIHQ6IFQpID0+IFIsIHNlZWQ6IFIpOiBNZW1vcnlTdHJlYW08Uj4ge1xuICAgIHJldHVybiBuZXcgTWVtb3J5U3RyZWFtPFI+KG5ldyBGb2xkPFQsIFI+KGFjY3VtdWxhdGUsIHNlZWQsIHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyBhbiBlcnJvciB3aXRoIGFub3RoZXIgc3RyZWFtLlxuICAgKlxuICAgKiBXaGVuIChhbmQgaWYpIGFuIGVycm9yIGhhcHBlbnMgb24gdGhlIGlucHV0IHN0cmVhbSwgaW5zdGVhZCBvZiBmb3J3YXJkaW5nXG4gICAqIHRoYXQgZXJyb3IgdG8gdGhlIG91dHB1dCBzdHJlYW0sICpyZXBsYWNlRXJyb3IqIHdpbGwgY2FsbCB0aGUgYHJlcGxhY2VgXG4gICAqIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgdGhlIHN0cmVhbSB0aGF0IHRoZSBvdXRwdXQgc3RyZWFtIHdpbGwgcmVwbGljYXRlLlxuICAgKiBBbmQsIGluIGNhc2UgdGhhdCBuZXcgc3RyZWFtIGFsc28gZW1pdHMgYW4gZXJyb3IsIGByZXBsYWNlYCB3aWxsIGJlIGNhbGxlZFxuICAgKiBhZ2FpbiB0byBnZXQgYW5vdGhlciBzdHJlYW0gdG8gc3RhcnQgcmVwbGljYXRpbmcuXG4gICAqXG4gICAqIE1hcmJsZSBkaWFncmFtOlxuICAgKlxuICAgKiBgYGB0ZXh0XG4gICAqIC0tMS0tLTItLS0tLTMtLTQtLS0tLVhcbiAgICogICByZXBsYWNlRXJyb3IoICgpID0+IC0tMTAtLXwgKVxuICAgKiAtLTEtLS0yLS0tLS0zLS00LS0tLS0tLS0xMC0tfFxuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVwbGFjZSBBIGZ1bmN0aW9uIG9mIHR5cGUgYChlcnIpID0+IFN0cmVhbWAgdGhhdCB0YWtlc1xuICAgKiB0aGUgZXJyb3IgdGhhdCBvY2N1cnJlZCBvbiB0aGUgaW5wdXQgc3RyZWFtIG9yIG9uIHRoZSBwcmV2aW91cyByZXBsYWNlbWVudFxuICAgKiBzdHJlYW0gYW5kIHJldHVybnMgYSBuZXcgc3RyZWFtLiBUaGUgb3V0cHV0IHN0cmVhbSB3aWxsIGJlaGF2ZSBsaWtlIHRoZVxuICAgKiBzdHJlYW0gdGhhdCB0aGlzIGZ1bmN0aW9uIHJldHVybnMuXG4gICAqIEByZXR1cm4ge1N0cmVhbX1cbiAgICovXG4gIHJlcGxhY2VFcnJvcihyZXBsYWNlOiAoZXJyOiBhbnkpID0+IFN0cmVhbTxUPik6IFN0cmVhbTxUPiB7XG4gICAgcmV0dXJuIG5ldyAodGhpcy5jdG9yKCkpPFQ+KG5ldyBSZXBsYWNlRXJyb3I8VD4ocmVwbGFjZSwgdGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZsYXR0ZW5zIGEgXCJzdHJlYW0gb2Ygc3RyZWFtc1wiLCBoYW5kbGluZyBvbmx5IG9uZSBuZXN0ZWQgc3RyZWFtIGF0IGEgdGltZVxuICAgKiAobm8gY29uY3VycmVuY3kpLlxuICAgKlxuICAgKiBJZiB0aGUgaW5wdXQgc3RyZWFtIGlzIGEgc3RyZWFtIHRoYXQgZW1pdHMgc3RyZWFtcywgdGhlbiB0aGlzIG9wZXJhdG9yIHdpbGxcbiAgICogcmV0dXJuIGFuIG91dHB1dCBzdHJlYW0gd2hpY2ggaXMgYSBmbGF0IHN0cmVhbTogZW1pdHMgcmVndWxhciBldmVudHMuIFRoZVxuICAgKiBmbGF0dGVuaW5nIGhhcHBlbnMgd2l0aG91dCBjb25jdXJyZW5jeS4gSXQgd29ya3MgbGlrZSB0aGlzOiB3aGVuIHRoZSBpbnB1dFxuICAgKiBzdHJlYW0gZW1pdHMgYSBuZXN0ZWQgc3RyZWFtLCAqZmxhdHRlbiogd2lsbCBzdGFydCBpbWl0YXRpbmcgdGhhdCBuZXN0ZWRcbiAgICogb25lLiBIb3dldmVyLCBhcyBzb29uIGFzIHRoZSBuZXh0IG5lc3RlZCBzdHJlYW0gaXMgZW1pdHRlZCBvbiB0aGUgaW5wdXRcbiAgICogc3RyZWFtLCAqZmxhdHRlbiogd2lsbCBmb3JnZXQgdGhlIHByZXZpb3VzIG5lc3RlZCBvbmUgaXQgd2FzIGltaXRhdGluZywgYW5kXG4gICAqIHdpbGwgc3RhcnQgaW1pdGF0aW5nIHRoZSBuZXcgbmVzdGVkIG9uZS5cbiAgICpcbiAgICogTWFyYmxlIGRpYWdyYW06XG4gICAqXG4gICAqIGBgYHRleHRcbiAgICogLS0rLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tXG4gICAqICAgXFwgICAgICAgIFxcXG4gICAqICAgIFxcICAgICAgIC0tLS0xLS0tLTItLS0zLS1cbiAgICogICAgLS1hLS1iLS0tLWMtLS0tZC0tLS0tLS0tXG4gICAqICAgICAgICAgICBmbGF0dGVuXG4gICAqIC0tLS0tYS0tYi0tLS0tLTEtLS0tMi0tLTMtLVxuICAgKiBgYGBcbiAgICpcbiAgICogQHJldHVybiB7U3RyZWFtfVxuICAgKi9cbiAgZmxhdHRlbjxSPih0aGlzOiBTdHJlYW08U3RyZWFtPFI+Pik6IFN0cmVhbTxSPiB7XG4gICAgcmV0dXJuIG5ldyBTdHJlYW08Uj4obmV3IEZsYXR0ZW4odGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3NlcyB0aGUgaW5wdXQgc3RyZWFtIHRvIGEgY3VzdG9tIG9wZXJhdG9yLCB0byBwcm9kdWNlIGFuIG91dHB1dCBzdHJlYW0uXG4gICAqXG4gICAqICpjb21wb3NlKiBpcyBhIGhhbmR5IHdheSBvZiB1c2luZyBhbiBleGlzdGluZyBmdW5jdGlvbiBpbiBhIGNoYWluZWQgc3R5bGUuXG4gICAqIEluc3RlYWQgb2Ygd3JpdGluZyBgb3V0U3RyZWFtID0gZihpblN0cmVhbSlgIHlvdSBjYW4gd3JpdGVcbiAgICogYG91dFN0cmVhbSA9IGluU3RyZWFtLmNvbXBvc2UoZilgLlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcGVyYXRvciBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSBzdHJlYW0gYXMgaW5wdXQgYW5kXG4gICAqIHJldHVybnMgYSBzdHJlYW0gYXMgd2VsbC5cbiAgICogQHJldHVybiB7U3RyZWFtfVxuICAgKi9cbiAgY29tcG9zZTxVPihvcGVyYXRvcjogKHN0cmVhbTogU3RyZWFtPFQ+KSA9PiBVKTogVSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb3V0cHV0IHN0cmVhbSB0aGF0IGJlaGF2ZXMgbGlrZSB0aGUgaW5wdXQgc3RyZWFtLCBidXQgYWxzb1xuICAgKiByZW1lbWJlcnMgdGhlIG1vc3QgcmVjZW50IGV2ZW50IHRoYXQgaGFwcGVucyBvbiB0aGUgaW5wdXQgc3RyZWFtLCBzbyB0aGF0IGFcbiAgICogbmV3bHkgYWRkZWQgbGlzdGVuZXIgd2lsbCBpbW1lZGlhdGVseSByZWNlaXZlIHRoYXQgbWVtb3Jpc2VkIGV2ZW50LlxuICAgKlxuICAgKiBAcmV0dXJuIHtNZW1vcnlTdHJlYW19XG4gICAqL1xuICByZW1lbWJlcigpOiBNZW1vcnlTdHJlYW08VD4ge1xuICAgIHJldHVybiBuZXcgTWVtb3J5U3RyZWFtPFQ+KG5ldyBSZW1lbWJlcjxUPih0aGlzKSk7XG4gIH1cblxuICBkZWJ1ZygpOiBTdHJlYW08VD47XG4gIGRlYnVnKGxhYmVsT3JTcHk6IHN0cmluZyk6IFN0cmVhbTxUPjtcbiAgZGVidWcobGFiZWxPclNweTogKHQ6IFQpID0+IGFueSk6IFN0cmVhbTxUPjtcbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb3V0cHV0IHN0cmVhbSB0aGF0IGlkZW50aWNhbGx5IGJlaGF2ZXMgbGlrZSB0aGUgaW5wdXQgc3RyZWFtLFxuICAgKiBidXQgYWxzbyBydW5zIGEgYHNweWAgZnVuY3Rpb24gZm9yIGVhY2ggZXZlbnQsIHRvIGhlbHAgeW91IGRlYnVnIHlvdXIgYXBwLlxuICAgKlxuICAgKiAqZGVidWcqIHRha2VzIGEgYHNweWAgZnVuY3Rpb24gYXMgYXJndW1lbnQsIGFuZCBydW5zIHRoYXQgZm9yIGVhY2ggZXZlbnRcbiAgICogaGFwcGVuaW5nIG9uIHRoZSBpbnB1dCBzdHJlYW0uIElmIHlvdSBkb24ndCBwcm92aWRlIHRoZSBgc3B5YCBhcmd1bWVudCxcbiAgICogdGhlbiAqZGVidWcqIHdpbGwganVzdCBgY29uc29sZS5sb2dgIGVhY2ggZXZlbnQuIFRoaXMgaGVscHMgeW91IHRvXG4gICAqIHVuZGVyc3RhbmQgdGhlIGZsb3cgb2YgZXZlbnRzIHRocm91Z2ggc29tZSBvcGVyYXRvciBjaGFpbi5cbiAgICpcbiAgICogUGxlYXNlIG5vdGUgdGhhdCBpZiB0aGUgb3V0cHV0IHN0cmVhbSBoYXMgbm8gbGlzdGVuZXJzLCB0aGVuIGl0IHdpbGwgbm90XG4gICAqIHN0YXJ0LCB3aGljaCBtZWFucyBgc3B5YCB3aWxsIG5ldmVyIHJ1biBiZWNhdXNlIG5vIGFjdHVhbCBldmVudCBoYXBwZW5zIGluXG4gICAqIHRoYXQgY2FzZS5cbiAgICpcbiAgICogTWFyYmxlIGRpYWdyYW06XG4gICAqXG4gICAqIGBgYHRleHRcbiAgICogLS0xLS0tLTItLS0tLTMtLS0tLTQtLVxuICAgKiAgICAgICAgIGRlYnVnXG4gICAqIC0tMS0tLS0yLS0tLS0zLS0tLS00LS1cbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxhYmVsT3JTcHkgQSBzdHJpbmcgdG8gdXNlIGFzIHRoZSBsYWJlbCB3aGVuIHByaW50aW5nXG4gICAqIGRlYnVnIGluZm9ybWF0aW9uIG9uIHRoZSBjb25zb2xlLCBvciBhICdzcHknIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYW4gZXZlbnRcbiAgICogYXMgYXJndW1lbnQsIGFuZCBkb2VzIG5vdCBuZWVkIHRvIHJldHVybiBhbnl0aGluZy5cbiAgICogQHJldHVybiB7U3RyZWFtfVxuICAgKi9cbiAgZGVidWcobGFiZWxPclNweT86IHN0cmluZyB8ICgodDogVCkgPT4gYW55KSk6IFN0cmVhbTxUPiB7XG4gICAgcmV0dXJuIG5ldyAodGhpcy5jdG9yKCkpPFQ+KG5ldyBEZWJ1ZzxUPih0aGlzLCBsYWJlbE9yU3B5KSk7XG4gIH1cblxuICAvKipcbiAgICogKmltaXRhdGUqIGNoYW5nZXMgdGhpcyBjdXJyZW50IFN0cmVhbSB0byBlbWl0IHRoZSBzYW1lIGV2ZW50cyB0aGF0IHRoZVxuICAgKiBgb3RoZXJgIGdpdmVuIFN0cmVhbSBkb2VzLiBUaGlzIG1ldGhvZCByZXR1cm5zIG5vdGhpbmcuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGV4aXN0cyB0byBhbGxvdyBvbmUgdGhpbmc6ICoqY2lyY3VsYXIgZGVwZW5kZW5jeSBvZiBzdHJlYW1zKiouXG4gICAqIEZvciBpbnN0YW5jZSwgbGV0J3MgaW1hZ2luZSB0aGF0IGZvciBzb21lIHJlYXNvbiB5b3UgbmVlZCB0byBjcmVhdGUgYVxuICAgKiBjaXJjdWxhciBkZXBlbmRlbmN5IHdoZXJlIHN0cmVhbSBgZmlyc3QkYCBkZXBlbmRzIG9uIHN0cmVhbSBgc2Vjb25kJGBcbiAgICogd2hpY2ggaW4gdHVybiBkZXBlbmRzIG9uIGBmaXJzdCRgOlxuICAgKlxuICAgKiA8IS0tIHNraXAtZXhhbXBsZSAtLT5cbiAgICogYGBganNcbiAgICogaW1wb3J0IGRlbGF5IGZyb20gJ3hzdHJlYW0vZXh0cmEvZGVsYXknXG4gICAqXG4gICAqIHZhciBmaXJzdCQgPSBzZWNvbmQkLm1hcCh4ID0+IHggKiAxMCkudGFrZSgzKTtcbiAgICogdmFyIHNlY29uZCQgPSBmaXJzdCQubWFwKHggPT4geCArIDEpLnN0YXJ0V2l0aCgxKS5jb21wb3NlKGRlbGF5KDEwMCkpO1xuICAgKiBgYGBcbiAgICpcbiAgICogSG93ZXZlciwgdGhhdCBpcyBpbnZhbGlkIEphdmFTY3JpcHQsIGJlY2F1c2UgYHNlY29uZCRgIGlzIHVuZGVmaW5lZFxuICAgKiBvbiB0aGUgZmlyc3QgbGluZS4gVGhpcyBpcyBob3cgKmltaXRhdGUqIGNhbiBoZWxwIHNvbHZlIGl0OlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiBpbXBvcnQgZGVsYXkgZnJvbSAneHN0cmVhbS9leHRyYS9kZWxheSdcbiAgICpcbiAgICogdmFyIHNlY29uZFByb3h5JCA9IHhzLmNyZWF0ZSgpO1xuICAgKiB2YXIgZmlyc3QkID0gc2Vjb25kUHJveHkkLm1hcCh4ID0+IHggKiAxMCkudGFrZSgzKTtcbiAgICogdmFyIHNlY29uZCQgPSBmaXJzdCQubWFwKHggPT4geCArIDEpLnN0YXJ0V2l0aCgxKS5jb21wb3NlKGRlbGF5KDEwMCkpO1xuICAgKiBzZWNvbmRQcm94eSQuaW1pdGF0ZShzZWNvbmQkKTtcbiAgICogYGBgXG4gICAqXG4gICAqIFdlIGNyZWF0ZSBgc2Vjb25kUHJveHkkYCBiZWZvcmUgdGhlIG90aGVycywgc28gaXQgY2FuIGJlIHVzZWQgaW4gdGhlXG4gICAqIGRlY2xhcmF0aW9uIG9mIGBmaXJzdCRgLiBUaGVuLCBhZnRlciBib3RoIGBmaXJzdCRgIGFuZCBgc2Vjb25kJGAgYXJlXG4gICAqIGRlZmluZWQsIHdlIGhvb2sgYHNlY29uZFByb3h5JGAgd2l0aCBgc2Vjb25kJGAgd2l0aCBgaW1pdGF0ZSgpYCB0byB0ZWxsXG4gICAqIHRoYXQgdGhleSBhcmUgXCJ0aGUgc2FtZVwiLiBgaW1pdGF0ZWAgd2lsbCBub3QgdHJpZ2dlciB0aGUgc3RhcnQgb2YgYW55XG4gICAqIHN0cmVhbSwgaXQganVzdCBiaW5kcyBgc2Vjb25kUHJveHkkYCBhbmQgYHNlY29uZCRgIHRvZ2V0aGVyLlxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGlzIGFuIGV4YW1wbGUgd2hlcmUgYGltaXRhdGUoKWAgaXMgaW1wb3J0YW50IGluIEN5Y2xlLmpzXG4gICAqIGFwcGxpY2F0aW9ucy4gQSBwYXJlbnQgY29tcG9uZW50IGNvbnRhaW5zIHNvbWUgY2hpbGQgY29tcG9uZW50cy4gQSBjaGlsZFxuICAgKiBoYXMgYW4gYWN0aW9uIHN0cmVhbSB3aGljaCBpcyBnaXZlbiB0byB0aGUgcGFyZW50IHRvIGRlZmluZSBpdHMgc3RhdGU6XG4gICAqXG4gICAqIDwhLS0gc2tpcC1leGFtcGxlIC0tPlxuICAgKiBgYGBqc1xuICAgKiBjb25zdCBjaGlsZEFjdGlvblByb3h5JCA9IHhzLmNyZWF0ZSgpO1xuICAgKiBjb25zdCBwYXJlbnQgPSBQYXJlbnQoey4uLnNvdXJjZXMsIGNoaWxkQWN0aW9uJDogY2hpbGRBY3Rpb25Qcm94eSR9KTtcbiAgICogY29uc3QgY2hpbGRBY3Rpb24kID0gcGFyZW50LnN0YXRlJC5tYXAocyA9PiBzLmNoaWxkLmFjdGlvbiQpLmZsYXR0ZW4oKTtcbiAgICogY2hpbGRBY3Rpb25Qcm94eSQuaW1pdGF0ZShjaGlsZEFjdGlvbiQpO1xuICAgKiBgYGBcbiAgICpcbiAgICogTm90ZSwgdGhvdWdoLCB0aGF0ICoqYGltaXRhdGUoKWAgZG9lcyBub3Qgc3VwcG9ydCBNZW1vcnlTdHJlYW1zKiouIElmIHdlXG4gICAqIHdvdWxkIGF0dGVtcHQgdG8gaW1pdGF0ZSBhIE1lbW9yeVN0cmVhbSBpbiBhIGNpcmN1bGFyIGRlcGVuZGVuY3ksIHdlIHdvdWxkXG4gICAqIGVpdGhlciBnZXQgYSByYWNlIGNvbmRpdGlvbiAod2hlcmUgdGhlIHN5bXB0b20gd291bGQgYmUgXCJub3RoaW5nIGhhcHBlbnNcIilcbiAgICogb3IgYW4gaW5maW5pdGUgY3ljbGljIGVtaXNzaW9uIG9mIHZhbHVlcy4gSXQncyB1c2VmdWwgdG8gdGhpbmsgYWJvdXRcbiAgICogTWVtb3J5U3RyZWFtcyBhcyBjZWxscyBpbiBhIHNwcmVhZHNoZWV0LiBJdCBkb2Vzbid0IG1ha2UgYW55IHNlbnNlIHRvXG4gICAqIGRlZmluZSBhIHNwcmVhZHNoZWV0IGNlbGwgYEExYCB3aXRoIGEgZm9ybXVsYSB0aGF0IGRlcGVuZHMgb24gYEIxYCBhbmRcbiAgICogY2VsbCBgQjFgIGRlZmluZWQgd2l0aCBhIGZvcm11bGEgdGhhdCBkZXBlbmRzIG9uIGBBMWAuXG4gICAqXG4gICAqIElmIHlvdSBmaW5kIHlvdXJzZWxmIHdhbnRpbmcgdG8gdXNlIGBpbWl0YXRlKClgIHdpdGggYVxuICAgKiBNZW1vcnlTdHJlYW0sIHlvdSBzaG91bGQgcmV3b3JrIHlvdXIgY29kZSBhcm91bmQgYGltaXRhdGUoKWAgdG8gdXNlIGFcbiAgICogU3RyZWFtIGluc3RlYWQuIExvb2sgZm9yIHRoZSBzdHJlYW0gaW4gdGhlIGNpcmN1bGFyIGRlcGVuZGVuY3kgdGhhdFxuICAgKiByZXByZXNlbnRzIGFuIGV2ZW50IHN0cmVhbSwgYW5kIHRoYXQgd291bGQgYmUgYSBjYW5kaWRhdGUgZm9yIGNyZWF0aW5nIGFcbiAgICogcHJveHkgU3RyZWFtIHdoaWNoIHRoZW4gaW1pdGF0ZXMgdGhlIHRhcmdldCBTdHJlYW0uXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyZWFtfSB0YXJnZXQgVGhlIG90aGVyIHN0cmVhbSB0byBpbWl0YXRlIG9uIHRoZSBjdXJyZW50IG9uZS4gTXVzdFxuICAgKiBub3QgYmUgYSBNZW1vcnlTdHJlYW0uXG4gICAqL1xuICBpbWl0YXRlKHRhcmdldDogU3RyZWFtPFQ+KTogdm9pZCB7XG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE1lbW9yeVN0cmVhbSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignQSBNZW1vcnlTdHJlYW0gd2FzIGdpdmVuIHRvIGltaXRhdGUoKSwgYnV0IGl0IG9ubHkgJyArXG4gICAgICAnc3VwcG9ydHMgYSBTdHJlYW0uIFJlYWQgbW9yZSBhYm91dCB0aGlzIHJlc3RyaWN0aW9uIGhlcmU6ICcgK1xuICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9zdGFsdHoveHN0cmVhbSNmYXEnKTtcbiAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgZm9yIChsZXQgaWxzID0gdGhpcy5faWxzLCBOID0gaWxzLmxlbmd0aCwgaSA9IDA7IGkgPCBOOyBpKyspIHRhcmdldC5fYWRkKGlsc1tpXSk7XG4gICAgdGhpcy5faWxzID0gW107XG4gIH1cblxuICAvKipcbiAgICogRm9yY2VzIHRoZSBTdHJlYW0gdG8gZW1pdCB0aGUgZ2l2ZW4gdmFsdWUgdG8gaXRzIGxpc3RlbmVycy5cbiAgICpcbiAgICogQXMgdGhlIG5hbWUgaW5kaWNhdGVzLCBpZiB5b3UgdXNlIHRoaXMsIHlvdSBhcmUgbW9zdCBsaWtlbHkgZG9pbmcgc29tZXRoaW5nXG4gICAqIFRoZSBXcm9uZyBXYXkuIFBsZWFzZSB0cnkgdG8gdW5kZXJzdGFuZCB0aGUgcmVhY3RpdmUgd2F5IGJlZm9yZSB1c2luZyB0aGlzXG4gICAqIG1ldGhvZC4gVXNlIGl0IG9ubHkgd2hlbiB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgXCJuZXh0XCIgdmFsdWUgeW91IHdhbnQgdG8gYnJvYWRjYXN0IHRvIGFsbCBsaXN0ZW5lcnMgb2ZcbiAgICogdGhpcyBTdHJlYW0uXG4gICAqL1xuICBzaGFtZWZ1bGx5U2VuZE5leHQodmFsdWU6IFQpIHtcbiAgICB0aGlzLl9uKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZXMgdGhlIFN0cmVhbSB0byBlbWl0IHRoZSBnaXZlbiBlcnJvciB0byBpdHMgbGlzdGVuZXJzLlxuICAgKlxuICAgKiBBcyB0aGUgbmFtZSBpbmRpY2F0ZXMsIGlmIHlvdSB1c2UgdGhpcywgeW91IGFyZSBtb3N0IGxpa2VseSBkb2luZyBzb21ldGhpbmdcbiAgICogVGhlIFdyb25nIFdheS4gUGxlYXNlIHRyeSB0byB1bmRlcnN0YW5kIHRoZSByZWFjdGl2ZSB3YXkgYmVmb3JlIHVzaW5nIHRoaXNcbiAgICogbWV0aG9kLiBVc2UgaXQgb25seSB3aGVuIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGVycm9yIFRoZSBlcnJvciB5b3Ugd2FudCB0byBicm9hZGNhc3QgdG8gYWxsIHRoZSBsaXN0ZW5lcnMgb2ZcbiAgICogdGhpcyBTdHJlYW0uXG4gICAqL1xuICBzaGFtZWZ1bGx5U2VuZEVycm9yKGVycm9yOiBhbnkpIHtcbiAgICB0aGlzLl9lKGVycm9yKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZXMgdGhlIFN0cmVhbSB0byBlbWl0IHRoZSBcImNvbXBsZXRlZFwiIGV2ZW50IHRvIGl0cyBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEFzIHRoZSBuYW1lIGluZGljYXRlcywgaWYgeW91IHVzZSB0aGlzLCB5b3UgYXJlIG1vc3QgbGlrZWx5IGRvaW5nIHNvbWV0aGluZ1xuICAgKiBUaGUgV3JvbmcgV2F5LiBQbGVhc2UgdHJ5IHRvIHVuZGVyc3RhbmQgdGhlIHJlYWN0aXZlIHdheSBiZWZvcmUgdXNpbmcgdGhpc1xuICAgKiBtZXRob2QuIFVzZSBpdCBvbmx5IHdoZW4geW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLlxuICAgKi9cbiAgc2hhbWVmdWxseVNlbmRDb21wbGV0ZSgpIHtcbiAgICB0aGlzLl9jKCk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIFwiZGVidWdcIiBsaXN0ZW5lciB0byB0aGUgc3RyZWFtLiBUaGVyZSBjYW4gb25seSBiZSBvbmUgZGVidWdcbiAgICogbGlzdGVuZXIsIHRoYXQncyB3aHkgdGhpcyBpcyAnc2V0RGVidWdMaXN0ZW5lcicuIFRvIHJlbW92ZSB0aGUgZGVidWdcbiAgICogbGlzdGVuZXIsIGp1c3QgY2FsbCBzZXREZWJ1Z0xpc3RlbmVyKG51bGwpLlxuICAgKlxuICAgKiBBIGRlYnVnIGxpc3RlbmVyIGlzIGxpa2UgYW55IG90aGVyIGxpc3RlbmVyLiBUaGUgb25seSBkaWZmZXJlbmNlIGlzIHRoYXQgYVxuICAgKiBkZWJ1ZyBsaXN0ZW5lciBpcyBcInN0ZWFsdGh5XCI6IGl0cyBwcmVzZW5jZS9hYnNlbmNlIGRvZXMgbm90IHRyaWdnZXIgdGhlXG4gICAqIHN0YXJ0L3N0b3Agb2YgdGhlIHN0cmVhbSAob3IgdGhlIHByb2R1Y2VyIGluc2lkZSB0aGUgc3RyZWFtKS4gVGhpcyBpc1xuICAgKiB1c2VmdWwgc28geW91IGNhbiBpbnNwZWN0IHdoYXQgaXMgZ29pbmcgb24gd2l0aG91dCBjaGFuZ2luZyB0aGUgYmVoYXZpb3JcbiAgICogb2YgdGhlIHByb2dyYW0uIElmIHlvdSBoYXZlIGFuIGlkbGUgc3RyZWFtIGFuZCB5b3UgYWRkIGEgbm9ybWFsIGxpc3RlbmVyIHRvXG4gICAqIGl0LCB0aGUgc3RyZWFtIHdpbGwgc3RhcnQgZXhlY3V0aW5nLiBCdXQgaWYgeW91IHNldCBhIGRlYnVnIGxpc3RlbmVyIG9uIGFuXG4gICAqIGlkbGUgc3RyZWFtLCBpdCB3b24ndCBzdGFydCBleGVjdXRpbmcgKG5vdCB1bnRpbCB0aGUgZmlyc3Qgbm9ybWFsIGxpc3RlbmVyXG4gICAqIGlzIGFkZGVkKS5cbiAgICpcbiAgICogQXMgdGhlIG5hbWUgaW5kaWNhdGVzLCB3ZSBkb24ndCByZWNvbW1lbmQgdXNpbmcgdGhpcyBtZXRob2QgdG8gYnVpbGQgYXBwXG4gICAqIGxvZ2ljLiBJbiBmYWN0LCBpbiBtb3N0IGNhc2VzIHRoZSBkZWJ1ZyBvcGVyYXRvciB3b3JrcyBqdXN0IGZpbmUuIE9ubHkgdXNlXG4gICAqIHRoaXMgb25lIGlmIHlvdSBrbm93IHdoYXQgeW91J3JlIGRvaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge0xpc3RlbmVyPFQ+fSBsaXN0ZW5lclxuICAgKi9cbiAgc2V0RGVidWdMaXN0ZW5lcihsaXN0ZW5lcjogUGFydGlhbDxMaXN0ZW5lcjxUPj4gfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKCFsaXN0ZW5lcikge1xuICAgICAgdGhpcy5fZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fZGwgPSBOTyBhcyBJbnRlcm5hbExpc3RlbmVyPFQ+O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kID0gdHJ1ZTtcbiAgICAgIChsaXN0ZW5lciBhcyBJbnRlcm5hbExpc3RlbmVyPFQ+KS5fbiA9IGxpc3RlbmVyLm5leHQgfHwgbm9vcDtcbiAgICAgIChsaXN0ZW5lciBhcyBJbnRlcm5hbExpc3RlbmVyPFQ+KS5fZSA9IGxpc3RlbmVyLmVycm9yIHx8IG5vb3A7XG4gICAgICAobGlzdGVuZXIgYXMgSW50ZXJuYWxMaXN0ZW5lcjxUPikuX2MgPSBsaXN0ZW5lci5jb21wbGV0ZSB8fCBub29wO1xuICAgICAgdGhpcy5fZGwgPSBsaXN0ZW5lciBhcyBJbnRlcm5hbExpc3RlbmVyPFQ+O1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTWVtb3J5U3RyZWFtPFQ+IGV4dGVuZHMgU3RyZWFtPFQ+IHtcbiAgcHJpdmF0ZSBfdj86IFQ7XG4gIHByaXZhdGUgX2hhcz86IGJvb2xlYW4gPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocHJvZHVjZXI6IEludGVybmFsUHJvZHVjZXI8VD4pIHtcbiAgICBzdXBlcihwcm9kdWNlcik7XG4gIH1cblxuICBfbih4OiBUKSB7XG4gICAgdGhpcy5fdiA9IHg7XG4gICAgdGhpcy5faGFzID0gdHJ1ZTtcbiAgICBzdXBlci5fbih4KTtcbiAgfVxuXG4gIF9hZGQoaWw6IEludGVybmFsTGlzdGVuZXI8VD4pOiB2b2lkIHtcbiAgICBjb25zdCB0YSA9IHRoaXMuX3RhcmdldDtcbiAgICBpZiAodGEgIT09IE5PKSByZXR1cm4gdGEuX2FkZChpbCk7XG4gICAgY29uc3QgYSA9IHRoaXMuX2lscztcbiAgICBhLnB1c2goaWwpO1xuICAgIGlmIChhLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmICh0aGlzLl9oYXMpIGlsLl9uKHRoaXMuX3YhKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3N0b3BJRCAhPT0gTk8pIHtcbiAgICAgIGlmICh0aGlzLl9oYXMpIGlsLl9uKHRoaXMuX3YhKTtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zdG9wSUQpO1xuICAgICAgdGhpcy5fc3RvcElEID0gTk87XG4gICAgfSBlbHNlIGlmICh0aGlzLl9oYXMpIGlsLl9uKHRoaXMuX3YhKTsgZWxzZSB7XG4gICAgICBjb25zdCBwID0gdGhpcy5fcHJvZDtcbiAgICAgIGlmIChwICE9PSBOTykgcC5fc3RhcnQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgX3N0b3BOb3coKSB7XG4gICAgdGhpcy5faGFzID0gZmFsc2U7XG4gICAgc3VwZXIuX3N0b3BOb3coKTtcbiAgfVxuXG4gIF94KCk6IHZvaWQge1xuICAgIHRoaXMuX2hhcyA9IGZhbHNlO1xuICAgIHN1cGVyLl94KCk7XG4gIH1cblxuICBtYXA8VT4ocHJvamVjdDogKHQ6IFQpID0+IFUpOiBNZW1vcnlTdHJlYW08VT4ge1xuICAgIHJldHVybiB0aGlzLl9tYXAocHJvamVjdCkgYXMgTWVtb3J5U3RyZWFtPFU+O1xuICB9XG5cbiAgbWFwVG88VT4ocHJvamVjdGVkVmFsdWU6IFUpOiBNZW1vcnlTdHJlYW08VT4ge1xuICAgIHJldHVybiBzdXBlci5tYXBUbyhwcm9qZWN0ZWRWYWx1ZSkgYXMgTWVtb3J5U3RyZWFtPFU+O1xuICB9XG5cbiAgdGFrZShhbW91bnQ6IG51bWJlcik6IE1lbW9yeVN0cmVhbTxUPiB7XG4gICAgcmV0dXJuIHN1cGVyLnRha2UoYW1vdW50KSBhcyBNZW1vcnlTdHJlYW08VD47XG4gIH1cblxuICBlbmRXaGVuKG90aGVyOiBTdHJlYW08YW55Pik6IE1lbW9yeVN0cmVhbTxUPiB7XG4gICAgcmV0dXJuIHN1cGVyLmVuZFdoZW4ob3RoZXIpIGFzIE1lbW9yeVN0cmVhbTxUPjtcbiAgfVxuXG4gIHJlcGxhY2VFcnJvcihyZXBsYWNlOiAoZXJyOiBhbnkpID0+IFN0cmVhbTxUPik6IE1lbW9yeVN0cmVhbTxUPiB7XG4gICAgcmV0dXJuIHN1cGVyLnJlcGxhY2VFcnJvcihyZXBsYWNlKSBhcyBNZW1vcnlTdHJlYW08VD47XG4gIH1cblxuICByZW1lbWJlcigpOiBNZW1vcnlTdHJlYW08VD4ge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGVidWcoKTogTWVtb3J5U3RyZWFtPFQ+O1xuICBkZWJ1ZyhsYWJlbE9yU3B5OiBzdHJpbmcpOiBNZW1vcnlTdHJlYW08VD47XG4gIGRlYnVnKGxhYmVsT3JTcHk6ICh0OiBUKSA9PiBhbnkpOiBNZW1vcnlTdHJlYW08VD47XG4gIGRlYnVnKGxhYmVsT3JTcHk/OiBzdHJpbmcgfCAoKHQ6IFQpID0+IGFueSkgfCB1bmRlZmluZWQpOiBNZW1vcnlTdHJlYW08VD4ge1xuICAgIHJldHVybiBzdXBlci5kZWJ1ZyhsYWJlbE9yU3B5IGFzIGFueSkgYXMgTWVtb3J5U3RyZWFtPFQ+O1xuICB9XG59XG5cbmV4cG9ydCB7Tk8sIE5PX0lMfTtcbmNvbnN0IHhzID0gU3RyZWFtO1xudHlwZSB4czxUPiA9IFN0cmVhbTxUPjtcbmV4cG9ydCBkZWZhdWx0IHhzO1xuIl19

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(root);
/* harmony default export */ __webpack_exports__["default"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
});