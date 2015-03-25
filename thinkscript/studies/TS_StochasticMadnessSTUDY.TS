# STOCHASTICMADNESS
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 28 FEB 2009

declare lower;

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
plot S1 = if(!lastBar ,if( stoch1>over_bought,3.0,if(!lastBar and stoch1<over_sold,3.0,Double.NaN)),double.nan);
def dotColor1 = if(stoch1>over_bought,5,if(stoch1<over_sold,6,0));
s1.AssignValueColor(getColor(dotColor1));
s1.setStyle(curve.points);
s1.setLineWeight(5);

def stoch2 = StochasticFull(over_bought,over_sold,KPeriod2,DPeriod2,priceH,priceL,priceC,slowing_Period2,smoothingType2).fullk;
plot S2 = if(!lastBar , if( stoch2>over_bought,2.0,if( stoch2<over_sold,2.0,Double.NaN)),double.nan);
def dotColor2 = if(stoch2>over_bought,5,if(stoch2<over_sold,6,0));
s2.AssignValueColor(getColor(dotColor2));
s2.setStyle(curve.points);
s2.setLineWeight(5);

def stoch3 = StochasticFull(over_bought,over_sold,KPeriod3,DPeriod3,priceH,priceL,priceC,slowing_Period3,smoothingType3).fullk;
plot S3 = if(!lastBar ,if(stoch3>over_bought,1.0,if(!lastBar and stoch3<over_sold,1.0,Double.NaN)),double.nan);
def dotColor3 = if(stoch3>over_bought,5,if(stoch3<over_sold,6,0));
s3.AssignValueColor(getColor(dotColor3));
s3.setStyle(curve.points);
s3.setLineWeight(5);

def allConditionsSell = if(stoch1>over_bought and stoch2>over_bought and stoch3>over_bought, 1,0);
def allConditionsBuy = if(stoch1<over_sold and stoch2<over_sold and stoch3<over_sold, 1,0);
plot AllConditions = if(!lastBar and (allConditionsBuy or allConditionsSell), 4.0, Double.Nan);
def dotcolor5 = if(allConditionsBuy, 6, if(allConditionsSell, 5,0));
AllConditions.AssignValueColor(getColor(dotColor5));
AllConditions.setStyle(curve.points);
AllConditions.setLineWeight(5);

plot separator = 3.5;
separator.setDefaultColor(color.white);
separator.setLineWeight(5);
