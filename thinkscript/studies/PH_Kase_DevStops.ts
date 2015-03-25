# Perfect Hedge's thinkScript Version of Cynthia Kase's
# Kase Dev Stops
#
# Perfect Hedge's Version is Based on:
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
# Kase Dev Stops 
# Stop Concept By Cynthia A. Kase
# Originally coded By Kev released on 7.26.2010
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
#
# Created/Modified Portions Copyright (c) 2010 by Perfect Hedge
# All rights reserved
#
# Last Modified on 8.21.2010
#
# 07.31.2010 - Created Study
# 08.16.2010 - Removed maximums and minimums over set interval
# 08.21.2010 - Changed crossing mechanism to be based on crossing desired stop level
#

declare upper;

input LongShortLevel = {Warning, Stop1, Stop2, default Stop3};
input Direction      = {default Normal, Contrary};
input StopTrigger    = Close;
input ShowAlert      = Yes;
# Control calculation mechanics
input Length         = 30; #The number of bars used to determine the std dev used in the study
input TrueRangeBars  = 2;
input StopLevel1     = 1;
input StopLevel2     = 2;
input StopLevel3     = 3;
input SkewAdj        = 0.10;

# In Kase's book, "Trading with the Odds: Using The Power of Probabilities to Profit In the Futures Market",
# She talks about a two-bar reversal - which is based on the height of a single bar.
#
# Set up stops based on average two-bar true range
def H                = Highest(High, TrueRangeBars);
def L                = Lowest(Low, TrueRangeBars);
def C                = Close[TrueRangeBars];
def Range            = Max(Max(H - L, H - C), C - L);#True Range over n-bars
def AvgRange         = Average(Range, Length);
def StdDevRange      = Sqrt(fold i = 0 to Length with iStdDev = 0 do iStdDev + Sqr(getValue(Range, i, Length - 1) - AvgRange) / (Length - 1));# use unbiased estimator of sample variance

def Stop0            = AvgRange;# = "Warning"
def Stop1            = AvgRange + StopLevel1 * Power((1 + SkewAdj), Max(StopLevel1 - 1,0)) * StdDevRange;
def Stop2            = AvgRange + StopLevel2 * Power((1 + SkewAdj), Max(StopLevel2 - 1,0)) * StdDevRange;
def Stop3            = AvgRange + StopLevel3 * Power((1 + SkewAdj), Max(StopLevel3 - 1,0)) * StdDevRange;

# Set up long/short dynamic...
rec MaxHigh;
rec MinLow;           
rec Cross;
switch (LongShortLevel){
case Warning:  
 MaxHigh             = if StopTrigger >= Max(High, MaxHigh[1]) - Stop0 then Max(High, MaxHigh[1]) else High;
 MinLow              = if StopTrigger <= Min(Low, MinLow[1]) + Stop0 then Min(Low, MinLow[1]) else Low;
 Cross               = CompoundValue(1,if isNaN(close) then Cross[1] else if StopTrigger > Min(Low, MinLow[1]) + Stop0 and Cross[1] == 0 then 1 else if StopTrigger < Max(High, MaxHigh[1]) - Stop0 and Cross[1] == 1 then 0 else Cross[1],0);
case Stop1:  
 MaxHigh             = if StopTrigger >= Max(High, MaxHigh[1]) - Stop1 then Max(High, MaxHigh[1]) else High;
 MinLow              = if StopTrigger <= Min(Low, MinLow[1]) + Stop1 then Min(Low, MinLow[1]) else Low;
 Cross               = CompoundValue(1,if isNaN(close) then Cross[1] else if StopTrigger > Min(Low, MinLow[1]) + Stop1 and Cross[1] == 0 then 1 else if StopTrigger < Max(High, MaxHigh[1]) - Stop1 and Cross[1] == 1 then 0 else Cross[1],0);
case Stop2:  
 MaxHigh             = if StopTrigger >= Max(High, MaxHigh[1]) - Stop2 then Max(High, MaxHigh[1]) else High;
 MinLow              = if StopTrigger <= Min(Low, MinLow[1]) + Stop2 then Min(Low, MinLow[1]) else Low;
 Cross               = CompoundValue(1,if isNaN(close) then Cross[1] else if StopTrigger > Min(Low, MinLow[1]) + Stop2 and Cross[1] == 0 then 1 else if StopTrigger < Max(High, MaxHigh[1]) - Stop2 and Cross[1] == 1 then 0 else Cross[1],0);
Default:  
 MaxHigh             = if StopTrigger >= Max(High, MaxHigh[1]) - Stop3 then Max(High, MaxHigh[1]) else High;
 MinLow              = if StopTrigger <= Min(Low, MinLow[1]) + Stop3 then Min(Low, MinLow[1]) else Low;
 Cross               = CompoundValue(1,if isNaN(close) then Cross[1] else if StopTrigger > Min(Low, MinLow[1]) + Stop3 and Cross[1] == 0 then 1 else if StopTrigger < Max(High, MaxHigh[1]) - Stop3 and Cross[1] == 1 then 0 else Cross[1],0);}

