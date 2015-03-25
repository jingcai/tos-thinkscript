# TS_DoubleMA
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 08 Dec 2010

input displace = 0;
input MA1_length = 7;
input MA2_length = 40;
input price = close;

DefineGlobalColor("RisingMA", color.blue);
DefineGlobalColor("FallingMA", color.red);

input movingAverageType1 = {default Simple, Exponential, Weighted, Hull, Variable};
input movingAverageType2 = {default Variable, Simple, Exponential, Weighted, Hull};

def data1;

switch (movingAverageType1) {
case Simple:
    data1 = compoundValue(1, Average(price[-displace], MA1_length), price);
case Exponential:
    data1 = compoundValue(1, ExpAverage(price[-displace], MA1_length), price);
case Weighted:
    data1 = compoundValue(1, wma(price[-displace], MA1_length), price);
Case Hull:
    data1 = compoundValue(1, hullMovingAvg(price[-displace], MA1_length), price);
case variable:
    data1 = compoundValue(1, VariableMA(price = price, length = MA1_length), price);
}

plot DoubleMA;

switch (movingAverageType2) {
case Simple:
    DoubleMA = compoundValue(1, Average(data1[-displace], MA2_length), data1);
case Exponential:
    DoubleMA = compoundValue(1, ExpAverage(data1[-displace], MA2_length), data1);
case Weighted:
    DoubleMA = compoundValue(1, wma(data1[-displace], MA2_length), data1);
Case Hull:
    DoubleMA = compoundValue(1, hullMovingAvg(data1[-displace], MA2_length), data1);
case variable:
    DoubleMA = compoundValue(1, VariableMA( data1, MA2_length), data1);
}

DoubleMA.SetLineWeight(4);
DoubleMA.AssignValueColor(if DoubleMA > DoubleMA[1] then globalColor("RisingMA") else globalColor("FallingMA"));
DoubleMA.HideBubble();
