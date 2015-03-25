# ADVANCE-DECLINE-UPPER
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 19 Feb 2009

declare on_volume;
declare upper;
declare fullrange;
input showOnlyToday = No;

def day = getDay();
def lastDay = getLastDay();
def isToday = if(day == lastDay, 1, 0);
def shouldPlot = if(showOnlyToday and isToday, 1, if(!showOnlyToday, 1, 0));

input display = {default  ADIssues,  ADVolume};
input market = {default NYSE, NASDAQ};
input scaleFactor = 1.0;

def maxVolume = highestAll(volume);

def advancing = if(market, close("$advn/q"), close("$advn"));
def declining =  if(market, close("$decn/q"), close("$decn"));
def advVolume = if(market, close("$uvol/q"), close("$uvol"));
def decVolume = if(market, close("$dvol/q"), close("$dvol"));

def maxADV = max(highestAll(advVolume), highestAll(decVolume));
def maxADI = max(highestAll(advancing), highestAll(declining));
def ratioV = maxVolume/maxADV;
def ratioI = maxVolume/maxADI;

plot Breadth;

switch (display) {
case ADIssues:
    Breadth = if(shouldPlot, if(advancing - declining > 0, advancing - declining, declining - advancing)*scaleFactor*ratioI, double.nan);
case ADVolume:
    Breadth = if(shouldPlot, if(advVolume - decVolume > 0, advVolume - decVolume, decVolume - advVolume)*ScaleFactor*ratioV,double.nan) ;
}

Breadth.AssignValueColor(
if display == display.ADIssues 
    then 
        if advancing - declining > 0 then color.dark_green else color.dark_red
    else if advVolume - decVolume > 0 then color.dark_green else color.dark_red);

Breadth.SetPaintingStrategy(paintingStrategy.HISTOGRAM);
Breadth.SetLineWeight(5);