# TICKRANGE
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 29 SEP 2009

input showOnlyToday = YES;
input Market_Open_Time = 0930;
input Market_Close_Time = 1600;
input tickAveragePeriod = 20;
input bollingerBandFactor = 2.0;

def day = getDay();
def lastDay = getLastDay();
def isToday = if(day==lastDay,1,0);
def shouldPlot = if(showOnlyToday and isToday, 1,if(!showOnlyToday,1,0));

def pastOpen = if((secondsTillTime(Market_Open_Time) > 0), 0,1);
def pastClose = if((secondsTillTime(Market_Close_Time) > 0), 0,1);
def marketOpen = if(pastOpen and !pastClose, 1, 0);
def firstBar =if (day[1] != day, day-1, 0);

rec regHoursHigh = if(high > regHoursHigh[1] and marketOpen, high, if(marketOpen and !firstBar, regHoursHigh[1], high));
plot TICK_High = if(marketOpen and shouldPlot, regHoursHigh, Double.nan);
TICK_High.SetDefaultColor(color.green);
TICK_High.SetLineWeight(1);

rec regHoursLow = if(low < regHoursLow[1] and marketOpen, low, if(marketOpen and !firstBar, regHoursLow[1],low));
plot TICK_Low = if(marketOpen and shouldPlot, regHoursLow, double.nan);
TICK_Low.SetLineWeight(1);
TICK_Low.setDefaultColor(color.red);

input HighThreshold = 1000;
input LowThreshold = -1000;

def tickDataLow = low("$TICK");
def tickDataHigh = high("$TICK");
def tickClose = close("$TICK");

def isLow = if((tickDataLow < LowThreshold), 1, 0);
def isHigh = if((tickDataHigh > HighThreshold), 1, 0);

plot ExtremeTick = if(isLow and !isHigh, low, if(isHigh and !isLow , high, double.nan));
ExtremeTick.setStyle(curve.POINTS);
ExtremeTick.setPaintingStrategy(paintingStrategy.LINE_VS_TRIANGLES);
ExtremeTick.setDefaultColor(color.yellow);
ExtremeTick.setLineWeight(3);

plot tickSMA = average(tickClose,tickAveragePeriod);
tickSMA.setLineWeight(3);
tickSMA.setDefaultColor(color.white);

def ticksDev = stdev(tickClose, tickAveragePeriod);

plot tickBBH = tickSMA+bollingerBandFactor*tickSDev;
tickBBH.setLineWeight(1);
tickBBH.setDefaultColor(color.dark_gray);

plot tickBBL = tickSMA-bollingerBandFactor*tickSDev;
tickBBL.setLineWeight(1);
tickBBL.setDefaultColor(color.dark_gray);

AssignPriceColor(if tickSMA >= 0 then color.green else color.red);

plot eHT = HighThreshold;
eHT.setDefaultColor(color.dark_gRAY);

plot eLT = LowThreshold;
eLT.setDefaultColor(color.dark_gRAY);

plot zero = 0;
zero.setDefaultColor(color.red);
zero.setLineWeight(2);
