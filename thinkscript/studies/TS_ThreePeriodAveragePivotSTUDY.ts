# TS_ThreePeriodAveragePivot
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 13 SEP 2009

# Average (day, week, month) Pivot Point

input timeFrame = {default DAY, WEEK, MONTH};
input showOnlyCurrentPeriod = yes;
def isToday = if getDay()==getLastDay() then 1 else 0;
def isWeek = if getWeek()==getLastWeek() then 1 else 0;
def isMonth = if getMonth()==getLastMonth() then 1 else 0;
def shouldPlot = if showOnlyCurrentPeriod and (timeFrame == timeframe.DAY and isToday) or (timeFrame == timeframe.WEEK and isWeek) or (timeFrame == timeframe.MONTH and isMonth) then 1 else if !showOnlyCurrentPeriod then 1 else 0;

def agghigh1 = high(period = timeFrame)[2];
def agglow1 = low(period = timeFrame)[2];
def aggclose1 = close(period = timeFrame)[2];

def agghigh2 = high(period = timeFrame)[3];
def agglow2 = low(period = timeFrame)[3];
def aggclose2 = close(period = timeFrame)[3];

def agghigh3 = high(period = timeFrame)[4];
def agglow3 = low(period = timeFrame)[4];
def aggclose3 = close(period = timeFrame)[4];

def calc_PP1 = (agghigh1 + agglow1 + aggclose1) / 3;
def calc_PP2 = (agghigh2 + agglow2 + aggclose2) / 3;
def calc_PP3 = (agghigh3 + agglow3 + aggclose3) / 3;
def calc_PP = (Calc_pp1+ Calc_PP2+ calc_PP3)/3;

Plot PP = if shouldPlot then calc_PP else double.nan;

PP.SetDefaultColor(Color.Yellow);
PP.SetStyle(Curve.Short_Dash); 