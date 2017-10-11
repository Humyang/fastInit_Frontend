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
export default Delay