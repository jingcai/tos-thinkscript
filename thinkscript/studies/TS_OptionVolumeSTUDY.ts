# TS_OptionVolume
# http://www.thinkscripter.com
# thinkscripter@gmail.com
# Last Update 03 July 2010

declare lower;
input date = "100522";
input strike = 260.0;
input strikeSpacing = 10.0;
input mode = {default volume,totalVolume, openInterest, volumePercentOI};
input totalStrikes = {default Five, Three, One};

def showThree = if mode==mode.volume and totalStrikes==totalStrikes.Three then 1 else 0;
def showFive = if  mode==mode.volume and totalStrikes==totalStrikes.Five then 1 else 0;

addChartLabel(yes,date,color.white);
addChartLabel(yes,concat(strike,"P"),color.red);
addChartLabel(showThree or showFive,concat(strike-strikeSpacing,"P"),color.magenta);
addChartLabel(showThree or showFive,concat(strike+strikeSpacing,"P"),color.orange);
addChartLabel(showFive,concat(strike-strikeSpacing-strikeSpacing,"P"),color.pink);
addChartLabel(showFive,concat(strike+strikeSpacing+strikeSpacing,"P"),color.gray);
addChartLabel(yes,concat(strike,"C"),color.green);
addChartLabel(showThree or showFive,concat(strike-strikeSpacing,"C"),color.cyan);
addChartLabel(showThree or showFive,concat(strike+strikeSpacing,"C"),color.blue);
addChartLabel(showFive,concat(strike-strikeSpacing-strikeSpacing,"C"),color.lime);
addChartLabel(showFive,concat(strike+strikeSpacing+strikeSpacing,"C"),color.white);

def putOptionVolume = volume(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike)))));
rec cumPutVolume = cumPutVolume[1]+putOptionVolume;
def totalputOptionVolume = volume(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike)))),"DAY");
def putOptionOI = open_interest(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike)))),"DAY");
def callOptionVolume = volume(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike)))));
rec cumCallVolume = cumCallVolume[1]+callOptionVolume;
def totalcallOptionVolume = volume(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike)))),"DAY");
def callOptionOI = open_interest(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike)))),"DAY");

def putOptionVolume1 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike-strikeSpacing)))));
rec cumPutVolume1 = cumPutVolume1[1]+putOptionVolume1;
def totalputOptionVolume1 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike-strikeSpacing)))),"DAY");
def putOptionOI1 = open_interest(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike-strikeSpacing)))),"DAY");
def callOptionVolume1 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike-strikeSpacing)))));
rec cumCallVolume1 = cumCallVolume1[1]+callOptionVolume1;
def totalcallOptionVolume1 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike-strikeSpacing)))),"DAY");
def callOptionOI1 = open_interest(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike-strikeSpacing)))),"DAY");

def putOptionVolume2 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike+strikeSpacing)))));
rec cumPutVolume2 = cumPutVolume2[1]+putOptionVolume2;
def totalputOptionVolume2 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike+strikeSpacing)))),"DAY");
def putOptionOI2 = open_interest(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike+strikeSpacing)))),"DAY");
def callOptionVolume2 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike+strikeSpacing)))));
rec cumCallVolume2 = cumCallVolume2[1]+callOptionVolume2;
def totalcallOptionVolume2 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike+strikeSpacing)))),"DAY");
def callOptionOI2 = open_interest(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike+strikeSpacing)))),"DAY");

def putOptionVolume3 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike-strikeSpacing-strikeSpacing)))));
rec cumPutVolume3 = cumPutVolume3[1]+putOptionVolume3;
def totalputOptionVolume3 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike-strikeSpacing-strikeSpacing)))),"DAY");
def putOptionOI3 = open_interest(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike-strikeSpacing-strikeSpacing)))),"DAY");
def callOptionVolume3 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike-strikeSpacing-strikeSpacing)))));
rec cumCallVolume3 = cumCallVolume3[1]+callOptionVolume3;
def totalcallOptionVolume3 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike-strikeSpacing-strikeSpacing)))),"DAY");
def callOptionOI3 = open_interest(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike-strikeSpacing-strikeSpacing)))),"DAY");

def putOptionVolume4 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike+strikeSpacing+strikeSpacing)))));
rec cumPutVolume4 = cumPutVolume4[1]+putOptionVolume4;
def totalputOptionVolume4 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike+strikeSpacing+strikeSpacing)))),"DAY");
def putOptionOI4 = open_interest(concat(".",concat(getSymbolPart(),concat(date,concat("P",strike+strikeSpacing+strikeSpacing)))),"DAY");
def callOptionVolume4 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike+strikeSpacing+strikeSpacing)))));
rec cumCallVolume4 = cumCallVolume4[1]+callOptionVolume4;
def totalcallOptionVolume4 = volume(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike+strikeSpacing+strikeSpacing)))),"DAY");
def callOptionOI4 = open_interest(concat(".",concat(getSymbolPart(),concat(date,concat("C",strike+strikeSpacing+strikeSpacing)))),"DAY");

