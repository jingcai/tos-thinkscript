# TS_ZeroLagMACD
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 30 NOV 2010

declare lower;

input fastLength = 12;
input slowLength = 24;
input signalLength = 9;
input price = close;

plot MACD = (2*ExpAverage(price, fastLength)-ExpAverage(ExpAverage(price, fastLength),fastLength))-(2*ExpAverage(price,slowLength)-ExpAverage(ExpAverage(price,slowLength),slowLength));
MACD.setDefaultColor(color.red);
MACD.setLineWeight(2);

plot SIGNAL = 2*ExpAverage(MACD,signalLength)-ExpAverage(ExpAverage(MACD,signalLength),signalLength);
SIGNAL.setDefaultColor(color.blue);

plot HISTOGRAM = MACD-SIGNAL;
HISTOGRAM.setPaintingStrategy(paintingStrategy.HISTOGRAM);
HISTOGRAM.setDefaultColor(color.green);

plot zero = 0;
zero.setDefaultColor(color.white);