# MACDSignals
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 15 Mar 2009

input signalOffsetFactor = 0.20;
input threshold = 0.5;
input fastLength = 12;
input slowLength = 26;
input MACDLength = 9;
input applyThreshold = NO;


def fastAvg = ExpAverage(data = close, length = fastLength);
def slowAvg = ExpAverage(data = close, length = slowLength);
def Value = fastAvg - slowAvg;
def Avg = ExpAverage(data = Value, length = MACDLength);
def Diff = value - avg;
def signalOffset = AvgTrueRange(high,close,low,10)*signalOffsetFactor;

def trendDown = if diff<0 and diff[1]>=0 then 1 else 0 ;
def trendUp = if diff>0 and diff[1]<=0 then 1 else 0 ;
def thresholdDownMet = if applyThreshold then if (value[1]>=threshold, 1 ,0) else 1;
def thresholdUpMet = if applyThreshold then if (value[1]<=-threshold, 1,0) else 1;

plot signal = if trendUp and thresholdUpMet then low-signalOffset else if trendDown and thresholdDownMet then high+signalOffset else double.nan;

signal.setDefaultColor(color.light_GRAY);
signal.setLineWeight(4);
signal.setStyle(curve.points);
signal.setpaintingStrategy(paintingStrategy.LINE_VS_SQUARES);

plot signalHighlight = signal;
signalHighlight.AssignValueColor(if trendUp then color.green else color.red);
signalHighlight.setLineWeight(1);
signalHighlight.setStyle(curve.points);
signalHighlight.setpaintingStrategy(paintingStrategy.LINE_VS_TRIANGLES);
