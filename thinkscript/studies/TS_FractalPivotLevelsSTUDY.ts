# TS_FractalPivotLevels
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 04 Dec 2010

#hint: Identifies fractal pivot levels for identifying confluences.
#hint RequiredSwingPointsForFractalReversal: Minimum price swing in points or percent to be counted as a reversal.
#hint ReversalMode: Determine reversals using price in points or price in percentage. <b>Percentage mode must be used on currencies and penny stocks.</b>
#hint includeWicks: Fractal pivots will be extended to extreme ends of candle wicks.

input RequiredPointsForFractalReversal = 2.0;
input includeWicks = NO;

input ReversalMode = {default price, percent}; 

def ZZData;
def ZZSign;

switch (ReversalMode){
case price:
    ZZData = ZigZagSign( "reversal amount" = RequiredPointsForFractalReversal);
    ZZSign = ZigZagTrendSign("reversal amount" = RequiredPointsForFractalReversal);
case percent:
    ZZData = ZigZagPercent("reversal amount" = RequiredPointsForFractalReversal);
    ZZSign = ZigZagTrendPercent("reversal amount" = RequiredPointsForFractalReversal);
}

defineGlobalColor("FractalHigh", CreateColor(0,100,100));
defineGlobalColor("FractalLow",  CreateColor(100,100,0));


plot fractalPoint = if !includeWicks then ZZData else if !isNan(ZZdata) then if ZZSign == 1 then max(high, high[1])  else min(low,low[1]) else double.nan;

fractalPoint.SetStyle(curve.POINTS);
fractalPoint.SetDefaultColor(color.white);
fractalPoint.SetLineWeight(1);

rec fractalPointHighCounter = compoundValue(1, if isNan(ZZData) then fractalPointHighCounter[1] else if ZZSign == 1 then fractalPointHighCounter[1]+1 else fractalPointHighCounter[1],0);
rec fractalPointLowCounter = compoundValue(1, if isNan(ZZData) then fractalPointLowCounter[1] else if ZZSign == -1 then fractalPointLowCounter[1]+1 else fractalPointLowCounter[1],0);

