//Load the Logger module dependancy
var Logger = require("./nodeLogger");

//Create instance of logger with appender loggerName
var logger = new Logger("loggerName");
logger.setLevel("debug"); //setting the minimum level of log firing
logger.setLogTime(true); // show the date and time for each log
logger.setShowAppender(true); // show the appenderName with each log to deferenciate with other appender logger
logger.setLogFile("Logs/logger.log"); // set the logging file appender (set to null to prevent using the file for logging)

var warner = new Logger("warner"); // instanciate as many appender you need
warner.setLevel("info"); //setting the minimum level of log firing for the warner appender
warner.setLogFile("Logs/warner.log"); // set the logging file appender (set to null to prevent using the file for logging)
warner.setStdOut(false); //Set stdOut to false to not show the logs in the console (the default state is true)

warner.log("log message"); // Log as LOG the message (white color in the console)
warner.error("an error occurred!"); // Log as ERROR the message (red color in the console)
warner.fatal("a fatal error occurred!"); // Log as FATAL the message (magenta color in the console)

logger.info({json:"JSON Content"}); // Log as INFO the message of type JSON Object (white color in the console)
logger.debug("Debug message"); // Log as DEBUG the message (blue color in the console)
logger.warn("Warning"); // Log as WARN the message (yellow color in the console)
logger.error([1,2,3,4]); // Log as ERROR the message of type Array Object (red color in the console)
