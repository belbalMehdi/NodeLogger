var nodeLogger = function(name){
  var appenderName = name;
  var logFile = "";
  var level = "log";
  var stdOut = true;
  var levels = ["log","info","debug","warn","error","fatal"];
  var timing = false;
  var showAppender = true;
  var colors = {
    Reset : "\x1b[0m",
    log : "\x1b[37m",
    info : "\x1b[36m",
    debug : "\x1b[34m",
    warn : "\x1b[33m",
    error : "\x1b[31m",
    fatal : "\x1b[35m",
    Green : "\x1b[32m"
  }
  var fs = null;
  var logToFile = function(msg,lvl){
    if(fs==null) fs = require("fs");
    if(logFile!=null&&logFile!=""){
      msg += "\n";
      fs.appendFile(logFile,msg,function(err){
        if(err) throw err;
      })
    }
  }
  var dateFormat = function(date){
    day = date.getDate()>10?date.getDate():"0"+date.getDate();
    month = date.getMonth()>10?date.getMonth():"0"+date.getMonth();
    year = date.getFullYear();
    hours = date.getHours()>10?date.getHours():"0"+date.getHours();
    minutes= date.getMinutes()>10?date.getMinutes():"0"+date.getMinutes();
    seconds = date.getSeconds()>10?date.getSeconds():"0"+date.getSeconds();
    return day+"/"+month+"/"+year+" "+hours+":"+minutes+":"+seconds;
  }
  var logging = function(msg,lvl){
    if(typeof msg=="object") msg = JSON.stringify(msg);
    var t = ""; var app = "";
    if(timing) t = "("+dateFormat(new Date())+")";
    if(showAppender) app = '"'+appenderName+'"';
    msg = t+" "+levels[lvl].toUpperCase()+" "+app+": "+msg;
    if(lvl>=levels.indexOf(level)){
      if(stdOut) console.log(colors[levels[lvl]]+" %s"+colors.Reset,msg);
      logToFile(msg,lvl);
    }
  }
  return {
    setLogFile : function(file){logFile = file},
    setLevel : function(lvl){level = lvl},
    setStdOut : function(std){stdOut = std},
    setLogTime : function(t){timing=t},
    setShowAppender : function(show){showAppender=show},
    log : function(msg){logging(msg,0)},
    info : function(msg){logging(msg,1)},
    debug : function(msg){logging(msg,2)},
    warn : function(msg){logging(msg,3)},
    error : function(msg){logging(msg,4)},
    fatal : function(msg){logging(msg,5)}
  }
}

module.exports = nodeLogger;