rec fph1 = compoundValue(1,if isNAN(ZZData) then fph1[1] else if fractalPointHighCounter==1 and fractalPointHighCounter[1]==0 then fractalPoint else fph1[1], double.nan);
rec fph2 = compoundValue(1,if isNAN(ZZData) then fph2[1] else if fractalPointHighCounter==2 and fractalPointHighCounter[1]==1 then fractalPoint else fph2[1], double.nan);
rec fph3 = compoundValue(1,if isNAN(ZZData) then fph3[1] else if fractalPointHighCounter==3 and fractalPointHighCounter[1]==2 then fractalPoint else fph3[1], double.nan);
rec fph4 = compoundValue(1,if isNAN(ZZData) then fph4[1] else if fractalPointHighCounter==4 and fractalPointHighCounter[1]==3 then fractalPoint else fph4[1], double.nan);
rec fph5 = compoundValue(1,if isNAN(ZZData) then fph5[1] else if fractalPointHighCounter==5 and fractalPointHighCounter[1]==4 then fractalPoint else fph5[1], double.nan);
rec fph6 = compoundValue(1,if isNAN(ZZData) then fph6[1] else if fractalPointHighCounter==6 and fractalPointHighCounter[1]==5 then fractalPoint else fph6[1], double.nan);
rec fph7 = compoundValue(1,if isNAN(ZZData) then fph7[1] else if fractalPointHighCounter==7 and fractalPointHighCounter[1]==6 then fractalPoint else fph7[1], double.nan);
rec fph8 = compoundValue(1,if isNAN(ZZData) then fph8[1] else if fractalPointHighCounter==8 and fractalPointHighCounter[1]==7 then fractalPoint else fph8[1], double.nan);
rec fph9 = compoundValue(1,if isNAN(ZZData) then fph9[1] else if fractalPointHighCounter==9 and fractalPointHighCounter[1]==8 then fractalPoint else fph9[1], double.nan);
rec fph10 = compoundValue(1,if isNAN(ZZData) then fph10[1] else if fractalPointHighCounter==10 and fractalPointHighCounter[1]==9 then fractalPoint else fph10[1], double.nan);
rec fph11 = compoundValue(1,if isNAN(ZZData) then fph11[1] else if fractalPointHighCounter==11 and fractalPointHighCounter[1]==10 then fractalPoint else fph11[1], double.nan);
rec fph12 = compoundValue(1,if isNAN(ZZData) then fph12[1] else if fractalPointHighCounter==12 and fractalPointHighCounter[1]==11 then fractalPoint else fph12[1], double.nan);
rec fph13 = compoundValue(1,if isNAN(ZZData) then fph13[1] else if fractalPointHighCounter==13 and fractalPointHighCounter[1]==12 then fractalPoint else fph13[1], double.nan);
rec fph14 = compoundValue(1,if isNAN(ZZData) then fph14[1] else if fractalPointHighCounter==14 and fractalPointHighCounter[1]==13 then fractalPoint else fph14[1], double.nan);
rec fph15 = compoundValue(1,if isNAN(ZZData) then fph15[1] else if fractalPointHighCounter==15 and fractalPointHighCounter[1]==14 then fractalPoint else fph15[1], double.nan);
rec fph16 = compoundValue(1,if isNAN(ZZData) then fph16[1] else if fractalPointHighCounter==16 and fractalPointHighCounter[1]==15 then fractalPoint else fph16[1], double.nan);
rec fph17 = compoundValue(1,if isNAN(ZZData) then fph17[1] else if fractalPointHighCounter==17 and fractalPointHighCounter[1]==16 then fractalPoint else fph17[1], double.nan);
rec fph18 = compoundValue(1,if isNAN(ZZData) then fph18[1] else if fractalPointHighCounter==18 and fractalPointHighCounter[1]==17 then fractalPoint else fph18[1], double.nan);
rec fph19 = compoundValue(1,if isNAN(ZZData) then fph19[1] else if fractalPointHighCounter==19 and fractalPointHighCounter[1]==18 then fractalPoint else fph19[1], double.nan);
rec fph20 = compoundValue(1,if isNAN(ZZData) then fph20[1] else if fractalPointHighCounter==20 and fractalPointHighCounter[1]==19 then fractalPoint else fph20[1], double.nan);
rec fph21 = compoundValue(1,if isNAN(ZZData) then fph21[1] else if fractalPointHighCounter==21 and fractalPointHighCounter[1]==20 then fractalPoint else fph21[1], double.nan);
rec fph22 = compoundValue(1,if isNAN(ZZData) then fph22[1] else if fractalPointHighCounter==22 and fractalPointHighCounter[1]==21 then fractalPoint else fph22[1], double.nan);
rec fph23 = compoundValue(1,if isNAN(ZZData) then fph23[1] else if fractalPointHighCounter==23 and fractalPointHighCounter[1]==22 then fractalPoint else fph23[1], double.nan);
rec fph24 = compoundValue(1,if isNAN(ZZData) then fph24[1] else if fractalPointHighCounter==24 and fractalPointHighCounter[1]==23 then fractalPoint else fph24[1], double.nan);
rec fph25 = compoundValue(1,if isNAN(ZZData) then fph25[1] else if fractalPointHighCounter==25 and fractalPointHighCounter[1]==24 then fractalPoint else fph25[1], double.nan);
rec fph26 = compoundValue(1,if isNAN(ZZData) then fph26[1] else if fractalPointHighCounter==26 and fractalPointHighCounter[1]==25 then fractalPoint else fph26[1], double.nan);
rec fph27 = compoundValue(1,if isNAN(ZZData) then fph27[1] else if fractalPointHighCounter==27 and fractalPointHighCounter[1]==26 then fractalPoint else fph27[1], double.nan);
rec fph28 = compoundValue(1,if isNAN(ZZData) then fph28[1] else if fractalPointHighCounter==28 and fractalPointHighCounter[1]==27 then fractalPoint else fph28[1], double.nan);
rec fph29 = compoundValue(1,if isNAN(ZZData) then fph29[1] else if fractalPointHighCounter==29 and fractalPointHighCounter[1]==28 then fractalPoint else fph29[1], double.nan);
rec fph30 = compoundValue(1,if isNAN(ZZData) then fph30[1] else if fractalPointHighCounter==30 and fractalPointHighCounter[1]==29 then fractalPoint else fph30[1], double.nan);

