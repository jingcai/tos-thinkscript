# Stephen Romano, 2011
#
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
# Detrended Instantaneous Trendline
# Detrended Price computed by subtracting the instantaneous trendline from price.
#
# This indicator is an adaptation of PH_RST_InstantaneousTrendLine_1

# Portions Copyright John Ehlers (c) 2001, Perfect Hedge (c) 2010
# All rights reserved
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

declare lower;

script HilbertFilter {
    input Price = close;
    input PriorPeriod = 6.0;
    plot HilbertFilter = (0.0962 * Price + 0.5769 * Price[2] - 0.5769 * Price[4] - 0.0962 * Price[6]) * (0.075 * PriorPeriod + 0.54);
}

script HDC {
    input I1 = close;
    input Q1 = close;
    input PriorPeriod = 6.0;
# Advance the InPhase and Quadrature components by Double.Pi/2 radians
    def jI = HilbertFilter(I1, PriorPeriod);
    def jQ = HilbertFilter(Q1, PriorPeriod);

# Phasor addition for 3 bar averaging
    def I2 = I1 - jQ;
    def Q2 = Q1 + jI;

# Smooth the InPhase and Quadrature components before applying the discriminator
    def SmI2 = Ema2(I2, 5, 0.2);
    def SmQ2 = Ema2(Q2, 5, 0.2);

# Homodyne Discriminator
    def Re   = Ema2(SmI2 * SmI2[1] + SmQ2 * SmQ2[1], 5, 0.2);
    def Im   = Ema2(SmI2 * SmQ2[1] - SmQ2 * SmI2[1], 5, 0.2);

    def PeriodA = if Im <> 0 and Re <> 0 then 2 * Double.Pi / (ATan(Im / Re)) else 0;
# Limit Period to be within the bounds of 6 bar and 50 bar cycles (among other things)
    def PeriodB = Max(Min(Max(Min(PeriodA, 3 * PeriodA[1] / 2), 2 * PeriodA[1] / 3), 50), 6);
    def Period  = Ema2(PeriodB, 5, 0.2);

    def SmoothPeriod = Ema2(Period, 3, 0.3333333333);
    plot HDC = SmoothPeriod;
}

#////////////////////////////////////////////////////////////////////////////////////////////////////

input PriceMethod = hl2;
input UseScalingFactor = Yes;

input ShowAverage = Yes;
input AverageLength = 3;
input BollingerAverageType = {default SMA, EMA};
input BollingerLength = 14;
input BollingerStdDev = .8;

input ShowSignals = Yes;

def Price           = if UseScalingFactor then PriceMethod * 0.01 / if( tickSize() > 0 and tickSize() < 0.01, tickSize(), 0.01) else PriceMethod;
def Smooth          = if barNumber() > 5 then wma(Price, 4) else 0;

#
# Must do multiple iterations to get "prior period" since Thinkscript does not allow 
# references to variables before they are defined in the study, 
# even though they may exist on a prior bar...
#
def jDetrender      = if barNumber() > 5 then HilbertFilter(Smooth, 6) else 0;
def jI1             = if barNumber() > 5 then jDetrender[3] else 0;
def jQ1             = if barNumber() > 5 then HilbertFilter(jDetrender, 6) else 0;
                    # use initial Period = 6 to calculate a pre-"past" period!
def JnitPrePeriod   = if barNumber() > 5 then HDC(jI1, jQ1, 6) else 0;

def iDetrender      = if barNumber() > 5 then HilbertFilter(Smooth, JnitPrePeriod[1]) else 0;
def iI1             = if barNumber() > 5 then iDetrender[3] else 0;
def iQ1             = if barNumber() > 5 then HilbertFilter(iDetrender, JnitPrePeriod[1]) else 0;
                    # use initial Period = 6 to calculate a pre-"past" period!
def InitPrePeriod   = if barNumber() > 5 then HDC(iI1, iQ1, JnitPrePeriod[1]) else 0;

