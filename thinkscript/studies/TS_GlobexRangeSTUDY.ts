# TS_GlobexRange
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 18 JUL 2009

input Globex_Open = 1630;
input Globex_Close = 0930;

def globexOpen = if(secondsFromTime(Globex_Open) >= 0 or secondsTillTime(Globex_Close)>=0, 1, 0);
def globexReset = if globexOpen and !globexOpen[1] then 1 else 0;

rec globexHigh = compoundValue(1, if((high > globexHigh[1] and globexOpen) or globexReset, high,globexHigh[1]),high);
rec globexLow = compoundValue(1, if((low < globexLow[1] and globexOpen) or globexReset, low,globexLow[1]),low);

plot Globex_High = globexHigh;
Globex_high.SetStyle(curve.SHORT_DASH);
Globex_High.SetDefaultColor(color.pink);
Globex_High.setLineWeight(2);
plot Globex_Low = globexLow;
Globex_Low.SetDefaultColor(color.pink);
Globex_Low.setLineWeight(2);




