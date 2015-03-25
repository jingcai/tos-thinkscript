# Perfect Hedge's Enhanced Volume Spread Analysis Series
# Part 1: eVSA | Volume Rank Study
#
# Created/Modified Portions Copyright (c) 2010 by Perfect Hedge
# All rights reserved
#
# Last Modified on 10.10.2010
#
# 10.10.2010 - Created Study
# 
#hint
#hint N: Number of lookback periods;
#hint NormalDev: Default - 75th percentile (0.67449)
#hint AboveNormalDev: Default - 90th percentile (1.28155)
#hint LargeDev: Default - 95th percentile (1.64485)
#hint ExtremeDev: Default - 99th percentile (2.32635)

declare on_volume;
declare real_size;

input N              = 21;
input NormalDev      = 0.67449;
input AboveNormalDev = 1.28155;
input LargeDev       = 1.64485;
input ExtremeDev     = 2.32635;

plot Header        = Double.NaN;
Header.SetDefaultColor(color.LIGHT_GRAY);Header.HideTitle();

def ShowRank       = No;
def V              = Volume(Pricetype = "LAST");
def V_LNmu         = Average(log(Max(V, ticksize())),N);
def V_LNsigma      = Stdev(log(Max(V, ticksize())),N) * Sqrt(N/(N-1));
def V_Rank         = fold vi = -4 to 5 with iVRank = 0 do if V > Power(Double.E, V_LNmu + V_LNsigma * ((vi == -4)*(log(ticksize())) + (vi == -3)*(-1*ExtremeDev) + (vi == -2)*(-1*LargeDev) + (vi == -1)*(-1*AboveNormalDev) + (vi ==  0)*(-1*NormalDev) + (vi ==  1)*(NormalDev) + (vi ==  2)*(AboveNormalDev) + (vi ==  3)*(LargeDev) + (vi ==  4)*(ExtremeDev))) then vi else iVRank; 

plot TradeVolume   = if ShowRank then V_Rank else Volume(Pricetype = "LAST");
TradeVolume.SetLineWeight(4);TradeVolume.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
TradeVolume.SetDefaultColor(color.VIOLET);

plot V_LowerNormal = if ShowRank then Double.NaN else Power(Double.E, V_LNmu - V_LNsigma * NormalDev);
plot V_Average     = if ShowRank then Double.NaN else Power(Double.E, V_LNmu);# (V_LNmu + 0.5 * Sqr(V_LNsigma))
plot V_UpperNormal = if ShowRank then Double.NaN else Power(Double.E, V_LNmu + V_LNsigma * NormalDev);
plot V_AboveNormal = if ShowRank then Double.NaN else Power(Double.E, V_LNmu + V_LNsigma * AboveNormalDev);
plot V_Large       = if ShowRank then Double.NaN else Power(Double.E, V_LNmu + V_LNsigma * LargeDev);
plot V_Extreme     = if ShowRank then Double.NaN else Power(Double.E, V_LNmu + V_LNsigma * ExtremeDev);
V_Average.DefineColor("Average",color.ORANGE);
V_Average.SetLineWeight(1);V_Average.AssignValueColor(V_Average.Color("Average"));
V_LowerNormal.SetLineWeight(2);V_LowerNormal.SetDefaultColor(color.BLACK);
V_UpperNormal.SetLineWeight(2);V_UpperNormal.SetDefaultColor(color.BLACK);
V_AboveNormal.SetLineWeight(2);V_AboveNormal.SetDefaultColor(color.BLACK);
V_Large.SetLineWeight(2);V_Large.SetDefaultColor(color.BLACK);
V_Extreme.SetLineWeight(2);V_Extreme.SetDefaultColor(color.BLACK);
V_Average.HideTitle();V_Average.HideBubble();
V_LowerNormal.HideTitle();V_LowerNormal.HideBubble();
V_UpperNormal.HideTitle();V_UpperNormal.HideBubble();
V_AboveNormal.HideTitle();V_AboveNormal.HideBubble();
V_Large.HideTitle();V_Large.HideBubble();
V_Extreme.HideTitle();V_Extreme.HideBubble();
AddCloud(V_LowerNormal,V_UpperNormal,createColor(100,100,100),createColor(100,100,100));
AddCloud(V_UpperNormal,V_AboveNormal,createColor(150,150,150),createColor(150,150,150));
AddCloud(V_AboveNormal,V_Large,createColor(200,200,200),createColor(200,200,200));
AddCloud(V_Large,V_Extreme,createColor(250,250,250),createColor(250,250,250));

plot VLowerNormal = if ShowRank then Double.NaN else Power(Double.E, V_LNmu - V_LNsigma * NormalDev);
plot VAverage     = if ShowRank then Double.NaN else Power(Double.E, V_LNmu);# (V_LNmu + 0.5 * Sqr(V_LNsigma))
plot VUpperNormal = if ShowRank then Double.NaN else Power(Double.E, V_LNmu + V_LNsigma * NormalDev);
plot VAboveNormal = if ShowRank then Double.NaN else Power(Double.E, V_LNmu + V_LNsigma * AboveNormalDev);
plot VLarge       = if ShowRank then Double.NaN else Power(Double.E, V_LNmu + V_LNsigma * LargeDev);
plot VExtreme     = if ShowRank then Double.NaN else Power(Double.E, V_LNmu + V_LNsigma * ExtremeDev);
VAverage.AssignValueColor(V_Average.Color("Average"));
VLowerNormal.SetDefaultColor(color.LIGHT_GRAY);
VUpperNormal.SetDefaultColor(color.LIGHT_GRAY);
VAboveNormal.SetDefaultColor(color.LIGHT_GRAY);
VLarge.SetDefaultColor(color.LIGHT_GRAY);
VExtreme.SetDefaultColor(color.LIGHT_GRAY);
VLowerNormal.HideBubble();
VUpperNormal.HideBubble();
VAboveNormal.HideBubble();
VExtreme.HideBubble();

plot Z            = 0;
Z.SetDefaultColor(color.DARK_GRAY);Z.HideTitle();Z.HideBubble();

