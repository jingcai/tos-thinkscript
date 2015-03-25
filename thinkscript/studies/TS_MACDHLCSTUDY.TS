# MACDHLC
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 17 Jan 2008

declare lower;

input ShortTimeFrameFastLength = 7;
input ShortTimeFrameSlowLength = 28;
input STFMACDLength = 7;

input LongTimeFrameFastLength = 28;
input LongTimeFrameSlowLength = 112;
input LTFMACDLength = 5;

def fastAvg = ExpAverage(data =hlc3, length = ShortTimeFrameFastLength);
def slowAvg = ExpAverage(data = hlc3, length = ShortTimeFrameSlowLength);

plot STFValue = fastAvg - slowAvg;
STFValue.setLineWeight(2);
DEF STFslope = (STFValue-STFValue[1]);
DEF STFslopeColor = if(STFslope>00.0,9,0);
STFValue.AssignValueColor(getColor(STFSlopeColor));

plot STFAvg = ExpAverage(data = STFValue, length = STFMACDLength);
STFAvg.SetDefaultColor(GetColor(8));

def LfastAvg = ExpAverage(data =hlc3, length = LongTimeFrameFastLength);
def LslowAvg = ExpAverage(data = hlc3, length = LongTimeFrameSlowLength);

plot LTFValue = LfastAvg - LslowAvg;
LTFValue.setDefaultColor(color.green);
LTFValue.hide();

plot Diff = STFvalue - STFavg;
diff.AssignValueColor(if diff >= diff[1] then Color.UPTICK else Color.DOWNTICK);
Diff.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Diff.SetDefaultColor(GetColor(5));
Diff.setLineWeight(3);

plot ZeroLine = 0;
ZeroLine.SetDefaultColor(GetColor(0));

