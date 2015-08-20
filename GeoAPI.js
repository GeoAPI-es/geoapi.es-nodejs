var q = require('q');
var http = require('http');
var extend = require('util')._extend;
var querystring = require('querystring');

module.exports = function() {
	var self = this;
	
	this.conf = {
		url: 'apiv1.geoapi.es/',
		type: 'JSON',
		key: '',
		sandbox: 0
	};
	
	this._data = {
		lastQuery: {
			url: '',
			params: {}
		},
		lastResult: {
			status: 0,
			data: {}
		}
	};
	
	return {
		setConfig: function(constant, value){
			self.conf[constant] = value;
		},
		
		getLastQuery: function(){
			return self._data.lastQuery;
		},
		
		getLastResult: function(){
			return self._data.lastResult;
		},
		
		_call: function(accion, params, deferred){
			params = extend(self.conf, params);
			delete params.url;
			
			var req = http.request({
				method: 'GET',
				hostname: self.conf.url,
				path: accion + '?' + querystring.stringify(params)
			}, function(res){
				res.setEncoding('utf8');
				
				res.on("data", function(chunk) {
					self._data = {
						lastQuery: {
							url: self.config.url + accion,
							params: params
						},
						lastResult: {
							status: res.statusCode,
							res: JSON.parse(chunk)
						}
					};

					if(res.statusCode == 200){
						deferred.resolve(JSON.parse(chunk));
					}
				});

			});
			
			req.on("error", function(e) {
				deferred.reject(e);
				console.log("Error: ", e.message);
			});
			
			req.end();
			
			return deferred.promise;
		},
		
		calles: function calles(params){ /*CPRO, CMUM, CUN, CPOS*/
			var deferred = q.defer();
			return this._call('calles', params, deferred);
		},
		
		comunidades: function comunidades(params){ /**/
			var deferred = q.defer();
			return this._call('comunidades', params, deferred);
		},
		
		cps: function cps(params){ /*CPRO, CMUM, CUN*/
			var deferred = q.defer();
			return this._call('cps', params, deferred);
		},
		
		municipios: function municipios(params){ /*CPRO*/
			var deferred = q.defer();
			return this._call('municipios', params, deferred);
		},
		
		nucleos: function nucleos(params){ /*CPRO, CMUM, NENTSI50*/
			var deferred = q.defer();
			return this._call('nucleos', params, deferred);
		},
		
		poblaciones: function poblaciones(params){ /*CPRO, CMUM*/
			var deferred = q.defer();
			return this._call('poblaciones', params, deferred);
		},
		
		provincias: function provincias(params){ /*CCOM*/
			var deferred = q.defer();
			return this._call('provincias', params, deferred);
		},
		
		qcalles: function qcalles(params){ /*QUERY*/
			var deferred = q.defer();
			return this._call('qcalles', params, deferred);
		}
	}
};