rec fpl1 = compoundValue(1,if isNAN(ZZData) then fpl1[1] else if fractalPointLowCounter==1 and fractalPointLowCounter[1]==0 then fractalPoint else fpl1[1], double.nan);
rec fpl2 = compoundValue(1,if isNAN(ZZData) then fpl2[1] else if fractalPointLowCounter==2 and fractalPointLowCounter[1]==1 then fractalPoint else fpl2[1], double.nan);
rec fpl3 = compoundValue(1,if isNAN(ZZData) then fpl3[1] else if fractalPointLowCounter==3 and fractalPointLowCounter[1]==2 then fractalPoint else fpl3[1], double.nan);
rec fpl4 = compoundValue(1,if isNAN(ZZData) then fpl4[1] else if fractalPointLowCounter==4 and fractalPointLowCounter[1]==3 then fractalPoint else fpl4[1], double.nan);
rec fpl5 = compoundValue(1,if isNAN(ZZData) then fpl5[1] else if fractalPointLowCounter==5 and fractalPointLowCounter[1]==4 then fractalPoint else fpl5[1], double.nan);
rec fpl6 = compoundValue(1,if isNAN(ZZData) then fpl6[1] else if fractalPointLowCounter==6 and fractalPointLowCounter[1]==5 then fractalPoint else fpl6[1], double.nan);
rec fpl7 = compoundValue(1,if isNAN(ZZData) then fpl7[1] else if fractalPointLowCounter==7 and fractalPointLowCounter[1]==6 then fractalPoint else fpl7[1], double.nan);
rec fpl8 = compoundValue(1,if isNAN(ZZData) then fpl8[1] else if fractalPointLowCounter==8 and fractalPointLowCounter[1]==7 then fractalPoint else fpl8[1], double.nan);
rec fpl9 = compoundValue(1,if isNAN(ZZData) then fpl9[1] else if fractalPointLowCounter==9 and fractalPointLowCounter[1]==8 then fractalPoint else fpl9[1], double.nan);
rec fpl10 = compoundValue(1,if isNAN(ZZData) then fpl10[1] else if fractalPointLowCounter==10 and fractalPointLowCounter[1]==9 then fractalPoint else fpl10[1], double.nan);
rec fpl11 = compoundValue(1,if isNAN(ZZData) then fpl11[1] else if fractalPointLowCounter==11 and fractalPointLowCounter[1]==10 then fractalPoint else fpl11[1], double.nan);
rec fpl12 = compoundValue(1,if isNAN(ZZData) then fpl12[1] else if fractalPointLowCounter==12 and fractalPointLowCounter[1]==11 then fractalPoint else fpl12[1], double.nan);
rec fpl13 = compoundValue(1,if isNAN(ZZData) then fpl13[1] else if fractalPointLowCounter==13 and fractalPointLowCounter[1]==12 then fractalPoint else fpl13[1], double.nan);
rec fpl14 = compoundValue(1,if isNAN(ZZData) then fpl14[1] else if fractalPointLowCounter==14 and fractalPointLowCounter[1]==13 then fractalPoint else fpl14[1], double.nan);
rec fpl15 = compoundValue(1,if isNAN(ZZData) then fpl15[1] else if fractalPointLowCounter==15 and fractalPointLowCounter[1]==14 then fractalPoint else fpl15[1], double.nan);
rec fpl16 = compoundValue(1,if isNAN(ZZData) then fpl16[1] else if fractalPointLowCounter==16 and fractalPointLowCounter[1]==15 then fractalPoint else fpl16[1], double.nan);
rec fpl17 = compoundValue(1,if isNAN(ZZData) then fpl17[1] else if fractalPointLowCounter==17 and fractalPointLowCounter[1]==16 then fractalPoint else fpl17[1], double.nan);
rec fpl18 = compoundValue(1,if isNAN(ZZData) then fpl18[1] else if fractalPointLowCounter==18 and fractalPointLowCounter[1]==17 then fractalPoint else fpl18[1], double.nan);
rec fpl19 = compoundValue(1,if isNAN(ZZData) then fpl19[1] else if fractalPointLowCounter==19 and fractalPointLowCounter[1]==18 then fractalPoint else fpl19[1], double.nan);
rec fpl20 = compoundValue(1,if isNAN(ZZData) then fpl20[1] else if fractalPointLowCounter==20 and fractalPointLowCounter[1]==19 then fractalPoint else fpl20[1], double.nan);
rec fpl21 = compoundValue(1,if isNAN(ZZData) then fpl21[1] else if fractalPointLowCounter==21 and fractalPointLowCounter[1]==20 then fractalPoint else fpl21[1], double.nan);
rec fpl22 = compoundValue(1,if isNAN(ZZData) then fpl22[1] else if fractalPointLowCounter==22 and fractalPointLowCounter[1]==21 then fractalPoint else fpl22[1], double.nan);
rec fpl23 = compoundValue(1,if isNAN(ZZData) then fpl23[1] else if fractalPointLowCounter==23 and fractalPointLowCounter[1]==22 then fractalPoint else fpl23[1], double.nan);
rec fpl24 = compoundValue(1,if isNAN(ZZData) then fpl24[1] else if fractalPointLowCounter==24 and fractalPointLowCounter[1]==23 then fractalPoint else fpl24[1], double.nan);
rec fpl25 = compoundValue(1,if isNAN(ZZData) then fpl25[1] else if fractalPointLowCounter==25 and fractalPointLowCounter[1]==24 then fractalPoint else fpl25[1], double.nan);
rec fpl26 = compoundValue(1,if isNAN(ZZData) then fpl26[1] else if fractalPointLowCounter==26 and fractalPointLowCounter[1]==25 then fractalPoint else fpl26[1], double.nan);
rec fpl27 = compoundValue(1,if isNAN(ZZData) then fpl27[1] else if fractalPointLowCounter==27 and fractalPointLowCounter[1]==26 then fractalPoint else fpl27[1], double.nan);
rec fpl28 = compoundValue(1,if isNAN(ZZData) then fpl28[1] else if fractalPointLowCounter==28 and fractalPointLowCounter[1]==27 then fractalPoint else fpl28[1], double.nan);
rec fpl29 = compoundValue(1,if isNAN(ZZData) then fpl29[1] else if fractalPointLowCounter==29 and fractalPointLowCounter[1]==28 then fractalPoint else fpl29[1], double.nan);
rec fpl30 = compoundValue(1,if isNAN(ZZData) then fpl30[1] else if fractalPointLowCounter==30 and fractalPointLowCounter[1]==29 then fractalPoint else fpl30[1], double.nan);



