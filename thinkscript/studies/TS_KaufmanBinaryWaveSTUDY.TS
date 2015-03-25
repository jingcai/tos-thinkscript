# KAUFMANBINARYWAVE
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 27 Feb 2009

declare lower;
input price = close;
input period = 20;
input filterPercent = 10;
def diff = AbsValue(price - price[1]);
def signal = AbsValue(price - price[period]);
def noise = sum(diff, period);
def efRatio = signal / noise;
def fastSC = 0.6022;
def slowSC = 0.0645;
def smooth = Power(efratio * fastSC + slowSC, 2);
rec ama = compoundValue(period, "visible data" = ama[1] + smooth * (price - ama[1]), "historical data" = price
);

def filter = filterPercent/100 * stdev(ama - ama[1], period);
rec amaLow = if(ama < ama[1], ama, amaLow[1]);
rec amaHigh = if(ama > ama[1], ama, amaHigh[1]);
plot BinaryWave = if ama - amalow > filter then 1 else if amaHigh - ama > filter then -1 else 0;
BinaryWave.setDefaultColor(color.red);