plot zero = 0;
zero.setDefaultColor(color.white);
zero.hideTitle();

plot datap4;
plot datac4;
switch(mode){
case volume:
datap4 = -putoptionVolume4*showFive;
datac4 = calloptionVolume4*showFive;
case totalVolume:
datap4 = double.nan;
datac4 = double.nan;
case openInterest:
datap4 = double.nan;
datac4 = double.nan;
case volumePercentOI:
datap4 = double.nan;
datac4 = double.nan;
}
datap4.setPaintingStrategy(paintingStrategy.HISTOGRAM);
datac4.setPaintingStrategy(paintingStrategy.HISTOGRAM);
datap4.setDefaultColor(color.gray);
datac4.setDefaultColor(color.white);
datap4.setLineWeight(3);
datac4.setLineWeight(3);
datap4.hideTitle();
datac4.hideTitle();
datap4.hideBubble();
datac4.hideBubble();

plot datap3;
plot datac3;
switch(mode){
case volume:
datap3 = -putoptionVolume3*showFive-putOptionVolume4*showFive;
datac3 =calloptionVolume3*showFive+callOptionVolume4*showFive;
case totalVolume:
datap3 = double.nan;
datac3 = double.nan;
case openInterest:
datap3 = double.nan;
datac3 = double.nan;
case volumePercentOI:
datap3 = double.nan;
datac3 = double.nan;
}
datap3.setPaintingStrategy(paintingStrategy.HISTOGRAM);
datac3.setPaintingStrategy(paintingStrategy.HISTOGRAM);

datap3.setDefaultColor(color.pink);
datac3.setDefaultColor(color.lime);

datap3.setLineWeight(3);
datac3.setLineWeight(3);
datap3.hideTitle();
datac3.hideTitle();
datap3.hideBubble();
datac3.hideBubble();

plot datap2;
plot datac2;
switch(mode){
case volume:
datap2 = -putOptionVolume2*(showThree or showFive)-putoptionVolume3*showFive-putOptionVolume4*showFive;
datac2 = +callOptionVolume2*(showThree or showFive)+calloptionVolume3*showFive+callOptionVolume4*showFive;
case totalVolume:
datap2 = double.nan;
datac2 = double.nan;
case openInterest:
datap2 = double.nan;
datac2 = double.nan;
case volumePercentOI:
datap2 = double.nan;
datac2 = double.nan;
}
datap2.setPaintingStrategy(paintingStrategy.HISTOGRAM);
datac2.setPaintingStrategy(paintingStrategy.HISTOGRAM);
datap2.setDefaultColor(color.orange);
datac2.setDefaultColor(color.blue);
datap2.setLineWeight(3);
datac2.setLineWeight(3);
datap2.hideTitle();
datac2.hideTitle();
datap2.hideBubble();
datac2.hideBubble();

plot datap1;
plot datac1;
switch(mode){
case volume:
datap1 = -putOptionVolume1*(showThree or showFive)-putOptionVolume2*(showThree or showFive)-putoptionVolume3*showFive-putOptionVolume4*showFive;
datac1 = callOptionVolume1*(showThree or showFive)+callOptionVolume2*(showThree or showFive)+calloptionVolume3*showFive+callOptionVolume4*showFive;
case totalVolume:
datap1 = double.nan;
datac1 = double.nan;
case openInterest:
datap1 = double.nan;
datac1 = double.nan;
case volumePercentOI:
datap1 = double.nan;
datac1 = double.nan;
}
datap1.setPaintingStrategy(paintingStrategy.HISTOGRAM);
datac1.setPaintingStrategy(paintingStrategy.HISTOGRAM);
datap1.setDefaultColor(color.magenta);
datac1.setDefaultColor(color.cyan);
datap1.setLineWeight(3);
datac1.setLineWeight(3);
datap1.hideTitle();
datac1.hideTitle();
datap1.hideBubble();
datac1.hideBubble();

plot datap;
plot datac;
switch(mode){
case volume:
datap = -putoptionVolume-putOptionVolume1*(showThree or showFive)-putOptionVolume2*(showThree or showFive)-putoptionVolume3*showFive-putOptionVolume4*showFive;
datac = calloptionVolume+callOptionVolume1*(showThree or showFive)+callOptionVolume2*(showThree or showFive)+calloptionVolume3*showFive+callOptionVolume4*showFive;
case totalVolume:
datap = -totalputoptionVolume;
datac = totalcalloptionVolume;
case openInterest:
datap = -putoptionOI;
datac = callOptionOI;
case volumePercentOI:
datap = -putoptionVolume*100/putoptionOI;
datac = callOptionVolume*100/callOptionOI;
}
datap.setPaintingStrategy(paintingStrategy.HISTOGRAM);
datac.setPaintingStrategy(paintingStrategy.HISTOGRAM);
datap.setDefaultColor(color.red);
datac.setDefaultColor(color.green);
datap.setLineWeight(3);
datac.setLineWeight(3);
datap.hideTitle();
datac.hideTitle();
datap.hideBubble();
datac.hideBubble();

