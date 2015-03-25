# DAYRANGE
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 14 Feb 2009

input showOnlyToday = YES;
input Market_Open_Time = 0930;
input Market_Close_Time = 1600;

def day = getDay();
def lastDay = getLastDay();
def isToday = if(day==lastDay,1,0);
def shouldPlot = if(showOnlyToday and isToday, 1,if(!showOnlyToday,1,0));

def pastOpen = if((secondsTillTime(Market_Open_Time) > 0), 0,1);
def pastClose = if((secondsTillTime(Market_Close_Time) > 0), 0,1);
def marketOpen = if(pastOpen and !pastClose, 1, 0);
def firstBar =if (day[1] != day, day-1, 0);

rec regHoursHigh = if(high > regHoursHigh[1] and marketOpen, high, if(marketOpen and !firstBar, regHoursHigh[1], high));
plot Regular_Hours_High = if(marketOpen and shouldPlot, regHoursHigh, Double.nan);
Regular_Hours_High.SetStyle(curve.points);
Regular_Hours_High.SetDefaultColor(color.green);
Regular_Hours_High.SetLineWeight(2);

rec regHoursLow = if(low < regHoursLow[1] and marketOpen, low, if(marketOpen and regHoursLow[1]>0 and !firstBar, regHoursLow[1],low));
plot Regular_Hours_Low = if(marketOpen and shouldPlot, regHoursLow, double.nan);
Regular_Hours_Low.SetLineWeight(2);
Regular_Hours_Low.SetStyle(curve.points);
Regular_Hours_Low.SetDefaultColor(color.red);

plot Midpoint_Pivot = if(marketOpen and shouldPlot, (Regular_Hours_High + Regular_Hours_Low) / 2, double.nan);
Midpoint_Pivot.SetLineWeight(2);
Midpoint_Pivot.SetDefaultColor(color.white);
#Midpoint_Pivot.SetPaintingStrategy(PaintingStrategy.POINTS);

