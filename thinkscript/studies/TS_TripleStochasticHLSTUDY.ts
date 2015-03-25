# TRIPLESTOCHASTICHL
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 13 APR 2009

declare lower;

def over_bought = 80;
def over_sold = 20;
input ShortKPeriod = 5;
input ShortPercentK = 3;
def priceH = high;
def priceL = low;
def priceC = (high+low)/2;
input smoothing_period = 3;
input MidKPeriod = 17;
input MidPercentK = 5;
input LongKPeriod = 28;
input LongPercentK = 14;

def Sc1 = priceC - Lowest(priceL, ShortKPeriod);
def Sc2 = Highest(priceH, ShortKPeriod) - Lowest(priceL, ShortKPeriod);
def SFastK = Sc1/Sc2*100;

def Mc1 = priceC - Lowest(priceL, MidKPeriod);
def Mc2 = Highest(priceH, MidKPeriod) - Lowest(priceL, MidKPeriod);
def MFastK = Mc1/Mc2*100;

def Lc1 = priceC - Lowest(priceL, LongKPeriod);
def Lc2 = Highest(priceH, LongKPeriod) - Lowest(priceL, LongKPeriod);
def LFastK = Lc1/Lc2*100;

plot STF;
plot MTF;
plot LTF;

STF = Average(SFastK, ShortPercentK);
MTF = Average(MFastK, MidPercentK);
LTF = Average(LFastK, LongPercentK);

STF.setDefaultColor(color.green);
MTF.setDefaultColor(color.yellow);
MTF.setLineWeight(2);
LTF.setDefaultColor(color.magenta);
LTF.SetLineWeight(3);

plot OverBought = over_bought;
OverBought.setDefaultColor(color.DARK_GRAY);

plot OverSold = over_sold;
OverSold.setDefaultColor(color.DARK_GRAY);

LTF.AssignValueColor(if LTF < 20 then color.green else if LTF >80 then color.red else color.magenta);

plot MidLine = 50;
Midline.SetDefaultColor(color.white);

