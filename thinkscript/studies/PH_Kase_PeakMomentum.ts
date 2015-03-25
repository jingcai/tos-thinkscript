# Perfect Hedge's thinkScript Version of Cynthia Kase's
# Kase Peak Momentum Oscillator
#
# Perfect Hedge's Version is Based on:
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
# Kase Peak Momentum Oscillator (PEAK and CD)
# V1Rev001
# 7-19-2010
# Momentum Tracking and Projection Concept By Cynthia A. Kase
# Originally coded By Kev released on 7-19-2010
# Recoded and Modified By Option Prophet  (A.K.A. RappidFyre)
# V1Rev002
# 7-22-2010
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
#
# Last Modified 07.31.2010
#
# 07.25.2010 - Updated to follow include historical volatility, unbiased standard deviation, and 
#              market adaptation strategy outlined in "The Best Momentum Indicators"
#              in CRB Trader Achive, 1997, Volume 6, No. 3
# 07.26.2010 - Improved the crossing action for positive crosses
#              Added plot of Period for comparison purposes;
#              Correct spelling errors in input and plot names 
# 07.27.2010 - Radically improved the method of finding the period
#              Added coding to determine "KCDPeaks"
# 07.28.2010 - Incorporate Kase's trick: limit ATR Period to 30
# 07.29.2010 - Make minor adjustments to formulae
# 07.31.2010 - Adjust period calculation to be based on maximum
#              Removed std.dev comparison "relative" to a mean, and changed to "absolute" comparison
#                (for both Peak and KCD)
#              Added drift calculation and chart title
#              Added historical 90th percentile estimates - NOT WORKING, DO NOT USE

#hint:  <b> Kase Peak Momentum Oscillator (PEAK and CD) </b> \n A detailed Momentum Oscillator Created by Cynthia A. Kase </b> \n 

script MLEStdDev{input Price = Close;input N = 6;
def Avg = Average(Price, N);
def Var = (N/(N-1)) * (Average(Price*Price, N) - Sqr(Avg));
plot MLEStdDev = Sqrt(Var);}

declare lower;

input NLower              = 8;   #The lower bound on the range cycle lengths are evaluated
input NUpper              = 65;  #The upper bound on the range of cycle lengths evaluated
input PeakOscPeriod       = 25;  #In Kase's book, default value = 30
input PeakStdDevs         = 2;   #Originally, 1.33 in Kev's study
# Number of std deviations over the avg peak oscillator value at which the local PeakOut line is set
input KCDStdDevs          = 1.75;#Default is 1.75
input PeakSmoothing       = 0.5; #Originally, 0.333333 in Kev's study
input PeriodSmoothing     = 0.1;
input LocalPeakoutFactor  = 1.0; #Originally, 0.975 in Kev's study
input GlobalPeakoutFactor = 1.0; #Originally, 0.975 in Kev's study
input ShowDrift           = Yes;
input DriftSpacing        = 50;
input DriftAvgPeriod      = 10;   
input Determine90Pctile   = {default Standard, Historical};
def   Indexer             = 1000000;

plot Header = Double.NaN;Header.SetDefaultColor(color.LIGHT_GRAY);Header.HideTitle();Header.HideBubble();

# The Kase Serial Dependency Index
# Note: This model is based on a Log-Normal Distribution of Prices
#
# According to "The Best Momentum Indicators" (in CRB Trader Achive, 1997, Volume 6, No. 3),
# the index should be
#      KSDI(up)   = ln ( High / Low[N] ) / Volatility ... [Note to Self: >0 in UpTrend, <0 in DownTrend] 
#      KSDI(down) = ln ( High[N] / Low ) / Volatility ... [Note to Self: <0 in Uptrend, >0 in DownTrend] 
#
# But, according to "The Two Faces of Momentum", a 2003 article in Stocks, Futures, & Options Magazine,
# the index should be
#      KSDI(up)   = ln ( High[N-1] / Low ) / Volatility ... [Note to Self: <0 in UpTrend, >0 in DownTrend]
#      KSDI(down) = ln ( Low[N-1] / High ) / Volatility ... [Note to Self: <0 in Uptrend, >0 in DownTrend]
#
# Calculate Historical Volatility, using an unbiased estimator (Maximum Likelihood), 
#       s^2 = (n/(n-1))* sampleVAR(Z)

