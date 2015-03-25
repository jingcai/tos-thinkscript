# Short-Term KST Weekly Exponential Moving Average
# Source: www.pring.com
# ThinkScripter conversion 
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 13 Dec 2009

declare lower;
input emaPeriod = 10;

def roc1 = 3;
def roc2 = 4;
def roc3 = 6;
def roc4 = 10;
def ave1 = 3;
def ave2 = 4;
def ave3 = 6;
def ave4 = 8;

plot KST = (ExpAverage(RateOfChange("price" = close, "length" = roc1), ave1) * 1) + (ExpAverage(RateOfChange("price" = close, "length" = roc2), ave2) * 2) + (ExpAverage(RateofChange("price" = close, "length" = roc3), ave3) * 3) + (ExpAverage(RateOfChange("price" = close, "length" = roc4), ave4) * 4);
KST.SetDefaultColor(color.cyan);

plot ema = ExpAverage(KST, emaPeriod);
ema.SetDefaultColor(color.red);
ema.SetStyle(curve.SHORT_DASH);

plot zero = 0;
zero.SetDefaultColor(color.white);