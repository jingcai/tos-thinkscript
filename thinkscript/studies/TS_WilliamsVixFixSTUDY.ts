# TS_WilliamsVixFix
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 30 AUG 2009

declare lower;
declare zerobase;
input period = 22;

plot WVF = (highest(close,period)-low)/(highest(close,period))*100;
WVF.setDefaultColor(color.white);

input BBlength = 20;
input BB1Num_Dev_Dn = -2.0;
input BB1Num_Dev_up = 2.0;

def sDev = stdev(data = WVF, length = BBlength);
def MidLine = Average(data = WVF, length = BBlength);
plot LowerBand = MidLine + BB1num_Dev_Dn * sDev;
plot UpperBand = MidLine + BB1num_Dev_Up * sDev;

LowerBand.SetDefaultColor(color.DARK_green);
UpperBand.SetDefaultColor(color.DARK_red);

LowerBand.SetLineWeight(2);
UpperBand.SetLineWeight(2);