plot h1 = fph1;
plot h2 = fph2;
plot h3 = fph3;
plot h4 = fph4;
plot h5 = fph5;
plot h6 = fph6;
plot h7 = fph7;
plot h8 = fph8;
plot h9 = fph9;
plot h10 = fph10;
plot h11 = fph11;
plot h12 = fph12;
plot h13 = fph13;
plot h14 = fph14;
plot h15 = fph15;
plot h16 = fph16;
plot h17 = fph17;
plot h18 = fph18;
plot h19 = fph19;
plot h20 = fph20;
plot h21 = fph21;
plot h22 = fph22;
plot h23 = fph23;
plot h24 = fph24;
plot h25 = fph25;
plot h26 = fph26;
plot h27 = fph27;
plot h28 = fph28;
plot h29 = fph29;
plot h30 = fph30;

h1.AssignValueColor(globalColor("FractalHigh"));
h2.AssignValueColor(globalColor("FractalHigh"));
h3.AssignValueColor(globalColor("FractalHigh"));
h4.AssignValueColor(globalColor("FractalHigh"));
h5.AssignValueColor(globalColor("FractalHigh"));
h6.AssignValueColor(globalColor("FractalHigh"));
h7.AssignValueColor(globalColor("FractalHigh"));
h8.AssignValueColor(globalColor("FractalHigh"));
h9.AssignValueColor(globalColor("FractalHigh"));
h10.AssignValueColor(globalColor("FractalHigh"));
h11.AssignValueColor(globalColor("FractalHigh"));
h12.AssignValueColor(globalColor("FractalHigh"));
h13.AssignValueColor(globalColor("FractalHigh"));
h14.AssignValueColor(globalColor("FractalHigh"));
h15.AssignValueColor(globalColor("FractalHigh"));
h16.AssignValueColor(globalColor("FractalHigh"));
h17.AssignValueColor(globalColor("FractalHigh"));
h18.AssignValueColor(globalColor("FractalHigh"));
h19.AssignValueColor(globalColor("FractalHigh"));
h20.AssignValueColor(globalColor("FractalHigh"));
h21.AssignValueColor(globalColor("FractalHigh"));
h22.AssignValueColor(globalColor("FractalHigh"));
h23.AssignValueColor(globalColor("FractalHigh"));
h24.AssignValueColor(globalColor("FractalHigh"));
h25.AssignValueColor(globalColor("FractalHigh"));
h26.AssignValueColor(globalColor("FractalHigh"));
h27.AssignValueColor(globalColor("FractalHigh"));
h28.AssignValueColor(globalColor("FractalHigh"));
h29.AssignValueColor(globalColor("FractalHigh"));
h30.AssignValueColor(globalColor("FractalHigh"));

