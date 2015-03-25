# TS_RTH_MULTIPIVOTS
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 19 Apr 2009

input showOnlyToday = YES;
input plotMidlines = NO;
input pivotType = {default Traditional, Camarilla, DeMarkHiLo, Woodies};

def Market_Open_Time_EST = 0930;
def Market_Close_Time_EST = 1600;
def day = getDay();
def lastDay = getLastDay();

def pastOpen = if((secondsTillTime(Market_Open_Time_EST) > 0), 0, 1);
def pastClose = if((secondsTillTime(Market_Close_Time_EST) > 0), 0, 1);
def marketOpen = if(pastOpen and !pastClose, 1, 0);
def firstBar = if (day[1] != day, 1, 0);

def hideExtHrs = if (pivotType==pivotType.DeMarkHiLo or pivotType==pivotType.Woodies) and !marketOpen then 1 else 0;

def isToday = if(day == lastDay, 1, 0);
def shouldPlot = if(showOnlyToday and isToday and !hideExtHrs, 1, if(!showOnlyToday and !hideExtHrs, 1, 0));
def shouldPlotMidline = if shouldPlot and plotMidlines then 1 else 0;

def closingBell = if secondsTillTime(Market_Close_Time_EST)[1] > 0 and secondsTillTime(Market_Close_Time_EST) <= 0 or (secondsTillTime(Market_Close_Time_EST)[1] < secondsTillTime(Market_Close_Time_EST) and secondsTillTime(Market_Close_Time_EST)[1] > 0)  then 1 else 0;

def openingBell = if secondsTillTime(Market_Open_Time_EST)[1]>0 and secondsTillTime(Market_Open_Time_EST)<=0 or (secondsTillTime(Market_Open_Time_EST)[1]<secondsTillTime(Market_Open_Time_EST) and secondsTillTime(Market_Open_Time_EST)<=0)  then 1 else 0;

rec regHoursHigh = if(high > regHoursHigh[1] and marketOpen, high, if(marketOpen and !firstBar, regHoursHigh[1], high));
rec regHoursLow = if(low < regHoursLow[1] and marketOpen, low, if(marketOpen and regHoursLow[1] > 0 and !firstBar, regHoursLow[1], low));

rec O = compoundValue(1, if openingBell  then open else O[1], open);
rec C = compoundValue(1, if closingBell  then close else C[1], close);
rec H = compoundValue(1, if closingBell then regHoursHigh[1] else H[1], high);
rec L = compoundValue(1, if closingBell then regHourslow[1] else L[1], low);

def X = if C<O then (H+(L*2)+C) else if C>O then ((H*2)+L+C) else (H+L+(C*2));

plot PP ;
plot R1  ;
plot R2 ;
plot R3;
plot R4;

plot S1  ;
plot S2  ;
plot S3 ;
plot S4;

