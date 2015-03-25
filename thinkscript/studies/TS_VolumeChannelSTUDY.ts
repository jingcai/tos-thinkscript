# TS_VolumeChannel
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 07 MAY 09

input showOnlyToday = YES;
input useTimePeriods = YES;
input firstPeriodEnd_EST = 1130;
input secondPeriodEnd_EST = 1400;

input Market_Open_Time_EST = 0930;
input Market_Close_Time_EST = 1615;
def day = getDay();
def lastDay = getLastDay();

def pastOpen = if((secondsTillTime(Market_Open_Time_EST) > 0), 0, 1);
def pastClose = if((secondsTillTime(Market_Close_Time_EST) > 0), 0, 1);
def marketOpen = if(pastOpen and !pastClose, 1, 0);
def firstBar = if (day[1] != day, 1, 0);

def isToday = if(day == lastDay, 1, 0);
def shouldPlot = if(showOnlyToday and isToday , 1, if(!showOnlyToday , 1, 0));

def closingBell = if secondsTillTime(Market_Close_Time_EST)[1] > 0 and secondsTillTime(Market_Close_Time_EST) <= 0 or (secondsTillTime(Market_Close_Time_EST)[1] < secondsTillTime(Market_Close_Time_EST) and secondsTillTime(Market_Close_Time_EST)[1] > 0)  then 1 else 0;

def openingBell = if secondsTillTime(Market_Open_Time_EST)[1]>0 and secondsTillTime(Market_Open_Time_EST)<=0 or (secondsTillTime(Market_Open_Time_EST)[1]<secondsTillTime(Market_Open_Time_EST) and secondsTillTime(Market_Open_Time_EST)<=0)  then 1 else 0;

def firstPeriodMark = if secondsTillTime(firstPeriodEnd_EST)<=0 and secondsTillTime(firstPeriodEnd_EST)[1]>0 and useTimePeriods then 1 else 0;

def secondPeriodMark = if secondsTillTime(secondPeriodEnd_EST)<=0 and secondsTillTime(secondPeriodEnd_EST)[1]>0 and useTimePeriods then 1 else 0;

rec volumeHigh = if(volume > volumeHigh[1] and marketOpen and !(firstPeriodMark or secondPeriodMark) , volume, if(marketOpen and !firstBar and !(firstPeriodMark or secondPeriodMark), volumeHigh[1], if (!(firstPeriodMark or secondPeriodMark) , volume,0)));

rec priceHigh = if volumeHigh!=volumeHigh[1] then high else priceHigh[1];
rec priceLow = if volumeHigh!=volumeHigh[1] then low else priceLow[1];

plot channelHigh = if shouldPlot then priceHigh else double.nan;
plot channelLow = if shouldPlot then priceLow else double.nan;
plot channelMid = if shouldPlot then priceLow + (priceHigh-priceLow)/2 else double.nan;

channelHigh.setDefaultColor(color.green);
channelLow.setDefaultColor(color.red);
channelMid.setDefaultColor(color.dark_gray);
channelHigh.setStyle(curve.POINTS);
channelLow.setStyle(curve.POINTS);
channelMid.setStyle(curve.POINTS);

plot periodMarkerH = if firstPeriodMark or secondPeriodMark then priceHigh else double.nan;
periodMarkerH.setStyle(curve.POINTS);
periodMarkerH.setDefaultColor(color.white);
periodMarkerH.setLineWeight(5);

plot periodMarkerL = if firstPeriodMark or secondPeriodMark then priceLow else double.nan;
periodMarkerL.setStyle(curve.POINTS);
periodMarkerL.setDefaultColor(color.white);
periodMarkerL.setLineWeight(5);



