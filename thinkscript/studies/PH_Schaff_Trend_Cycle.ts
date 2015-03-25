# Perfect Hedge's Thinkscript Version of 
# The Schaff Trend Cycle 
# (c) Technical Analysis of Stocks and Commodities - April 2010 
#
# Created/Modified Portions Copyright (c) 2010 by Perfect Hedge
# All rights reserved
#
# Last Modified on 4.24.2010
#
# 04.24.2010 - Created Study
# 

declare lower;

#Default parameters are:
# TrendCycle = 10;
# FastLength = 23
# SlowLength = 50;
# Alpha1 = 0.50;
# Alpha2 = 0.50;
# UpperLimit = 75;
# LowerLimit = 25;
input Price = close;
input TrendCycle = 10;
input FastLength = 23;
input SlowLength = 50;
input Alpha1 = 0.50;
input Alpha2 = 0.50;
input UpperLimit = 75;
input LowerLimit = 25;

def FastLine = Ema2(Price, FastLength, 2 / (FastLength + 1)) - Ema2(Price, SlowLength, 2 / (SlowLength + 1));

# Calculate Stochastic of MACD/Fastline
def HighFast = Highest(FastLine, TrendCycle);
def LowFast  = Lowest(FastLine, TrendCycle);
def f = if HighFast - LowFast > 0 then (FastLine - LowFast) / (HighFast - LowFast) * 100 else 0;
def EMAf = Ema2(f, 0, Alpha1);

# Calculate Second Stochastic of Smoothed f
def HighEMAf = Highest(EMAf, TrendCycle);
def LowEMAf  = Lowest(EMAf, TrendCycle);
def ff = if HighEMAf - LowEMAf > 0 then (EMAf - LowEMAf) / (HighEMAf - LowEMAf) * 100 else 0;
def EMAff = Ema2(ff, 0, Alpha2);

plot Zero = 0;
Zero.SetDefaultColor(color.LIGHT_GRAY);

plot UpperBar = UpperLimit;
UpperBar.SetDefaultColor(color.GRAY);
UpperBar.SetStyle(Curve.SHORT_DASH);

plot LowerBar = LowerLimit;
LowerBar.SetDefaultColor(color.GRAY);
LowerBar.SetStyle(Curve.SHORT_DASH);

plot Schaff_Trend_Cycle = EMAff;
Schaff_Trend_Cycle.SetLineWeight(2);
Schaff_Trend_Cycle.SetDefaultColor(color.LIGHT_ORANGE);

AddVerticalLine((EMAff[1] < LowerBar and EMAff > LowerBar) or (EMAff[1] > UpperBar and EMAff < UpperBar), "", color.VIOLET);

