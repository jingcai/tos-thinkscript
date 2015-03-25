# Perfect Hedge's Enhanced Volume Spread Analysis Series
# Part 3: eVSA | Enhanced Volume Spread Analysis
#
# Created/Modified Portions Copyright (c) 2010 by Perfect Hedge
# All rights reserved
#
# Last Modified on 11.7.2010
#
# 10.17.2010 - Created Study
# 
#hint:
#hint #: This is the number of lookback periods for averaging.
#hint NormalDev: Default - 75th percentile (0.67449)
#hint AboveNormalDev: Default - 90th percentile (1.28155)
#hint LargeDev: Default - 95th percentile (1.64485)
#hint ExtremeDev: Default - 99th percentile (2.32635)

script UBCov{input X1 = close;input X2 = close;input N = 10;
plot UBCov = N/(N-1)*(Average(X1*X2,N) - Average(X1,N)*Average(X2,N));}

declare upper;

input ShowPlotColor      = Yes;
input ShowVsaBanner      = Yes;
input ShortTermPeriod    = 5; 
input MediumTermPeriod   = 21;
input LongTermPeriod     = 89;
input Price              = Close;
input VeryLowCloseLevel  = 0.10;
input DownCloseLevel     = 0.33;
input UpCloseLevel       = 0.67;
input VeryHighCloseLevel = 0.90;
input NormalDev          = 0.67449;
input AboveNormalDev     = 1.28155;
input LargeDev           = 1.64485;
input ExtremeDev         = 2.32635;
input SignalPosition     = 0.35;

plot Header        = Double.NaN;
Header.SetDefaultColor(color.LIGHT_GRAY);
Header.HideTitle();

# Set Signal Plot Locations
#def BarHeight      = AvgTrueRange(High, Close, Low, 10);
def BarHeight      = Power(Double.E, Average(log(Max(High - Low, tickSize())), 5));
def SignalLoc1     = BarHeight * SignalPosition;

# Calculate Volume and Range Distribution Data
# Note to Self: Can look at longer period spreads to determine whether longer term move is "in line" with average move (for example, for stopping volume, signal needs to appear at end of long downtrend, which can be determined by looking at longer term range)
def R              = Max(High - Low, tickSize());                # Prohibit Range  = 0; ticksize ~ zero
def V              = Max(Volume(PriceType = "LAST"), tickSize());# Prohibit Volume = 0; ticksize ~ zero

def V_LNmu         = Average(log(V), MediumTermPeriod);
def V_LNsigma      = stdev(log(V), MediumTermPeriod) * Sqrt(MediumTermPeriod / (MediumTermPeriod - 1));
def R_LNmu         = Average(log(R), MediumTermPeriod);
def R_LNsigma      = stdev(log(R), MediumTermPeriod) * Sqrt(MediumTermPeriod / (MediumTermPeriod - 1));

# Classify Volumes
def V_Rank         = fold vi = -4 to 5 with iVRank = 0 do if V > Power(Double.E, V_LNmu + V_LNsigma * ((vi == -4) * ((-V_LNmu + log(tickSize()/2) / V_LNsigma)) + (vi == -3) * (-1 * ExtremeDev) + (vi == -2) * (-1 * LargeDev) + (vi == -1) * (-1 * AboveNormalDev) + (vi ==  0) * (-1 * NormalDev) + (vi ==  1) * (NormalDev) + (vi ==  2) * (AboveNormalDev) + (vi ==  3) * (LargeDev) + (vi ==  4) * (ExtremeDev))) then vi else iVRank; 

# Classify Spreads
def R_Rank         = fold ri = -4 to 5 with iRRank = 0 do if R > Power(Double.E, R_LNmu + R_LNsigma * ((ri == -4) * ((-R_LNmu + log(tickSize()/2) / R_LNsigma)) + (ri == -3) * (-1 * ExtremeDev) + (ri == -2) * (-1 * LargeDev) + (ri == -1) * (-1 * AboveNormalDev) + (ri ==  0) * (-1 * NormalDev) + (ri ==  1) * (NormalDev) + (ri ==  2) * (AboveNormalDev) + (ri ==  3) * (LargeDev) + (ri ==  4) * (ExtremeDev))) then ri else iRRank; 

