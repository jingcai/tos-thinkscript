# TS_RollingPivots
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 10 Aug 2009

input showOnlyToday = YES;

def day = getDay();
def lastDay = getLastDay();
def isToday = if(day == lastDay, 1, 0);



input Market_Open_Time = 930;
input Market_Close_Time = 1600;
input rollingPeriodMinutes = 60;
input proximityFilter = NO;
input proximityPercentage = 5.0;

def factor = (secondsFromTime(Market_Open_Time)/(60*rollingPeriodMinutes));
def factorRounded = round100(factor);
def comparator = round100(factor/100)*100;
def rolloverTime = if (factorRounded[1]<comparator[1] and factorRounded>=comparator) then 1 else 0;

def shouldPlot = if(showOnlyToday and isToday and !rolloverTime, 1, if(!showOnlyToday and !rolloverTime, 1, 0));
rec H1 = compoundValue(1, if !rolloverTime then if high>H1[1] then high else H1[1] else high,high);
rec H = compoundValue(1, if rolloverTime then H1[1] else H[1],high);
rec L1 = compoundValue(1, if !rolloverTime then if low<L1[1] then low else L1[1] else low,low);
rec L = compoundValue(1, if rolloverTime then L1[1] else L[1],low);
rec C = compoundValue(1, if rolloverTime then close[1] else C[1],close);

def cPP = (H + L + C)/3;
def cR1 =(2*cPP)-L ;
def cR2 =  cPP+H-L;
def cR3 =  H+2*(cPP-L) ;

def cS1 =  (2*cPP)-H;
def cS2 =  cPP-H+L ;
def cS3 =  L-2*(H-cPP) ;

plot PP = if shouldPlot then if proximityFilter and absValue(cPP - close)/close <= proximityPercentage/100.0 then cPP else if !proximityFilter then cPP else double.nan else double.nan;
plot R1 = if shouldPlot then if proximityFilter and absValue(cR1- close)/close <= proximityPercentage/100.0 then cR1 else if !proximityFilter then cR1 else double.nan else double.nan;
plot R2 = if shouldPlot then if proximityFilter and absValue(cR2 - close)/close <= proximityPercentage/100.0 then cR2 else if !proximityFilter then cR2 else double.nan else double.nan;
plot R3 = if shouldPlot then if proximityFilter and absValue(cR3 - close)/close <= proximityPercentage/100.0 then cR3 else if !proximityFilter then cR3 else double.nan else double.nan;

plot S1 = if shouldPlot then if proximityFilter and absValue(cS1 - close)/close <= proximityPercentage/100.0 then cS1 else if !proximityFilter then cS1 else double.nan else double.nan;
plot S2 = if shouldPlot then if proximityFilter and absValue(cS2 - close)/close <= proximityPercentage/100.0 then cS2 else if !proximityFilter then cS2 else double.nan else double.nan;
plot S3 = if shouldPlot then if proximityFilter and absValue(cS3 - close)/close <= proximityPercentage/100.0 then cS3 else if !proximityFilter then cS3 else double.nan else double.nan;

PP.SetDefaultColor(color.white);
PP.setLineWeight(2);
R3.setLineWeight(2);

S3.setLineWeight(2);


R1.SetDefaultColor(color.DARK_red);
R2.SetDefaultColor(color.red);
R3.SetDefaultColor(color.red);

S1.SetDefaultColor(color.DARK_green);
S2.SetDefaultColor(color.green);
S3.SetDefaultColor(color.green);


