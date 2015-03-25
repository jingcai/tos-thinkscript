# MARKETBREADTH
# http://thinkscripter.wordpress.com
# thinkscripter@gmail.com
# Last Update 21 Jan 2008

declare lower;

input display = {default ADIssuesRatio, ADIssues, ADVolumeRatio, ADVolume};
input market = {default NYSE, NASDAQ};

def advancing = if(market, close("$advn/q"), close("$advn"));
def declining =  if(market, close("$decn/q"), close("$decn"));
def advVolume = if(market, close("$uvol/q"), close("$uvol"));
def decVolume = if(market, close("$dvol/q"), close("$dvol"));

plot Breadth;

switch(display) {
  case ADIssuesRatio:
    Breadth = if(advancing > declining, (advancing / declining), (-declining / advancing)); 
  case ADIssues:
    Breadth = advancing - declining;
  case ADVolume:
    Breadth = advVolume - decVolume;
case ADVolumeRatio:
    Breadth = if( advVolume > decVolume, (advVolume / decVolume), (-decVolume / advVolume));
}

Breadth.AssignValueColor(if Breadth >= 0.0 then color.green else color.red);
Breadth.SetPaintingStrategy(paintingStrategy.HISTOGRAM);
Breadth.SetLineWeight(3);

plot ZeroLine = 0.0;
ZeroLine.SetDefaultColor(color.white);


