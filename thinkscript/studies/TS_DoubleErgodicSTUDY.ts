# TS_DoubleErgodic
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 04 JUL 09
#
# When none of the indicator is showing, shorten
# the LongTerm_s period

declare lower;

input ShortTerm_s = 28;
input ShortTerm_r = 7;
input ShortTerm_signalPeriod = 7;
input ShortTerm_smoothing = 3;
input LongTerm_s = 112;
input LongTerm_r = 28;
input LongTerm_WMAPeriod = 4;
input LongTerm_scalingPeriod = 34;

def ST_trueStrength = TrueStrengthIndex(ShortTerm_s,ShortTerm_r);
def LT_trueStrength = TrueStrengthIndex(LongTerm_r,LongTerm_s);

plot STErgodic = HullMovingAvg(ST_trueStrength, ShortTerm_smoothing,0);
STErgodic.DefineColor("SlopePositive", color.white);
STErgodic.DefineColor("SlopeNegative", color.magenta);
STErgodic.AssignValueColor(if STErgodic-STErgodic[1]>0.0 then STErgodic.color("SlopePositive") else STErgodic.color("SlopeNegative"));
STErgodic.setLineWeight(2);

plot ErgodicSignal = ExpAverage(STErgodic, ShortTerm_signalPeriod);
ErgodicSignal.setLineWeight(1);
ErgodicSignal.AssignValueColor(color.yellow);
def LTErgodicData = WMA(LT_trueStrength,LongTerm_WMAPeriod);

def STE_high = if(highest(STErgodic,LongTerm_scalingPeriod)>0,highest(STErgodic,LongTerm_scalingPeriod),1);
def LTE_high = if(highest(LTErgodicData,LongTerm_scalingPeriod)>0,highest(LTErgodicData,LongTerm_scalingPeriod),1);
def STE_low = if(lowest(STErgodic,LongTerm_scalingPeriod)>0,-1,lowest(STErgodic,LongTerm_scalingPeriod));
def LTE_low = if(lowest(LTErgodicData,LongTerm_scalingPeriod)>0,-1,lowest(LTErgodicData,LongTerm_scalingPeriod));
def largestValue = if(STE_high>absValue(STE_low),STE_high,absValue(STE_low));
def largestValueL = if(LTE_high>absValue(LTE_low),LTE_high,absValue(LTE_low));
def LTE_scaleFactor = largestValue/largestValueL;

plot LTErgodic = WMA(LT_trueStrength,LongTerm_WMAPeriod)*LTE_scaleFactor;
LTErgodic.DefineColor("SlopePositive", color.green);
LTErgodic.DefineColor("SlopeNegative", color.red);

LTErgodic.AssignValueColor(if LTErgodic-LTErgodic[1]>0.0 then LTErgodic.color("SlopePositive") else LTErgodic.color("SlopeNegative"));
LTErgodic.setLineWeight(2);

plot zeroLine = 0;
plot plusLine = 25;
plot minusLine = -25;
zeroLine.setDefaultColor(color.LIGHT_GRAY);
zeroLine.setStyle(curve.SHORT_DASH);
plusLine.setDefaultColor(color.LIGHT_GRAY);
plusLine.setStyle(curve.SHORT_DASH);
minusLine.setDefaultColor(color.LIGHT_GRAY);
minusLine.setStyle(curve.SHORT_DASH);