# Classify Bars
def UPbar          = Close > Close[1];
def DNbar          = Close < Close[1];
def UPclose        = ((Close - Low) / R) > UpCloseLevel;
def DNclose        = ((Close - Low) / R) < DownCloseLevel;
def MIDclose       = !UPclose and !DNclose;
def VHclose        = UPclose and ((Close - Low) / R) >= VeryHighCloseLevel and R > tickSize();
def VLclose        = DNclose and ((Close - Low) / R) <= VeryLowCloseLevel and R > tickSize();
def C_Rank         = if VHclose then 2 else if UPclose then 1 else if VLclose then -2 else if DNclose then -1 else 0;

# Classify Trends
# Linear Regression Solves for Y = b0 + b1 * g(X1)
# Slope = b1 = UBCov(g(X1),Y,N)/UBCov(g(X1),g(X1),N)
def t              = BarNumber();
def ST_Trend       = UBCov(t,Price,ShortTermPeriod)  / UBCov(t,t,ShortTermPeriod);
def MT_Trend       = UBCov(t,Price,MediumTermPeriod) / UBCov(t,t,MediumTermPeriod);
def LT_Trend       = UBCov(t,Price,LongTermPeriod)   / UBCov(t,t,LongTermPeriod);

# Setup VSA Header ...
# ... Bar
Addchartlabel(ShowVsaBanner, concat("B | ",if UPbar then "[ + ]" else if DNbar then "[ - ]" else "[ = ]"), color.LIGHT_GRAY);
# ... Close
AddChartLabel(ShowVsaBanner, concat("C | ", if C_Rank == -2 then "Low" else if C_Rank == -1 then "Down" else if C_Rank == 0 then "Mid" else if C_Rank == 1 then "Up" else if C_Rank == 2 then "High" else "N/A"), color.LIGHT_GRAY);
# ... Volume
AddChartLabel(ShowVsaBanner, concat("V | ", if V_Rank == -4 then "ULow" else if V_Rank == -3 then "VLow" else if V_Rank == -2 then "Low" else if V_Rank == -1 then "< Avg" else if V_Rank ==  0 then "Avg" else if V_Rank ==  1 then "> Avg" else if V_Rank ==  2 then "High" else if V_Rank ==  3 then "VHigh" else if V_Rank ==  4 then "UHigh" else "N/A"), color.LIGHT_GRAY);
# ... Spread
AddChartLabel(ShowVsaBanner, concat("S | ", if R_Rank == -4 then "UNarrow" else if R_Rank == -3 then "VNarrow" else if R_Rank == -2 then "Narrow" else if R_Rank == -1 then "< Avg" else if R_Rank ==  0 then "Avg" else if R_Rank ==  1 then "> Avg" else if R_Rank ==  2 then "Wide" else if R_Rank ==  3 then "VWide" else if R_Rank ==  4 then "UWide" else "N/A"), color.LIGHT_GRAY);
# ... Trend
AddChartLabel(ShowVsaBanner, "Trends", color.LIGHT_GRAY); 
AddChartLabel(ShowVsaBanner, concat("ST | ", Round(ST_Trend,4) ), color.LIGHT_GRAY);
AddChartLabel(ShowVsaBanner, concat("MT | ", Round(MT_Trend,4) ), color.LIGHT_GRAY);
AddChartLabel(ShowVsaBanner, concat("LT | ", Round(LT_Trend,4) ), color.LIGHT_GRAY);

# eVSA Clear Indicators of Weakness
def isBuyingClimax          = UPbar and (C_Rank < 0) and V_Rank > 2 and R_Rank > 2 and ST_Trend > 0 and MT_Trend > 0 and High > High[1]; 
def isUpThrust              = (C_Rank < 0) and V_Rank > 0 and R_Rank > 0 and ST_Trend > 0 and MT_Trend > 0 and High > High[1]; 
def isFalseUpThrust         = (UPbar[1] and V_Rank[1] > 0) and DNbar and C_Rank < 0 and R_Rank < 1 and ST_Trend > 0 and High > High[1] and !isUpThrust[1];
#def isFalseUpThrust         = (UPbar and V_Rank < 0 and R_Rank > 0) and ST_Trend > 0 and High > High[1];
def isWeaknessConfirmed     = DNbar or DNclose or (UPbar and V_Rank < 0 and High < High[1]);
 