plot l1 = fpl1;
plot l2 = fpl2;
plot l3 = fpl3;
plot l4 = fpl4;
plot l5 = fpl5;
plot l6 = fpl6;
plot l7 = fpl7;
plot l8 = fpl8;
plot l9 = fpl9;
plot l10 = fpl10;
plot l11 = fpl11;
plot l12 = fpl12;
plot l13 = fpl13;
plot l14 = fpl14;
plot l15 = fpl15;
plot l16 = fpl16;
plot l17 = fpl17;
plot l18 = fpl18;
plot l19 = fpl19;
plot l20 = fpl20;
plot l21 = fpl21;
plot l22 = fpl22;
plot l23 = fpl23;
plot l24 = fpl24;
plot l25 = fpl25;
plot l26 = fpl26;
plot l27 = fpl27;
plot l28 = fpl28;
plot l29 = fpl29;
plot l30 = fpl30;


l1.AssignValueColor(globalColor("FractalLow"));
l2.AssignValueColor(globalColor("FractalLow"));
l3.AssignValueColor(globalColor("FractalLow"));
l4.AssignValueColor(globalColor("FractalLow"));
l5.AssignValueColor(globalColor("FractalLow"));
l6.AssignValueColor(globalColor("FractalLow"));
l7.AssignValueColor(globalColor("FractalLow"));
l8.AssignValueColor(globalColor("FractalLow"));
l9.AssignValueColor(globalColor("FractalLow"));
l10.AssignValueColor(globalColor("FractalLow"));
l11.AssignValueColor(globalColor("FractalLow"));
l12.AssignValueColor(globalColor("FractalLow"));
l13.AssignValueColor(globalColor("FractalLow"));
l14.AssignValueColor(globalColor("FractalLow"));
l15.AssignValueColor(globalColor("FractalLow"));
l16.AssignValueColor(globalColor("FractalLow"));
l17.AssignValueColor(globalColor("FractalLow"));
l18.AssignValueColor(globalColor("FractalLow"));
l19.AssignValueColor(globalColor("FractalLow"));
l20.AssignValueColor(globalColor("FractalLow"));
l21.AssignValueColor(globalColor("FractalLow"));
l22.AssignValueColor(globalColor("FractalLow"));
l23.AssignValueColor(globalColor("FractalLow"));
l24.AssignValueColor(globalColor("FractalLow"));
l25.AssignValueColor(globalColor("FractalLow"));
l26.AssignValueColor(globalColor("FractalLow"));
l27.AssignValueColor(globalColor("FractalLow"));
l28.AssignValueColor(globalColor("FractalLow"));
l29.AssignValueColor(globalColor("FractalLow"));
l30.AssignValueColor(globalColor("FractalLow"));

