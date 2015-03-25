# TS_MarketThrust
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 12 May 2010

declare lower;
input AvePeriod = 10;
input showOnlyToday = YES;

def T1c = (close("$ADVN") * close("$UVOL")) - (close("$DECN") * close("$DVOL"));
plot T1 = if showOnlyToday and getDay() == getLastDay() then T1c else if !showOnlyToday then T1c else double.nan;
T1.SetDefaultColor(color.red);
def TAvec = Average(T1, AvePeriod);
plot TAve =  if showOnlyToday and getDay() == getLastDay() then TAvec else if !showOnlyToday then TAvec else double.nan;
TAve.SetDefaultColor(color.white);

plot zero = 0;
zero.SetDefaultColor(color.yellow);

def U = close("$UVOL");
def D = close ("$DVOL");
def DVOL = U - D;

AddChartLabel(yes, concat(DVOL, concat(" ", 
"UVOL-DVOL")), 
 if DVOL > DVOL[1] then color.green else color.red);