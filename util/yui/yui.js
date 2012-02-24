/*
	YUI modules: http://yuilibrary.com/yui/configurator/
		node rollup
		io-base
		querystring-parse-simple
		
	Splitting a URL, because steal doesn't support http://yui.yahooapis.com/combo?args
*/
var yui = ("3.4.1/build/oop/oop-min.js&3.4.1/build/event-custom-base/event-custom-base-min.js&3.4.1/build/features/features-min.js&3.4.1/build/dom-core/dom-core-min.js&3.4.1/build/dom-base/dom-base-min.js&3.4.1/build/selector-native/selector-native-min.js&3.4.1/build/selector/selector-min.js&3.4.1/build/node-core/node-core-min.js&3.4.1/build/node-base/node-base-min.js&3.4.1/build/event-base/event-base-min.js&3.4.1/build/event-delegate/event-delegate-min.js&3.4.1/build/node-event-delegate/node-event-delegate-min.js&3.4.1/build/pluginhost-base/pluginhost-base-min.js&3.4.1/build/pluginhost-config/pluginhost-config-min.js&3.4.1/build/node-pluginhost/node-pluginhost-min.js&3.4.1/build/dom-style/dom-style-min.js&3.4.1/build/dom-screen/dom-screen-min.js&3.4.1/build/node-screen/node-screen-min.js&3.4.1/build/node-style/node-style-min.js&3.4.1/build/querystring-stringify-simple/querystring-stringify-simple-min.js&3.4.1/build/io-base/io-base-min.js&3.4.1/build/querystring-parse-simple/querystring-parse-simple-min.js").split('&');
for (var i = 0; i < yui.length; i++) {
	yui[i] = "http://yui.yahooapis.com/" + yui[i];
}

steal("http://yui.yahooapis.com/3.4.1/build/yui-base/yui-base-min.js",
	"../event.js")
	.then.apply(steal, yui).then(
		
	function(){
		
	var Y = YUI().use('*');
		
	// String
	Can.trim = function(s){
		return Y.Lang.trim(s);
	}
	
	// Array
	Can.makeArray = function(arr){
		return Y.Array(arr);
	};
	Can.isArray = Y.Lang.isArray;
	Can.inArray = function(item,arr){
		return Y.Array.indexOf(arr, item);
	};
	Can.map = function(arr, fn){
		return Y.Array.map(Can.makeArray(arr||[]), fn);
	};
	Can.each = function(elements, callback) {
		var i, key;
		if (typeof elements.length == 'number' && elements.pop)
			for(i = 0; i < elements.length; i++) {
				if(callback(i, elements[i]) === false) return elements;
			}
		else
			for(key in elements) {
				if(callback(key, elements[key]) === false) return elements;
			}
		return elements;
 	};

	// Object
	Can.extend = function(first){
		var deep = first === true ? 1 : 0,
			target = arguments[deep],
			i = deep + 1,
			arg;
		for (; arg = arguments[i]; i++) {
			Y.mix(target, arg, true, null, null, !!deep);
		}
		return target;
	}
	Can.param = function(object){
		return Y.QueryString.stringify(object)
	}
	Can.isEmptyObject = function(object){
		return Y.Object.isEmpty(object);
	}
	
	// Function
	Can.proxy = function(func, context){
		return Y.bind.apply(Y, arguments);
	}
	Can.isFunction = function(f){
		return Y.Lang.isFunction(f);
	}
	
	// element ... get the wrapped helper
	Can.$ = function(selector){
		return selector === window ? window : Y.all(selector);
	}

	Can.bind = function() {};
	Can.unbind = function() {};
	Can.trigger = function() {};
	Can.delegate = function() {};
	Can.undelegate = function() {};
	
	Can.buildFragment = function(frags, nodes){
		var owner = nodes.length && nodes[0].ownerDocument,
			frag = Y.Node.create(frags[0], owner);
		return {fragment: frag}
	}
	
	Can.append = function(wrapped, html){
		wrapped.each(function(node){
			node.append(html)
		});
	}
	
	// Events
	// Can.bind = function( ev, cb){
	// 	// if we can bind to it ...
	// 	if(this.bind && this.bind !== Can.bind){
	// 		this.bind(ev, cb)
	// 	} else if(this.addEvent) {
	// 		this.addEvent(ev, cb)
	// 	} else {
	// 		// make it bind-able ...
	// 		Can.addEvent.call(this, ev, cb)
	// 	}
	// 	return this;
	// }
	// Can.unbind = function(ev, cb){
	// 	// if we can bind to it ...
	// 	if(this.unbind && this.unbind !== Can.unbind){
	// 		this.unbind(ev, cb)
	// 	} else {
	// 		// make it bind-able ...
	// 		Can.removeEvent.call(this, ev, cb)
	// 	}
	// 	return this;
	// }
	// Can.trigger = function(item, event, args, bubble){
	// 	if(item.trigger){
	// 		if(bubble === false){
	// 			//  force stop propagation by
	// 			// listening to On and then immediately disconnecting
	// 			var connect = item.on(event, function(ev){
	// 				ev.stopPropagation();
	// 				dojo.disconnect(connect);
	// 			})
	// 			item.trigger(event,args)
	// 		} else {
	// 			item.trigger(event,args)
	// 		}
	// 		
	// 	} else {
	// 		if(typeof event === 'string'){
	// 			event = {type: event}
	// 		}
	// 		event.data = args
	// 		Can.dispatch.call(item, event)
	// 	}
	// }
	// Can.delegate = function(selector, ev , cb){
	// 	if(this.on || this.nodeType){
	// 		addBinding( new dojo.NodeList(this), selector+":"+ev, cb)
	// 	} else if(this.delegate) {
	// 		this.delegate(selector, ev , cb)
	// 	} 
	// 	return this;
	// }
	// Can.undelegate = function(selector, ev , cb){
	// 	if(this.on || this.nodeType){
	// 		removeBinding(new dojo.NodeList(this), selector+":"+ev, cb);
	// 	} else if(this.undelegate) {
	// 		this.undelegate(selector, ev , cb)
	// 	}
	// 	return this;
	// }


}).then("../deferred.js")