h1.hideBubble();
h2.hideBubble();
h3.hideBubble();
h4.hideBubble();
h5.hideBubble();
h6.hideBubble();
h7.hideBubble();
h8.hideBubble();
h9.hideBubble();
h10.hideBubble();
h11.hideBubble();
h12.hideBubble();
h13.hideBubble();
h14.hideBubble();
h15.hideBubble();
h16.hideBubble();
h17.hideBubble();
h18.hideBubble();
h19.hideBubble();
h20.hideBubble();
h21.hideBubble();
h22.hideBubble();
h23.hideBubble();
h24.hideBubble();
h25.hideBubble();
h26.hideBubble();
h27.hideBubble();
h28.hideBubble();
h29.hideBubble();
h30.hideBubble();

l1.hideBubble();
l2.hideBubble();
l3.hideBubble();
l4.hideBubble();
l5.hideBubble();
l6.hideBubble();
l7.hideBubble();
l8.hideBubble();
l9.hideBubble();
l10.hideBubble();
l11.hideBubble();
l12.hideBubble();
l13.hideBubble();
l14.hideBubble();
l15.hideBubble();
l16.hideBubble();
l17.hideBubble();
l18.hideBubble();
l19.hideBubble();
l20.hideBubble();
l21.hideBubble();
l22.hideBubble();
l23.hideBubble();
l24.hideBubble();
l25.hideBubble();
l26.hideBubble();
l27.hideBubble();
l28.hideBubble();
l29.hideBubble();
l30.hideBubble();

h1.hideTitle();
h2.hideTitle();
h3.hideTitle();
h4.hideTitle();
h5.hideTitle();
h6.hideTitle();
h7.hideTitle();
h8.hideTitle();
h9.hideTitle();
h10.hideTitle();
h11.hideTitle();
h12.hideTitle();
h13.hideTitle();
h14.hideTitle();
h15.hideTitle();
h16.hideTitle();
h17.hideTitle();
h18.hideTitle();
h19.hideTitle();
h20.hideTitle();
h21.hideTitle();
h22.hideTitle();
h23.hideTitle();
h24.hideTitle();
h25.hideTitle();
h26.hideTitle();
h27.hideTitle();
h28.hideTitle();
h29.hideTitle();
h30.hideTitle();

l1.hideTitle();
l2.hideTitle();
l3.hideTitle();
l4.hideTitle();
l5.hideTitle();
l6.hideTitle();
l7.hideTitle();
l8.hideTitle();
l9.hideTitle();
l10.hideTitle();
l11.hideTitle();
l12.hideTitle();
l13.hideTitle();
l14.hideTitle();
l15.hideTitle();
l16.hideTitle();
l17.hideTitle();
l18.hideTitle();
l19.hideTitle();
l20.hideTitle();
l21.hideTitle();
l22.hideTitle();
l23.hideTitle();
l24.hideTitle();
l25.hideTitle();
l26.hideTitle();
l27.hideTitle();
l28.hideTitle();
l29.hideTitle();
l30.hideTitle();

addChartLabel(fractalPointHighCounter>30 or fractalPointLowCounter>30, "Maximum Chart Fractals Exceeded - Increase Reversal Amount", color.red);

#plot test = if ZZData then close else double.nan;
#test.setStyle(curve.points);
#test.setDefaultColor(color.orange);