# Calculate log-returns and estimate drift ("trend")
def LnReturn         = log(Close / Close[1]);
def Drift            = fold b = 0 to DriftAvgPeriod + 1 with iDrift = 0 do iDrift + log(getValue(Close[1], b * DriftSpacing, 1000) / getValue(Close[1], (b+1) * DriftSpacing, 1000)) / DriftAvgPeriod;
AddChartLabel(ShowDrift, concat("Drift = ",Round(Drift, 6)), if Drift > 0 then color.GREEN else color.RED);

# Using first (1997) Definition....
def FindmaxKSDIup    = fold i = NLower to NUpper+1 with KSDIup = -9999 do if log(High / getValue(Low, i, NUpper)) / 
(Sqrt(i) * 
if i <=   5 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 5)) else
if i <=  10 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,10)) else
if i <=  15 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,15)) else
if i <=  20 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,20)) else
if i <=  25 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,25)) else
if i <=  30 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,30)) else
if i <=  35 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,35)) else
if i <=  40 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,40)) else
if i <=  45 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,45)) else
if i <=  50 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,50)) else
if i <=  55 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,55)) else
if i <=  60 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,60)) else
MLEStdDev(LnReturn[1], Max(PeakOscPeriod,65))) > (KSDIup - Round(KSDIup / Indexer, 0 ) * Indexer) then log(High / getValue(Low, i, NUpper)) / 
(Sqrt(i) *  
if i <=   5 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 5)) else
if i <=  10 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,10)) else
if i <=  15 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,15)) else
if i <=  20 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,20)) else
if i <=  25 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,25)) else
if i <=  30 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,30)) else
if i <=  35 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,35)) else
if i <=  40 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,40)) else
if i <=  45 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,45)) else
if i <=  50 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,50)) else
if i <=  55 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,55)) else
if i <=  60 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,60)) else
MLEStdDev(LnReturn[1], Max(PeakOscPeriod,65))) + i * Indexer else KSDIup;
def FindmaxKSDIdn    = fold j = NLower to NUpper+1 with KSDIdn = -9999 do if log(getValue(High, j, NUpper) / Low) / 
(Sqrt(j) * 
if j <=   5 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 5)) else
if j <=  10 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,10)) else
if j <=  15 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,15)) else
if j <=  20 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,20)) else
if j <=  25 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,25)) else
if j <=  30 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,30)) else
if j <=  35 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,35)) else
if j <=  40 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,40)) else
if j <=  45 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,45)) else
if j <=  50 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,50)) else
if j <=  55 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,55)) else
if j <=  60 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,60)) else
MLEStdDev(LnReturn[1], Max(PeakOscPeriod,65))) > (KSDIdn - Round(KSDIdn / Indexer, 0 ) * Indexer) then log(getValue(High, j, NUpper) / Low) / 
(Sqrt(j) 
*  
if j <=   5 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 5)) else
if j <=  10 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,10)) else
if j <=  15 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,15)) else
if j <=  20 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,20)) else
if j <=  25 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,25)) else
if j <=  30 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,30)) else
if j <=  35 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,35)) else
if j <=  40 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,40)) else
if j <=  45 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,45)) else
if j <=  50 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,50)) else
if j <=  55 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,55)) else
if j <=  60 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod,60)) else
MLEStdDev(LnReturn[1], Max(PeakOscPeriod,65))) + j * Indexer else KSDIdn;

def maxKSDIup        = FindmaxKSDIup - Round(FindmaxKSDIup / Indexer, 0) * Indexer;
def maxKSDIdn        = FindmaxKSDIdn - Round(FindmaxKSDIdn / Indexer, 0) * Indexer;  

# Find Averaging Period
# If in UpTrend, will KSDIup will have a higher "Cycle" than KSDIdn. Reverse in DownTrend.
# Average over longer cycle. 
def maxKSDIupPeriod  = Round(FindmaxKSDIup / Indexer, 0);
def maxKSDIdnPeriod  = Round(FindmaxKSDIdn / Indexer, 0);
def iPeriod          = max(maxKSDIupPeriod, maxKSDIdnPeriod);
def SmoothPeriod     = EMA2(iPeriod, 99, PeriodSmoothing);
def Period           = Ceil(SmoothPeriod);# Round Up!

