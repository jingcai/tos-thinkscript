# Stephen Romano, 2011
#
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
# Kase Peak Oscillator KCD
# Momentum Tracking and Projection Concept By Cynthia A. Kase
#
# This indicator is a modification of PH_Kev_KasePeakMomentum_V7Rev001
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

#hint:  <b> Kase Peak Momentum Oscillator (PEAK and CD) </b> \n A detailed Momentum Oscillator Created by Cynthia A. Kase </b> \n 

script MLEStdDev {
    input Price = Close;
    input N = 6;
    def Avg = Average(Price, N);
    def Var = (N / (N - 1)) * (Average(Price * Price, N) - Sqr(Avg));
    plot MLEStdDev = Sqrt(Var);
}

declare lower;

input PeakOscPeriod       = 25;  #In Kase's book, default value = 30
# Number of std deviations over the avg peak oscillator value at which the local PeakOut line is set
input KCDStdDevs          = 1.75;#Default is 1.75

def NLower              = 8;   #The lower bound on the range cycle lengths are evaluated
def NUpper              = 65;  #The upper bound on the range of cycle lengths evaluated
def PeakSmoothing       = 0.5; #Originally, 0.333333 in Kev's study
def PeriodSmoothing     = 0.1;
def ShowDrift           = yes;
def DriftSpacing        = 50;
def DriftAvgPeriod      = 10;   

def Indexer             = 1000000;

plot Header = Double.NaN;
Header.SetDefaultColor(color.LIGHT_GRAY);
Header.HideTitle();
Header.HideBubble();

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

# Using first (1997) Definition....
def FindmaxKSDIup    = fold i = NLower to NUpper + 1 with KSDIup = -9999 do if log(High / getValue(Low, i, NUpper)) / 
(Sqrt(i) * 
if i <=   5 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 5)) else
if i <=  10 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 10)) else
if i <=  15 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 15)) else
if i <=  20 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 20)) else
if i <=  25 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 25)) else
if i <=  30 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 30)) else
if i <=  35 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 35)) else
if i <=  40 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 40)) else
if i <=  45 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 45)) else
if i <=  50 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 50)) else
if i <=  55 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 55)) else
if i <=  60 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 60)) else
MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 65))) > (KSDIup - round(KSDIup / Indexer, 0 ) * Indexer) then log(High / getValue(Low, i, NUpper)) / 
(Sqrt(i) *  
if i <=   5 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 5)) else
if i <=  10 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 10)) else
if i <=  15 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 15)) else
if i <=  20 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 20)) else
if i <=  25 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 25)) else
if i <=  30 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 30)) else
if i <=  35 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 35)) else
if i <=  40 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 40)) else
if i <=  45 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 45)) else
if i <=  50 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 50)) else
if i <=  55 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 55)) else
if i <=  60 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 60)) else
MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 65))) + i * Indexer else KSDIup;

def FindmaxKSDIdn    = fold j = NLower to NUpper + 1 with KSDIdn = -9999 do if log(getValue(High, j, NUpper) / Low) / 
(Sqrt(j) * 
if j <=   5 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 5)) else
if j <=  10 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 10)) else
if j <=  15 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 15)) else
if j <=  20 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 20)) else
if j <=  25 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 25)) else
if j <=  30 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 30)) else
if j <=  35 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 35)) else
if j <=  40 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 40)) else
if j <=  45 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 45)) else
if j <=  50 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 50)) else
if j <=  55 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 55)) else
if j <=  60 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 60)) else
MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 65))) > (KSDIdn - round(KSDIdn / Indexer, 0 ) * Indexer) then log(getValue(High, j, NUpper) / Low) / 
(Sqrt(j) 
*  
if j <=   5 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 5)) else
if j <=  10 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 10)) else
if j <=  15 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 15)) else
if j <=  20 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 20)) else
if j <=  25 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 25)) else
if j <=  30 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 30)) else
if j <=  35 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 35)) else
if j <=  40 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 40)) else
if j <=  45 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 45)) else
if j <=  50 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 50)) else
if j <=  55 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 55)) else
if j <=  60 then MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 60)) else
MLEStdDev(LnReturn[1], Max(PeakOscPeriod, 65))) + j * Indexer else KSDIdn;

def maxKSDIup        = FindmaxKSDIup - round(FindmaxKSDIup / Indexer, 0) * Indexer;
def maxKSDIdn        = FindmaxKSDIdn - round(FindmaxKSDIdn / Indexer, 0) * Indexer;  

# Find Averaging Period
# If in UpTrend, will KSDIup will have a higher "Cycle" than KSDIdn. Reverse in DownTrend.
# Average over longer cycle. 
def maxKSDIupPeriod  = round(FindmaxKSDIup / Indexer, 0);
def maxKSDIdnPeriod  = round(FindmaxKSDIdn / Indexer, 0);
def iPeriod          = Max(maxKSDIupPeriod, maxKSDIdnPeriod);
def SmoothPeriod     = Ema2(iPeriod, 99, PeriodSmoothing);
def Period           = Ceil(SmoothPeriod);# Round Up!

# Calculate Kase Peak Oscillator
def PEAK             = Ema2((maxKSDIup - maxKSDIdn), 99, PeakSmoothing);

# Calculate PeakOut Lines
rec Cross            = compoundValue(1, if IsNaN(close) then Cross[1] else if PEAK > 0 and Cross[1] == 0 then 1 else if PEAK < 0 and Cross[1] == 1 then 0 else Cross[1], 0);
def MEAN             = fold m = 0 to 66 with iMEAN = 0 do if m >= Period then iMEAN else iMEAN + getValue(Peak, m, 65) / Period;


plot KCD = PEAK - MEAN;
KCD.SetLineWeight(3);
KCD.SetPaintingStrategy(paintingStrategy.HISTOGRAM);

KCD.DefineColor("Higher Positive", Color.GREEN);
KCD.DefineColor("Lower Positive", Color.DARK_GREEN);
KCD.DefineColor("Higher Negative", Color.RED);
KCD.DefineColor("Lower Negative", Color.DARK_RED);
KCD.AssignValueColor(if KCD > 0 && KCD >= KCD[1] then
    KCD.color("Higher Positive")
  else if KCD > 0 && KCD < KCD[1] then
    KCD.color("Lower Positive")
  else if KCD < 0 && KCD <= KCD[1] then
    KCD.color("Higher Negative")
  else 
    KCD.color("Lower Negative"));

plot KCDPeaks = if KCD > KCDStdDevs * MLEStdDev(KCD, 55) or KCD < - KCDStdDevs * MLEStdDev(KCD, 55) then KCD else Double.NaN;
KCDPeaks.SetDefaultColor(color.WHITE);
KCDPeaks.SetStyle(Curve.POINTS);
KCDPeaks.SetPaintingStrategy(PaintingStrategy.LINE_VS_TRIANGLES);

plot Zeroline = 0.0;
Zeroline.AssignValueColor(color.LIGHT_GRAY);
Zeroline.SetLineWeight(1);
Zeroline.HideTitle();
