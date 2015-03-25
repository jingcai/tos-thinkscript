# TS_NDayHILOBreakout
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 10 Aug 2009

input length = 3;

def HH3 = highest(high,length)[1];
def LL3 = lowest(low,length)[1];

rec mode = compoundValue(1, if high>hh3 then 1 else if low<ll3 then -1 else mode[1], 0);
def modeFlip = if mode!=mode[1] then 1 else 0;

rec trigger = if(!isNan(close), if mode[1]==1 then LL3 else hh3, if(!isNan(close[1]), trigger[1], double.nan));
plot triggerLine = if isNan(close[-1]) and !modeFlip[1] then trigger else double.nan;
triggerLine.assignValueColor(if mode[1]==1 then color.red else color.green);
triggerLine.SetLineWeight(2);

plot tradeSignal = if mode==1 and mode[1]==-1 then hh3 else if mode==-1 and mode[1]==1 then ll3 else double.nan;
tradeSignal.setStyle(curve.points);
tradeSignal.assignValueColor(if mode==1 then color.green else color.red);
tradeSignal.setLineWeight(1);
tradeSignal.setPaintingStrategy(paintingStrategy.LINE_VS_TRIANGLES);