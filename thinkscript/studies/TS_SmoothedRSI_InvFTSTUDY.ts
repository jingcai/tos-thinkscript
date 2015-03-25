# TS_SmoothedRSI_InverseFisherTransform
# By Sylvain Vervoort - Oct 2010 S&C Magazine
# thinkScript adaptation by
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 28 NOV 2010

declare lower;

input RSIper = 4;
input EMAper = 4;
def ma1 = wma(close, 2);
def ma2 = wma(ma1, 2);
def ma3 = wma(ma2, 2);
def ma4 = wma(ma3, 2);
def ma5 = wma(ma4, 2);
def ma6 = wma(ma5, 2);
def ma7 = wma(ma6, 2);
def ma8 = wma(ma7, 2);
def ma9 = wma(ma8, 2);
def ma10 = wma(ma9, 2);
def RainbW = (5 * ma1 + 4 * ma2 + 3 * ma3 + 2 * ma4 + ma5 + ma6 + ma7 + ma8 + ma9 + ma10) / 20;
def x = 0.1 * (RSIWilder(price = RainbW, length = RSIper) - 50);
def EMA1 = ExpAverage(x, EMAper);
def EMA2 = ExpAverage(EMA1, EMAper);
def Difference = EMA1 - EMA2;
def ZlEma = EMA1 + Difference;

plot invfish = ((exp(2 * ZlEma) - 1) / (exp(2 * ZlEma) + 1) + 1) * 50;
invfish.setDefaultColor(color.red);

plot zero = 0;
zero.setDefaultColor(color.gray);

plot oneHundred = 100;
oneHundred.setDefaultColor(color.gray);