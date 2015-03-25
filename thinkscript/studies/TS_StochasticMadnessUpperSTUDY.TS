# STOCHASTICMADNESSUPPER
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 02 Mar 2009

def over_bought = 80;
def over_sold = 20;
input KPeriod1 = 5;
def DPeriod1 = 2;
input smoothingType1 = 2;
input slowing_period1 = 2;
input KPeriod2 = 17;
def DPeriod2 = 3;
input smoothingType2 = 2;
input slowing_period2 = 5;
input KPeriod3 = 89;
def DPeriod3 = 3;
input smoothingType3 = 2;
input slowing_period3 =5;


def priceH = high;
def priceL = low;
def priceC = close;
def lastBar = if (isNan(close), 1, 0);

def stoch1 = StochasticFull(over_bought,over_sold,KPeriod1,DPeriod1,priceH,priceL,priceC,slowing_Period1,smoothingType1).fullk;

def stoch2 = StochasticFull(over_bought,over_sold,KPeriod2,DPeriod2,priceH,priceL,priceC,slowing_Period2,smoothingType2).fullk;

def stoch3 = StochasticFull(over_bought,over_sold,KPeriod3,DPeriod3,priceH,priceL,priceC,slowing_Period3,smoothingType3).fullk;

def allConditionsSell = if(stoch1>over_bought and stoch2>over_bought and stoch3>over_bought, 1,0);
def allConditionsBuy = if(stoch1<over_sold and stoch2<over_sold and stoch3<over_sold, 1,0);
plot Signal = if !lastBar then if allConditionsBuy then low else if allConditionsSell then high else  Double.Nan else double.nan;
def dotcolor5 = if(allConditionsBuy, 6, if(allConditionsSell, 5,0));
Signal.AssignValueColor(getColor(dotColor5));
Signal.setStyle(curve.points);
Signal.setLineWeight(5);