# eVSA Indicators of Weakness
def isSupply                = DNbar and (C_Rank < 0) and V_Rank > 0 and ST_Trend > 0;
def isSupplySwampingDemand  = UPbar and (Close <= HL2)  and V_Rank > 0 and ST_Trend > 0 and MT_Trend > 0 and !isBuyingClimax and !isUpThrust;# Opposite of stopping volume
def isEffortToMoveDown      = DNbar and (C_Rank < 0) and (V_Rank between 0 and 2) and R_Rank > 0;
def isConfirmedEffortDN     = !(C_Rank > 0 and V_Rank > -1);
def isSeriousSwamping       = C_Rank < 0 and R_Rank > 0;

# eVSA Uncertain Indicators of Weakness
def isNoDemand              = UPbar and (Close <= HL2) and V_Rank < 0 and R_Rank < 0;
def isSupplyEntering        = UPbar and V_Rank > 0 and R_Rank < 0 and !isSupplySwampingDemand;
def isNoProParticipationUP  = UPbar and V_Rank < 0 and R_Rank > 0;

# eVSA Clear Indicators of Strength
def isSellingClimax         = DNbar and (C_Rank > 0) and V_Rank > 2 and R_Rank > 2 and ST_Trend < 0 and MT_Trend < 0 and Low < Low[1]; 
def isReverseUpThrust       = (C_Rank > 0) and V_Rank > 0 and R_Rank > 0 and ST_Trend < 0 and MT_Trend < 0 and Low < Low[1]; 
def isTestingforSupply      = (C_Rank > 0) and V_Rank < 0 and ST_Trend < 0 and Low < Low[1];
def isStrengthConfirmed     = UPbar or UPclose or (DNbar and V_Rank < 0 and Low > Low[1]);

# eVSA Indicators of Strength
def isDemand                = UPbar and (C_Rank > 0) and V_Rank > 0 and ST_Trend < 0;
def isStoppingVolume        = DNbar and (Close >= HL2) and V_Rank > 0 and ST_Trend < 0 and MT_Trend < 0 and !isSellingClimax and !isReverseUpThrust;# Opposite of SupplySwampingDemand
def isEffortToMoveUp        = UPbar and (C_Rank > 0) and (V_Rank between 0 and 2) and R_Rank > 0;
def isConfirmedEffortUP     = !(C_Rank < 0 and V_Rank > -1);
def isSeriousStopping       = C_Rank > 0 and R_Rank > 0;

# eVSA Uncertain Indicators of Strength
def isNoSupply              = DNbar and (Close >= HL2) and V_Rank < 0 and R_Rank < 0;
def isDemandEntering        = DNbar and V_Rank > 0 and R_Rank < 0 and !isStoppingVolume;
def isNoProParticipationDN  = DNbar and V_Rank < 0 and R_Rank > 0 and !isTestingforSupply;

# ClearStrength/Weakness
# Strength/Weakness
# UncertainStrength/Weakness or Lack of Weakness/Strength
#
# Output Results for
# ... Weakness
plot Clear_Weakness_Confirmed      = if isBuyingClimax or ((isUpThrust or isFalseUpThrust) and !isWeaknessConfirmed[-1]) then High + SignalLoc1 else Double.NaN;
Clear_Weakness_Confirmed.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
Clear_Weakness_Confirmed.SetStyle(Curve.POINTS);Clear_Weakness_Confirmed.SetLineWeight(2);
Clear_Weakness_Confirmed.DefineColor("Buying Climax", color.RED);
Clear_Weakness_Confirmed.DefineColor("UpThrust Not Confirmed", color.BLACK);
Clear_Weakness_Confirmed.AssignValueColor(if isBuyingClimax then Clear_Weakness_Confirmed.Color("Buying Climax") else Clear_Weakness_Confirmed.Color("UpThrust Not Confirmed") );
Clear_Weakness_Confirmed.HideBubble();
plot Clear_Weakness                = if isBuyingClimax or isUpThrust or isFalseUpThrust then High + SignalLoc1 else Double.NaN;
Clear_Weakness.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
Clear_Weakness.SetStyle(Curve.POINTS);Clear_Weakness.SetLineWeight(4);
Clear_Weakness.DefineColor("Buying Climax", color.GREEN);
Clear_Weakness.DefineColor("UpThrust", color.RED);
Clear_Weakness.DefineColor("False UpThrust", color.DARK_ORANGE);
Clear_Weakness.AssignValueColor(if isBuyingClimax then Clear_Weakness.Color("Buying Climax") else if isUpThrust then Clear_Weakness.Color("UpThrust") else Clear_Weakness.Color("False UpThrust") );
Clear_Weakness.HideBubble();

