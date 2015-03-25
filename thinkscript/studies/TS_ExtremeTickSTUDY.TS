# EXTREMETICK
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 17 Jan 2008

input dotOffset = 1.0;
input HighThreshold = 1000;
input LowThreshold = -1000;

def tickDataLow = low("$TICK");
def tickDataHigh = high("$TICK");
def tickClose = close("$TICK");

def isLow = if((tickDataLow < LowThreshold), 1, 0);
def isHigh = if((tickDataHigh > HighThreshold), 1, 0);

def plotcolor = if(isLow, 6, 5);
plot TickDot = if(isLow and !isHigh, low-dotOffset, if(isHigh and !isLow , high+dotOffset, double.nan));
TickDot.setStyle(curve.POINTS);
TickDot.assignValueColor(getColor(plotcolor));
TickDot.setLineWeight(3);




