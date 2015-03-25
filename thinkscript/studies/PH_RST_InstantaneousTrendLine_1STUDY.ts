# Perfect Hedge's ThinkScript Version of John Ehlers'
# Instantaneous Trendline Indicator
#
# Portions Copyright John Ehlers (c) 2001
# Created/Modified Portions Copyright (c) 2010 by Perfect Hedge
# All rights reserved
#
# Last Modified on 7.05.2010
#
# 07.05.2010 - Created Study
# 

declare upper;

script HilbertFilter{input Price = close; input PriorPeriod = 6.0;
plot HilbertFilter = (0.0962 * Price + 0.5769 * Price[2] - 0.5769 * Price[4] - 0.0962 * Price[6]) * (0.075 * PriorPeriod + 0.54);}

script HDC{input I1 = close;input Q1 = close;input PriorPeriod = 6.0;
# Advance the InPhase and Quadrature components by Double.Pi/2 radians
def jI = HilbertFilter(I1,PriorPeriod);
def jQ = HilbertFilter(Q1,PriorPeriod);

# Phasor addition for 3 bar averaging
def I2 = I1 - jQ;
def Q2 = Q1 + jI;

# Smooth the InPhase and Quadrature components before applying the discriminator
def SmI2 = EMA2(I2, 5, 0.2);
def SmQ2 = EMA2(Q2, 5, 0.2);

# Homodyne Discriminator
def Re   = EMA2(SmI2*SmI2[1] + SmQ2*SmQ2[1],5,0.2);
def Im   = EMA2(SmI2*SmQ2[1] - SmQ2*SmI2[1],5,0.2);

def PeriodA = if Im <> 0 and Re <> 0 then 2*Double.Pi/(atan(Im/Re)) else 0;
# Limit Period to be within the bounds of 6 bar and 50 bar cycles (among other things)
def PeriodB = Max(Min(Max(Min(PeriodA, 3*PeriodA[1]/2),2*PeriodA[1]/3),50),6);
def Period  = EMA2(PeriodB,5,0.2);

def SmoothPeriod = EMA2(Period,3,0.3333333333);
plot HDC = SmoothPeriod;
}

#////////////////////////////////////////////////////////////////////////////////////////////////////

input PriceMethod = hl2;
input UseScalingFactor = Yes;

def Price           = if UseScalingFactor then PriceMethod * 0.01 / if( tickSize() > 0 and tickSize() < 0.01, tickSize(), 0.01) else PriceMethod;

def Smooth          = if BarNumber() > 5 then WMA(Price, 4) else 0;

#
# Must do multiple iterations to get "prior period" since Thinkscript does not allow 
# references to variables before they are defined in the study, 
# even though they may exist on a prior bar...
#
def jDetrender      = if BarNumber() > 5 then HilbertFilter(Smooth,6) else 0;
def jI1             = if BarNumber() > 5 then jDetrender[3] else 0;
def jQ1             = if BarNumber() > 5 then HilbertFilter(jDetrender,6) else 0;
                    # use initial Period = 6 to calculate a pre-"past" period!
def JnitPrePeriod   = if BarNumber() > 5 then HDC(jI1,jQ1,6) else 0;

def iDetrender      = if BarNumber() > 5 then HilbertFilter(Smooth,JnitPrePeriod[1]) else 0;
def iI1             = if BarNumber() > 5 then iDetrender[3] else 0;
def iQ1             = if BarNumber() > 5 then HilbertFilter(iDetrender,JnitPrePeriod[1]) else 0;
                    # use initial Period = 6 to calculate a pre-"past" period!
def InitPrePeriod   = if BarNumber() > 5 then HDC(iI1,iQ1,JnitPrePeriod[1]) else 0;

def pDetrender      = if BarNumber() > 5 then HilbertFilter(Smooth,InitPrePeriod[1]) else 0;
def pI1             = if BarNumber() > 5 then pDetrender[3] else 0;
def pQ1             = if BarNumber() > 5 then HilbertFilter(pDetrender,InitPrePeriod[1]) else 0;
def PrePeriod       = if BarNumber() > 5 then HDC(pI1,pQ1,InitPrePeriod[1]) else 0;

def Detrender       = if BarNumber() > 5 then HilbertFilter(Smooth,PrePeriod[1]) else 0;
def I1              = if BarNumber() > 5 then Detrender[3] else 0;
def Q1              = if BarNumber() > 5 then HilbertFilter(Detrender,PrePeriod[1]) else 0;
def Period          = if BarNumber() > 5 then HDC(I1,Q1,PrePeriod[1]) else 0;

# Compute the Dominant Cycle Phase
def DCPeriod        = Ceil(Period);
def DCHalfPeriod    = Floor(DCPeriod/2);

# Compute Trendline as simple moving average (SMA) over the measured dominant cycle period
# Do NOT want to use "scaled" prices in these calculations - used only to deteremine dominant cycle period 
def iTrend          = fold i = 0 to 51 with sumTrend = 0 do if i < DCPeriod then sumTrend + (getValue(PriceMethod, i, 50)/DCPeriod) else sumTrend;
def iTrendline      = if BarNumber() > 11 then WMA(iTrend, 4) else PriceMethod; 

def iHalfTrend      = fold j = 0 to 51 with sumHalfTrend = 0 do if j < DCHalfPeriod then sumHalfTrend + (getValue(PriceMethod, j, 50)/DCHalfPeriod) else sumHalfTrend;
def iHalfTrendline  = if BarNumber() > 11 then WMA(iHalfTrend, 4) else PriceMethod; 

plot Header         = Double.NaN;
Header.SetDefaultColor(color.LIGHT_GRAY);
Header.HideTitle();

plot HalfTrendLine  = iHalfTrendline;
plot TrendLine      = iTrendline;
#plot SmoothPrice    = WMA(PriceMethod, 4);

HalfTrendLine.SetDefaultColor(color.VIOLET);
HalfTrendLine.SetLineWeight(1);
TrendLine.SetDefaultColor(color.VIOLET);
#TrendLine.SetDefaultColor(createColor(255,153,0));
TrendLine.SetLineWeight(2);
#SmoothPrice.SetDefaultColor(color.YELLOW);
#SmoothPrice.SetLineWeight(1);
#SmoothPrice.SetStyle(curve.SHORT_DASH);