plot Weakness                      = if isSupply or isSupplySwampingDemand then High + SignalLoc1 else Double.NaN;
Weakness.SetPaintingStrategy(PaintingStrategy.LINE_VS_TRIANGLES);
Weakness.SetStyle(Curve.POINTS);Weakness.SetLineWeight(3);
Weakness.SetDefaultColor(color.RED);
Weakness.DefineColor("Supply", color.RED);
Weakness.DefineColor("Serious Supply Swamping Demand", color.YELLOW);
Weakness.DefineColor("Supply Swamping Demand", color.LIGHT_ORANGE);
Weakness.DefineColor("Successful Effort Down", color.RED);
Weakness.DefineColor("Failed Effort Down", color.DARK_RED);
Weakness.AssignValueColor(if isSupplySwampingDemand and isSeriousSwamping then Weakness.Color("Serious Supply Swamping Demand") else if isSupplySwampingDemand then Weakness.Color("Supply Swamping Demand") else Weakness.Color("Supply") );
Weakness.HideBubble();

plot Uncertain_Weakness_Confirmed  = if isNoDemand or isNoProParticipationUP then High + SignalLoc1 else Double.NaN;
Uncertain_Weakness_Confirmed.SetStyle(Curve.POINTS);Uncertain_Weakness_Confirmed.SetLineWeight(2);
Uncertain_Weakness_Confirmed.DefineColor("No Demand Confirmed",color.BLACK);
Uncertain_Weakness_Confirmed.DefineColor("No Pro Participation Confirmed",color.BLACK);
Uncertain_Weakness_Confirmed.AssignValueColor(if isNoDemand then Uncertain_Weakness_Confirmed.Color("No Demand Confirmed") else Uncertain_Weakness_Confirmed.Color("No Pro Participation Confirmed"));
Uncertain_Weakness_Confirmed.HideBubble();
plot Uncertain_Weakness            = if isNoDemand or isSupplyEntering or isNoProParticipationUP then High + SignalLoc1 else Double.NaN;
Uncertain_Weakness.SetStyle(Curve.POINTS);Uncertain_Weakness.SetLineWeight(4);
Uncertain_Weakness.DefineColor("No Demand",color.GREEN);
Uncertain_Weakness.DefineColor("Supply Entering",color.RED);
Uncertain_Weakness.DefineColor("No Pro Participation",color.WHITE);
Uncertain_Weakness.AssignValueColor(if isNoDemand then Uncertain_Weakness.Color("No Demand") else if isSupplyEntering then Uncertain_Weakness.Color("Supply Entering") else Uncertain_Weakness.Color("No Pro Participation"));
Uncertain_Weakness.HideBubble();

