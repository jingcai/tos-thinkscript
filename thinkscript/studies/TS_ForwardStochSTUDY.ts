# TS_ForwardStoch
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 20 Oct 2010

input over_bought = 80;
input over_sold = 20;
input KPeriod = 10;

def lowest_k = Lowest(low, KPeriod);
def c1 = close - lowest_k;
def c2 = Highest(high, KPeriod) - lowest_k;
def FastK = c1 / c2 * 100;

rec closeReqOB = if !isNan(close) then (over_bought/100*c2)+lowest_k else closeReqOB[1];
rec closeReqOS =  if !isnan(close) then (over_sold/100*c2)+lowest_k else closeReqOS[1];

plot OB = closeReqOB;
plot OS = closeReqOS;

OB.setDefaultColor(color.red);
OS.setDefaultColor(color.green);



