# THREEDAYPIVOTS
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 22 Feb 2009

input timeFrame = {default DAY};
input showOnlyToday = no;

def day = getDay();
def lastDay = getLastDay();
def isToday = if(day >= lastDay, 1, 0);
def shouldPlot = if(showOnlyToday and isToday, 1, if(!showOnlyToday, 1, 0));

def HA = high(period = timeFrame)[1];
def HB = high(period = timeFrame)[2];
def HC = high(period = timeFrame)[3];
def LA = low(period = timeFrame)[1];
def LB = low(period = timeFrame)[2];
def LC = low(period = timeFrame)[3];
def C = close(period = timeFrame)[1];

def H3 = Max(Max(HA, HB), HC);
def L3 = Min(Min(LA, LB), LC);

def calc_PP = (H3 + L3 + C) / 3;
def calc_MP = (H3 + L3) / 2;
def calc_PR = AbsValue(calc_PP - calc_mp);
def calc_PH = Calc_PP + calc_PR;
def calc_PL = Calc_PP - calc_PR;

plot PH =if (shouldPlot , calc_PH, double.nan); 
plot PL = if (shouldPlot , calc_PL, double.nan);

PH.setStyle(curve.POINTS);
PL.setStyle(curve.POINTS);

PH.SetDefaultColor(color.cyan);
PL.SetDefaultColor(color.yellow);

PH.SetStyle(Curve.POINTS);
PL.SetStyle(Curve.POINTS);
