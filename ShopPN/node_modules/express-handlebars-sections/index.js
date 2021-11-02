
module.exports = function(expressHandlebars){
	if(typeof expressHandlebars === 'undefined'){
		return section;
	}
	else{
		if(!expressHandlebars){
			throw new Error('The expressHandlebars object is null.');
		}
		expressHandlebars.helpers = expressHandlebars.helpers || {};
		expressHandlebars.helpers.section = section;
	}


	// helper used to manage sections in handlebar templates
	function section(name, options) {
		var helper = this;
		if (!this._sections) {
			this._sections = {};
			this._sections._get = function(arg){
				if(typeof helper._sections[arg] === 'undefined'){
					throw new Error('The section "' + arg + '" is required.')
				}
				return helper._sections[arg];
			}
		}
		if(!this._sections[name]){
			this._sections[name] = options.fn(this);
		}

		return null;
	}

};