plot Header          = Double.NaN;
Header.SetDefaultColor(color.LIGHT_GRAY);
Header.HideTitle();

plot Warning;        
plot DevStop1;        
plot DevStop2;        
plot DevStop3;
switch (Direction){
case Contrary:        
 Warning             = if !Cross then MaxHigh - Stop0 else MinLow + Stop0;
 DevStop1            = if !Cross then MaxHigh - Stop1 else MinLow + Stop1;
 DevStop2            = if !Cross then MaxHigh - Stop2 else MinLow + Stop2;
 DevStop3            = if !Cross then MaxHigh - Stop3 else MinLow + Stop3;
Default:        
 Warning             = if Cross then MaxHigh - Stop0 else MinLow + Stop0;
 DevStop1            = if Cross then MaxHigh - Stop1 else MinLow + Stop1;
 DevStop2            = if Cross then MaxHigh - Stop2 else MinLow + Stop2;
 DevStop3            = if Cross then MaxHigh - Stop3 else MinLow + Stop3;}
#plot Warning         = if Cross <> Cross[1] then Double.NaN else if Cross then MaxHigh - Stop0 else MinLow + Stop0;
#plot DevStop1        = if Cross <> Cross[1] then Double.NaN else if Cross then MaxHigh - Stop1 else MinLow + Stop1;
#plot DevStop2        = if Cross <> Cross[1] then Double.NaN else if Cross then MaxHigh - Stop2 else MinLow + Stop2;
#plot DevStop3        = if Cross <> Cross[1] then Double.NaN else if Cross then MaxHigh - Stop3 else MinLow + Stop3;

Warning.SetLineWeight(1);Warning.SetDefaultColor(createcolor(65,65,65));#createcolor(152,102,0)
Warning.SetPaintingStrategy(PaintingStrategy.LINE);Warning.SetStyle(Curve.FIRM);Warning.HideBubble();
#Warning.SetPaintingStrategy(PaintingStrategy.LINE_VS_POINTS);Warning.SetStyle(Curve.POINTS);
DevStop1.SetLineWeight(2);DevStop1.SetDefaultColor(createcolor(65,65,65));#createcolor(152,102,0)
DevStop1.SetPaintingStrategy(PaintingStrategy.LINE);DevStop1.SetStyle(Curve.FIRM);DevStop1.HideBubble();
#DevStop1.SetPaintingStrategy(PaintingStrategy.LINE_VS_POINTS);DevStop1.SetStyle(Curve.POINTS);
DevStop2.SetLineWeight(3);DevStop2.SetDefaultColor(createcolor(65,65,65));#createcolor(152,102,0)
DevStop2.SetPaintingStrategy(PaintingStrategy.LINE);DevStop2.SetStyle(Curve.FIRM);DevStop2.HideBubble();
#DevStop2.SetPaintingStrategy(PaintingStrategy.LINE_VS_POINTS);DevStop2.SetStyle(Curve.POINTS);
DevStop3.SetLineWeight(4);DevStop3.SetDefaultColor(createcolor(65,65,65));#createcolor(152,102,0)
DevStop3.SetPaintingStrategy(PaintingStrategy.LINE);DevStop3.SetStyle(Curve.FIRM);DevStop3.HideBubble();
#DevStop3.SetPaintingStrategy(PaintingStrategy.LINE_VS_POINTS);DevStop3.SetStyle(Curve.POINTS);

def AlertLevel;
switch (LongShortLevel) {
Case Stop2:    AlertLevel = DevStop2;
Case Stop1:    AlertLevel = DevStop1;
Case Warning:  AlertLevel = Warning;
Default:       AlertLevel = DevStop3;}
def AlertCondition   = if Cross then if Low < AlertLevel then 1 else 0 else if High > AlertLevel then 1 else 0;
Alert(ShowAlert and AlertCondition,concat(LongShortLevel," Violation - GET OUT!"),Alert.BAR,Sound.NoSound);


