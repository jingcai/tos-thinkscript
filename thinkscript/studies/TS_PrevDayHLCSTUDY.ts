# PREVDAYHLC
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 08 Mar 2009

input showOnlyToday = YES;
input Market_Open_Time = 0930;
input Market_Close_Time = 1600;

def day = getDay();
def lastDay = getLastDay();
def isToday = if(day == lastDay, 1, 0);
def shouldPlot = if(showOnlyToday and isToday, 1, if(!showOnlyToday, 1, 0));

def pastOpen = if((secondsTillTime(Market_Open_Time) > 0), 0, 1);
def pastClose = if((secondsTillTime(Market_Close_Time) > 0), 0, 1);
def marketOpen = if(pastOpen and !pastClose, 1, 0);
def firstBar = if (day[1] != day, 1, 0);

def closingBell = if secondsTillTime(Market_Close_Time)[1]>0 and secondsTillTime(Market_Close_Time)<=0 or (secondsTillTime(Market_Close_Time)[1]<secondsTillTime(Market_Close_Time) and secondsTillTime(Market_Close_Time)[1]>0)  then 1 else 0;

rec regHoursHigh = if(high > regHoursHigh[1] and marketOpen, high, if(marketOpen and !firstBar, regHoursHigh[1], high));
rec regHoursLow = if(low < regHoursLow[1] and marketOpen, low, if(marketOpen and regHoursLow[1] > 0 and !firstBar, regHoursLow[1], low));

rec runningClose = compoundValue(1, if closingbell then close[1] else runningClose[1], close);
rec prevClose = compoundValue(1, if closingBell  then runningClose else prevClose[1], close);
rec prevHigh = compoundValue(1, if closingBell then regHoursHigh[1] else prevHigh[1], high);
rec prevLow = compoundValue(1, if closingBell then regHourslow[1] else prevlow[1], low);
rec prevHigh2 = compoundValue(1, if closingBell then prevHigh[1] else prevHigh2[1], high);
rec prevLow2 = compoundValue(1, if closingBell then prevLow[1] else prevlow2[1], low);

plot pc = if shouldPlot then prevClose else double.nan;
pc.SetStyle(curve.SHORT_DASH);
pc.setDefaultColor(color.white);

plot pl = if shouldPlot then prevLow else double.nan;
pl.SetDefaultColor(color.dark_red);
plot ph = if shouldPlot then prevHigh else double.nan;
ph.SetDefaultColor(color.dark_green);

plot pl2 = if shouldPlot then pl+(pl-prevLow2) else double.nan;
pl2.SetDefaultColor(color.darK_red);
pl2.SetStyle(curve.LONG_DASH);
plot ph2 =if shouldPlot then ph+(ph-prevHigh2) else double.nan;
ph2.SetStyle(curve.LONG_DASH);
ph2.SetDefaultColor(color.dark_green);