# ... Strength
plot Clear_Strength_Confirmed      = if isSellingClimax or ((isReverseUpThrust or isTestingforSupply) and !isStrengthConfirmed[-1]) then Low - SignalLoc1 else Double.NaN;
Clear_Strength_Confirmed.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
Clear_Strength_Confirmed.SetStyle(Curve.POINTS);Clear_Strength_Confirmed.SetLineWeight(2);
Clear_Strength_Confirmed.DefineColor("Selling Climax", color.GREEN);
Clear_Strength_Confirmed.DefineColor("Reverse UpThrust Not Confirmed", color.BLACK);
Clear_Strength_Confirmed.DefineColor("Testing for Supply Not Confirmed", color.BLACK);
Clear_Strength_Confirmed.AssignValueColor(if isSellingClimax then Clear_Strength_Confirmed.Color("Selling Climax") else if (isReverseUpThrust and !isStrengthConfirmed[-1]) then Clear_Strength_Confirmed.Color("Reverse UpThrust Not Confirmed") else Clear_Strength_Confirmed.Color("Testing for Supply Not Confirmed") );
Clear_Strength_Confirmed.HideBubble();
plot Clear_Strength                = if isSellingClimax or isReverseUpThrust or isTestingforSupply then Low - SignalLoc1 else Double.NaN;
Clear_Strength.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
Clear_Strength.SetStyle(Curve.POINTS);Clear_Strength.SetLineWeight(4);
Clear_Strength.DefineColor("Selling Climax", color.RED);
Clear_Strength.DefineColor("Reverse UpThrust", color.GREEN);
Clear_Strength.DefineColor("Testing for Supply", color.WHITE);
Clear_Strength.AssignValueColor(if isSellingClimax then Clear_Strength.Color("Selling Climax") else if isReverseUpThrust then Clear_Strength.Color("Reverse UpThrust") else Clear_Strength.Color("Testing for Supply") );
Clear_Strength.HideBubble();

plot Strength                      = if isDemand or isStoppingVolume then Low - SignalLoc1 else Double.NaN;
Strength.SetPaintingStrategy(PaintingStrategy.LINE_VS_TRIANGLES);
Strength.SetStyle(Curve.POINTS);Strength.SetLineWeight(3);
Strength.SetDefaultColor(color.GREEN);
Strength.DefineColor("Demand", color.GREEN);
Strength.DefineColor("Serious Stopping Volume", color.CYAN);
Strength.DefineColor("Stopping Volume", color.BLUE);
Strength.DefineColor("Successful Effort Up", color.GREEN);
Strength.DefineColor("Failed Effort Up", color.DARK_GREEN);
Strength.AssignValueColor(if isStoppingVolume and isSeriousStopping then Strength.Color("Serious Stopping Volume") else if isStoppingVolume then Strength.Color("Stopping Volume") else Strength.Color("Demand") );
Strength.HideBubble();

plot Uncertain_Strength_Confirmed  = if isNoSupply or isNoProParticipationDN then Low - SignalLoc1 else Double.NaN;
Uncertain_Strength_Confirmed.SetStyle(Curve.POINTS);Uncertain_Strength_Confirmed.SetLineWeight(2);
Uncertain_Strength_Confirmed.DefineColor("No Supply Confirmed",color.BLACK);
Uncertain_Strength_Confirmed.DefineColor("No Pro Participation Confirmed",color.BLACK);
Uncertain_Strength_Confirmed.AssignValueColor(if isNoSupply then Uncertain_Strength_Confirmed.Color("No Supply Confirmed") else Uncertain_Strength_Confirmed.Color("No Pro Participation Confirmed"));
Uncertain_Strength_Confirmed.HideBubble();
plot Uncertain_Strength            = if isNoSupply or isDemandEntering or isNoProParticipationDN then Low - SignalLoc1 else Double.NaN;
Uncertain_Strength.SetStyle(Curve.POINTS);Uncertain_Strength.SetLineWeight(4);
Uncertain_Strength.DefineColor("No Supply",color.RED);
Uncertain_Strength.DefineColor("Demand Entering",color.GREEN);
Uncertain_Strength.DefineColor("No Pro Participation",color.WHITE);
Uncertain_Strength.AssignValueColor(if isNoSupply then Uncertain_Strength.Color("No Supply") else if isDemandEntering then Uncertain_Strength.Color("Demand Entering") else Uncertain_Strength.Color("No Pro Participation"));
Uncertain_Strength.HideBubble();

AssignPriceColor(if ShowPlotColor and (isEffortToMoveDown and isConfirmedEffortDN[-1]) then Weakness.Color("Successful Effort Down") else if ShowPlotColor and (isEffortToMoveDown and !isConfirmedEffortDN[-1]) then Weakness.Color("Failed Effort Down") else if ShowPlotColor and (isEffortToMoveUp and isConfirmedEffortUP[-1]) then Strength.Color("Successful Effort Up") else if ShowPlotColor and (isEffortToMoveUp and !isConfirmedEffortUP[-1]) then Strength.Color("Failed Effort Up") else color.CURRENT); 