# Calculate Kase Peak Oscillator
def PEAK             = EMA2((maxKSDIup - maxKSDIdn),99, PeakSmoothing);
# Calculate PeakOut Lines
rec Cross            = CompoundValue(1,if isNaN(close) then Cross[1] else if PEAK > 0 and Cross[1] == 0 then 1 else if PEAK < 0 and Cross[1] == 1 then 0 else Cross[1],0);
def MEAN             = fold m = 0 to 66 with iMEAN = 0 do if m >= Period then iMEAN else iMEAN + getValue(Peak, m, 65) / Period;
def STD              = fold n = 0 to 66 with iSTD = 0 do if n >= Period then iSTD else iSTD + Sqr(getValue(PEAK, n, 65) - MEAN) / (
Period - 1);
rec maxPEAK          = CompoundValue(1,Max(PEAK, maxPEAK[1]), -10);
rec minPEAK          = CompoundValue(1,Min(PEAK, minPEAK[1]),  10);
def PEAKRANGE        = maxPEAK - minPEAK;
def HighEnd90        = maxPEAK - 0.10 * PeakRANGE;
def LowEnd90         = minPEAK + 0.10 * PeakRANGE;
rec High90; rec Low90;
switch (Determine90Pctile) {
case Standard:
High90 =  2.08; Low90  = -1.92;
case Historical:
High90 = if Cross then HighEnd90 else High90[1]; Low90  = if Cross then LowEnd90 else Low90[1];}
# Calculate KCD
def KaseConvDiverg   = PEAK - MEAN;

# Plot Kase Peak Oscillator, PeakOut Lines, and KCD
plot KCDPeaks        = if KaseConvDiverg > KCDStdDevs * MLEStdDev(KaseConvDiverg, 55) or KaseConvDiverg < - KCDStdDevs * MLEStdDev(KaseConvDiverg, 55) then KaseConvDiverg else Double.NaN;
KCDPeaks.SetDefaultColor(color.WHITE);
KCDPeaks.SetStyle(Curve.POINTS);KCDPeaks.SetPaintingStrategy(PaintingStrategy.LINE_VS_TRIANGLES);

plot KCD             = KaseConvDiverg;
KCD.SetLineWeight(2);KCD.AssignValueColor(CreateColor(255, 97, 3));

plot GlobalPeakOut   = if Cross then (Max((PeakStdDevs * STD), High90) * GlobalPeakOutFactor) else (Min(- (PeakStdDevs * 
STD), Low90) * 
GlobalPeakOutFactor);
GlobalPeakOut.SetDefaultColor(CreateColor(0, 220, 255));GlobalPeakOut.SetLineWeight(2);

plot LocalPeakOut    = if Cross then (Min((PeakStdDevs * STD), High90) * LocalPeakOutFactor) else (Max(- (PeakStdDevs * 
STD), Low90) * LocalPeakOutFactor);
LocalPeakOut.AssignValueColor(CreateColor(155, 48, 255));LocalPeakOut.SetLineWeight(2);

plot PeakOsc         = PEAK;
PeakOsc.SetPaintingStrategy(paintingStrategy.Histogram);PeakOsc.SetLineWeight(4);
PeakOsc.DefineColor("Higher Positive", (CreateColor(0, 255, 0)));
PeakOsc.DefineColor("Lower Positive", (CreateColor(0, 0, 255)));
PeakOsc.DefineColor("Higher Negative", (CreateColor(155, 0, 0)));
PeakOsc.DefineColor("Lower Negative", (CreateColor(255, 20, 147)));
PeakOsc.AssignValueColor(if PeakOsc > 0 && PeakOsc >= PeakOsc[1] then
    PeakOsc.color("Higher Positive")
  else if PeakOsc > 0 && PeakOsc < PeakOsc[1] then
    PeakOsc.color("Lower Positive")
  else if PeakOsc < 0 && PeakOsc <= PeakOsc[1] then
    PeakOsc.color("Higher Negative")
  else 
    PeakOsc.color("Lower Negative"));

plot Zeroline        = 0;
Zeroline.AssignValueColor(color.LIGHT_GRAY);Zeroline.SetLineWeight(1);Zeroline.HideTitle();
plot UpperTrendline  = 1;
UpperTrendline.AssignValueColor(color.DARK_GRAY);UpperTrendline.SetLineWeight(1);UpperTrendline.HideTitle();
plot LowerTrendline  = -1;
LowerTrendline.AssignValueColor(color.DARK_GRAY);LowerTrendline.SetLineWeight(1);LowerTrendline.HideTitle();

plot AveragingPeriod = Period;
AveragingPeriod.SetDefaultColor(color.WHITE);AveragingPeriod.HideBubble();AveragingPeriod.Hide();

