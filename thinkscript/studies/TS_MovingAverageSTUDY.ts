# TS_MOVINGAVERAGE
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 18 Jan 2008

input displace = 0;
input length = 9;
input price = close;
input movingAverageType = {default Simple, Exponential, Weighted, Hull, Variable};

rec data;

switch (movingAverageType) {
case Simple:
    data = compoundValue(1, Average(price[-displace], length), price);
case Exponential:
    data = compoundValue(1, ExpAverage(price[-displace], length), price);
case Weighted:
    data = compoundValue(1, wma(price[-displace], length), price);
Case Hull:
    data = compoundValue(1, hullMovingAvg(price[-displace], length), price);
case variable:
    data = VariableMA(price=price, length=length);
}

plot ave = data;
ave.SetLineWeight(2);
ave.AssignValueColor(if ave > ave[1] then color.cyan else color.dark_red);
ave.HideBubble();