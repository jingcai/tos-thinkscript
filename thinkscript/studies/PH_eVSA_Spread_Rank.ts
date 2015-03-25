# Perfect Hedge's Enhanced Volume Spread Analysis Series
# Part 2: eVSA | Spread Rank Study
#
# Created/Modified Portions Copyright (c) 2010 by Perfect Hedge
# All rights reserved
#
# Last Modified on 10.17.2010
#
# 10.17.2010 - Created Study
# 
#hint
#hint N: Number of lookback periods;
#hint NormalDev: Default - 75th percentile (0.67449)
#hint AboveNormalDev: Default - 90th percentile (1.28155)
#hint LargeDev: Default - 95th percentile (1.64485)
#hint ExtremeDev: Default - 99th percentile (2.32635)

declare lower;
declare real_size;

input ShowRank       = No;
input N              = 21;
input NormalDev      = 0.67449;
input AboveNormalDev = 1.28155;
input LargeDev       = 1.64485;
input ExtremeDev     = 2.32635;

plot Header        = Double.NaN;
Header.SetDefaultColor(color.LIGHT_GRAY);Header.HideTitle();

def R              = High - Low;
def R_LNmu         = Average(log(Max(R, ticksize())),N);
def R_LNsigma      = Stdev(log(Max(R, ticksize())),N) * Sqrt(N/(N-1));
def R_Rank         = fold ri = -4 to 5 with iRRank = 0 do if R > Power(Double.E, R_LNmu + R_LNsigma * ((ri == -4)*(log(ticksize())) + (ri == -3)*(-1*ExtremeDev) + (ri == -2)*(-1*LargeDev) + (ri == -1)*(-1*AboveNormalDev) + (ri ==  0)*(-1*NormalDev) + (ri ==  1)*(NormalDev) + (ri ==  2)*(AboveNormalDev) + (ri ==  3)*(LargeDev) + (ri ==  4)*(ExtremeDev))) then ri else iRRank; 

plot Range         = if ShowRank then R_Rank else R;
Range.SetLineWeight(4);Range.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Range.SetDefaultColor(color.VIOLET);

plot R_Average     = if ShowRank then Double.NaN else Power(Double.E, R_LNmu);# (R_LNmu + 0.0 * Sqr(R_LNsigma))
plot R_LowerNormal = if ShowRank then Double.NaN else Power(Double.E, R_LNmu - R_LNsigma * NormalDev);
plot R_UpperNormal = if ShowRank then Double.NaN else Power(Double.E, R_LNmu + R_LNsigma * NormalDev);
plot R_AboveNormal = if ShowRank then Double.NaN else Power(Double.E, R_LNmu + R_LNsigma * AboveNormalDev);
plot R_Large       = if ShowRank then Double.NaN else Power(Double.E, R_LNmu + R_LNsigma * LargeDev);
plot R_Extreme     = if ShowRank then Double.NaN else Power(Double.E, R_LNmu + R_LNsigma * ExtremeDev);
R_Average.DefineColor("Average",color.ORANGE);
R_Average.SetLineWeight(1);R_Average.AssignValueColor(R_Average.Color("Average"));
R_LowerNormal.SetLineWeight(2);R_LowerNormal.SetDefaultColor(color.BLACK);
R_UpperNormal.SetLineWeight(2);R_UpperNormal.SetDefaultColor(color.BLACK);
R_AboveNormal.SetLineWeight(2);R_AboveNormal.SetDefaultColor(color.BLACK);
R_Large.SetLineWeight(2);R_Large.SetDefaultColor(color.BLACK);
R_Extreme.SetLineWeight(2);R_Extreme.SetDefaultColor(color.BLACK);
R_Average.HideTitle();R_Average.HideBubble();
R_LowerNormal.HideTitle();R_LowerNormal.HideBubble();
R_UpperNormal.HideTitle();R_UpperNormal.HideBubble();
R_AboveNormal.HideTitle();R_AboveNormal.HideBubble();
R_Large.HideTitle();R_Large.HideBubble();
R_Extreme.HideTitle();R_Extreme.HideBubble();
AddCloud(R_LowerNormal,R_UpperNormal,createColor(100,100,100),createColor(100,100,100));
AddCloud(R_UpperNormal,R_AboveNormal,createColor(150,150,150),createColor(150,150,150));
AddCloud(R_AboveNormal,R_Large,createColor(200,200,200),createColor(200,200,200));
AddCloud(R_Large,R_Extreme,createColor(250,250,250),createColor(250,250,250));

plot RLowerNormal = if ShowRank then Double.NaN else Power(Double.E, R_LNmu - R_LNsigma * NormalDev);
plot RAverage     = if ShowRank then Double.NaN else Power(Double.E, R_LNmu);# (R_LNmu + 0.5 * Sqr(R_LNsigma))
plot RUpperNormal = if ShowRank then Double.NaN else Power(Double.E, R_LNmu + R_LNsigma * NormalDev);
plot RAboveNormal = if ShowRank then Double.NaN else Power(Double.E, R_LNmu + R_LNsigma * AboveNormalDev);
plot RLarge       = if ShowRank then Double.NaN else Power(Double.E, R_LNmu + R_LNsigma * LargeDev);
plot RExtreme     = if ShowRank then Double.NaN else Power(Double.E, R_LNmu + R_LNsigma * ExtremeDev);
RAverage.AssignValueColor(R_Average.Color("Average"));
RLowerNormal.SetDefaultColor(color.LIGHT_GRAY);
RUpperNormal.SetDefaultColor(color.LIGHT_GRAY);
RAboveNormal.SetDefaultColor(color.LIGHT_GRAY);
RLarge.SetDefaultColor(color.LIGHT_GRAY);
RExtreme.SetDefaultColor(color.LIGHT_GRAY);
RLowerNormal.HideBubble();
RUpperNormal.HideBubble();
RAboveNormal.HideBubble();
RExtreme.HideBubble();

plot Z            = 0;
Z.SetDefaultColor(color.DARK_GRAY);Z.HideTitle();Z.HideBubble();

