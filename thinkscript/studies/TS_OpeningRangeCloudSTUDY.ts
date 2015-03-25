# TS_OpeningRangeCloud
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 27 SEP 2009

input showOnlyToday = YES;
input openingRangeMinutes = 5;
input Market_Open_Time = 0930;
input Market_Close_Time = 1600;

def day = getDay();
def lastDay = getLastDay();
def isToday = if(day==lastDay,1,0);
def shouldPlot = if(showOnlyToday and isToday, 1,if(!showOnlyToday,1,0));
def pastOpen = if((secondsTillTime(Market_Open_Time) > 0), 0, 1);
def pastClose = if((secondsTillTime(Market_Close_Time) > 0), 0, 1);
def marketOpen = if(pastOpen and !pastClose, 1, 0);
def firstBar = if (day[1] != day, day - 1, 0);

def secondsUntilOpen = secondsTillTime(Market_Open_Time);
def regularHours = secondsTillTime(Market_Close_Time);

def secondsFromOpen = secondsFromTime(Market_Open_Time);
def pastOpeningRange = if(secondsFromOpen >= (openingRangeMinutes * 60), 1, 0);


REC displayedHigh = if(high > displayedHigh[1] and marketOpen, high, if(marketOpen and !firstBar, displayedHigh[1], high));
REC displayedLow = if(low < displayedLow[1] and marketOpen, low, if(marketOpen and !firstBar, displayedLow[1], low));

rec ORHigh = if(pastOpeningRange, ORHigh[1], displayedHigh);
rec ORLow = if(pastOpeningRange, ORLow[1], displayedLow);

plot Opening_Range_High = if(pastOpeningRange and marketOpen and shouldPlot, ORHigh, double.nan); 
plot Opening_Range_Low = if(pastOpeningRange and marketOpen and shouldPlot, ORLow , double.nan);
Opening_Range_High.SetDefaultColor(color.green);
Opening_Range_Low.SetDefaultColor(color.red);
addCloud(Opening_Range_High,Opening_Range_Low,color.gray,color.gray);
