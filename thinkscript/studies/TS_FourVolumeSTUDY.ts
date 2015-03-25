# TS_FourVolume
# (c) 2009 http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 13 May 2009

declare lower;

input VolumePeriod = 10;
input OscillatorLength = 10;
input priceChangeWeighted = NO;
input overbought = 80.0;
input oversold = 20.0;

input mode = {default UP_DOWN_VOL_RATIO, OSCILLATOR};

def price1 = close("/ES");
def price2 = close("/NQ");
def price3 = close("/YM");
def price4 = close("/TF");

def volume1 = volume("/ES");
def volume2 = volume("/NQ");
def volume3 = volume("/YM");
def volume4 = volume("/TF");

def avePrice = (price1+price2+price3+price4)/4.0;
def delta = absValue(avePrice-avePrice[1]);
def aveVolume = (volume1+volume2+volume3+volume4)/4.0;
def multiplier = if(priceChangeWeighted, delta,1);

plot maxLine = 80.0;
plot minLine = 20.0;
maxLine.setDefaultColor(color.BLUE);
minLine.setDefaultColor(color.BLUE);
plot midLine = 50.0;
midLine.setDefaultColor(color.WHITE);

DEF up = if(avePrice>avePrice[1], aveVolume*multiplier, 0);
DEF down = if(avePrice<avePrice[1], aveVolume*multiplier, 0);
DEF upvol = sum(up, VolumePeriod);
DEF downvol = sum(down, VolumePeriod);

def UPDVR= ((upvol/(downvol+upvol)));

def highestVR = Highest(UPDVR, OscillatorLength);
def lowestVR = Lowest(UPDVR, OscillatorLength);

plot FourVolume;

switch (mode) {

case UP_DOWN_VOL_RATIO:
FourVolume = UPDVR*100;
case OSCILLATOR:
FourVolume = (UPDVR - lowestVR) / (highestVR - lowestVR)*100;
}

FourVolume.DefineColor("OverBought", Color.DOWNTICK);
FourVolume.DefineColor("Normal", color.cyan);
FourVolume.DefineColor("OverSold", Color.UPTICK);
FourVolume.AssignValueColor(if FourVolume < oversold then FourVolume.color("OverSold") else if FourVolume > overbought then FourVolume.color("OverBought") else FourVolume.color("Normal"));

