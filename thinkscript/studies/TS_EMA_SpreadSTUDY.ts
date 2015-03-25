# TS_EMA_SPREAD
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 29 OCT 2010

declare lower;

input ema_length = 50;

plot EMA_Spread = (Close - ExpAverage(close, ema_length)) / ExpAverage(close,ema_length) * 100;
EMA_Spread.setDefaultColor(color.blue);

plot zero = 0;
zero.setDefaultColor(color.white);

plot overbought = absValue(stdevAll(EMA_Spread));
overbought.setDefaultColor(color.red);
overbought.setLineWeight(2);

plot oversold = -absValue(stdevAll(EMA_Spread));
oversold.setDefaultColor(color.red);
oversold.setLineWeight(2);

def spreadHigh = highestAll(AbsValue(EMA_Spread));

plot A = spreadHigh/5;
A.setDefaultColor(color.dark_gray);
A.setStyle(curve.SHORT_DASH);
A.hideTitle();

plot B = -spreadHigh/5;
B.setDefaultColor(color.dark_gray);
B.setStyle(curve.SHORT_DASH);
B.hideTitle();

plot C = spreadHigh*2/5;
C.setDefaultColor(color.dark_gray);
C.setStyle(curve.SHORT_DASH);
C.hideTitle();

plot D = -spreadHigh*2/5;
D.setDefaultColor(color.dark_gray);
D.setStyle(curve.SHORT_DASH);
D.hideTitle();

plot E = spreadHigh*3/5;
E.setDefaultColor(color.dark_gray);
E.setStyle(curve.SHORT_DASH);
E.hideTitle();

plot F = -spreadHigh*3/5;
F.setDefaultColor(color.dark_gray);
F.setStyle(curve.SHORT_DASH);
F.hideTitle();

plot G = spreadHigh*4/5;
G.setDefaultColor(color.dark_gray);
G.setStyle(curve.SHORT_DASH);
G.hideTitle();

plot H =  -spreadHigh*4/5;
H.setDefaultColor(color.dark_gray);
H.setStyle(curve.SHORT_DASH);
H.hideTitle();

plot I = spreadHigh;
I.setDefaultColor(color.dark_gray);
I.setStyle(curve.SHORT_DASH);
I.hideTitle();

plot J = -spreadHigh;
J.setDefaultColor(color.dark_gray);
J.setStyle(curve.SHORT_DASH);
J.hideTitle();



