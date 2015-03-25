# POLARIZEDTRINOSCILLATOR
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 26 MAR 2009

declare lower;

input length = 9;
input EMA_period = 5;

def trin = close("$TRIN");
def trinq = close("$TRIN/Q");

def aveTrin = (trin+trinq)/2;

def fractal = sqrt(power(aveTrin-aveTrin[length],2)+100);
def incremental = sqrt(power(aveTrin-aveTrin[1],2)+1);
def sum = sum(incremental,length);

def resultant = if aveTrin-aveTrin[length] > 0 then round100((fractal/sum)*100) else round100(-(fractal/sum)*100);

def polarizedTrin = if resultant == 0 then 1 else resultant;
plot PTO = expAverage(-polarizedTrin, EMA_period);
PTO.setDefaultColor(color.yellow);

plot zeroline = 0.0;
zeroline.setDefaultColor(color.white);
plot plusLine =75;
plusLine.setDefaultColor(color.cyan);
plot minusLine = -75;
minusLine.setDefaultColor(color.cyan);