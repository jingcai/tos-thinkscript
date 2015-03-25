# Five Minute Bar Long-Term Simple Moving Average
# Source: www.pring.com
# ThinkScripter conversion 
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 13 Dec 2009

declare lower;
input emaPeriod = 10;

def roc1 = 60;
def roc2 = 90;
def roc3 = 120;
def roc4 = 200;
def ave1 = 30;
def ave2 = 40;
def ave3 = 60;
def ave4 = 100;

plot KST = (Average(RateOfChange("price" = close, "length" = roc1), ave1) * 1) + (Average(RateOfChange("price" = close, "length" = roc2), ave2) * 2) + (Average(RateofChange("price" = close, "length" = roc3), ave3) * 3) + (Average(RateOfChange("price" = close, "length" = roc4), ave4) * 4);
KST.SetDefaultColor(color.cyan);

plot ema = ExpAverage(KST, emaPeriod);
ema.SetDefaultColor(color.red);
ema.SetStyle(curve.SHORT_DASH);

plot zero = 0;
zero.SetDefaultColor(color.white);