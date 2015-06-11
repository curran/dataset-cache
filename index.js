cache = {};

var pollInterval = 100; // ms

module.exports = {
  loadTable: function (baseUrl, dataSource, dataSet, table){
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = [baseUrl, dataSource, dataSet, table].join("/");
		return waitFor(dataSource, dataSet, table);
	}
};

function waitFor(dataSource, dataSet){
  return poll(function (){
	  if (dataSource in cache){
		  var dataSourceCache = cache[dataSource];
	    if (dataSet in dataSourceCache){
				var dataSetCache = dataSourceCache[dataSet];
				if(table in dataSetCache){
				  return dataSetCache[table];
				}
			}
		}
		return false;
	});
}

function poll(callback){
	return new Promise(function (resolve){
	  (function tryAgain(){
			var result = callback();
			if(result){
			  resolve(result);
			} else {
			  setTimeout(tryAgain, pollInterval);
			}
		}());
	});
}
