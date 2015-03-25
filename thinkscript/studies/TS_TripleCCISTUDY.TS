# TRIPLECCI
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 17 Jan 2008


declare lower;

input length = 50;
input LongLength = 100;
input turboLength = 14;


DEF CCI50 = CCI("length" = length, "over_bought" = 100, "over_sold" = -100);
DEF CCI100 = CCI("length" = longlength, "over_bought" = 100, "over_sold" = -100);
DEF CCI14 = CCI("length" = turboLength, "over_bought" = 100, "over_sold" = -100);


DEF CCIDelta = AbsValue(CCI50 - CCI50[1]);
DEF CCILineColor = if(AbsValue(CCI50) > 200, 8, 5);

plot Long =  CCI100;
Long.SetDefaultColor(color.white);


plot CCI = CCI50;
CCI.SetPaintingStrategy(paintingStrategy.HISTOGRAM);
CCI.SetDefaultColor(color.red);

plot Turbo = CCI14;
turbo.SetDefaultColor(color.green);

plot Plus100 = 100;
Plus100.SetDefaultColor(color.green);

plot Minus100 = -100;
Minus100.SetDefaultColor(color.green);

plot Zero = 0;
Zero.SetDefaultColor(color.green);

plot CCILine = CCI50;
CCILine.AssignValueColor(GetColor(CCILineColor));
CCILine.SetLineWeight(2);

