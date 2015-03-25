# ATRSTOPS
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 18 Jan 2008


input ATR_Multiple = 1.0;
input Desired_Stop_Loss = 1.0;
input ATR_period = 30;


def val = AvgTrueRange(high, close, low, ATR_period)*ATR_Multiple;

def tooVolatile = if(val>Desired_Stop_Loss,1,0);
def plotColor = if(tooVolatile,5,1);

plot LongStop = open-val;
LongStop.AssignValueColor(getColor(plotColor));
LongStop.setStyle(curve.SHORT_DASH);

plot ShortStop = open+val;
ShortStop.AssignValueColor(getColor(plotColor));
ShortStop.setStyle(curve.SHORT_DASH);


