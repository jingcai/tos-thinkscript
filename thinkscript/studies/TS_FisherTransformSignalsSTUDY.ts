# FisherTransformSignals
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 20 June 2010

input signalOffsetFactor = 0.20;
input length = 10;
input threshold = 2.0;

def signalOffset = AvgTrueRange(high,close,low,10)*signalOffsetFactor;

def maxHigh = Highest(high, length);
def minLow = Lowest(low, length);

rec value = if maxHigh - minLow == 0 then 0 else 0.66 * ((close - minLow) / (maxHigh - minLow) - 0.5) + 0.67 * value[1];

def truncValue = if value > 0.99 then 0.999 else if value < -0.99 then -0.999 else value;

rec FT = 0.5 * (log((1 + truncValue) / (1 - truncValue)) + FT[1]);

def trendDown = if FT<FT[1] and FT[1]>FT[2] and FT[1]>=threshold then 1 else 0;
def trendUp = if FT>FT[1] and FT[1]<FT[2] and FT[1]<= -threshold then 1 else 0;

def cSignal = if trendUp then low-signalOffset else if trendDown then high+signalOffset else double.nan;

plot signalHighlight = cSignal;
signalHighlight.AssignValueColor(if trendUp then color.green else color.red);
signalHighlight.setLineWeight(1);
signalHighlight.setStyle(curve.points);
signalHighlight.setpaintingStrategy(paintingStrategy.LINE_VS_TRIANGLES);

plot signal = cSignal;
signal.setDefaultColor(color.white);
signal.setLineWeight(4);
signal.setStyle(curve.points);
signal.setpaintingStrategy(paintingStrategy.LINE_VS_SQUARES);



#alert(trendup or trendDown, if trendUp then "Long" else "Short", Alert.bar, sound.bell);