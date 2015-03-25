# Long-Term KST Exponential Moving Average
# Source: www.pring.com
# ThinkScripter conversion 
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 13 Dec 2009

declare lower;
input emaPeriod = 10;

def roc1 = 39;
def roc2 = 52;
def roc3 = 78;
def roc4 = 104;
def ave1 = 26;
def ave2 = 26;
def ave3 = 26;
def ave4 = 39;

plot KST = (ExpAverage(RateOfChange("price" = close, "length" = roc1), ave1) * 1) + (ExpAverage(RateOfChange("price" = close, "length" = roc2), ave2) * 2) + (ExpAverage(RateofChange("price" = close, "length" = roc3), ave3) * 3) + (ExpAverage(RateOfChange("price" = close, "length" = roc4), ave4) * 4);
KST.SetDefaultColor(color.cyan);

plot ema = ExpAverage(KST, emaPeriod);
ema.SetDefaultColor(color.red);
ema.SetStyle(curve.SHORT_DASH);

plot zero = 0;
zero.SetDefaultColor(color.white);