def pDetrender      = if barNumber() > 5 then HilbertFilter(Smooth, InitPrePeriod[1]) else 0;
def pI1             = if barNumber() > 5 then pDetrender[3] else 0;
def pQ1             = if barNumber() > 5 then HilbertFilter(pDetrender, InitPrePeriod[1]) else 0;
def PrePeriod       = if barNumber() > 5 then HDC(pI1, pQ1, InitPrePeriod[1]) else 0;

def Detrender       = if barNumber() > 5 then HilbertFilter(Smooth, PrePeriod[1]) else 0;
def I1              = if barNumber() > 5 then Detrender[3] else 0;
def Q1              = if barNumber() > 5 then HilbertFilter(Detrender, PrePeriod[1]) else 0;
def Period          = if barNumber() > 5 then HDC(I1, Q1, PrePeriod[1]) else 0;

# Compute the Dominant Cycle Phase
def DCPeriod        = Ceil(Period);
def DCHalfPeriod    = Floor(DCPeriod / 2);

# Compute Trendline as simple moving average (SMA) over the measured dominant cycle period
# Do NOT want to use "scaled" prices in these calculations - used only to deteremine dominant cycle period 
def iTrend          = fold i = 0 to 51 with sumTrend = 0 do if i < DCPeriod then sumTrend + (getValue(PriceMethod, i, 50) / DCPeriod) else sumTrend;
def iTrendline      = if barNumber() > 11 then wma(iTrend, 4) else PriceMethod;

plot Header         = Double.NaN;
Header.SetDefaultColor(color.LIGHT_GRAY);
Header.HideTitle();

plot Detrend = PriceMethod - iTrendline;
Detrend.DefineColor("Light_Gray", Color.LIGHT_GRAY);
Detrend.AssignValueColor(Detrend.Color("Light_Gray"));

plot DetrendAverage = if ShowAverage then ExpAverage(Detrend, AverageLength) else Double.NaN;
DetrendAverage.DefineColor("Green", Color.Green);
DetrendAverage.AssignValueColor(DetrendAverage.Color("Green"));
DetrendAverage.SetStyle(Curve.SHORT_DASH);

plot UpperBand;
switch (BollingerAverageType)
{
    case SMA:
        UpperBand = BollingerBandsSMA(Detrend, 0, BollingerLength, -BollingerStdDev, BollingerStdDev).UpperBand;
    case EMA:
        UpperBand = BollingerBandsEMA(Detrend, 0, BollingerLength, -BollingerStdDev, BollingerStdDev).UpperBand;
}
UpperBand.DefineColor("Blue", Color.BLUE);
UpperBand.AssignValueColor(UpperBand.Color("Blue"));
UpperBand.SetStyle(Curve.LONG_DASH);

plot LowerBand;
switch (BollingerAverageType)
{
    case SMA:
        LowerBand = BollingerBandsSMA(Detrend, 0, BollingerLength, -BollingerStdDev, BollingerStdDev).LowerBand;
    case EMA:
        LowerBand = BollingerBandsEMA(Detrend, 0, BollingerLength, -BollingerStdDev, BollingerStdDev).LowerBand;
}
LowerBand.DefineColor("Blue", Color.BLUE);
LowerBand.AssignValueColor(LowerBand.Color("Blue"));
LowerBand.SetStyle(Curve.LONG_DASH);

plot ZeroLine = 0.0;
ZeroLine.AssignValueColor(Color.DARK_RED);

plot LongSignal = if ShowSignals And Crosses(Detrend, UpperBand, CrossingDirection.Above) then Detrend else Double.Nan;
LongSignal.DefineColor("Green", Color.DARK_GREEN);
LongSignal.AssignValueColor(LongSignal.Color("Green"));
LongSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
LongSignal.SetLineWeight(2);

plot ShortSignal = if ShowSignals And Crosses(Detrend, LowerBand, CrossingDirection.Below) then Detrend else Double.Nan;
ShortSignal.DefineColor("Red", Color.RED);
ShortSignal.AssignValueColor(ShortSignal.Color("Red"));
ShortSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
ShortSignal.SetLineWeight(2);