switch (pivotType) {

case Traditional:
    
PP = if shouldPlot then (H + L + C) / 3 else double.nan;
R1 = if shouldPlot then (2 * PP) - L else double.nan;
R2 = if shouldPlot then PP + H - L else double.nan;
R3 = if shouldPlot then H + 2 * (PP - L) else double.nan;
R4 = double.nan;

S1 = if shouldPlot then (2 * PP) - H else double.nan;
S2 = if shouldPlot then PP - H + L else double.nan;
S3 = if shouldPlot then L - 2 * (H - PP) else double.nan;
S4 = double.nan;

case Camarilla:
    
PP= double.nan;
R1 = double.nan;
R2 = double.nan;
S1 = double.nan;
S2 = double.nan;
# To regain all Camarilla levels
# comment out above lines and uncomment
# lines below
#PP =  if shouldPlot then (H + L + C) / 3 else double.nan ;
#R1 =  if shouldPlot then C+((H-L)*1.1/12) else double.nan;
#R2 = if shouldPlot then C+((H-L)*1.1/6) else double.nan;
R3 = if shouldPlot then C+((H-L)*1.1/4) else double.nan;
R4 =  if shouldPlot then C+((H-L)*1.1/2) else double.nan;
#S1 = if shouldPlot then C-((H-L)*1.1/12) else double.nan;
#S2 = if shouldPlot then C-((H-L)*1.1/6) else double.nan;
S3 = if shouldPlot then C-((H-L)*1.1/4) else double.nan;
S4 =  if shouldPlot then C-((H-L)*1.1/2) else double.nan;

case DeMarkHiLo:
   
PP = double.nan;
R1 = if shouldPlot then X/2-L else double.nan;
R2 = double.nan;
R3 = double.nan;
R4 = double.nan;

S1 = if shouldPlot then X/2-H else double.nan;
S2 = double.nan;
S3 = double.nan;
S4 = double.nan;

case Woodies:
    
PP = if shouldPlot then (H + L + O*2) / 4 else double.nan;
R1 = if shouldPlot then (2 * PP) - L else double.nan;
R2 = if shouldPlot then PP + R1 - ((2 * PP) - H) else double.nan;
R3 = if shouldPlot then PP +R2 - (PP - R1 + ((2 * PP) - H)) else double.nan;
R4= double.nan;

S1 = if shouldPlot then (2 * PP) - H else double.nan;
S2 = if shouldPlot then PP - R1 + S1 else double.nan;
S3 = if shouldPlot then PP - R2 + S2 else double.nan;
S4 = double.nan;
}

PP.SetDefaultColor(color.white);
R1.SetDefaultColor(color.red);
R2.SetDefaultColor(color.red);
R3.SetDefaultColor(color.red);
R4.SetDefaultColor(color.red);

S1.SetDefaultColor(color.green);
S2.SetDefaultColor(color.green);
S3.SetDefaultColor(color.green);
S4.SetDefaultColor(color.green);

PP.SetStyle(Curve.POINTS);
R1.SetStyle(Curve.POINTS);
R2.SetStyle(Curve.POINTS);
R3.SetStyle(Curve.POINTS);
R4.SetStyle(Curve.POINTS);

S1.SetStyle(Curve.POINTS);
S2.SetStyle(Curve.POINTS);
S3.SetStyle(Curve.POINTS);
S4.setStyle(Curve.POINTS);

plot PR1M = if(shouldPlotMidline, pp + ((r1 - pp) / 2), double.nan);
PR1M.SetStyle(curve.POINTS);
PR1M.SetDefaultColor(color.darK_GRAY);
PR1M.SetLineWeight(1);

plot R1R2M =  if(shouldPlotMidline, r1 + ((r2 - r1) / 2), double.nan);
R1R2M.SetStyle(curve.POINTS);
R1R2M.SetDefaultColor(color.darK_GRAY);
R1R2M.SetLineWeight(1);

plot R2R3M =  if(shouldPlotMidline, r2 + ((r3 - r2) / 2), double.nan);
R2R3M.SetStyle(curve.POINTS);
R2R3M.SetDefaultColor(color.darK_GRAY);
R2R3M.SetLineWeight(1);

plot PS1M =  if(shouldPlotMidline, s1 + ((pp - s1) / 2), double.nan);
PS1M.SetStyle(curve.POINTS);
PS1M.SetDefaultColor(color.darK_GRAY);
PS1M.SetLineWeight(1);

plot S1S2M =  if(shouldPlotMidline, s2 + ((s1 - s2) / 2), double.nan);
S1S2M.SetStyle(curve.POINTS);
S1S2M.SetDefaultColor(color.darK_GRAY);
S1S2M.SetLineWeight(1);

plot S2S3M =  if(shouldPlotMidline, s3 + ((s2 - s3) / 2), double.nan);
S2S3M.SetStyle(curve.POINTS);
S2S3M.SetDefaultColor(color.darK_GRAY);
S2S3M.SetLineWeight(1);